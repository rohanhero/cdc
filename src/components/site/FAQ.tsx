import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const faqs = [
  {
    q: "How long does printing take?",
    a: "Small jobs like visiting cards, stamps, and photocopies are often ready the same day. Offset runs such as bill books, brochures, and marriage cards usually take 1–3 working days depending on quantity and finishing.",
  },
  {
    q: "Do you design logos?",
    a: "Yes. Our in-house designers create logos from scratch and hand over print-ready and digital source files you can use anywhere.",
  },
  {
    q: "Can I order custom banners?",
    a: "Absolutely. We print flex banners in any size, with eyelets, rods, or stands available. Send your artwork or let us design it for you.",
  },
  {
    q: "Do you provide online form services?",
    a: "Yes — online form fill-up, EMIS updates, scanning, Nepali and English typing, CV preparation, and document formatting are all handled at our counter.",
  },
  {
    q: "Do you print marriage cards?",
    a: "We print traditional and modern marriage cards with gold foil, embossing, and matching envelopes. Sample books are available in-store.",
  },
  {
    q: "Can I place orders through WhatsApp?",
    a: "Yes. Send your files and requirements on WhatsApp, we will confirm the rate and share a proof before printing.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions we hear every day" />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="surface-card overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    >
                      <span className="min-w-0 flex-1 font-display text-base font-semibold text-foreground">
                        {faq.q}
                      </span>
                      <span
                        className={
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors " +
                          (isOpen
                            ? "bg-brand-red text-brand-red-foreground"
                            : "bg-primary/10 text-primary")
                        }
                        aria-hidden="true"
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>
                  <div
                    className={
                      "grid transition-all duration-300 " +
                      (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                    }
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
