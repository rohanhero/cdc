import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import visitingCards from "@/assets/work-visiting-cards.jpg";
import marriageCards from "@/assets/work-marriage-cards.jpg";
import flexBanner from "@/assets/work-flex-banner.jpg";
import certificates from "@/assets/work-certificates.jpg";
import stamps from "@/assets/work-stamps.jpg";
import billBooks from "@/assets/work-bill-books.jpg";
import posters from "@/assets/work-posters.jpg";
import office from "@/assets/work-office.jpg";
import { Reveal, SectionHeading } from "./Reveal";

const items = [
  { src: visitingCards, title: "Visiting Cards", category: "Printing" },
  { src: marriageCards, title: "Marriage Cards", category: "Printing" },
  { src: certificates, title: "Certificates", category: "Printing" },
  { src: flexBanner, title: "Flex Banners", category: "Printing" },
  { src: stamps, title: "Stamps", category: "Office" },
  { src: billBooks, title: "Bill Books", category: "Office" },
  { src: posters, title: "Posters & Design Samples", category: "Design" },
  { src: office, title: "Office Printing", category: "Office" },
];

const categories = ["All", "Printing", "Design", "Office"] as const;

export function Portfolio() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<(typeof items)[number] | null>(null);

  const visible = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured work"
          title="A look at what leaves our press"
          description="Real jobs printed for businesses, schools, families, and organisations."
        />

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={
                "rounded-full px-5 py-2 text-sm font-semibold transition-all " +
                (active === cat
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary")
              }
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <Reveal as="li" key={item.title} delay={Math.min(i * 60, 300)}>
              <button
                type="button"
                onClick={() => setLightbox(item)}
                className="surface-card hover-lift group block w-full overflow-hidden text-left"
                aria-label={`View larger image of ${item.title}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={`${item.title} printed by Prince CDC Offset Press`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-primary/0 opacity-0 transition-all duration-300 group-hover:bg-primary/35 group-hover:opacity-100">
                    <ZoomIn className="h-8 w-8 text-white" aria-hidden="true" />
                  </span>
                </span>
                <span className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="font-display text-base font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red">
                    {item.category}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close image"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-4xl">
            <img
              src={lightbox.src}
              alt={lightbox.title}
              width={1024}
              height={768}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm font-medium text-white/80">
              {lightbox.title}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
