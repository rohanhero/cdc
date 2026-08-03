import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import heroPress from "@/assets/hero-press.jpg";
import { business } from "@/lib/business";
import { Counters } from "./Counters";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <img
        src={heroPress}
        alt="Offset printing press running full-colour sheets at Prince CDC Offset Press"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      {/* animated printing sheets */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[0, 1.6, 3.2].map((delay, i) => (
          <span
            key={i}
            className="animate-sheet-feed absolute h-16 w-28 rounded-md bg-white/15 backdrop-blur-sm"
            style={{ top: `${22 + i * 24}%`, animationDelay: `${delay}s` }}
          />
        ))}
        <span className="animate-ink-float absolute right-[12%] top-[24%] h-24 w-24 rounded-full bg-brand-red/30 blur-2xl" />
        <span
          className="animate-ink-float absolute left-[8%] bottom-[18%] h-32 w-32 rounded-full bg-primary/40 blur-3xl"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8 lg:pb-32 lg:pt-48">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Offset · Digital · Design
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            High-Quality Printing &amp;{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-accent)" }}
            >
              Digital Solutions
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            From Visiting Cards to Flex Banners, Marriage Cards, Certificates, Office Printing,
            Online Services, and Graphic Design — we deliver quality with precision.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
              style={{ background: "var(--gradient-brand)" }}
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>

        <Counters />
      </div>
    </section>
  );
}
