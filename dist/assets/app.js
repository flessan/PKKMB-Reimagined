/**
 * Perilaku sisi klien PKKMB 2026.
 *
 * Ditulis sebagai modul ES tunggal tanpa dependensi. Setiap fungsi keluar
 * lebih awal bila elemen terkait tidak ada di halaman, sehingga berkas yang
 * sama aman dipakai di seluruh halaman.
 */

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ *
 * Navigasi seluler
 * ------------------------------------------------------------------ */

/**
 * Menu seluler memakai <details> sehingga sudah berfungsi tanpa JavaScript.
 * Di sini hanya ditambahkan penyempurnaan: tutup dengan Escape, klik di luar,
 * dan saat berpindah ke tata letak desktop.
 */
function mobileMenu() {
  const menu = document.querySelector("[data-menu]");
  if (!menu) return;

  const toggle = menu.querySelector("[data-menu-toggle]");
  const close = () => {
    if (menu.open) menu.open = false;
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      close();
      toggle?.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (menu.open && !menu.contains(e.target)) close();
  });

  window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches) close();
  });
}

/* ------------------------------------------------------------------ *
 * Dropdown navigasi (hover + papan ketik)
 * ------------------------------------------------------------------ */

function dropdowns() {
  const roots = document.querySelectorAll("[data-dropdown]");
  if (!roots.length) return;

  const all = [...roots].map((root) => {
    const trigger = root.querySelector("[data-dropdown-trigger]");
    const panel = root.querySelector("[data-dropdown-panel]");
    const chevron = trigger?.querySelector("svg");
    let timer;

    const setOpen = (open) => {
      panel.classList.toggle("hidden", !open);
      trigger.setAttribute("aria-expanded", String(open));
      chevron?.classList.toggle("rotate-180", open);
    };

    setOpen(false);

    root.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      closeOthers(root);
      setOpen(true);
    });
    root.addEventListener("mouseleave", () => {
      timer = setTimeout(() => setOpen(false), 120);
    });
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const open = trigger.getAttribute("aria-expanded") === "true";
      closeOthers(root);
      setOpen(!open);
    });
    root.addEventListener("focusout", (e) => {
      if (!root.contains(e.relatedTarget)) setOpen(false);
    });
    root.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.focus();
      }
    });

    return { root, setOpen };
  });

  function closeOthers(except) {
    all.forEach((d) => d.root !== except && d.setOpen(false));
  }

  document.addEventListener("click", (e) => {
    all.forEach((d) => !d.root.contains(e.target) && d.setOpen(false));
  });
}

/* ------------------------------------------------------------------ *
 * Status kegiatan pada hero
 * ------------------------------------------------------------------ */

function eventStatus() {
  const card = document.querySelector("[data-event-card]");
  const badge = document.querySelector("[data-event-status]");
  if (!badge) return;

  const days = [...document.querySelectorAll("[data-day]")];
  const DAY = 86_400_000;
  const parse = (iso) => new Date(`${iso}T00:00:00+08:00`);
  const now = new Date();

  /* Tandai hari yang sedang berjalan. */
  const today = days.find((d) => {
    const t = parse(d.dataset.day);
    return now >= t && now < new Date(t.getTime() + DAY);
  });
  if (today) {
    today.classList.add("border-accent-400/60", "bg-accent-400/10");
    today.querySelector("span")?.classList.add("bg-accent-400", "text-ink-950");
  }

  /*
   * Status sudah dirender server saat build, jadi halaman tetap benar tanpa JS.
   * Skrip hanya perlu menghitung ulang bila halaman dibuka pada tanggal yang
   * berbeda dari tanggal build (mis. HTML lama yang tersimpan di cache).
   */
  const builtOn = card?.dataset.built;
  if (!builtOn || builtOn === now.toISOString().slice(0, 10)) return;

  const headline = document.querySelector("[data-event-headline]");
  const detail = document.querySelector("[data-event-detail]");
  const preStart = parse("2026-08-03");
  const end = parse("2026-08-06");
  const lecture = parse("2026-08-24");
  const daysTo = (d) => Math.ceil((d - now) / DAY);

  let status, title, note;
  if (now < preStart) {
    status = "Segera";
    title = `${daysTo(preStart)} hari menuju Pra-PKKMB`;
    note = "Pastikan akun Portal PKKMB Anda sudah dapat diakses sebelum 3 Agustus 2026.";
  } else if (now <= new Date(end.getTime() + DAY)) {
    status = "Berlangsung";
    title = today
      ? today.querySelector("span:nth-child(2) span").textContent.trim()
      : "Rangkaian PKKMB sedang berlangsung";
    note = "Jangan lupa melakukan presensi digital pada setiap sesi kegiatan.";
  } else if (now < lecture) {
    status = "Selesai";
    title = `${daysTo(lecture)} hari menuju kuliah perdana`;
    note = "Rangkaian PKKMB telah selesai. Sertifikat diproses oleh panitia.";
  } else {
    status = "Arsip";
    title = "Rangkaian PKKMB 2026 telah selesai";
    note = "Halaman ini menjadi arsip resmi rangkaian PKKMB 2026.";
  }

  badge.textContent = status;
  if (headline) headline.textContent = title;
  if (detail) detail.textContent = note;
}

/* ------------------------------------------------------------------ *
 * Penghitung angka
 * ------------------------------------------------------------------ */

function counters() {
  const nodes = document.querySelectorAll("[data-count-to]");
  if (!nodes.length || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

  const format = (n) => n.toLocaleString("id-ID");

  const run = (el) => {
    const target = Number(el.dataset.countTo);
    const duration = 900;
    const startedAt = performance.now();

    const tick = (now) => {
      const p = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };

    el.textContent = "0";
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  nodes.forEach((n) => io.observe(n));
}

/* ------------------------------------------------------------------ *
 * Animasi masuk viewport
 * ------------------------------------------------------------------ */

function reveal() {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;

  if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        entry.target.style.animationDelay = `${Math.min(i, 4) * 60}ms`;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
  );

  nodes.forEach((n) => io.observe(n));
}

/* ------------------------------------------------------------------ *
 * Filter berita
 * ------------------------------------------------------------------ */

function postFilter() {
  const form = document.querySelector("[data-filter-form]");
  if (!form) return;

  const search = form.querySelector("[data-filter-search]");
  const chips = [...form.querySelectorAll("[data-filter-chip]")];
  const results = document.querySelector("[data-filter-results]");
  const empty = document.querySelector("[data-filter-empty]");
  const count = document.querySelector("[data-filter-count]");
  const cards = [...results.querySelectorAll("[data-post]")];

  let category = "";

  const apply = () => {
    const q = (search.value || "").trim().toLowerCase();
    let shown = 0;

    cards.forEach((card) => {
      const matchCat = !category || card.dataset.category === category;
      const matchText = !q || card.dataset.title.includes(q);
      const visible = matchCat && matchText;
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    empty.classList.toggle("hidden", shown > 0);
    results.classList.toggle("hidden", shown === 0);
    count.textContent = `Menampilkan ${shown} dari ${cards.length} artikel.`;
  };

  form.addEventListener("submit", (e) => e.preventDefault());
  search.addEventListener("input", debounce(apply, 140));

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      category = chip.value;
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      apply();
    });
  });
}

/* ------------------------------------------------------------------ *
 * Filter program studi
 * ------------------------------------------------------------------ */

function programFilter() {
  const form = document.querySelector("[data-program-filter]");
  if (!form) return;

  const search = form.querySelector("[data-program-search]");
  const dept = form.querySelector("[data-program-dept]");
  const levels = [...form.querySelectorAll("[data-program-level]")];
  const groups = [...document.querySelectorAll("[data-dept-group]")];
  const cards = [...document.querySelectorAll("[data-program]")];
  const empty = document.querySelector("[data-program-empty]");
  const count = document.querySelector("[data-program-count]");
  const reset = document.querySelector("[data-program-reset]");

  let level = "";

  const apply = () => {
    const q = (search.value || "").trim().toLowerCase();
    const d = dept.value;
    let shown = 0;

    cards.forEach((card) => {
      const visible =
        (!level || card.dataset.level === level) &&
        (!d || card.dataset.dept === d) &&
        (!q || card.dataset.search.includes(q));
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    groups.forEach((group) => {
      const id = group.dataset.deptGroup;
      const visible = [...group.querySelectorAll("[data-program]")].filter((c) => !c.hidden);
      group.hidden = visible.length === 0;
      const label = document.querySelector(`[data-dept-count="${id}"]`);
      if (label) label.textContent = `${visible.length} prodi`;
    });

    empty.classList.toggle("hidden", shown > 0);
    count.textContent = `Menampilkan ${shown} dari ${cards.length} program studi.`;
    reset.classList.toggle("hidden", !q && !d && !level);
  };

  form.addEventListener("submit", (e) => e.preventDefault());
  search.addEventListener("input", debounce(apply, 140));
  dept.addEventListener("change", apply);

  levels.forEach((btn) => {
    btn.addEventListener("click", () => {
      level = btn.value;
      levels.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      apply();
    });
  });

  reset.addEventListener("click", () => {
    search.value = "";
    dept.value = "";
    level = "";
    levels.forEach((b) => b.setAttribute("aria-pressed", String(b.value === "")));
    apply();
    search.focus();
  });
}

/* ------------------------------------------------------------------ *
 * Portal: tampilkan/sembunyikan kata sandi + validasi ringan
 * ------------------------------------------------------------------ */

function loginForm() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;

  // Tombol tampilkan kata sandi
  const toggle = form.querySelector("[data-toggle-password]");
  if (toggle) {
    const input = form.querySelector("#password");
    const show = toggle.querySelector("[data-icon-show]");
    const hide = toggle.querySelector("[data-icon-hide]");
    const label = toggle.querySelector("[data-toggle-password-label]");

    toggle.addEventListener("click", () => {
      const revealed = input.type === "text";
      input.type = revealed ? "password" : "text";
      toggle.setAttribute("aria-pressed", String(!revealed));
      show.hidden = !revealed;
      hide.hidden = revealed;
      label.textContent = revealed ? "Tampilkan kata sandi" : "Sembunyikan kata sandi";
      input.focus();
    });
  }

  // Galat yang dikembalikan Laravel lewat query string (?error=...)
  const box = document.querySelector("[data-login-error]");
  const text = document.querySelector("[data-login-error-text]");
  const params = new URLSearchParams(window.location.search);
  const messages = {
    invalid: "Email atau kata sandi tidak sesuai. Silakan periksa kembali.",
    unregistered:
      "Akun belum terdaftar pada sistem PKKMB. Hubungi panitia untuk pendaftaran akun.",
    throttled: "Terlalu banyak percobaan masuk. Coba lagi dalam beberapa menit.",
  };
  const key = params.get("error");
  if (box && text && key && messages[key]) {
    text.textContent = messages[key];
    box.classList.remove("hidden");
    box.classList.add("flex");
  }

  // Validasi sisi klien: cegah kiriman kosong, jangan ganggu alur asli.
  form.addEventListener("submit", (e) => {
    const email = form.querySelector("#email");
    const password = form.querySelector("#password");

    if (!email.value.trim() || !password.value) {
      e.preventDefault();
      if (box && text) {
        text.textContent = "Lengkapi alamat email dan kata sandi terlebih dahulu.";
        box.classList.remove("hidden");
        box.classList.add("flex");
      }
      (!email.value.trim() ? email : password).focus();
      return;
    }

    const button = form.querySelector('button[type="submit"] span');
    if (button) button.textContent = "Memproses…";
  });
}

/* ------------------------------------------------------------------ *
 * Formulir kontak → mailto
 * ------------------------------------------------------------------ */

function mailForm() {
  const form = document.querySelector("[data-mail-form]");
  if (!form) return;

  const status = form.querySelector("[data-mail-status]");
  const to = form.dataset.mailTo;

  const showError = (name, message) => {
    const el = form.querySelector(`[data-error-for="${name}"]`);
    const field = form.querySelector(`#${name}`);
    if (el) {
      el.textContent = message;
      el.classList.toggle("hidden", !message);
    }
    if (field) {
      field.setAttribute("aria-invalid", message ? "true" : "false");
      field.classList.toggle("!border-accent-500", Boolean(message));
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    let valid = true;

    if (!data.nama?.trim()) {
      showError("nama", "Nama lengkap wajib diisi.");
      valid = false;
    } else showError("nama", "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) {
      showError("email", "Masukkan alamat email yang valid.");
      valid = false;
    } else showError("email", "");

    if (!data.pesan?.trim()) {
      showError("pesan", "Isi pesan wajib diisi.");
      valid = false;
    } else showError("pesan", "");

    if (!valid) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const subject = `[PKKMB 2026] ${data.subjek} - ${data.nama}`;
    const body = [
      `Nama          : ${data.nama}`,
      `Program studi : ${data.prodi || "-"}`,
      `Email         : ${data.email}`,
      `Topik         : ${data.subjek}`,
      "",
      data.pesan,
    ].join("\n");

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.textContent =
        "Aplikasi email Anda sedang dibuka. Bila tidak muncul, kirim manual ke " + to + ".";
      status.classList.remove("hidden");
    }
  });
}

/* ------------------------------------------------------------------ *
 * Utilitas
 * ------------------------------------------------------------------ */

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/* ------------------------------------------------------------------ *
 * Init
 * ------------------------------------------------------------------ */

const init = () => {
  mobileMenu();
  dropdowns();
  eventStatus();
  counters();
  reveal();
  postFilter();
  programFilter();
  loginForm();
  mailForm();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
