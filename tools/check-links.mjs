/**
 * Memeriksa seluruh tautan eksternal pada keluaran build.
 *
 *   node tools/check-links.mjs
 *
 * Dijalankan manual (bukan bagian dari `npm run check`) karena memerlukan
 * jaringan. Tautan yang gagal dilaporkan agar dapat diperbaiki atau dihapus.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const UA =
  "Mozilla/5.0 (compatible; PKKMB-Poliban-LinkCheck/1.0; +https://pkkmb.poliban.ac.id/)";

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const targets = new Map();

for (const file of await walk(dist)) {
  const html = await readFile(file, "utf8");
  const page = file.replace(dist + "/", "");
  for (const m of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (!targets.has(url)) targets.set(url, new Set());
    targets.get(url).add(page);
  }
}

console.log(`Memeriksa ${targets.size} URL eksternal unik…\n`);

const failures = [];
let ok = 0;

for (const [url, pages] of targets) {
  let status = "?";
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "user-agent": UA },
      signal: AbortSignal.timeout(20_000),
    });
    if (res.status === 405 || res.status === 403 || res.status === 501) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "user-agent": UA },
        signal: AbortSignal.timeout(20_000),
      });
    }
    status = res.status;
    if (res.ok) {
      ok += 1;
      console.log(`  ✓ ${status} ${url}`);
    } else {
      failures.push({ url, status, pages: [...pages] });
      console.log(`  ✗ ${status} ${url}`);
    }
  } catch (err) {
    failures.push({ url, status: err.message, pages: [...pages] });
    console.log(`  ✗ ${err.message} ${url}`);
  }
  await new Promise((r) => setTimeout(r, 250));
}

console.log(`\n${ok} berhasil, ${failures.length} gagal.`);
if (failures.length) {
  console.log("\nTautan bermasalah:");
  for (const f of failures) {
    console.log(`  ${f.url}\n    status: ${f.status}\n    dipakai: ${f.pages.join(", ")}`);
  }
  process.exit(1);
}
