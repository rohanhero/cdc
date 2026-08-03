import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { About } from "@/components/site/About";
import { WhyChooseUs, Process } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingButtons } from "@/components/site/FloatingButtons";
import { business } from "@/lib/business";

const title = "Prince CDC Offset Press | Printing, Designing & Digital Services";
const description =
  "Prince CDC Offset Press offers premium visiting cards, flex banners, marriage cards, certificates, VAT bills, photocopy, online form services, EMIS updates, Nepali & English typing, graphic designing, stamp making, and more.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Offset Printing, Visiting Cards, Marriage Cards, Flex Banner, Graphic Design, VAT Bill Printing, Photocopy, Online Form, EMIS Update, Nepal Printing Service",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: business.name,
          description,
          telephone: business.phone,
          email: business.email,
          address: { "@type": "PostalAddress", streetAddress: business.address },
          openingHours: ["Su-Fr 07:00-20:00", "Sa 09:00-14:00"],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <WhyChooseUs />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <Toaster position="top-center" />
    </div>
  );
}
