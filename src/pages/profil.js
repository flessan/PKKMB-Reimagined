import { page } from "../components/layout.js";
import { pageHeader, sectionHeading, statBlock, calloutPortal } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join } from "../lib/html.js";
import { assets } from "../data/assets.js";
import {
  vision,
  missions,
  objectives,
  history,
  leader,
  governance,
  leadership,
  stats,
} from "../data/campus.js";

function jumpNav() {
  const items = [
    { href: "#sambutan", label: "Sambutan Direktur" },
    { href: "#visi-misi", label: "Visi & Misi" },
    { href: "#sejarah", label: "Sejarah" },
    { href: "#struktur", label: "Tata Kelola" },
  ];
  return `
<nav class="rounded-[1rem] border border-ink-200 bg-white p-5" aria-label="Bagian halaman profil">
  <h2 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Isi halaman</h2>
  <ul class="mt-4 space-y-1">
    ${join(
      items.map(
        (i, n) => `
    <li>
      <a href="${i.href}" class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-brand-700">
        <span class="font-display text-xs text-ink-400">0${n + 1}</span>
        <span class="flex-1">${esc(i.label)}</span>
        ${icon("chevronRight", { class: "h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-0.5" })}
      </a>
    </li>`,
      ),
    )}
  </ul>
</nav>`;
}

function speech() {
  return `
<section class="shell py-16 md:py-20" id="sambutan">
  <div class="grid gap-10 lg:grid-cols-12">
    <figure class="lg:col-span-4">
      <div class="sticky top-24">
        <div class="overflow-hidden rounded-[1rem] border border-ink-200">
          <img src="${leader.photo}" alt="Potret ${esc(leader.name)}" width="459" height="667" loading="lazy" decoding="async"
               class="aspect-[3/4] w-full object-cover object-top">
        </div>
        <figcaption class="mt-4">
          <p class="font-display text-base font-bold text-ink-900">${esc(leader.name)}</p>
          <p class="mt-0.5 text-sm text-ink-500">${esc(leader.role)}</p>
        </figcaption>
      </div>
    </figure>

    <div class="lg:col-span-8">
      <p class="eyebrow">Sambutan</p>
      <h2 class="mt-3 font-display text-2xl font-extrabold leading-tight text-ink-900 md:text-[2rem]">
        “${esc(leader.quote)}”
      </h2>

      <div class="prose-editorial mt-6 max-w-2xl">
        ${join(leader.speech.map((p) => `<p>${esc(p)}</p>`))}
        <p>Tema ini bukan sekadar slogan, melainkan komitmen yang kita jalani bersama selama masa studi:</p>
      </div>

      <div class="mt-8 space-y-4">
        ${join(
          leader.themePillars.map(
            (p, i) => `
        <article class="card p-5 md:p-6" data-reveal>
          <div class="flex items-baseline gap-3">
            <span class="font-display text-sm font-bold text-brand-400">0${i + 1}</span>
            <h3 class="font-display text-lg font-bold text-ink-900">${esc(p.key)}</h3>
          </div>
          <p class="mt-2.5 leading-relaxed text-ink-600">${esc(p.body)}</p>
        </article>`,
          ),
        )}
      </div>
    </div>
  </div>
</section>`;
}

function visionMission() {
  return `
<section class="border-y border-ink-200 bg-ink-50 py-16 md:py-20" id="visi-misi">
  <div class="shell">
    ${sectionHeading({ eyebrow: "Arah institusi", title: "Visi, misi, dan tujuan" })}

    <figure class="mt-9 rounded-[1rem] border border-brand-200 bg-white p-7 md:p-10">
      <p class="eyebrow">Visi</p>
      <blockquote class="mt-3">
        <p class="font-display text-xl font-extrabold leading-snug text-ink-900 md:text-[1.75rem]">“${esc(vision)}”</p>
      </blockquote>
    </figure>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <div class="card p-6 md:p-7">
        <h3 class="inline-flex items-center gap-2 font-display text-lg font-bold text-ink-900">
          ${icon("route", { class: "h-5 w-5 text-brand-600" })} Misi
        </h3>
        <ol class="mt-5 space-y-4">
          ${join(
            missions.map(
              (m, i) => `
          <li class="flex gap-3.5">
            <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 font-display text-xs font-bold text-brand-700">${i + 1}</span>
            <span class="text-sm leading-relaxed text-ink-600">${esc(m)}</span>
          </li>`,
            ),
          )}
        </ol>
      </div>

      <div class="card p-6 md:p-7">
        <h3 class="inline-flex items-center gap-2 font-display text-lg font-bold text-ink-900">
          ${icon("target", { class: "h-5 w-5 text-brand-600" })} Tujuan
        </h3>
        <ol class="mt-5 space-y-4">
          ${join(
            objectives.map(
              (m, i) => `
          <li class="flex gap-3.5">
            <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-100 font-display text-xs font-bold text-accent-600">${i + 1}</span>
            <span class="text-sm leading-relaxed text-ink-600">${esc(m)}</span>
          </li>`,
            ),
          )}
        </ol>
      </div>
    </div>
  </div>
</section>`;
}

function historySection() {
  return `
<section class="shell py-16 md:py-20" id="sejarah">
  <div class="grid gap-10 lg:grid-cols-12">
    <div class="lg:col-span-5">
      ${sectionHeading({ eyebrow: "Sejarah", title: "Berakar pada politeknik pertama di Indonesia" })}
      <p class="mt-5 text-lg leading-relaxed text-ink-600">${esc(history.lead)}</p>
      <div class="prose-editorial mt-6 text-base">
        ${join(history.paragraphs.map((p) => `<p>${esc(p)}</p>`))}
      </div>
    </div>

    <div class="lg:col-span-7">
      <div class="overflow-hidden rounded-[1rem] border border-ink-200">
        <picture>
          <source srcset="${assets.campusGate.webp}" type="image/webp">
          <img src="${assets.campusGate.file}" alt="${esc(assets.campusGate.alt)}"
               width="${assets.campusGate.width}" height="${assets.campusGate.height}"
               loading="lazy" decoding="async" class="aspect-[4/3] w-full object-cover">
        </picture>
      </div>
      <p class="mt-2 text-xs text-ink-500">${esc(assets.campusGate.attribution)} \u00b7 <a href="${assets.campusGate.origin}" rel="noopener" class="underline underline-offset-2 hover:text-brand-700">lisensi Attribution</a></p>

      <ol class="relative mt-8 space-y-4 pl-10">
        <div class="timeline-rail" aria-hidden="true"></div>
        ${join(
          history.milestones.map(
            (m) => `
        <li class="relative" data-reveal>
          <span class="absolute -left-10 top-3 grid h-8 w-8 place-items-center rounded-full border-2 border-brand-600 bg-white font-display text-[0.6rem] font-bold text-brand-700">${m.year.slice(2)}</span>
          <article class="card p-4">
            <p class="font-display text-xs font-bold uppercase tracking-wider text-brand-600">${esc(m.year)}</p>
            <h3 class="mt-1 font-display text-base font-bold text-ink-900">${esc(m.title)}</h3>
            <p class="mt-1.5 text-sm leading-relaxed text-ink-600">${esc(m.body)}</p>
          </article>
        </li>`,
          ),
        )}
      </ol>
    </div>
  </div>
</section>`;
}

function governanceSection() {
  return `
<section class="border-y border-ink-200 bg-ink-50 py-16 md:py-20" id="struktur">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Tata kelola",
      title: "Struktur organisasi Poliban",
      lead: esc(governance.lead),
    })}

    <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${join(
        governance.units.map(
          (u, i) => `
      <article class="card p-5 ${i === 0 ? "border-brand-300 bg-brand-50/60 sm:col-span-2 lg:col-span-1" : ""}" data-reveal>
        <h3 class="font-display text-base font-bold text-ink-900">${esc(u.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed text-ink-600">${esc(u.body)}</p>
      </article>`,
        ),
      )}
    </div>

    <div class="mt-10 overflow-hidden rounded-[1rem] border border-ink-200 bg-white">
      <h3 class="border-b border-ink-200 px-5 py-3.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Jajaran pimpinan</h3>
      <ul class="divide-y divide-ink-200">
        ${join(
          leadership.map(
            (l) => `
        <li class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3.5">
          <span class="font-display text-sm font-semibold text-ink-900">${esc(l.name)}</span>
          <span class="text-sm text-ink-600">${esc(l.role)} \u2014 ${esc(l.scope)}</span>
        </li>`,
          ),
        )}
      </ul>
    </div>

    <div class="mt-6">${statBlock(stats)}</div>
  </div>
</section>`;
}

export default function render() {
  return page({
    title: "Profil Poliban",
    canonical: "profil.html",
    active: "profil.html",
    description:
      "Profil Politeknik Negeri Banjarmasin: sambutan Direktur, visi dan misi, sejarah, serta struktur tata kelola institusi.",
    body: join([
      pageHeader({
        eyebrow: "Tentang kampus",
        title: "Profil Politeknik Negeri Banjarmasin",
        lead: "Kampus vokasi kebanggaan Banua — menyelenggarakan pendidikan terapan yang dekat dengan dunia industri sejak generasi pertama politeknik di Indonesia.",
        crumbs: [{ label: "Beranda", href: "index.html" }, { label: "Profil" }],
        aside: jumpNav(),
      }),
      speech(),
      visionMission(),
      historySection(),
      governanceSection(),
      `<div class="shell py-20">${calloutPortal()}</div>`,
    ]),
  });
}
