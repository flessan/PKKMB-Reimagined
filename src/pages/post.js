import { page } from "../components/layout.js";
import {
  breadcrumb,
  categoryBadge,
  attachmentCard,
  calloutPortal,
  postCard,
} from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join, formatDateLong, renderBody } from "../lib/html.js";
import { sortedPosts, categories } from "../data/posts.js";
import { site } from "../data/site.js";

/** @param {import('../data/posts.js').posts[number]} post */
export default function render(post) {
  const depth = 1;
  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const cat = categories[post.category];

  return page({
    depth,
    title: post.title,
    canonical: `berita/${post.slug}.html`,
    active: cat.kind === "pengumuman" ? "pengumuman.html" : "berita.html",
    description: post.excerpt,
    head: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: post.title,
      datePublished: `${post.date}T${post.time}:00+08:00`,
      author: { "@type": "Organization", name: post.author },
      publisher: { "@type": "CollegeOrUniversity", name: site.institution },
      description: post.excerpt,
      articleSection: cat.label,
    })}</script>`,
    body: join([
      `<article>
  <header class="border-b border-ink-200 bg-ink-50">
    <div class="shell py-10 md:py-14">
      ${breadcrumb(
        [
          { label: "Beranda", href: "index.html" },
          cat.kind === "pengumuman"
            ? { label: "Pengumuman", href: "pengumuman.html" }
            : { label: "Berita", href: "berita.html" },
          { label: post.listTitle ?? post.title },
        ],
        depth,
      )}

      <div class="mt-6 max-w-3xl">
        <div class="flex flex-wrap items-center gap-2">
          ${categoryBadge(post.category)}
          ${post.pinned ? '<span class="badge badge-neutral">Penting</span>' : ""}
        </div>

        <h1 class="mt-4 font-display text-3xl font-extrabold leading-[1.15] text-ink-900 md:text-[2.5rem]">${esc(post.title)}</h1>
        <p class="mt-4 text-lg leading-relaxed text-ink-600">${esc(post.excerpt)}</p>

        <dl class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
          <div class="inline-flex items-center gap-1.5">
            ${icon("users", { class: "h-4 w-4" })}<dt class="sr-only">Penulis</dt><dd>${esc(post.author)}</dd>
          </div>
          <div class="inline-flex items-center gap-1.5">
            ${icon("calendar", { class: "h-4 w-4" })}<dt class="sr-only">Tanggal terbit</dt>
            <dd><time datetime="${post.date}">${formatDateLong(post.date)}</time></dd>
          </div>
          <div class="inline-flex items-center gap-1.5">
            ${icon("clock", { class: "h-4 w-4" })}<dt class="sr-only">Perkiraan waktu baca</dt><dd>${post.readMinutes} menit baca</dd>
          </div>
        </dl>
      </div>
    </div>
  </header>

  <div class="shell py-12 md:py-16">
    <div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-8">
        <div class="prose-editorial max-w-2xl">
          ${renderBody(post.body, depth)}
        </div>

        ${
          post.links?.length
            ? `
        <div class="mt-8 flex max-w-2xl flex-wrap gap-3">
          ${join(
            post.links.map(
              (l) =>
                `<a href="${l.href}" rel="noopener" class="btn btn-secondary btn-sm">${esc(l.label)}${icon("arrowUpRight", { class: "h-4 w-4" })}</a>`,
            ),
          )}
        </div>`
            : ""
        }

        ${
          post.attachments?.length
            ? `
        <section class="mt-10 max-w-2xl" aria-labelledby="lampiran">
          <h2 id="lampiran" class="font-display text-lg font-bold text-ink-900">Lampiran dokumen</h2>
          <div class="mt-4 space-y-3">${join(post.attachments.map((f) => attachmentCard(f, { depth })))}</div>
        </section>`
            : ""
        }
      </div>

      <aside class="lg:col-span-4">
        <div class="sticky top-24 space-y-4">
          ${calloutPortal({ depth, variant: "compact" })}
          <nav class="rounded-[1rem] border border-ink-200 p-5" aria-labelledby="lainnya">
            <h2 id="lainnya" class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Baca juga</h2>
            <ul class="mt-4 space-y-3.5">
              ${join(
                related.map(
                  (p) => `
              <li class="group">
                <a href="${p.slug}.html" class="block">
                  <span class="block font-display text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">${esc(p.listTitle ?? p.title)}</span>
                  <span class="mt-1 block text-xs text-ink-500">${esc(categories[p.category].label)}</span>
                </a>
              </li>`,
                ),
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</article>`,

      `<section class="border-t border-ink-200 bg-ink-50 py-14">
        <div class="shell">
          <h2 class="font-display text-xl font-extrabold text-ink-900">Informasi lainnya</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            ${join(related.map((p) => postCard(p, { depth, compact: true })))}
          </div>
        </div>
      </section>`,
    ]),
  });
}
