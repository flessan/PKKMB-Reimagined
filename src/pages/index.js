import { page } from "../components/layout.js";
import {
  sectionHeading,
  postCard,
  featuredPostCard,
  postRow,
  programCard,
  calloutPortal,
  statBlock,
} from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join, formatDate } from "../lib/html.js";
import { site } from "../data/site.js";
import { sortedPosts, announcements, news } from "../data/posts.js";
import { schedule, eventWindow } from "../data/schedule.js";
import { programs, programStats } from "../data/programs.js";
import { stats, quickServices, facilities, leader, vision } from "../data/campus.js";

/* ------------------------------------------------------------------ *
 * Hero — status kegiatan + aksi utama
 * ------------------------------------------------------------------ */

function hero() {
  const days = schedule.slice(0, 4);
  return `
<section class="relative isolate overflow-hidden bg-ink-950 text-white">
  <picture>
    <source srcset="assets/img/hero-campus.webp" type="image/webp">
    <img src="assets/img/hero-campus.jpg" alt="" width="1600" height="1067" fetchpriority="high" decoding="async"
         class="absolute inset-0 h-full w-full object-cover object-center opacity-30">
  </picture>
  <div class="absolute inset-0 bg-[linear-gradient(105deg,#091d34_18%,rgba(16,47,81,0.92)_52%,rgba(9,29,52,0.72)_100%)]"></div>
  <div class="absolute inset-0 grid-fine opacity-30" aria-hidden="true"></div>

  <div class="shell relative py-16 md:py-24 lg:py-28">
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-10">

      <div class="lg:col-span-7">
        <p class="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-2 pr-4 text-xs font-semibold">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-accent-400 px-2.5 py-1 font-display text-[0.65rem] uppercase tracking-wider text-ink-950">
            <span class="h-1.5 w-1.5 rounded-full bg-ink-950"></span>Resmi
          </span>
          <span class="text-white/80">Pengenalan Kehidupan Kampus bagi Mahasiswa Baru</span>
        </p>

        <h1 class="mt-6 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
          PKKMB <span class="text-accent-300">2026</span><br>Politeknik Negeri Banjarmasin
        </h1>

        <p class="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
          Semua yang perlu diketahui mahasiswa baru dalam satu tempat — jadwal, tata tertib,
          pengumuman resmi, dan portal presensi kehadiran.
        </p>

        <p class="mt-4 font-display text-base font-semibold text-accent-300">“${esc(site.tagline)}”</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a href="login.html" class="btn btn-invert btn-lg">
            ${icon("shield", { class: "h-5 w-5" })}<span>Masuk Portal PKKMB</span>
          </a>
          <a href="pkkmb.html" class="btn btn-outline-invert btn-lg">
            <span>Panduan peserta</span>${icon("arrowRight", { class: "h-4 w-4" })}
          </a>
        </div>

        <dl class="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6 text-sm">
          <div>
            <dt class="text-white/50">Pra-PKKMB</dt>
            <dd class="mt-0.5 font-display font-bold text-white">3 Agustus 2026</dd>
          </div>
          <div>
            <dt class="text-white/50">Kegiatan utama</dt>
            <dd class="mt-0.5 font-display font-bold text-white">4 – 6 Agustus 2026</dd>
          </div>
          <div>
            <dt class="text-white/50">Kuliah perdana</dt>
            <dd class="mt-0.5 font-display font-bold text-white">24 Agustus 2026</dd>
          </div>
        </dl>
      </div>

      <div class="lg:col-span-5 lg:pl-4">
        <div class="rounded-[1.25rem] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
          <div class="flex items-center justify-between gap-4">
            <h2 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-white/70">Status kegiatan</h2>
            <span class="badge badge-invert" data-event-status>Memuat…</span>
          </div>

          <p class="mt-4 font-display text-2xl font-extrabold leading-tight" data-event-headline>
            Rangkaian PKKMB 2026
          </p>
          <p class="mt-1.5 text-sm leading-relaxed text-white/65" data-event-detail>
            Pra-PKKMB 3 Agustus, kegiatan utama 4–6 Agustus 2026.
          </p>

          <ol class="mt-6 space-y-2.5" data-event-days>
            ${join(
              days.map(
                (d) => `
            <li class="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 transition-colors" data-day="${d.date}">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/10 font-display text-sm font-bold">${d.date.slice(8)}</span>
              <span class="min-w-0 flex-1">
                <span class="block truncate font-display text-sm font-semibold text-white">${esc(d.phase)}</span>
                <span class="block truncate text-xs text-white/55">${esc(d.title)}</span>
              </span>
            </li>`,
              ),
            )}
          </ol>

          <a href="pkkmb.html#jadwal" class="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-accent-300 hover:text-accent-400">
            Lihat jadwal lengkap ${icon("arrowRight", { class: "h-4 w-4" })}
          </a>
        </div>
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

function campus() {
  const highlights = [
    programs.find((p) => p.slug === "d3-teknik-informatika-475"),
    programs.find((p) => p.slug === "d4-teknologi-rekayasa-otomasi-113"),
    programs.find((p) => p.slug === "d4-bisnis-digital-394"),
    programs.find((p) => p.slug === "d4-teknik-bangunan-rawa-427"),
  ];

  return `
<section class="shell py-16 md:py-20">
  ${sectionHeading({
    eyebrow: "Mengenal kampus",
    title: `${programStats.total} program studi dalam ${programStats.departments} jurusan`,
    lead: "Kenali kembali pilihan program studi Anda — fokus keilmuan, lama studi, dan prospek kariernya.",
    action: { label: "Telusuri program studi", href: "program-studi.html" },
  })}

  <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    ${join(highlights.map((p) => programCard(p)))}
  </div>

  <div class="mt-14">${statBlock(stats)}</div>

  <div class="mt-14 grid gap-4 lg:grid-cols-3">
    ${join(
      facilities
        .filter((f) => f.featured)
        .map(
          (f) => `
    <a href="fasilitas.html#${f.id}" class="group relative overflow-hidden rounded-[1rem] border border-ink-200" data-reveal>
      <picture>
        <source srcset="${f.image.replace(".jpg", ".webp")}" type="image/webp">
        <img src="${f.image}" alt="" width="800" height="533" loading="lazy" decoding="async"
             class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]">
      </picture>
      <div class="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"></div>
      <div class="absolute inset-x-0 bottom-0 p-5 text-white">
        <span class="badge badge-invert">${esc(f.kind)}</span>
        <h3 class="mt-2 font-display text-lg font-bold">${esc(f.name)}</h3>
        <p class="mt-1 clamp-2 text-sm text-white/70">${esc(f.summary)}</p>
      </div>
    </a>`,
        ),
    )}
  </div>
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
      welcome(),
      campus(),
      `<div class="shell pb-20">${calloutPortal()}</div>`,
    ]),
  });
}
