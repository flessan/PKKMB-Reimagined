/**
 * Static site generator PKKMB Poliban 2026.
 *
 * Merender seluruh halaman dari `src/` ke `dist/`, menyalin aset statis,
 * lalu menghasilkan sitemap dan robots.txt.
 *
 *   node build.mjs
 */

import { mkdir, writeFile, readFile, cp, rm, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "./src/data/site.js";
import { posts } from "./src/data/posts.js";
import { programs } from "./src/data/programs.js";

import renderIndex from "./src/pages/index.js";
import renderPkkmb from "./src/pages/pkkmb.js";
import renderBerita from "./src/pages/berita.js";
import renderPengumuman from "./src/pages/pengumuman.js";
import renderPost from "./src/pages/post.js";
import renderPrograms from "./src/pages/program-studi.js";
import renderProgram from "./src/pages/program-detail.js";
import renderProfil from "./src/pages/profil.js";
import renderFasilitas from "./src/pages/fasilitas.js";
import renderKontak from "./src/pages/kontak.js";
import renderLogin from "./src/pages/login.js";
import renderSumber from "./src/pages/sumber.js";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

/* ------------------------------------------------------------------ */

async function write(relPath, contents) {
  const target = join(dist, relPath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
  return relPath;
}

/**
 * Halaman pengalihan untuk URL lama agar tautan eksternal tidak putus.
 */
function redirect(to, depth = 0) {
  const href = depth ? "../".repeat(depth) + to : to;
  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>Halaman dipindahkan · ${site.name}</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${site.url}/${to}">
<meta http-equiv="refresh" content="0; url=${href}">
<style>body{font-family:system-ui,sans-serif;margin:0;display:grid;place-items:center;min-height:100vh;background:#f7f8fa;color:#3e4756}
main{text-align:center;padding:2rem}a{color:#1d5697}</style>
</head>
<body>
<main>
  <h1 style="font-size:1.25rem">Halaman telah dipindahkan</h1>
  <p>Anda akan dialihkan otomatis. <a href="${href}">Klik di sini bila tidak berpindah</a>.</p>
</main>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */

async function buildPages() {
  const written = [];

  written.push(await write("index.html", renderIndex()));
  written.push(await write("pkkmb.html", renderPkkmb()));
  written.push(await write("berita.html", renderBerita()));
  written.push(await write("pengumuman.html", renderPengumuman()));
  written.push(await write("program-studi.html", renderPrograms()));
  written.push(await write("profil.html", renderProfil()));
  written.push(await write("fasilitas.html", renderFasilitas()));
  written.push(await write("kontak.html", renderKontak()));
  written.push(await write("login.html", renderLogin()));
  written.push(await write("sumber.html", renderSumber()));

  for (const post of posts) {
    written.push(await write(`berita/${post.slug}.html`, renderPost(post)));
  }

  for (const program of programs) {
    written.push(
      await write(`program-studi/${program.slug}.html`, renderProgram(program)),
    );
  }

  return written;
}

/**
 * URL lama dari struktur situs sebelumnya, dipetakan ke lokasi baru.
 */
async function buildRedirects() {
  const map = {
    "profil/sejarah.html": "profil.html#sejarah",
    "profil/visi-misi.html": "profil.html#visi-misi",
    "profil/struktur.html": "profil.html#struktur",
    "profil/rektor.html": "profil.html#sambutan",
  };

  const written = [];
  for (const [from, to] of Object.entries(map)) {
    const depth = from.split("/").length - 1;
    written.push(await write(from, redirect(to, depth)));
  }
  return written;
}

/* ------------------------------------------------------------------ */

async function copyAssets() {
  // Media terproses
  const media = join(root, "src/media");
  if (existsSync(media)) {
    await cp(media, join(dist, "assets/img"), { recursive: true });
  }

  // Fonts
  const fonts = join(root, "src/styles/fonts");
  if (existsSync(fonts)) {
    await cp(fonts, join(dist, "assets/fonts"), { recursive: true });
  }

  // Skrip klien
  await cp(join(root, "src/scripts/app.js"), join(dist, "assets/app.js"));

  // Berkas statis (favicon, dsb.)
  const staticDir = join(root, "src/static");
  if (existsSync(staticDir)) {
    await cp(staticDir, dist, { recursive: true });
  }

  // Lampiran PDF asli - dipertahankan pada jalur yang sama
  const storage = join(root, "storage");
  if (existsSync(storage)) {
    await cp(join(storage, "post-attachments"), join(dist, "storage/post-attachments"), {
      recursive: true,
    });
  }
}

/* ------------------------------------------------------------------ */

function buildSitemap(pages) {
  const urls = pages
    .filter((p) => !p.startsWith("profil/") && p !== "login.html")
    .map((p) => {
      const loc = p === "index.html" ? "" : p;
      const priority =
        p === "index.html" ? "1.0" : p.includes("/") ? "0.6" : "0.8";
      return `  <url>\n    <loc>${site.url}/${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

/* ------------------------------------------------------------------ */

async function main() {
  const started = Date.now();
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  const pages = await buildPages();
  const redirects = await buildRedirects();
  await copyAssets();

  await write("sitemap.xml", buildSitemap(pages));
  await write(
    "robots.txt",
    `User-agent: *\nAllow: /\nDisallow: /login.html\n\nSitemap: ${site.url}/sitemap.xml\n`,
  );

  const ms = Date.now() - started;
  console.log(
    `✓ ${pages.length} halaman + ${redirects.length} pengalihan dibangun ke dist/ (${ms} ms)`,
  );
}

main().catch((err) => {
  console.error("✗ Build gagal:", err);
  process.exit(1);
});
