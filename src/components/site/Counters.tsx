import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

const stats = [
  { value: 12, suffix: "+", label: "Years of Printing" },
  { value: 5000, suffix: "+", label: "Orders Delivered" },
  { value: 40, suffix: "+", label: "Print & Digital Services" },
  { value: 98, suffix: "%", label: "Happy Customers" },
];

function Counter({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setDisplay(Math.round(value * progress));
      if (frame >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [run, value]);

  return (
    <span className="font-display text-3xl font-bold text-white sm:text-4xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Counters() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);

  return (
    <div
      ref={ref}
      data-visible={visible}
      className="reveal mt-14 grid grid-cols-2 gap-3 sm:mt-16 lg:grid-cols-4 lg:gap-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-panel rounded-2xl px-5 py-5 text-white/90 shadow-soft"
        >
          <Counter value={stat.value} suffix={stat.suffix} run={visible} />
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-white/70">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
