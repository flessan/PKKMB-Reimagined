/**
 * Pemeriksa kualitas keluaran build.
 *
 * Memeriksa hal-hal yang mudah rusak pada situs statis:
 *  - tautan internal & jangkar yang menunjuk ke berkas/target tidak ada
 *  - `href="#"` dan placeholder yang tertinggal
 *  - gambar tanpa atribut `alt`, `width`, atau `height`
 *  - dokumen tanpa `<title>`, `lang`, atau meta description
 *  - tautan eksternal `target="_blank"` tanpa `rel="noopener"`
 *  - heading yang melompat level, dan halaman tanpa `<h1>`
 *  - aset yang direferensikan tetapi tidak ada di `dist/`
 *
 *   node tools/lint.mjs
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const errors = [];
const warnings = [];

const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

/* ------------------------------------------------------------------ */

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, "i"));
  return m ? m[1] : null;
};

/* ------------------------------------------------------------------ */

async function main() {
  if (!existsSync(dist)) {
    console.error("✗ dist/ belum ada. Jalankan `npm run build` terlebih dahulu.");
    process.exit(1);
  }

  const all = await walk(dist);
  const htmlFiles = all.filter((f) => f.endsWith(".html"));
  const present = new Set(all.map((f) => relative(dist, f).split("\\").join("/")));

  // Kumpulkan id jangkar tiap halaman.
  const anchors = new Map();
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    anchors.set(relative(dist, file).split("\\").join("/"), ids);
  }

  let linkCount = 0;

  for (const file of htmlFiles) {
    const rel = relative(dist, file).split("\\").join("/");
    const html = await readFile(file, "utf8");
    const dir = dirname(rel) === "." ? "" : dirname(rel);
    const isRedirect = html.includes('http-equiv="refresh"');

    /* --- dokumen --- */
    if (!/<html[^>]+lang="[a-z-]+"/i.test(html)) err(rel, "atribut lang tidak ada pada <html>");
    if (!/<title>[^<]+<\/title>/i.test(html)) err(rel, "<title> kosong atau tidak ada");

    if (!isRedirect) {
      if (!/<meta\s+name="description"\s+content="[^"]{40,}"/i.test(html))
        err(rel, "meta description tidak ada atau terlalu pendek");

      const h1 = html.match(/<h1[\s>]/g) ?? [];
      if (h1.length === 0) err(rel, "tidak ada <h1>");
      if (h1.length > 1) err(rel, `terdapat ${h1.length} elemen <h1> (seharusnya satu)`);

      // Urutan heading
      const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
      let prev = 0;
      levels.forEach((lv) => {
        if (prev && lv > prev + 1) warn(rel, `lompatan heading h${prev} → h${lv}`);
        prev = lv;
      });
    }

    /* --- tautan --- */
    for (const m of html.matchAll(/<a\s[^>]*>/gi)) {
      const tag = m[0];
      const href = attr(tag, "href");
      if (href === null) {
        err(rel, "elemen <a> tanpa href");
        continue;
      }
      linkCount += 1;

      if (href === "#" || href === "" || href.toLowerCase().startsWith("javascript:")) {
        err(rel, `tautan placeholder: href="${href}"`);
        continue;
      }

      if (/^(https?:)?\/\//i.test(href)) {
        if (/target="_blank"/i.test(tag) && !/rel="[^"]*noopener/i.test(tag))
          err(rel, `target="_blank" tanpa rel="noopener": ${href}`);
        continue;
      }
      if (/^(mailto:|tel:|data:)/i.test(href)) continue;

      // Internal
      const [path, hash] = href.split("#");
      const targetPath = path ? join(dir, path).split("\\").join("/") : rel;

      if (path && !present.has(targetPath)) {
        err(rel, `tautan menuju berkas tidak ada: ${href}`);
        continue;
      }
      if (hash) {
        const ids = anchors.get(targetPath);
        if (ids && !ids.has(hash)) err(rel, `jangkar tidak ditemukan: ${href}`);
      }
    }

    /* --- gambar --- */
    for (const m of html.matchAll(/<img\s[^>]*>/gi)) {
      const tag = m[0];
      const src = attr(tag, "src");
      if (attr(tag, "alt") === null) err(rel, `<img> tanpa atribut alt: ${src}`);
      if (!attr(tag, "width") || !attr(tag, "height"))
        warn(rel, `<img> tanpa width/height (berpotensi layout shift): ${src}`);
      if (src && !/^(https?:|data:)/i.test(src)) {
        const p = join(dir, src).split("\\").join("/");
        if (!present.has(p)) err(rel, `berkas gambar tidak ada: ${src}`);
      }
    }

    /* --- sumber lain --- */
    for (const m of html.matchAll(/<(?:link|script|source)\s[^>]*>/gi)) {
      const tag = m[0];
      const src = attr(tag, "href") ?? attr(tag, "src") ?? attr(tag, "srcset");
      if (!src || /^(https?:|data:|#)/i.test(src)) continue;
      const p = join(dir, src).split("\\").join("/");
      if (!present.has(p)) err(rel, `aset tidak ada: ${src}`);
    }

    /* --- kontrol form & tombol --- */
    for (const m of html.matchAll(/<input\s[^>]*>/gi)) {
      const tag = m[0];
      const type = (attr(tag, "type") ?? "text").toLowerCase();
      if (["hidden", "submit", "button", "image"].includes(type)) continue;
      const id = attr(tag, "id");
      if (!id) {
        err(rel, `<input type="${type}"> tanpa id sehingga tidak dapat dilabeli`);
        continue;
      }
      const labelled =
        new RegExp(`<label[^>]+for="${id}"`).test(html) ||
        attr(tag, "aria-label") ||
        attr(tag, "aria-labelledby");
      if (!labelled) err(rel, `kontrol #${id} tidak memiliki label`);
    }

    for (const m of html.matchAll(/<select\s[^>]*>/gi)) {
      const id = attr(m[0], "id");
      if (!id) {
        err(rel, "<select> tanpa id");
      } else if (
        !new RegExp(`<label[^>]+for="${id}"`).test(html) &&
        !attr(m[0], "aria-label")
      ) {
        err(rel, `<select> #${id} tidak memiliki label`);
      }
    }

    /* --- iframe --- */
    for (const m of html.matchAll(/<iframe\s[^>]*>/gi)) {
      if (!attr(m[0], "title")) err(rel, "<iframe> tanpa atribut title");
    }

    /* --- sisa penanda pekerjaan --- */
    for (const token of ["TODO", "FIXME", "Lorem ipsum", "HTTrack"]) {
      if (html.includes(token)) err(rel, `sisa penanda "${token}" pada keluaran`);
    }
    if (/\bundefined\b/.test(html.replace(/<script[\s\S]*?<\/script>/g, "")))
      err(rel, 'kata "undefined" muncul pada keluaran');
    if (html.includes("[object Object]")) err(rel, '"[object Object]" pada keluaran');
  }

  /* --- ukuran aset --- */
  for (const file of all) {
    const ext = extname(file);
    if (![".jpg", ".jpeg", ".png", ".webp", ".css", ".js"].includes(ext)) continue;
    const { size } = await stat(file);
    const rel = relative(dist, file).split("\\").join("/");
    const limit = ext === ".css" || ext === ".js" ? 120_000 : 400_000;
    if (size > limit)
      warn(rel, `berkas berukuran ${(size / 1024).toFixed(0)} KB (ambang ${limit / 1024} KB)`);
  }

  /* ---------------------------------------------------------------- */

  console.log(`Diperiksa: ${htmlFiles.length} halaman, ${linkCount} tautan.`);

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} peringatan:`);
    warnings.forEach((w) => console.log("  " + w));
  }

  if (errors.length) {
    console.log(`\n✗ ${errors.length} galat:`);
    errors.forEach((e) => console.log("  " + e));
    process.exit(1);
  }

  console.log("\n✓ Tidak ada galat.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
