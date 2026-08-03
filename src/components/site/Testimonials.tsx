import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

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

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 6000);
    return () => clearInterval(id);
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + reviews.length) % reviews.length);
  const review = reviews[index];

  return (
    <section id="testimonials" className="section-tint py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What our customers say" />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <article className="surface-card relative p-8 sm:p-10">
            <Quote
              className="absolute right-8 top-8 h-12 w-12 text-primary/10"
              aria-hidden="true"
            />
            <div className="flex gap-1" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-red text-brand-red" aria-hidden="true" />
              ))}
            </div>
            <p className="mt-5 font-display text-lg leading-relaxed text-foreground sm:text-xl">
              “{review.text}”
            </p>
            <div className="mt-7 flex min-w-0 items-center gap-4">
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-primary-foreground"
                style={{ background: "var(--gradient-brand)" }}
                aria-hidden="true"
              >
                {review.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-foreground">{review.name}</span>
                <span className="block text-sm text-muted-foreground">{review.role}</span>
              </span>
            </div>
          </article>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${r.name}`}
                  aria-current={i === index}
                  className={
                    "h-2 rounded-full transition-all " +
                    (i === index ? "w-7 bg-primary" : "w-2 bg-border hover:bg-primary/40")
                  }
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
