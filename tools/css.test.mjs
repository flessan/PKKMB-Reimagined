/**
 * Menjaga agar setiap kelas yang dipakai pada HTML benar-benar dihasilkan
 * Tailwind. Kelas yang dirangkai dinamis (`group-hover:${...}`) tidak terdeteksi
 * pemindai Tailwind dan menyebabkan gaya hilang tanpa pesan galat — uji ini
 * menangkap kasus tersebut.
 */

import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

/** Kelas yang sengaja ditambahkan oleh JavaScript saat runtime. */
const RUNTIME_CLASSES = new Set([
  "is-visible",
  "flex",
  "hidden",
  "rotate-180",
  "border-accent-400/60",
  "bg-accent-400/10",
  "bg-accent-400",
  "text-ink-950",
  "!border-accent-500",
]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const selectorFor = (cls) =>
  "." +
  [...cls]
    .map((ch) => (":[]()/.%#!,\\<>+*&'\"$^=~|{}@;?".includes(ch) ? `\\${ch}` : ch))
    .join("");

let css = "";
let classUsage = new Map();

before(async () => {
  assert.ok(existsSync(join(dist, "assets/app.css")), "jalankan `npm run build` dahulu");
  css = await readFile(join(dist, "assets/app.css"), "utf8");

  for (const file of await walk(dist)) {
    const html = await readFile(file, "utf8");
    for (const m of html.matchAll(/class="([^"]*)"/g)) {
      for (const cls of m[1].split(/\s+/)) {
        if (!cls) continue;
        if (!classUsage.has(cls)) classUsage.set(cls, new Set());
        classUsage.get(cls).add(file.replace(dist + "/", ""));
      }
    }
  }
});

describe("cakupan CSS", () => {
  test("setiap kelas pada HTML ada di stylesheet", () => {
    const missing = [];
    for (const [cls, files] of classUsage) {
      if (RUNTIME_CLASSES.has(cls)) continue;
      if (!css.includes(selectorFor(cls))) {
        missing.push(`${cls} (mis. ${[...files][0]})`);
      }
    }
    assert.deepEqual(missing, [], `kelas tanpa gaya:\n  ${missing.join("\n  ")}`);
  });

  test("kelas komponen inti terdefinisi", () => {
    for (const c of ["btn", "card", "badge", "field", "chip", "shell", "eyebrow", "prose-editorial"]) {
      assert.ok(css.includes(`.${c}`), `komponen .${c} tidak ada di CSS`);
    }
  });

  test("token warna merek tersedia", () => {
    for (const v of ["--color-brand-600", "--color-ink-900", "--color-accent-300"]) {
      assert.ok(css.includes(v), `token ${v} hilang`);
    }
  });

  test("tidak ada sisa kelas hasil interpolasi yang gagal", () => {
    for (const cls of classUsage.keys()) {
      assert.ok(!cls.includes("${"), `kelas belum terinterpolasi: ${cls}`);
      assert.ok(!cls.includes("undefined"), `kelas mengandung undefined: ${cls}`);
    }
  });
});
