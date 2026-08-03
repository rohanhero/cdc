const business = {
  name: "Prince CDC Offset Press",
  tagline: "Printing, Designing & Digital Services",
  phone: "+977 9845106777",
  phoneHref: "tel:+9779845106777",
  whatsappHref:
    "https://wa.me/9779845106777?text=" +
    encodeURIComponent("Hello Prince CDC Offset Press, I'd like a quote for:"),
  email: "pressdesktop4@gmail.com",
  address: "Manash Chowk, Hetauda, Nepal",
};

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function initNavbar() {
  const header = $(".site-header");
  if (!header) return;

  const onScrollHandler = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };

  onScrollHandler();
  window.addEventListener("scroll", onScrollHandler, { passive: true });
}

function initMobileMenu() {
  const toggleBtn = $(".mobile-menu-toggle");
  const mobileMenu = $(".mobile-menu");
  if (!toggleBtn || !mobileMenu) return;

  const icon = toggleBtn.querySelector("i");
  const DESKTOP_BREAKPOINT = 1024;

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open menu");
    if (icon) icon.className = "fa-solid fa-bars";
  };

  const openMenu = () => {
    mobileMenu.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Close menu");
    if (icon) icon.className = "fa-solid fa-xmark";
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      closeMenu();
    }
  });
}

function initDarkMode() {
  const toggleBtn = $(".dark-mode-toggle");
  if (!toggleBtn) return;

  const stored = localStorage.getItem("dark-mode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored === "true" || (!stored && prefersDark);

  const setDarkIcon = (dark) => {
    const icon = toggleBtn.querySelector("i");
    if (icon) {
      icon.className = dark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
    toggleBtn.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode",
    );
  };

  if (isDark) {
    document.documentElement.classList.add("dark");
    setDarkIcon(true);
  }

  toggleBtn.addEventListener("click", () => {
    const isNowDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", isNowDark);
    setDarkIcon(isNowDark);
    localStorage.setItem("dark-mode", String(isNowDark));
  });
}

function initScrollReveal() {
  const reveals = $$(".reveal");
  if (!reveals.length) return;

  const reveal = (el) => {
    if (el.getAttribute("data-visible") === "true") return;
    const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
    el.setAttribute("data-visible", "true");
  };

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
    { threshold: 0.15 },
  );

  reveals.forEach((el) => observer.observe(el));

  const revealAboveFold = () => {
    reveals.forEach((el) => {
      if (el.getAttribute("data-visible") !== "true") {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          reveal(el);
        }
      }
    });
  };

  if (document.readyState !== "loading") {
    revealAboveFold();
  }
}

function initCounters() {
  const counterEl = $(".counters");
  if (!counterEl) return;

  const counters = [
    { value: 8, suffix: "+", label: "Years of Printing" },
    { value: 1000, suffix: "+", label: "Orders Delivered" },
    { value: 20, suffix: "+", label: "Print & Digital Services" },
    { value: 98, suffix: "%", label: "Happy Customers" },
  ];

  let started = false;

  const startCounters = () => {
    if (started) return;
    started = true;
    counterEl.setAttribute("data-visible", "true");
    animateCounters(counterEl, counters);
  };

  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(counterEl);
  }

  const rect = counterEl.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    startCounters();
  }
}

function animateCounters(container, counters) {
  counters.forEach((stat) => {
    const el = container.querySelector(`[data-label="${stat.label}"]`);
    if (!el) return;

    const displayEl = el.querySelector(".counter-value");
    if (!displayEl) return;

    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      const current = Math.round(stat.value * progress);
      displayEl.textContent = current.toLocaleString() + stat.suffix;
      if (frame >= total) clearInterval(id);
    }, 16);
  });
}

function initPortfolio() {
  const filterContainer = $(".portfolio-filters");
  const grid = $(".portfolio-grid");
  if (!filterContainer || !grid) return;

  const items = grid.querySelectorAll(".portfolio-item");

  const applyFilter = (category) => {
    items.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const show = category === "All" || itemCategory === category;
      item.setAttribute("data-shown", show ? "true" : "false");
    });
  };

  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    const category = btn.getAttribute("data-filter");
    if (!category) return;

    filterContainer.querySelectorAll(".filter-btn").forEach((b) => {
      b.setAttribute("aria-pressed", "false");
    });
    btn.setAttribute("aria-pressed", "true");
    applyFilter(category);
  });

  applyFilter("All");
}

function initLightbox() {
  const grid = $(".portfolio-grid");
  if (!grid) return;

  const lightbox = $(".lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  grid.addEventListener("click", (e) => {
    const button = e.target.closest(".portfolio-item");
    if (!button) return;

    const src = button.querySelector("img")?.getAttribute("src");
    const title = button.querySelector(".portfolio-title")?.textContent;
    if (!src || !title) return;

    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxCaption.textContent = title;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

function initTestimonials() {
  const container = $(".testimonials-container");
  if (!container) return;

  const reviews = [
    {
      name: "Suman Shrestha",
      role: "Shop Owner",
      initials: "SS",
      text: "Excellent print quality and quick service. My visiting cards were ready the same evening and the finish looks premium.",
    },
    {
      name: "Anita Gurung",
      role: "Event Organiser",
      initials: "AG",
      text: "Best place for visiting cards and flex banners. The banner colours came out exactly like the design we approved.",
    },
    {
      name: "Ramesh Thapa",
      role: "School Administrator",
      initials: "RT",
      text: "Affordable and professional printing. They handled our certificates, ID cards, and EMIS updates without a single error.",
    },
    {
      name: "Bina Karki",
      role: "Bride's Family",
      initials: "BK",
      text: "Our marriage cards were beautiful. The team helped with the design and delivered ahead of the promised date.",
    },
  ];

  const reviewEl = container.querySelector(".testimonial-review");
  const initialsEl = container.querySelector(".testimonial-avatar");
  const nameEl = container.querySelector(".testimonial-name");
  const roleEl = container.querySelector(".testimonial-role");
  const prevBtn = container.querySelector(".testimonial-prev");
  const nextBtn = container.querySelector(".testimonial-next");
  const dotsContainer = container.querySelector(".testimonial-dots");

  if (!reviewEl || !nameEl || !roleEl) return;

  let index = 0;

  const showReview = (i) => {
    const r = reviews[i];
    if (!r) return;
    reviewEl.textContent = `"${r.text}"`;
    nameEl.textContent = r.name;
    roleEl.textContent = r.role;
    if (initialsEl) initialsEl.textContent = r.initials;

    if (dotsContainer) {
      dotsContainer.querySelectorAll(".dot").forEach((dot, j) => {
        dot.classList.toggle("active", j === i);
        dot.setAttribute("aria-current", j === i ? "true" : "false");
      });
    }
  };

  const go = (dir) => {
    index = (index + dir + reviews.length) % reviews.length;
    showReview(index);
  };

  if (prevBtn) prevBtn.addEventListener("click", () => go(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => go(1));

  if (dotsContainer) {
    dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
      dot.addEventListener("click", () => {
        index = i;
        showReview(index);
      });
    });
  }

  let intervalId = setInterval(() => go(1), 6000);

  container.addEventListener("mouseenter", () => clearInterval(intervalId));
  container.addEventListener("mouseleave", () => {
    intervalId = setInterval(() => go(1), 6000);
  });

  showReview(0);
}

function initFAQ() {
  const faqContainer = $(".faq-list");
  if (!faqContainer) return;

  faqContainer.addEventListener("click", (e) => {
    const button = e.target.closest(".faq-btn");
    if (!button) return;

    const item = button.closest(".faq-item");
    if (!item) return;

    const isOpen = item.classList.contains("open");

    faqContainer.querySelectorAll(".faq-item").forEach((fi) => {
      fi.classList.remove("open");
      const trigger = fi.querySelector(".faq-btn");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
}

function initFloatingButtons() {
  const container = $(".floating-buttons");
  if (!container) return;

  const showBtn = container.querySelector(".back-to-top");
  if (!showBtn) return;

  const onScrollHandler = () => {
    container.classList.toggle("visible", window.scrollY > 600);
  };

  onScrollHandler();
  window.addEventListener("scroll", onScrollHandler, { passive: true });

  showBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute("href");
    if (targetId === "#" || targetId === "") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

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
      const option = document.createElement("option");
      option.value = s;
      option.textContent = s;
      selectEl.appendChild(option);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const service = formData.get("service")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || name.length < 2) {
      showFormToast(form, "Please enter your name");
      return;
    }

    if (!phone || phone.length < 7) {
      showFormToast(form, "Please enter a valid phone number");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormToast(form, "Please enter a valid email");
      return;
    }

    if (!service) {
      showFormToast(form, "Please choose a service");
      return;
    }

    if (!message || message.length < 5) {
      showFormToast(form, "Tell us a little more");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

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

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Send Enquiry';
    }
  });
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

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function initActiveNavLink() {
  const sections = $$("section[id]");
  const navLinks = $$('.navbar-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.getAttribute("id"));
        }
      });
    },
    { threshold: 0.3 },
  );

  sections.forEach((section) => observer.observe(section));
}

function initShare() {
  const shareBtn = $(".share-btn");
  if (!shareBtn) return;

  const shareData = {
    title: business.name,
    text: `${business.name} — ${business.tagline}`,
    url: window.location.href,
  };

  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  });

  function fallbackShare() {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      shareBtn.setAttribute("aria-label", "Link copied to clipboard");
      const icon = shareBtn.querySelector("i");
      if (icon) {
        icon.className = "fa-solid fa-check";
        setTimeout(() => {
          icon.className = "fa-solid fa-share-nodes";
          shareBtn.setAttribute("aria-label", "Share this website");
        }, 2000);
      }
    });
  }
}

function init() {
  initNavbar();
  initMobileMenu();
  initDarkMode();
  initScrollReveal();
  initCounters();
  initPortfolio();
  initLightbox();
  initTestimonials();
  initFAQ();
  initFloatingButtons();
  initSmoothScroll();
  initContactForm();
  initActiveNavLink();
  initShare();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
