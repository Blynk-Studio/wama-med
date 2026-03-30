import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { AnimatedTimeline } from "@/components/sections/AnimatedTimeline";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
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
      <section
        className="relative overflow-hidden min-h-dvh flex items-center pt-24"
        style={{ background: "#F5F0E8" }}
      >
        <p
          className="font-cormorant absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ fontSize: "18vw", opacity: 0.04, color: "#1C1410", lineHeight: 1 }}
          aria-hidden="true"
        >
          كيف يعمل
        </p>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <p className="eyebrow text-brass mb-3">{content.hero.eyebrow}</p>
          <span className="brass-rule mb-6 block" />
          <h1
            className="font-black leading-tight max-w-3xl"
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
            className="max-w-2xl mt-6 leading-relaxed text-base"
            style={{ color: "rgba(28,20,16,0.6)" }}
          >
            {content.hero.body}
          </p>
        </div>
      </section>

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
              className="text-3xl sm:text-4xl font-black"
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
