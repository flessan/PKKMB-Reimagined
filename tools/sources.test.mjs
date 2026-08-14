/**
 * Menjaga integritas faktual situs.
 *
 * Uji ini memastikan konten tetap dapat ditelusuri ke sumber resmi, tidak ada
 * angka lama yang tak terverifikasi yang kembali masuk, dan setiap aset visual
 * memiliki metadata sumber beserta atribusinya.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { sources, source } from "../src/data/sources.js";
import { assets, attributedAssets } from "../src/data/assets.js";
import {
  programs,
  programsSource,
  programStats,
  programsWithoutAccreditation,
} from "../src/data/programs.js";
import { stats, leader, leadership, facilities, history } from "../src/data/campus.js";
import { site } from "../src/data/site.js";
import { officialNews, newsSource } from "../src/data/news.js";
import { emblem } from "../src/data/emblem.js";

/** Meniru esc() milik situs agar teks feed dapat dicocokkan pada HTML. */
const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

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
  assert.ok(existsSync(dist), "jalankan `npm run build` dahulu");
  const files = await walk(dist);
  pages = await Promise.all(
    files.map(async (f) => ({
      name: f.replace(dist + "/", ""),
      html: await readFile(f, "utf8"),
    })),
  );
});

/* ------------------------------------------------------------------ */

describe("registri sumber", () => {
  test("setiap sumber lengkap dan memakai HTTPS", () => {
    for (const [id, s] of Object.entries(sources)) {
      assert.ok(s.label, `${id}: label kosong`);
      assert.ok(s.publisher, `${id}: publisher kosong`);
      assert.match(s.url, /^https:\/\//, `${id}: URL bukan HTTPS`);
      assert.match(s.checked, /^\d{4}-\d{2}-\d{2}$/, `${id}: tanggal periksa tidak valid`);
      assert.ok(
        ["official", "press", "commons"].includes(s.status),
        `${id}: status tidak dikenal`,
      );
    }
  });

  test("sumber utama berasal dari domain resmi Poliban", () => {
    const official = Object.values(sources).filter((s) => s.status === "official");
    assert.ok(official.length >= 8, "sumber resmi terlalu sedikit");
    for (const s of official) {
      assert.match(
        s.url,
        /^https:\/\/(pkkmb|pmb)?\.?poliban\.ac\.id/,
        `bukan domain poliban: ${s.url}`,
      );
    }
  });

  test("setiap sourceId yang dirujuk data benar-benar ada", () => {
    const referenced = [
      programsSource.sourceId,
      history.sourceId,
      leader.sourceId,
      ...leader.pkkmbQuotes.map((q) => q.sourceId),
      ...stats.map((s) => s.sourceId),
      ...facilities.map((f) => f.sourceId),
      ...Object.values(assets).map((a) => a.sourceId),
    ].filter(Boolean);

    for (const id of referenced) {
      assert.doesNotThrow(() => source(id), `sourceId tidak terdaftar: ${id}`);
    }
  });

  test("halaman sumber diterbitkan dan menautkan tiap sumber", () => {
    const page = pages.find((p) => p.name === "sumber.html");
    assert.ok(page, "sumber.html tidak dibangun");
    for (const s of Object.values(sources)) {
      assert.ok(page.html.includes(s.url), `URL sumber tidak tampil: ${s.url}`);
    }
  });
});

/* ------------------------------------------------------------------ */

describe("aset visual", () => {
  test("setiap aset punya metadata sumber dan berkasnya ada", async () => {
    for (const [id, a] of Object.entries(assets)) {
      assert.ok(a.origin, `${id}: origin kosong`);
      assert.ok(a.owner, `${id}: owner kosong`);
      assert.ok(a.alt, `${id}: alt kosong`);
      assert.ok(a.sourceId, `${id}: sourceId kosong`);
      assert.doesNotThrow(() => source(a.sourceId), `${id}: sourceId tidak dikenal`);
      assert.ok(
        existsSync(join(dist, a.file)),
        `${id}: berkas tidak ada di dist (${a.file})`,
      );
      const { size } = await stat(join(dist, a.file));
      assert.ok(size > 1000, `${id}: berkas mencurigakan kecil (${size} bait)`);
    }
  });

  test("aset berlisensi wajib menampilkan atribusi pada halaman pemakainya", () => {
    for (const a of attributedAssets) {
      assert.ok(a.attribution, "atribusi belum ditulis");
      const users = pages.filter((p) => p.html.includes(a.file));
      assert.ok(users.length > 0, `aset tidak dipakai: ${a.file}`);
      for (const page of users) {
        assert.ok(
          page.html.includes(a.attribution),
          `${page.name}: memuat ${a.file} tanpa atribusi`,
        );
      }
    }
  });

  test("tidak ada hotlink gambar ke pihak ketiga", () => {
    for (const { name, html } of pages) {
      for (const m of html.matchAll(/<img[^>]+src="(https?:[^"]+)"/g)) {
        assert.fail(`${name}: gambar di-hotlink dari ${m[1]}`);
      }
      for (const m of html.matchAll(/<source[^>]+srcset="(https?:[^"]+)"/g)) {
        assert.fail(`${name}: source di-hotlink dari ${m[1]}`);
      }
    }
  });


  test("setiap gambar di keluaran terdaftar pada sistem metadata aset", () => {
    const known = new Set();
    for (const a of Object.values(assets)) {
      known.add(a.file);
      if (a.webp) known.add(a.webp);
    }
    // Aset non-foto yang memang bukan bagian dari pustaka bermetadata.
    const infra = [/^assets\/favicon\.svg$/, /^assets\/apple-touch-icon\.png$/];

    for (const { name, html } of pages) {
      const depth = name.split("/").length - 1;
      const norm = (src) => src.replace(/^(\.\.\/)+/, "");
      for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
        const src = norm(m[1]);
        if (src.startsWith("data:")) continue;
        if (infra.some((r) => r.test(src))) continue;
        assert.ok(
          known.has(src),
          `${name}: gambar "${src}" tidak terdaftar di src/data/assets.js`,
        );
        assert.equal(
          depth > 0 ? m[1].startsWith("../") : true,
          true,
          `${name}: jalur gambar tidak relatif terhadap kedalaman halaman`,
        );
      }
      for (const m of html.matchAll(/<source[^>]+srcset="([^"]+)"/g)) {
        const src = norm(m[1]);
        assert.ok(
          known.has(src),
          `${name}: srcset "${src}" tidak terdaftar di src/data/assets.js`,
        );
      }
    }
  });

  test("gambar bermakna punya alt deskriptif, dekoratif ditandai kosong", () => {
    for (const { name, html } of pages) {
      for (const m of html.matchAll(/<img[^>]*>/g)) {
        const tag = m[0];
        const alt = tag.match(/\salt="([^"]*)"/);
        assert.ok(alt, `${name}: <img> tanpa atribut alt → ${tag.slice(0, 80)}`);
        const src = tag.match(/src="([^"]+)"/)?.[1] ?? "";
        if (alt[1] === "") continue; // dekoratif — sah
        assert.ok(
          alt[1].length >= 12,
          `${name}: alt terlalu pendek untuk ${src} → "${alt[1]}"`,
        );
        assert.ok(
          !/^(gambar|foto|image|logo)$/i.test(alt[1].trim()),
          `${name}: alt tidak deskriptif untuk ${src}`,
        );
      }
    }
  });

  test("gambar menyatakan dimensi agar tata letak tidak bergeser", () => {
    for (const { name, html } of pages) {
      for (const m of html.matchAll(/<img[^>]*>/g)) {
        const tag = m[0];
        assert.ok(
          /\swidth="\d+"/.test(tag) && /\sheight="\d+"/.test(tag),
          `${name}: <img> tanpa width/height → ${tag.slice(0, 90)}`,
        );
      }
    }
  });

  test("lambang resmi tidak diregangkan", () => {
    // Rasio asli harus dipertahankan pada atribut width/height.
    for (const id of ["crest", "wordmark"]) {
      const a = assets[id];
      const ratio = a.width / a.height;
      for (const { name, html } of pages) {
        const re = new RegExp(`<img[^>]+src="[^"]*${a.file.split("/").pop()}"[^>]*>`, "g");
        for (const m of html.matchAll(re)) {
          const w = Number(m[0].match(/\swidth="(\d+)"/)?.[1]);
          const h = Number(m[0].match(/\sheight="(\d+)"/)?.[1]);
          if (!w || !h) continue;
          const used = w / h;
          assert.ok(
            Math.abs(used - ratio) / ratio < 0.06,
            `${name}: lambang ${id} diregangkan (${w}×${h}, rasio asli ${ratio.toFixed(3)})`,
          );
        }
      }
    }
  });

  test("tidak ada sisa citra hasil AI dari iterasi sebelumnya", () => {
    const banned = [
      "hero-campus",
      "kampus-aerial",
      "fasilitas-perpustakaan",
      "fasilitas-tik",
      "fasilitas-gor",
    ];
    for (const { name, html } of pages) {
      for (const b of banned) {
        assert.ok(!html.includes(b), `${name}: masih memuat aset lama "${b}"`);
      }
    }
  });
});

/* ------------------------------------------------------------------ */

describe("tidak ada fakta fabrikasi", () => {
  test("angka mirror yang tak terverifikasi tidak muncul kembali", () => {
    // 4.617 mahasiswa & 205 dosen berasal dari mirror lama tanpa sumber resmi.
    const banned = ["4.617", "4617", "205 ", "Akreditasi Institusi"];
    const statsPages = pages.filter(
      (p) => p.name === "index.html" || p.name === "profil.html",
    );
    for (const { name, html } of statsPages) {
      for (const b of banned) {
        assert.ok(!html.includes(b), `${name}: memuat angka tak terverifikasi "${b}"`);
      }
    }
  });

  test("statistik hanya memakai angka bersumber", () => {
    for (const s of stats) {
      assert.ok(s.sourceId, `statistik "${s.label}" tanpa sourceId`);
      assert.ok(Number.isInteger(s.value), `statistik "${s.label}" bukan bilangan bulat`);
    }
    const peserta = stats.find((s) => s.label.includes("Mahasiswa baru"));
    assert.equal(peserta.value, 1817, "jumlah peserta PKKMB tidak sesuai sumber resmi");
  });

  test("nama dan gelar pimpinan sesuai laman resmi", () => {
    assert.equal(leader.name, "Joni Riadi, S.ST., M.T.");
    assert.equal(leadership.length, 4);
    assert.equal(leadership[0].role, "Direktur");
    for (const l of leadership) {
      assert.ok(l.name && l.role && l.scope, `pimpinan tidak lengkap: ${l.role}`);
    }
  });

  test("nomenklatur politeknik dipakai konsisten", () => {
    /*
     * Poliban dipimpin Direktur dan tersusun atas Jurusan. Istilah universitas
     * tidak boleh dipakai untuk menyebut Poliban sendiri.
     *
     * Kutipan berita resmi bisa menyebut institusi LAIN yang memang memakai
     * istilah tersebut (mis. "Fakultas Kedokteran Universitas Negeri ..."),
     * jadi yang diuji adalah teks milik situs ini, bukan judul/ringkasan yang
     * ditarik dari feed resmi.
     */
    const feedText = new Set(
      officialNews.flatMap((n) => [n.title, n.summary]),
    );
    const stripFeed = (html) => {
      let out = html;
      for (const t of feedText) {
        if (!t) continue;
        out = out.split(escapeHtml(t)).join(" ");
      }
      return out;
    };

    for (const { name, html } of pages) {
      const own = stripFeed(html);
      for (const wrong of ["Rektor", "Dekan", "Fakultas", "Senat Universitas"]) {
        assert.ok(
          !new RegExp(`\\b${wrong}\\b`).test(own),
          `${name}: memakai istilah universitas "${wrong}" pada teks sendiri`,
        );
      }
    }
  });

  test("tema dan tanggal resmi PKKMB konsisten di seluruh situs", () => {
    const home = pages.find((p) => p.name === "index.html").html;
    assert.ok(home.includes(site.tagline), "tema resmi tidak tampil");
    assert.match(home, /4\s*&#8211;|4\s*–|4\s*-\s*6 Agustus 2026|4 – 6 Agustus 2026/);
    assert.ok(home.includes("1.817"), "jumlah peserta resmi tidak tampil");
  });

  test("kontak sesuai situs resmi Poliban", () => {
    assert.equal(site.contact.email, "info@poliban.ac.id");
    assert.match(site.contact.address, /Hasan Basri/);
    assert.match(site.contact.phone, /330 5052/);
  });
});

/* ------------------------------------------------------------------ */

describe("cache berita resmi", () => {
  test("metadata cache lengkap dan menunjuk endpoint resmi", () => {
    assert.equal(newsSource.sourceId, "poliban-wp-api");
    assert.match(newsSource.url, /^https:\/\/poliban\.ac\.id\/wp-json\/wp\/v2\/posts/);
    assert.match(newsSource.fetchedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.doesNotThrow(() => source(newsSource.sourceId));
  });

  test("setiap entri berita valid dan menautkan ke domain resmi", () => {
    assert.ok(officialNews.length >= 8, "berita terlalu sedikit");
    const seen = new Set();
    for (const n of officialNews) {
      assert.ok(Number.isInteger(n.id), `id tidak valid: ${n.title}`);
      assert.ok(!seen.has(n.id), `id ganda: ${n.id}`);
      seen.add(n.id);
      assert.ok(n.title?.length > 8, `judul terlalu pendek: ${n.title}`);
      assert.match(n.date, /^\d{4}-\d{2}-\d{2}$/, `tanggal tidak valid: ${n.title}`);
      assert.match(
        n.url,
        /^https:\/\/poliban\.ac\.id\//,
        `tautan bukan domain resmi: ${n.url}`,
      );
      assert.ok(n.summary?.length > 20, `ringkasan kosong: ${n.title}`);
      assert.ok(n.summary.length <= 262, `ringkasan terlalu panjang: ${n.title}`);
      assert.ok(!/<[a-z]/i.test(n.title + n.summary), `HTML mentah tersisa: ${n.title}`);
      assert.ok(
        !/&(amp|lt|gt|quot|#\d+|hellip|nbsp);/.test(n.title + n.summary),
        `entitas HTML belum diterjemahkan: ${n.title}`,
      );
    }
  });

  test("berita diurutkan dari yang terbaru", () => {
    const dates = officialNews.map((n) => n.date);
    const sorted = [...dates].sort().reverse();
    assert.deepEqual(dates, sorted, "urutan berita tidak menurun");
  });

  test("berita PKKMB 2026 tersedia dan dipakai pada beranda", () => {
    const home = pages.find((p) => p.name === "index.html").html;
    const pkkmb = officialNews.find((n) => n.slug.includes("pkkmb-2026-2027"));
    assert.ok(pkkmb, "berita PKKMB 2026 tidak ada di cache");
    assert.ok(home.includes(pkkmb.url), "beranda tidak menautkan siaran resmi PKKMB");
  });

  test("halaman berita menampilkan seluruh entri dengan tautan aslinya", () => {
    const page = pages.find((p) => p.name === "berita.html");
    for (const n of officialNews) {
      assert.ok(page.html.includes(n.url), `berita.html tidak memuat ${n.url}`);
    }
  });

  test("tautan keluar memakai rel yang aman", () => {
    for (const { name, html } of pages) {
      for (const m of html.matchAll(/<a[^>]+href="https?:[^"]*"[^>]*>/g)) {
        const tag = m[0];
        if (tag.includes('target="_blank"')) {
          assert.ok(
            /rel="[^"]*noopener/.test(tag),
            `${name}: tautan _blank tanpa rel=noopener → ${tag.slice(0, 90)}`,
          );
        }
      }
    }
  });

  test("halaman sumber menjelaskan mekanisme pembaruan", () => {
    const page = pages.find((p) => p.name === "sumber.html").html;
    assert.ok(page.includes("refresh:news"), "perintah refresh:news tidak dijelaskan");
    assert.ok(page.includes("refresh:prodi"), "perintah refresh:prodi tidak dijelaskan");
    assert.ok(page.includes(newsSource.url), "endpoint berita tidak dicantumkan");
  });
});

/* ------------------------------------------------------------------ */

describe("lambang institusi", () => {
  test("data lambang lengkap dan bersumber resmi", () => {
    assert.equal(emblem.name, "Enggang Bakilau");
    assert.doesNotThrow(() => source(emblem.sourceId));
    assert.equal(source(emblem.sourceId).status, "official");
    assert.ok(emblem.philosophyBy, "perancang filosofi tidak dicatat");
    assert.ok(emblem.graphicsBy, "perancang grafis tidak dicatat");
    assert.equal(emblem.elements.length, 8, "jumlah unsur lambang berubah");
    for (const e of emblem.elements) {
      assert.ok(e.title?.length > 3, `judul unsur kosong: ${e.title}`);
      assert.ok(e.meaning?.length > 30, `makna unsur terlalu pendek: ${e.title}`);
    }
  });

  test("halaman profil menampilkan lambang beserta atribusi perancangnya", () => {
    const page = pages.find((p) => p.name === "profil.html").html;
    assert.ok(page.includes(emblem.name), "nama lambang tidak tampil");
    assert.ok(page.includes(emblem.philosophyBy), "perancang filosofi tidak tampil");
    assert.ok(page.includes(emblem.graphicsBy), "perancang grafis tidak tampil");
    assert.ok(
      page.includes(source(emblem.sourceId).url),
      "tautan sumber lambang tidak tampil",
    );
    for (const e of emblem.elements) {
      assert.ok(page.includes(escapeHtml(e.title)), `unsur tidak tampil: ${e.title}`);
    }
  });

  test("tanggal berdiri pada lambang konsisten dengan halaman sejarah", () => {
    // 23 helai + 9 helai + 87 helai = 23 September 1987.
    const el = emblem.elements.find((e) => e.title.includes("bulu"));
    assert.match(el.meaning, /23 September 1987/);
    assert.match(el.meaning, /23 helai/);
    assert.match(el.meaning, /9 helai/);
    assert.match(el.meaning, /87 helai/);
  });
});

/* ------------------------------------------------------------------ */

describe("keamanan pipeline berita", () => {
  test("modul berita menolak URL di luar domain resmi", async () => {
    /*
     * Cache adalah berkas JSON yang bisa disunting tangan. Build harus gagal
     * keras, bukan menerbitkan tautan ke domain asing.
     */
    const mod = await import("../src/data/news.js?guard-test");
    // Modul asli harus lolos.
    assert.ok(mod.officialNews.length > 0);

    for (const n of mod.officialNews) {
      const u = new URL(n.url);
      assert.equal(u.protocol, "https:", `${n.title}: bukan https`);
      assert.ok(
        ["poliban.ac.id", "www.poliban.ac.id"].includes(u.hostname),
        `${n.title}: host di luar daftar izin (${u.hostname})`,
      );
    }
  });

  test("judul dan ringkasan berita bebas dari HTML mentah", () => {
    for (const n of officialNews) {
      assert.ok(!/[<>]/.test(n.title), `HTML mentah pada judul: ${n.title}`);
      assert.ok(!/[<>]/.test(n.summary ?? ""), `HTML mentah pada ringkasan: ${n.title}`);
    }
  });

  test("atribut href dan datetime berita di-escape pada keluaran", () => {
    /*
     * Menjaga agar interpolasi ke dalam atribut tidak pernah kembali mentah.
     * Tanda kutip yang lolos akan memungkinkan penambahan atribut sembarang.
     */
    for (const { name, html } of pages) {
      for (const m of html.matchAll(/<a[^>]*href="([^"]*)"[^>]*>/g)) {
        assert.ok(
          !/\son[a-z]+=/i.test(m[0]),
          `${name}: tautan memuat atribut event handler → ${m[0].slice(0, 110)}`,
        );
      }
      for (const m of html.matchAll(/<time[^>]*datetime="([^"]*)"/g)) {
        assert.match(
          m[1],
          /^\d{4}-\d{2}-\d{2}$/,
          `${name}: datetime tidak valid → ${m[1]}`,
        );
      }
    }
  });

  test("tidak ada penangan event sebaris di seluruh keluaran", () => {
    for (const { name, html } of pages) {
      const body = html.replace(/<script[\s\S]*?<\/script>/g, "");
      const m = body.match(/\s(onclick|onerror|onload|onmouseover|onfocus)=/i);
      assert.equal(m, null, `${name}: ada atribut ${m?.[1]} sebaris`);
    }
  });
});

/* ------------------------------------------------------------------ */

describe("dimensi aset", () => {
  test("width/height pada assets.js sama dengan berkas sebenarnya", async () => {
    /*
     * Metadata yang melenceng dari berkas menyebabkan pergeseran tata letak
     * (CLS) dan, bila rasionya ikut berubah, gambar menjadi gepeng.
     * Membaca header berkas langsung agar tidak bergantung pada ImageMagick.
     */
    for (const [id, a] of Object.entries(assets)) {
      const buf = await readFile(join(dist, a.file));
      const dim = readSize(buf, a.file);
      if (!dim) continue; // format tak dikenal — dilewati, bukan digagalkan
      assert.equal(dim.w, a.width, `${id}: lebar tercatat ${a.width}, berkas ${dim.w}`);
      assert.equal(dim.h, a.height, `${id}: tinggi tercatat ${a.height}, berkas ${dim.h}`);
    }
  });

  test("varian webp punya rasio yang sama dengan aslinya", async () => {
    for (const [id, a] of Object.entries(assets)) {
      if (!a.webp) continue;
      const buf = await readFile(join(dist, a.webp));
      const dim = readSize(buf, a.webp);
      if (!dim) continue;
      const r1 = a.width / a.height;
      const r2 = dim.w / dim.h;
      assert.ok(
        Math.abs(r1 - r2) / r1 < 0.02,
        `${id}: rasio webp (${dim.w}x${dim.h}) berbeda dari aslinya`,
      );
    }
  });
});

/** Membaca dimensi PNG/JPEG/WebP dari header biner. */
function readSize(buf, name) {
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o < buf.length) {
      if (buf[o] !== 0xff) { o += 1; continue; }
      const marker = buf[o + 1];
      const len = buf.readUInt16BE(o + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { h: buf.readUInt16BE(o + 5), w: buf.readUInt16BE(o + 7) };
      }
      o += 2 + len;
    }
    return null;
  }
  if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") {
    const fmt = buf.slice(12, 16).toString();
    if (fmt === "VP8X") return { w: (buf.readUIntLE(24, 3) & 0xffffff) + 1, h: (buf.readUIntLE(27, 3) & 0xffffff) + 1 };
    if (fmt === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (fmt === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
    return null;
  }
  return null;
}

/* ------------------------------------------------------------------ */

describe("konsistensi klaim akreditasi", () => {
  test("jumlah prodi tanpa akreditasi diturunkan dari data, bukan ditulis tangan", () => {
    const actual = programs.filter((p) => !p.accreditation).length;
    assert.equal(programStats.withoutAccreditation, actual);
    assert.equal(programsWithoutAccreditation.length, actual);
    assert.ok(actual > 0, "uji ini kehilangan maknanya bila tidak ada yang kosong");
  });

  test("halaman menyebut jumlah yang benar, bukan angka usang", () => {
    const n = programStats.withoutAccreditation;
    const explorer = pages.find((p) => p.name === "program-studi.html").html;
    const sumber = pages.find((p) => p.name === "sumber.html").html;

    assert.ok(
      explorer.includes(`${n} program studi belum mencantumkan`),
      `program-studi.html tidak menyebut ${n} prodi tanpa akreditasi`,
    );
    assert.ok(
      sumber.includes(`Peringkat akreditasi ${n} program studi`),
      `sumber.html tidak menyebut ${n} prodi tanpa akreditasi`,
    );

    // Setiap prodi yang kosong harus benar-benar disebut namanya.
    for (const p of programsWithoutAccreditation) {
      assert.ok(
        sumber.includes(escapeHtml(p.name)),
        `sumber.html tidak menyebut ${p.name}`,
      );
    }

    // Tidak boleh ada sisa kalimat "Satu program studi".
    assert.ok(!explorer.includes("Satu program studi belum"), "kalimat usang tersisa");
  });

  test("konflik jumlah prodi antar laman resmi tetap ditampilkan", () => {
    const sumber = pages.find((p) => p.name === "sumber.html").html;
    assert.ok(sumber.includes("menyebut 21"), "konflik 21 prodi tidak dijelaskan");
    assert.ok(sumber.includes("menyebut 20"), "konflik 20 prodi tidak dijelaskan");
    assert.ok(sumber.includes("22"), "angka kanonik 22 tidak disebut");
  });
});
