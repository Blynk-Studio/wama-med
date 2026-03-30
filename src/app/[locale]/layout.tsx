import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimationProvider } from "@/components/ui/AnimationProvider";
import { LazyCustomCursor, LazyAIWidget } from "@/components/ui/ClientWidgets";
import { LocaleProvider } from "@/components/ui/LocaleProvider";
import { HtmlLangSync } from "@/components/ui/HtmlLangSync";
import { ZelligeCanvas } from "@/components/ui/ZelligeCanvas";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import { isLocale, localeOpenGraph, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    openGraph: {
      locale: localeOpenGraph(isLocale(locale) ? locale : "fr"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <>
      <HtmlLangSync lang={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "@id": "https://wamamed.com",
            name: "Wama Med",
            description: dictionary.schemaDescription,
            url: "https://wamamed.com",
            telephone: "+212-522-000-000",
            email: "contact@wamamed.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "5 Rue Molière",
              addressLocality: "Casablanca",
              addressRegion: "Grand Casablanca",
              addressCountry: "MA",
            },
            areaServed: [
              "Morocco",
              "France",
              "Belgium",
              "Netherlands",
              "Senegal",
              "Ivory Coast",
            ],
            availableLanguage: ["fr", "ar", "en"],
            openingHours: "Mo-Su 00:00-23:59",
            medicalSpecialty: "GeneralPractice",
          }),
        }}
      />
      <LocaleProvider locale={locale} dictionary={dictionary}>
        <AnimationProvider>
          <ZelligeCanvas />
          <LazyCustomCursor />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-brass focus:text-ink focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
          >
            {dictionary.skipToContent}
          </a>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer locale={locale} content={dictionary.footer} />
          <LazyAIWidget />
        </AnimationProvider>
      </LocaleProvider>
    </>
  );
}
