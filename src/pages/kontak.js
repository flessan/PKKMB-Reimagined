import { page } from "../components/layout.js";
import { pageHeader, sectionHeading } from "../components/ui.js";
import { icon } from "../lib/icons.js";
import { esc, join } from "../lib/html.js";
import { site } from "../data/site.js";
import { faq } from "../data/schedule.js";

const channels = [
  {
    icon: "whatsapp",
    title: "WhatsApp bantuan peserta",
    value: site.contact.whatsapp,
    href: site.contact.whatsappHref,
    note: "Kanal tercepat selama rangkaian PKKMB berlangsung.",
    primary: true,
  },
  {
    icon: "mail",
    title: "Surel resmi",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    note: "Untuk keperluan administratif dan surat resmi.",
  },
  {
    icon: "phone",
    title: "Telepon / faks kampus",
    value: site.contact.phone,
    href: site.contact.phoneHref,
    note: "Nomor resmi yang tercantum pada situs Poliban.",
  },
  {
    icon: "support",
    title: "Hotline akademik & penerimaan",
    value: site.contact.hotline,
    href: site.contact.hotlineHref,
    note: `Kanal SPMB Poliban. Surel: ${site.contact.academicEmail}`,
  },
  {
    icon: "pin",
    title: "Alamat kampus",
    value: site.contact.address,
    href: site.contact.mapEmbed ? "#peta" : null,
    note: "Kampus utama Politeknik Negeri Banjarmasin.",
  },
];

function contactChannels() {
  return `
<section class="shell py-14 md:py-20">
  <div class="grid gap-10 lg:grid-cols-12">
    <div class="lg:col-span-5">
      ${sectionHeading({
    eyebrow: "Kanal resmi",
    title: "Hubungi panitia melalui kanal berikut",
    lead: "Sebutkan nama lengkap, program studi, dan kendala Anda agar penanganan lebih cepat.",
  })}

      <div class="mt-8 space-y-3">
        ${join(
    channels.map(
      (c) => `
        <div class="card ${c.primary ? "border-brand-300 bg-brand-50/50" : ""} flex-row items-start gap-4 p-5">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg ${c.primary ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-600"}">
            ${icon(c.icon, { class: "h-5 w-5" })}
          </span>
          <div class="min-w-0">
            <h3 class="font-display text-sm font-bold text-ink-900">${esc(c.title)}</h3>
            ${c.href
          ? `<a href="${c.href}"${c.href.startsWith("http") ? ' rel="noopener"' : ""} class="mt-1 block break-words font-medium text-brand-700 underline-offset-2 hover:underline">${esc(c.value)}</a>`
          : `<p class="mt-1 break-words font-medium text-ink-800">${esc(c.value)}</p>`
        }
            <p class="mt-1 text-xs text-ink-500">${esc(c.note)}</p>
          </div>
        </div>`,
    ),
  )}
      </div>

      <div class="mt-6">
        <h3 class="font-display text-sm font-bold uppercase tracking-[0.12em] text-ink-500">Media sosial</h3>
        <ul class="mt-3 flex flex-wrap gap-2">
          ${join(
    site.social.map(
      (s) =>
        `<li><a href="${s.href}" rel="noopener" class="btn btn-secondary btn-sm">${icon(s.icon, { class: "h-4 w-4" })}<span>${esc(s.short)}</span></a></li>`,
    ),
  )}
        </ul>
      </div>
    </div>

    <div class="lg:col-span-7">
      ${messageForm()}
    </div>
  </div>
</section>`;
}

/**
 * Form pesan. Situs ini statis, sehingga form disusun sebagai `mailto:`
 * yang dirakit di sisi klien - tanpa backend palsu, dan tetap berfungsi.
 */
function messageForm() {
  const subjects = [
    "Kendala akun Portal PKKMB",
    "Pertanyaan jadwal & lokasi",
    "Ketidakhadiran / izin",
    "Informasi program studi",
    "Lainnya",
  ];

  return `
<div class="card p-6 md:p-8">
  <h2 class="font-display text-xl font-extrabold text-ink-900">Kirim pesan ke panitia</h2>
  <p class="mt-2 text-sm leading-relaxed text-ink-600">
    Formulir ini menyiapkan surel dari aplikasi email Anda ke
    <a href="mailto:${site.contact.email}" class="font-medium text-brand-700 underline-offset-2 hover:underline">${esc(site.contact.email)}</a>.
    Untuk kendala mendesak, gunakan WhatsApp bantuan.
  </p>

  <form class="mt-6 grid gap-4 sm:grid-cols-2" data-mail-form data-mail-to="${site.contact.email}" novalidate>
    <div>
      <label for="nama" class="field-label">Nama lengkap <span class="text-accent-600" aria-hidden="true">*</span></label>
      <input id="nama" name="nama" type="text" required autocomplete="name" class="field" placeholder="Nama sesuai data peserta">
      <p class="mt-1.5 hidden text-xs text-accent-600" data-error-for="nama" role="alert"></p>
    </div>

    <div>
      <label for="prodi" class="field-label">Program studi</label>
      <input id="prodi" name="prodi" type="text" class="field" placeholder="Misal: D3 Teknik Informatika">
    </div>

    <div>
      <label for="email" class="field-label">Alamat email <span class="text-accent-600" aria-hidden="true">*</span></label>
      <input id="email" name="email" type="email" required autocomplete="email" class="field" placeholder="nama@contoh.com"
             aria-describedby="email-bantuan">
      <p id="email-bantuan" class="mt-1.5 text-xs text-ink-500">Gunakan email yang terdaftar di Portal PKKMB.</p>
      <p class="mt-1.5 hidden text-xs text-accent-600" data-error-for="email" role="alert"></p>
    </div>

    <div>
      <label for="subjek" class="field-label">Topik <span class="text-accent-600" aria-hidden="true">*</span></label>
      <select id="subjek" name="subjek" required class="field">
        ${join(subjects.map((s) => `<option>${esc(s)}</option>`))}
      </select>
    </div>

    <div class="sm:col-span-2">
      <label for="pesan" class="field-label">Isi pesan <span class="text-accent-600" aria-hidden="true">*</span></label>
      <textarea id="pesan" name="pesan" rows="5" required class="field resize-y" placeholder="Jelaskan kendala atau pertanyaan Anda selengkap mungkin."></textarea>
      <p class="mt-1.5 hidden text-xs text-accent-600" data-error-for="pesan" role="alert"></p>
    </div>

    <div class="flex flex-wrap items-center gap-3 sm:col-span-2">
      <button type="submit" class="btn btn-primary">${icon("mail", { class: "h-4 w-4" })}<span>Siapkan surel</span></button>
      <a href="${site.contact.whatsappHref}" rel="noopener" class="btn btn-secondary">${icon("whatsapp", { class: "h-4 w-4" })}<span>Chat WhatsApp</span></a>
    </div>

    <p class="hidden rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800 sm:col-span-2" role="status" data-mail-status></p>
  </form>
</div>`;
}

function mapSection() {
  return `
<section class="border-t border-ink-200 bg-ink-50 py-16" id="peta">
  <div class="shell">
    ${sectionHeading({
    eyebrow: "Lokasi",
    title: "Kampus Politeknik Negeri Banjarmasin",
    lead: esc(site.contact.address),
  })}
    <div class="mt-8 overflow-hidden rounded-[1rem] border border-ink-200 bg-white">
      <iframe src="${site.contact.mapEmbed}" title="Peta lokasi Politeknik Negeri Banjarmasin"
              width="100%" height="440" style="border:0" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" class="block w-full"></iframe>
    </div>
  </div>
</section>`;
}

function quickAnswers() {
  return `
<section class="shell py-16">
  ${sectionHeading({
    eyebrow: "Sebelum menghubungi",
    title: "Mungkin jawabannya sudah ada di sini",
    action: { label: "Semua pertanyaan umum", href: "pkkmb.html#faq" },
  })}
  <div class="mt-8 grid gap-4 md:grid-cols-3">
    ${join(
    faq.slice(2, 5).map(
      (f) => `
    <article class="card p-5">
      <h3 class="font-display text-base font-bold leading-snug text-ink-900">${esc(f.q)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-ink-600">${esc(f.a)}</p>
    </article>`,
    ),
  )}
  </div>
</section>`;
}

export default function render() {
  return page({
    title: "Kontak & Bantuan",
    canonical: "kontak.html",
    active: "kontak.html",
    description:
      "Kanal resmi panitia PKKMB 2026 Politeknik Negeri Banjarmasin: WhatsApp bantuan, surel, telepon, dan lokasi kampus.",
    body: join([
      pageHeader({
        eyebrow: "Bantuan",
        title: "Kontak & bantuan peserta",
        lead: "Menemui kendala akun, jadwal, atau administrasi? Hubungi panitia melalui kanal resmi berikut.",
        crumbs: [{ label: "Beranda", href: "index.html" }, { label: "Kontak" }],
      }),
      contactChannels(),
      quickAnswers(),
      mapSection(),
    ]),
  });
}
