import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { business, mapEmbedSrc } from "@/lib/business";
import { Reveal, SectionHeading } from "./Reveal";

const services = [
  "Printing Services",
  "Design Services",
  "Digital Services",
  "Office Services",
  "Other",
];

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255).or(z.literal("")),
  service: z.string().trim().min(1, "Please choose a service").max(60),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);
    const { name, phone, email, service, message } = parsed.data;
    const text = `Hello ${business.name}!%0A%0AName: ${name}%0APhone: ${phone}${
      email ? `%0AEmail: ${email}` : ""
    }%0AService: ${service}%0A%0A${message}`;
    window.open(`${business.whatsappHref.split("?")[0]}?text=${text}`, "_blank", "noopener");
    toast.success("Thanks! Your enquiry is ready to send on WhatsApp.");
    form.reset();
    setSubmitting(false);
  };

  const inputClass =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary";

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us what you need printed"
          description="Share your requirement and we'll reply with a rate, a timeline, and a proof."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="space-y-5">
            <div className="surface-card p-7">
              <h3 className="font-display text-lg font-bold text-foreground">{business.name}</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <a href={business.phoneHref} className="text-foreground hover:text-primary">
                    {business.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                    aria-hidden="true"
                  />
                  <a
                    href={business.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary"
                  >
                    {business.whatsapp} (WhatsApp)
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all text-foreground hover:text-primary"
                  >
                    {business.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                  <span className="text-foreground">{business.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-foreground">
                    {business.hours.map((h) => (
                      <span key={h.day} className="block">
                        <span className="font-medium">{h.day}:</span>{" "}
                        <span className="text-muted-foreground">{h.time}</span>
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>

            <div className="surface-card overflow-hidden">
              <iframe
                title={`Map showing ${business.name}`}
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="surface-card space-y-4 p-7" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input id="name" name="name" required maxLength={100} className={inputClass} placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" required maxLength={20} className={inputClass} placeholder="98XXXXXXXX" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                    Email <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input id="email" name="email" type="email" maxLength={255} className={inputClass} placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground">
                    Service Required
                  </label>
                  <select id="service" name="service" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  maxLength={1000}
                  className={inputClass}
                  placeholder="Quantity, size, paper type, deadline…"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Enquiry
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Your enquiry opens in WhatsApp so we can reply instantly.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
