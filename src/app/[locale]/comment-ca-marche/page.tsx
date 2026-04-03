import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { AnimatedTimeline } from "@/components/sections/AnimatedTimeline";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { getDictionary } from "@/lib/dictionaries";
import { localeOpenGraph, localizePath, normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const metadata = getDictionary(locale).approach.metadata;

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

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const content = dictionary.approach;

  return (
    <>
      <PublicPageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.titleStart}
        highlight={content.hero.titleHighlight}
        body={content.hero.body}
        titleMaxWidth="13ch"
      />

      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#FAFAF8" }}
        aria-label={content.stepsAria}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <AnimatedTimeline steps={content.steps} />
        </div>
      </section>

      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#F5F0E8" }}
        aria-labelledby="faq-heading"
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow text-brass mb-3">{content.faq.eyebrow}</p>
            <span className="brass-rule mx-auto mb-5 block" />
            <h2
              className="section-display text-ink"
              id="faq-heading"
              style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
            >
              {content.faq.title}
            </h2>
          </div>

          <FaqAccordion items={content.faqs} />

          <div className="text-center mt-10">
            <p className="text-sm mb-4" style={{ color: "rgba(28,20,16,0.4)" }}>
              {content.faq.prompt}
            </p>
            <Link
              href={localizePath(locale, "/contact")}
              className="inline-flex items-center gap-2 bg-brass hover:bg-brass-light text-ink font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brass/30 hover:scale-105"
            >
              {content.faq.cta}
            </Link>
          </div>
        </div>
      </section>

      <ClosingCTA locale={locale} content={dictionary.shared.closingCta} />
    </>
  );
}
