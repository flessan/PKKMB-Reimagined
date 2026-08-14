/** Utilitas kecil untuk merangkai HTML dari data. */

const ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Meng-escape teks biasa yang akan disisipkan ke HTML. */
export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

/** Menyusun daftar node menjadi string, membuang nilai kosong. */
export function join(list, sep = "\n") {
  return list.filter(Boolean).join(sep);
}

/** `cls("a", cond && "b")` → "a b" */
export function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

/** Menyesuaikan tautan internal terhadap kedalaman direktori halaman. */
export function rel(href, depth = 0) {
  if (!href) return href;
  if (/^(https?:|mailto:|tel:|#|\/)/.test(href)) return href;
  return depth > 0 ? "../".repeat(depth) + href : href;
}

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

function parts(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d, dow: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
}

/** "2026-08-04" → "4 Agustus 2026" */
export function formatDate(iso) {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "2026-08-04" → "4 Agu 2026" */
export function formatDateShort(iso) {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}

/** "2026-08-04" → "Selasa, 4 Agustus 2026" */
export function formatDateLong(iso) {
  const { dow } = parts(iso);
  return `${DAYS[dow]}, ${formatDate(iso)}`;
}

export function monthShort(iso) {
  return MONTHS_SHORT[parts(iso).m - 1];
}

export function dayOf(iso) {
  return String(parts(iso).d).padStart(2, "0");
}

/** Membuat slug URL dari teks bebas. */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Merender blok konten artikel (lihat `src/data/posts.js`). */
export function renderBody(blocks, depth = 0) {
  return join(
    blocks.map((block) => {
      switch (block.t) {
        case "h2":
          return `<h2>${block.html}</h2>`;
        case "h3":
          return `<h3>${block.html}</h3>`;
        case "blockquote":
          return `<blockquote>${block.html}</blockquote>`;
        case "ul":
          return `<ul>${block.items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
        case "ol":
          return `<ol>${block.items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
        default:
          return `<p>${block.html}</p>`;
      }
    }).map((s) => (depth ? s.replace(/href="\.\.\//g, `href="${"../".repeat(depth)}`) : s)),
  );
}
