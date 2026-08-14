/**
 * Pustaka aset lokal beserta metadata sumber.
 *
 * Semua berkas disalin ke repositori (tidak ada hotlink ke pihak ketiga),
 * dan setiap aset menyimpan URL asal, pemilik, serta ketentuan penggunaannya.
 * Atribusi yang wajib ditampilkan ditandai `requiresAttribution: true` dan
 * dirender pada halaman yang memakainya.
 */

export const assets = {
  banner: {
    file: "assets/img/pkkmb-banner.png",
    webp: "assets/img/pkkmb-banner.webp",
    width: 648,
    height: 166,
    alt:
      "Spanduk resmi PKKMB Poliban 2026 memuat lambang Tut Wuri Handayani, Politeknik Negeri Banjarmasin, Diktisaintek Berdampak, dan HUT ke-81 Republik Indonesia",
    origin:
      "https://pkkmb.poliban.ac.id/storage/posts/08XReY9Scc2qd0kl2r53lIwCkW2CaxoFhRiXRyII.png",
    sourceId: "pkkmb-site",
    owner: "Politeknik Negeri Banjarmasin",
    note: "Spanduk resmi yang dipakai pada seluruh pos berita PKKMB 2026.",
    requiresAttribution: false,
  },

  director: {
    file: "assets/img/direktur.jpg",
    width: 600,
    height: 872,
    alt: "Potret resmi Joni Riadi, S.ST., M.T., Direktur Politeknik Negeri Banjarmasin",
    origin:
      "https://pkkmb.poliban.ac.id/storage/leaders/R8vXnFaFe3Dh5kyRdxscS4oNIuCLoBA1hdKbErya.jpg",
    sourceId: "pkkmb-site",
    owner: "Politeknik Negeri Banjarmasin",
    note: "Foto pimpinan yang diterbitkan sendiri oleh situs resmi PKKMB Poliban.",
    requiresAttribution: false,
  },

  wordmark: {
    file: "assets/img/logo-poliban-wordmark.png",
    width: 680,
    height: 214,
    alt: "Logo resmi Politeknik Negeri Banjarmasin: lambang perisai dengan tulisan POLIBAN",
    origin: "https://poliban.ac.id/wp-content/uploads/2021/12/poliban2.png",
    sourceId: "poliban-video-profile",
    owner: "Politeknik Negeri Banjarmasin",
    note:
      "Logo horizontal yang dipakai sebagai kop situs resmi poliban.ac.id. Hanya dipangkas margin kosongnya; proporsi, warna, dan bentuk lambang tidak diubah.",
    requiresAttribution: false,
  },

  crest: {
    file: "assets/img/logo-poliban-lambang.png",
    width: 320,
    height: 313,
    alt: "Lambang Politeknik Negeri Banjarmasin",
    origin:
      "https://poliban.ac.id/wp-content/uploads/2024/01/logo-poliban_kecil_dg_padding.jpg",
    sourceId: "poliban-penerimaan-2024",
    owner: "Politeknik Negeri Banjarmasin",
    note:
      "Lambang institusi versi resmi dari laman penerimaan mahasiswa baru. Dipakai apa adanya tanpa digambar ulang.",
    requiresAttribution: false,
  },

  campusSignage: {
    file: "assets/img/kampus-signage.jpg",
    webp: "assets/img/kampus-signage.webp",
    width: 1170,
    height: 780,
    alt:
      "Papan nama Politeknik Negeri Banjarmasin di lobi kampus dengan sivitas akademika berfoto bersama di depannya",
    origin:
      "https://poliban.ac.id/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-24-at-22.57.53_59a2ec78-1170x780.jpg",
    sourceId: "poliban-our-blog",
    owner: "Politeknik Negeri Banjarmasin",
    note:
      "Dokumentasi kegiatan yang diterbitkan sendiri pada arsip berita resmi Poliban. Memperlihatkan papan nama institusi dan lambang resmi.",
    requiresAttribution: false,
  },

  pkkmbDirector: {
    file: "assets/img/pkkmb-2024-direktur.jpg",
    webp: "assets/img/pkkmb-2024-direktur.webp",
    width: 952,
    height: 591,
    alt:
      "Direktur Poliban menyampaikan sambutan di panggung PKKMB dengan latar spanduk Pengenalan Kehidupan Kampus bagi Mahasiswa Baru",
    origin:
      "https://poliban.ac.id/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-16-at-10.17.22-1-1.jpeg",
    sourceId: "poliban-pkkmb-2024-penutupan",
    owner: "Politeknik Negeri Banjarmasin",
    captured: "2024-08-16",
    note:
      "Dokumentasi resmi upacara penutupan PKKMB 2024. Dipakai sebagai gambaran suasana PKKMB dan selalu diberi keterangan tahun agar tidak disalahartikan sebagai dokumentasi 2026.",
    caption: "Dokumentasi PKKMB Poliban 2024",
    requiresAttribution: false,
  },

  campusGate: {
    file: "assets/img/kampus-gerbang.jpg",
    webp: "assets/img/kampus-gerbang.webp",
    width: 1200,
    height: 900,
    alt: "Gerbang masuk kampus Politeknik Negeri Banjarmasin",
    origin:
      "https://commons.wikimedia.org/wiki/File:Politeknik_Negeri_Banjarmasin.jpg",
    sourceId: "commons-poliban",
    owner: "Arief Rahman Saan (Ezagren)",
    license: "Attribution — bebas dipakai untuk tujuan apa pun dengan atribusi",
    captured: "2011-12-26",
    note:
      "Foto dokumenter kampus berlisensi bebas. Atribusi wajib ditampilkan pada halaman yang memuatnya.",
    requiresAttribution: true,
    attribution: "Foto: Arief Rahman Saan (Ezagren) / Wikimedia Commons",
  },
};

/** @param {keyof typeof assets} id */
export function asset(id) {
  const a = assets[id];
  if (!a) throw new Error(`Aset tidak dikenal: ${id}`);
  return a;
}

/** Aset yang atribusinya wajib ditampilkan. */
export const attributedAssets = Object.values(assets).filter(
  (a) => a.requiresAttribution,
);
