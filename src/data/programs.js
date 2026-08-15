/**
 * Program studi Politeknik Negeri Banjarmasin.
 *
 * Data faktual (nama, jenjang, akreditasi, situs prodi, jurusan) BERASAL dari
 * cache portal SPMB resmi - lihat `cache/pmb-programs.json` dan
 * `tools/fetch-programs.mjs`. Modul ini hanya menambahkan slug URL lama serta
 * teks naratif (fokus keilmuan, prospek karier) yang diringkas dari halaman
 * resmi masing-masing prodi.
 *
 * Akreditasi TIDAK seragam: portal resmi mencantumkan nilai berbeda per prodi,
 * dan beberapa prodi baru belum memiliki nilai. Jangan menyeragamkannya.
 */

import cache from "./cache/pmb-programs.json" with { type: "json" };

export const programsSource = {
  sourceId: cache.sourceId,
  url: cache.source,
  fetchedAt: cache.fetchedAt,
};

export const departments = [
  {
    id: "teknik-sipil",
    name: "Teknik Sipil dan Kebumian",
    sourceId: "poliban-sipil",
    blurb:
      "Penyelenggara pendidikan vokasional dan penelitian yang unggul di bidang keteknikan \u2014 konstruksi, geomatika, dan pertambangan, dengan spesialisasi khas lahan rawa Kalimantan.",
  },
  {
    id: "teknik-mesin",
    name: "Teknik Mesin",
    sourceId: "poliban-pkkmb-2026",
    blurb:
      "Manufaktur, otomotif, dan pemeliharaan alat berat \u2014 sektor yang menjadi tulang punggung industri pertambangan dan konstruksi Kalimantan Selatan.",
  },
  {
    id: "teknik-elektro",
    name: "Teknik Elektro",
    sourceId: "poliban-elektro",
    blurb:
      "Mewujudkan jurusan yang unggul dalam menghasilkan inovasi produk bidang sains terapan \u2014 mencakup kelistrikan, elektronika, informatika, otomasi, dan energi.",
  },
  {
    id: "akuntansi",
    name: "Akuntansi",
    sourceId: "poliban-pkkmb-2026",
    blurb:
      "Membekali kemampuan pencatatan, pelaporan, audit, hingga sistem informasi keuangan \u2014 termasuk akuntansi lembaga keuangan syariah.",
  },
  {
    id: "administrasi-bisnis",
    name: "Administrasi Bisnis",
    sourceId: "poliban-pkkmb-2026",
    blurb:
      "Menyiapkan tenaga profesional bidang administrasi perkantoran, layanan pelanggan, sistem informasi, dan bisnis digital.",
  },
];

/**
 * Teks naratif per prodi (ringkasan dari halaman resmi prodi & portal SPMB).
 * Fakta terukur TIDAK disimpan di sini - lihat cache/pmb-programs.json.
 */
const EDITORIAL = {
  "21513": {
    tagline:
      "Melatih tenaga terampil perawatan alat berat dengan dasar keteknikan yang kuat.",
    focus: [
      "Komponen alat berat: mesin, hidrolik, listrik, power train, undercarriage",
      "Pemeliharaan, perawatan, dan perbaikan sesuai SOP",
      "Penggunaan measuring tools dan working tools",
      "Praktik jacking, blocking, dan lifting yang aman",
    ],
    careers: [
      "Teknisi perawatan alat berat",
      "Operator alat berat",
      "Tenaga terampil bidang alat berat",
    ],
  },
  "63411": {
    tagline:
      "Mengelola operasional kantor modern, korespondensi bisnis, dan layanan pelanggan secara profesional.",
    focus: [
      "Manajemen perkantoran dan kearsipan digital",
      "Komunikasi bisnis dan korespondensi dua bahasa",
      "Kesekretariatan dan manajemen acara",
      "Dasar akuntansi, pajak, dan kewirausahaan",
    ],
    careers: [
      "Sekretaris eksekutif",
      "Staf administrasi dan perkantoran",
      "Customer relations officer",
      "Event & office coordinator",
    ],
  },
  "63311": {
    tagline:
      "Merancang strategi bisnis berbasis data, kanal digital, dan perdagangan elektronik.",
    focus: [
      "Pemasaran digital dan analitik kanal",
      "Manajemen e-commerce dan rantai pasok digital",
      "Analisis data bisnis dan visualisasi",
      "Perancangan model bisnis serta startup vokasi",
    ],
    careers: [
      "Digital marketing specialist",
      "E-commerce manager",
      "Business data analyst",
      "Technopreneur",
    ],
  },
  "62401": {
    tagline:
      "Menguasai siklus akuntansi, perpajakan, dan pelaporan keuangan sesuai standar yang berlaku.",
    focus: [
      "Akuntansi keuangan dan akuntansi biaya",
      "Perpajakan dan penyusunan SPT",
      "Audit internal dan pengendalian",
      "Aplikasi akuntansi terkomputerisasi",
    ],
    careers: [
      "Staf akuntansi dan pelaporan",
      "Tax officer",
      "Asisten auditor",
      "Staf keuangan instansi pemerintah",
    ],
  },
  "57403": {
    tagline:
      "Menjembatani proses bisnis dan teknologi melalui perancangan serta pengelolaan sistem informasi.",
    focus: [
      "Analisis dan perancangan sistem informasi",
      "Basis data dan pemrograman aplikasi bisnis",
      "Manajemen proyek teknologi informasi",
      "Keamanan data dan tata kelola informasi",
    ],
    careers: [
      "System analyst junior",
      "Database administrator",
      "Pengembang aplikasi bisnis",
      "IT support & implementator ERP",
    ],
  },
  "57406": {
    tagline:
      "Memadukan kompetensi akuntansi dengan pengembangan sistem informasi keuangan.",
    focus: [
      "Siklus akuntansi berbasis sistem",
      "Perancangan sistem informasi akuntansi",
      "Audit sistem informasi",
      "Otomasi pelaporan dan analitik keuangan",
    ],
    careers: [
      "Analis sistem informasi akuntansi",
      "Konsultan implementasi software akuntansi",
      "Staf akuntansi berbasis teknologi",
      "Auditor sistem informasi junior",
    ],
  },
  "62301": {
    tagline:
      "Menyiapkan akuntan yang memahami prinsip syariah dan praktik industri keuangan syariah.",
    focus: [
      "Akuntansi syariah dan standar PSAK syariah",
      "Operasional perbankan dan asuransi syariah",
      "Audit dan kepatuhan syariah",
      "Manajemen zakat, wakaf, dan pembiayaan mikro",
    ],
    careers: [
      "Akuntan lembaga keuangan syariah",
      "Analis pembiayaan syariah",
      "Auditor kepatuhan syariah",
      "Pengelola baitul maal wa tamwil",
    ],
  },
  "21413": {
    tagline:
      "Spesialisasi pengoperasian, perawatan, dan perbaikan alat berat untuk industri tambang dan konstruksi.",
    focus: [
      "Sistem hidrolik, pneumatik, dan powertrain",
      "Engine diesel dan sistem kelistrikan alat berat",
      "Perawatan terjadwal dan diagnosis kerusakan",
      "Keselamatan kerja pertambangan",
    ],
    careers: [
      "Mechanic & service advisor alat berat",
      "Maintenance planner",
      "Field engineer pertambangan",
      "Instruktur teknik alat berat",
    ],
  },
  "21401": {
    tagline:
      "Menguasai proses manufaktur, perancangan komponen, dan pemeliharaan mesin industri.",
    focus: [
      "Proses produksi, pemesinan, dan pengelasan",
      "Gambar teknik serta CAD/CAM",
      "Mekanika kekuatan material",
      "Perawatan mesin dan utilitas industri",
    ],
    careers: [
      "Production supervisor",
      "Drafter dan desainer mekanik",
      "Quality control manufaktur",
      "Teknisi pemeliharaan industri",
    ],
  },
  "21304": {
    tagline:
      "Rekayasa kendaraan modern, dari sistem konvensional hingga elektrifikasi.",
    focus: [
      "Engine management dan sistem kendali kendaraan",
      "Chassis, transmisi, dan sistem kemudi",
      "Kendaraan listrik dan hibrida",
      "Diagnosis berbasis alat pindai elektronik",
    ],
    careers: [
      "Automotive engineer",
      "Technical service supervisor",
      "Spesialis kendaraan listrik",
      "Wirausaha bengkel spesialis",
    ],
  },
  "21318": {
    tagline:
      "Manajemen pemeliharaan armada alat berat berbasis keandalan dan analisis data.",
    focus: [
      "Reliability centered maintenance",
      "Analisis kegagalan dan predictive maintenance",
      "Manajemen suku cadang dan biaya operasi",
      "Sistem hidrolik dan elektronik alat berat",
    ],
    careers: [
      "Maintenance engineer",
      "Reliability analyst",
      "Asset & fleet manager",
      "Konsultan produktivitas alat berat",
    ],
  },
  "20401": {
    tagline:
      "Merancang dan merawat perangkat elektronika, instrumentasi, serta sistem kendali.",
    focus: [
      "Rangkaian analog dan digital",
      "Mikrokontroler dan sistem tertanam",
      "Instrumentasi dan sensor industri",
      "Perawatan perangkat elektronik",
    ],
    careers: [
      "Teknisi elektronika industri",
      "Embedded system developer",
      "Instrumentation technician",
      "Wirausaha perangkat elektronik",
    ],
  },
  "55401": {
    tagline:
      "Membangun perangkat lunak, jaringan, dan layanan digital yang siap pakai di industri.",
    focus: [
      "Pemrograman web dan aplikasi bergerak",
      "Basis data dan rekayasa perangkat lunak",
      "Jaringan komputer dan administrasi server",
      "Keamanan siber dasar serta etika teknologi informasi",
    ],
    careers: [
      "Software developer",
      "Web & mobile programmer",
      "Network administrator",
      "IT support specialist",
    ],
  },
  "20403": {
    tagline:
      "Instalasi, distribusi, dan pemeliharaan sistem tenaga listrik yang aman dan efisien.",
    focus: [
      "Instalasi listrik bangunan dan industri",
      "Mesin listrik dan sistem proteksi",
      "Distribusi dan transmisi tenaga",
      "Efisiensi energi dan K3 kelistrikan",
    ],
    careers: [
      "Teknisi instalasi dan pemeliharaan listrik",
      "Supervisor kelistrikan industri",
      "Staf teknik penyedia tenaga listrik",
      "Kontraktor listrik bersertifikat",
    ],
  },
  "57302": {
    tagline:
      "Mengembangkan solusi kota cerdas berbasis data, sensor, dan layanan publik digital.",
    focus: [
      "Internet of Things dan jaringan sensor kota",
      "Analitik data spasial dan dasbor kota",
      "Pengembangan aplikasi layanan publik",
      "Keamanan dan tata kelola data pemerintahan",
    ],
    careers: [
      "Smart city solution developer",
      "IoT engineer",
      "Data analyst pemerintahan",
      "Konsultan transformasi digital daerah",
    ],
  },
  "36304": {
    tagline:
      "Merancang sistem otomasi industri, robotika, dan kendali proses.",
    focus: [
      "PLC, SCADA, dan HMI",
      "Robotika industri dan sistem manufaktur",
      "Kendali proses dan instrumentasi lanjut",
      "Integrasi sistem industri 4.0",
    ],
    careers: [
      "Automation engineer",
      "Control system integrator",
      "Robotics technician",
      "Process control specialist",
    ],
  },
  "21309": {
    tagline:
      "Mengelola pembangkit listrik konvensional dan energi terbarukan.",
    focus: [
      "Sistem pembangkit termal dan turbin",
      "Energi surya, biomassa, dan mikrohidro",
      "Operasi, pemeliharaan, dan efisiensi pembangkit",
      "Manajemen energi dan keberlanjutan",
    ],
    careers: [
      "Power plant engineer",
      "Renewable energy specialist",
      "Energy auditor",
      "Operator dan supervisor pembangkit",
    ],
  },
  "31401": {
    tagline:
      "Kompetensi eksplorasi, penambangan, dan pengelolaan lingkungan tambang.",
    focus: [
      "Geologi dasar dan eksplorasi",
      "Perencanaan dan operasi penambangan",
      "Pengolahan bahan galian",
      "K3 pertambangan dan reklamasi lahan",
    ],
    careers: [
      "Mine plan engineer junior",
      "Pengawas operasional tambang",
      "Staf lingkungan dan reklamasi",
      "Surveyor tambang",
    ],
  },
  "22401": {
    tagline:
      "Perencanaan, pelaksanaan, dan pengawasan pekerjaan konstruksi bangunan dan infrastruktur.",
    focus: [
      "Struktur beton dan baja",
      "Mekanika tanah dan pondasi",
      "Manajemen konstruksi serta RAB",
      "Pengujian material dan pengendalian mutu",
    ],
    careers: [
      "Pelaksana lapangan konstruksi",
      "Estimator dan quantity surveyor",
      "Drafter dan juru gambar sipil",
      "Pengawas mutu pekerjaan",
    ],
  },
  "22304": {
    tagline:
      "Keahlian khas Kalimantan: membangun di atas lahan rawa dan tanah lunak.",
    focus: [
      "Karakteristik tanah gambut dan lunak",
      "Rekayasa pondasi khusus lahan rawa",
      "Drainase, tanggul, dan pengendalian banjir",
      "Konstruksi berkelanjutan di kawasan basah",
    ],
    careers: [
      "Geotechnical engineer lahan rawa",
      "Perencana infrastruktur kawasan basah",
      "Konsultan konstruksi daerah rawa",
      "Site engineer proyek infrastruktur",
    ],
  },
  "35303": {
    tagline:
      "Pemetaan presisi dengan teknologi geospasial, drone, dan sistem informasi geografis.",
    focus: [
      "Survei terestris dan GNSS",
      "Fotogrametri dan pemetaan dengan drone",
      "Sistem informasi geografis",
      "Kadaster dan pemetaan infrastruktur",
    ],
    careers: [
      "Surveyor geospasial",
      "GIS analyst",
      "Drone mapping specialist",
      "Staf teknis pertanahan",
    ],
  },
  "22301": {
    tagline:
      "Fokus pada perancangan dan pelaksanaan infrastruktur jalan serta jembatan.",
    focus: [
      "Perkerasan jalan dan geometri jalan raya",
      "Struktur jembatan beton dan baja",
      "Manajemen proyek infrastruktur",
      "Pemeliharaan dan evaluasi kondisi jalan",
    ],
    careers: [
      "Highway & bridge engineer",
      "Site manager proyek jalan",
      "Konsultan perencana infrastruktur",
      "Pengawas pemeliharaan jalan",
    ],
  },
};

/**
 * Peta slug URL (dipertahankan dari struktur lama) → pmbId pada cache resmi.
 * Prodi D2 belum pernah punya halaman di situs lama sehingga memakai slug baru.
 */
const SLUGS = {
  "63411": "d3-administrasi-bisnis-141",
  "63311": "d4-bisnis-digital-394",
  "62401": "d3-akuntansi-891",
  "57403": "d3-sistem-informasi-850",
  "57406": "d3-sistem-informasi-akuntansi-387",
  "62301": "d4-akuntansi-lembaga-keuangan-syariah-594",
  "21413": "d3-alat-berat-455",
  "21401": "d3-teknik-mesin-332",
  "21304": "d4-teknologi-rekayasa-otomotif-923",
  "21318": "d4-teknologi-rekayasa-pemeliharaan-alat-berat-916",
  "20401": "d3-elektronika-789",
  "55401": "d3-teknik-informatika-475",
  "20403": "d3-teknik-listrik-757",
  "57302": "d4-sistem-informasi-kota-cerdas-132",
  "36304": "d4-teknologi-rekayasa-otomasi-113",
  "21309": "d4-teknologi-rekayasa-pembangkit-energi-728",
  "31401": "d3-teknik-pertambangan-813",
  "22401": "d3-teknik-sipil-582",
  "22304": "d4-teknik-bangunan-rawa-427",
  "35303": "d4-teknologi-rekayasa-geomatika-dan-survei-996",
  "22301": "d4-teknologi-rekayasa-konstruksi-jalan-dan-jembatan-477",
  "21513": "d2-tata-operasi-pemeliharaan-prediktif-alat-berat",
};

/**
 * Gabungkan fakta resmi (cache) dengan teks naratif editorial.
 * Prodi yang ada di cache namun belum punya naskah tetap tampil dengan
 * informasi faktualnya saja - lebih baik ringkas daripada mengarang.
 */
export const programs = cache.programs.map((p) => {
  const editorial = EDITORIAL[p.pmbId] ?? {};
  return {
    slug: SLUGS[p.pmbId],
    pmbId: p.pmbId,
    name: p.name,
    level: p.level,
    dept: p.dept,
    accreditation: p.accreditation,
    accreditationConflict: p.conflict ?? null,
    accreditationConflictUrl: p.conflictUrl ?? null,
    website: p.website,
    detailUrl: `https://pmb.poliban.ac.id/program-studi-detail/detail/${p.pmbId}`,
    tagline: editorial.tagline ?? null,
    focus: editorial.focus ?? [],
    careers: editorial.careers ?? [],
    sourceId: "pmb-prodi",
  };
});

export const programStats = {
  total: programs.length,
  d2: programs.filter((p) => p.level === "D2").length,
  d3: programs.filter((p) => p.level === "D3").length,
  d4: programs.filter((p) => p.level === "D4").length,
  departments: departments.length,
  /**
   * Prodi yang kolom akreditasinya kosong di portal SPMB. Diturunkan dari data
   * agar salinan di halaman tidak pernah menyimpang dari kenyataan.
   */
  withoutAccreditation: programs.filter((p) => !p.accreditation).length,
};

/** Prodi tanpa akreditasi, untuk ditampilkan apa adanya pada catatan sumber. */
export const programsWithoutAccreditation = programs
  .filter((p) => !p.accreditation)
  .map((p) => ({ pmbId: p.pmbId, name: p.name, level: p.level }));

/** Nilai akreditasi unik yang benar-benar muncul, untuk kebutuhan filter. */
export const accreditationValues = [
  ...new Set(programs.map((p) => p.accreditation).filter(Boolean)),
];

export function programsByDept(deptId) {
  return programs.filter((p) => p.dept === deptId);
}

export function departmentOf(program) {
  return departments.find((d) => d.id === program.dept);
}

export function fullName(program) {
  return `${program.level} ${program.name}`;
}

/** Lama studi & gelar menurut jenjang. */
export function levelInfo(level) {
  switch (level) {
    case "D2":
      return { semesters: 4, years: 2, degree: "Ahli Muda (A.Ma.)" };
    case "D4":
      return { semesters: 8, years: 4, degree: "Sarjana Terapan (S.Tr.)" };
    default:
      return { semesters: 6, years: 3, degree: "Ahli Madya (A.Md.)" };
  }
}
