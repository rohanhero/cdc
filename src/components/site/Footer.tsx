import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Printer, Share2 } from "lucide-react";
import { business } from "@/lib/business";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About Us" },
  { href: "#why-us", label: "Why Choose Us" },
  { href: "#faq", label: "FAQ" },
];

const serviceLinks = [
  "Visiting Cards",
  "Flex Banner Printing",
  "Marriage Cards",
  "Certificates & ID Cards",
  "Bill Books & VAT Bills",
  "Graphic Design",
  "Online Form & EMIS",
  "Photocopy & Lamination",
];

export function Footer() {
  const share = async () => {
    const data = {
      title: business.name,
      text: `${business.name} — ${business.tagline}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* dismissed */
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(data.url);
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-glow"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Printer className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-base font-bold leading-tight text-foreground">
              Prince CDC <span className="text-brand-red">Offset Press</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Premium printing, creative design, and reliable digital services — delivered on time,
            every time.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={share}
              aria-label="Share this website"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground">
            Quick Links
          </h2>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground">
            Services
          </h2>
          <ul className="mt-5 space-y-2.5">
            {serviceLinks.map((service) => (
              <li key={service}>
                <a
                  href="#services"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground">
            Contact
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={business.phoneHref} className="hover:text-primary">
                {business.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="break-all hover:text-primary">
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
              <span>{business.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © 2026 Prince CDC Offset Press. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
