import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
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
      <section
        className="relative overflow-hidden min-h-dvh flex items-center pt-24"
        style={{ background: "#F5F0E8" }}
      >
        <p
          className="font-cormorant absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ fontSize: "18vw", opacity: 0.04, color: "#1C1410", lineHeight: 1 }}
          aria-hidden="true"
        >
          خدمات
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
                  style={{ fontSize: "5rem", lineHeight: 1, color: "rgba(11,64,66,0.1)" }}
                  aria-hidden="true"
                >
                  {service.number}
                </p>
                <p
                  className="font-almarai text-xs tracking-widest mb-3"
                  style={{ color: "rgba(11,64,66,0.6)", direction: "rtl", textAlign: "right" }}
                >
                  {service.ar}
                </p>
                <h3
                  className="text-xl font-black mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
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
                  className="text-2xl sm:text-3xl font-black mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
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
