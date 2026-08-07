/* ============================================================
   PRINCE CDC OFFSET PRESS — animations.js
   ------------------------------------------------------------
   All scroll-triggered and entrance animations + ambient hero
   effects. Every animation runs on CSS transforms/opacity via
   classes, so the main thread stays at 60fps.
   ============================================================ */

/* ------------------------- Page loader ------------------------- */
function initPageLoader() {
  const loader = $(".preloader");
  if (!loader) return;

  // Respect reduced motion: show content immediately.
  if (prefersReducedMotion) {
    document.documentElement.classList.add("is-loaded");
    loader.classList.add("done");
    return;
  }

  const hide = () => {
    document.documentElement.classList.add("is-loaded");
    loader.classList.add("done");
  };

  // Fixed minimum timing so the logo + bar feel intentional.
  const minTime = window.setTimeout(hide, 1500);

  // Also finish as soon as the page has fully loaded (whichever first).
  const onLoad = () => {
    window.clearTimeout(minTime);
    hide();
  };
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad, { once: true });

  // Hard cap: never leave the loader up longer than 4s.
  window.setTimeout(hide, 4000);
}

/* ------------------------- Scroll reveal (variants + stagger) ------------------------- */
function initReveal() {
  const reveals = $$(".reveal");
  if (!reveals.length) return;

  const reveal = (el) => {
    if (el.getAttribute("data-visible") === "true") return;
    const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
    if (delay && !prefersReducedMotion) el.style.transitionDelay = `${delay}ms`;
    el.setAttribute("data-visible", "true");
  };

  // Reveal everything immediately under reduced motion.
  if (prefersReducedMotion) {
    reveals.forEach((el) => el.setAttribute("data-visible", "true"));
    return;
  }

  if (typeof IntersectionObserver === "undefined") {
    reveals.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  reveals.forEach((el) => observer.observe(el));

  // Anything above the fold should appear straight away.
  reveals.forEach((el) => {
    if (el.getAttribute("data-visible") !== "true") {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) reveal(el);
    }
  });
}

/* ------------------------- Split hero headline ------------------------- */
function initSplitHeadline() {
  /* Restart class-based entrance when loader completes. */
  const title = $(".hero-title");
  if (!title || prefersReducedMotion) return; // words already visible via CSS

  // Break text into word tokens (keeps inline elements like the gradient span intact).
  const words = [];
  const container = document.createElement("span");
  container.className = "hero-words";

  const addText = (text) =>
    text.split(/\s+/).filter(Boolean).forEach((w) => words.push({ text: w, isEl: false }));
  const addElement = (el) => words.push({ el, isEl: true });

  title.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) addText(node.textContent);
    else if (node.nodeType === Node.ELEMENT_NODE) addElement(node);
  });

  const delay = 0.15; // base logo delay in seconds
  const step = 0.075;
  let index = 0;

  words.forEach((word) => {
    const wrap = document.createElement("span");
    wrap.className = "hero-word";
    const inner = document.createElement("span");
    inner.className = "hero-word-inner";
    inner.style.transitionDelay = `${delay + index * step}s`;

    if (word.isEl) inner.appendChild(word.el.cloneNode(true));
    else inner.textContent = word.text;

    wrap.appendChild(inner);
    container.appendChild(wrap);
    if (!word.isEl) wrap.appendChild(document.createTextNode(" "));
    index += 1;
  });

  title.replaceChildren(container);
}

/* ------------------------- Hero background FX ------------------------- */
function initHeroFX() {
  const hero = $(".hero");
  if (!hero) return;

  // Particles on a canvas for performance.
  const canvas = $(".hero-particles", hero);
  if (canvas && window.requestAnimationFrame && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, parts;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      const count = Math.min(60, Math.floor((w * h) / 22000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.15 + Math.random() * 0.4),
        a: 0.15 + Math.random() * 0.4,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let last = null;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -6) {
          p.y = h + 6;
          p.x = Math.random() * w;
        }
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });
      last = requestAnimationFrame(draw);
    };
    draw();

    // Pause when the hero is off-screen (perf win).
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!last) last = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(last);
          last = null;
        }
      },
      { threshold: 0 },
    );
    io.observe(hero);
  }
}

/* ------------------------- Mouse-tracking card spotlight ------------------------- */
function initCardSpotlight() {
  if (prefersReducedMotion || !window.matchMedia("(hover: hover)").matches) return;

  const cards = $$(".card-hover");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  });
}

/* ------------------------- Button ripples ------------------------- */
function initRipples() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn, .filter-btn, .icon-btn");
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
}

/* ------------------------- Image parallax on mouse ------------------------- */
function initParallax() {
  const imgs = $$(".parallax-img");
  if (!imgs.length || prefersReducedMotion || !window.matchMedia("(hover: hover)").matches) return;

  imgs.forEach((img) => {
    const depth = parseFloat(img.getAttribute("data-depth") || "0.3");
    img.closest(".relative")?.addEventListener("mousemove", (e) => {
      const wrap = img.closest(".relative");
      const rect = wrap.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
      img.style.transform = `translate3d(${dx * 20 * depth}px, ${dy * 20 * depth}px, 0)`;
    });
  });
}

/* ------------------------- Floating portfolio badge ------------------------- */
function initPortfolioBadges() {
  $$(".portfolio-thumb").forEach((thumb) => {
    if ($(".portfolio-badge", thumb)) return;
    const badge = document.createElement("span");
    badge.className = "portfolio-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
    thumb.appendChild(badge);
  });
}

/* ------------------------- FAQ accordion ------------------------- */
function initFAQ() {
  const list = $(".faq-list");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-btn");
    if (!btn) return;
    const item = btn.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.contains("open");

    $$(".faq-item", list).forEach((fi) => {
      fi.classList.remove("open");
      const t = fi.querySelector(".faq-btn");
      if (t) t.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
}