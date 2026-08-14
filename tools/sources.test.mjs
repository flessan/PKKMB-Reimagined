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
import { programs, programsSource } from "../src/data/programs.js";
import { stats, leader, leadership, facilities, history } from "../src/data/campus.js";
import { site } from "../src/data/site.js";

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
    for (const { name, html } of pages) {
      for (const wrong of ["Rektor", "Dekan", "Fakultas", "Senat Universitas"]) {
        assert.ok(
          !new RegExp(`\\b${wrong}\\b`).test(html),
          `${name}: memakai istilah universitas "${wrong}"`,
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
