import { page, brandMark } from "../components/layout.js";
import { icon } from "../lib/icons.js";
import { esc, join } from "../lib/html.js";
import { site } from "../data/site.js";
import { assets } from "../data/assets.js";

/**
 * Portal PKKMB.
 *
 * Perilaku autentikasi dipertahankan persis seperti aplikasi aslinya:
 *  - `POST` ke endpoint Laravel dengan field `_token`, `email`, `password`, `remember`
 *  - tautan OAuth Google
 * Yang berubah hanya presentasi, aksesibilitas, dan penanganan galat di sisi klien.
 */

/**
 * Token CSRF dari mirror. Nilainya statis pada keluaran statis.
 *
 * PENERAPAN: ketika halaman ini kembali dilayani oleh Laravel, ganti nilai ini
 * dengan `{{ csrf_token() }}` (atau suntikkan saat runtime) agar perlindungan
 * CSRF berfungsi penuh. Nama field dan endpoint tidak boleh diubah.
 */
const CSRF_TOKEN = "5Du7cJaeR7nXIbsWFHM9sV7jU9V7U1c6VEYpYz5e";

function assurances() {
  return [
    {
      icon: "checkCircle",
      title: "Presensi tiap sesi",
      body: "Catat kehadiran Anda pada setiap sesi PKKMB secara digital.",
    },
    {
      icon: "document",
      title: "Rekap & sertifikat",
      body: "Pantau rekapitulasi kehadiran yang menjadi dasar terbitnya sertifikat.",
    },
    {
      icon: "bell",
      title: "Informasi resmi",
      body: "Terima pemberitahuan perubahan jadwal langsung dari panitia.",
    },
  ];
}

function panel() {
  return `
<aside class="relative hidden overflow-hidden bg-ink-950 text-white lg:flex lg:w-[46%] lg:shrink-0 lg:flex-col lg:justify-between">
  <div class="absolute inset-0 bg-[linear-gradient(160deg,#17457a_0%,#102f51_45%,#091d34_100%)]"></div>
  <div class="absolute inset-0 grid-fine opacity-30" aria-hidden="true"></div>

  <div class="relative p-10 xl:p-14">
    ${brandMark({ tone: "dark" })}
  </div>

  <div class="relative px-10 pb-10 xl:px-14 xl:pb-14">
    <p class="badge badge-invert">Portal peserta</p>
    <h2 class="mt-4 font-display text-[2rem] font-extrabold leading-[1.15] xl:text-[2.5rem]">
      Sistem presensi<br>PKKMB 2026
    </h2>
    <p class="mt-4 max-w-md leading-relaxed text-white/65">
      Monitoring kehadiran kegiatan Pengenalan Kehidupan Kampus bagi Mahasiswa Baru
      secara digital, transparan, dan akurat.
    </p>

    <ul class="mt-8 space-y-4 border-t border-white/10 pt-8">
      ${join(
        assurances().map(
          (a) => `
      <li class="flex gap-3.5">
        <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 text-accent-300">${icon(a.icon, { class: "h-4.5 w-4.5" })}</span>
        <span>
          <span class="block font-display text-sm font-semibold text-white">${esc(a.title)}</span>
          <span class="mt-0.5 block text-sm text-white/55">${esc(a.body)}</span>
        </span>
      </li>`,
        ),
      )}
    </ul>

    <figure class="mt-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
      <picture>
        <source srcset="${assets.banner.webp}" type="image/webp">
        <img src="${assets.banner.file}" alt="${esc(assets.banner.alt)}"
             width="${assets.banner.width}" height="${assets.banner.height}"
             loading="lazy" decoding="async" class="w-full rounded">
      </picture>
    </figure>

    <p class="mt-6 text-xs text-white/40">© ${site.year} ${esc(site.organiser)}</p>
  </div>
</aside>`;
}

function form() {
  return `
<div class="flex flex-1 flex-col">
  <div class="flex items-center justify-between gap-4 border-b border-ink-200 px-5 py-4 lg:justify-end lg:border-0 lg:px-10 lg:py-6">
    <span class="lg:hidden">${brandMark({ compact: true })}</span>
    <a href="index.html" class="btn btn-ghost btn-sm">
      ${icon("arrowRight", { class: "h-4 w-4 rotate-180" })}<span>Kembali ke situs</span>
    </a>
  </div>

  <div class="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
    <div class="w-full max-w-[26rem]">
      <h1 class="font-display text-[1.75rem] font-extrabold leading-tight text-ink-900">Masuk ke Portal PKKMB</h1>
      <p class="mt-2 text-sm leading-relaxed text-ink-600">
        Gunakan alamat email yang telah didaftarkan panitia untuk melakukan presensi kehadiran.
      </p>

      <div class="mt-6 hidden items-start gap-2.5 rounded-lg border border-accent-300 bg-accent-100/60 px-4 py-3 text-sm text-ink-800"
           role="alert" data-login-error>
        ${icon("alert", { class: "mt-0.5 h-4 w-4 shrink-0 text-accent-600" })}
        <span data-login-error-text></span>
      </div>

      <form method="POST" action="${site.auth.action}" class="mt-7 space-y-5" data-login-form>
        <input type="hidden" name="_token" value="${CSRF_TOKEN}" autocomplete="off" data-csrf-field>

        <div>
          <label for="email" class="field-label">Alamat email</label>
          <input id="email" name="email" type="email" required autofocus autocomplete="username"
                 inputmode="email" spellcheck="false" placeholder="nama@contoh.com"
                 class="field" aria-describedby="email-catatan">
          <p id="email-catatan" class="mt-1.5 text-xs text-ink-500">
            Email institusi atau email pribadi yang Anda daftarkan.
          </p>
        </div>

        <div>
          <div class="flex items-baseline justify-between gap-3">
            <label for="password" class="field-label">Kata sandi</label>
            <a href="kontak.html" class="text-xs font-medium text-brand-700 underline-offset-2 hover:underline">Lupa kata sandi?</a>
          </div>
          <div class="relative">
            <input id="password" name="password" type="password" required autocomplete="current-password"
                   placeholder="Masukkan kata sandi" class="field !pr-11">
            <button type="button"
                    class="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
                    data-toggle-password aria-controls="password" aria-pressed="false">
              <span class="sr-only" data-toggle-password-label>Tampilkan kata sandi</span>
              <span data-icon-show>${icon("eye", { class: "h-4.5 w-4.5" })}</span>
              <span data-icon-hide hidden>${icon("eyeOff", { class: "h-4.5 w-4.5" })}</span>
            </button>
          </div>
        </div>

        <label for="remember_me" class="flex cursor-pointer items-center gap-2.5">
          <input id="remember_me" name="remember" type="checkbox" value="1"
                 class="h-4 w-4 rounded border-ink-300 text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
          <span class="text-sm text-ink-600">Ingat saya di perangkat ini</span>
        </label>

        <button type="submit" class="btn btn-primary w-full !py-3">
          ${icon("lock", { class: "h-4 w-4" })}<span>Masuk</span>
        </button>
      </form>

      <div class="my-6 flex items-center gap-3">
        <span class="h-px flex-1 bg-ink-200"></span>
        <span class="text-xs font-medium text-ink-400">atau</span>
        <span class="h-px flex-1 bg-ink-200"></span>
      </div>

      <a href="${site.auth.google}" class="btn btn-secondary w-full !py-3">
        <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>Lanjutkan dengan Google</span>
      </a>

      <p class="mt-7 flex items-start gap-2 rounded-lg bg-ink-50 px-4 py-3 text-xs leading-relaxed text-ink-500">
        ${icon("shield", { class: "mt-0.5 h-4 w-4 shrink-0 text-ink-400" })}
        <span>Sistem hanya mengizinkan login bagi akun yang telah terdaftar secara resmi oleh
        administrator. Belum bisa masuk? <a href="kontak.html" class="font-medium text-brand-700 underline-offset-2 hover:underline">Hubungi panitia</a>.</span>
      </p>
    </div>
  </div>
</div>`;
}

export default function render() {
  return page({
    bare: true,
    title: "Masuk Portal PKKMB",
    // Halaman ini di-noindex, jadi tidak diberi kanonik maupun og:url.
    noindex: true,
    description:
      "Portal presensi PKKMB 2026 Politeknik Negeri Banjarmasin. Masuk dengan akun yang telah didaftarkan panitia untuk mencatat kehadiran kegiatan.",
    head: `<meta name="csrf-token" content="${CSRF_TOKEN}">
<meta name="robots" content="noindex">`,
    bodyClass: "bg-white",
    body: `<div class="flex min-h-dvh">
${panel()}
${form()}
</div>`,
  });
}
