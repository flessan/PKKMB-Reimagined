# PKKMB 2026 · Politeknik Negeri Banjarmasin

Situs resmi Pengenalan Kehidupan Kampus bagi Mahasiswa Baru (PKKMB) 2026
Politeknik Negeri Banjarmasin.

> **Tema:** “Bersinergi, Berinovasi, dan Berdampak Bersama Poliban”
> **Pra-PKKMB** 3 Agustus 2026 · **PKKMB** 4–6 Agustus 2026 · **Kuliah perdana** 24 Agustus 2026

Repositori ini sebelumnya berisi *mirror* HTTrack dari situs Laravel yang sudah berjalan.
Kini isinya adalah **proyek sumber**: seluruh halaman dihasilkan dari data dan komponen
di `src/`, tanpa framework runtime. Ringkasan kondisi lama dan alasan setiap keputusan
tercatat pada [`AUDIT.md`](AUDIT.md).

---

## Menjalankan

```bash
npm install
npm run dev        # server pengembangan + rebuild otomatis → http://localhost:5173
npm run build      # menghasilkan situs statis ke dist/
npm run check      # build + lint + test
```

| Perintah | Kegunaan |
| --- | --- |
| `npm run build` | Merender HTML lalu mengompilasi CSS (Tailwind v4) ke `dist/` |
| `npm run dev` | Server statis + pembangunan ulang saat berkas `src/` berubah |
| `npm run lint` | Memeriksa tautan mati, jangkar, gambar, label form, heading, ukuran aset |
| `npm test` | 67 pengujian: integritas data, keluaran build, cakupan CSS, aksesibilitas |
| `npm run clean` | Menghapus `dist/` |

### Penerapan

Keluaran `dist/` sepenuhnya statis — dapat dilayani oleh Nginx, Apache, atau CDN mana pun
tanpa konfigurasi khusus. Semua tautan internal bersifat relatif sehingga situs juga
berjalan bila dipasang pada subdirektori.

`dist/` **ikut disertakan dalam repositori** agar hasil build dapat langsung dilayani
(sebagaimana repositori ini digunakan sebelumnya). Jalankan `npm run build` setiap kali
`src/` berubah sehingga keluaran tetap sinkron, atau hapus `dist/` dari kontrol versi bila
proses penerapan Anda membangun sendiri.

```
arahkan document root ke:  dist/
```

---

## Struktur

```
src/
├── data/            Sumber kebenaran tunggal — tidak ada konten di dalam markup
│   ├── site.js        Identitas, navigasi, kontak, endpoint autentikasi
│   ├── schedule.js    Rangkaian kegiatan, alur peserta, FAQ
│   ├── posts.js       Berita & pengumuman beserta lampiran PDF
│   ├── programs.js    21 program studi dalam 5 jurusan
│   └── campus.js      Visi-misi, sejarah, tata kelola, fasilitas, statistik
├── lib/             Utilitas murni (escape HTML, format tanggal, ikon SVG)
├── components/      Kerangka dokumen, header, footer, dan komponen UI berulang
├── pages/           Satu modul per jenis halaman
├── styles/app.css   Token desain + lapisan komponen (Tailwind v4)
├── scripts/app.js   Perilaku klien (≈ 6 KB, tanpa dependensi)
├── media/           Gambar yang sudah dioptimalkan (JPEG + WebP)
└── static/          Berkas yang disalin apa adanya (favicon, ikon)

build.mjs            Generator statis
tools/               dev server, linter, dan pengujian
storage/             Lampiran PDF asli — dipertahankan pada jalur yang sama
```

Menambah berita, pengumuman, atau program studi cukup dilakukan dengan menyunting
berkas di `src/data/`; halaman detail, daftar, sitemap, dan tautan terkait ikut terbentuk.

---

## Arsitektur informasi

Navigasi lama berisi 8 tautan lepas ditambah dua dropdown menuju sistem yang tidak ada.
Struktur baru dipadatkan menjadi empat kelompok yang mencerminkan kebutuhan nyata peserta:

| Menu | Isi |
| --- | --- |
| **Beranda** | Pusat kendali: status kegiatan, aksi utama, pengumuman, jadwal, berita |
| **PKKMB 2026** | Panduan peserta, jadwal, tata tertib, unduhan, FAQ |
| **Pengumuman** | Ketentuan resmi yang mengikat peserta |
| **Berita** | Materi, panduan konten, dan kabar kegiatan |
| **Kampus** | Profil, program studi, fasilitas, kontak |
| **Portal PKKMB** | Aksi utama, selalu tampak pada header |

Empat halaman profil yang masing-masing hanya berisi satu paragraf digabung menjadi
`profil.html` dengan jangkar per bagian. URL lama tetap hidup melalui halaman pengalihan.

---

## Sistem desain

**Tipografi** — Plus Jakarta Sans untuk judul, Inter untuk teks. Keduanya dilayani sendiri
sebagai variable font (76 KB total) sehingga tidak ada permintaan ke Google Fonts.

**Warna** — Biru institusi (`brand`) sebagai warna utama, emas lambang Poliban (`accent`)
sebagai aksen yang dipakai hemat, dan skala netral (`ink`). Seluruh pasangan warna teks
telah diverifikasi memenuhi WCAG AA dan diuji otomatis pada `tools/a11y.test.mjs`.

**Komponen** — `.btn`, `.card`, `.badge`, `.field`, `.chip`, `.shell`, `.eyebrow`,
`.prose-editorial` didefinisikan sekali di lapisan komponen. Halaman dengan tujuan berbeda
tetap bebas menyusun tata letaknya sendiri — beranda, artikel, penjelajah prodi, dan portal
sengaja tidak dipaksa memakai pola kartu yang sama.

**Gerak** — hanya transisi hover, animasi masuk sekali jalan, dan penghitung angka.
Semuanya dinonaktifkan pada `prefers-reduced-motion: reduce`.

---

## Aksesibilitas

- HTML semantik dengan landmark `header`/`main`/`footer`/`nav` berlabel.
- *Skip link* menuju konten utama pada setiap halaman.
- Indikator `:focus-visible` global; tidak ada `focus:outline-none` di mana pun.
- Dropdown navigasi memakai `<button>` dengan `aria-expanded`/`aria-controls`,
  dapat dioperasikan papan ketik, dan tertutup dengan Escape.
- Menu seluler memakai `<details>` sehingga berfungsi tanpa JavaScript.
- Ikon dekoratif `aria-hidden`; tombol ikon memiliki nama aksesibel.
- Seluruh kontrol form memiliki `<label>` eksplisit dan pesan galat yang diumumkan.
- Kontras warna diverifikasi otomatis terhadap ambang WCAG AA.

## Kinerja

| Aset | Ukuran |
| --- | --- |
| CSS | 49 KB (minified) |
| JavaScript | 16 KB, tanpa dependensi |
| Font | 76 KB, self-hosted, `preload` + `font-display: swap` |
| Gambar | JPEG + WebP, `width`/`height` eksplisit, `loading="lazy"` |

Sebagai perbandingan, versi lama memuat 128 KB CSS+JS (termasuk Alpine.js dan seluruh
utilitas Tailwind yang tidak terpakai), foto hero dari Unsplash, serta Google Fonts blocking.

## Autentikasi

Halaman `login.html` **tidak** menggantikan sistem yang berjalan. Formulir tetap mengirim
`POST` ke `https://pkkmb.poliban.ac.id/login` dengan field `_token`, `email`, `password`,
dan `remember`, serta mempertahankan tautan OAuth Google dan meta `csrf-token`.
Yang ditambahkan hanya penyempurnaan sisi klien: tombol tampilkan kata sandi, validasi
ringan sebelum kirim, dan penampilan pesan galat dari parameter `?error=`.

> **Catatan penerapan:** nilai `_token` di `src/pages/login.js` berasal dari mirror dan
> merupakan token statis. Saat halaman ini dilayani kembali oleh Laravel, ganti nilai
> tersebut dengan `{{ csrf_token() }}` agar perlindungan CSRF berfungsi penuh.
