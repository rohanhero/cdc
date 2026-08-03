import {
  Award,
  Clock,
  HeartHandshake,
  PaintBucket,
  Settings2,
  Smile,
  Tag,
  Users,
  MessageSquare,
  FileCheck2,
  PackageCheck,
  Truck,
} from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const reasons = [
  { icon: Award, title: "Premium Print Quality", text: "Calibrated offset output with true-to-proof colour every run." },
  { icon: Tag, title: "Affordable Prices", text: "Honest rates with bulk discounts and no hidden charges." },
  { icon: Clock, title: "Fast Delivery", text: "Same-day options on urgent jobs and small batches." },
  { icon: Users, title: "Experienced Designers", text: "A studio team that has shaped thousands of local brands." },
  { icon: PaintBucket, title: "Custom Design Support", text: "Free layout guidance until the artwork is press-ready." },
  { icon: Smile, title: "High Customer Satisfaction", text: "Most of our work comes from repeat customers and referrals." },
  { icon: Settings2, title: "Modern Printing Technology", text: "Offset, digital, and wide-format under one roof." },
  { icon: HeartHandshake, title: "Friendly Service", text: "Clear communication in Nepali and English, start to finish." },
];

const steps = [
  { icon: MessageSquare, title: "Contact Us", text: "Call, WhatsApp, or drop into the shop with your idea." },
  { icon: FileCheck2, title: "Share Requirements", text: "Send your design or let our team create it for you." },
  { icon: PackageCheck, title: "We Print & Prepare", text: "Proof approval, printing, finishing, and quality check." },
  { icon: Truck, title: "Delivery / Pickup", text: "Collect from the press or get it delivered to your door." },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-tint py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why choose us"
          title="Reasons customers keep coming back"
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal as="li" key={reason.title} delay={Math.min(i * 50, 300)}>
              <article className="surface-card hover-lift group h-full p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-brand-red/10 group-hover:text-brand-red">
                  <reason.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How it works" title="From idea to finished print in four steps" />

        <ol className="relative mt-14 grid gap-6 lg:grid-cols-4">
          <span
            className="absolute left-0 right-0 top-9 hidden h-px bg-linear-to-r from-primary/10 via-primary/40 to-brand-red/40 lg:block"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120} className="relative">
              <div className="surface-card hover-lift h-full p-6">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground shadow-glow"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-5 block text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
