import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { WordRevealQuote } from "@/components/sections/WordRevealQuote";
import { getDictionary } from "@/lib/dictionaries";
import { localeOpenGraph, normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const metadata = getDictionary(locale).about.metadata;

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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const content = dictionary.about;

  return (
    <>
      <PublicPageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        titleMaxWidth="14ch"
      />

      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#FAFAF8" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-start">
            <div
              className="rounded-2xl border border-brass/20 p-8 sm:p-10"
              style={{ background: "#FFFFFF" }}
            >
              <p className="eyebrow text-brass mb-4">{content.founder.eyebrow}</p>
              <h2
                className="section-display text-ink mb-6"
                style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
              >
                {content.founder.name}
              </h2>
              <p className="text-sm font-semibold text-teal mb-8">
                {content.founder.role}
              </p>
              <p className="text-brass text-sm font-semibold">
                {content.founder.experience}
              </p>
            </div>

            <div className="pt-8 lg:pt-0">
              <p className="eyebrow text-brass mb-4">{content.founder.storyEyebrow}</p>
              <span className="brass-rule mb-6 block" />

              <WordRevealQuote
                text={content.founder.quote}
                cite={content.founder.cite}
              />

              <div className="space-y-4 leading-relaxed text-[15px]" style={{ color: "rgba(28,20,16,0.6)" }}>
                {content.founder.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20"
        style={{ background: "#F5F0E8" }}
        aria-label="Expertise"
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center">
            {content.credentials.map((item) => (
              <div key={item.title}>
                <p
                  className="font-semibold mb-2"
                  style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.1rem)", color: "var(--color-teal)", lineHeight: 1.35 }}
                >
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm" style={{ color: "rgba(28,20,16,0.5)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#FAFAF8" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <p className="eyebrow text-brass mb-4">{content.mission.eyebrow}</p>
              <span className="brass-rule mb-6 block" />
              <h2
                className="section-display text-ink mb-6"
                style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
              >
                {content.mission.title}
              </h2>
              {content.mission.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="leading-relaxed text-[15px] mt-4 first:mt-0"
                  style={{ color: "rgba(28,20,16,0.6)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-brass/10">
              <Image
                src="/images/wama-accompagnement.jpg"
                alt={content.mission.alt}
                fill
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#F5F0E8" }}
        aria-labelledby="values-heading"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow text-brass mb-3">{content.values.eyebrow}</p>
            <span className="brass-rule mx-auto mb-5 block" />
            <h2
              className="section-display text-ink"
              id="values-heading"
              style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
            >
              {content.values.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.items.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl p-6 border border-brass/15 hover:border-brass/40 hover:shadow-2xl transition-all duration-300"
                style={{ background: "#FFFFFF" }}
              >
                <h3
                  className="text-lg font-semibold mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-body)", color: "#1C1410" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(28,20,16,0.65)" }}
                >
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA locale={locale} content={dictionary.shared.closingCta} />
    </>
  );
}
