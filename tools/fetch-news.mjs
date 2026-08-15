/**
 * Menyegarkan cache berita resmi Poliban dari WP REST API.
 *
 *   node tools/fetch-news.mjs           # tulis ulang cache
 *   node tools/fetch-news.mjs --check   # keluar 1 bila sumber sudah berubah
 *
 * Situs resmi poliban.ac.id berjalan di atas WordPress dan membuka endpoint
 * JSON bawaannya tanpa autentikasi. Endpoint itu dipanggil HANYA lewat skrip
 * ini - build dan situs produksi selalu membaca berkas cache, sehingga keluaran
 * tetap deterministik dan tidak ada pengambilan data saat runtime.
 *
 * Yang diambil hanya metadata faktual (judul, tanggal, tautan, ringkasan).
 * Isi lengkap artikel TIDAK disalin; situs ini hanya meringkas dan menautkan
 * kembali ke sumber aslinya.
 */

import { writeFile, readFile } from "node:fs/promises";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(root, "src/data/cache/poliban-news.json");

const ENDPOINT =
  "https://poliban.ac.id/wp-json/wp/v2/posts" +
  "?per_page=12&_fields=id,date,slug,link,title,excerpt,categories";

/** Kategori WP yang relevan bagi mahasiswa baru. */
const CATEGORY_LABELS = {
  4: "Pengumuman",
  13: "Kelembagaan",
  18: "Kerja Sama",
  47: "Penerimaan Mahasiswa Baru",
  66: "Akademik",
  84: "Mahasiswa Baru",
};

const stripTags = (html) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#8211;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const decode = (html) => stripTags(html);

/**
 * Hanya host resmi Poliban yang boleh masuk ke cache.
 *
 * Endpoint WP mengembalikan `link` apa adanya. Bila suatu saat isinya berubah
 * (salah konfigurasi, kompromi, atau pengalihan ke domain lain), tautan itu
 * tidak boleh ikut terbit di situs ini.
 */
const ALLOWED_HOSTS = new Set([
  "poliban.ac.id",
  "www.poliban.ac.id",
]);

/** URL absolut https ke host resmi; selain itu ditolak. */
function safeUrl(value) {
  let u;
  try {
    u = new URL(String(value));
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  if (!ALLOWED_HOSTS.has(u.hostname)) return null;
  return u.toString();
}

/** ISO date "YYYY-MM-DD" yang benar-benar valid. */
function safeDate(value) {
  const d = String(value ?? "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
  const t = new Date(`${d}T00:00:00Z`);
  return Number.isNaN(t.getTime()) ? null : d;
}

/**
 * Membersihkan satu entri. Mengembalikan null bila entri tidak layak terbit,
 * sehingga data cacat tidak pernah sampai ke cache maupun ke HTML.
 */
function sanitise(p) {
  const url = safeUrl(p.link);
  const date = safeDate(p.date);
  const title = decode(p.title?.rendered ?? "");
  if (!url || !date || !title) return null;

  const summary = decode(p.excerpt?.rendered ?? "");
  const id = Number(p.id);
  if (!Number.isInteger(id)) return null;

  return {
    id,
    slug: String(p.slug ?? "").replace(/[^a-z0-9-]/gi, ""),
    title,
    date,
    url,
    summary: summary.length > 260 ? summary.slice(0, 257).trimEnd() + "…" : summary,
    categories: (p.categories ?? []).map((c) => CATEGORY_LABELS[c]).filter(Boolean),
  };
}

async function fetchNews() {
  const res = await fetch(ENDPOINT, {
    headers: {
      accept: "application/json",
      "user-agent":
        "PKKMB-Poliban-Static-Site/1.0 (+https://pkkmb.poliban.ac.id/; build-time cache refresh)",
    },
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} dari ${ENDPOINT}`);
  const raw = await res.json();

  if (!Array.isArray(raw)) throw new Error("Respons API bukan array");

  const clean = [];
  let rejected = 0;
  for (const p of raw) {
    const item = sanitise(p);
    if (item) clean.push(item);
    else rejected += 1;
  }
  if (rejected) {
    console.warn(`${rejected} entri ditolak karena tautan/tanggal/judul tidak valid.`);
  }

  // Urut menurun agar keluaran deterministik apa pun urutan dari API.
  clean.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id - b.id));
  return clean;
}

const check = process.argv.includes("--check");

let items;
try {
  items = await fetchNews();
} catch (err) {
  // Kegagalan jaringan tidak boleh merusak apa pun: cache lama tetap dipakai.
  console.error(`Gagal menghubungi WP REST API: ${err.message}`);
  console.error("Cache lama dipertahankan. Situs tetap dapat dibangun.");
  process.exit(check ? 0 : 1);
}

if (!items.length) {
  console.error("API mengembalikan daftar kosong - cache tidak diubah.");
  process.exit(1);
}

/*
 * Jangan pernah menukar cache yang sehat dengan hasil yang jauh lebih sedikit.
 * Respons parsial (rate limit, plugin error) bisa mengembalikan satu-dua entri;
 * menuliskannya akan menghapus berita yang masih valid tanpa disadari.
 */
try {
  const prev = JSON.parse(await readFile(CACHE, "utf8"));
  const before = prev.items?.length ?? 0;
  if (before >= 4 && items.length < Math.ceil(before / 2)) {
    console.error(
      `API hanya mengembalikan ${items.length} entri sedangkan cache berisi ${before}. ` +
      "Cache dipertahankan; jalankan ulang setelah memastikan sumber sehat.",
    );
    process.exit(1);
  }
} catch {
  // Belum ada cache - tidak ada yang perlu dilindungi.
}

const payload = {
  _comment:
    "Cache berita resmi Poliban dari WP REST API. JANGAN disunting manual - " +
    "jalankan `npm run refresh:news`. Hanya metadata yang disimpan; isi artikel " +
    "tetap milik sumber dan selalu ditautkan kembali.",
  source: "https://poliban.ac.id/wp-json/wp/v2/posts",
  sourceId: "poliban-wp-api",
  fetchedAt: new Date().toISOString().slice(0, 10),
  items,
};

if (check) {
  let prev;
  try {
    prev = JSON.parse(await readFile(CACHE, "utf8"));
  } catch {
    console.error("Cache belum ada. Jalankan `npm run refresh:news`.");
    process.exit(1);
  }
  const a = JSON.stringify(prev.items);
  const b = JSON.stringify(items);
  if (a !== b) {
    console.error("Berita resmi sudah berubah. Jalankan `npm run refresh:news`.");
    const prevIds = new Set(prev.items.map((i) => i.id));
    for (const i of items) {
      if (!prevIds.has(i.id)) console.error(`  + ${i.date} ${i.title}`);
    }
    process.exit(1);
  }
  console.log(`Cache berita mutakhir (${items.length} entri).`);
  process.exit(0);
}

await writeFile(CACHE, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log(`Tersimpan ${items.length} berita ke ${CACHE.replace(root + "/", "")}`);
for (const i of items.slice(0, 5)) console.log(`  ${i.date}  ${i.title}`);
