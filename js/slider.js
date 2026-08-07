/* ============================================================
   PRINCE CDC OFFSET PRESS — slider.js
   ------------------------------------------------------------
   Testimonial slider: auto-play, manual arrows, dots, swipe, and
   a scale / fade / blur transition between cards.
   ============================================================ */

function initTestimonialSlider() {
  const container = $(".testimonials-container");
  if (!container) return;

  const reviews = [
    { name: "Suman Shrestha", role: "Shop Owner", initials: "SS", text: "Excellent print quality and quick service. My visiting cards were ready the same evening and the finish looks premium." },
    { name: "Anita Gurung", role: "Event Organiser", initials: "AG", text: "Best place for visiting cards and flex banners. The banner colours came out exactly like the design we approved." },
    { name: "Ramesh Thapa", role: "School Administrator", initials: "RT", text: "Affordable and professional printing. They handled our certificates, ID cards, and EMIS updates without a single error." },
    { name: "Bina Karki", role: "Bride's Family", initials: "BK", text: "Our marriage cards were beautiful. The team helped with the design and delivered ahead of the promised date." },
  ];

  const card = container.querySelector(".testimonial");
  const reviewEl = container.querySelector(".testimonial-review");
  const initialsEl = container.querySelector(".testimonial-avatar");
  const nameEl = container.querySelector(".testimonial-name");
  const roleEl = container.querySelector(".testimonial-role");
  const prevBtn = container.querySelector(".testimonial-prev");
  const nextBtn = container.querySelector(".testimonial-next");
  const dotsContainer = container.querySelector(".testimonial-dots");

  if (!card || !reviewEl || !nameEl || !roleEl) return;

  let index = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 5000;
  const transitionMS = prefersReducedMotion ? 0 : 360;

  const render = (i) => {
    const r = reviews[i];
    if (!r) return;
    reviewEl.textContent = `"${r.text}"`;
    nameEl.textContent = r.name;
    roleEl.textContent = r.role;
    if (initialsEl) initialsEl.textContent = r.initials;
    if (dotsContainer) {
      dotsContainer.querySelectorAll(".dot").forEach((d, j) => {
        d.classList.toggle("active", j === i);
        d.setAttribute("aria-current", j === i ? "true" : "false");
      });
    }
  };

  const swap = (next) => {
    if (prefersReducedMotion) {
      index = next;
      render(index);
      return;
    }
    if (card.classList.contains("switching")) return; // guard double-clicks
    card.classList.add("switching");
    window.setTimeout(() => {
      index = next;
      render(index);
      card.classList.remove("switching");
    }, transitionMS);
  };

  const go = (dir) => swap((index + dir + reviews.length) % reviews.length);

  const restartAutoplay = () => {
    if (prefersReducedMotion) return;
    window.clearInterval(autoplayTimer);
    autoplayTimer = window.setInterval(() => go(1), AUTOPLAY_MS);
  };

  if (prevBtn) prevBtn.addEventListener("click", () => { go(-1); restartAutoplay(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { go(1); restartAutoplay(); });

  if (dotsContainer) {
    dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
      dot.addEventListener("click", () => { swap(i); restartAutoplay(); });
    });
  }

  // Pause auto-play while hovered / focused.
  ["mouseenter", "focusin"].forEach((evt) =>
    container.addEventListener(evt, () => window.clearInterval(autoplayTimer)),
  );
  ["mouseleave", "focusout"].forEach((evt) =>
    container.addEventListener(evt, restartAutoplay),
  );

  // Swipe support (touch).
  let startX = 0;
  let startY = 0;
  container.addEventListener(
    "touchstart",
    (e) => {
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
    },
    { passive: true },
  );
  container.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        go(dx < 0 ? 1 : -1);
        restartAutoplay();
      }
    },
    { passive: true },
  );

  render(0);
  restartAutoplay();
}