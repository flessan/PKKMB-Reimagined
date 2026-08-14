import { page } from "../components/layout.js";
import {
  sectionHeading,
  postCard,
  featuredPostCard,
  postRow,
  calloutPortal,
  statBlock,
} from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join, formatDate } from "../lib/html.js";
import { site } from "../data/site.js";
import { sortedPosts, announcements, news } from "../data/posts.js";
import { schedule, eventWindow, eventStatus } from "../data/schedule.js";
import { programs, programStats, departments } from "../data/programs.js";
import { stats, quickServices, facilities, leader } from "../data/campus.js";
import { assets } from "../data/assets.js";
import { latestNews, pkkmbNews, newsSource } from "../data/news.js";

/* ------------------------------------------------------------------ *
 * Hero — status kegiatan + aksi utama
 * ------------------------------------------------------------------ */

function hero() {
  const st = eventStatus();
  const days = schedule.slice(0, 4);
  const today = new Date().toISOString().slice(0, 10);

  /* Lencana status: warna mengikuti fase, dirender saat build. */
  const toneClass =
    st.tone === "live"
      ? "bg-accent-400 text-ink-950"
      : st.tone === "accent"
        ? "bg-accent-300 text-ink-950"
        : "bg-white/15 text-white";

  return `
<section class="relative isolate overflow-hidden bg-ink-950 text-white">
  <!-- Foto dokumentasi resmi sebagai latar; digelapkan agar teks tetap terbaca. -->
  <picture>
    <source srcset="${assets.pkkmbDirector.webp}" type="image/webp">
    <img src="${assets.pkkmbDirector.file}" alt=""
         width="${assets.pkkmbDirector.width}" height="${assets.pkkmbDirector.height}"
         fetchpriority="high" decoding="async"
         class="absolute inset-0 h-full w-full object-cover object-[62%_30%] opacity-[0.22]">
  </picture>
  <div class="absolute inset-0 bg-[linear-gradient(100deg,#071628_4%,#0b2340_46%,rgba(16,47,81,0.72)_100%)]"></div>

  <div class="shell relative py-12 md:py-16 lg:py-20">
    <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">

      <div class="lg:col-span-7">
        <p class="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
          <span class="text-accent-300">Politeknik Negeri Banjarmasin</span>
          <span class="hidden h-3 w-px bg-white/25 sm:block"></span>
          <span>Tahun Akademik 2026/2027</span>
        </p>

        <h1 class="mt-4 font-display text-[2.75rem] font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.25rem]">
          PKKMB <span class="text-accent-300">2026</span>
        </h1>

        <p class="mt-4 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
          Pengenalan Kehidupan Kampus bagi Mahasiswa Baru — semua jadwal, dokumen resmi,
          dan presensi kehadiran dalam satu tempat.
        </p>

        <p class="mt-4 border-l-2 border-accent-400 pl-3.5 font-display text-base font-semibold leading-snug text-accent-300">
          “${esc(site.tagline)}”
        </p>

        <!-- Status kegiatan: dirender saat build, diperbarui skrip bila perlu. -->
        <div class="mt-7 max-w-xl rounded-xl border border-white/12 bg-white/[0.07] p-4 sm:p-5"
             data-event-card data-built="${today}">
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-[0.68rem] font-bold uppercase tracking-wider ${toneClass}"
                  data-event-status>${esc(st.state)}</span>
            <p class="font-display text-lg font-bold leading-tight sm:text-xl" data-event-headline>${esc(st.headline)}</p>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-white/65" data-event-detail>${esc(st.detail)}</p>
        </div>

        <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="login.html" class="btn btn-invert btn-lg">
            ${icon("shield", { class: "h-5 w-5" })}<span>Masuk Portal PKKMB</span>
          </a>
          <a href="pkkmb.html" class="btn btn-outline-invert btn-lg">
            <span>Panduan lengkap peserta</span>${icon("arrowRight", { class: "h-4 w-4" })}
          </a>
        </div>

        <dl class="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
          <div>
            <dt class="text-white/50">Kegiatan utama</dt>
            <dd class="mt-1 font-display text-base font-bold text-white">4 – 6 Agustus 2026</dd>
          </div>
          <div>
            <dt class="text-white/50">Peserta</dt>
            <dd class="mt-1 font-display text-base font-bold text-white">1.817 mahasiswa</dd>
          </div>
          <div>
            <dt class="text-white/50">Kuliah perdana</dt>
            <dd class="mt-1 font-display text-base font-bold text-white">24 Agustus 2026</dd>
          </div>
        </dl>

        <p class="mt-4 text-xs leading-relaxed text-white/45">
          Angka peserta dan tanggal dikutip dari
          <a href="${pkkmbNews.url}" rel="noopener"
             class="font-medium text-white/70 underline underline-offset-2 hover:text-white">siaran resmi Poliban</a>,
          ${formatDate(pkkmbNews.date)}.
        </p>
      </div>

      <div class="lg:col-span-5">
        <div class="rounded-xl border border-white/12 bg-ink-950/50 p-5 sm:p-6">
          <div class="flex items-baseline justify-between gap-4">
            <h2 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-white/70">Rangkaian kegiatan</h2>
            <span class="text-xs text-white/45">3 – 6 Agustus 2026</span>
          </div>

          <ol class="mt-5 space-y-2" data-event-days>
            ${join(
              days.map(
                (d) => `
            <li class="flex items-center gap-3.5 rounded-lg border border-white/10 bg-white/[0.05] px-3.5 py-3" data-day="${d.date}">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/10 font-display text-base font-bold leading-none">${d.date.slice(8)}</span>
              <span class="min-w-0 flex-1">
                <span class="block font-display text-sm font-semibold text-white">${esc(d.phase)}</span>
                <span class="mt-0.5 block text-xs leading-snug text-white/55">${esc(d.title)}</span>
              </span>
            </li>`,
              ),
            )}
          </ol>

          <a href="pkkmb.html#jadwal" class="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-accent-300 transition-colors hover:text-accent-400">
            Jadwal lengkap &amp; dokumen ${icon("arrowRight", { class: "h-4 w-4" })}
          </a>
        </div>

        <figure class="mt-4 rounded-xl border border-white/12 bg-white/[0.04] p-3">
          <picture>
            <source srcset="${assets.banner.webp}" type="image/webp">
            <img src="${assets.banner.file}" alt="${esc(assets.banner.alt)}"
                 width="${assets.banner.width}" height="${assets.banner.height}"
                 loading="lazy" decoding="async" class="w-full rounded-md">
          </picture>
        </figure>
      </div>

    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Pengumuman penting
 * ------------------------------------------------------------------ */

function urgentBar() {
  const top = announcements[0];
  return `
<section class="border-b border-ink-200 bg-accent-100/60" aria-label="Pengumuman penting">
  <div class="shell flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-4">
    <span class="badge badge-accent shrink-0">${icon("bell", { class: "h-3.5 w-3.5" })}Penting</span>
    <p class="min-w-0 flex-1 text-sm text-ink-700">
      <a href="berita/${top.slug}.html" class="font-medium underline-offset-2 hover:underline">${esc(top.title)}</a>
      <span class="text-ink-500"> — wajib dibaca seluruh peserta.</span>
    </p>
    <a href="pengumuman.html" class="shrink-0 font-display text-sm font-semibold text-brand-700 hover:text-brand-800">Semua pengumuman →</a>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Layanan cepat
 * ------------------------------------------------------------------ */

function services() {
  return `
<section class="shell py-16 md:py-20">
  ${sectionHeading({
    eyebrow: "Akses cepat",
    title: "Yang paling sering dibutuhkan peserta",
    lead: "Enam layanan utama yang menjawab hampir seluruh kebutuhan mahasiswa baru selama rangkaian PKKMB berlangsung.",
  })}

  <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    ${join(
      quickServices.map(
        (s) => `
    <a href="${s.href}" class="card card-interactive group p-5 ${s.primary ? "border-brand-300 bg-brand-50/50" : ""}" data-reveal>
      <span class="grid h-11 w-11 place-items-center rounded-lg transition-colors ${
        s.primary
          ? "bg-brand-600 text-white group-hover:bg-brand-700"
          : "bg-ink-100 text-ink-600 group-hover:bg-brand-50 group-hover:text-brand-700"
      }">
        ${icon(s.icon, { class: "h-5 w-5" })}
      </span>
      <h3 class="mt-4 font-display text-base font-bold text-ink-900">${esc(s.title)}</h3>
      <p class="mt-1.5 text-sm leading-relaxed text-ink-600">${esc(s.body)}</p>
      <span class="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold text-brand-700">
        Buka ${icon("arrowRight", { class: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" })}
      </span>
    </a>`,
      ),
    )}
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Jadwal ringkas
 * ------------------------------------------------------------------ */

function timeline() {
  return `
<section class="border-y border-ink-200 bg-ink-50 py-16 md:py-20">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Rangkaian kegiatan",
      title: "Empat hari yang menentukan awal kuliah Anda",
      lead: "Dari verifikasi peserta hingga upacara penutupan. Setiap sesi memerlukan presensi digital melalui portal.",
      action: { label: "Jadwal lengkap", href: "pkkmb.html#jadwal" },
    })}

    <ol class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      ${join(
        schedule.slice(0, 4).map(
          (d, i) => `
      <li class="card p-5" data-reveal>
        <div class="flex items-baseline justify-between gap-3">
          <span class="badge ${i === 0 ? "badge-accent" : "badge-brand"}">${esc(d.phase)}</span>
          <span class="font-display text-xs font-semibold text-ink-500">${d.time.split(" – ")[0]}</span>
        </div>
        <p class="mt-3.5 font-display text-sm font-semibold text-brand-700">${formatDate(d.date)}</p>
        <h3 class="mt-1 font-display text-base font-bold leading-snug text-ink-900">${esc(d.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed text-ink-600">${esc(d.summary)}</p>
        <p class="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-500">
          ${icon("pin", { class: "h-3.5 w-3.5" })}${esc(d.venue)}
        </p>
      </li>`,
        ),
      )}
    </ol>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Pengumuman + berita
 * ------------------------------------------------------------------ */

function newsroom() {
  const featured = sortedPosts.find((p) => p.pinned) ?? sortedPosts[0];
  const rest = sortedPosts.filter((p) => p !== featured).slice(0, 4);

  return `
<section class="shell py-16 md:py-20">
  <div class="grid gap-10 lg:grid-cols-12">

    <div class="lg:col-span-7">
      ${sectionHeading({
        eyebrow: "Pengumuman resmi",
        title: "Informasi wajib dibaca",
        lead: "Diterbitkan langsung oleh panitia PKKMB dan Humas Poliban.",
        action: { label: "Semua pengumuman", href: "pengumuman.html" },
      })}
      <div class="mt-7 space-y-3">
        ${join(announcements.map((p) => postRow(p)))}
      </div>
    </div>

    <div class="lg:col-span-5">
      <h2 class="font-display text-lg font-bold text-ink-900">Sorotan</h2>
      <div class="mt-4">${featuredPostCard(featured)}</div>
      <ul class="mt-4 divide-y divide-ink-200 border-t border-ink-200">
        ${join(
          rest.map(
            (p) => `
        <li class="group py-3.5">
          <a href="berita/${p.slug}.html" class="block">
            <p class="font-display text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">${esc(p.listTitle ?? p.title)}</p>
            <p class="mt-1 text-xs text-ink-500"><time datetime="${p.date}">${formatDate(p.date)}</time> · ${p.readMinutes} menit baca</p>
          </a>
        </li>`,
          ),
        )}
      </ul>
      <a href="berita.html" class="btn btn-secondary btn-sm mt-5 w-full">Jelajahi semua berita</a>
    </div>

  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Kabar resmi dari poliban.ac.id
 * ------------------------------------------------------------------ */

/**
 * Menampilkan berita terbaru dari situs institusi. Data berasal dari cache
 * WP REST API resmi; setiap entri hanya diringkas dan selalu menautkan
 * kembali ke laman aslinya.
 */
/**
 * Kabar resmi dari poliban.ac.id.
 *
 * Disusun editorial, bukan grid kartu seragam: satu berita utama mendapat
 * perlakuan visual terkuat, sisanya menjadi daftar ringkas yang lebih tenang.
 * Semua entri berasal dari cache WP REST API resmi dan menautkan artikel asli.
 */
function officialFeed() {
  const [lead, ...rest] = latestNews(5);
  if (!lead) return "";

  return `
<section class="border-y border-ink-200 bg-ink-50 py-14 md:py-18">
  <div class="shell">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="max-w-xl">
        <p class="eyebrow">Dari poliban.ac.id</p>
        <h2 class="mt-2 font-display text-2xl font-extrabold leading-tight text-ink-900 md:text-3xl">Kabar terbaru kampus</h2>
      </div>
      <a href="berita.html#kabar-kampus" class="btn btn-secondary btn-sm">
        <span>Semua kabar kampus</span>${icon("arrowRight", { class: "h-4 w-4" })}
      </a>
    </div>

    <div class="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-12">

      <article class="lg:col-span-6">
        <div class="flex flex-wrap items-center gap-2">
          ${join(lead.categories.slice(0, 2).map((c) => `<span class="badge badge-brand">${esc(c)}</span>`))}
          <time datetime="${esc(lead.date)}" class="text-xs text-ink-500">${formatDate(lead.date)}</time>
        </div>
        <h3 class="mt-3 font-display text-xl font-extrabold leading-tight text-ink-900 sm:text-2xl">
          <a href="${esc(lead.url)}" rel="noopener" class="transition-colors hover:text-brand-700">${esc(lead.title)}</a>
        </h3>
        <p class="mt-3 text-[0.95rem] leading-relaxed text-ink-600">${esc(lead.summary)}</p>
        <a href="${esc(lead.url)}" rel="noopener"
           class="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-700 hover:text-brand-800">
          Baca di poliban.ac.id ${icon("external", { class: "h-3.5 w-3.5" })}
        </a>
      </article>

      <ul class="divide-y divide-ink-200 border-t border-ink-200 lg:col-span-6 lg:border-t-0">
        ${join(
          rest.map(
            (n) => `
        <li class="group py-4 first:pt-0 lg:first:pt-0">
          <a href="${esc(n.url)}" rel="noopener" class="block">
            <p class="font-display text-[0.95rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">${esc(n.title)}</p>
            <p class="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-500">
              <time datetime="${esc(n.date)}">${formatDate(n.date)}</time>
              ${n.categories[0] ? `<span aria-hidden="true">·</span><span>${esc(n.categories[0])}</span>` : ""}
            </p>
          </a>
        </li>`,
          ),
        )}
      </ul>
    </div>

    <p class="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-ink-200 pt-5 text-xs text-ink-500">
      ${icon("info", { class: "h-4 w-4 shrink-0 text-ink-400" })}
      <span>Disegarkan dari
        <a href="${newsSource.url}" rel="noopener" class="font-medium text-brand-700 underline underline-offset-2">WP REST API resmi Poliban</a>
        pada ${formatDate(newsSource.fetchedAt)}.
        <a href="sumber.html" class="font-medium text-brand-700 underline underline-offset-2">Catatan sumber</a>.</span>
    </p>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Sambutan direktur
 * ------------------------------------------------------------------ */

function welcome() {
  return `
<section class="border-y border-ink-200 bg-ink-50 py-16 md:py-20">
  <div class="shell grid gap-10 lg:grid-cols-12 lg:items-center">
    <figure class="lg:col-span-4">
      <div class="relative mx-auto max-w-xs overflow-hidden rounded-[1rem] border border-ink-200 bg-white lg:max-w-none">
        <img src="${leader.photo}" alt="Potret ${esc(leader.name)}" width="459" height="667" loading="lazy" decoding="async"
             class="aspect-[3/4] w-full object-cover object-top">
      </div>
      <figcaption class="mt-4 text-center lg:text-left">
        <p class="font-display text-base font-bold text-ink-900">${esc(leader.name)}</p>
        <p class="mt-0.5 text-sm text-ink-500">${esc(leader.role)}</p>
      </figcaption>
    </figure>

    <div class="lg:col-span-8">
      <p class="eyebrow">Sambutan Direktur</p>
      <blockquote class="mt-4">
        <p class="font-display text-2xl font-extrabold leading-tight text-ink-900 md:text-[1.75rem]">
          “${esc(leader.quote)}”
        </p>
      </blockquote>
      <p class="mt-5 leading-relaxed text-ink-600">${esc(leader.speech[3])}</p>

      <dl class="mt-7 grid gap-4 sm:grid-cols-3">
        ${join(
          leader.themePillars.map(
            (p) => `
        <div class="rounded-lg border border-ink-200 bg-white p-4">
          <dt class="font-display text-sm font-bold text-brand-700">${esc(p.key)}</dt>
          <dd class="mt-1.5 clamp-4 text-xs leading-relaxed text-ink-600">${esc(p.body)}</dd>
        </div>`,
          ),
        )}
      </dl>

      <a href="profil.html#sambutan" class="btn btn-secondary btn-sm mt-7">
        Baca sambutan lengkap ${icon("arrowRight", { class: "h-4 w-4" })}
      </a>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Kampus: prodi + fasilitas + angka
 * ------------------------------------------------------------------ */

/**
 * Mengenal kampus.
 *
 * Sebelumnya bagian ini menumpuk empat kartu prodi dan tiga kartu fasilitas
 * yang semuanya menuntut perhatian setara. Sekarang: satu foto kampus sebagai
 * jangkar, rincian jurusan sebagai tabel ringkas yang benar-benar informatif,
 * dan fasilitas sebagai daftar tenang. Penjelajahan mendalam ada di halaman
 * program studi, bukan di beranda.
 */
function campus() {
  const byDept = departments.map((d) => ({
    ...d,
    count: programs.filter((p) => p.dept === d.id).length,
  }));
  const featured = facilities.filter((f) => f.featured);

  return `
<section class="shell py-16 md:py-20">
  ${sectionHeading({
    eyebrow: "Mengenal kampus",
    title: `${programStats.total} program studi dalam ${programStats.departments} jurusan`,
    lead: "Poliban menyelenggarakan pendidikan vokasi jenjang D2, D3, dan Sarjana Terapan. Berikut sebarannya menurut jurusan.",
    action: { label: "Telusuri program studi", href: "program-studi.html" },
  })}

  <div class="mt-9 grid gap-10 lg:grid-cols-12 lg:gap-12">

    <figure class="lg:col-span-5">
      <div class="overflow-hidden rounded-xl border border-ink-200">
        <picture>
          <source srcset="${assets.campusSignage.webp}" type="image/webp">
          <img src="${assets.campusSignage.file}" alt="${esc(assets.campusSignage.alt)}"
               width="${assets.campusSignage.width}" height="${assets.campusSignage.height}"
               loading="lazy" decoding="async"
               class="aspect-[4/3] w-full object-cover object-[50%_40%]">
        </picture>
      </div>
      <figcaption class="mt-2.5 text-xs leading-relaxed text-ink-500">
        Kampus Poliban, Jl. Brigjen H. Hasan Basri, Kayu Tangi, Banjarmasin — dokumentasi resmi Poliban.
      </figcaption>
    </figure>

    <div class="lg:col-span-7">
      <ul class="divide-y divide-ink-200 border-y border-ink-200">
        ${join(
          byDept.map(
            (d) => `
        <li class="group">
          <a href="program-studi.html#jurusan-${d.id}" class="flex items-center gap-4 py-4 transition-colors hover:bg-ink-50/70">
            <span class="min-w-0 flex-1">
              <span class="block font-display text-[0.95rem] font-bold text-ink-900 transition-colors group-hover:text-brand-700">Jurusan ${esc(d.name)}</span>
              <span class="mt-1 line-clamp-1 block text-xs leading-relaxed text-ink-500">${esc(d.blurb)}</span>
            </span>
            <span class="shrink-0 font-display text-sm font-semibold tabular-nums text-ink-600">${d.count} prodi</span>
            <span class="shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true">${icon("arrowRight", { class: "h-4 w-4" })}</span>
          </a>
        </li>`,
          ),
        )}
      </ul>

      <div class="mt-8">
        <h3 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Sarana utama</h3>
        <ul class="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          ${join(
            featured.map(
              (f) => `
          <li>
            <a href="fasilitas.html#${f.id}" class="group inline-flex items-baseline gap-2 py-1 text-sm">
              <span class="font-display font-semibold text-ink-800 transition-colors group-hover:text-brand-700">${esc(f.name)}</span>
              <span class="text-xs text-ink-500">${esc(f.kind)}</span>
            </a>
          </li>`,
            ),
          )}
        </ul>
        <a href="fasilitas.html" class="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-700 hover:text-brand-800">
          Semua fasilitas ${icon("arrowRight", { class: "h-4 w-4" })}
        </a>
      </div>
    </div>
  </div>

  <div class="mt-14">${statBlock(stats)}</div>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Halaman
 * ------------------------------------------------------------------ */

export default function render() {
  return page({
    title: "",
    canonical: "",
    active: "index.html",
    description: site.description,
    head: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "PKKMB 2026 Politeknik Negeri Banjarmasin",
      startDate: eventWindow.preStart,
      endDate: eventWindow.end,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      description: site.description,
      location: {
        "@type": "Place",
        name: site.institution,
        address: site.contact.address,
      },
      organizer: { "@type": "CollegeOrUniversity", name: site.institution, url: site.url },
    })}</script>`,
    body: join([
      hero(),
      urgentBar(),
      services(),
      timeline(),
      newsroom(),
      officialFeed(),
      welcome(),
      campus(),
      `<div class="shell pb-20">${calloutPortal()}</div>`,
    ]),
  });
}
