import {
  BadgeCheck,
  Banknote,
  BookOpen,
  Brush,
  Copy,
  CreditCard,
  FileText,
  Flag,
  IdCard,
  Image,
  Languages,
  Layers,
  LayoutTemplate,
  Mail,
  Megaphone,
  Newspaper,
  PenTool,
  Printer,
  ReceiptText,
  Scan,
  ScrollText,
  Share2,
  ShieldCheck,
  Sparkles,
  Stamp,
  Sticker,
  Type,
  Utensils,
  Wand2,
  Wallet,
  FileSignature,
  Binary,
  BookMarked,
  UserRound,
  Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

type Service = { icon: LucideIcon; title: string; description: string };

const groups: { id: string; title: string; blurb: string; tone: "blue" | "red"; items: Service[] }[] =
  [
    {
      id: "printing",
      title: "Printing Services",
      blurb: "Sharp offset and digital printing on premium stock.",
      tone: "blue",
      items: [
        { icon: CreditCard, title: "Visiting Cards", description: "Matte, gloss, and spot-UV cards printed with crisp edges." },
        { icon: BadgeCheck, title: "Certificates", description: "Award and training certificates on premium textured paper." },
        { icon: Flag, title: "Flex Banner Printing", description: "Weather-resistant large-format banners in any size." },
        { icon: Heart, title: "Marriage Cards", description: "Traditional and modern wedding cards with foil finishes." },
        { icon: ReceiptText, title: "VAT Bills", description: "Compliant VAT invoice printing with your business details." },
        { icon: BookOpen, title: "Receipt Books", description: "Numbered carbonless receipt books in duplicate or triplicate." },
        { icon: BookMarked, title: "Bill Books", description: "Custom bill books bound and serial-numbered to order." },
        { icon: FileText, title: "Letterheads", description: "Branded letterheads on quality bond paper." },
        { icon: Mail, title: "Envelopes", description: "All standard sizes printed with your logo and address." },
        { icon: Newspaper, title: "Brochures", description: "Bi-fold, tri-fold, and multi-page brochures." },
        { icon: Megaphone, title: "Flyers", description: "High-impact promotional flyers in bulk quantities." },
        { icon: Sticker, title: "Stickers", description: "Die-cut vinyl and paper stickers, indoor or outdoor." },
        { icon: IdCard, title: "ID Cards", description: "PVC staff, school, and event ID cards with lanyards." },
        { icon: ScrollText, title: "Invitation Cards", description: "Events, ceremonies, and corporate invitations." },
        { icon: Utensils, title: "Menu Cards", description: "Durable laminated menus for cafés and restaurants." },
        { icon: Layers, title: "Customized Printing", description: "Any format, any finish — tell us what you need." },
      ],
    },
    {
      id: "design",
      title: "Design Services",
      blurb: "In-house designers who make your brand look sharp.",
      tone: "red",
      items: [
        { icon: PenTool, title: "Logo Design", description: "Distinctive marks with full source files delivered." },
        { icon: CreditCard, title: "Business Card Design", description: "Layouts crafted to print perfectly the first time." },
        { icon: Flag, title: "Banner Design", description: "Eye-catching artwork sized for any banner format." },
        { icon: LayoutTemplate, title: "Poster Design", description: "Event, campaign, and promotional poster artwork." },
        { icon: Share2, title: "Social Media Design", description: "Post and story creatives that match your brand." },
        { icon: Brush, title: "Graphic Designing", description: "Complete visual identity and marketing collateral." },
        { icon: Image, title: "Photo Editing", description: "Retouching, background removal, and colour correction." },
      ],
    },
    {
      id: "digital",
      title: "Digital Services",
      blurb: "Fast, accurate online and documentation support.",
      tone: "blue",
      items: [
        { icon: Wand2, title: "Online Form Fill-up", description: "Assisted application submissions, done right." },
        { icon: Binary, title: "EMIS Update", description: "School EMIS data entry and record updates." },
        { icon: Languages, title: "Nepali Typing", description: "Accurate Unicode and Preeti Nepali typing." },
        { icon: Type, title: "English Typing", description: "Fast, error-free English document typing." },
        { icon: FileSignature, title: "Document Formatting", description: "Professional layout for reports and proposals." },
        { icon: UserRound, title: "Resume / CV Preparation", description: "Modern CVs written and designed to impress." },
        { icon: Scan, title: "Scanning", description: "High-resolution scanning to PDF or image files." },
        { icon: ShieldCheck, title: "Lamination", description: "Glossy and matte lamination in all sizes." },
      ],
    },
    {
      id: "office",
      title: "Office Services",
      blurb: "Everyday essentials while you wait.",
      tone: "red",
      items: [
        { icon: Copy, title: "Photocopy", description: "Bulk black-and-white copying at sharp rates." },
        { icon: Sparkles, title: "Color Photocopy", description: "True-to-original colour copies up to A3." },
        { icon: Printer, title: "Document Printing", description: "Print from USB, email, or WhatsApp instantly." },
        { icon: Wallet, title: "Spiral Binding", description: "Spiral, comb, and hard binding for reports." },
        { icon: Stamp, title: "Stamp Making", description: "Self-inking and rubber stamps made same day." },
        { icon: Banknote, title: "Rate Estimates", description: "Free, transparent quotes before any job starts." },
      ],
    },
  ];

export function Services() {
  return (
    <section id="services" className="section-tint py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Everything your business needs to look printed and professional"
          description="One press, four service lines — printing, design, digital documentation, and daily office work."
        />

        <div className="mt-14 space-y-14">
          {groups.map((group) => (
            <div key={group.id}>
              <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  <span
                    className={
                      group.tone === "red"
                        ? "border-b-4 border-brand-red pb-1"
                        : "border-b-4 border-primary pb-1"
                    }
                  >
                    {group.title}
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground">{group.blurb}</p>
              </Reveal>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.items.map((item, i) => (
                  <Reveal as="li" key={item.title} delay={Math.min(i * 40, 240)}>
                    <article className="surface-card hover-lift group h-full p-5">
                      <span
                        className={
                          "grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 " +
                          (group.tone === "red"
                            ? "bg-brand-red/10 text-brand-red"
                            : "bg-primary/10 text-primary")
                        }
                      >
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h4 className="mt-4 font-display text-base font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
