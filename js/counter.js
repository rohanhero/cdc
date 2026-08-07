/* ============================================================
   PRINCE CDC OFFSET PRESS — counter.js
   ------------------------------------------------------------
   Animated stat counters. Runs once when the stats block enters
   the viewport. Uses requestAnimationFrame with an ease-out curve
   for a natural, premium count-up.
   ============================================================ */

function initCounters() {
  const container = $(".counters");
  if (!container) return;

  const stats = [
    { value: 8, suffix: "+" },
    { value: 1000, suffix: "+" },
    { value: 20, suffix: "+" },
    { value: 98, suffix: "%" },
  ];

  const values = $$(".counter-value", container);
  if (!values.length) return;

  let started = false;

  const run = () => {
    if (started) return;
    started = true;
    container.setAttribute("data-visible", "true");

    // Reduced motion: just show the final numbers.
    if (prefersReducedMotion) {
      values.forEach((el, i) => {
        const stat = stats[i];
        if (stat) el.textContent = stat.value.toLocaleString() + stat.suffix;
      });
      return;
    }

    const duration = 1600;
    const t0 = performance.now();

    const tick = (now) => {
      const t = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
      values.forEach((el, i) => {
        const stat = stats[i];
        if (!stat) return;
        el.textContent = Math.round(stat.value * ease).toLocaleString() + stat.suffix;
      });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Start if already on screen, otherwise observe.
  const rect = container.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    run();
    return;
  }

  if (typeof IntersectionObserver !== "undefined") {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.unobserve(container);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(container);
  } else {
    run();
  }
}