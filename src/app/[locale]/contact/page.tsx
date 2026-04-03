import type { Metadata } from "next";
import { AIWidgetInline } from "@/components/widgets/AIWidget";
import { ContactForm } from "@/components/sections/ContactForm";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
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
      <PublicPageHero
        badge={
          <>
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--color-brass)" }}
            />
            {content.hero.badge}
          </>
        }
        eyebrow={content.hero.eyebrow}
        title={content.hero.titleStart}
        highlight={content.hero.titleHighlight}
        body={content.hero.body}
        titleMaxWidth="12ch"
        supplementary={
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-base font-medium transition-colors duration-200"
            style={{ color: "rgba(28,20,16,0.72)" }}
          >
            <span aria-hidden="true">&#128222;</span> {PHONE}
          </a>
        }
      />

      <section
        className="py-16 sm:py-20"
        style={{ background: "#FAFAF8" }}
        aria-label={content.formSection.assistantAria}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest mb-6" style={{ background: "rgba(23,59,99,0.08)", color: "var(--color-teal)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--color-brass)" }} />
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
                <a href={PHONE_HREF} className="hover:text-teal transition-colors">
                  {PHONE}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-brass">&#128231;</span>
                <a href="mailto:contact@wamamed.com" className="hover:text-teal transition-colors">
                  contact@wamamed.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-brass">&#128172;</span>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
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
