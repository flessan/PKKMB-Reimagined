/**
 * Rangkaian PKKMB 2026.
 *
 * TANGGAL bersifat terverifikasi:
 *  - Pra-PKKMB 3 Agustus 2026 (pkkmb.poliban.ac.id, pos twibbon)
 *  - PKKMB 4–6 Agustus 2026 (poliban.ac.id & ANTARA Kalsel)
 *  - Perkuliahan perdana 24 Agustus 2026 (situs PKKMB)
 *
 * MATERI harian diringkas dari pernyataan resmi Direktur bahwa pembekalan
 * mencakup "pengenalan lingkungan akademik, wawasan kebangsaan sebagai bekal
 * memasuki dunia pendidikan tinggi, serta penanaman nilai-nilai kedisiplinan".
 * Susunan jam per sesi TIDAK dipublikasikan di web — hanya tersedia pada
 * lampiran PDF rundown, sehingga halaman jadwal menautkan dokumen aslinya
 * alih-alih menampilkan jam yang tidak dapat diverifikasi.
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
    time: "Lihat rundown resmi",
    venue: "Kampus Poliban",
    summary:
      "Kegiatan pendahuluan sebelum rangkaian utama. Ketentuan lengkap tercantum pada dokumen Pengumuman Pra-PKKMB 2026.",
    items: [
      "Persiapan peserta sesuai pengumuman resmi Pra-PKKMB",
      "Pastikan akun Portal PKKMB dapat diakses",
      "Pelajari tata tertib dan perlengkapan wajib",
    ],
  },
  {
    id: "hari-1",
    date: "2026-08-04",
    dateLabel: "Selasa, 4 Agustus 2026",
    phase: "Hari ke-1",
    title: "Pembukaan & Wawasan Kebangsaan",
    time: "Lihat rundown resmi",
    venue: "Kampus Poliban",
    summary:
      "Pembukaan rangkaian PKKMB dan pembekalan wawasan kebangsaan sebagai bekal memasuki dunia pendidikan tinggi.",
    items: [
      "Presensi kehadiran melalui Portal PKKMB",
      "Pembukaan PKKMB bersama pimpinan Poliban",
      "Wawasan kebangsaan dan penanaman nilai kedisiplinan",
    ],
  },
  {
    id: "hari-2",
    date: "2026-08-05",
    dateLabel: "Rabu, 5 Agustus 2026",
    phase: "Hari ke-2",
    title: "Akademik, Kemahasiswaan & Literasi Digital",
    time: "Lihat rundown resmi",
    venue: "Kampus Poliban",
    summary:
      "Pengenalan lingkungan akademik Poliban serta materi literasi digital, termasuk Kecerdasan Buatan & Etika Teknologi Informasi.",
    items: [
      "Pengenalan lingkungan dan layanan akademik",
      "Materi Kecerdasan Buatan & Etika TI",
      "Pengenalan kegiatan kemahasiswaan",
    ],
  },
  {
    id: "hari-3",
    date: "2026-08-06",
    dateLabel: "Kamis, 6 Agustus 2026",
    phase: "Hari ke-3",
    title: "Pengenalan Jurusan & Penutupan",
    time: "Lihat rundown resmi",
    venue: "Kampus Poliban",
    summary:
      "Pengenalan jurusan dan program studi masing-masing, dilanjutkan penutupan rangkaian PKKMB 2026.",
    items: [
      "Sesi jurusan dan program studi",
      "Pengenalan sarana praktik dan laboratorium",
      "Penutupan rangkaian PKKMB",
    ],
  },
  {
    id: "kuliah-perdana",
    date: "2026-08-24",
    dateLabel: "Senin, 24 Agustus 2026",
    phase: "Pascakegiatan",
    title: "Perkuliahan Semester Ganjil Dimulai",
    time: "Sesuai jadwal prodi",
    venue: "Sesuai jadwal program studi",
    summary:
      "Perkuliahan tahun akademik 2026/2027 dimulai sesuai jadwal masing-masing program studi.",
    items: ["Perkuliahan perdana tahun akademik 2026/2027"],
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
      "Ketentuan atribut, perlengkapan wajib, dan norma perilaku selama kegiatan tercantum lengkap pada dokumen Tata Tertib PKKMB 2026.",
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
    q: "Bagaimana jika saya berhalangan hadir?",
    a: "Ketentuan izin dan ketidakhadiran diatur pada dokumen Tata Tertib PKKMB 2026. Segera hubungi panitia melalui kanal resmi agar kehadiran Anda dapat ditindaklanjuti.",
  },
  {
    q: "Apa saja yang wajib dibawa selama kegiatan?",
    a: "Ketentuan atribut dan perlengkapan wajib tercantum pada dokumen Tata Tertib PKKMB 2026 yang dapat diunduh pada halaman pengumuman. Ikuti dokumen tersebut sebagai acuan utama.",
  },
  {
    q: "Berapa jumlah peserta PKKMB 2026?",
    a: "Sebanyak 1.817 mahasiswa baru mengikuti PKKMB tahun akademik 2026/2027 — meningkat dibandingkan sekitar 1.400 peserta pada tahun 2025.",
  },
  {
    q: "Apakah ada perpeloncoan selama PKKMB?",
    a: "Tidak. Direktur Poliban menegaskan pelaksanaan PKKMB berlangsung menyenangkan dan bebas dari segala bentuk tindakan kekerasan maupun diskriminatif, sejalan dengan slogan kampus happy and friendly.",
  },
  {
    q: "Kapan perkuliahan reguler dimulai?",
    a: "Perkuliahan semester ganjil tahun akademik 2026/2027 dimulai pada 24 Agustus 2026 sesuai jadwal masing-masing program studi.",
  },
];
