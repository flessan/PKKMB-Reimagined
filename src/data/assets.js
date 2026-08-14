/**
 * Pustaka aset lokal beserta metadata sumber.
 *
 * Semua berkas disalin ke repositori (tidak ada hotlink ke pihak ketiga),
 * dan setiap aset menyimpan URL asal, pemilik, serta ketentuan penggunaannya.
 * Atribusi yang wajib ditampilkan ditandai `requiresAttribution: true` dan
 * dirender pada halaman yang memakainya.
 */

export const assets = {
  logo: {
    file: "assets/img/logo-poliban.png",
    width: 192,
    height: 192,
    alt: "Lambang resmi Politeknik Negeri Banjarmasin",
    origin:
      "https://pkkmb.poliban.ac.id/storage/posts/08XReY9Scc2qd0kl2r53lIwCkW2CaxoFhRiXRyII.png",
    sourceId: "pkkmb-site",
    owner: "Politeknik Negeri Banjarmasin",
    note:
      "Dipotong dari spanduk resmi PKKMB 2026 yang diterbitkan pada situs PKKMB Poliban. Lambang institusi dipakai apa adanya, tidak digambar ulang maupun distilisasi.",
    requiresAttribution: false,
  },

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
    width: 459,
    height: 667,
    alt: "Potret resmi Joni Riadi, S.ST., M.T., Direktur Politeknik Negeri Banjarmasin",
    origin:
      "https://pkkmb.poliban.ac.id/storage/leaders/R8vXnFaFe3Dh5kyRdxscS4oNIuCLoBA1hdKbErya.jpg",
    sourceId: "pkkmb-site",
    owner: "Politeknik Negeri Banjarmasin",
    note: "Foto pimpinan yang diterbitkan sendiri oleh situs resmi PKKMB Poliban.",
    requiresAttribution: false,
  },

  campusGate: {
    file: "assets/img/kampus-gerbang.jpg",
    webp: "assets/img/kampus-gerbang.webp",
    width: 1400,
    height: 1050,
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
