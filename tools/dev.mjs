/**
 * Server pengembangan sederhana untuk `dist/`.
 *
 *   node tools/dev.mjs [port]
 *
 * Menjalankan build awal, lalu melayani berkas statis dan membangun ulang
 * ketika berkas di `src/` berubah.
 */

import { createServer } from "node:http";
import { readFile, stat, watch } from "node:fs/promises";
import { join, extname, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const port = Number(process.argv[2] ?? process.env.PORT ?? 5173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

let building = false;
let queued = false;

function run(cmd, args) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
    p.on("exit", (code) => (code === 0 ? res() : rej(new Error(`${cmd} keluar dengan kode ${code}`))));
  });
}

async function build() {
  if (building) {
    queued = true;
    return;
  }
  building = true;
  try {
    await run(process.execPath, ["build.mjs"]);
    await run(join(root, "node_modules/.bin/tailwindcss"), [
      "-i",
      "src/styles/app.css",
      "-o",
      "dist/assets/app.css",
    ]);
  } catch (err) {
    console.error("✗", err.message);
  } finally {
    building = false;
    if (queued) {
      queued = false;
      build();
    }
  }
}

async function resolveFile(pathname) {
  const candidates = [
    join(dist, pathname),
    join(dist, pathname, "index.html"),
    join(dist, `${pathname}.html`),
  ];
  for (const c of candidates) {
    if (!c.startsWith(dist)) continue;
    try {
      const s = await stat(c);
      if (s.isFile()) return c;
    } catch {
      /* lanjut */
    }
  }
  return null;
}

await build();

const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = await resolveFile(pathname === "/" ? "/index.html" : pathname);

  if (!file) {
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end("<h1>404 - Halaman tidak ditemukan</h1>");
    return;
  }

  const body = await readFile(file);
  res.writeHead(200, {
    "content-type": MIME[extname(file)] ?? "application/octet-stream",
    "cache-control": "no-cache",
  });
  res.end(body);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`→ PKKMB dev server: http://0.0.0.0:${port}`);
});

// Pantau perubahan sumber.
for (const dir of ["src", "build.mjs"]) {
  (async () => {
    try {
      const watcher = watch(join(root, dir), { recursive: true });
      for await (const _ of watcher) {
        clearTimeout(globalThis.__pkkmbTimer);
        globalThis.__pkkmbTimer = setTimeout(build, 120);
      }
    } catch {
      /* platform tanpa dukungan recursive watch */
    }
  })();
}
