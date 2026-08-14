# Laporan Riset Konten — PKKMB Poliban 2026

Tanggal riset: **14 Agustus 2026** · Cakupan: fase 2 (verifikasi fakta & aset nyata)

Fase 1 menghasilkan redesain yang secara visual matang tetapi isinya sebagian fiktif —
angka statistik, foto kampus hasil AI, daftar fasilitas, dan akreditasi seragam yang
tidak pernah ada. Fase 2 mengganti seluruh lapisan itu dengan fakta yang dapat
ditelusuri ke sumber resmi, dan menambahkan struktur data agar fakta tersebut bisa
dirawat, bukan tertanam di template.

Halaman **[`sumber.html`](dist/sumber.html)** menyajikan isi laporan ini kepada
pengunjung situs: klaim kunci beserta tautan sumbernya, seluruh registri sumber dan
aset, serta daftar hal yang tidak dapat diverifikasi.

---

## 1. Sumber resmi yang dikonsultasikan

Seluruhnya terekam di `src/data/sources.js` dengan penerbit, tanggal, dan status
verifikasi. Ringkasannya:

### Sumber primer — domain resmi Poliban

| Sumber | URL | Dipakai untuk |
| --- | --- | --- |
| Portal SPMB — daftar prodi | `pmb.poliban.ac.id/program-studi` | **22 program studi**, jenjang, akreditasi, situs prodi |
| Portal SPMB — 22 laman detail | `pmb.poliban.ac.id/program-studi-detail/detail/{kode}` | Deskripsi, prospek karier, materi pembelajaran, akreditasi per prodi |
| Sejarah Poliban | `poliban.ac.id/sejarah-poliban/` | Kronologi 1976→1997, SK Mendikbud 080/O/1997, alamat, telepon, surel |
| Profil direksi | `poliban.ac.id/profil-direksi-poliban/` | Direktur dan tiga Wakil Direktur beserta gelar |
| Berita PKKMB 2026/2027 | `poliban.ac.id/poliban-sambut-1-817-mahasiswa-baru-melalui-pkkmb-2026-2027/` | 1.817 maba, tanggal 4–6 Agustus, kutipan Direktur |
| Jurusan Teknik Elektro | `poliban.ac.id/elektro/` | Visi–misi jurusan, Kajur & Sekjur 2023–2027 |
| Jurusan Teknik Sipil dan Kebumian | `poliban.ac.id/sipil/` | Nomenklatur jurusan, visi–misi, ISO/IEC 17025:2017 |
| Laman prodi D3 Teknik Pertambangan | `poliban.ac.id/d3-teknik-pertambangan/` | SK LAM Teknik 2024 (konflik akreditasi, lihat §5) |
| Laman prodi D3 Teknik Alat Berat | `poliban.ac.id/mesin/mesin-d3-teknik-alat-berat/` | Berdiri 2005, kemitraan PT Trakindo Utama, SK BAN-PT 2022 |
| UPA Perpustakaan | `poliban.ac.id/upa-perpustakaan-poliban-dorong-.../` | Nama unit, Kepala UPA, langganan Cambridge & ScienceDirect |
| Portal PKKMB | `pkkmb.poliban.ac.id` + pos `/berita/{slug}-{id}` | Tema, tata tertib, rundown, materi AI & Etika TI, pusat informasi |
| Pedoman Akademik 2024 (PDF) | `poliban.ac.id/.../PEDOMAN-AKADEMIK-2024-ukuran-A5.pdf` | Pemetaan jurusan→prodi (cuplikan; PDF tidak dapat diambil utuh) |

### Sumber sekunder — hanya untuk uji silang, tidak pernah primer

| Sumber | Dipakai untuk |
| --- | --- |
| ANTARA Kalsel berita `529420` | Mengonfirmasi 1.817 maba dan tanggal 4–6 Agustus dari pihak kedua |
| Wikimedia Commons | Satu-satunya foto kampus yang lisensinya jelas (lihat §4) |

Uji `tools/sources.test.mjs` memastikan setiap sumber berstatus `official` memang
berada pada domain `poliban.ac.id`, `pmb.poliban.ac.id`, atau `pkkmb.poliban.ac.id`.

---

## 2. Fakta yang berhasil diverifikasi

### Institusi

- Nama resmi **Politeknik Negeri Banjarmasin (POLIBAN)**, dipimpin seorang
  **Direktur**, dengan satuan akademik berupa **Jurusan** — bukan Rektor/Fakultas.
  Uji otomatis kini menolak kata "Rektor", "Dekan", dan "Fakultas" di seluruh keluaran.
- Berdiri sebagai politeknik mandiri melalui **SK Mendikbud 080/O/1997 tanggal
  28 April 1997**, berakar dari Politeknik Mekanik Swiss (1976) lalu Politeknik
  Universitas Lambung Mangkurat (1986, World Bank Loan II).
- **5 jurusan**: Teknik Sipil dan Kebumian, Teknik Mesin, Teknik Elektro, Akuntansi,
  Administrasi Bisnis.
- Alamat Jl. Brigjen H. Hasan Basri, Kayu Tangi, Banjarmasin 70123 ·
  **(0511) 330 5052** · **info@poliban.ac.id** · akademik **akademik@poliban.ac.id** ·
  hotline WhatsApp **0812 5809 6162**.

### Pimpinan

| Jabatan | Nama |
| --- | --- |
| Direktur | Joni Riadi, S.ST., M.T. |
| Wakil Direktur I | H. Ahmad Rizani, S.T., M.T. |
| Wakil Direktur II | Riswan Yunida, S.E., M.M. |
| Wakil Direktur III | H. M. Syafwansyah Effendi, S.T., M.T. |

Situs lama menuliskan direktur sebagai "Joniriadi" tanpa spasi — sudah diperbaiki.

### PKKMB 2026

- Tema resmi: **"Bersinergi, Berinovasi, dan Berdampak Bersama Poliban"**.
- Pelaksanaan **4–6 Agustus 2026** (dikonfirmasi dua sumber independen);
  Pra-PKKMB **3 Agustus**; perkuliahan perdana **24 Agustus 2026**.
- **1.817 mahasiswa baru**, naik dari sekitar 1.400 pada 2025.
- Sertifikat PKKMB menjadi syarat wajib UAS dan kelulusan.
- Direktur menegaskan kegiatan bebas perpeloncoan dan kekerasan, sejalan dengan
  slogan kampus *happy and friendly*.

### Program studi

**22 program studi** — bukan 21 seperti pada versi sebelumnya — terdiri atas
**1 D2, 11 D3, dan 10 D4** di lima jurusan. Yang penting: **akreditasi berbeda-beda
per prodi** ("Baik Sekali", "Baik", dan sebagian masih berperingkat lama "B"), dan
satu prodi (`21318`) tidak mencantumkan akreditasi sama sekali sehingga ditampilkan
sebagai *"Belum tercantum pada sumber resmi"*. Versi lama menyeragamkan semuanya
menjadi satu nilai — itu fabrikasi dan sudah dihapus.

Dua prodi pada mirror lama sudah tidak ada di portal resmi (D3 Teknik Geodesi dan
D3 Komputerisasi Akuntansi); keduanya berganti nama menjadi lini D4 Geomatika dan
D3 Sistem Informasi Akuntansi. Slug lama tetap dipertahankan agar tautan luar tidak
mati, dan hal ini diuji otomatis.

Temuan menonjol dari laman detail resmi: **D4 Teknik Bangunan Rawa satu-satunya di
Indonesia**; **D4 Sistem Informasi Kota Cerdas** pertama di Indonesia (izin
KEMDIKBUD 362/M/2020); **D3 Alat Berat** dirintis 2005 bersama **PT Trakindo Utama**
dan enam kali Juara Umum K3TAB.

---

## 3. Cara fakta itu dirawat

Alih-alih menempelkan teks ke template, fase ini menambahkan tiga lapis data:

```
src/data/sources.js            13 sumber: penerbit, URL, lisensi, tanggal, status
src/data/assets.js             registri aset: pemilik, lisensi, origin, atribusi
src/data/cache/pmb-programs.json   snapshot 22 prodi dari portal SPMB
```

`programs.js` menurunkan seluruh isinya dari cache tersebut, digabung dengan naskah
editorial yang ditulis tangan dan dikunci pada kode PDDikti. Pembaruan dilakukan
lewat perintah eksplisit, **bukan scraping saat runtime**:

```bash
npm run refresh:prodi    # ambil ulang dari portal SPMB, tulis cache
npm run refresh:check    # keluar dengan kode 1 bila data resmi sudah berubah
```

Pemeriksaan otomatis yang menjaga integritas:

| Perintah | Fungsi |
| --- | --- |
| `npm run check` | build + lint + 85 uji |
| `tools/sources.test.mjs` | kelengkapan sumber, atribusi aset, larangan hotlink, larangan sisa aset AI, larangan angka yang sudah dipensiunkan |
| `tools/check-links.mjs` | verifikasi seluruh tautan eksternal (butuh jaringan, dijalankan manual) |

Hasil terakhir: **41 halaman, 2.433 tautan, 0 galat lint, 85/85 uji lulus.**

---

## 4. Aset visual

Seluruh foto hasil AI dari fase 1 **dihapus**. Yang tersisa hanya empat berkas, dan
setiap satunya punya asal-usul yang tercatat:

| Aset | Asal | Lisensi / status | Catatan |
| --- | --- | --- | --- |
| `logo-poliban.png` | Lambang resmi Poliban dari mirror portal PKKMB | Milik institusi | Dipakai apa adanya; tidak digambar ulang atau distilisasi |
| `pkkmb-banner.png` / `.webp` | Banner resmi PKKMB 2026 dari portal PKKMB | Milik institusi | Tampil di beranda dan halaman masuk |
| `direktur.jpg` | Foto Direktur dari portal PKKMB | Milik institusi | Menyertai sambutan |
| `kampus-gerbang.jpg` / `.webp` | Wikimedia Commons, karya Arief Rahman Saan (Ezagren), 2011 | **Attribution** — kredit wajib | Kredit tampil di `profil.html` dan `sumber.html` |
| `og-pkkmb.jpg` | Turunan banner resmi, dipotong 1200×630 | Milik institusi | Kartu pratinjau media sosial |

Semua gambar diunduh dan disajikan secara lokal — uji otomatis menggagalkan build
jika ada `<img>` yang menunjuk ke domain luar. Aset berlisensi wajib memuat teks
atribusinya di setiap halaman yang memakainya, juga ditegakkan oleh uji.

Pencarian gambar untuk logo resmi hanya mengembalikan gambar ulang buatan pihak
ketiga (blogspot) dan logo institusi lain. Semuanya **ditolak** — logo yang dipakai
diambil dari berkas institusional yang sudah ada di riwayat repositori.

---

## 5. Hal yang tidak dapat diverifikasi

Semuanya terdokumentasi terbuka di `sumber.html`, bukan disembunyikan.

**Dihapus dari situs karena tidak ada sumber resmi:**

- Jumlah mahasiswa aktif (4.617) dan dosen/tendik (205) — berasal dari mirror lama.
- Peringkat akreditasi institusi. Sumber pihak ketiga menyebut "Baik Sekali" dengan
  SK BAN-PT 2329/SK/BAN-PT/Ak/D3/VI/2023, tetapi tidak ada laman resmi Poliban yang
  mengonfirmasinya.
- Jam per sesi pada rundown harian. Rundown resmi hanya terbit sebagai lampiran PDF
  yang tidak dapat dibaca secara terprogram, sehingga halaman jadwal menautkan
  dokumen aslinya alih-alih menampilkan jam karangan.
- Susunan panitia PKKMB.
- Daftar atribut dan perlengkapan wajib yang dulu dirinci per butir — sekarang
  merujuk ke dokumen tata tertib resmi.

**Konflik antar sumber resmi yang ditampilkan apa adanya:**

- **D3 Teknik Pertambangan** — laman prodi menyebut "Baik Sekali" (SK LAM Teknik
  0472/2024), portal SPMB menyebut "Baik" (SK 2023).
- **D3 Teknik Alat Berat** — laman prodi menyebut "Baik" (SK BAN-PT 9980/2022),
  portal SPMB menyebut "B".

Nilai portal SPMB dipakai sebagai kanonik karena satu portal itu mencakup seluruh
prodi secara konsisten, tetapi perbedaannya dicatat di cache dan **ditampilkan kepada
pembaca** pada halaman prodi terkait, lengkap dengan tautan ke laman prodi.

**Masih terbuka:**

- Visi–misi institusi. Setiap jurusan punya visi–misi sendiri yang terbit resmi,
  tetapi tidak ditemukan laman visi–misi tingkat institusi.
- Penempatan jurusan untuk D3 Sistem Informasi. Portal SPMB tidak menautkan situs
  prodi ini, sehingga penempatannya mengikuti Pedoman Akademik 2024
  (Administrasi Bisnis) dan perlu ditegaskan pihak kampus.
- Pra-PKKMB 3 Agustus baru terkonfirmasi satu sumber; tanggal 4–6 Agustus
  terkonfirmasi dua sumber.
- `poliban.ac.id/fasilitas/` ditautkan dari footer situs resmi tetapi mengembalikan
  404. Enam fasilitas yang ditampilkan disusun dari berita dan laman unit yang
  masing-masing punya sumber, bukan dari satu halaman fasilitas.

---

## 6. Yang perlu datang langsung dari tim PKKMB / Poliban

Daftar ini tidak bisa diselesaikan lewat riset publik:

1. **Rundown terjadwal per sesi** dalam bentuk teks atau data — agar halaman jadwal
   dapat menampilkan jam, lokasi, dan pemateri, bukan sekadar menautkan PDF.
2. **Susunan panitia dan struktur gugus** beserta kontak pendamping.
3. **Ketentuan atribut dan perlengkapan wajib** sebagai teks resmi.
4. **Visi–misi institusi** yang disahkan, untuk melengkapi halaman profil.
5. **Peringkat akreditasi institusi** beserta nomor SK dan masa berlakunya.
6. **Statistik mutakhir** mahasiswa aktif, dosen, dan tenaga kependidikan.
7. **Konfirmasi jurusan pengampu D3 Sistem Informasi.**
8. **Foto kegiatan PKKMB dan fasilitas kampus** yang boleh dipublikasikan — saat ini
   situs sengaja tampil teks-dominan karena tidak ada stok foto resmi yang jelas
   status penggunaannya.
9. **Berkas lambang resmi** dalam format vektor (SVG/AI/EPS) beserta pedoman
   penggunaannya, agar lambang tajam pada semua ukuran.
10. **Alur autentikasi Portal PKKMB** — halaman masuk masih mengirim ke endpoint
    Laravel yang ada, dan token CSRF perlu dirender server, bukan disematkan statis.

---

## 7. Perubahan yang menyertai

- `sumber.html` — halaman transparansi baru, tertaut dari footer.
- `program-studi.html` — penyaring D2 ditambahkan; catatan sumber dan tanggal ambil
  ditampilkan.
- Halaman detail prodi — akreditasi, kurikulum, dan prospek karier hanya tampil bila
  datanya ada; tersedia tautan ke laman resmi SPMB dan situs prodi.
- `fasilitas.html` — tata letak editorial berbasis teks, enam entri bersumber.
- `profil.html` — foto kampus berkredit dan tabel jajaran pimpinan.
- `kontak.html` — kanal hotline akademik ditambahkan.
- `login.html` — latar AI diganti gradien; banner resmi PKKMB ditampilkan.
