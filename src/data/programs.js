/**
 * 21 program studi Politeknik Negeri Banjarmasin dalam 5 jurusan.
 * Slug dipertahankan persis seperti struktur URL lama.
 */

export const departments = [
  {
    id: "administrasi-bisnis",
    name: "Administrasi Bisnis",
    blurb:
      "Menyiapkan tenaga profesional bidang administrasi, layanan pelanggan, dan bisnis digital yang cakap berkomunikasi serta melek teknologi.",
  },
  {
    id: "akuntansi",
    name: "Akuntansi",
    blurb:
      "Membekali kemampuan pencatatan, pelaporan, audit, hingga sistem informasi keuangan berbasis aplikasi terkini.",
  },
  {
    id: "teknik-mesin",
    name: "Teknik Mesin",
    blurb:
      "Berfokus pada manufaktur, otomotif, dan pemeliharaan alat berat — sektor yang menjadi tulang punggung industri Kalimantan Selatan.",
  },
  {
    id: "teknik-elektro",
    name: "Teknik Elektro",
    blurb:
      "Mencakup kelistrikan, elektronika, otomasi, energi, hingga rekayasa perangkat lunak dan sistem informasi.",
  },
  {
    id: "teknik-sipil",
    name: "Teknik Sipil dan Kebumian",
    blurb:
      "Menangani konstruksi, geomatika, dan pertambangan dengan spesialisasi khas lahan rawa Kalimantan.",
  },
];

/**
 * @typedef {Object} Program
 * @property {string} slug     Nama berkas tanpa ekstensi (URL lama dipertahankan).
 * @property {string} name     Nama prodi tanpa jenjang.
 * @property {"D3"|"D4"} level Jenjang.
 * @property {string} dept     Id jurusan.
 * @property {string} tagline  Satu kalimat pembeda.
 * @property {string[]} focus  Fokus keilmuan.
 * @property {string[]} careers Prospek karier.
 */
export const programs = [
  // ---------------------------------------------------------------- Administrasi Bisnis
  {
    slug: "d3-administrasi-bisnis-141",
    name: "Administrasi Bisnis",
    level: "D3",
    dept: "administrasi-bisnis",
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
  {
    slug: "d4-bisnis-digital-394",
    name: "Bisnis Digital",
    level: "D4",
    dept: "administrasi-bisnis",
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

  // ---------------------------------------------------------------- Akuntansi
  {
    slug: "d3-akuntansi-891",
    name: "Akuntansi",
    level: "D3",
    dept: "akuntansi",
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
  {
    slug: "d3-sistem-informasi-850",
    name: "Sistem Informasi",
    level: "D3",
    dept: "akuntansi",
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
  {
    slug: "d3-sistem-informasi-akuntansi-387",
    name: "Sistem Informasi Akuntansi",
    level: "D3",
    dept: "akuntansi",
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
  {
    slug: "d4-akuntansi-lembaga-keuangan-syariah-594",
    name: "Akuntansi Lembaga Keuangan Syariah",
    level: "D4",
    dept: "akuntansi",
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

  // ---------------------------------------------------------------- Teknik Mesin
  {
    slug: "d3-alat-berat-455",
    name: "Alat Berat",
    level: "D3",
    dept: "teknik-mesin",
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
  {
    slug: "d3-teknik-mesin-332",
    name: "Teknik Mesin",
    level: "D3",
    dept: "teknik-mesin",
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
  {
    slug: "d4-teknologi-rekayasa-otomotif-923",
    name: "Teknologi Rekayasa Otomotif",
    level: "D4",
    dept: "teknik-mesin",
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
  {
    slug: "d4-teknologi-rekayasa-pemeliharaan-alat-berat-916",
    name: "Teknologi Rekayasa Pemeliharaan Alat Berat",
    level: "D4",
    dept: "teknik-mesin",
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

  // ---------------------------------------------------------------- Teknik Elektro
  {
    slug: "d3-elektronika-789",
    name: "Elektronika",
    level: "D3",
    dept: "teknik-elektro",
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
  {
    slug: "d3-teknik-informatika-475",
    name: "Teknik Informatika",
    level: "D3",
    dept: "teknik-elektro",
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
  {
    slug: "d3-teknik-listrik-757",
    name: "Teknik Listrik",
    level: "D3",
    dept: "teknik-elektro",
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
  {
    slug: "d4-sistem-informasi-kota-cerdas-132",
    name: "Sistem Informasi Kota Cerdas",
    level: "D4",
    dept: "teknik-elektro",
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
  {
    slug: "d4-teknologi-rekayasa-otomasi-113",
    name: "Teknologi Rekayasa Otomasi",
    level: "D4",
    dept: "teknik-elektro",
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
  {
    slug: "d4-teknologi-rekayasa-pembangkit-energi-728",
    name: "Teknologi Rekayasa Pembangkit Energi",
    level: "D4",
    dept: "teknik-elektro",
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

  // ---------------------------------------------------------------- Teknik Sipil dan Kebumian
  {
    slug: "d3-teknik-pertambangan-813",
    name: "Teknik Pertambangan",
    level: "D3",
    dept: "teknik-sipil",
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
  {
    slug: "d3-teknik-sipil-582",
    name: "Teknik Sipil",
    level: "D3",
    dept: "teknik-sipil",
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
  {
    slug: "d4-teknik-bangunan-rawa-427",
    name: "Teknik Bangunan Rawa",
    level: "D4",
    dept: "teknik-sipil",
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
  {
    slug: "d4-teknologi-rekayasa-geomatika-dan-survei-996",
    name: "Teknologi Rekayasa Geomatika dan Survei",
    level: "D4",
    dept: "teknik-sipil",
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
  {
    slug: "d4-teknologi-rekayasa-konstruksi-jalan-dan-jembatan-477",
    name: "Teknologi Rekayasa Konstruksi Jalan dan Jembatan",
    level: "D4",
    dept: "teknik-sipil",
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
];

export const accreditation = "Baik Sekali";

export const programStats = {
  total: programs.length,
  d3: programs.filter((p) => p.level === "D3").length,
  d4: programs.filter((p) => p.level === "D4").length,
  departments: departments.length,
};

export function programsByDept(deptId) {
  return programs.filter((p) => p.dept === deptId);
}

export function departmentOf(program) {
  return departments.find((d) => d.id === program.dept);
}

export function fullName(program) {
  return `${program.level} ${program.name}`;
}
