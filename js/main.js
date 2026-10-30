/* Prince CDC Offset Press - shared behaviour */
(function () {
  const WHATSAPP = "https://wa.me/9779845106777";

  /* Header shadow */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile menu */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* Portfolio / home filters */
  const filterWrap = document.querySelector(".filters");
  if (filterWrap) {
    filterWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      filterWrap.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      document.querySelectorAll("[data-cat]").forEach((card) => {
        const show = cat === "all" || card.dataset.cat.split(" ").includes(cat);
        card.classList.toggle("hide", !show);
      });
    });
  }

  /* Lightbox */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Close"><i data-lucide="x"></i></button>' +
    '<button class="lightbox-nav lightbox-prev" aria-label="Previous"><i data-lucide="chevron-left"></i></button>' +
    '<img src="" alt="Preview">' +
    '<button class="lightbox-nav lightbox-next" aria-label="Next"><i data-lucide="chevron-right"></i></button>' +
    '<div class="lightbox-caption"></div>';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector("img");
  const lbCaption = lightbox.querySelector(".lightbox-caption");
  let workCards = [];
  let current = 0;

  function updateLightbox() {
    const card = workCards[current];
    const img = card.querySelector("img");
    lbImg.src = img.dataset.full || img.src;
    lbCaption.textContent = card.querySelector("h3") ? card.querySelector("h3").textContent : "";
  }

  function step(dir) {
    current = (current + dir + workCards.length) % workCards.length;
    updateLightbox();
  }

  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => step(-1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  function openLightbox(cards, index) {
    workCards = cards;
    current = index;
    document.body.style.overflow = "hidden";
    updateLightbox();
    lightbox.classList.add("open");
    if (window.lucide) lucide.createIcons();
  }

  function closeLightbox() {
    document.body.style.overflow = "";
    lightbox.classList.remove("open");
  }

  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => {
      const visible = [...document.querySelectorAll(".work-card:not(.hide)")];
      openLightbox(visible, visible.indexOf(card));
    });
  });

  /* Contact form → validated, then hands the enquiry to WhatsApp */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("[data-required]").forEach((input) => {
        const field = input.closest(".field");
        const val = input.value.trim();
        const bad =
          !val ||
          (input.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val));
        field.classList.toggle("invalid", bad);
        if (bad) ok = false;
      });
      const success = form.querySelector(".form-success");
      if (ok) {
        const name = form.querySelector("#f-name").value.trim();
        const service = form.querySelector("#f-service").value;
        const phone = form.querySelector("#f-phone").value.trim();
        const message = form.querySelector("#f-message").value.trim();
        const text = encodeURIComponent(
          "Hello Prince CDC Offset Press!\nName: " + name +
          "\nService: " + service +
          "\nPhone: " + phone +
          "\nMessage: " + message
        );
        success.innerHTML =
          "Thank you, <b>" + name +
          '</b>! Your message is ready - <a href="' + WHATSAPP + "?text=" + text +
          '" target="_blank" rel="noopener" style="text-decoration:underline">send it on WhatsApp</a> and we will reply quickly.';
        success.classList.add("show");
        form.reset();
      } else {
        success.textContent = "Please fill in the highlighted fields correctly.";
        success.classList.add("show");
      }
    });
  }

  /* Footer newsletter (demo success message) */
  const newsletter = document.querySelector(".newsletter");
  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = newsletter.parentElement.querySelector(".newsletter-msg");
      if (msg) {
        msg.textContent = "Thank you! You are subscribed to our updates.";
        msg.classList.add("show");
      }
      newsletter.reset();
    });
  }

  /* Footer year */
  document.querySelectorAll(".js-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* Lucide icons */
  if (window.lucide) lucide.createIcons();
})();
