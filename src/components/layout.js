import { site, nav, footerNav } from "../data/site.js";
import { icon } from "../lib/icons.js";
import { esc, join, rel, cls } from "../lib/html.js";

/* ------------------------------------------------------------------ *
 * Lambang
 * ------------------------------------------------------------------ */

export function brandMark({ depth = 0, tone = "light", compact = false } = {}) {
  const dark = tone === "dark";
  return `
<a href="${rel("index.html", depth)}" class="group inline-flex items-center gap-3 rounded-lg" aria-label="PKKMB 2026 Politeknik Negeri Banjarmasin — kembali ke beranda">
  <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition-colors ${
    dark
      ? "bg-white/10 ring-1 ring-white/20 group-hover:bg-white/20"
      : "bg-brand-700 group-hover:bg-brand-800"
  }">
    <svg class="h-6 w-6" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3 27 8.6v7.9c0 6.4-4.5 11.4-11 13.5-6.5-2.1-11-7.1-11-13.5V8.6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M11.6 20V12h4a2.6 2.6 0 0 1 0 5.2h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="leading-tight">
    <span class="block font-display text-[0.95rem] font-extrabold tracking-tight ${
      dark ? "text-white" : "text-ink-900"
    }">PKKMB <span class="${dark ? "text-accent-300" : "text-brand-600"}">2026</span></span>
    <span class="block text-[0.7rem] font-medium ${
      dark ? "text-white/60" : "text-ink-500"
    } ${compact ? "hidden sm:block" : ""}">Politeknik Negeri Banjarmasin</span>
  </span>
</a>`;
}

/* ------------------------------------------------------------------ *
 * Header
 * ------------------------------------------------------------------ */

function navLink(item, depth, active) {
  const isActive = active === item.href || (item.children ?? []).some((c) => c.href === active);
  const base =
    "inline-flex items-center gap-1 rounded-lg px-3 py-2 font-display text-[0.875rem] font-semibold transition-colors";

  if (!item.children) {
    return `<a href="${rel(item.href, depth)}" class="${cls(
      base,
      isActive ? "text-brand-700" : "text-ink-600 hover:text-ink-900",
    )}"${isActive ? ' aria-current="page"' : ""}>${esc(item.label)}</a>`;
  }

  const id = `menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return `
<div class="relative" data-dropdown>
  <button type="button" class="${cls(base, isActive ? "text-brand-700" : "text-ink-600 hover:text-ink-900")}"
          aria-expanded="false" aria-controls="${id}" data-dropdown-trigger>
    ${esc(item.label)}
    ${icon("chevronDown", { class: "h-4 w-4 transition-transform duration-200", stroke: 2.2 })}
  </button>
  <div id="${id}" class="absolute left-0 top-full z-50 hidden w-80 pt-2" data-dropdown-panel>
    <div class="overflow-hidden rounded-xl border border-ink-200 bg-white p-2 shadow-lift">
      ${join(
        item.children.map(
          (child) => `
      <a href="${rel(child.href, depth)}" class="block rounded-lg px-3 py-2.5 transition-colors hover:bg-ink-50">
        <span class="block font-display text-sm font-semibold text-ink-900">${esc(child.label)}</span>
        <span class="mt-0.5 block text-xs leading-relaxed text-ink-500">${esc(child.desc)}</span>
      </a>`,
        ),
      )}
    </div>
  </div>
</div>`;
}

function mobileNavItem(item, depth) {
  if (!item.children) {
    return `<a href="${rel(item.href, depth)}" class="block rounded-lg px-3 py-2.5 font-display text-[0.95rem] font-semibold text-ink-800 hover:bg-ink-50">${esc(item.label)}</a>`;
  }
  return `
<details class="group rounded-lg">
  <summary class="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 font-display text-[0.95rem] font-semibold text-ink-800 hover:bg-ink-50">
    ${esc(item.label)}
    ${icon("chevronDown", { class: "h-4 w-4 text-ink-400 transition-transform group-open:rotate-180", stroke: 2.2 })}
  </summary>
  <div class="mt-0.5 space-y-0.5 border-l border-ink-200 pb-1 pl-3 ml-3">
    ${join(
      item.children.map(
        (c) =>
          `<a href="${rel(c.href, depth)}" class="block rounded-lg px-3 py-2 text-sm text-ink-600 hover:bg-ink-50 hover:text-brand-700">${esc(c.label)}</a>`,
      ),
    )}
  </div>
</details>`;
}

export function header({ depth = 0, active = "" } = {}) {
  return `
<a href="#konten" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2.5 focus:font-display focus:text-sm focus:font-semibold focus:text-white">Lompat ke konten utama</a>

<header class="sticky top-0 z-50 border-b border-ink-200/80 bg-white/90 backdrop-blur-md no-print" data-header>
  <div class="shell">
    <div class="flex h-[4.5rem] items-center justify-between gap-4">
      ${brandMark({ depth, compact: true })}

      <nav class="hidden items-center gap-0.5 lg:flex" aria-label="Navigasi utama">
        ${join(nav.map((item) => navLink(item, depth, active)))}
      </nav>

      <div class="flex items-center gap-2">
        <a href="${rel("login.html", depth)}" class="btn btn-primary btn-sm hidden sm:inline-flex">
          ${icon("shield", { class: "h-4 w-4" })}
          <span>Portal PKKMB</span>
        </a>

        <!-- Disclosure native: menu tetap berfungsi tanpa JavaScript. -->
        <details class="group/menu lg:hidden" data-menu>
          <summary class="btn btn-secondary btn-sm !px-2.5 list-none" aria-label="Menu navigasi" data-menu-toggle>
            <span class="group-open/menu:hidden">${icon("menu", { class: "h-5 w-5", stroke: 2 })}</span>
            <span class="hidden group-open/menu:inline">${icon("close", { class: "h-5 w-5", stroke: 2 })}</span>
          </summary>

          <div id="menu-seluler" class="absolute inset-x-0 top-[4.5rem] border-t border-ink-200 bg-white shadow-raise">
            <nav class="shell max-h-[calc(100dvh-4.5rem)] space-y-1 overflow-y-auto py-4" aria-label="Navigasi seluler">
              ${join(nav.map((item) => mobileNavItem(item, depth)))}
              <div class="grid gap-2 pt-3">
                <a href="${rel("login.html", depth)}" class="btn btn-primary w-full">
                  ${icon("shield", { class: "h-4 w-4" })}<span>Masuk Portal PKKMB</span>
                </a>
                <a href="${site.contact.whatsappHref}" class="btn btn-secondary w-full" rel="noopener">
                  ${icon("whatsapp", { class: "h-4 w-4" })}<span>Bantuan WhatsApp</span>
                </a>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </div>
  </div>
</header>`;
}

/* ------------------------------------------------------------------ *
 * Footer
 * ------------------------------------------------------------------ */

export function footer({ depth = 0 } = {}) {
  return `
<footer class="mt-auto border-t border-white/10 bg-ink-950 text-ink-300 no-print">
  <div class="shell py-14">
    <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
      <div class="space-y-5 lg:col-span-4">
        ${brandMark({ depth, tone: "dark" })}
        <p class="max-w-sm text-sm leading-relaxed text-ink-400">
          Pusat informasi resmi Pengenalan Kehidupan Kampus bagi Mahasiswa Baru
          Politeknik Negeri Banjarmasin tahun ${site.year}.
        </p>
        <p class="font-display text-sm font-semibold text-accent-300">“${esc(site.tagline)}”</p>
        <ul class="space-y-2 text-sm text-ink-400">
          <li class="flex gap-2.5">${icon("pin", { class: "mt-0.5 h-4 w-4 shrink-0 text-ink-500" })}<span>${esc(site.contact.address)}</span></li>
          <li class="flex gap-2.5">${icon("phone", { class: "mt-0.5 h-4 w-4 shrink-0 text-ink-500" })}<a href="${site.contact.phoneHref}" class="hover:text-white">${esc(site.contact.phone)}</a></li>
          <li class="flex gap-2.5">${icon("mail", { class: "mt-0.5 h-4 w-4 shrink-0 text-ink-500" })}<a href="mailto:${site.contact.email}" class="hover:text-white">${esc(site.contact.email)}</a></li>
        </ul>
      </div>

      ${join(
        footerNav.map(
          (group) => `
      <nav class="lg:col-span-2" aria-label="${esc(group.title)}">
        <h2 class="font-display text-xs font-bold uppercase tracking-[0.14em] text-white">${esc(group.title)}</h2>
        <ul class="mt-4 space-y-2.5 text-sm">
          ${join(
            group.links.map(
              (l) =>
                `<li><a href="${l.external ? l.href : rel(l.href, depth)}" class="inline-flex items-center gap-1.5 text-ink-400 transition-colors hover:text-white"${
                  l.external ? ' rel="noopener"' : ""
                }>${esc(l.label)}${l.external ? icon("arrowUpRight", { class: "h-3 w-3" }) : ""}</a></li>`,
            ),
          )}
        </ul>
      </nav>`,
        ),
      )}

      <div class="lg:col-span-2">
        <h2 class="font-display text-xs font-bold uppercase tracking-[0.14em] text-white">Kanal Resmi</h2>
        <ul class="mt-4 flex gap-2">
          ${join(
            site.social.map(
              (s) =>
                `<li><a href="${s.href}" rel="noopener" class="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-ink-400 transition-colors hover:border-white/30 hover:text-white" title="${esc(s.label)}"><span class="sr-only">${esc(s.label)}</span>${icon(s.icon, { class: "h-5 w-5" })}</a></li>`,
            ),
          )}
        </ul>
        <a href="${site.contact.whatsappHref}" rel="noopener" class="mt-4 inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-white">
          ${icon("whatsapp", { class: "h-4 w-4" })}<span>${esc(site.contact.whatsapp)}</span>
        </a>
      </div>
    </div>

    <div class="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
      <p>© ${site.year} ${esc(site.institution)}. Hak cipta dilindungi undang-undang.</p>
      <p>Dikembangkan oleh ${esc(site.organiser)}.</p>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------ *
 * Tombol bantuan mengambang
 * ------------------------------------------------------------------ */

export function helpButton() {
  return `
<a href="${site.contact.whatsappHref}" rel="noopener"
   class="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-ink-900 py-3 pl-3.5 pr-4 text-white shadow-lift transition-colors hover:bg-ink-800 no-print">
  ${icon("whatsapp", { class: "h-5 w-5 text-accent-300" })}
  <span class="font-display text-sm font-semibold">Bantuan</span>
</a>`;
}

/* ------------------------------------------------------------------ *
 * Kerangka dokumen
 * ------------------------------------------------------------------ */

/**
 * @param {Object} opts
 * @param {string} opts.title      Judul halaman (tanpa nama situs).
 * @param {string} opts.description Meta description.
 * @param {string} opts.body       Isi <main>.
 * @param {number} [opts.depth]    Kedalaman direktori halaman.
 * @param {string} [opts.active]   Href navigasi yang aktif.
 * @param {boolean} [opts.bare]    Tanpa header/footer (halaman login).
 * @param {string} [opts.bodyClass]
 * @param {string} [opts.head]     Tambahan di dalam <head>.
 * @param {string} [opts.canonical]
 */
export function page({
  title,
  description,
  body,
  depth = 0,
  active = "",
  bare = false,
  bodyClass = "",
  head = "",
  canonical = "",
}) {
  const assets = depth ? "../".repeat(depth) : "";
  const fullTitle = title ? `${title} · ${site.name}` : site.name;

  return `<!doctype html>
<html lang="${site.lang}" class="h-full">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#17457a">
<meta name="color-scheme" content="light">
${canonical ? `<link rel="canonical" href="${site.url}/${canonical}">` : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="id_ID">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${site.url}/assets/img/og-pkkmb.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${assets}assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${assets}assets/apple-touch-icon.png">
<link rel="preload" href="${assets}assets/fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${assets}assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${assets}assets/app.css">
<script>document.documentElement.classList.add("js")</script>
<script src="${assets}assets/app.js" type="module" defer></script>
${head}
</head>
<body class="${cls("flex min-h-full flex-col bg-white antialiased", bodyClass)}">
${bare ? "" : header({ depth, active })}
<main id="konten" class="${bare ? "" : "flex-1"}">
${body}
</main>
${bare ? "" : footer({ depth }) + helpButton()}
</body>
</html>
`;
}
