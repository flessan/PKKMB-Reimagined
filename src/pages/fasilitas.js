import { page } from "../components/layout.js";
import { pageHeader, sectionHeading, calloutPortal } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join } from "../lib/html.js";
import { facilities } from "../data/campus.js";

function featured() {
  const list = facilities.filter((f) => f.featured);
  return `
<section class="shell py-14 md:py-20">
  ${sectionHeading({
    eyebrow: "Sarana utama",
    title: "Unit yang paling sering Anda gunakan",
    lead: "Ketiganya berperan langsung dalam rangkaian PKKMB maupun perkuliahan sehari-hari.",
  })}

  <div class="mt-10 space-y-4">
    ${join(
      list.map(
        (f, i) => `
    <article id="${f.id}" class="card scroll-mt-28 p-6 md:p-8" data-reveal>
      <div class="grid gap-6 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <span class="font-display text-sm font-bold text-brand-400">0${i + 1}</span>
          <h3 class="mt-2 font-display text-2xl font-extrabold leading-tight text-ink-900">${esc(f.name)}</h3>
          <span class="badge badge-brand mt-3">${esc(f.kind)}</span>
        </div>
        <div class="lg:col-span-8">
          <p class="text-lg leading-relaxed text-ink-700">${esc(f.summary)}</p>
          ${f.detail ? `<p class="mt-3 leading-relaxed text-ink-600">${esc(f.detail)}</p>` : ""}
          <ul class="mt-5 flex flex-wrap gap-2">
            ${join(
              f.facts.map(
                (fact) =>
                  `<li class="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-xs font-medium text-ink-600">${icon("check", { class: "h-3.5 w-3.5 text-brand-600" })}${esc(fact)}</li>`,
              ),
            )}
          </ul>
          ${
            f.href
              ? `<a href="${f.href}" rel="noopener" class="btn btn-secondary btn-sm mt-5">Buka layanan${icon("arrowUpRight", { class: "h-4 w-4" })}</a>`
              : ""
          }
        </div>
      </div>
    </article>`,
      ),
    )}
  </div>
</section>`;
}

function others() {
  const list = facilities.filter((f) => !f.featured);
  return `
<section class="border-t border-ink-200 bg-ink-50 py-16 md:py-20">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Sarana penunjang",
      title: "Fasilitas lain di lingkungan kampus",
      lead: "Tersebar di seluruh area kampus dan dapat diakses peserta selama kegiatan berlangsung.",
    })}

    <dl class="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
      ${join(
        list.map(
          (f) => `
      <div id="${f.id}" class="scroll-mt-28 border-t-2 border-ink-900 pt-4">
        <dt>
          <span class="font-display text-[0.7rem] font-bold uppercase tracking-wider text-brand-600">${esc(f.kind)}</span>
          <span class="mt-1 block font-display text-lg font-bold text-ink-900">${esc(f.name)}</span>
        </dt>
        <dd class="mt-2 text-sm leading-relaxed text-ink-600">${esc(f.summary)}</dd>
        <dd class="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-500">
          ${join(f.facts.map((x) => `<span>${esc(x)}</span>`), '<span aria-hidden="true">·</span>')}
        </dd>
        ${
          f.href
            ? `<dd class="mt-2"><a href="${f.href}" rel="noopener" class="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800">Buka${icon("arrowUpRight", { class: "h-3 w-3" })}</a></dd>`
            : ""
        }
      </div>`,
        ),
      )}
    </dl>
  </div>
</section>`;
}

export default function render() {
  return page({
    title: "Fasilitas Kampus",
    canonical: "fasilitas.html",
    active: "fasilitas.html",
    description:
      "Fasilitas Politeknik Negeri Banjarmasin: perpustakaan pusat, UPA TIK, gedung olahraga, bengkel praktikum, aula, dan layanan mahasiswa.",
    body: join([
      pageHeader({
        eyebrow: "Sarana & prasarana",
        title: "Fasilitas yang menopang belajar Anda",
        lead: "Unit penunjang akademik, laboratorium, dan layanan digital Poliban yang mendukung pembelajaran vokasi sejak hari pertama PKKMB.",
        crumbs: [{ label: "Beranda", href: "index.html" }, { label: "Fasilitas" }],
      }),
      featured(),
      others(),
      `<div class="shell py-20">${calloutPortal()}</div>`,
    ]),
  });
}
