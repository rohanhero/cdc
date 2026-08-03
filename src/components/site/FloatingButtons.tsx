import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { business } from "@/lib/business";

export function FloatingButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      <a
        href={business.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="grid h-13 w-13 h-13 place-items-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition-transform hover:scale-110"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={business.phoneHref}
        aria-label={`Call ${business.name}`}
        className="grid place-items-center rounded-full bg-brand-red p-3.5 text-brand-red-foreground shadow-lift transition-transform hover:scale-110"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={
          "grid place-items-center rounded-full p-3.5 text-primary-foreground shadow-lift transition-all hover:scale-110 " +
          (show ? "opacity-100" : "pointer-events-none opacity-0")
        }
        style={{ background: "var(--gradient-brand)" }}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
