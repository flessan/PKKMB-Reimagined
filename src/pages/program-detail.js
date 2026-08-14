import { page } from "../components/layout.js";
import { breadcrumb, programCard, calloutPortal } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join } from "../lib/html.js";
import { programs, departmentOf, fullName, accreditation } from "../data/programs.js";
import { site } from "../data/site.js";

/** @param {import('../data/programs.js').programs[number]} program */
export default function render(program) {
  const depth = 1;
  const dept = departmentOf(program);
  const siblings = programs.filter((p) => p.dept === program.dept && p.slug !== program.slug);
  const semesters = program.level === "D4" ? 8 : 6;
  const credits = program.level === "D4" ? "144 – 150 SKS" : "108 – 120 SKS";
  const degree = program.level === "D4" ? "Sarjana Terapan (S.Tr.)" : "Ahli Madya (A.Md.)";

  return page({
    depth,
    title: fullName(program),
    canonical: `program-studi/${program.slug}.html`,
    active: "program-studi.html",
    description: `${fullName(program)} Politeknik Negeri Banjarmasin — ${program.tagline}`,
    body: join([
      `<header class="border-b border-ink-200 bg-ink-50">
  <div class="shell py-10 md:py-14">
    ${breadcrumb(
      [
        { label: "Beranda", href: "index.html" },
        { label: "Program Studi", href: "program-studi.html" },
        { label: fullName(program) },
      ],
      depth,
    )}

    <div class="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-7">
        <div class="flex flex-wrap items-center gap-2">
          <span class="badge ${program.level === "D4" ? "badge-accent" : "badge-brand"}">${program.level}</span>
          <span class="badge badge-neutral">Akreditasi ${esc(accreditation)}</span>
        </div>
        <h1 class="mt-4 font-display text-3xl font-extrabold leading-[1.12] text-ink-900 md:text-[2.5rem]">${esc(program.name)}</h1>
        <p class="mt-2 font-display text-sm font-semibold text-brand-700">Jurusan ${esc(dept.name)}</p>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">${esc(program.tagline)}</p>
      </div>

      <div class="lg:col-span-5">
        <dl class="grid grid-cols-3 gap-px overflow-hidden rounded-[1rem] border border-ink-200 bg-ink-200">
          <div class="bg-white px-3 py-5 text-center">
            <dd class="font-display text-xl font-extrabold text-ink-900">${semesters}</dd>
            <dt class="mt-1 text-xs text-ink-500">Semester</dt>
          </div>
          <div class="bg-white px-3 py-5 text-center">
            <dd class="font-display text-xl font-extrabold text-ink-900">${program.level}</dd>
            <dt class="mt-1 text-xs text-ink-500">Jenjang</dt>
          </div>
          <div class="bg-white px-3 py-5 text-center">
            <dd class="font-display text-xl font-extrabold text-ink-900">${credits.split(" ")[0]}<span class="text-sm">+</span></dd>
            <dt class="mt-1 text-xs text-ink-500">Beban SKS</dt>
          </div>
        </dl>
      </div>
    </div>
  </div>
</header>

<div class="shell py-12 md:py-16">
  <div class="grid gap-10 lg:grid-cols-12">
    <div class="space-y-12 lg:col-span-8">

      <section aria-labelledby="fokus">
        <h2 id="fokus" class="font-display text-xl font-extrabold text-ink-900">Fokus keilmuan</h2>
        <p class="mt-2 max-w-2xl leading-relaxed text-ink-600">
          Pembelajaran menekankan praktik di laboratorium dan bengkel, ditopang proyek terapan
          serta magang industri pada semester akhir.
        </p>
        <ul class="mt-5 grid gap-3 sm:grid-cols-2">
          ${join(
            program.focus.map(
              (f) => `
          <li class="card flex-row items-start gap-3 p-4">
            ${icon("check", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}
            <span class="text-sm leading-relaxed text-ink-700">${esc(f)}</span>
          </li>`,
            ),
          )}
        </ul>
      </section>

      <section aria-labelledby="karir">
        <h2 id="karir" class="font-display text-xl font-extrabold text-ink-900">Prospek karier lulusan</h2>
        <p class="mt-2 max-w-2xl leading-relaxed text-ink-600">
          Lulusan bergelar <strong>${esc(degree)}</strong> dan disiapkan untuk langsung memasuki dunia kerja
          maupun berwirausaha secara mandiri.
        </p>
        <ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
          ${join(
            program.careers.map(
              (c) => `
          <li class="flex items-center gap-2.5 rounded-lg border border-ink-200 px-4 py-3">
            ${icon("target", { class: "h-4 w-4 shrink-0 text-brand-600" })}
            <span class="text-sm font-medium text-ink-800">${esc(c)}</span>
          </li>`,
            ),
          )}
        </ul>
      </section>

      <section aria-labelledby="kurikulum">
        <h2 id="kurikulum" class="font-display text-xl font-extrabold text-ink-900">Kurikulum & masa studi</h2>
        <div class="mt-5 overflow-hidden rounded-[1rem] border border-ink-200">
          <dl class="divide-y divide-ink-200 text-sm">
            <div class="flex flex-wrap justify-between gap-2 px-5 py-3.5">
              <dt class="text-ink-500">Gelar lulusan</dt><dd class="font-medium text-ink-900">${esc(degree)}</dd>
            </div>
            <div class="flex flex-wrap justify-between gap-2 px-5 py-3.5">
              <dt class="text-ink-500">Masa studi normal</dt><dd class="font-medium text-ink-900">${semesters} semester (${semesters / 2} tahun)</dd>
            </div>
            <div class="flex flex-wrap justify-between gap-2 px-5 py-3.5">
              <dt class="text-ink-500">Beban studi</dt><dd class="font-medium text-ink-900">${esc(credits)}</dd>
            </div>
            <div class="flex flex-wrap justify-between gap-2 px-5 py-3.5">
              <dt class="text-ink-500">Komposisi</dt><dd class="font-medium text-ink-900">Dominan praktik (± 60%)</dd>
            </div>
            <div class="flex flex-wrap justify-between gap-2 px-5 py-3.5">
              <dt class="text-ink-500">Akreditasi</dt><dd class="font-medium text-ink-900">${esc(accreditation)}</dd>
            </div>
          </dl>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-ink-600">
          Mata kuliah mencakup teori dasar, praktikum laboratorium, proyek terapan, magang industri,
          serta tugas akhir. Informasi kurikulum rinci disampaikan pada sesi jurusan saat PKKMB.
        </p>
      </section>
    </div>

    <aside class="lg:col-span-4">
      <div class="sticky top-24 space-y-4">
        ${calloutPortal({ depth, variant: "compact" })}

        <div class="rounded-[1rem] border border-ink-200 p-5">
          <h2 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Tentang jurusan</h2>
          <p class="mt-3 font-display text-base font-bold text-ink-900">${esc(dept.name)}</p>
          <p class="mt-2 text-sm leading-relaxed text-ink-600">${esc(dept.blurb)}</p>
          <a href="../program-studi.html#jurusan-${dept.id}" class="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold text-brand-700 hover:text-brand-800">
            Lihat semua prodi jurusan ini ${icon("arrowRight", { class: "h-3.5 w-3.5" })}
          </a>
        </div>

        <div class="rounded-[1rem] border border-ink-200 p-5">
          <h2 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Butuh informasi lain?</h2>
          <ul class="mt-3 space-y-2.5 text-sm">
            <li><a href="../pkkmb.html" class="inline-flex items-center gap-1.5 text-ink-700 hover:text-brand-700">${icon("route", { class: "h-4 w-4 text-ink-400" })}Panduan peserta PKKMB</a></li>
            <li><a href="../fasilitas.html" class="inline-flex items-center gap-1.5 text-ink-700 hover:text-brand-700">${icon("layers", { class: "h-4 w-4 text-ink-400" })}Fasilitas kampus</a></li>
            <li><a href="../kontak.html" class="inline-flex items-center gap-1.5 text-ink-700 hover:text-brand-700">${icon("support", { class: "h-4 w-4 text-ink-400" })}Hubungi panitia</a></li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</div>`,

      siblings.length
        ? `<section class="border-t border-ink-200 bg-ink-50 py-14">
  <div class="shell">
    <h2 class="font-display text-xl font-extrabold text-ink-900">Program studi lain di jurusan ${esc(dept.name)}</h2>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      ${join(siblings.slice(0, 4).map((p) => programCard(p, { depth })))}
    </div>
  </div>
</section>`
        : "",
    ]),
    head: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      name: fullName(program),
      programType: program.level === "D4" ? "Sarjana Terapan" : "Diploma Tiga",
      educationalCredentialAwarded: degree,
      timeToComplete: program.level === "D4" ? "P4Y" : "P3Y",
      description: program.tagline,
      provider: { "@type": "CollegeOrUniversity", name: site.institution, url: site.url },
      occupationalCategory: program.careers,
    })}</script>`,
  });
}
