import { page } from "../components/layout.js";
import { pageHeader, postRow, attachmentCard, calloutPortal, emptyState } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join, formatDate } from "../lib/html.js";
import { announcements, posts, sortedPosts } from "../data/posts.js";

function aside() {
  const files = posts.flatMap((p) => p.attachments ?? []);
  return `
<div class="space-y-4">
  <div class="rounded-[1rem] border border-brand-200 bg-brand-50 p-5">
    <h2 class="inline-flex items-center gap-2 font-display text-base font-bold text-brand-800">
      ${icon("info", { class: "h-5 w-5" })} Cara membaca pengumuman
    </h2>
    <ul class="mt-3 space-y-2 text-sm leading-relaxed text-ink-600">
      <li class="flex gap-2">${icon("check", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}<span>Pengumuman bertanda <strong>Penting</strong> wajib dibaca seluruh peserta.</span></li>
      <li class="flex gap-2">${icon("check", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}<span>Selalu periksa tanggal terbit; ketentuan terbaru menggantikan yang lama.</span></li>
      <li class="flex gap-2">${icon("check", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}<span>Dokumen resmi hanya berasal dari domain ini.</span></li>
    </ul>
  </div>
  <div>
    <h2 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Dokumen terlampir</h2>
    <div class="mt-4 space-y-3">${join(files.map((f) => attachmentCard(f)))}</div>
  </div>
</div>`;
}

export default function render() {
  const others = sortedPosts.filter((p) => !announcements.includes(p));

  return page({
    title: "Pengumuman Resmi",
    canonical: "pengumuman.html",
    active: "pengumuman.html",
    description:
      "Pengumuman resmi panitia PKKMB 2026 Politeknik Negeri Banjarmasin, termasuk tata tertib dan ketentuan Pra-PKKMB.",
    body: join([
      pageHeader({
        eyebrow: "Kanal resmi",
        title: "Pengumuman resmi PKKMB 2026",
        lead: "Setiap ketentuan yang mengikat peserta diterbitkan di halaman ini. Pastikan Anda membacanya sebelum kegiatan dimulai.",
        crumbs: [{ label: "Beranda", href: "index.html" }, { label: "Pengumuman" }],
      }),

      `<section class="shell py-12 md:py-16">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <div class="flex items-baseline justify-between gap-4">
              <h2 class="font-display text-xl font-extrabold text-ink-900">Berlaku saat ini</h2>
              <span class="text-sm text-ink-500">${announcements.length} pengumuman</span>
            </div>
            <div class="mt-5 space-y-3">
              ${
                announcements.length
                  ? join(announcements.map((p) => postRow(p)))
                  : emptyState({
                      title: "Belum ada pengumuman",
                      body: "Pengumuman resmi akan tampil di sini begitu diterbitkan panitia.",
                    })
              }
            </div>

            <h2 class="mt-12 font-display text-xl font-extrabold text-ink-900">Informasi terkait</h2>
            <p class="mt-2 text-sm text-ink-600">Bukan pengumuman formal, namun tetap perlu diketahui peserta.</p>
            <div class="mt-5 space-y-3">${join(others.map((p) => postRow(p)))}</div>
          </div>

          <div class="lg:col-span-4">${aside()}</div>
        </div>

        <div class="mt-16">${calloutPortal()}</div>
      </section>`,
    ]),
  });
}
