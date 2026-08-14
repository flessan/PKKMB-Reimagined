import { page } from "../components/layout.js";
import { pageHeader, postCard, featuredPostCard, emptyState } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join, formatDate } from "../lib/html.js";
import { sortedPosts, categories } from "../data/posts.js";

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
    ]),
  });
}
