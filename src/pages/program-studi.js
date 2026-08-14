import { page } from "../components/layout.js";
import { pageHeader, programRow, emptyState, calloutPortal } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join } from "../lib/html.js";
import {
  programs,
  departments,
  programStats,
  programsSource,
} from "../data/programs.js";
import { source } from "../data/sources.js";

function heroAside() {
  return `
<dl class="grid grid-cols-3 gap-px overflow-hidden rounded-[1rem] border border-ink-200 bg-ink-200">
  <div class="bg-white px-4 py-5 text-center">
    <dd class="font-display text-2xl font-extrabold text-ink-900">${programStats.total}</dd>
    <dt class="mt-1 text-xs text-ink-500">Program studi</dt>
  </div>
  <div class="bg-white px-4 py-5 text-center">
    <dd class="font-display text-2xl font-extrabold text-ink-900">${programStats.d3}<span class="text-base text-ink-400">/</span>${programStats.d4}</dd>
    <dt class="mt-1 text-xs text-ink-500">D3 / D4 (+${programStats.d2} D2)</dt>
  </div>
  <div class="bg-white px-4 py-5 text-center">
    <dd class="font-display text-2xl font-extrabold text-ink-900">${programStats.departments}</dd>
    <dt class="mt-1 text-xs text-ink-500">Jurusan</dt>
  </div>
</dl>`;
}

function explorer() {
  return `
<section class="shell py-12 md:py-16">
  <div class="rounded-[1rem] border border-ink-200 bg-ink-50 p-5 md:p-6">
    <form data-program-filter role="search" aria-label="Cari dan saring program studi">
      <div class="grid gap-4 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-5">
          <label for="cari-prodi" class="field-label">Cari program studi</label>
          <div class="relative">
            ${icon("search", { class: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" })}
            <input id="cari-prodi" type="search" name="q" autocomplete="off"
                   placeholder="Nama prodi, bidang, atau profesi…" class="field !pl-10" data-program-search>
          </div>
          <p class="mt-1.5 text-xs text-ink-500">Contoh: “otomasi”, “akuntansi”, atau “surveyor”.</p>
        </div>

        <div class="lg:col-span-3">
          <label for="filter-jurusan" class="field-label">Jurusan</label>
          <select id="filter-jurusan" class="field" data-program-dept>
            <option value="">Semua jurusan</option>
            ${join(
              departments.map((d) => `<option value="${d.id}">${esc(d.name)}</option>`),
            )}
          </select>
        </div>

        <div class="lg:col-span-4">
          <span class="field-label" id="label-jenjang">Jenjang</span>
          <div class="flex gap-2" role="group" aria-labelledby="label-jenjang">
            <button type="button" class="chip h-11 flex-1 justify-center" aria-pressed="true" data-program-level value="">Semua</button>
            <button type="button" class="chip h-11 flex-1 justify-center" aria-pressed="false" data-program-level value="D2">D2</button>
            <button type="button" class="chip h-11 flex-1 justify-center" aria-pressed="false" data-program-level value="D3">D3</button>
            <button type="button" class="chip h-11 flex-1 justify-center" aria-pressed="false" data-program-level value="D4">D4</button>
          </div>
        </div>
      </div>
    </form>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-4">
      <p class="text-sm text-ink-600" role="status" data-program-count>
        Menampilkan ${programs.length} dari ${programs.length} program studi.
      </p>
      <button type="button" class="btn btn-ghost btn-sm hidden" data-program-reset>
        ${icon("close", { class: "h-4 w-4" })} Atur ulang filter
      </button>
    </div>
  </div>

  <div class="mt-8 space-y-12" data-program-groups>
    ${join(
      departments.map((dept) => {
        const list = programs.filter((p) => p.dept === dept.id);
        return `
    <section data-dept-group="${dept.id}" aria-labelledby="jurusan-${dept.id}">
      <div class="flex flex-col gap-3 border-b border-ink-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="max-w-2xl">
          <h2 id="jurusan-${dept.id}" class="font-display text-xl font-extrabold text-ink-900">Jurusan ${esc(dept.name)}</h2>
          <p class="mt-1.5 text-sm leading-relaxed text-ink-600">${esc(dept.blurb)}</p>
        </div>
        <span class="shrink-0 text-sm text-ink-500" data-dept-count="${dept.id}">${list.length} prodi</span>
      </div>
      <ul class="mt-2">
        ${join(list.map((p) => programRow(p)))}
      </ul>
    </section>`;
      }),
    )}
  </div>

  <div class="mt-8 hidden" data-program-empty>
    ${emptyState({
      title: "Program studi tidak ditemukan",
      body: "Coba kata kunci yang lebih umum, ubah pilihan jurusan, atau atur ulang filter.",
    })}
  </div>
</section>`;
}

export default function render() {
  return page({
    title: "Program Studi",
    canonical: "program-studi.html",
    active: "program-studi.html",
    description:
      "Telusuri 22 program studi D2, D3, dan Sarjana Terapan Politeknik Negeri Banjarmasin dalam lima jurusan, lengkap dengan akreditasi resmi dan prospek karier.",
    body: join([
      pageHeader({
        eyebrow: "Akademik",
        title: "Telusuri program studi Poliban",
        lead: `Data ${programStats.total} program studi bersumber dari <a href="${programsSource.url}" rel="noopener">portal SPMB resmi Poliban</a>, diperiksa ${programsSource.fetchedAt}. Gunakan pencarian dan filter untuk menemukan prodi sesuai minat maupun profesi yang dituju.`,
        crumbs: [{ label: "Beranda", href: "index.html" }, { label: "Program Studi" }],
        aside: heroAside(),
      }),
      explorer(),
      `<div class="shell pb-20 space-y-6">
        <p class="rounded-lg border border-ink-200 bg-ink-50 px-4 py-3 text-sm text-ink-600">
          Nama, jenjang, dan peringkat akreditasi mengikuti
          <a href="${programsSource.url}" rel="noopener" class="font-medium text-brand-700 underline underline-offset-2">${esc(source(programsSource.sourceId).label)}</a>
          (diperiksa ${programsSource.fetchedAt}). Satu program studi belum mencantumkan peringkat akreditasi pada sumber resmi
          dan ditandai apa adanya. Laman resmi Poliban lain menyebut jumlah prodi yang berbeda (20 dan 21);
          portal SPMB dipakai karena merinci setiap prodi beserta akreditasinya —
          <a href="sumber.html#catatan" class="font-medium text-brand-700 underline underline-offset-2">lihat catatan perbedaan</a>.
        </p>
        ${calloutPortal()}
      </div>`,
    ]),
  });
}
