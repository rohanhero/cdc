/* ============================================================
   PRINCE CDC OFFSET PRESS — scroll.js
   ------------------------------------------------------------
   Sticky navbar states, dark mode, mobile menu, scroll progress
   bar, active-section nav highlighting, floating action buttons,
   back-to-top, scroll-reveal observer for reveal variants, and
   the process timeline fill.
   ============================================================ */

/* ------------------------- Sticky navbar ------------------------- */
function initScrollUI() {
  const header = $(".site-header");
  if (!header) return;

  const progress = $(".scroll-progress");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 16);
    document.body.classList.toggle("scrolled", y > 16);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? Math.min((y / max) * 100, 100) : 0}%`;
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ------------------------- Dark mode ------------------------- */
function safeGetPref(key, fallback) {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    return null;
  }
}
function safeSetPref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    /* storage may be unavailable (e.g. sandboxed preview) */
  }
}

function initDarkMode() {
  const toggle = $(".dark-mode-toggle");
  if (!toggle) return;

  const stored = safeGetPref("dark-mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored === "true" || (!stored && prefersDark);

  const setIcon = (dark) => {
    const icon = toggle.querySelector("i");
    if (icon) icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    toggle.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode",
    );
  };

  if (isDark) {
    document.documentElement.classList.add("dark");
    setIcon(true);
  }

  toggle.addEventListener("click", () => {
    const nowDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nowDark);
    setIcon(nowDark);
    safeSetPref("dark-mode", String(nowDark));
  });
}

/* ------------------------- Mobile menu ------------------------- */
function initMobileMenu() {
  const toggle = $(".mobile-menu-toggle");
  const menu = $(".mobile-menu");
  if (!toggle || !menu) return;

  const backdrop = $(".mobile-backdrop");
  const icon = toggle.querySelector("i");

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (icon) icon.className = "fa-solid fa-bars";
    document.body.style.overflow = "";
    if (backdrop) backdrop.classList.remove("visible");
  };

  const openMenu = () => {
    menu.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    if (icon) icon.className = "fa-solid fa-xmark";
    document.body.style.overflow = "hidden";
    if (backdrop) backdrop.classList.add("visible");
  };

  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") closeMenu();
    else openMenu();
  });

  const closeBtn = menu.querySelector(".mobile-menu-close");
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  if (backdrop) backdrop.addEventListener("click", closeMenu);
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
  });
}

/* ------------------------- Footer accordion ------------------------- */
function initFooterAccordion() {
  const groups = $$(".footer-group");
  if (!groups.length) return;

  groups.forEach((group) => {
    const toggle = group.querySelector(".footer-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const open = group.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  });
}

/* ------------------------- Active nav section ------------------------- */
function initActiveNav() {
  const sections = $$("section[id]");
  const links = $$('.navbar-links a[href^="#"]');
  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      const match = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", match);
      if (match) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((s) => observer.observe(s));
}

/* ------------------------- Floating action buttons ------------------------- */
function initFloatingButtons() {
  const container = $(".floating-buttons");
  if (!container) return;
  const top = $(".back-to-top");
  if (!top) return;

  const onScroll = () => {
    container.classList.toggle("visible", window.scrollY > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  top.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

/* ------------------------- Smooth anchor scrolling ------------------------- */
function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href");
    if (id === "#" || id === "") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(target);
  });
}

/* ------------------------- Process timeline progress ------------------------- */
function initProcessTimeline() {
  const list = $(".process-list");
  if (!list) return;
  const line = $(".process-line", list);
  if (!line) return;

  const icons = $$(".step-icon", list);

  const update = () => {
    const rect = list.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(
      Math.max((vh * 0.7 - rect.top) / (rect.height + vh * 0.5), 0),
      1,
    );
    line.style.transform = `scaleX(${progress})`;

    if (progress > 0 && progress < 1) {
      list.classList.add("is-in-view");
      icons.forEach((el) => el.classList.add("is-pulsing"));
    } else if (progress >= 1) {
      list.classList.add("is-in-view");
      icons.forEach((el) => el.classList.remove("is-pulsing"));
    }
  };

  if (typeof IntersectionObserver !== "undefined") {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          update();
          window.addEventListener("scroll", update, { passive: true });
        } else {
          window.removeEventListener("scroll", update);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(list);
  }
}