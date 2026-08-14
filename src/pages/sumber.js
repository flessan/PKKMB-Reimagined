import { page } from "../components/layout.js";
import { pageHeader, sectionHeading } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join, formatDate } from "../lib/html.js";
import { sources } from "../data/sources.js";
import { assets } from "../data/assets.js";
import { programsSource } from "../data/programs.js";

const STATUS = {
  official: { label: "Sumber resmi", tone: "badge-brand" },
  press: { label: "Kantor berita", tone: "badge-accent" },
  commons: { label: "Media berlisensi bebas", tone: "badge-neutral" },
};

/** Fakta kunci beserta sumbernya, agar dapat ditelusuri pembaca. */
const facts = [
  {
    claim: "Tema PKKMB 2026: “Bersinergi, Berinovasi, dan Berdampak Bersama Poliban”",
    sourceId: "pkkmb-tatib",
  },
  {
    claim: "Kegiatan utama PKKMB berlangsung 4–6 Agustus 2026",
    sourceId: "poliban-pkkmb-2026",
    also: "antara-pkkmb-2026",
  },
  {
    claim: "Pra-PKKMB dilaksanakan pada 3 Agustus 2026",
    sourceId: "pkkmb-twibbon",
  },
  {
    claim: "Diikuti 1.817 mahasiswa baru tahun akademik 2026/2027",
    sourceId: "poliban-pkkmb-2026",
    also: "antara-pkkmb-2026",
  },
  {
    claim: "Poliban memiliki lima jurusan",
    sourceId: "poliban-pkkmb-2026",
  },
  {
    claim: "22 program studi terdaftar pada portal SPMB (D2, D3, dan Sarjana Terapan)",
    sourceId: "pmb-prodi",
  },
  {
    claim: "Direktur Poliban: Joni Riadi, S.ST., M.T.",
    sourceId: "poliban-direksi",
  },
  {
    claim:
      "Sertifikat PKKMB menjadi syarat mengikuti UAS serta kelulusan/wisuda",
    sourceId: "pkkmb-tatib",
  },
  {
    claim:
      "Poliban mandiri sejak SK Mendikbud Nomor 080/O/1997 tanggal 28 April 1997",
    sourceId: "poliban-sejarah",
  },
  {
    claim: "Alamat: Jl. Brigjen H. Hasan Basri, Kayu Tangi, Banjarmasin 70123",
    sourceId: "poliban-home",
  },
];

/** Hal yang sengaja tidak ditampilkan karena tidak dapat diverifikasi. */
const unverified = [
  {
    item: "Jumlah mahasiswa aktif (4.617) dan dosen/tenaga kependidikan (205)",
    reason:
      "Angka ini muncul pada salinan situs lama, namun tidak ditemukan pada sumber resmi mana pun. Dihapus dari halaman statistik.",
  },
  {
    item: "Peringkat akreditasi institusi",
    reason:
      "Sumber sekunder menyebut peringkat berbeda-beda dan tidak ada pengumuman resmi yang dapat dirujuk. Tidak ditampilkan.",
  },
  {
    item: "Rincian jam per sesi PKKMB dan nama pemateri",
    reason:
      "Rundown resmi hanya tersedia sebagai lampiran PDF. Halaman jadwal menampilkan struktur harian dan menautkan dokumen aslinya.",
  },
  {
    item: "Susunan panitia PKKMB 2026",
    reason: "Belum dipublikasikan pada kanal resmi mana pun.",
  },
  {
    item: "Peringkat akreditasi untuk tiga program studi baru",
    reason:
      "Portal SPMB belum mencantumkan nilainya. Kartu prodi menampilkan keterangan “belum tercantum”, bukan menebak nilai.",
  },
];

function sourceList() {
  const entries = Object.entries(sources);
  return `
<section class="shell py-14 md:py-20" id="daftar-sumber">
  ${sectionHeading({
    eyebrow: "Rujukan",
    title: "Sumber yang dikonsultasikan",
    lead: "Seluruh informasi faktual pada situs ini berasal dari kanal berikut. Tanggal periksa menunjukkan kapan halaman terakhir diverifikasi.",
  })}

  <ul class="mt-9 space-y-3">
    ${join(
      entries.map(
        ([id, s]) => `
    <li class="card p-5" id="sumber-${id}">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="min-w-0">
          <span class="badge ${STATUS[s.status].tone}">${STATUS[s.status].label}</span>
          <h3 class="mt-2 font-display text-base font-bold text-ink-900">${esc(s.label)}</h3>
          <p class="mt-1 text-sm text-ink-600">${esc(s.publisher)}</p>
          <a href="${s.url}" rel="noopener" class="mt-2 inline-flex items-center gap-1.5 break-all text-sm text-brand-700 underline underline-offset-2 hover:text-brand-800">
            ${esc(s.url)}${icon("arrowUpRight", { class: "h-3.5 w-3.5 shrink-0" })}
          </a>
          ${s.license ? `<p class="mt-2 text-xs text-ink-500">Lisensi: ${esc(s.license)}</p>` : ""}
          ${s.author ? `<p class="mt-1 text-xs text-ink-500">Pembuat: ${esc(s.author)}</p>` : ""}
          ${s.note ? `<p class="mt-2 text-xs italic text-ink-500">${esc(s.note)}</p>` : ""}
        </div>
        <dl class="shrink-0 text-right text-xs text-ink-500">
          ${s.published ? `<dt class="sr-only">Terbit</dt><dd>Terbit ${formatDate(s.published)}</dd>` : ""}
          <dt class="sr-only">Diperiksa</dt><dd>Diperiksa ${formatDate(s.checked)}</dd>
        </dl>
      </div>
    </li>`,
      ),
    )}
  </ul>
</section>`;
}

function factList() {
  return `
<section class="border-y border-ink-200 bg-ink-50 py-14 md:py-20" id="fakta">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Verifikasi",
      title: "Fakta kunci dan rujukannya",
      lead: "Klaim yang paling sering dikutip beserta sumber tempat kami memverifikasinya.",
    })}

    <div class="mt-9 overflow-hidden rounded-[1rem] border border-ink-200 bg-white">
      <ul class="divide-y divide-ink-200">
        ${join(
          facts.map(
            (f) => `
        <li class="grid gap-2 px-5 py-4 sm:grid-cols-12 sm:items-baseline">
          <span class="sm:col-span-7 text-sm text-ink-800">${esc(f.claim)}</span>
          <span class="sm:col-span-5 text-xs text-ink-500">
            <a href="#sumber-${f.sourceId}" class="text-brand-700 underline underline-offset-2">${esc(sources[f.sourceId].label)}</a>
            ${f.also ? ` · <a href="#sumber-${f.also}" class="text-brand-700 underline underline-offset-2">${esc(sources[f.also].publisher)}</a>` : ""}
          </span>
        </li>`,
          ),
        )}
      </ul>
    </div>
  </div>
</section>`;
}

function assetList() {
  return `
<section class="shell py-14 md:py-20" id="aset">
  ${sectionHeading({
    eyebrow: "Aset visual",
    title: "Gambar yang digunakan",
    lead: "Semua berkas disimpan lokal — tidak ada hotlink ke server pihak ketiga. Tidak ada citra hasil pembuatan AI pada situs ini.",
  })}

  <div class="mt-9 grid gap-4 sm:grid-cols-2">
    ${join(
      Object.entries(assets).map(
        ([id, a]) => `
    <article class="card p-5">
      <div class="flex items-start gap-4">
        <img src="${a.file}" alt="" width="72" height="72" loading="lazy" decoding="async"
             class="h-16 w-16 shrink-0 rounded-lg border border-ink-200 object-contain p-1">
        <div class="min-w-0">
          <h3 class="font-display text-sm font-bold text-ink-900">${esc(id)}</h3>
          <p class="mt-1 text-xs leading-relaxed text-ink-600">${esc(a.note)}</p>
        </div>
      </div>
      <dl class="mt-4 space-y-1.5 border-t border-ink-200 pt-3 text-xs">
        <div class="flex gap-2">
          <dt class="shrink-0 text-ink-500">Pemilik</dt>
          <dd class="text-ink-800">${esc(a.owner)}</dd>
        </div>
        ${
          a.license
            ? `<div class="flex gap-2"><dt class="shrink-0 text-ink-500">Lisensi</dt><dd class="text-ink-800">${esc(a.license)}</dd></div>`
            : ""
        }
        ${
          a.attribution
            ? `<div class="flex gap-2"><dt class="shrink-0 text-ink-500">Atribusi</dt><dd class="text-ink-800">${esc(a.attribution)}</dd></div>`
            : ""
        }
        <div class="flex gap-2">
          <dt class="shrink-0 text-ink-500">Asal</dt>
          <dd class="min-w-0"><a href="${a.origin}" rel="noopener" class="break-all text-brand-700 underline underline-offset-2">${esc(a.origin)}</a></dd>
        </div>
      </dl>
    </article>`,
      ),
    )}
  </div>
</section>`;
}

function gaps() {
  return `
<section class="border-t border-ink-200 bg-ink-50 py-14 md:py-20" id="belum-terverifikasi">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Keterbukaan",
      title: "Yang belum dapat kami verifikasi",
      lead: "Informasi berikut sengaja tidak ditampilkan sebagai fakta. Kami memilih menghilangkannya daripada menampilkan angka yang tidak dapat dipertanggungjawabkan.",
    })}

    <div class="mt-9 space-y-3">
      ${join(
        unverified.map(
          (u) => `
      <div class="card flex-row items-start gap-4 p-5">
        ${icon("info", { class: "mt-0.5 h-5 w-5 shrink-0 text-accent-600" })}
        <div>
          <h3 class="font-display text-sm font-bold text-ink-900">${esc(u.item)}</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-ink-600">${esc(u.reason)}</p>
        </div>
      </div>`,
        ),
      )}
    </div>

    <div class="mt-8 rounded-[1rem] border border-brand-200 bg-brand-50 p-6">
      <h3 class="inline-flex items-center gap-2 font-display text-base font-bold text-brand-800">
        ${icon("support", { class: "h-5 w-5" })} Ada koreksi?
      </h3>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">
        Bila terdapat data yang keliru atau sudah berubah, panitia PKKMB dan Humas Poliban dapat
        menyampaikan koreksi melalui halaman kontak. Data program studi juga dapat disegarkan
        otomatis dari portal SPMB dengan menjalankan <code class="rounded bg-white px-1.5 py-0.5 text-xs">npm run refresh:prodi</code>.
      </p>
      <a href="kontak.html" class="btn btn-primary btn-sm mt-4">Sampaikan koreksi</a>
    </div>
  </div>
</section>`;
}

export default function render() {
  return page({
    title: "Sumber & Rujukan",
    canonical: "sumber.html",
    active: "sumber.html",
    description:
      "Daftar sumber resmi yang menjadi rujukan informasi PKKMB 2026 Politeknik Negeri Banjarmasin, status verifikasi setiap fakta, serta atribusi aset visual.",
    body: join([
      pageHeader({
        eyebrow: "Transparansi",
        title: "Sumber, verifikasi, dan atribusi",
        lead: `Halaman ini mencatat dari mana setiap informasi berasal. Data program studi terakhir disegarkan ${programsSource.fetchedAt} dari portal SPMB resmi.`,
        crumbs: [{ label: "Beranda", href: "index.html" }, { label: "Sumber" }],
      }),
      factList(),
      sourceList(),
      assetList(),
      gaps(),
    ]),
  });
}
