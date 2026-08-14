/**
 * Berita resmi Poliban.
 *
 * Sumber: WP REST API situs resmi (poliban.ac.id/wp-json/wp/v2/posts), diambil
 * saat pembaruan manual dan disimpan di `cache/poliban-news.json`. Build hanya
 * membaca cache — tidak ada permintaan jaringan saat build maupun runtime.
 *
 *   npm run refresh:news    perbarui cache
 *   npm run refresh:check   deteksi bila sumber resmi sudah berubah
 *
 * Yang disimpan hanya metadata (judul, tanggal, ringkasan, tautan). Isi artikel
 * tidak disalin: setiap entri selalu menautkan kembali ke laman aslinya.
 */

import cache from "./cache/poliban-news.json" with { type: "json" };

/** Metadata sumber untuk ditampilkan pada halaman transparansi. */
export const newsSource = {
  sourceId: cache.sourceId,
  url: cache.source,
  fetchedAt: cache.fetchedAt,
};

/**
 * Pertahanan berlapis terhadap cache yang rusak atau disunting tangan.
 *
 * `tools/fetch-news.mjs` sudah memvalidasi saat pengambilan, tetapi berkas
 * cache tetap berupa JSON yang bisa diubah manual. Build sebaiknya gagal keras
 * daripada menerbitkan tautan ke domain asing atau atribut yang cacat.
 */
const ALLOWED_HOSTS = new Set(["poliban.ac.id", "www.poliban.ac.id"]);

function assertSafe(n) {
  let u;
  try {
    u = new URL(n.url);
  } catch {
    throw new Error(`Berita "${n.title}" memiliki URL tidak valid: ${n.url}`);
  }
  if (u.protocol !== "https:" || !ALLOWED_HOSTS.has(u.hostname)) {
    throw new Error(`Berita "${n.title}" menunjuk ke luar domain resmi: ${n.url}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(n.date)) {
    throw new Error(`Berita "${n.title}" memiliki tanggal tidak valid: ${n.date}`);
  }
  if (/[<>]/.test(n.title) || /[<>]/.test(n.summary ?? "")) {
    throw new Error(`Berita "${n.title}" masih memuat HTML mentah.`);
  }
  return n;
}

/** Semua berita resmi, terbaru dahulu. */
export const officialNews = cache.items.map((n) => ({
  ...assertSafe(n),
  sourceId: cache.sourceId,
}));

/**
 * Berita yang paling relevan bagi mahasiswa baru: pengumuman, penerimaan,
 * kemahasiswaan, dan akademik. Berita korporat/kelembagaan disaring keluar.
 */
const RELEVANT = new Set([
  "Pengumuman",
  "Penerimaan Mahasiswa Baru",
  "Mahasiswa Baru",
  "Akademik",
]);

export const studentNews = officialNews.filter((n) =>
  n.categories.some((c) => RELEVANT.has(c)),
);

/** @param {number} n */
export const latestNews = (n = 4) => studentNews.slice(0, n);

/** Berita PKKMB 2026 — dipakai sebagai rujukan utama pada beranda. */
export const pkkmbNews = officialNews.find((n) => n.slug.includes("pkkmb-2026-2027"));
