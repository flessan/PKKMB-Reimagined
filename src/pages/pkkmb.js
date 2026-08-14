import { page } from "../components/layout.js";
import { pageHeader, sectionHeading, attachmentCard, calloutPortal } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join, formatDateLong } from "../lib/html.js";
import { schedule, participantSteps, faq } from "../data/schedule.js";
import { posts } from "../data/posts.js";
import { assets } from "../data/assets.js";
import { pkkmbNews } from "../data/news.js";

function heroAside() {
  return `
<div class="rounded-[1rem] border border-ink-200 bg-white p-5">
  <h2 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Ringkasan</h2>
  <dl class="mt-4 space-y-3.5 text-sm">
    <div class="flex items-start gap-3">
      ${icon("calendar", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}
      <div><dt class="font-display font-semibold text-ink-900">3 – 6 Agustus 2026</dt><dd class="text-ink-500">Pra-PKKMB dan tiga hari kegiatan utama</dd></div>
    </div>
    <div class="flex items-start gap-3">
      ${icon("pin", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}
      <div><dt class="font-display font-semibold text-ink-900">Kampus Poliban</dt><dd class="text-ink-500">Jl. Brigjen H. Hasan Basri, Kayu Tangi</dd></div>
    </div>
    <div class="flex items-start gap-3">
      ${icon("users", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}
      <div><dt class="font-display font-semibold text-ink-900">Seluruh mahasiswa baru</dt><dd class="text-ink-500">1.817 peserta tahun akademik 2026/2027</dd></div>
    </div>
    <div class="flex items-start gap-3">
      ${icon("checkCircle", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}
      <div><dt class="font-display font-semibold text-ink-900">Sertifikat PKKMB</dt><dd class="text-ink-500">Syarat mengikuti UAS serta kelulusan</dd></div>
    </div>
  </dl>
  <a href="login.html" class="btn btn-primary mt-5 w-full">Masuk Portal PKKMB</a>
</div>

<figure class="mt-4 overflow-hidden rounded-[1rem] border border-ink-200 bg-white">
  <picture>
    <source srcset="${assets.pkkmbDirector.webp}" type="image/webp">
    <img src="${assets.pkkmbDirector.file}" alt="${esc(assets.pkkmbDirector.alt)}"
         width="${assets.pkkmbDirector.width}" height="${assets.pkkmbDirector.height}"
         loading="lazy" decoding="async"
         class="aspect-[16/10] w-full object-cover object-[50%_35%]">
  </picture>
  <figcaption class="border-t border-ink-200 px-4 py-3 text-xs leading-relaxed text-ink-500">
    ${esc(assets.pkkmbDirector.caption)}. Suasana kegiatan tahun sebelumnya — dokumentasi resmi Poliban.
  </figcaption>
</figure>

<blockquote class="mt-4 rounded-[1rem] border border-brand-200 bg-brand-50 p-5">
  <p class="text-sm italic leading-relaxed text-ink-700">
    “Pembekalan mencakup pengenalan lingkungan akademik, wawasan kebangsaan sebagai bekal
    memasuki dunia pendidikan tinggi, serta penanaman nilai-nilai kedisiplinan.”
  </p>
  <footer class="mt-3 text-xs text-ink-600">
    <span class="font-display font-semibold text-ink-900">Joni Riadi, S.ST., M.T.</span> — Direktur Poliban,
    <a href="${pkkmbNews.url}" rel="noopener" class="text-brand-700 underline underline-offset-2">siaran resmi 7 Agustus 2026</a>
  </footer>
</blockquote>`;
}

function steps() {
  return `
<section class="shell py-16 md:py-20" id="alur">
  ${sectionHeading({
    eyebrow: "Alur peserta",
    title: "Lima langkah sebelum dan selama kegiatan",
    lead: "Ikuti urutan berikut agar Anda tidak tertinggal informasi maupun presensi.",
  })}

  <ol class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
    ${join(
      participantSteps.map(
        (s) => `
    <li class="card p-5" data-reveal>
      <span class="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 font-display text-sm font-bold text-white">${s.step}</span>
      <h3 class="mt-4 font-display text-base font-bold leading-snug text-ink-900">${esc(s.title)}</h3>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-ink-600">${esc(s.body)}</p>
      <a href="${s.action.href}" class="mt-4 inline-flex items-center gap-1 font-display text-sm font-semibold text-brand-700 hover:text-brand-800">
        ${esc(s.action.label)} ${icon("arrowRight", { class: "h-3.5 w-3.5" })}
      </a>
    </li>`,
      ),
    )}
  </ol>
</section>`;
}

function scheduleSection() {
  return `
<section class="border-y border-ink-200 bg-ink-50 py-16 md:py-20" id="jadwal">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Jadwal",
      title: "Rangkaian lengkap PKKMB 2026",
      lead: "Waktu dapat menyesuaikan kondisi lapangan. Perubahan diumumkan melalui halaman pengumuman resmi.",
      action: { label: "Unduh rundown", href: "berita/run-down-acara-pkkmb-poliban-341.html" },
    })}

    <div class="relative mt-10 pl-10">
      <div class="timeline-rail" aria-hidden="true"></div>
      <ol class="space-y-4">
        ${join(
          schedule.map(
            (d, i) => `
        <li class="relative" data-reveal>
          <span class="absolute -left-10 top-4 grid h-8 w-8 place-items-center rounded-full border-2 ${
            i === schedule.length - 1
              ? "border-ink-300 bg-white text-ink-500"
              : "border-brand-600 bg-brand-600 text-white"
          } font-display text-xs font-bold">${i === schedule.length - 1 ? icon("flag", { class: "h-3.5 w-3.5" }) : i + 1}</span>

          <article class="card p-5 md:p-6">
            <div class="flex flex-wrap items-center gap-2.5">
              <span class="badge ${i === 0 ? "badge-accent" : i === schedule.length - 1 ? "badge-neutral" : "badge-brand"}">${esc(d.phase)}</span>
              <time datetime="${d.date}" class="font-display text-sm font-semibold text-ink-900">${formatDateLong(d.date)}</time>
            </div>

            <h3 class="mt-3 font-display text-xl font-bold leading-snug text-ink-900">${esc(d.title)}</h3>
            <p class="mt-2 leading-relaxed text-ink-600">${esc(d.summary)}</p>

            <dl class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
              <div class="inline-flex items-center gap-1.5">${icon("clock", { class: "h-4 w-4" })}<dt class="sr-only">Waktu</dt><dd>${esc(d.time)}</dd></div>
              <div class="inline-flex items-center gap-1.5">${icon("pin", { class: "h-4 w-4" })}<dt class="sr-only">Lokasi</dt><dd>${esc(d.venue)}</dd></div>
            </dl>

            <ul class="mt-4 grid gap-2 border-t border-ink-200 pt-4 sm:grid-cols-2">
              ${join(
                d.items.map(
                  (it) =>
                    `<li class="flex gap-2 text-sm text-ink-600">${icon("check", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}<span>${esc(it)}</span></li>`,
                ),
              )}
            </ul>
          </article>
        </li>`,
          ),
        )}
      </ol>
    </div>
  </div>
</section>`;
}

function checklist() {
  /**
   * Ringkasan norma yang tercantum eksplisit pada pos Tata Tertib resmi.
   * Rincian atribut ada di lampiran PDF, karena itu bagian ini menautkannya
   * alih-alih mencantumkan daftar yang tidak dapat diverifikasi.
   */
  const principles = [
    "Memahami dan mematuhi norma serta aturan selama rangkaian kegiatan",
    "Menjaga lingkungan yang aman, inklusif, dan kondusif",
    "Melatih kedisiplinan dan rasa saling menghormati",
    "Membangun sinergi awal di kampus vokasi",
  ];
  const guarantees = [
    "Kegiatan berlangsung menyenangkan dan bebas kekerasan",
    "Tidak ada tindakan diskriminatif maupun perpeloncoan",
    "Kampus mengusung slogan happy and friendly",
  ];

  return `
<section class="shell py-16 md:py-20" id="persiapan">
  ${sectionHeading({
    eyebrow: "Persiapan",
    title: "Apa yang perlu Anda siapkan",
    lead: "Ringkasan dari pos Tata Tertib resmi. Dokumen PDF tetap menjadi acuan utama.",
  })}

  <div class="mt-9 grid gap-4 lg:grid-cols-2">
    <div class="card p-6">
      <h3 class="inline-flex items-center gap-2 font-display text-base font-bold text-ink-900">
        ${icon("checkCircle", { class: "h-5 w-5 text-brand-600" })} Yang diharapkan dari peserta
      </h3>
      <ul class="mt-4 space-y-2.5">
        ${join(
          principles.map(
            (b) =>
              `<li class="flex gap-2 text-sm text-ink-600">${icon("check", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}<span>${esc(b)}</span></li>`,
          ),
        )}
      </ul>
      <p class="mt-4 rounded-lg bg-ink-50 px-4 py-3 text-xs leading-relaxed text-ink-600">
        Ketentuan atribut, perlengkapan wajib, dan sanksi tercantum lengkap pada dokumen resmi.
      </p>
      <a href="berita/tata-tertib-pkkmb-967.html" class="btn btn-secondary btn-sm mt-4">Baca tata tertib lengkap</a>
    </div>

    <div class="card p-6">
      <h3 class="inline-flex items-center gap-2 font-display text-base font-bold text-ink-900">
        ${icon("shield", { class: "h-5 w-5 text-brand-600" })} Komitmen panitia
      </h3>
      <ul class="mt-4 space-y-2.5">
        ${join(
          guarantees.map(
            (b) =>
              `<li class="flex gap-2 text-sm text-ink-600">${icon("check", { class: "mt-0.5 h-4 w-4 shrink-0 text-brand-600" })}<span>${esc(b)}</span></li>`,
          ),
        )}
      </ul>
      <blockquote class="mt-4 border-l-3 border-brand-500 bg-brand-50 py-3 pl-4 pr-3 text-sm italic leading-relaxed text-ink-700">
        “Kita ingin mereka bangga punya kampus dan bisa kuliah di Poliban.”
        <span class="mt-1.5 block not-italic text-xs text-ink-500">Joni Riadi, Direktur Poliban</span>
      </blockquote>
    </div>
  </div>
</section>`;
}

function downloads() {
  const files = posts.flatMap((p) =>
    (p.attachments ?? []).map((a) => ({ ...a, from: p })),
  );
  return `
<section class="border-y border-ink-200 bg-ink-50 py-16 md:py-20" id="unduhan">
  <div class="shell">
    ${sectionHeading({
      eyebrow: "Unduhan",
      title: "Dokumen resmi PKKMB 2026",
      lead: "Seluruh berkas berformat PDF dan diterbitkan oleh panitia.",
    })}
    <div class="mt-9 grid gap-3 sm:grid-cols-2">
      ${join(files.map((f) => attachmentCard(f)))}
    </div>
  </div>
</section>`;
}

function faqSection() {
  return `
<section class="shell py-16 md:py-20" id="faq">
  <div class="grid gap-10 lg:grid-cols-12">
    <div class="lg:col-span-4">
      ${sectionHeading({
        eyebrow: "Pertanyaan umum",
        title: "Kendala yang paling sering ditanyakan",
        lead: "Belum menemukan jawabannya? Panitia siap membantu melalui kanal resmi.",
      })}
      <a href="kontak.html" class="btn btn-secondary btn-sm mt-6">Hubungi panitia ${icon("arrowRight", { class: "h-4 w-4" })}</a>
    </div>

    <div class="lg:col-span-8">
      <div class="divide-y divide-ink-200 border-y border-ink-200">
        ${join(
          faq.map(
            (f) => `
        <details class="group py-4">
          <summary class="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-semibold text-ink-900">
            <span>${esc(f.q)}</span>
            <span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-500 transition-transform group-open:rotate-180">
              ${icon("chevronDown", { class: "h-3.5 w-3.5", stroke: 2.2 })}
            </span>
          </summary>
          <p class="mt-3 pr-10 text-sm leading-relaxed text-ink-600">${esc(f.a)}</p>
        </details>`,
          ),
        )}
      </div>
    </div>
  </div>
</section>`;
}

export default function render() {
  return page({
    title: "Panduan Peserta PKKMB 2026",
    canonical: "pkkmb.html",
    active: "pkkmb.html",
    description:
      "Panduan lengkap peserta PKKMB 2026 Politeknik Negeri Banjarmasin: alur pendaftaran, jadwal 3–6 Agustus 2026, perlengkapan wajib, unduhan dokumen, dan pertanyaan umum.",
    head: `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    })}</script>`,
    body: join([
      pageHeader({
        eyebrow: "PKKMB 2026",
        title: "Panduan peserta dari awal sampai selesai",
        lead: "Satu halaman berisi seluruh hal yang perlu Anda lakukan sebagai mahasiswa baru Politeknik Negeri Banjarmasin — mulai dari menyiapkan akun portal hingga menerima sertifikat.",
        crumbs: [{ label: "Beranda", href: "index.html" }, { label: "PKKMB 2026" }],
        aside: heroAside(),
      }),
      steps(),
      scheduleSection(),
      checklist(),
      downloads(),
      faqSection(),
      `<div class="shell pb-20">${calloutPortal()}</div>`,
    ]),
  });
}
