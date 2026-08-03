import { CheckCircle2 } from "lucide-react";
import officeImg from "@/assets/work-office.jpg";
import pressImg from "@/assets/hero-press.jpg";
import { Reveal } from "./Reveal";

const points = [
  "Modern offset and digital printing under one roof",
  "Creative design team for businesses, schools, and families",
  "Reliable, affordable, and always on time",
  "Complete customer satisfaction on every order",
];

export function About() {
  return (
    <section id="about" className="section-tint py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" aria-hidden="true" />
            About us
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            A press built on precision, service, and trust
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Prince CDC Offset Press is committed to providing premium-quality printing, designing,
            and digital services. We combine modern printing technology with creative design to
            deliver outstanding results for businesses, students, organizations, and individuals.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Our mission is to provide reliable, affordable, and timely services with complete
            customer satisfaction.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={120}>
          <div className="relative">
            <img
              src={pressImg}
              alt="Prince CDC Offset Press printing floor"
              loading="lazy"
              width={1920}
              height={1280}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
            <img
              src={officeImg}
              alt="Branded stationery printed in-house"
              loading="lazy"
              width={1024}
              height={768}
              className="absolute -bottom-10 -left-4 hidden w-48 rounded-2xl border-4 border-background object-cover shadow-lift sm:block lg:w-56"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
