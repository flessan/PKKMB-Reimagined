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

/** Semua berita resmi, terbaru dahulu. */
export const officialNews = cache.items.map((n) => ({
  ...n,
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
