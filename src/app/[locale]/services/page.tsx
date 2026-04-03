import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { getDictionary } from "@/lib/dictionaries";
import { localeOpenGraph, normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const metadata = getDictionary(locale).servicesPage.metadata;

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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const content = dictionary.servicesPage;

  return (
    <>
      <PublicPageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.titleStart}
        highlight={content.hero.titleHighlight}
        body={content.hero.body}
        titleMaxWidth="12ch"
      />

      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#FAFAF8" }}
        aria-label={content.servicesAria}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {content.services.map((service) => (
              <div
                key={service.number}
                className="relative rounded-2xl p-6 sm:p-8 border border-brass/15 hover:border-brass/40 hover:shadow-2xl transition-all duration-300"
                style={{ background: "#FFFFFF" }}
              >
                <p
                  className="font-cormorant absolute top-4 right-6 select-none pointer-events-none"
                  style={{ fontSize: "5rem", lineHeight: 1, color: "rgba(23,59,99,0.1)" }}
                  aria-hidden="true"
                >
                  {service.number}
                </p>
                <h3
                  className="text-lg font-semibold mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-body)", color: "#1C1410" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(28,20,16,0.65)" }}
                >
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "rgba(28,20,16,0.55)" }}
                    >
                      <span className="text-brass mt-0.5 flex-shrink-0">&#10003;</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#FAFAF8" }}
        aria-label={content.detailsAria}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-24 sm:space-y-32">
          {content.featured.map((service, idx) => (
            <div
              key={service.title}
              className={`grid lg:grid-cols-2 gap-10 sm:gap-16 items-center ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-brass/10">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 40%" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <h2
                  className="text-xl sm:text-2xl font-semibold mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-body)", color: "#1C1410" }}
                >
                  {service.title}
                </h2>
                <p
                  className="leading-relaxed text-[15px] mb-5"
                  style={{ color: "rgba(28,20,16,0.65)" }}
                >
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "rgba(28,20,16,0.55)" }}
                    >
                      <span className="text-brass mt-0.5 flex-shrink-0">&#10003;</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClosingCTA locale={locale} content={dictionary.shared.closingCta} />
    </>
  );
}
