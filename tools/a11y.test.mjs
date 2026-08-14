/**
 * Uji aksesibilitas statis: kontras token warna dan pola markup penting.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

/* ------------------------------------------------------------------ *
 * Kontras
 * ------------------------------------------------------------------ */

const channel = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** Harus sinkron dengan @theme pada src/styles/app.css. */
const T = {
  white: "#ffffff",
  brand50: "#eef5fc",
  brand600: "#1d5697",
  brand700: "#17457a",
  brand800: "#143a64",
  accent100: "#fdf0d2",
  accent300: "#f4c765",
  accent400: "#eab134",
  accent500: "#a06a10",
  accent600: "#8a5a10",
  ink50: "#f7f8fa",
  ink100: "#eef0f4",
  ink500: "#5d6775",
  ink600: "#515c6c",
  ink700: "#3e4756",
  ink900: "#1a1f2b",
  ink950: "#0e121a",
};

/** [nama, latar depan, latar belakang, ambang] */
const COMBINATIONS = [
  ["teks isi", T.ink700, T.white, 4.5],
  ["teks sekunder di putih", T.ink500, T.white, 4.5],
  ["teks sekunder di ink-50", T.ink500, T.ink50, 4.5],
  ["teks sekunder di ink-100", T.ink500, T.ink100, 4.5],
  ["judul", T.ink900, T.white, 4.5],
  ["tautan", T.brand700, T.white, 4.5],
  ["eyebrow di ink-50", T.brand600, T.ink50, 4.5],
  ["tombol utama", T.white, T.brand600, 4.5],
  ["tombol invert", T.brand800, T.white, 4.5],
  ["badge brand", T.brand700, T.brand50, 4.5],
  ["badge accent", T.accent600, T.accent100, 4.5],
  ["badge neutral", T.ink600, T.ink100, 4.5],
  ["tanda wajib pada form", T.accent500, T.white, 4.5],
  ["teks pada latar gelap", T.white, T.ink950, 4.5],
  ["aksen pada latar gelap", T.accent300, T.ink950, 4.5],
  ["badge accent-400 di gelap", T.ink950, T.accent400, 4.5],
];

describe("kontras warna (WCAG AA)", () => {
  for (const [name, fg, bg, min] of COMBINATIONS) {
    test(`${name} ≥ ${min}:1`, () => {
      const r = contrast(fg, bg);
      assert.ok(r >= min, `kontras hanya ${r.toFixed(2)}:1 (${fg} di atas ${bg})`);
    });
  }

  test("token pada CSS sesuai nilai yang diuji", async () => {
    const css = await readFile(join(dist, "assets/app.css"), "utf8");
    const checks = {
      "--color-brand-600": T.brand600,
      "--color-ink-500": T.ink500,
      "--color-accent-600": T.accent600,
    };
    for (const [token, value] of Object.entries(checks)) {
      assert.ok(
        css.includes(`${token}:${value}`),
        `${token} pada CSS berbeda dari nilai uji (${value})`,
      );
    }
  });
});

/* ------------------------------------------------------------------ *
 * Pola markup
 * ------------------------------------------------------------------ */

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

let pages = [];

before(async () => {
  const files = (await walk(dist)).filter((f) => !f.includes("/profil/"));
  pages = await Promise.all(
    files.map(async (f) => ({ name: f.replace(dist + "/", ""), html: await readFile(f, "utf8") })),
  );
});

describe("pola aksesibilitas markup", () => {
  test("setiap halaman punya skip link menuju konten utama", () => {
    for (const { name, html } of pages) {
      if (name === "login.html") continue; // halaman fokus tunggal, tanpa navigasi
      assert.match(html, /href="#konten"/, `${name}: skip link hilang`);
      assert.match(html, /id="konten"/, `${name}: target konten hilang`);
    }
  });

  test("landmark utama tersedia", () => {
    for (const { name, html } of pages) {
      assert.match(html, /<main[\s>]/, `${name}: <main> hilang`);
      if (name === "login.html") continue;
      assert.match(html, /<header[\s>]/, `${name}: <header> hilang`);
      assert.match(html, /<footer[\s>]/, `${name}: <footer> hilang`);
      assert.match(html, /<nav[^>]+aria-label="Navigasi utama"/, `${name}: nav utama tak berlabel`);
    }
  });

  test("tombol ikon memiliki nama aksesibel", () => {
    for (const { name, html } of pages) {
      for (const m of html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/g)) {
        const [tag, inner] = [m[0], m[1]];
        if (/aria-label=|aria-labelledby=/.test(tag)) continue;
        const text = inner
          .replace(/<svg[\s\S]*?<\/svg>/g, "")
          .replace(/<[^>]+>/g, "")
          .trim();
        assert.ok(text.length > 0, `${name}: tombol tanpa nama aksesibel → ${tag.slice(0, 90)}`);
      }
    }
  });

  test("kontrol interaktif tidak menghapus indikator fokus", () => {
    for (const { name, html } of pages) {
      assert.ok(
        !/class="[^"]*\bfocus:outline-none\b[^"]*"/.test(html),
        `${name}: focus:outline-none menghilangkan indikator fokus`,
      );
    }
  });

  test("elemen dekoratif disembunyikan dari pembaca layar", () => {
    for (const { name, html } of pages) {
      for (const m of html.matchAll(/<svg[^>]*>/g)) {
        assert.ok(
          /aria-hidden="true"|role="img"/.test(m[0]),
          `${name}: svg tanpa aria-hidden/role → ${m[0].slice(0, 80)}`,
        );
      }
    }
  });

  test("dropdown navigasi dapat dioperasikan papan ketik", async () => {
    const html = pages.find((p) => p.name === "index.html").html;
    assert.match(html, /<button[^>]+data-dropdown-trigger/, "pemicu dropdown bukan <button>");
    assert.match(html, /aria-expanded="false"/, "aria-expanded tidak disetel");
    assert.match(html, /aria-controls="menu-/, "aria-controls tidak disetel");
  });

  test("gambar dekoratif memakai alt kosong, gambar informatif tidak", () => {
    for (const { name, html } of pages) {
      for (const m of html.matchAll(/<img\s[^>]*>/g)) {
        const alt = m[0].match(/\salt="([^"]*)"/);
        assert.ok(alt, `${name}: <img> tanpa alt`);
        if (alt[1].length > 0) {
          assert.ok(
            !/^(image|gambar|foto|picture)$/i.test(alt[1].trim()),
            `${name}: alt tidak deskriptif → "${alt[1]}"`,
          );
        }
      }
    }
  });

  test("formulir login memiliki label eksplisit", async () => {
    const html = pages.find((p) => p.name === "login.html").html;
    assert.match(html, /<label[^>]+for="email"/);
    assert.match(html, /<label[^>]+for="password"/);
    assert.match(html, /<label[^>]+for="remember_me"/);
    assert.match(html, /aria-describedby="email-catatan"/);
  });
});

/* ------------------------------------------------------------------ *
 * Ketahanan tanpa JavaScript
 * ------------------------------------------------------------------ */

describe("berfungsi tanpa JavaScript", () => {
  test("menu seluler memakai disclosure native", () => {
    const html = pages.find((p) => p.name === "index.html").html;
    assert.match(html, /<details[^>]+data-menu/, "menu seluler bukan <details>");
    assert.match(html, /<summary[^>]+data-menu-toggle/, "pemicu menu bukan <summary>");
  });

  test("konten reveal hanya disembunyikan bila JS aktif", async () => {
    const css = await readFile(join(dist, "assets/app.css"), "utf8");
    assert.match(css, /\.js \[data-reveal\]/, "reveal tidak digerbangi kelas .js");
    assert.ok(
      !/^\[data-reveal\]\{opacity:0/m.test(css),
      "data-reveal disembunyikan tanpa syarat",
    );
  });

  test("daftar berita & prodi tetap tampil lengkap pada HTML", () => {
    const berita = pages.find((p) => p.name === "berita.html").html;
    const prodi = pages.find((p) => p.name === "program-studi.html").html;
    assert.equal((berita.match(/data-post(?![\w-])/g) ?? []).length, 5);
    assert.equal((prodi.match(/data-program(?![\w-])/g) ?? []).length, 22);
  });

  test("formulir kontak dan login tetap dapat dikirim tanpa skrip", () => {
    const login = pages.find((p) => p.name === "login.html").html;
    assert.match(login, /<form[^>]+method="POST"[^>]+action="https:\/\//);
    const kontak = pages.find((p) => p.name === "kontak.html").html;
    assert.match(kontak, /mailto:info@poliban\.ac\.id/, "alamat surel cadangan hilang");
  });
});

describe("ketahanan tanpa JavaScript (lanjutan)", () => {
  const read = (f) => readFile(join(dist, f), "utf8");

  test("status kegiatan sudah terisi di HTML statis", async () => {
    const html = await read("index.html");
    const m = html.match(/data-event-status[^>]*>([^<]*)</);
    assert.ok(m, "penanda status kegiatan tidak ditemukan");
    const text = m[1].trim();
    assert.ok(
      ["Segera", "Berlangsung", "Selesai", "Arsip"].includes(text),
      `status harus sudah final di HTML, bukan "${text}"`,
    );
    // Hanya cari placeholder sesungguhnya ("Memuat…" sebagai isi elemen),
    // bukan kata "memuat" yang sah di dalam teks alternatif gambar.
    assert.ok(
      !/>\s*Memuat[.\u2026]/.test(html),
      "masih ada teks placeholder 'Memuat…' yang menunggu JavaScript",
    );
  });

  test("judul dan keterangan status juga dirender server", async () => {
    const html = await read("index.html");
    const headline = html.match(/data-event-headline[^>]*>([^<]*)</);
    const detail = html.match(/data-event-detail[^>]*>([^<]*)</);
    assert.ok(headline && headline[1].trim().length > 8, "judul status kosong");
    assert.ok(detail && detail[1].trim().length > 20, "keterangan status kosong");
  });

  test("tanggal build dicatat agar skrip tahu kapan perlu menghitung ulang", async () => {
    const html = await read("index.html");
    assert.match(html, /data-built="\d{4}-\d{2}-\d{2}"/, "data-built tidak ada");
  });

  test("penjelajah prodi tetap menampilkan seluruh prodi tanpa JS", async () => {
    const html = await read("program-studi.html");
    const rows = html.match(/<li[^>]*data-program(?![\w-])/g) ?? [];
    assert.equal(rows.length, 22, "jumlah baris prodi statis tidak sesuai");
    for (const attr of ["data-level=", "data-dept=", "data-search="]) {
      const n = (html.match(new RegExp(attr, "g")) ?? []).length;
      assert.ok(n >= 22, `${attr} kurang dari jumlah prodi`);
    }
  });

  test("navigasi dalam halaman PKKMB memakai jangkar biasa", async () => {
    const html = await read("pkkmb.html");
    for (const id of ["alur", "jadwal", "unduhan", "persiapan", "faq"]) {
      assert.ok(html.includes(`href="#${id}"`), `tautan #${id} tidak ada`);
      assert.ok(html.includes(`id="${id}"`), `target #${id} tidak ada`);
    }
  });

  test("tombol portal tetap ada pada lebar ponsel", async () => {
    for (const file of ["index.html", "pkkmb.html", "berita.html"]) {
      const html = await read(file);
      const btn = html.match(/<a[^>]+href="[^"]*login\.html"[^>]*class="[^"]*btn-primary[^"]*"[^>]*>/);
      assert.ok(btn, `${file}: tombol portal di header tidak ditemukan`);
      assert.ok(
        !/\bhidden\b(?![^"]*inline)/.test(btn[0]),
        `${file}: tombol portal tersembunyi di layar kecil`,
      );
      assert.match(btn[0], /aria-label="[^"]+"/, `${file}: tombol portal tanpa aria-label`);
    }
  });
});
