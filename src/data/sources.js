/**
 * Registri sumber resmi.
 *
 * Setiap fakta faktual pada situs ini menunjuk ke salah satu id di bawah,
 * sehingga klaim dapat ditelusuri kembali ke sumbernya. `checked` adalah
 * tanggal verifikasi terakhir oleh tim pengembang.
 *
 * status:
 *   "official"   — domain resmi Poliban atau sistem resminya
 *   "press"      — kantor berita/kredibel, dipakai untuk melengkapi
 *   "commons"    — repositori media berlisensi bebas
 */

export const sources = {
  "pkkmb-site": {
    label: "Situs PKKMB Poliban",
    url: "https://pkkmb.poliban.ac.id/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "pkkmb-tatib": {
    label: "Tata Tertib PKKMB Poliban 2026",
    url: "https://pkkmb.poliban.ac.id/berita/tata-tertib-pkkmb-967",
    publisher: "Humas Poliban",
    status: "official",
    published: "2026-07-31",
    checked: "2026-08-14",
  },
  "pkkmb-twibbon": {
    label: "Twibbonize, Frame Video dan Instagram PKKMB",
    url: "https://pkkmb.poliban.ac.id/berita/frame-video-dan-instagram-pkkmb-187",
    publisher: "Humas Poliban",
    status: "official",
    published: "2026-07-31",
    checked: "2026-08-14",
  },
  "poliban-pkkmb-2026": {
    label: "Poliban Sambut 1.817 Mahasiswa Baru melalui PKKMB 2026/2027",
    url: "https://poliban.ac.id/poliban-sambut-1-817-mahasiswa-baru-melalui-pkkmb-2026-2027/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    published: "2026-08-07",
    checked: "2026-08-14",
  },
  "antara-pkkmb-2026": {
    label: "Poliban kenalkan kehidupan kampus kepada 1.817 mahasiswa baru",
    url: "https://kalsel.antaranews.com/berita/529420/poliban-kenalkan-kehidupan-kampus-kepada-1817-mahasiswa-baru",
    publisher: "ANTARA News Kalimantan Selatan",
    status: "press",
    published: "2026-08-06",
    checked: "2026-08-14",
    note: "Dipakai hanya sebagai konfirmasi fakta. Situs melarang pengambilan konten/aset.",
  },
  "poliban-home": {
    label: "Beranda Politeknik Negeri Banjarmasin",
    url: "https://poliban.ac.id/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "poliban-sejarah": {
    label: "Sejarah Poliban",
    url: "https://poliban.ac.id/sejarah-poliban/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "poliban-direksi": {
    label: "Profil Direksi Poliban",
    url: "https://poliban.ac.id/profil-direksi-poliban/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "pmb-prodi": {
    label: "Informasi Program Studi — SPMB Poliban",
    url: "https://pmb.poliban.ac.id/program-studi",
    publisher: "Politeknik Negeri Banjarmasin (siAkad Cloud)",
    status: "official",
    checked: "2026-08-14",
  },
  "poliban-elektro": {
    label: "Jurusan Teknik Elektro",
    url: "https://poliban.ac.id/elektro/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "poliban-sipil": {
    label: "Jurusan Teknik Sipil dan Kebumian",
    url: "https://poliban.ac.id/sipil/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "poliban-perpustakaan": {
    label: "UPA Perpustakaan Poliban Dorong Pemanfaatan E-Jurnal Cambridge",
    url: "https://poliban.ac.id/upa-perpustakaan-poliban-dorong-pemanfaatan-e-jurnal-cambridge-untuk-penelitian/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    published: "2026-06-02",
    checked: "2026-08-14",
  },
  "poliban-wp-api": {
    label: "WP REST API Politeknik Negeri Banjarmasin",
    url: "https://poliban.ac.id/wp-json/wp/v2/posts",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
    note:
      "Endpoint JSON publik bawaan WordPress pada situs resmi. Dipakai sebagai sumber berita terkini melalui pembaruan cache manual (npm run refresh:news), bukan pengambilan saat runtime.",
  },
  "poliban-pkkmb-2024-penutupan": {
    label: "Hadiri Upacara Penutupan PKKMB 2024, Ini Pesan Direktur Poliban Untuk Para Maba",
    url: "https://poliban.ac.id/hadiri-upacara-penutupan-pkkmb-2024-ini-pesan-direktur-poliban-untuk-para-maba/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    published: "2024-08-16",
    checked: "2026-08-14",
  },
  "poliban-penerimaan-2024": {
    label: "Penerimaan Mahasiswa Baru 2024 — Politeknik Negeri Banjarmasin",
    url: "https://poliban.ac.id/penerimaan2024/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "poliban-video-profile": {
    label: "Video Profile Poliban 2024",
    url: "https://poliban.ac.id/video-profile-poliban-2024/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "poliban-our-blog": {
    label: "Arsip berita Politeknik Negeri Banjarmasin",
    url: "https://poliban.ac.id/our-blog/",
    publisher: "Politeknik Negeri Banjarmasin",
    status: "official",
    checked: "2026-08-14",
  },
  "commons-poliban": {
    label: "File:Politeknik Negeri Banjarmasin.jpg",
    url: "https://commons.wikimedia.org/wiki/File:Politeknik_Negeri_Banjarmasin.jpg",
    publisher: "Wikimedia Commons",
    status: "commons",
    published: "2011-12-26",
    checked: "2026-08-14",
    license: "Attribution (bebas dipakai dengan atribusi)",
    author: "Arief Rahman Saan (Ezagren)",
  },
};

/** @param {keyof typeof sources} id */
export function source(id) {
  const s = sources[id];
  if (!s) throw new Error(`Sumber tidak dikenal: ${id}`);
  return s;
}

/**
 * Status verifikasi sebuah fakta.
 * "verified"   — dikonfirmasi minimal satu sumber resmi
 * "mirror"     — berasal dari mirror situs PKKMB (belum ada sumber lain)
 * "unverified" — tidak dapat dikonfirmasi; jangan tampilkan sebagai fakta
 */
export const VERIFIED = "verified";
export const MIRROR = "mirror";
export const UNVERIFIED = "unverified";
