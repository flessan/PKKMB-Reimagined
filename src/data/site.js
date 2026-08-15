/**
 * Data institusi & konfigurasi global.
 * Semua nilai di bawah berasal dari konten situs PKKMB Poliban yang asli.
 */

export const site = {
  name: "PKKMB Poliban 2026",
  institution: "Politeknik Negeri Banjarmasin",
  institutionShort: "Poliban",
  tagline: "Bersinergi, Berinovasi, dan Berdampak Bersama Poliban",
  year: 2026,
  locale: "id-ID",
  lang: "id",
  description:
    "Pusat informasi resmi Pengenalan Kehidupan Kampus bagi Mahasiswa Baru (PKKMB) 2026 Politeknik Negeri Banjarmasin: jadwal, tata tertib, pengumuman, dan portal presensi.",
  url: "https://pkkmb.poliban.ac.id",
  organiser: "UPT Komputer Politeknik Negeri Banjarmasin",
  contact: {
    /** Alamat & kontak sesuai footer resmi poliban.ac.id. */
    address: "Jl. Brigjen H. Hasan Basri, Kayu Tangi, Banjarmasin 70123",
    addressShort: "Jl. Brigjen H. Hasan Basri, Kayu Tangi, Banjarmasin",
    phone: "(0511) 330 5052",
    phoneHref: "tel:+625113305052",
    email: "info@poliban.ac.id",
    /** Kanal khusus penerimaan & akademik (portal SPMB resmi). */
    academicEmail: "akademik@poliban.ac.id",
    hotline: "0812 5809 6162",
    hotlineHref: "https://wa.me/6281258096162?text=Saya%20tanya%20terkait%20pendaftaran",
    whatsapp: "+62 882-4625-9077",
    whatsappHref:
      "https://wa.me/6288246259077?text=Selamat%20datang%20maba%20poliban%2C%20ada%20yang%20bisa%20di%20bantu",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.1170714288305!2d114.57935537483561!3d-3.295693896679204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de423a80d47ba6b%3A0x8f5abfaddfe5a2d7!2sPoliteknik%20Negeri%20Banjarmasin!5e1!3m2!1sid!2sid!4v1785518707912!5m2!1sid!2sid",
    mapLink: "https://maps.app.goo.gl/8ZQ4zZ7Yy8Z9Y1Zt8",
  },
  /** Tautan sistem resmi yang benar-benar aktif (footer poliban.ac.id). */
  systems: [
    { label: "Situs utama Poliban", href: "https://poliban.ac.id", desc: "Berita dan informasi institusi" },
    { label: "SPMB Poliban", href: "https://pmb.poliban.ac.id/", desc: "Penerimaan mahasiswa baru" },
    { label: "SIMPADU", href: "https://simpadu.poliban.ac.id/", desc: "Sistem informasi akademik" },
    { label: "E-Learning", href: "https://elearning.poliban.ac.id/", desc: "Pembelajaran daring" },
    { label: "UPT TIK", href: "http://tik.poliban.ac.id/", desc: "Layanan teknologi informasi" },
    { label: "Repository", href: "http://repository.poliban.ac.id/", desc: "Karya ilmiah dan tugas akhir" },
  ],
  social: [
    {
      label: "Instagram Poliban",
      short: "Instagram",
      href: "https://www.instagram.com/poliban_official/?hl=en",
      icon: "instagram",
    },
    {
      label: "YouTube Poliban",
      short: "YouTube",
      href: "https://www.youtube.com/channel/UC5CfzvUTqEUPXhwwSLvP53Q",
      icon: "youtube",
    },
    {
      label: "Facebook Poliban",
      short: "Facebook",
      href: "https://www.facebook.com/poliban.ac.id/",
      icon: "facebook",
    },
  ],
  /** Endpoint autentikasi asli aplikasi Laravel - jangan diubah. */
  auth: {
    action: "https://pkkmb.poliban.ac.id/login",
    google:
      "https://accounts.google.com/o/oauth2/auth?client_id=205540027859-m3q6f8bq8p9aiculteju1s87qks2gith.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fpkkmb.poliban.ac.id%2Flogin%2Fgoogle%2Fcallback&scope=openid+profile+email&response_type=code&state=e5eyGZSAUWFqla36xcPWoCRIoGO3LQuoKlHotV0t",
  },
};

/** Navigasi utama - 4 kelompok, bukan 8 tautan lepas. */
export const nav = [
  { label: "Beranda", href: "index.html" },
  {
    label: "PKKMB 2026",
    href: "pkkmb.html",
    children: [
      {
        label: "Panduan Peserta",
        href: "pkkmb.html",
        desc: "Alur, syarat, dan perlengkapan wajib",
      },
      {
        label: "Jadwal & Rangkaian",
        href: "pkkmb.html#jadwal",
        desc: "Pra-PKKMB hingga penutupan",
      },
      {
        label: "Tata Tertib",
        href: "berita/tata-tertib-pkkmb-967.html",
        desc: "Aturan dan sanksi selama kegiatan",
      },
      {
        label: "Pertanyaan Umum",
        href: "pkkmb.html#faq",
        desc: "Jawaban atas kendala tersering",
      },
    ],
  },
  { label: "Pengumuman", href: "pengumuman.html" },
  { label: "Berita", href: "berita.html" },
  {
    label: "Kampus",
    href: "profil.html",
    children: [
      {
        label: "Profil Poliban",
        href: "profil.html",
        desc: "Sejarah, visi-misi, dan pimpinan",
      },
      {
        label: "Program Studi",
        href: "program-studi.html",
        desc: "22 prodi D2, D3, & Sarjana Terapan",
      },
      {
        label: "Fasilitas",
        href: "fasilitas.html",
        desc: "Sarana belajar dan kemahasiswaan",
      },
      {
        label: "Kontak & Bantuan",
        href: "kontak.html",
        desc: "Kanal resmi panitia PKKMB",
      },
    ],
  },
];

export const footerNav = [
  {
    title: "PKKMB 2026",
    links: [
      { label: "Panduan peserta", href: "pkkmb.html" },
      { label: "Jadwal kegiatan", href: "pkkmb.html#jadwal" },
      { label: "Tata tertib", href: "berita/tata-tertib-pkkmb-967.html" },
      { label: "Unduhan dokumen", href: "pkkmb.html#unduhan" },
      { label: "Pertanyaan umum", href: "pkkmb.html#faq" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Pengumuman resmi", href: "pengumuman.html" },
      { label: "Berita terkini", href: "berita.html" },
      { label: "Program studi", href: "program-studi.html" },
      { label: "Fasilitas kampus", href: "fasilitas.html" },
      { label: "Profil Poliban", href: "profil.html" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "Portal presensi", href: "login.html" },
      { label: "Kontak panitia", href: "kontak.html" },
      { label: "Sumber & rujukan", href: "sumber.html" },
      { label: "WhatsApp bantuan", href: site.contact.whatsappHref, external: true },
    ],
  },
  {
    title: "Sistem Poliban",
    links: site.systems.slice(0, 5).map((s) => ({
      label: s.label,
      href: s.href,
      external: true,
    })),
  },
];
