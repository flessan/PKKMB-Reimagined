import { icon } from "../lib/icons.js";
import {
  esc,
  join,
  rel,
  cls,
  formatDate,
  formatDateShort,
  dayOf,
  monthShort,
} from "../lib/html.js";
import { categories } from "../data/posts.js";
import { fullName, departmentOf, levelInfo } from "../data/programs.js";

/* ------------------------------------------------------------------ *
 * Kepala halaman bagian dalam
 * ------------------------------------------------------------------ */

export function pageHeader({ eyebrow, title, lead, depth = 0, crumbs = [], aside = "" }) {
  return `
<section class="relative overflow-hidden border-b border-ink-200 bg-ink-50">
  <div class="shell py-10 md:py-14">
    ${crumbs.length ? breadcrumb(crumbs, depth) : ""}
    <div class="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
      <div class="lg:col-span-7">
        ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
        <h1 class="mt-3 font-display text-3xl font-extrabold leading-[1.1] text-ink-900 md:text-[2.75rem]">${esc(title)}</h1>
        ${lead ? `<p class="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">${lead}</p>` : ""}
      </div>
      ${aside ? `<div class="lg:col-span-5">${aside}</div>` : ""}
    </div>
  </div>
</section>`;
}

export function breadcrumb(items, depth = 0) {
  return `
<nav aria-label="Remah roti">
  <ol class="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
    ${join(
      items.map((item, i) => {
        const last = i === items.length - 1;
        return `<li class="flex items-center gap-1.5">${
          last
            ? `<span class="font-medium text-ink-700" aria-current="page">${esc(item.label)}</span>`
            : `<a href="${rel(item.href, depth)}" class="transition-colors hover:text-brand-700">${esc(item.label)}</a>${icon(
                "chevronRight",
                { class: "h-3.5 w-3.5 text-ink-300", stroke: 2.2 },
              )}`
        }</li>`;
      }),
    )}
  </ol>
</nav>`;
}

/* ------------------------------------------------------------------ *
 * Judul bagian
 * ------------------------------------------------------------------ */

export function sectionHeading({ eyebrow, title, lead, action, depth = 0, level = 2 }) {
  const H = `h${level}`;
  return `
<div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
  <div class="max-w-2xl">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
    <${H} class="mt-3 font-display text-2xl font-extrabold leading-tight text-ink-900 md:text-3xl">${esc(title)}</${H}>
    ${lead ? `<p class="mt-3 text-[1.0625rem] leading-relaxed text-ink-600">${lead}</p>` : ""}
  </div>
  ${
    action
      ? `<a href="${rel(action.href, depth)}" class="btn btn-secondary btn-sm shrink-0">${esc(action.label)}${icon("arrowRight", { class: "h-4 w-4" })}</a>`
      : ""
  }
</div>`;
}

/* ------------------------------------------------------------------ *
 * Kartu posting
 * ------------------------------------------------------------------ */

const toneClass = { brand: "badge-brand", accent: "badge-accent", neutral: "badge-neutral" };

export function categoryBadge(key, { invert = false } = {}) {
  const c = categories[key];
  return `<span class="badge ${invert ? "badge-invert" : toneClass[c.tone]}">${esc(c.label)}</span>`;
}

export function postCard(post, { depth = 0, compact = false } = {}) {
  const href = rel(`berita/${post.slug}.html`, depth);
  return `
<article class="card card-interactive group h-full p-5" data-post data-category="${post.category}" data-title="${esc(post.title.toLowerCase())}" data-date="${post.date}">
  <div class="flex items-center gap-2">
    ${categoryBadge(post.category)}
    ${post.pinned ? '<span class="badge badge-neutral">Penting</span>' : ""}
  </div>
  <h3 class="mt-3 font-display text-lg font-bold leading-snug text-ink-900 ${compact ? "clamp-2" : ""}">
    <a href="${href}" class="stretch-link transition-colors group-hover:text-brand-700">${esc(post.title)}</a>
  </h3>
  <p class="mt-2 clamp-3 text-sm leading-relaxed text-ink-600">${esc(post.excerpt)}</p>
  <div class="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs text-ink-500">
    <time datetime="${post.date}">${formatDate(post.date)}</time>
    <span aria-hidden="true">·</span>
    <span>${post.readMinutes} menit baca</span>
    ${
      post.attachments?.length
        ? `<span aria-hidden="true">·</span><span class="inline-flex items-center gap-1 text-brand-700">${icon("document", { class: "h-3.5 w-3.5" })}PDF</span>`
        : ""
    }
  </div>
</article>`;
}

/** Kartu besar untuk konten unggulan. */
export function featuredPostCard(post, { depth = 0 } = {}) {
  const href = rel(`berita/${post.slug}.html`, depth);
  return `
<article class="group relative flex h-full flex-col justify-end overflow-hidden rounded-[1rem] bg-ink-900 p-7 text-white md:p-9">
  <div class="absolute inset-0 bg-[radial-gradient(120%_90%_at_10%_0%,#1d5697_0%,#102f51_45%,#091d34_100%)]"></div>
  <div class="absolute inset-0 grid-fine opacity-40" aria-hidden="true"></div>
  <div class="relative">
    <div class="flex flex-wrap items-center gap-2">
      ${categoryBadge(post.category, { invert: true })}
      <span class="text-xs text-white/60"><time datetime="${post.date}">${formatDate(post.date)}</time></span>
    </div>
    <h3 class="mt-4 font-display text-2xl font-extrabold leading-tight md:text-3xl">
      <a href="${href}" class="stretch-link">${esc(post.title)}</a>
    </h3>
    <p class="mt-3 max-w-xl clamp-3 text-[0.9375rem] leading-relaxed text-white/70">${esc(post.excerpt)}</p>
    <span class="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-accent-300">
      Baca selengkapnya ${icon("arrowRight", { class: "h-4 w-4 transition-transform group-hover:translate-x-1" })}
    </span>
  </div>
</article>`;
}

/** Baris ringkas untuk daftar pengumuman. */
export function postRow(post, { depth = 0 } = {}) {
  const href = rel(`berita/${post.slug}.html`, depth);
  return `
<article class="card card-interactive group flex-row items-start gap-4 p-4 sm:gap-5 sm:p-5" data-post data-category="${post.category}" data-title="${esc(post.title.toLowerCase())}" data-date="${post.date}">
  <div class="grid w-14 shrink-0 place-items-center rounded-lg border border-ink-200 bg-ink-50 py-2 text-center">
    <span class="font-display text-xl font-extrabold leading-none text-ink-900">${dayOf(post.date)}</span>
    <span class="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-500">${monthShort(post.date)}</span>
  </div>
  <div class="min-w-0 flex-1">
    <div class="flex flex-wrap items-center gap-2">
      ${categoryBadge(post.category)}
      ${post.pinned ? '<span class="badge badge-neutral">Penting</span>' : ""}
    </div>
    <h3 class="mt-2 font-display text-base font-bold leading-snug text-ink-900">
      <a href="${href}" class="stretch-link transition-colors group-hover:text-brand-700">${esc(post.title)}</a>
    </h3>
    <p class="mt-1.5 clamp-2 text-sm leading-relaxed text-ink-600">${esc(post.excerpt)}</p>
    ${
      post.attachments?.length
        ? `<p class="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-brand-700">${icon("document", { class: "h-3.5 w-3.5" })}${esc(post.attachments[0].name)} · ${esc(post.attachments[0].size)}</p>`
        : ""
    }
  </div>
  ${icon("chevronRight", { class: "mt-1 hidden h-5 w-5 shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600 sm:block" })}
</article>`;
}

/* ------------------------------------------------------------------ *
 * Kartu program studi
 * ------------------------------------------------------------------ */

export function programCard(program, { depth = 0 } = {}) {
  const dept = departmentOf(program);
  const href = rel(`program-studi/${program.slug}.html`, depth);
  const info = levelInfo(program.level);
  const search = [
    program.name,
    program.level,
    dept.name,
    program.tagline ?? "",
    program.careers.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return `
<article class="card card-interactive group h-full p-5"
         data-program
         data-level="${program.level}"
         data-dept="${program.dept}"
         data-search="${esc(search)}">
  <div class="flex items-center justify-between gap-3">
    <span class="badge ${program.level === "D4" ? "badge-accent" : program.level === "D2" ? "badge-neutral" : "badge-brand"}">${program.level}</span>
    ${
      program.accreditation
        ? `<span class="text-[0.7rem] font-medium text-ink-500">Akreditasi ${esc(program.accreditation)}</span>`
        : `<span class="text-[0.7rem] font-medium text-ink-400">Akreditasi belum tercantum</span>`
    }
  </div>
  <h3 class="mt-3 font-display text-lg font-bold leading-snug text-ink-900">
    <a href="${href}" class="stretch-link transition-colors group-hover:text-brand-700">${esc(program.name)}</a>
  </h3>
  <p class="mt-1 text-xs font-medium text-ink-500">Jurusan ${esc(dept.name)}</p>
  ${
    program.tagline
      ? `<p class="mt-3 clamp-3 text-sm leading-relaxed text-ink-600">${esc(program.tagline)}</p>`
      : ""
  }
  <div class="mt-auto flex items-center justify-between pt-4 text-xs text-ink-500">
    <span>${info.semesters} semester</span>
    <span class="inline-flex items-center gap-1 font-display font-semibold text-brand-700">Detail${icon("arrowRight", { class: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" })}</span>
  </div>
</article>`;
}

/* ------------------------------------------------------------------ *
 * Lain-lain
 * ------------------------------------------------------------------ */

export function attachmentCard(file, { depth = 0 } = {}) {
  const href = rel(file.href, depth);
  return `
<a href="${href}" download class="card card-interactive group flex-row items-center gap-4 p-4">
  <span class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
    ${icon("document", { class: "h-5 w-5" })}
  </span>
  <span class="min-w-0 flex-1">
    <span class="block truncate font-display text-sm font-semibold text-ink-900">${esc(file.name)}</span>
    <span class="mt-0.5 block text-xs text-ink-500">PDF · ${esc(file.size)}</span>
  </span>
  ${icon("download", { class: "h-5 w-5 shrink-0 text-ink-400 transition-colors group-hover:text-brand-700" })}
</a>`;
}

export function calloutPortal({ depth = 0, variant = "default" } = {}) {
  if (variant === "compact") {
    return `
<aside class="rounded-[1rem] border border-brand-200 bg-brand-50 p-5">
  <div class="flex items-center gap-2 text-brand-800">
    ${icon("shield", { class: "h-5 w-5" })}
    <h2 class="font-display text-base font-bold">Presensi PKKMB</h2>
  </div>
  <p class="mt-2 text-sm leading-relaxed text-ink-600">
    Masuk ke portal resmi untuk melakukan presensi kehadiran setiap sesi kegiatan.
  </p>
  <a href="${rel("login.html", depth)}" class="btn btn-primary btn-sm mt-4 w-full">Masuk Portal PKKMB</a>
</aside>`;
  }

  return `
<section class="relative overflow-hidden rounded-[1.25rem] bg-ink-950 px-6 py-10 text-white md:px-12 md:py-14">
  <div class="absolute inset-0 bg-[radial-gradient(90%_120%_at_100%_0%,#1d5697_0%,#102f51_50%,#091d34_100%)]"></div>
  <div class="absolute inset-0 grid-fine opacity-40" aria-hidden="true"></div>
  <div class="relative grid gap-8 lg:grid-cols-12 lg:items-center">
    <div class="lg:col-span-7">
      <p class="eyebrow !text-accent-300">Portal Peserta</p>
      <h2 class="mt-3 font-display text-2xl font-extrabold leading-tight md:text-[2rem]">
        Presensi kehadiran dilakukan melalui Portal PKKMB
      </h2>
      <p class="mt-4 max-w-xl leading-relaxed text-white/70">
        Kehadiran penuh pada seluruh sesi menjadi syarat terbitnya sertifikat PKKMB —
        dokumen yang diperlukan untuk mengikuti UAS serta kelulusan di Poliban.
      </p>
    </div>
    <div class="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
      <a href="${rel("login.html", depth)}" class="btn btn-invert btn-lg">${icon("shield", { class: "h-5 w-5" })}<span>Masuk Portal</span></a>
      <a href="${rel("pkkmb.html", depth)}" class="btn btn-outline-invert btn-lg">Panduan peserta</a>
    </div>
  </div>
</section>`;
}

export function emptyState({ title, body, action, depth = 0 }) {
  return `
<div class="card items-center px-6 py-16 text-center">
  <span class="grid h-12 w-12 place-items-center rounded-full bg-ink-100 text-ink-400">${icon("search", { class: "h-6 w-6" })}</span>
  <h3 class="mt-4 font-display text-lg font-bold text-ink-900">${esc(title)}</h3>
  <p class="mt-2 max-w-sm text-sm leading-relaxed text-ink-600">${esc(body)}</p>
  ${action ? `<a href="${rel(action.href, depth)}" class="btn btn-secondary btn-sm mt-5">${esc(action.label)}</a>` : ""}
</div>`;
}

export function statBlock(stats, { tone = "light" } = {}) {
  const dark = tone === "dark";
  return `
<dl class="grid grid-cols-2 gap-px overflow-hidden rounded-[1rem] border ${
    dark ? "border-white/10 bg-white/10" : "border-ink-200 bg-ink-200"
  } sm:grid-cols-4">
  ${join(
    stats.map(
      (s) => `
  <div class="${dark ? "bg-ink-950" : "bg-white"} px-5 py-6 text-center">
    <dt class="order-2 mt-1.5 text-xs font-medium ${dark ? "text-ink-400" : "text-ink-500"}">${esc(s.label)}</dt>
    <dd class="font-display text-[1.75rem] font-extrabold leading-none ${dark ? "text-white" : "text-ink-900"}">
      <span data-count-to="${s.value}">${s.value.toLocaleString("id-ID")}</span>${esc(s.suffix)}
    </dd>
  </div>`,
    ),
  )}
</dl>`;
}
