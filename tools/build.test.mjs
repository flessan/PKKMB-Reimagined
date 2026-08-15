/**
 * Uji keluaran build.
 *
 *   npm test   (menjalankan `node --test tools/*.test.mjs`)
 *
 * Prasyarat: `npm run build` sudah dijalankan.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { posts, categories, sortedPosts } from "../src/data/posts.js";
import {
  programs,
  departments,
  programStats,
  programsSource,
} from "../src/data/programs.js";
import { schedule, faq } from "../src/data/schedule.js";
import { site, nav } from "../src/data/site.js";
import { esc, slugify, formatDate, formatDateLong, rel } from "../src/lib/html.js";
import { icon, iconNames } from "../src/lib/icons.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const read = (p) => readFile(join(dist, p), "utf8");

/** Semua berkas .html di bawah dist/, rekursif. */
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

before(() => {
  assert.ok(
    existsSync(join(dist, "index.html")),
    "dist/index.html tidak ada - jalankan `npm run build` terlebih dahulu.",
  );
});

/* ------------------------------------------------------------------ */

describe("utilitas html", () => {
  test("esc meng-escape karakter berbahaya", () => {
    assert.equal(esc('<a href="x">&\'</a>'), "&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;");
  });

  test("esc menangani null/undefined", () => {
    assert.equal(esc(null), "");
    assert.equal(esc(undefined), "");
  });

  test("slugify menghasilkan slug aman", () => {
    assert.equal(slugify("Visi & Misi Poliban"), "visi-misi-poliban");
    assert.equal(slugify("  D4 - Bisnis Digital  "), "d4-bisnis-digital");
  });

  test("format tanggal memakai bahasa Indonesia", () => {
    assert.equal(formatDate("2026-08-04"), "4 Agustus 2026");
    assert.equal(formatDateLong("2026-08-04"), "Selasa, 4 Agustus 2026");
    assert.equal(formatDateLong("2026-08-03"), "Senin, 3 Agustus 2026");
  });

  test("rel menyesuaikan kedalaman tanpa menyentuh URL absolut", () => {
    assert.equal(rel("index.html", 0), "index.html");
    assert.equal(rel("index.html", 1), "../index.html");
    assert.equal(rel("https://x.test/a", 2), "https://x.test/a");
    assert.equal(rel("mailto:a@b.c", 1), "mailto:a@b.c");
    assert.equal(rel("#bagian", 1), "#bagian");
  });
});

describe("ikon", () => {
  test("setiap ikon menghasilkan svg dengan aria-hidden secara default", () => {
    for (const name of iconNames) {
      const svg = icon(name);
      assert.match(svg, /^<svg /, `${name} bukan svg`);
      assert.match(svg, /aria-hidden="true"/, `${name} tidak aria-hidden`);
    }
  });

  test("ikon dengan judul menjadi role=img", () => {
    const svg = icon("mail", { title: "Surel" });
    assert.match(svg, /role="img"/);
    assert.match(svg, /aria-label="Surel"/);
  });

  test("ikon tak dikenal melempar galat", () => {
    assert.throws(() => icon("tidak-ada"), /Ikon tidak dikenal/);
  });
});

/* ------------------------------------------------------------------ */

describe("integritas data", () => {
  test("slug posting unik", () => {
    const slugs = posts.map((p) => p.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  test("kategori posting terdaftar", () => {
    for (const p of posts) {
      assert.ok(categories[p.category], `kategori tidak dikenal: ${p.category}`);
    }
  });

  test("setiap posting punya metadata lengkap", () => {
    for (const p of posts) {
      assert.match(p.date, /^\d{4}-\d{2}-\d{2}$/, `${p.slug}: tanggal tidak valid`);
      assert.ok(p.title?.length > 5, `${p.slug}: judul terlalu pendek`);
      assert.ok(p.excerpt?.length > 40, `${p.slug}: ringkasan terlalu pendek`);
      assert.ok(Array.isArray(p.body) && p.body.length, `${p.slug}: body kosong`);
      assert.ok(p.readMinutes > 0, `${p.slug}: readMinutes tidak valid`);
    }
  });

  test("lampiran menunjuk ke berkas yang ada", () => {
    for (const p of posts) {
      for (const a of p.attachments ?? []) {
        assert.ok(existsSync(join(dist, a.href)), `${p.slug}: lampiran hilang → ${a.href}`);
      }
    }
  });

  test("posting terurut dari yang terbaru", () => {
    for (let i = 1; i < sortedPosts.length; i += 1) {
      assert.ok(
        new Date(sortedPosts[i - 1].date) >= new Date(sortedPosts[i].date),
        "urutan posting tidak menurun",
      );
    }
  });

  test("22 program studi dalam 5 jurusan sesuai portal SPMB", () => {
    assert.equal(programs.length, 22);
    assert.equal(departments.length, 5);
    assert.equal(
      programStats.d2 + programStats.d3 + programStats.d4,
      programs.length,
    );
  });

  test("data prodi berasal dari cache portal resmi", () => {
    assert.equal(programsSource.sourceId, "pmb-prodi");
    assert.match(programsSource.url, /^https:\/\/pmb\.poliban\.ac\.id\//);
    assert.match(programsSource.fetchedAt, /^\d{4}-\d{2}-\d{2}$/);
  });

  test("akreditasi tidak diseragamkan dan hanya memakai nilai resmi", () => {
    const allowed = new Set(["Unggul", "Baik Sekali", "Baik", "A", "B", "C", null]);
    for (const p of programs) {
      assert.ok(
        allowed.has(p.accreditation),
        `${p.slug}: nilai akreditasi tak dikenal (${p.accreditation})`,
      );
    }
    // Portal resmi mencantumkan nilai berbeda-beda; bila seragam, ada yang salah.
    const distinct = new Set(programs.map((p) => p.accreditation));
    assert.ok(distinct.size > 1, "akreditasi seluruh prodi seragam - periksa sumber");
  });

  test("slug program studi unik dan jurusannya valid", () => {
    const slugs = programs.map((p) => p.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    const ids = new Set(departments.map((d) => d.id));
    for (const p of programs) {
      assert.ok(p.slug, `pmbId ${p.pmbId}: slug hilang`);
      assert.ok(ids.has(p.dept), `${p.slug}: jurusan tidak dikenal`);
      assert.ok(["D2", "D3", "D4"].includes(p.level), `${p.slug}: jenjang tidak valid`);
      assert.match(p.pmbId, /^\d+$/, `${p.slug}: pmbId tidak valid`);
    }
  });

  test("URL prodi lama tetap dipertahankan", () => {
    const legacy = [
      "d3-teknik-informatika-475",
      "d4-teknik-bangunan-rawa-427",
      "d3-akuntansi-891",
      "d4-bisnis-digital-394",
    ];
    for (const slug of legacy) {
      assert.ok(
        programs.some((p) => p.slug === slug),
        `slug lama hilang: ${slug}`,
      );
    }
  });

  test("setiap jurusan memiliki minimal dua prodi", () => {
    for (const d of departments) {
      const n = programs.filter((p) => p.dept === d.id).length;
      assert.ok(n >= 2, `jurusan ${d.id} hanya punya ${n} prodi`);
    }
  });

  test("jadwal berurutan dan mencakup 3–6 Agustus", () => {
    const dates = schedule.map((s) => s.date);
    assert.deepEqual(dates.slice(0, 4), [
      "2026-08-03",
      "2026-08-04",
      "2026-08-05",
      "2026-08-06",
    ]);
    for (let i = 1; i < dates.length; i += 1) {
      assert.ok(new Date(dates[i]) > new Date(dates[i - 1]), "jadwal tidak menaik");
    }
  });

  test("navigasi hanya menunjuk ke halaman yang dibangun", () => {
    const flat = nav.flatMap((n) => [n, ...(n.children ?? [])]);
    for (const item of flat) {
      const path = item.href.split("#")[0];
      assert.ok(existsSync(join(dist, path)), `nav menunjuk ke halaman hilang: ${path}`);
    }
  });
});

/* ------------------------------------------------------------------ */

describe("keluaran build", () => {
  test("semua halaman inti dihasilkan", async () => {
    const expected = [
      "index.html",
      "pkkmb.html",
      "berita.html",
      "pengumuman.html",
      "program-studi.html",
      "profil.html",
      "fasilitas.html",
      "kontak.html",
      "login.html",
      "sitemap.xml",
      "robots.txt",
      "assets/app.css",
      "assets/app.js",
      "assets/favicon.svg",
    ];
    for (const f of expected) {
      assert.ok(existsSync(join(dist, f)), `berkas hilang: ${f}`);
    }
  });

  test("satu halaman per posting dan per program studi", () => {
    for (const p of posts) assert.ok(existsSync(join(dist, `berita/${p.slug}.html`)));
    for (const p of programs)
      assert.ok(existsSync(join(dist, `program-studi/${p.slug}.html`)));
  });

  test("URL profil lama dialihkan ke halaman gabungan", async () => {
    const map = {
      "profil/sejarah.html": "sejarah",
      "profil/visi-misi.html": "visi-misi",
      "profil/struktur.html": "struktur",
      "profil/rektor.html": "sambutan",
    };
    for (const [file, anchor] of Object.entries(map)) {
      const html = await read(file);
      assert.match(html, /http-equiv="refresh"/, `${file} bukan pengalihan`);
      assert.match(html, new RegExp(`\\.\\./profil\\.html#${anchor}`), `${file} salah target`);
    }
  });

  test("beranda memuat elemen pusat kendali PKKMB", async () => {
    const html = await read("index.html");
    assert.match(html, /Masuk Portal PKKMB/);
    assert.match(html, /data-event-status/, "penanda status kegiatan tidak ada");
    assert.match(html, /Bersinergi, Berinovasi, dan Berdampak/);
    assert.match(html, /3 Agustus 2026/);
    assert.match(html, /24 Agustus 2026/);
    assert.match(html, /id="konten"/, "target skip link tidak ada");
  });

  test("halaman login mempertahankan alur autentikasi asli", async () => {
    const html = await read("login.html");
    assert.match(html, /method="POST"/i);
    assert.match(html, new RegExp(site.auth.action.replace(/[/.]/g, "\\$&")));
    assert.match(html, /name="_token"/, "field CSRF hilang");
    assert.match(html, /name="email"/);
    assert.match(html, /name="password"/);
    assert.match(html, /name="remember"/);
    assert.match(html, /accounts\.google\.com/, "OAuth Google hilang");
    assert.match(html, /name="csrf-token"/, "meta csrf-token hilang");
  });

  test("login tidak diindeks mesin pencari", async () => {
    const html = await read("login.html");
    assert.match(html, /name="robots" content="noindex"/);
    const robots = await read("robots.txt");
    assert.match(robots, /Disallow: \/login\.html/);
  });

  test("setiap halaman memuat CSS, JS, dan bahasa Indonesia", async () => {
    for (const f of ["index.html", "pkkmb.html", "login.html", "berita.html"]) {
      const html = await read(f);
      assert.match(html, /<html lang="id"/);
      assert.match(html, /assets\/app\.css/);
      assert.match(html, /assets\/app\.js/);
    }
  });

  test("halaman dalam subdirektori memakai jalur relatif yang benar", async () => {
    const html = await read(`berita/${posts[0].slug}.html`);
    assert.match(html, /href="\.\.\/assets\/app\.css"/);
    assert.match(html, /src="\.\.\/assets\/app\.js"/);
    assert.ok(!/href="assets\//.test(html), "jalur aset tidak diperbaiki untuk subdirektori");
  });

  test("tidak ada sisa markup situs lama", async () => {
    for (const f of ["index.html", "berita.html", "login.html", "profil.html"]) {
      const html = await read(f);
      assert.ok(!html.includes("HTTrack"), `${f}: komentar HTTrack tersisa`);
      assert.ok(!html.includes("Banjarmasn"), `${f}: salah ketik nama institusi`);
      assert.ok(!html.includes("Login - Laravel"), `${f}: judul Laravel tersisa`);
      assert.ok(!/href="#"/.test(html), `${f}: tautan placeholder tersisa`);
      assert.ok(!html.includes("Total Kunjungan"), `${f}: penghitung palsu tersisa`);
      assert.ok(!html.includes("images.unsplash.com"), `${f}: gambar pihak ketiga tersisa`);
      assert.ok(!html.includes("Pimpinan Rektor"), `${f}: nomenklatur rektor tersisa`);
    }
  });

  test("sitemap memuat seluruh halaman publik tanpa login", async () => {
    const xml = await read("sitemap.xml");
    assert.match(xml, /<loc>https:\/\/pkkmb\.poliban\.ac\.id\/<\/loc>/);
    assert.ok(!xml.includes("login.html"), "login tidak boleh ada di sitemap");
    for (const p of programs) assert.ok(xml.includes(`program-studi/${p.slug}.html`));
    for (const p of posts) assert.ok(xml.includes(`berita/${p.slug}.html`));
  });

  test("halaman prodi menampilkan data prodi bersangkutan", async () => {
    const p = programs.find((x) => x.slug === "d4-teknik-bangunan-rawa-427");
    const html = await read(`program-studi/${p.slug}.html`);
    assert.match(html, /Teknik Bangunan Rawa/);
    assert.match(html, /Sarjana Terapan/);
    assert.ok(html.includes(p.accreditation), "akreditasi resmi tidak tampil");
    assert.ok(html.includes(p.detailUrl), "tautan portal SPMB tidak tampil");
    for (const c of p.careers) assert.ok(html.includes(esc(c)), `karier hilang: ${c}`);
  });

  test("prodi tanpa akreditasi resmi tidak menebak nilai", async () => {
    const p = programs.find((x) => x.accreditation === null);
    if (!p) return;
    const html = await read(`program-studi/${p.slug}.html`);
    assert.match(html, /Belum tercantum pada sumber resmi/);
  });

  test("halaman PKKMB memuat jadwal, unduhan, dan FAQ", async () => {
    const html = await read("pkkmb.html");
    assert.match(html, /id="jadwal"/);
    assert.match(html, /id="unduhan"/);
    assert.match(html, /id="faq"/);
    for (const item of faq) assert.ok(html.includes(esc(item.q)), `FAQ hilang: ${item.q}`);
  });

  test("konten asli yang penting dipertahankan", async () => {
    const tatib = await read("berita/tata-tertib-pkkmb-967.html");
    assert.match(tatib, /Sertifikat PKKMB merupakan salah satu syarat wajib/);

    const twibbon = await read("berita/frame-video-dan-instagram-pkkmb-187.html");
    assert.match(twibbon, /twibbonize\.com\/poliban-pkkmb2026/);
    assert.match(twibbon, /#pkkmbpoliban/);

    const profil = await read("profil.html");
    assert.match(profil, /Joni Riadi/);
    assert.match(profil, /Politeknik Mekanik Swiss/);
    assert.match(profil, /Unggul Dalam Sains Terapan/);

    const kontak = await read("kontak.html");
    assert.match(kontak, /330 5052/);
    assert.match(kontak, /info@poliban\.ac\.id/);
    assert.match(kontak, /google\.com\/maps\/embed/);
  });

  test("metadata sosial dan data terstruktur tersedia", async () => {
    const html = await read("index.html");
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /application\/ld\+json/);
    const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
    const data = JSON.parse(ld);
    assert.equal(data["@type"], "Event");
    assert.equal(data.startDate, "2026-08-03");
  });

  test("aset JS tetap ramping", async () => {
    const js = await read("assets/app.js");
    assert.ok(js.length < 25_000, `app.js terlalu besar: ${js.length} bait`);
    const css = await read("assets/app.css");
    assert.ok(css.length < 80_000, `app.css terlalu besar: ${css.length} bait`);
  });

  test("dukungan gerak minimal dan fokus terlihat ada di CSS", async () => {
    const css = await read("assets/app.css");
    assert.match(css, /prefers-reduced-motion/);
    assert.match(css, /:focus-visible/);
  });
});

describe("metadata & konfigurasi penerbitan", () => {
  test("setiap halaman terindeks punya kanonik absolut yang cocok dengan lokasinya", async () => {
    const files = await walk(dist);
    for (const file of files) {
      const rel = file.replace(dist + "/", "");
      if (rel.startsWith("profil/")) continue; // pengalihan meta-refresh
      const html = await readFile(file, "utf8");

      if (rel === "login.html") {
        assert.ok(!/rel="canonical"/.test(html), "login.html seharusnya tanpa kanonik");
        assert.match(html, /name="robots" content="noindex"/);
        continue;
      }

      const m = html.match(/<link rel="canonical" href="([^"]+)">/);
      assert.ok(m, `${rel}: tidak ada kanonik`);
      const expected =
        rel === "index.html"
          ? "https://pkkmb.poliban.ac.id/"
          : `https://pkkmb.poliban.ac.id/${rel}`;
      assert.equal(m[1], expected, `${rel}: kanonik tidak cocok`);
    }
  });

  test("og:url selalu sama dengan kanonik", async () => {
    const files = await walk(dist);
    for (const file of files) {
      const rel = file.replace(dist + "/", "");
      if (rel.startsWith("profil/") || rel === "login.html") continue;
      const html = await readFile(file, "utf8");
      const can = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
      const og = html.match(/property="og:url" content="([^"]+)"/)?.[1];
      assert.equal(og, can, `${rel}: og:url berbeda dari kanonik`);
    }
  });

  test("kartu pratinjau memuat dimensi dan teks alternatif gambar", async () => {
    const html = await read("index.html");
    assert.match(html, /og:image:width" content="1200"/);
    assert.match(html, /og:image:height" content="630"/);
    assert.match(html, /og:image:alt" content="[^"]+"/);
  });

  test("sitemap memuat tepat halaman yang boleh diindeks", async () => {
    const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
    const locs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
    const base = "https://pkkmb.poliban.ac.id/";

    assert.ok(!locs.has(`${base}login.html`), "login.html tidak boleh ada di sitemap");
    for (const l of locs) {
      assert.ok(!l.includes("/profil/"), `pengalihan ikut ter-sitemap: ${l}`);
    }

    const files = await walk(dist);
    for (const file of files) {
      const rel = file.replace(dist + "/", "");
      if (rel.startsWith("profil/") || rel === "login.html") continue;
      const url = rel === "index.html" ? base : base + rel;
      assert.ok(locs.has(url), `${rel} hilang dari sitemap`);
    }
  });

  test("robots.txt melarang halaman login dan menunjuk sitemap", async () => {
    const robots = await readFile(join(dist, "robots.txt"), "utf8");
    assert.match(robots, /Disallow: \/login\.html/);
    assert.match(robots, /Sitemap: https:\/\/pkkmb\.poliban\.ac\.id\/sitemap\.xml/);
  });
});

describe("integritas artefak build", () => {
  test("CSS terkirim dalam keadaan terminifikasi", async () => {
    /*
     * `npm run build:html` saja tidak menjalankan langkah Tailwind, sehingga
     * dist/ bisa tertinggal memakai CSS lama atau versi tak terminifikasi.
     * Ciri paling jelas: berkas terminifikasi hampir tanpa baris baru.
     */
    const css = await readFile(join(dist, "assets/app.css"), "utf8");
    const lines = css.split("\n").length;
    assert.ok(
      lines <= 5,
      `app.css tampak tidak terminifikasi (${lines} baris). Jalankan \`npm run build\`, bukan hanya build:html.`,
    );
    assert.ok(css.length > 20_000, "app.css terlalu kecil - kompilasi gagal?");
    assert.ok(css.length < 120_000, "app.css membengkak di luar dugaan");
  });

  test("aset runtime yang dirujuk benar-benar ada", async () => {
    for (const f of [
      "assets/app.css",
      "assets/app.js",
      "assets/favicon.svg",
      "assets/apple-touch-icon.png",
      "assets/fonts/plus-jakarta-sans-latin.woff2",
      "assets/fonts/inter-latin.woff2",
    ]) {
      assert.ok(existsSync(join(dist, f)), `aset runtime hilang: ${f}`);
    }
  });

  test("dokumen resmi PDF ikut tersalin", async () => {
    const dir = join(dist, "storage/post-attachments");
    assert.ok(existsSync(dir), "direktori lampiran tidak tersalin");
    const files = await readdir(dir);
    const pdfs = files.filter((f) => f.endsWith(".pdf"));
    assert.equal(pdfs.length, 4, `jumlah PDF resmi berubah: ${pdfs.length}`);
  });
});
