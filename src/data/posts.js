/**
 * Berita & pengumuman PKKMB 2026.
 *
 * Isi `body` disalin dari konten asli situs (dibersihkan dari markup sisa
 * WYSIWYG). Slug dipertahankan agar tautan lama tetap hidup.
 */

export const categories = {
  "pengumuman-resmi": {
    label: "Pengumuman Resmi",
    tone: "accent",
    kind: "pengumuman",
  },
  akademik: { label: "Akademik", tone: "brand", kind: "berita" },
};

export const posts = [
  {
    slug: "pusat-informasi-resmi-pkkmb-342",
    title: "Pengumuman Pra-PKKMB Poliban 2026",
    listTitle: "Pengumuman Pra-PKKMB",
    category: "pengumuman-resmi",
    date: "2026-07-31",
    time: "00:00",
    author: "Humas Kampus",
    priority: 1,
    pinned: true,
    excerpt:
      "Ketentuan resmi Pra-PKKMB: seluruh peserta wajib membaca tata tertib, memahami rangkaian kegiatan, dan mengunduh dokumen panduan sebelum 3 Agustus 2026.",
    readMinutes: 3,
    body: [
      { t: "p", html: "Halo Mahasiswa Baru! Selamat datang di halaman resmi informasi PKKMB Poliban 2026." },
      {
        t: "p",
        html: "Untuk memastikan seluruh rangkaian kegiatan berjalan dengan lancar, tertib, dan aman, seluruh peserta diwajibkan untuk membaca, memahami, serta mematuhi Tata Tertib, Pengumuman Resmi, dan ketentuan yang berlaku.",
      },
      {
        t: "p",
        html: "Silakan unduh dokumen penting di bawah ini sebagai panduan Anda selama mengikuti kegiatan PKKMB.",
      },
      { t: "h2", html: "Hal yang perlu disiapkan" },
      {
        t: "ul",
        items: [
          "Pastikan akun Portal PKKMB Anda sudah dapat diakses sebelum hari pertama.",
          "Periksa kembali data diri, program studi, dan alamat surel yang terdaftar.",
          "Hadir tepat waktu pada Pra-PKKMB, <strong>Senin, 3 Agustus 2026</strong>.",
          "Gunakan atribut sesuai ketentuan pada dokumen tata tertib.",
        ],
      },
    ],
    attachments: [
      {
        name: "PENGUMUMAN PRA PKKMB 2026.pdf",
        href: "storage/post-attachments/9qFbK7y6WhIc43EWz4zZ3wiXukQZEaC0KYmmghsM.pdf",
        size: "659 KB",
      },
    ],
  },
  {
    slug: "tata-tertib-pkkmb-967",
    title: "Tata Tertib & Panduan Perilaku PKKMB Poliban 2026",
    listTitle: "Tata Tertib PKKMB",
    category: "pengumuman-resmi",
    date: "2026-07-31",
    time: "16:00",
    author: "Humas Kampus",
    priority: 2,
    pinned: true,
    excerpt:
      "Norma, aturan, dan panduan perilaku yang wajib dipahami seluruh mahasiswa baru agar kegiatan berlangsung aman, inklusif, dan kondusif.",
    readMinutes: 4,
    body: [
      { t: "h2", html: "Welcome to the Club, Young Innovators!" },
      {
        t: "p",
        html: "Selamat datang di halaman <strong>Tata Tertib PKKMB Poliban 2026</strong>.",
      },
      {
        t: "p",
        html: "Untuk menciptakan lingkungan pengenalan kampus yang aman, inklusif, kondusif, dan menyenangkan, seluruh Mahasiswa Baru (Maba) diwajibkan untuk memahami serta mematuhi norma dan aturan yang berlaku selama rangkaian kegiatan berlangsung.",
      },
      {
        t: "blockquote",
        html: "<p><strong>Aturan hadir bukan untuk membatasi, melainkan untuk melatih kedisiplinan, rasa saling menghormati, dan membangun sinergi awal di kampus vokasi kita tercinta.</strong></p><p><strong>Ingat, Sertifikat PKKMB merupakan salah satu syarat wajib untuk mengikuti Ujian Akhir Semester (UAS) serta kelulusan/wisuda di Politeknik Negeri Banjarmasin.</strong></p>",
      },
      {
        t: "p",
        html: "Mari jalani PKKMB 2026 ini dengan penuh semangat, rasa tanggung jawab, dan riang gembira. Selamat berproses!",
      },
      { t: "h2", html: "Ketentuan pokok" },
      {
        t: "ul",
        items: [
          "Hadir tepat waktu pada seluruh sesi dan melakukan presensi digital.",
          "Mengenakan atribut serta pakaian sesuai ketentuan panitia.",
          "Menjaga sikap saling menghormati antarpeserta, panitia, dan pemateri.",
          "Dilarang melakukan perundungan, kekerasan, maupun perpeloncoan dalam bentuk apa pun.",
          "Melaporkan kendala kesehatan kepada pendamping gugus sesegera mungkin.",
        ],
      },
      {
        t: "p",
        html: "Rincian lengkap, termasuk ketentuan atribut dan sanksi, tercantum pada dokumen resmi berikut.",
      },
    ],
    attachments: [
      {
        name: "TATIB PKKMB 2026.pdf",
        href: "storage/post-attachments/OdLHFfSsi8L6EMzUjpMnTNt8xQqvXFArwJLEM3Ma.pdf",
        size: "734 KB",
      },
    ],
  },
  {
    slug: "run-down-acara-pkkmb-poliban-341",
    title: "Rundown Acara PKKMB Poliban 2026",
    listTitle: "Rundown Acara PKKMB Poliban",
    category: "akademik",
    date: "2026-08-02",
    time: "00:00",
    author: "Humas Kampus",
    priority: 3,
    pinned: true,
    excerpt:
      "Susunan acara lengkap PKKMB Poliban 2026 dari Pra-PKKMB pada 3 Agustus hingga upacara penutupan pada 6 Agustus 2026.",
    readMinutes: 2,
    body: [
      {
        t: "p",
        html: "Berikut adalah susunan <strong>Rundown Acara PKKMB Poliban 2026</strong>. Peserta diharapkan menyesuaikan waktu kehadiran dengan jadwal setiap sesi.",
      },
      {
        t: "p",
        html: "Ringkasan rangkaian juga dapat dilihat pada <a href=\"../pkkmb.html#jadwal\">halaman jadwal kegiatan</a>. Apabila terjadi perubahan teknis, pengumuman resmi akan diterbitkan melalui situs ini.",
      },
    ],
    attachments: [
      {
        name: "RUNDOWN PKKMB 2026.pdf",
        href: "storage/post-attachments/EHQMKKGnvndcJiqUul4p8bXdXHFYEJ0LbPbz6h96.pdf",
        size: "75 KB",
      },
    ],
  },
  {
    slug: "kecerdasan-buatan-etika-ti-politeknik-negeri-banjarmasin-194",
    title: "Materi: Kecerdasan Buatan & Etika Teknologi Informasi",
    listTitle: "Kecerdasan Buatan & Etika TI",
    category: "akademik",
    date: "2026-08-06",
    time: "00:00",
    author: "Humas Kampus",
    priority: 4,
    excerpt:
      "Salinan materi sesi Kecerdasan Buatan & Etika Teknologi Informasi yang disampaikan pada rangkaian PKKMB Politeknik Negeri Banjarmasin.",
    readMinutes: 2,
    body: [
      {
        t: "p",
        html: "Materi <strong>Kecerdasan Buatan &amp; Etika Teknologi Informasi</strong> disampaikan pada rangkaian PKKMB Politeknik Negeri Banjarmasin sebagai bekal literasi digital mahasiswa baru.",
      },
      {
        t: "p",
        html: "Salinan lengkap paparan dapat diunduh pada lampiran di bawah untuk dipelajari kembali setelah kegiatan berlangsung.",
      },
    ],
    attachments: [
      {
        name: "Kecerdasan Buatan & Etika TI.pdf",
        href: "storage/post-attachments/WTPBUil4UkAvlq969l2AulEWu3PBzxmnoDxfU9qb.pdf",
        size: "708 KB",
      },
    ],
  },
  {
    slug: "frame-video-dan-instagram-pkkmb-187",
    title: "Twibbon, Frame Video, dan Konten Instagram PKKMB",
    listTitle: "Twibbon & Frame Video PKKMB",
    category: "akademik",
    date: "2026-07-31",
    time: "00:00",
    author: "Humas Kampus",
    priority: 5,
    excerpt:
      "Panduan mengunggah twibbon dan video perkenalan mahasiswa baru di Instagram maupun TikTok, lengkap dengan contoh caption dan tagar resmi.",
    readMinutes: 3,
    body: [
      {
        t: "p",
        html: "Halo calon mahasiswa baru Politeknik Negeri Banjarmasin! Sudah siap menyambut PKKMB 2026?",
      },
      {
        t: "p",
        html: "Kalian dapat mengunggah video di Instagram atau TikTok menggunakan frame PKKMB. Berikut contoh caption yang bisa digunakan.",
      },
      { t: "h2", html: "Contoh caption" },
      {
        t: "blockquote",
        html: "<p><strong>I’M READY FOR PKKMB POLIBAN 2026!!!</strong></p><p>Halo, perkenalkan saya [Nama], atau yang sering dipanggil [Nama panggilan], dari Jurusan [Nama jurusan], Program Studi [Nama prodi], Politeknik Negeri Banjarmasin. Saya siap mengikuti PKKMB Poliban 2026 dengan tema “Bersinergi, Berinovasi, dan Berdampak Bersama Poliban”.</p><p>@poliban_official @bempoliban</p>",
      },
      {
        t: "p",
        html: "Jangan lupa menandai dan mengikuti akun resmi Poliban serta BEM di Instagram dan TikTok.",
      },
      { t: "h2", html: "Tagar resmi" },
      {
        t: "p",
        html: "#pkkmb2026 #pkkmbpoliban #polibanuntukyangterbaik #ulunsiapumpatpkkmb2026 #diktisaintekberdampak",
      },
      { t: "h2", html: "Berkas pendukung" },
      {
        t: "ul",
        items: [
          'Twibbon resmi: <a href="https://www.twibbonize.com/poliban-pkkmb2026" rel="noopener">twibbonize.com/poliban-pkkmb2026</a>',
          'Contoh konten dan aset: <a href="https://drive.google.com/drive/folders/1nAV6sxQ1rxMVqazrLQjJ3BOm_eXCg17U?usp=share_link" rel="noopener">unduh melalui Google Drive</a>',
        ],
      },
      {
        t: "p",
        html: "Kami tunggu kehadiran kalian pada Pra-PKKMB <strong>3 Agustus 2026</strong> dan PKKMB <strong>4–6 Agustus 2026</strong>.",
      },
    ],
    links: [
      {
        label: "Buka Twibbonize",
        href: "https://www.twibbonize.com/poliban-pkkmb2026",
      },
      {
        label: "Unduh aset konten",
        href: "https://drive.google.com/drive/folders/1nAV6sxQ1rxMVqazrLQjJ3BOm_eXCg17U?usp=share_link",
      },
    ],
  },
];

export const announcements = posts.filter(
  (p) => categories[p.category].kind === "pengumuman",
);

export const news = posts.filter((p) => categories[p.category].kind === "berita");

export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date) - new Date(a.date) || a.priority - b.priority,
);
