import type { Metadata } from "next";
import { AIWidgetInline } from "@/components/widgets/AIWidget";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";
import { getDictionary } from "@/lib/dictionaries";
import { localeOpenGraph, normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const metadata = getDictionary(locale).contactPage.metadata;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      locale: localeOpenGraph(locale),
      type: "website",
    },
  };
}

const PHONE = "+212 522 000 000";
const PHONE_HREF = "tel:+212522000000";
const WHATSAPP_HREF = "https://wa.me/212522000000";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const content = dictionary.contactPage;

  return (
    <>
      <section
        className="relative overflow-hidden min-h-dvh flex items-center pt-24"
        style={{ background: "#F5F0E8" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest mb-6" style={{ background: "rgba(11,64,66,0.1)", color: "#0B4042" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            {content.hero.badge}
          </div>

          <p className="eyebrow text-brass mb-3">{content.hero.eyebrow}</p>
          <span className="brass-rule mb-6 block" />
          <h1
            className="font-black leading-tight"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#1C1410",
            }}
          >
            {content.hero.titleStart}
            <br />
            <span className="text-brass">{content.hero.titleHighlight}</span>
          </h1>
          <p
            className="mt-5 text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(28,20,16,0.6)" }}
          >
            {content.hero.body}
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-base font-medium mt-4 transition-colors duration-200"
            style={{ color: "rgba(28,20,16,0.7)" }}
          >
            <span aria-hidden="true">&#128222;</span> {PHONE}
          </a>
        </div>
      </section>

      <section
        className="py-16 sm:py-20"
        style={{ background: "#FAFAF8" }}
        aria-label={content.formSection.assistantAria}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest mb-6" style={{ background: "rgba(11,64,66,0.08)", color: "#0B4042" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            {dictionary.shared.aiSection.badge}
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 leading-tight"
            style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
          >
            {dictionary.shared.aiSection.heading}
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto"
            style={{ color: "rgba(28,20,16,0.55)" }}
          >
            {dictionary.shared.aiSection.description}
          </p>
          <div className="max-w-[520px] mx-auto">
            <AIWidgetInline />
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-28"
        style={{ background: "#FAFAF8" }}
        aria-label={content.formSection.formAria}
      >
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <div data-animate>
            <p className="eyebrow text-brass mb-3">{content.formSection.eyebrow}</p>
            <span className="brass-rule mb-5 block" />
            <h2
              className="text-2xl sm:text-3xl font-black mb-3 leading-tight"
              style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
            >
              {content.formSection.title}
            </h2>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(28,20,16,0.55)" }}
            >
              {content.formSection.body}
            </p>

            <ContactForm />

            <div
              className="mt-8 rounded-xl p-6 border border-brass/15 space-y-3 text-sm"
              style={{ background: "#FFFFFF", color: "rgba(28,20,16,0.5)" }}
            >
              <p className="flex items-start gap-2.5">
                <span className="text-brass mt-0.5">&#128205;</span>
                {dictionary.footer.addressLines.join(", ")}
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-brass">&#128222;</span>
                <a href={PHONE_HREF} className="hover:text-cream transition-colors">
                  {PHONE}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-brass">&#128231;</span>
                <a href="mailto:contact@wamamed.com" className="hover:text-cream transition-colors">
                  contact@wamamed.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-brass">&#128172;</span>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition-colors"
                >
                  {content.formSection.whatsappAvailability}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFAB href={WHATSAPP_HREF} />
    </>
  );
}
