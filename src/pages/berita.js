import { page } from "../components/layout.js";
import { pageHeader, postCard, featuredPostCard, emptyState } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join, formatDate } from "../lib/html.js";
import { sortedPosts, categories } from "../data/posts.js";
import { officialNews, newsSource } from "../data/news.js";

function filters() {
  const cats = Object.entries(categories);
  return `
<form class="mt-8 flex flex-col gap-4 border-y border-ink-200 py-4 lg:flex-row lg:items-center lg:justify-between"
      data-filter-form role="search" aria-label="Cari dan saring berita">
  <div class="relative w-full lg:max-w-sm">
    <label for="cari-berita" class="sr-only">Cari berita berdasarkan judul</label>
    ${icon("search", { class: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" })}
    <input id="cari-berita" type="search" name="q" placeholder="Cari judul berita…" autocomplete="off"
           class="field !pl-10" data-filter-search>
  </div>

  <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Saring menurut kategori">
    <button type="button" class="chip" aria-pressed="true" data-filter-chip value="">Semua</button>
    ${join(
      cats.map(
        ([key, c]) =>
          `<button type="button" class="chip" aria-pressed="false" data-filter-chip value="${key}">${esc(c.label)}</button>`,
      ),
    )}
  </div>
</form>

<p class="mt-4 text-sm text-ink-500" role="status" data-filter-count>
  Menampilkan ${sortedPosts.length} dari ${sortedPosts.length} artikel.
</p>`;
}

export default function render() {
  const featured = sortedPosts[0];
  const rest = sortedPosts.slice(1);

  return page({
    title: "Berita & Informasi",
    canonical: "berita.html",
    active: "berita.html",
    description:
      "Berita, materi, dan informasi terkini seputar rangkaian PKKMB 2026 Politeknik Negeri Banjarmasin.",
    body: join([
      pageHeader({
        eyebrow: "Ruang berita",
        title: "Berita & informasi PKKMB",
        lead: "Kabar terbaru seputar rangkaian kegiatan, materi sesi, dan panduan konten untuk mahasiswa baru Poliban.",
        crumbs: [{ label: "Beranda", href: "index.html" }, { label: "Berita" }],
      }),

      `<section class="shell py-12 md:py-16" aria-labelledby="sorotan">
        <h2 id="sorotan" class="sr-only">Sorotan utama</h2>
        <div class="grid gap-6 lg:grid-cols-12">
          <div class="lg:col-span-7">${featuredPostCard(featured)}</div>
          <div class="lg:col-span-5">
            <h2 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Terbaru</h2>
            <ul class="mt-4 divide-y divide-ink-200 border-y border-ink-200">
              ${join(
                sortedPosts.slice(1, 5).map(
                  (p) => `
              <li class="group py-4">
                <a href="berita/${p.slug}.html" class="flex items-start gap-3">
                  <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"></span>
                  <span class="min-w-0">
                    <span class="block font-display text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">${esc(p.listTitle ?? p.title)}</span>
                    <span class="mt-1 block text-xs text-ink-500">${esc(categories[p.category].label)} · <time datetime="${p.date}">${formatDate(p.date)}</time></span>
                  </span>
                </a>
              </li>`,
                ),
              )}
            </ul>
          </div>
        </div>

        <div class="mt-14">
          <h2 class="font-display text-xl font-extrabold text-ink-900">Seluruh artikel</h2>
          ${filters()}

          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-filter-results>
            ${join(sortedPosts.map((p) => postCard(p)))}
          </div>

          <div class="mt-6 hidden" data-filter-empty>
            ${emptyState({
              title: "Tidak ada artikel yang cocok",
              body: "Coba kata kunci lain atau pilih kategori “Semua” untuk melihat seluruh artikel.",
            })}
          </div>
        </div>
      </section>`,

      /*
       * Kabar dari situs institusi. Dipisahkan dari artikel PKKMB agar jelas
       * bahwa sumbernya berbeda: ini diambil dari poliban.ac.id, bukan ditulis
       * oleh panitia PKKMB.
       *
       * Disusun sebagai satu berita utama + tabel ringkas, bukan dua belas
       * kartu seragam, supaya mata punya titik masuk dan sisanya mudah dipindai.
       */
      (() => {
        const [lead, ...rest] = officialNews;
        return `<section class="border-t border-ink-200 bg-ink-50 py-14 md:py-16" aria-labelledby="kabar-kampus">
        <div class="shell">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div class="max-w-2xl">
              <p class="eyebrow">Dari situs resmi</p>
              <h2 id="kabar-kampus" class="mt-2 font-display text-2xl font-extrabold text-ink-900">Kabar kampus Poliban</h2>
              <p class="mt-2 text-sm leading-relaxed text-ink-600">
                Berita institusi di luar rangkaian PKKMB, ditarik dari
                <a href="https://poliban.ac.id/" rel="noopener" class="font-medium text-brand-700 underline underline-offset-2">poliban.ac.id</a>.
                Judul dan ringkasan ditampilkan apa adanya; artikel lengkap tetap di situs aslinya.
              </p>
            </div>
            <a href="https://poliban.ac.id/our-blog/" rel="noopener" class="btn btn-secondary btn-sm">
              <span>Arsip berita Poliban</span>${icon("external", { class: "h-4 w-4" })}
            </a>
          </div>

          <article class="mt-8 border-t-2 border-ink-900 pt-6">
            <div class="flex flex-wrap items-center gap-2">
              ${join(lead.categories.slice(0, 2).map((c) => `<span class="badge badge-brand">${esc(c)}</span>`))}
              <time datetime="${esc(lead.date)}" class="text-xs text-ink-500">${formatDate(lead.date)}</time>
            </div>
            <h3 class="mt-3 max-w-3xl font-display text-2xl font-extrabold leading-tight text-ink-900">
              <a href="${esc(lead.url)}" rel="noopener" class="transition-colors hover:text-brand-700">${esc(lead.title)}</a>
            </h3>
            <p class="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-ink-600">${esc(lead.summary)}</p>
            <a href="${esc(lead.url)}" rel="noopener"
               class="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-700 hover:text-brand-800">
              Baca di poliban.ac.id ${icon("external", { class: "h-3.5 w-3.5" })}
            </a>
          </article>

          <ul class="mt-10 divide-y divide-ink-200 border-y border-ink-200">
            ${join(
              rest.map(
                (n) => `
            <li class="group">
              <a href="${esc(n.url)}" rel="noopener" class="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:gap-5">
                <time datetime="${esc(n.date)}" class="shrink-0 font-display text-xs font-semibold tabular-nums text-ink-500 sm:w-28">${formatDate(n.date)}</time>
                <span class="min-w-0 flex-1">
                  <span class="block font-display text-[0.95rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">${esc(n.title)}</span>
                  ${
                    n.categories.length
                      ? `<span class="mt-1 block text-xs text-ink-500">${esc(n.categories.join(" · "))}</span>`
                      : ""
                  }
                </span>
                <span class="hidden shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 sm:block" aria-hidden="true">${icon("arrowRight", { class: "h-4 w-4" })}</span>
              </a>
            </li>`,
              ),
            )}
          </ul>

          <p class="mt-6 flex flex-wrap gap-x-2 gap-y-1 text-xs text-ink-500">
            ${icon("info", { class: "h-4 w-4 shrink-0 text-ink-400" })}
            <span>Disegarkan dari WP REST API resmi pada ${formatDate(newsSource.fetchedAt)}.
              <a href="sumber.html" class="font-medium text-brand-700 underline underline-offset-2">Catatan sumber &amp; cara pembaruan</a>.</span>
          </p>
        </div>
      </section>`;
      })(),
    ]),
  });
}
