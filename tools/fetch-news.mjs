/**
 * Menyegarkan cache berita resmi Poliban dari WP REST API.
 *
 *   node tools/fetch-news.mjs           # tulis ulang cache
 *   node tools/fetch-news.mjs --check   # keluar 1 bila sumber sudah berubah
 *
 * Situs resmi poliban.ac.id berjalan di atas WordPress dan membuka endpoint
 * JSON bawaannya tanpa autentikasi. Endpoint itu dipanggil HANYA lewat skrip
 * ini — build dan situs produksi selalu membaca berkas cache, sehingga keluaran
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

  return raw.map((p) => {
    const summary = decode(p.excerpt?.rendered ?? "");
    return {
      id: p.id,
      slug: p.slug,
      title: decode(p.title?.rendered ?? ""),
      date: p.date.slice(0, 10),
      url: p.link,
      summary: summary.length > 260 ? summary.slice(0, 257).trimEnd() + "…" : summary,
      categories: (p.categories ?? [])
        .map((c) => CATEGORY_LABELS[c])
        .filter(Boolean),
    };
  });
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
  console.error("API mengembalikan daftar kosong — cache tidak diubah.");
  process.exit(1);
}

const payload = {
  _comment:
    "Cache berita resmi Poliban dari WP REST API. JANGAN disunting manual — " +
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
