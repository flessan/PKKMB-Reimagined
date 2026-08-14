# Audit repositori `pkkmb-dev` (kondisi sebelum redesain)

Dokumen ini merekam temuan inspeksi awal sebelum perombakan dilakukan, agar keputusan
"dipertahankan / digabung / dihapus" dapat ditelusuri kembali.

## 1. Sifat repositori

Repositori **bukan** proyek sumber, melainkan **hasil mirror HTTrack** dari
`https://pkkmb.poliban.ac.id/` (aplikasi Laravel + Vite + Tailwind + Alpine).
Setiap berkas HTML diawali komentar `<!-- Mirrored from pkkmb.poliban.ac.id/ by HTTrack ... -->`.

Konsekuensinya:

* Tidak ada `package.json`, konfigurasi Vite/Tailwind, template Blade, maupun sumber CSS/JS.
* `build/assets/app-*.css` (83 KB) dan `build/assets/app-*.js` (45 KB) adalah artefak build
  yang tidak dapat direproduksi — CSS memuat seluruh Tailwind base + utilitas yang tidak dipakai,
  JS berisi Alpine.js utuh.
* Seluruh markup layout (header, footer, tombol WhatsApp) **diduplikasi manual** pada 33 berkas HTML.

## 2. Inventaris halaman

| Berkas | Isi nyata | Keputusan |
| --- | --- | --- |
| `index.html` (58 KB) | Hero slider 2 slide (foto Unsplash), sambutan direktur, statistik, tab berita/pengumuman, visi-misi, 4 prodi, 3 fasilitas, CTA | **Dirombak** menjadi pusat kendali PKKMB |
| `berita.html` | Daftar 5 posting + form filter `GET` (kategori & pencarian) yang tidak berfungsi statis | **Dirombak** jadi antarmuka editorial + filter klien |
| `pengumuman.html` | Hanya header + status kosong ("Tidak ada data…") | **Dirombak** jadi papan pengumuman resmi |
| `berita/*.html` (5) | Konten asli bernilai tinggi (tata tertib, rundown, pra-PKKMB, twibbon, materi AI) + lampiran PDF | **Dipertahankan**, layout artikel baru |
| `program-studi.html` (62 KB) | 21 prodi dikelompokkan 5 jurusan, kartu identik, `<img src="#">` rusak | **Dirombak** jadi penjelajah dengan pencarian + filter |
| `program-studi/*.html` (21) | Teks *placeholder* identik di semua prodi ("Program studi", prospek karir generik) | **Dipertahankan URL-nya**, konten ditulis ulang per prodi |
| `profil/sejarah.html` | 1 paragraf | **Digabung** ke `profil.html#sejarah` (+ pengalihan) |
| `profil/visi-misi.html` | Visi, 3 misi, 4 tujuan | **Digabung** ke `profil.html#visi-misi` (+ pengalihan) |
| `profil/struktur.html` | 1 kalimat, menyebut "Rektor/Dekan/Fakultas" (salah — Poliban dipimpin Direktur) | **Digabung** + diperbaiki |
| `profil/rektor.html` | Sambutan Direktur lengkap (konten bernilai tinggi) | **Digabung** ke `profil.html#sambutan` (+ pengalihan) |
| `fasilitas.html` | 3 fasilitas (Perpustakaan, UPA TIK, GOR) | **Dirombak** jadi tata letak editorial |
| `kontak.html` | Alamat, telepon, surel, peta Google, form tanpa `action` | **Dirombak**; form palsu diganti kanal nyata + `mailto:` progresif |
| `login.html` | Form nyata `POST https://pkkmb.poliban.ac.id/login` + OAuth Google | **Dipertahankan fungsinya**, dirancang ulang |

## 3. Masalah teknis yang ditemukan

1. **Nama institusi salah ketik** di header & footer semua halaman: "Politeknik Negeri Banjarmas**n**".
2. **Identitas salah**: logo hanya huruf "U" dalam kotak biru, sub-teks "INDONESIA";
   `<title>` login berbunyi "Login - Laravel"; deskripsi meta memakai teks profil kampus generik,
   bukan PKKMB.
3. **Nomenklatur salah**: "Pimpinan Rektor", "Fakultas Teknik Elektro", "Senat Universitas" —
   Poliban adalah politeknik dengan **Direktur** dan **Jurusan**, bukan Rektor/Fakultas.
4. **Aset rusak**: `images/Logo-Poliban.html` sebenarnya halaman "404 Not Found" nginx,
   tetapi dipakai sebagai `<img src>` di `login.html`.
5. **Gambar rusak**: 21+ kartu prodi memakai `<img src="#">` (memicu permintaan ulang halaman).
6. **Aset duplikat**: 5 berkas di `storage/posts/` identik byte-per-byte (MD5 sama, 204 KB × 5 = 1 MB)
   — semuanya spanduk PKKMB yang sama.
7. **Tautan mati**: 9 tautan `href="#"` di menu "Sistem Informasi" & footer (SIAKAD, LMS, Perpustakaan
   digital, Sistem PMB) — menu ini juga tidak relevan untuk situs PKKMB.
8. **Statistik cacat**: penghitung "Akreditasi Institusi" menganimasikan angka `21` lalu menempelkan
   sufiks `" B"` sehingga tampil "21 B".
9. **Penghitung kunjungan palsu** (`32,436`) di-hardcode di footer setiap halaman.
10. **Navigasi berlebih**: 8 tautan utama + 2 dropdown + 2 tombol, dengan "Alur Proses" dan
    "Alur Proses Bisnis" menunjuk ke `login.html`.
11. **Aksesibilitas**: tidak ada `skip link`, `focus-visible` dihapus (`focus:outline-none`),
    kontrol slider tanpa nama aksesibel, ikon emoji dipakai sebagai penanda field,
    dropdown hanya bereaksi pada `mouseenter` (tidak dapat diakses papan ketik),
    `<html lang="en">` pada `login.html` meski isinya bahasa Indonesia, tidak ada dukungan
    `prefers-reduced-motion`.
12. **Kinerja**: 128 KB CSS+JS build lama, foto hero dari Unsplash (jaringan pihak ketiga),
    Google Fonts blocking, animasi penghitung yang terikat pada event `scroll` tanpa throttle.
13. **Kategori & tanggal** posting nyata: `Akademik` (4) dan `Pengumuman Resmi` (1);
    rentang 31 Jul – 6 Agu 2026.

## 4. Konten & data nyata yang wajib dipertahankan

* Tema PKKMB 2026: **"Bersinergi, Berinovasi, dan Berdampak Bersama Poliban"**.
* Jadwal: **Pra-PKKMB 3 Agustus 2026**, **PKKMB 4–6 Agustus 2026**, **perkuliahan mulai 24 Agustus 2026**.
* 5 posting beserta 4 lampiran PDF di `storage/post-attachments/` (tatib, rundown, pengumuman
  pra-PKKMB, materi Kecerdasan Buatan & Etika TI).
* Tautan resmi: Twibbonize `poliban-pkkmb2026`, Google Drive media kit,
  WhatsApp bantuan `+62 882-4625-9077`, Instagram/Facebook/YouTube Poliban.
* Kontak: Jl. Brigjen Hasan Basry, Banjarmasin · 0511 3305052 · poliban@poliban.ac.id.
* Sambutan Direktur **Joniriadi, S.T., M.T.** beserta potretnya.
* Visi, 3 misi, 4 tujuan; 21 program studi dalam 5 jurusan.
* Alur autentikasi: `POST https://pkkmb.poliban.ac.id/login` (field `email`, `password`,
  `remember`, `_token`) dan tautan OAuth Google.
