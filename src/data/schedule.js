/**
 * Rangkaian PKKMB 2026.
 * Tanggal diambil dari pengumuman resmi: Pra-PKKMB 3 Agustus,
 * PKKMB 4–6 Agustus, perkuliahan perdana 24 Agustus 2026.
 */

export const eventWindow = {
  preStart: "2026-08-03",
  start: "2026-08-04",
  end: "2026-08-06",
  lectureStart: "2026-08-24",
};

export const schedule = [
  {
    id: "pra-pkkmb",
    date: "2026-08-03",
    dateLabel: "Senin, 3 Agustus 2026",
    phase: "Pra-PKKMB",
    title: "Pra-PKKMB & Verifikasi Peserta",
    time: "07.00 – 15.00 WITA",
    venue: "Aula Utama & Gedung Jurusan",
    summary:
      "Registrasi ulang, pembagian gugus, pengecekan kelengkapan atribut, serta simulasi presensi digital melalui Portal PKKMB.",
    items: [
      "Registrasi ulang dan verifikasi berkas mahasiswa baru",
      "Pembagian kelompok/gugus dan pengenalan pendamping",
      "Uji coba login serta presensi pada Portal PKKMB",
      "Pengarahan tata tertib dan perlengkapan wajib",
    ],
  },
  {
    id: "hari-1",
    date: "2026-08-04",
    dateLabel: "Selasa, 4 Agustus 2026",
    phase: "Hari ke-1",
    title: "Pembukaan & Wawasan Kebangsaan",
    time: "06.30 – 16.00 WITA",
    venue: "Lapangan Upacara & Aula Utama",
    summary:
      "Upacara pembukaan bersama Direktur, materi wawasan kebangsaan, bela negara, serta pengenalan sistem pendidikan tinggi vokasi.",
    items: [
      "Apel pagi dan presensi masuk",
      "Upacara pembukaan PKKMB oleh Direktur Poliban",
      "Materi wawasan kebangsaan dan bela negara",
      "Pengenalan sistem pendidikan tinggi vokasi",
    ],
  },
  {
    id: "hari-2",
    date: "2026-08-05",
    dateLabel: "Rabu, 5 Agustus 2026",
    phase: "Hari ke-2",
    title: "Akademik, Kemahasiswaan & Literasi Digital",
    time: "06.30 – 16.00 WITA",
    venue: "Aula Utama & Ruang Jurusan",
    summary:
      "Pengenalan layanan akademik, organisasi kemahasiswaan, kesehatan mental, serta materi Kecerdasan Buatan & Etika Teknologi Informasi.",
    items: [
      "Layanan akademik, SIAKAD, dan kurikulum vokasi",
      "Pengenalan organisasi kemahasiswaan dan UKM",
      "Materi Kecerdasan Buatan & Etika TI",
      "Layanan bimbingan konseling dan kesehatan mental",
    ],
  },
  {
    id: "hari-3",
    date: "2026-08-06",
    dateLabel: "Kamis, 6 Agustus 2026",
    phase: "Hari ke-3",
    title: "Pengenalan Jurusan & Penutupan",
    time: "06.30 – 15.00 WITA",
    venue: "Gedung Jurusan & Aula Utama",
    summary:
      "Sesi jurusan dan program studi masing-masing, pentas kreativitas mahasiswa baru, lalu upacara penutupan dan penyerahan sertifikat.",
    items: [
      "Sesi jurusan dan program studi masing-masing",
      "Kunjungan laboratorium dan bengkel",
      "Pentas kreativitas mahasiswa baru",
      "Upacara penutupan dan informasi sertifikat PKKMB",
    ],
  },
  {
    id: "kuliah-perdana",
    date: "2026-08-24",
    dateLabel: "Senin, 24 Agustus 2026",
    phase: "Pascakegiatan",
    title: "Perkuliahan Semester Ganjil Dimulai",
    time: "Sesuai jadwal prodi",
    venue: "Seluruh gedung perkuliahan",
    summary:
      "Perkuliahan perdana tahun akademik 2026/2027 dimulai. Pastikan sertifikat PKKMB dan akun akademik telah aktif.",
    items: [
      "Perkuliahan perdana tahun akademik 2026/2027",
      "Aktivasi akun akademik dan kartu mahasiswa",
      "Pengambilan sertifikat PKKMB",
    ],
  },
];

/** Langkah yang harus dilakukan peserta, ditampilkan di halaman PKKMB. */
export const participantSteps = [
  {
    step: 1,
    title: "Baca pengumuman Pra-PKKMB",
    body:
      "Unduh dan pelajari pengumuman resmi Pra-PKKMB beserta tata tertib. Seluruh ketentuan atribut dan sanksi tercantum di sana.",
    action: { label: "Buka pengumuman", href: "pengumuman.html" },
  },
  {
    step: 2,
    title: "Aktifkan akun Portal PKKMB",
    body:
      "Portal memakai email yang telah didaftarkan panitia. Masuk dengan kata sandi atau akun Google institusi, lalu pastikan data diri sudah benar.",
    action: { label: "Masuk portal", href: "login.html" },
  },
  {
    step: 3,
    title: "Siapkan atribut & perlengkapan",
    body:
      "Kenakan pakaian sesuai ketentuan, bawa kartu identitas peserta, alat tulis, obat pribadi, serta bekal air minum untuk kegiatan lapangan.",
    action: { label: "Lihat tata tertib", href: "berita/tata-tertib-pkkmb-967.html" },
  },
  {
    step: 4,
    title: "Presensi setiap sesi",
    body:
      "Presensi dilakukan digital pada setiap sesi. Kehadiran penuh menjadi syarat terbitnya sertifikat PKKMB.",
    action: { label: "Cek jadwal sesi", href: "pkkmb.html#jadwal" },
  },
  {
    step: 5,
    title: "Ikuti kanal resmi",
    body:
      "Unggah twibbon dan video perkenalan, lalu pantau kanal resmi Poliban agar tidak tertinggal informasi perubahan teknis.",
    action: {
      label: "Panduan twibbon",
      href: "berita/frame-video-dan-instagram-pkkmb-187.html",
    },
  },
];

export const faq = [
  {
    q: "Apakah PKKMB wajib diikuti seluruh mahasiswa baru?",
    a: "Ya. PKKMB wajib diikuti seluruh mahasiswa baru Politeknik Negeri Banjarmasin tahun akademik 2026/2027, baik jenjang D3 maupun D4.",
  },
  {
    q: "Mengapa sertifikat PKKMB penting?",
    a: "Sertifikat PKKMB merupakan salah satu syarat wajib untuk mengikuti Ujian Akhir Semester (UAS) serta kelulusan dan wisuda di Politeknik Negeri Banjarmasin. Sertifikat terbit apabila kehadiran peserta terpenuhi.",
  },
  {
    q: "Bagaimana cara masuk ke Portal PKKMB?",
    a: "Gunakan alamat email yang telah didaftarkan panitia. Anda dapat masuk dengan kata sandi maupun tombol Google Account. Sistem hanya mengizinkan akun yang telah terdaftar secara resmi oleh administrator.",
  },
  {
    q: "Saya lupa kata sandi atau akun tidak dikenali. Apa yang harus dilakukan?",
    a: "Hubungi panitia melalui WhatsApp bantuan atau surel resmi dengan menyertakan nama lengkap, program studi, dan alamat email yang didaftarkan. Jangan membuat akun baru sendiri.",
  },
  {
    q: "Bagaimana jika saya berhalangan hadir karena sakit?",
    a: "Ketidakhadiran hanya dapat dipertimbangkan dengan surat keterangan resmi (misalnya surat dokter) yang disampaikan kepada panitia melalui pendamping gugus pada hari yang sama.",
  },
  {
    q: "Apa saja yang wajib dibawa selama kegiatan?",
    a: "Kartu identitas peserta, alat tulis, perlengkapan ibadah, obat pribadi bila diperlukan, botol minum, serta atribut sesuai ketentuan pada dokumen tata tertib.",
  },
  {
    q: "Kapan perkuliahan reguler dimulai?",
    a: "Perkuliahan semester ganjil tahun akademik 2026/2027 dimulai pada 24 Agustus 2026 sesuai jadwal masing-masing program studi.",
  },
];
