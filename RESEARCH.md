# Laporan Riset Konten — PKKMB Poliban 2026

Tanggal riset: **14 Agustus 2026** · Cakupan: fase 2 (verifikasi fakta) dan fase 3 (aset autentik & pipeline data)

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
| **WP REST API situs resmi** | `poliban.ac.id/wp-json/wp/v2/` | **Berita, laman, dan metadata media** — dasar pembaruan otomatis (lihat §3) |
| **Lambang Poliban** | `poliban.ac.id/logo-poliban/` | **Nama lambang, warna, perancang, dan makna kedelapan unsurnya** |
| Penerimaan Mahasiswa Baru 2026 | `poliban.ac.id/penerimaan2026/` | Empat jalur seleksi; daftar prodi per jurusan (menyebut 21 prodi) |
| Penutupan PKKMB 2024 | `poliban.ac.id/hadiri-upacara-penutupan-pkkmb-2024-.../` | Dokumentasi foto kegiatan PKKMB |
| Arsip berita | `poliban.ac.id/our-blog/` | Dokumentasi foto papan nama kampus |
| Video Profile Poliban 2024 | `poliban.ac.id/video-profile-poliban-2024/` | Berkas logo horizontal resmi |

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

### Lambang institusi

Laman resmi lambang mendokumentasikan identitas visual Poliban secara lengkap,
dan seluruhnya kini tersaji di halaman profil:

- Nama lambang **“Enggang Bakilau”**; warna putih, biru, kuning kemerah-merahan,
  dan hitam kebiru-biruan.
- Dasar filosofis dan desain grafis oleh **Ir. Yurnadi Vahlevi**; gambar grafis
  oleh **Buyung Bachteransyah**.
- Delapan unsur bermakna, di antaranya: dasar persegi lima (Pancasila), batu
  mulia intan (hasil tambang khas Kalimantan Selatan), dan burung enggang
  mencengkeram rantai (keterpaduan dunia pendidikan dan industri).
- **Jumlah bulu enggang mengkodekan tanggal berdiri**: sayap 23 helai, ekor
  9 helai, dada 87 helai → **23 September 1987**, saat masih bernama Politeknik
  Unlam. Angka ini diuji otomatis agar tetap konsisten.

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
src/data/sources.js                 20 sumber: penerbit, URL, lisensi, tanggal, status
src/data/assets.js                  registri aset: pemilik, lisensi, origin, atribusi
src/data/emblem.js                  lambang institusi beserta makna tiap unsurnya
src/data/cache/pmb-programs.json    snapshot 22 prodi dari portal SPMB
src/data/cache/poliban-news.json    12 berita terbaru dari WP REST API resmi
```

### Endpoint resmi yang dapat disegarkan

Situs `poliban.ac.id` berjalan di atas WordPress dan **membuka WP REST API
bawaannya tanpa autentikasi** (`/wp-json/wp/v2/posts`, `/pages`, `/media`).
`robots.txt` juga tidak melarang pengambilan terprogram. Ini memungkinkan
pembaruan yang reprodusibel tanpa scraping HTML yang rapuh.

Yang disimpan hanya **metadata faktual** — judul, tanggal, ringkasan, tautan,
kategori. Isi artikel tidak disalin; setiap kartu menautkan kembali ke laman
aslinya. Kegagalan jaringan **tidak merusak apa pun**: cache lama tetap dipakai
dan build tetap berhasil.

`programs.js` menurunkan seluruh isinya dari cache tersebut, digabung dengan naskah
editorial yang ditulis tangan dan dikunci pada kode PDDikti. Pembaruan dilakukan
lewat perintah eksplisit, **bukan scraping saat runtime**:

```bash
npm run refresh:prodi    # ambil ulang 22 prodi dari portal SPMB
npm run refresh:news     # ambil ulang berita dari WP REST API resmi
npm run refresh          # keduanya sekaligus
npm run refresh:check    # keluar dengan kode 1 bila data resmi sudah berubah
```

Pemeriksaan otomatis yang menjaga integritas:

| Perintah | Fungsi |
| --- | --- |
| `npm run check` | build + lint + 85 uji |
| `tools/sources.test.mjs` | kelengkapan sumber, atribusi aset, larangan hotlink, larangan sisa aset AI, larangan angka yang sudah dipensiunkan |
| `tools/check-links.mjs` | verifikasi seluruh tautan eksternal (butuh jaringan, dijalankan manual) |

Uji `tools/sources.test.mjs` kini juga menegakkan hal-hal berikut:

- **Setiap `<img>` dan `<source>` pada keluaran harus terdaftar di `assets.js`** —
  gambar eksternal tidak bisa menyelinap melewati sistem metadata.
- Teks alternatif harus deskriptif atau sengaja dikosongkan; `width`/`height`
  wajib ada; **lambang resmi tidak boleh diregangkan** lebih dari 6% dari rasio
  aslinya. Aturan terakhir ini menangkap satu bug nyata: `sumber.html` sempat
  memampatkan logo horizontal ke dalam kotak 72×72.
- Entri cache berita wajib unik, bertanggal ISO, berdomain `poliban.ac.id`,
  bebas HTML mentah dan entitas yang belum diterjemahkan, serta terurut menurun.

Hasil terakhir: **41 halaman, 2.520 tautan, 0 galat lint, 119/119 uji lulus.**
1.990 tautan internal (termasuk fragmen antarhalaman) diverifikasi tanpa satu pun rusak.

---

## 4. Aset visual

Seluruh foto hasil AI dari fase 1 **dihapus**. Pustaka aset kini berisi tujuh
berkas, semuanya berasal dari sumber pertama Poliban kecuali satu foto Commons
yang berlisensi jelas. Setiap berkas tercatat lengkap di `src/data/assets.js`.

| Aset | Asal | Lisensi / status | Dipakai di |
| --- | --- | --- | --- |
| `logo-poliban-lambang.png` | `poliban.ac.id/.../logo-poliban_kecil_dg_padding.jpg` (laman penerimaan) | Milik institusi | Header setiap halaman, bagian Lambang |
| `logo-poliban-wordmark.png` | `poliban.ac.id/.../poliban2.png` (kop situs resmi) | Milik institusi | Footer setiap halaman |
| `pkkmb-banner.png` / `.webp` | Spanduk resmi PKKMB 2026 dari portal PKKMB | Milik institusi | Beranda, halaman masuk |
| `pkkmb-2024-direktur.jpg` / `.webp` | `poliban.ac.id/.../WhatsApp-Image-2024-08-16-....jpeg` (liputan penutupan PKKMB 2024) | Milik institusi | Hero beranda, panduan PKKMB |
| `kampus-signage.jpg` / `.webp` | `poliban.ac.id/.../WhatsApp-Image-2024-09-24-...-1170x780.jpg` (arsip berita) | Milik institusi | Beranda, halaman profil |
| `direktur.jpg` | Portal PKKMB resmi | Milik institusi | Sambutan Direktur |
| `kampus-gerbang.jpg` / `.webp` | Wikimedia Commons, Arief Rahman Saan (Ezagren), 2011 | **Attribution** — kredit wajib | Halaman profil (berkredit) |

### Prinsip yang dipegang

- **Lambang dipakai sebagaimana diterbitkan.** Hanya margin kosong yang dipangkas;
  bentuk, warna, dan proporsi tidak diubah, dan uji otomatis menolak peregangan.
  Pencarian gambar untuk logo hanya mengembalikan gambar ulang pihak ketiga
  (blogspot) serta logo institusi lain — semuanya **ditolak**.
- **Foto dokumentasi selalu diberi keterangan tahun.** Foto PKKMB yang tersedia
  berasal dari 2024, sehingga setiap penempatannya menyertakan keterangan
  “Dokumentasi PKKMB Poliban 2024” agar tidak disalahartikan sebagai 2026.
- **Tidak ada hotlink.** Semua berkas disalin ke repositori; uji menggagalkan
  build bila ada `<img>` yang menunjuk domain luar.
- **Tidak ada foto pengganti.** Halaman yang tidak punya foto resmi — fasilitas,
  program studi, pengumuman — tetap bertumpu pada tipografi, lambang asli,
  tabel, dan tata letak editorial, bukan stok atau citra buatan.

### Kinerja

Total muatan gambar **turun dari 1,22 MB menjadi 898 KB** meskipun jumlah aset
bertambah, melalui penyandian ulang spanduk (199→24 KB) dan logo horizontal
(96→15 KB) ke PNG 8-bit serta pengecilan foto gerbang ke lebar 1200 px.

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

**Ditambahkan pada pass ini:**

- Daftar atribut wajib yang dulu dirinci per butir kini merujuk dokumen tata
  tertib resmi.
- **Lokasi ruang PKKMB** ("Aula Utama, lapangan upacara, gedung jurusan") dihapus
  dari halaman panduan — tidak ada sumber resmi yang menyebut ruangannya.
  Ringkasan kini hanya menyebut alamat kampus.

**Konflik antar sumber resmi yang ditampilkan apa adanya:**

- **D3 Teknik Pertambangan** — laman prodi menyebut "Baik Sekali" (SK LAM Teknik
  0472/2024), portal SPMB menyebut "Baik" (SK 2023).
- **D3 Teknik Alat Berat** — laman prodi menyebut "Baik" (SK BAN-PT 9980/2022),
  portal SPMB menyebut "B".
- **Jumlah program studi** — laman Penerimaan 2026 menyebut **21**, siaran pers
  PKKMB menyebut **20**, portal SPMB merinci **22**. Situs memakai angka portal
  SPMB karena portal itu satu-satunya yang mencantumkan setiap prodi beserta
  akreditasinya; perbedaan ini ditampilkan pada `program-studi.html` dan
  `sumber.html`.

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
- **Dokumentasi foto PKKMB 2026.** Situs resmi baru menerbitkan satu foto
  kegiatan 2026 (`PNB00396.jpg`) dan berkas aslinya tidak dapat diambil dari
  lingkungan kerja ini. Suasana PKKMB karena itu diwakili dokumentasi 2024.
- **Laman jurusan tidak memuat profil.** Laman Mesin, Akuntansi, dan
  Administrasi Bisnis hanya menampilkan umpan berita — tidak ada visi–misi
  maupun daftar prodi yang bisa diekstrak. Hanya Elektro dan Sipil yang
  menerbitkan visi–misi jurusan.
- `poliban.ac.id/struktur-organisasi-poliban/` mengembalikan **HTTP 500** dan
  isinya kosong di API, sehingga bagan struktur organisasi tidak dapat dikutip.

---

## 5b. Catatan kualitas produk (pass akhir)

Pass terakhir tidak menambah fakta baru; fokusnya mengubah data yang sudah
terverifikasi menjadi pengalaman yang benar-benar terpakai.

- **Status kegiatan kini dihitung saat build.** Sebelumnya lencana status
  dikirim sebagai teks `Memuat…` dan baru benar setelah JavaScript berjalan.
  Sekarang HTML statis sudah memuat fase yang tepat; skrip hanya menghitung
  ulang bila halaman dibuka pada tanggal berbeda dari tanggal build.
- **Kepadatan kartu diturunkan drastis** dengan mengganti grid seragam menjadi
  komposisi editorial: beranda 23 → 12, program studi 23 → 1, sumber 37 → 10,
  berita 18 → 6. Tidak ada satu pun bidang data yang dihilangkan.
- **Tombol Portal PKKMB tidak lagi hilang di ponsel kecil** — sebelumnya
  disembunyikan di bawah 640px, justru pada layar yang paling banyak dipakai.
- **Halaman PKKMB memisahkan secara eksplisit** mana yang terverifikasi
  (tanggal) dan mana yang belum dipublikasikan (jam sesi, ruangan, pemateri),
  serta menautkan dokumen rundown resmi sebagai acuan.
- **`tools/check-links.mjs` kini jujur soal keterbatasan jaringan**: bila semua
  permintaan gagal di lapisan koneksi, ia melaporkan bahwa verifikasi tidak
  dapat dilakukan alih-alih mengklaim ratusan tautan rusak.

## 5c. Pengerasan produksi (pass rilis)

Pass terakhir memeriksa kesiapan rilis dan memperbaiki temuan berikut.

**Akurasi faktual**

- Situs menyatakan "satu program studi" belum berakreditasi, padahal **tiga**
  yang kosong: D4 Teknologi Rekayasa Pemeliharaan Alat Berat, D4 Teknologi
  Rekayasa Geomatika dan Survei, dan D4 Teknologi Rekayasa Konstruksi Jalan dan
  Jembatan. Angka itu ditulis tangan lalu menyimpang dari cache. Kini
  diturunkan dari data (`programStats.withoutAccreditation`) dan ketiganya
  disebut namanya, dijaga uji otomatis.
- Cache prodi dan data lambang diverifikasi ulang terhadap sumber langsung:
  22 kode dan jenjang identik, teks lambang sama persis. Tidak ada penyimpangan.

**Keamanan pipeline berita**

- Nilai dari umpan sempat masuk ke atribut `href` dan `datetime` tanpa di-escape.
  Tanda kutip pada `link` hulu dapat keluar dari atribut dan menyisipkan atribut
  sembarang. Semua interpolasi kini melewati `esc()`.
- Pengambilan memvalidasi di hulu: URL wajib https pada `poliban.ac.id`, tanggal
  wajib ISO valid, id wajib bilangan bulat. Entri yang ditolak dilaporkan.
- Ditambahkan pelindung penyusutan: cache sehat tidak akan ditimpa respons yang
  jumlahnya kurang dari separuh, sehingga respons parsial tidak menghapus berita
  yang masih valid.
- `src/data/news.js` memvalidasi ulang saat build dan **melempar galat**, karena
  cache berupa JSON yang bisa disunting tangan. Sudah diuji: menyuntik domain
  asing membuat build gagal, bukan diam-diam terbit.

**Metadata & penerbitan**

- `canonical: ""` berarti akar situs, tetapi dianggap falsy sehingga **beranda
  terbit tanpa kanonik**. Diganti opsi `noindex` eksplisit; `login.html`
  memakainya dan benar-benar tanpa kanonik maupun `og:url`.
- Tidak ada halaman yang memuat `og:url`, sehingga pratinjau tautan tidak dapat
  dideduplikasi. Kini selalu ada dan selalu sama dengan kanonik.
- Ditambahkan `og:image:width/height/alt`.
- Sitemap diverifikasi memuat tepat 36 halaman terindeks — tanpa `login.html`
  dan tanpa empat pengalihan `profil/*`.

**Aksesibilitas & aset**

- Sasaran sentuh utama di ponsel dinaikkan ke 44px: tombol menu, tombol Portal
  di header, dan penyaring jenjang pada penjelajah prodi.
- `direktur.jpg` tercatat 459×667 padahal berkasnya 600×872. Rasionya sama
  sehingga tidak gepeng, tetapi ukuran intrinsik yang salah memicu pergeseran
  tata letak. Diperbaiki, dan ditambahkan uji yang membaca header PNG/JPEG/WebP
  langsung untuk mencegah penyimpangan serupa.

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
   penggunaannya. Lambang yang dipakai saat ini adalah raster dari laman resmi;
   versi vektor akan membuatnya tajam pada semua ukuran dan layar.
10. **Alur autentikasi Portal PKKMB** — halaman masuk masih mengirim ke endpoint
    Laravel yang ada, dan token CSRF perlu dirender server, bukan disematkan statis.
11. **Kepastian jumlah program studi**, karena tiga laman resmi menyebut angka
    berbeda (20, 21, dan 22).
12. **Bagan struktur organisasi**, karena lamannya galat dan isinya kosong di API.

---

## 7. Perubahan yang menyertai

**Fase 2 — konten faktual**

- `sumber.html` — halaman transparansi baru, tertaut dari footer.
- `program-studi.html` — penyaring D2; catatan sumber, tanggal ambil, dan
  perbedaan jumlah prodi antar laman resmi.
- Halaman detail prodi — akreditasi, kurikulum, dan prospek karier hanya tampil
  bila datanya ada; tersedia tautan ke laman SPMB dan situs prodi; konflik
  akreditasi ditampilkan terbuka.
- `fasilitas.html` — tata letak editorial berbasis teks, enam entri bersumber.
- `kontak.html` — kanal hotline akademik ditambahkan.

**Fase 3 — aset autentik dan pipeline**

- **Header dan footer** memakai dua lambang resmi Poliban yang sesungguhnya,
  menggantikan logo yang sebelumnya dipotong dari spanduk.
- **Beranda** — hero menampilkan foto dokumentasi PKKMB dan mengutip siaran
  resmi untuk angka pesertanya; bagian baru “Kabar terbaru kampus” menarik
  berita dari situs institusi; foto papan nama kampus melengkapi bagian kampus.
- **`pkkmb.html`** — foto dokumentasi kegiatan dan kutipan Direktur yang
  bertaut ke siaran resminya; daftar ruangan yang tidak bersumber dihapus.
- **`profil.html`** — bagian **Lambang** baru yang menguraikan makna kedelapan
  unsur beserta kedua perancangnya; foto papan nama kampus ditambahkan.
- **`berita.html`** — bagian “Kabar kampus Poliban” memuat dua belas berita
  resmi terbaru, masing-masing menautkan artikel aslinya.
- **`sumber.html`** — blok “Cara data disegarkan” yang menjelaskan kedua
  endpoint, perintah pembaruannya, dan perilaku saat jaringan gagal.
- **Desain** — `backdrop-blur` pada hero dihapus (tidak berefek di atas gradien
  datar) dan radius sudut yang berlebihan dinormalkan. Palet sudah selaras
  dengan lambang: emas `#eab134` pada situs berdampingan dengan `#E2B911` pada
  lambang asli.
