import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Printer, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About Us" },
  { href: "#why-us", label: "Why Choose Us" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-panel shadow-soft" : "bg-transparent border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-glow"
            style={{ background: "var(--gradient-brand)" }}
          >
            <Printer className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span
              className={cn(
                "block truncate font-display text-base font-bold leading-tight sm:text-lg",
                scrolled ? "text-foreground" : "text-foreground lg:text-white",
              )}
            >
              Prince CDC <span className="text-brand-red">Offset Press</span>
            </span>
            <span
              className={cn(
                "hidden text-[11px] font-medium uppercase tracking-[0.16em] sm:block",
                scrolled ? "text-muted-foreground" : "text-muted-foreground lg:text-white/70",
              )}
            >
              Print · Design · Digital
            </span>
          </span>
        </a>

        <ul className="ml-auto hidden items-center gap-0.5 xl:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                  scrolled ? "text-foreground/80" : "text-foreground/80 lg:text-white/85",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 xl:ml-2">
          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] sm:inline-flex"
            style={{ background: "var(--gradient-brand)" }}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Get a Quote
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="glass-panel border-t border-border xl:hidden">
          <ul className="mx-auto grid max-w-7xl gap-1 px-4 pb-5 pt-2 sm:grid-cols-2 sm:px-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="sm:col-span-2">
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-xl bg-brand-red px-4 py-3 text-center text-sm font-semibold text-brand-red-foreground"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
