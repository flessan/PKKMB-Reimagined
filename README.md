
<img src="https://github.com/flessan/PKKMB-Reimagined/blob/main/src/media/kampus-gerbang.jpg?raw=true" alt="Gerbang Politeknik Negeri Banjarmasin" width="100%">

<div align="center">

# PKKMB 2026 · Politeknik Negeri Banjarmasin

Situs resmi Pengenalan Kehidupan Kampus bagi Mahasiswa Baru (PKKMB) 2026 Politeknik Negeri Banjarmasin.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/Tests-130%20passed-success)](#)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](#)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%20AA-purple)](#)
[![License](https://img.shields.io/badge/License-%3F-blue)](#)

> **Tema:** "Bersinergi, Berinovasi, dan Berdampak Bersama Poliban"
>
> **Pra-PKKMB** 3 Agustus 2026 · **PKKMB** 4–6 Agustus 2026 · **Kuliah perdana** 24 Agustus 2026

</div>

---

## Tentang Politeknik Negeri Banjarmasin

Politeknik Negeri Banjarmasin (Poliban) adalah lembaga perguruan tinggi negeri vokasi pertama di Kalimantan Selatan [[1]]. Berdiri sejak **23 September 1987** [[26]], Poliban kini telah menjadi institusi vokasi terbaik di Kalimantan Selatan dan Tengah dengan pengalaman lebih dari 30 tahun dalam pendidikan tinggi vokasi [[10]].

### Identitas Institusi

| Aspek | Detail |
|---|---|
| **Nama** | Politeknik Negeri Banjarmasin (POLIBAN) |
| **Direktur** | Joni Riadi, SST., MT [[18]] |
| **Didirikan** | 23 September 1987 [[26]] |
| **Status** | Perguruan Tinggi Negeri |
| **Luas Kampus** | ±5,64 hektare [[11]] |
| **Akreditasi** | Terakreditasi BAN-PT (seluruh program studi) [[11]] |
| **Alamat** | Jl. Brigjen H. Hasan Basri, Kayu Tangi, Banjarmasin 70123 [[17]] |
| **Telepon** | (0511) 330 5052 [[17]] |
| **Email** | info@poliban.ac.id [[17]] |
| **Website** | [poliban.ac.id](https://poliban.ac.id) |

### Statistik Kampus (2024-2025)

| Metrik | Nilai |
|---|---|
| **Mahasiswa Aktif** | 4.374 mahasiswa [[10]] |
| **Program Studi** | 22 program studi (D2, D3, D4) [[10]] |
| **Jumlah Jurusan** | 5 jurusan [[11]] |
| **Penelitian** | 313 penelitian (2022-2024) [[10]] |
| **Mitra Internasional** | 4 mitra [[10]] |
| **Mahasiswa Baru 2025** | 1.645 mahasiswa [[44]] |

---

## Informasi Utama PKKMB 2026

| Aspek | Detail |
|---|---|
| **Tema** | "Bersinergi, Berinovasi, dan Berdampak Bersama Poliban" |
| **Pra-PKKMB** | 3 Agustus 2026 |
| **Pelaksanaan PKKMB** | 4–6 Agustus 2026 |
| **Kuliah Perdana** | 24 Agustus 2026 |
| **Peserta Target** | 1.645+ mahasiswa baru seluruh program studi Poliban |
| **Platform** | Static site generator berbasis Node.js |
| **Lisensi** | MIT |
| **Versi Node.js** | 18+ (LTS) |
| **CSS Framework** | Tailwind CSS v4 |

---

## Deskripsi Proyek

Repositori ini sebelumnya berisi *mirror* HTTrack dari situs Laravel yang sudah berjalan. Kini isinya adalah **proyek sumber**: seluruh halaman dihasilkan dari data dan komponen di `src/`, tanpa framework runtime.

Seluruh isi faktual ditelusuri ke sumber resmi Poliban dan PKKMB. Dokumen pendamping:

- **[RESEARCH.md](RESEARCH.md)** - laporan riset: sumber resmi yang dikonsultasikan, fakta yang terverifikasi, aset beserta lisensinya, hal yang tidak dapat diverifikasi, dan informasi yang harus datang langsung dari tim PKKMB/Poliban.
- **[AUDIT.md](AUDIT.md)** - kondisi repositori lama dan alasan setiap keputusan.
- **`sumber.html`** - versi laporan riset yang tayang untuk pengunjung situs.

---

## Daftar Isi

1. [Program Studi](#program-studi)
2. [Menjalankan](#menjalankan)
3. [Penerapan](#penerapan)
4. [Struktur](#struktur)
5. [Arsitektur Informasi](#arsitektur-informasi)
6. [Sistem Desain](#sistem-desain)
7. [Aksesibilitas](#aksesibilitas)
8. [Kinerja](#kinerja)
9. [Autentikasi](#autentikasi)
10. [Dukungan Browser](#dukungan-browser)
11. [Kontak & Dukungan](#kontak--dukungan)
12. [Kontribusi](#kontribusi)
13. [Lisensi](#lisensi)

---

## Program Studi

Poliban memiliki **5 jurusan** dengan **22 program studi** yang tersebar pada jenjang Diploma 2 (D2), Diploma 3 (D3), dan Diploma 4 (D4/Sarjana Terapan) [[10]][[11]].

### Jurusan Teknik Sipil dan Kebumian

| No | Program Studi | Jenjang |
|---|---|---|
| 1 | Teknik Rekayasa Konstruksi Jalan dan Jembatan (TRKJJ) | D4 |
| 2 | Teknik Bangunan Rawa (TBR) | D4 |
| 3 | Teknologi Rekayasa Geomatika dan Survei (TRGS) | D4 |
| 4 | Teknik Sipil | D3 |
| 5 | Teknik Pertambangan | D3 |
| 6 | Teknik Geodesi | D3 |

### Jurusan Teknik Mesin

| No | Program Studi | Jenjang |
|---|---|---|
| 1 | Teknologi Rekayasa Otomotif | D4 |
| 2 | Teknologi Rekayasa Pemeliharaan Alat Berat | D4 |
| 3 | Teknik Mesin | D3 |
| 4 | Teknik Mesin Otomotif | D3 |
| 5 | Alat Berat | D3 |
| 6 | Tata Operasi dan Pemeliharaan Prediktif Alat Berat | D2 |

### Jurusan Teknik Elektro

| No | Program Studi | Jenjang |
|---|---|---|
| 1 | Teknologi Rekayasa Pembangkit Energi (TRPE) | D4 |
| 2 | Sistem Informasi Kota Cerdas (SIKC) | D4 |
| 3 | Teknologi Rekayasa Otomasi (TRO) | D4 |
| 4 | Teknik Listrik | D3 |
| 5 | Elektronika | D3 |
| 6 | Teknik Informatika (TI) | D3 |

### Jurusan Akuntansi

| No | Program Studi | Jenjang |
|---|---|---|
| 1 | Akuntansi Lembaga Keuangan Syariah (ALKS) | D4 |
| 2 | Akuntansi | D3 |
| 3 | Sistem Informasi Akuntansi (SIA) | D3 |
| 4 | Komputerisasi Akuntansi | D3 |

### Jurusan Administrasi Bisnis

| No | Program Studi | Jenjang |
|---|---|---|
| 1 | Bisnis Digital | D4 |
| 2 | Administrasi Bisnis | D3 |
| 3 | Manajemen Informatika | D3 |
| 4 | Sistem Informasi | D3 |

---

## Menjalankan

```bash
npm install
npm run dev        # server pengembangan + rebuild otomatis -> http://localhost:5173
npm run build      # menghasilkan situs statis ke dist/
npm run check      # build + lint + test
```

### Referensi Perintah

| Perintah | Kegunaan |
|---|---|
| `npm run build` | Merender HTML lalu mengompilasi CSS (Tailwind v4) ke `dist/` |
| `npm run dev` | Server statis + pembangunan ulang saat berkas `src/` berubah |
| `npm run lint` | Memeriksa tautan mati, jangkar, gambar, label form, heading, ukuran aset |
| `npm test` | 130 pengujian: integritas data, keluaran build, cakupan CSS, aksesibilitas, provenans sumber & aset, ketahanan tanpa JS |
| `npm run clean` | Menghapus `dist/` |
| `npm run refresh:prodi` | Mengambil ulang data 22 prodi dari portal SPMB resmi |
| `npm run refresh:news` | Mengambil ulang berita dari WP REST API resmi Poliban |
| `npm run refresh` | Menyegarkan keduanya sekaligus |
| `npm run refresh:check` | Keluar dengan kode 1 bila data resmi sudah berubah dari cache; keluar 0 bila hanya jaringan yang tidak tersedia |

> **Penting:** selalu jalankan `npm run build`, bukan `npm run build:html` saja. Yang terakhir melewati langkah Tailwind sehingga `dist/assets/app.css` bisa tertinggal usang atau tanpa minifikasi. Ada uji yang menjaga hal ini.

Kedua skrip penyegar **gagal dengan aman**: bila jaringan tidak tersedia atau respons tidak wajar, cache lama dipertahankan byte-per-byte dan build tetap berhasil. Skrip berita juga menolak entri yang tautannya di luar `poliban.ac.id`, tanggalnya tidak valid, atau isinya masih memuat HTML mentah, dan tidak akan menimpa cache sehat dengan respons yang jumlahnya menyusut drastis. `src/data/news.js` memvalidasi ulang saat build sehingga cache yang disunting tangan menggagalkan build, bukan diam-diam terbit.

Data faktual bersumber dari laman resmi Poliban dan tercatat lengkap di `src/data/sources.js`. Pengambilan data terjadi **saat pembaruan manual**, tidak saat build maupun runtime - yang dipakai selalu berkas di `src/data/cache/`. Bila jaringan gagal, cache lama dipertahankan dan build tetap berhasil. Untuk memverifikasi tautan eksternal (butuh jaringan): `node tools/check-links.mjs`.

---

## Penerapan

Keluaran `dist/` sepenuhnya statis - dapat dilayani oleh Nginx, Apache, atau CDN mana pun tanpa konfigurasi khusus. Semua tautan internal bersifat relatif sehingga situs juga berjalan bila dipasang pada subdirektori.

`dist/` **ikut disertakan dalam repositori** agar hasil build dapat langsung dilayani (sebagaimana repositori ini digunakan sebelumnya). Jalankan `npm run build` setiap kali `src/` berubah sehingga keluaran tetap sinkron, atau hapus `dist/` dari kontrol versi bila proses penerapan Anda membangun sendiri.

### Konfigurasi Nginx

```nginx
server {
    listen 80;
    server_name pkkmb.poliban.ac.id;
    root /var/www/pkkmb/dist;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    error_page 404 /404.html;
}
```

### Konfigurasi Apache

```apache
<VirtualHost *:80>
    ServerName pkkmb.poliban.ac.id
    DocumentRoot /var/www/pkkmb/dist

    <Directory /var/www/pkkmb/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/pkkmb-error.log
    CustomLog ${APACHE_LOG_DIR}/pkkmb-access.log combined
</VirtualHost>
```

### Platform Hosting Statis

| Platform | Konfigurasi |
|---|---|
| **GitHub Pages** | Aktifkan Pages dari branch `main`, direktori `/ (root)`. Pastikan workflow GitHub Actions diaktifkan jika menggunakan build otomatis. |
| **Netlify** | Build command: `npm run build`. Publish directory: `dist`. Netlify akan mendeteksi `dist/` secara otomatis. |
| **Vercel** | Framework Preset: `Other`. Build command: `npm run build`. Output Directory: `dist`. |
| **Cloudflare Pages** | Build command: `npm run build`. Build output directory: `dist`. |

Arahkan document root ke: `dist/`

---

## Struktur

```text
src/
├── data/            Sumber kebenaran tunggal - tidak ada konten di dalam markup
│   ├── site.js        Identitas, navigasi, kontak, endpoint autentikasi
│   ├── schedule.js    Rangkaian kegiatan, alur peserta, FAQ
│   ├── posts.js       Berita & pengumuman beserta lampiran PDF
│   ├── programs.js    22 program studi dalam 5 jurusan
│   └── campus.js      Visi-misi, sejarah, tata kelola, fasilitas, statistik
├── lib/             Utilitas murni (escape HTML, format tanggal, ikon SVG)
├── components/      Kerangka dokumen, header, footer, dan komponen UI berulang
├── pages/           Satu modul per jenis halaman
├── styles/app.css   Token desain + lapisan komponen (Tailwind v4)
├── scripts/app.js   Perilaku klien (~ 6 KB, tanpa dependensi)
├── media/           Gambar yang sudah dioptimalkan (JPEG + WebP)
└── static/          Berkas yang disalin apa adanya (favicon, ikon)

build.mjs            Generator statis
tools/               dev server, linter, dan pengujian
storage/             Lampiran PDF asli - dipertahankan pada jalur yang sama
```

Menambah berita, pengumuman, atau program studi cukup dilakukan dengan menyunting berkas di `src/data/`; halaman detail, daftar, sitemap, dan tautan terkait ikut terbentuk.

---

## Arsitektur Informasi

Navigasi lama berisi 8 tautan lepas ditambah dua dropdown menuju sistem yang tidak ada. Struktur baru dipadatkan menjadi empat kelompok yang mencerminkan kebutuhan nyata peserta:

| Menu | Isi |
|---|---|
| **Beranda** | Pusat kendali: status kegiatan, aksi utama, pengumuman, jadwal, berita |
| **PKKMB 2026** | Panduan peserta, jadwal, tata tertib, unduhan, FAQ |
| **Pengumuman** | Ketentuan resmi yang mengikat peserta |
| **Berita** | Materi, panduan konten, dan kabar kegiatan |
| **Kampus** | Profil, program studi, fasilitas, kontak |
| **Portal PKKMB** | Aksi utama, selalu tampak pada header |

Empat halaman profil yang masing-masing hanya berisi satu paragraf digabung menjadi `profil.html` dengan jangkar per bagian. URL lama tetap hidup melalui halaman pengalihan.

---

## Sistem Desain

**Tipografi** - Plus Jakarta Sans untuk judul, Inter untuk teks. Keduanya dilayani sendiri sebagai variable font (76 KB total) sehingga tidak ada permintaan ke Google Fonts.

**Warna** - Biru institusi (`brand`) sebagai warna utama, emas lambang Poliban (`accent`) sebagai aksen yang dipakai hemat, dan skala netral (`ink`). Seluruh pasangan warna teks telah diverifikasi memenuhi WCAG AA dan diuji otomatis pada `tools/a11y.test.mjs`.

**Komponen** - `.btn`, `.card`, `.badge`, `.field`, `.chip`, `.shell`, `.eyebrow`, `.prose-editorial` didefinisikan sekali di lapisan komponen. Halaman dengan tujuan berbeda tetap bebas menyusun tata letaknya sendiri - beranda, artikel, penjelajah prodi, dan portal sengaja tidak dipaksa memakai pola kartu yang sama.

**Gerak** - hanya transisi hover, animasi masuk sekali jalan, dan penghitung angka. Semuanya dinonaktifkan pada `prefers-reduced-motion: reduce`.

---

## Aksesibilitas

- HTML semantik dengan landmark `header`/`main`/`footer`/`nav` berlabel.
- *Skip link* menuju konten utama pada setiap halaman.
- Indikator `:focus-visible` global; tidak ada `focus:outline-none` di mana pun.
- Dropdown navigasi memakai `<button>` dengan `aria-expanded`/`aria-controls`, dapat dioperasikan papan ketik, dan tertutup dengan Escape.
- Menu seluler memakai `<details>` sehingga berfungsi tanpa JavaScript.
- Ikon dekoratif `aria-hidden`; tombol ikon memiliki nama aksesibel.
- Seluruh kontrol form memiliki `<label>` eksplisit dan pesan galat yang diumumkan.
- Kontras warna diverifikasi otomatis terhadap ambang WCAG AA.

---

## Kinerja

| Aset | Ukuran |
|---|---|
| CSS | 49 KB (minified) |
| JavaScript | 16 KB, tanpa dependensi |
| Font | 76 KB, self-hosted, `preload` + `font-display: swap` |
| Gambar | JPEG + WebP, `width`/`height` eksplisit, `loading="lazy"` |

Sebagai perbandingan, versi lama memuat 128 KB CSS+JS (termasuk Alpine.js dan seluruh utilitas Tailwind yang tidak terpakai), foto hero dari Unsplash, serta Google Fonts blocking.

---

## Autentikasi

Halaman `login.html` **tidak** menggantikan sistem yang berjalan. Formulir tetap mengirim `POST` ke `https://pkkmb.poliban.ac.id/login` dengan field `_token`, `email`, `password`, dan `remember`, serta mempertahankan tautan OAuth Google dan meta `csrf-token`. Yang ditambahkan hanya penyempurnaan sisi klien: tombol tampilkan kata sandi, validasi ringan sebelum kirim, dan penampilan pesan galat dari parameter `?error=`.

> **Catatan penerapan:** nilai `_token` di `src/pages/login.js` berasal dari mirror dan merupakan token statis - ia **tidak** memberi perlindungan CSRF. Saat halaman ini dilayani kembali oleh Laravel, ganti nilai tersebut dengan `{{ csrf_token() }}`.
>
> Kontrak yang tidak boleh berubah (juga tercatat sebagai komentar di dalam `dist/login.html` agar terlihat tanpa membaca sumber):
>
> | Bagian | Nilai |
> |---|---|
> | `action` | `POST https://pkkmb.poliban.ac.id/login` |
> | Field | `_token`, `email`, `password`, `remember` |
> | OAuth | `/login/google/callback` |
> | Galat | `?error=invalid` \| `unregistered` \| `throttled` |
> | Id elemen | `email`, `password`, `remember_me` |

---

## Dukungan Browser

Situs ini ditargetkan untuk browser modern yang mendukung ES6 dan CSS Grid.

| Browser | Versi Minimum |
|---|---|
| Chrome / Edge | 2 versi terakhir |
| Firefox | 2 versi terakhir |
| Safari | 14+ |
| Safari iOS | 14+ |
| Android Browser | Chrome WebView terbaru |

Internet Explorer 11 tidak didukung. Situs ini sepenuhnya fungsional tanpa JavaScript (Progressive Enhancement), namun beberapa interaksi seperti dropdown navigasi dan validasi form memerlukan JS untuk pengalaman optimal.

---

## Kontak & Dukungan

### Politeknik Negeri Banjarmasin

| Saluran | Detail |
|---|---|
| **Alamat** | Jl. Brigjen H. Hasan Basri, Kayu Tangi, Banjarmasin 70123 [[17]] |
| **Telepon** | (0511) 330 5052 [[17]] |
| **Email Umum** | info@poliban.ac.id [[17]] |
| **Email Akademik** | akademik@poliban.ac.id [[17]] |
| **Website** | [poliban.ac.id](https://poliban.ac.id) |
| **Instagram** | [@poliban_official](https://www.instagram.com/poliban_official/) [[2]] |
| **Facebook** | [Politeknik Negeri Banjarmasin](https://www.facebook.com/poliban.ac.id) [[28]] |

### Panitia PKKMB 2026

Untuk pertanyaan khusus terkait pelaksanaan PKKMB 2026:

| Saluran | Detail |
|---|---|
| **Email** | humasakademik@poliban.ac.id [[2]] |
| **WhatsApp** | 0812 5809 6162 (Hotline SPMB) [[17]] |

---

## Kontribusi

Kontribusi, laporan masalah (issues), dan pull request sangat diterima. Karena situs ini memuat informasi faktual yang terikat waktu dan kebijakan institusi, pastikan setiap perubahan konten telah diverifikasi dengan tim Humas atau panitia PKKMB Poliban.

1. Fork repositori ini.
2. Buat branch fitur Anda (`git checkout -b feature/PerbaikanFitur`).
3. Commit perubahan Anda (`git commit -m 'Menambahkan beberapa perbaikan'`).
4. Push ke branch tersebut (`git push origin feature/PerbaikanFitur`).
5. Buka Pull Request.

---

## Lisensi

Kode sumber dalam repositori ini dirilis di bawah... umm [Lisensi](LICENSE) ?.

Aset visual (foto kampus, logo, dan ilustrasi) adalah hak cipta Politeknik Negeri Banjarmasin dan digunakan di sini semata-mata untuk keperluan informasi resmi kegiatan PKKMB. Penggunaan ulang aset visual di luar konteks repositori ini memerlukan izin tertulis dari institusi.

---

<div align="center">

**Politeknik Negeri Banjarmasin**
*Institusi Vokasi Politeknik Terbaik Se-Kalimantan Selatan dan Tengah*

© 2026 Politeknik Negeri Banjarmasin. Seluruh hak cipta dilindungi.

</div>
