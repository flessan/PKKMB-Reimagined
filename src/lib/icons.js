/**
 * Set ikon garis 24×24 minimal. Ikon bersifat dekoratif kecuali
 * `title` diberikan, sehingga default-nya `aria-hidden`.
 */

const paths = {
  arrowRight: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7m0 0H8m9 0v9"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone:
    '<path d="M5 3h3.2l1.6 4-2 1.4a12 12 0 0 0 5.8 5.8l1.4-2 4 1.6V17a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  document:
    '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  download: '<path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"/>',
  shield:
    '<path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6Z"/><path d="m9.5 12 1.8 1.8 3.4-3.6"/>',
  sparkle:
    '<path d="M12 3.5 13.7 9l5.3 1.7-5.3 1.8L12 18l-1.7-5.5L5 10.7 10.3 9Z"/><path d="M19 15.5 19.8 18l2.2.8-2.2.7-.8 2.5-.8-2.5-2.2-.7 2.2-.8Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-1.8 4.2L9 15l1.8-4.2Z"/>',
  support:
    '<circle cx="12" cy="12" r="9"/><path d="M9.2 9.2 6.4 6.4m11.2 0-2.8 2.8m0 5.6 2.8 2.8m-11.2 0 2.8-2.8"/><circle cx="12" cy="12" r="3.2"/>',
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8M17.5 19a5.4 5.4 0 0 0-2-4.2"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.2 12.2 2.6 2.6 5-5.2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8.5v.01"/>',
  alert:
    '<path d="M12 4.5 21 19H3Z"/><path d="M12 10v4m0 2.5v.01"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8.5 10V7.5a3.5 3.5 0 1 1 7 0V10"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff:
    '<path d="M4 4 20 20"/><path d="M9.9 5.9A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.3 4.1M6.5 7.9A16.7 16.7 0 0 0 2.5 12S6 18.5 12 18.5c1 0 1.9-.2 2.8-.5"/><path d="M9.9 10.1a3 3 0 0 0 4.2 4.2"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5Z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3.5 12.5 8.5 4.7 8.5-4.7M3.5 16.5 12 21.2l8.5-4.7"/>',
  bell: '<path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z"/><path d="M10 18a2 2 0 0 0 4 0"/>',
  flag: '<path d="M6 21V4m0 0h11l-2 4 2 4H6"/>',
  target:
    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  route:
    '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18h5a4 4 0 0 0 0-8h-3a4 4 0 0 1 0-8"/>',
  external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.8"/><path d="M16.8 7.2v.01"/>',
  youtube:
    '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="m10.5 9.5 4.5 2.5-4.5 2.5Z"/>',
  facebook:
    '<path d="M14.5 8.5H17V5.2h-2.6c-2.2 0-3.6 1.5-3.6 3.7v1.6H8.5v3.3h2.3V21h3.4v-7.2h2.4l.4-3.3h-2.8V9.4c0-.6.3-.9.9-.9Z"/>',
  whatsapp:
    '<path d="M3.5 20.5 5 16.4A8 8 0 1 1 8.2 19.4Z"/><path d="M9.2 9.1c.3-.6.6-.6.9-.6h.6c.2 0 .5 0 .7.6l.7 1.7c.1.3 0 .5-.1.7l-.5.6c-.1.2-.2.4 0 .7a6 6 0 0 0 2.7 2.3c.3.1.5.1.7-.1l.6-.7c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .7-.5 1.5-1.2 1.7-.6.2-1.4.3-3.5-.6a9.4 9.4 0 0 1-4.5-4.4c-.6-1.4-.5-2.4-.3-2.8Z"/>',
};

/**
 * @param {keyof typeof paths} name
 * @param {{class?: string, title?: string, stroke?: number}} [opts]
 */
export function icon(name, opts = {}) {
  const d = paths[name];
  if (!d) throw new Error(`Ikon tidak dikenal: ${name}`);
  const { class: className = "h-5 w-5", title, stroke = 1.7 } = opts;
  const a11y = title
    ? `role="img" aria-label="${title}"`
    : 'aria-hidden="true" focusable="false"';
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${d}</svg>`;
}

export const iconNames = Object.keys(paths);
