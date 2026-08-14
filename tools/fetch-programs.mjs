/**
 * Pengambilan ulang data program studi dari portal SPMB resmi Poliban.
 *
 *   node tools/fetch-programs.mjs          # tulis ulang cache
 *   node tools/fetch-programs.mjs --check  # bandingkan saja, jangan tulis
 *
 * Skrip ini SENGAJA dijalankan manual pada waktu build/pemeliharaan, bukan saat
 * runtime. Situs produksi selalu memakai `src/data/cache/pmb-programs.json`
 * sehingga hasil build tetap dapat direproduksi dan tidak bergantung jaringan.
 *
 * Sumber: https://pmb.poliban.ac.id/program-studi (robots.txt mengizinkan).
 * Skrip menghormati server dengan jeda antarpermintaan.
 */

import { readFile, writeFile } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cacheFile = join(root, "src/data/cache/pmb-programs.json");

const LIST_URL = "https://pmb.poliban.ac.id/program-studi";
const DETAIL_URL = (id) =>
  `https://pmb.poliban.ac.id/program-studi-detail/detail/${id}`;
const UA =
  "Mozilla/5.0 (compatible; PKKMB-Poliban-SiteBuilder/1.0; +https://pkkmb.poliban.ac.id/)";
const DELAY_MS = 800;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  const res = await fetch(url, {
    headers: { "user-agent": UA, accept: "text/html" },
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} untuk ${url}`);
  return res.text();
}

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

/** Ambil daftar id + nama + jenjang dari halaman indeks. */
function parseList(html) {
  const out = [];
  const re =
    /program-studi-detail\/detail\/(\d+)/g;
  const ids = new Set();
  let m;
  while ((m = re.exec(html))) ids.add(m[1]);
  for (const id of ids) out.push({ pmbId: id });
  return out;
}

/** Ambil akreditasi, situs, dan jenjang dari halaman detail. */
function parseDetail(html) {
  const text = strip(html);

  const title = (html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "")
    .replace(/\s*\|\s*siAkad Cloud\s*$/i, "")
    .trim();

  const levelMatch = title.match(/^(D2|D3|D4)\s+(.*)$/);
  const level = levelMatch?.[1] ?? null;
  const name = levelMatch?.[2]?.trim() ?? title;

  // "Akreditasi <nilai> Website"
  const akr = text.match(/Akreditasi\s+(Unggul|Baik Sekali|Baik|A|B|C)\s+Website/i);
  const accreditation = akr ? akr[1] : null;

  const site = html.match(
    /href="(https:\/\/poliban\.ac\.id\/[^"]*)"[^>]*>\s*Kunjungi Website/i,
  );
  const website = site ? site[1] : null;

  // Jurusan disimpulkan dari jalur URL situs prodi bila tersedia.
  let dept = null;
  if (website) {
    if (website.includes("/elektro/")) dept = "teknik-elektro";
    else if (website.includes("/mesin/")) dept = "teknik-mesin";
    else if (website.includes("/sipil/")) dept = "teknik-sipil";
    else if (website.includes("/akuntansi/")) dept = "akuntansi";
    else if (website.includes("/administrasi-bisnis/")) dept = "administrasi-bisnis";
  }

  return { name, level, accreditation, website, dept };
}

async function main() {
  const check = process.argv.includes("--check");
  const previous = JSON.parse(await readFile(cacheFile, "utf8"));

  console.log(`→ Mengambil ${LIST_URL}`);
  const listHtml = await get(LIST_URL);
  const entries = parseList(listHtml);
  console.log(`  ditemukan ${entries.length} program studi`);

  const programs = [];
  for (const entry of entries) {
    await sleep(DELAY_MS);
    const url = DETAIL_URL(entry.pmbId);
    process.stdout.write(`  · ${entry.pmbId} `);
    try {
      const detail = parseDetail(await get(url));
      programs.push({ pmbId: entry.pmbId, ...detail });
      console.log(`${detail.level} ${detail.name} — ${detail.accreditation ?? "—"}`);
    } catch (err) {
      console.log(`GAGAL (${err.message}) — memakai nilai cache`);
      const old = previous.programs.find((p) => p.pmbId === entry.pmbId);
      if (old) programs.push(old);
    }
  }

  // Pertahankan jurusan hasil verifikasi manual bila situs prodi tidak tersedia.
  for (const p of programs) {
    if (!p.dept) {
      const old = previous.programs.find((o) => o.pmbId === p.pmbId);
      if (old?.dept) p.dept = old.dept;
    }
  }

  const next = {
    _comment: previous._comment,
    source: LIST_URL,
    sourceId: "pmb-prodi",
    fetchedAt: new Date().toISOString().slice(0, 10),
    programs,
  };

  // Laporkan perubahan
  const diffs = [];
  for (const p of programs) {
    const old = previous.programs.find((o) => o.pmbId === p.pmbId);
    if (!old) {
      diffs.push(`+ BARU: ${p.level} ${p.name}`);
      continue;
    }
    for (const key of ["name", "level", "accreditation", "website"]) {
      if (old[key] !== p[key]) {
        diffs.push(`~ ${p.pmbId} ${key}: ${old[key]} → ${p[key]}`);
      }
    }
  }
  for (const old of previous.programs) {
    if (!programs.find((p) => p.pmbId === old.pmbId)) {
      diffs.push(`- HILANG: ${old.level} ${old.name}`);
    }
  }

  console.log(
    diffs.length ? `\nPerubahan:\n  ${diffs.join("\n  ")}` : "\nTidak ada perubahan.",
  );

  if (check) {
    console.log("\n(--check) cache tidak ditulis.");
    process.exit(diffs.length ? 1 : 0);
  }

  await writeFile(cacheFile, JSON.stringify(next, null, 2) + "\n", "utf8");
  console.log(`\n✓ Cache diperbarui: ${cacheFile}`);
  if (diffs.length) {
    console.log(
      "  Periksa src/data/programs.js — teks naratif per prodi mungkin perlu disesuaikan.",
    );
  }
}

main().catch((err) => {
  console.error("✗ Gagal:", err.message);
  console.error(
    "  Cache lama dipertahankan. Situs tetap dapat dibangun tanpa jaringan.",
  );
  process.exit(1);
});
