/* ============================================================
   PRINCE CDC OFFSET PRESS — main.js
   ------------------------------------------------------------
   Entry point. Loaded FIRST so its shared config + helpers are
   available to every other module (animations, cursor, counter,
   slider, scroll) once the DOM is ready.
   ============================================================ */

/* ------------------------- Business data ------------------------- */
const business = {
  name: "Prince CDC Offset Press",
  tagline: "Printing, Designing & Digital Services",
  phone: "+977 9845106777",
  phoneHref: "tel:+9779845106777",
  whatsappHref:
    "https://wa.me/9779845106777?text=" +
    encodeURIComponent("Hello Prince CDC Offset Press, I'd like a quote for:"),
  email: "info@princecdcoffsetpress.com.np",
  address: "Manash Chowk, Hetauda, Nepal",
};

/* ------------------------- DOM helpers ------------------------- */
function $(selector, root) {
  return (root || document).querySelector(selector);
}

function $$(selector, root) {
  return Array.from((root || document).querySelectorAll(selector));
}

/* --------------------- Motion preference check --------------------- */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* --------------------- Smooth anchor scrolling --------------------- */
function smoothScrollTo(target, offset = 76) {
  const top =
    target.getBoundingClientRect().top + window.scrollY - offset * 0.4;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ------------------------- Initialization ------------------------- */
function safeInit(fn) {
  try {
    fn();
  } catch (err) {
    // A failure in one module must never block the rest of the page
    // (e.g. a sandboxed preview throwing on localStorage etc.).
    if (window.console)
      console.error("[init]", err && err.name, err && err.message);
  }
}

function initMain() {
  /* Motion modules (loader FIRST so the splash always clears) */
  safeInit(initPageLoader);
  safeInit(initReveal);
  safeInit(initSplitHeadline);
  safeInit(initHeroFX);
  safeInit(initCardSpotlight);
  safeInit(initRipples);
  safeInit(initParallax);
  safeInit(initPortfolioBadges);
  safeInit(initProcessTimeline);
  safeInit(initCursor);

  /* Data-driven widgets */
  safeInit(initCounters);
  safeInit(initTestimonialSlider);
  safeInit(initFAQ);

  /* Scroll + UI chrome module */
  safeInit(initScrollUI);
  safeInit(initMobileMenu);
  safeInit(initDarkMode);
  safeInit(initActiveNav);
  safeInit(initFloatingButtons);
  safeInit(initSmoothScroll);
  safeInit(initFooterAccordion);

  /* Content interactions */
  safeInit(initPortfolio);
  safeInit(initLightbox);
  safeInit(initContactForm);
  safeInit(initShare);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMain);
} else {
  initMain();
}

/* ============================================================
   CONTENT INTERACTIONS
   (Kept here as small, cohesive pieces: they mostly glue DOM
   markup that already exists in the HTML.)
   ============================================================ */

/* ------------------------- Portfolio filtering ------------------------- */
function initPortfolio() {
  const filterContainer = $(".portfolio-filters");
  const grid = $(".portfolio-grid");
  if (!filterContainer || !grid) return;

  const items = $$(".portfolio-item", grid);

  const applyFilter = (category) => {
    items.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      item.setAttribute(
        "data-shown",
        category === "All" || itemCategory === category ? "true" : "false",
      );
    });
  };

  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    const category = btn.getAttribute("data-filter");
    if (!category) return;
    $$(".filter-btn", filterContainer).forEach((b) =>
      b.setAttribute("aria-pressed", "false"),
    );
    btn.setAttribute("aria-pressed", "true");
    applyFilter(category);
    if (typeof initReveal === "function") initReveal(); // re-observe new items
  });

  applyFilter("All");
}

/* ------------------------- Portfolio lightbox ------------------------- */
function initLightbox() {
  const grid = $(".portfolio-grid");
  const lightbox = $(".lightbox");
  if (!grid || !lightbox) return;

  const img = $(".lightbox-img", lightbox);
  const caption = $(".lightbox-caption", lightbox);
  const closeBtn = $(".lightbox-close", lightbox);

  const close = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".portfolio-item");
    if (!item) return;
    const src = item.querySelector("img")?.getAttribute("src");
    const title = item.querySelector(".portfolio-title")?.textContent;
    if (!src || !title) return;
    if (img) {
      img.src = src;
      img.alt = title;
    }
    if (caption) caption.textContent = title;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  if (closeBtn) closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) close();
  });
}

/* ------------------------- Contact form (floating labels + WhatsApp) ------------------------- */
function initContactForm() {
  const form = $(".contact-form");
  if (!form) return;

  const services = [
    "Printing Services",
    "Design Services",
    "Digital Services",
    "Office Services",
    "Other",
  ];
  const selectEl = form.querySelector('select[name="service"]');
  if (selectEl) {
    services.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      selectEl.appendChild(opt);
    });
  }

  // Track filled fields to float the labels.
  const fields = $$(".form-field", form);
  fields.forEach((field) => {
    const control = field.querySelector("input, textarea, select");
    if (!control) return;
    const sync = () =>
      field.classList.toggle("has-value", control.value.trim().length > 0);
    control.addEventListener("input", sync);
    control.addEventListener("change", sync);
    sync();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const f = new FormData(form);
    const name = f.get("name")?.toString().trim();
    const phone = f.get("phone")?.toString().trim();
    const email = f.get("email")?.toString().trim();
    const service = f.get("service")?.toString().trim();
    const message = f.get("message")?.toString().trim();

    if (!name || name.length < 2)
      return showFormToast(form, "Please enter your name");
    if (!phone || phone.length < 7)
      return showFormToast(form, "Please enter a valid phone number");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return showFormToast(form, "Please enter a valid email");
    if (!service) return showFormToast(form, "Please choose a service");
    if (!message || message.length < 5)
      return showFormToast(form, "Tell us a little more");

    const btn = form.querySelector('button[type="submit"]');
    const btnLabel = btn?.querySelector(".btn-label");
    const svgLabel = btn?.querySelector("svg");
    if (btn) btn.classList.add("is-loading");

    // Simulate a brief send so the loading state reads clearly.
    window.setTimeout(() => {
      if (btn) btn.classList.replace("is-loading", "is-success");
      const text = `Hello ${business.name}!%0A%0AName: ${name}%0APhone: ${phone}${
        email ? `%0AEmail: ${email}` : ""
      }%0AService: ${service}%0A%0A${message}`;
      window.open(
        `${business.whatsappHref.split("?")[0]}?text=${text}`,
        "_blank",
        "noopener",
      );

      showFormToast(form, "Thanks! Your enquiry is ready to send on WhatsApp.");
      form.reset();
      fields.forEach((field) => field.classList.remove("has-value"));

      window.setTimeout(() => {
        if (btn) {
          btn.classList.remove("is-success");
          btn.innerHTML = svgLabel
            ? svgLabel.outerHTML + '<span class="btn-label">Send Enquiry</span>'
            : '<span class="btn-label">Send Enquiry</span>';
        }
      }, 1600);
    }, 700);
  });

  /* Preserve the original label inside a span so it can fade for states. */
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn && !submitBtn.querySelector(".btn-label")) {
    const label = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="btn-label">${label}</span>`;
  }
}

function showFormToast(form, message) {
  const existing = form.parentElement.querySelector(".form-toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "form-toast";
  toast.textContent = message;
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  form.parentElement.appendChild(toast);
  window.setTimeout(() => {
    toast.style.opacity = "0";
    window.setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ------------------------- Share button ------------------------- */
function initShare() {
  const shareBtn = $(".share-btn");
  if (!shareBtn) return;

  const data = {
    title: business.name,
    text: `${business.name} — ${business.tagline}`,
    url: window.location.href,
  };

  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch (err) {
        if (err.name !== "AbortError") fallback();
      }
    } else {
      fallback();
    }
  });

  function fallback() {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      shareBtn.setAttribute("aria-label", "Link copied to clipboard");
      const icon = shareBtn.querySelector("i");
      if (icon) {
        icon.className = "fa-solid fa-check";
        window.setTimeout(() => {
          icon.className = "fa-solid fa-share-nodes";
          shareBtn.setAttribute("aria-label", "Share this website");
        }, 2000);
      }
    });
  }
}
