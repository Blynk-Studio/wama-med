import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ScrollJourney } from "@/components/sections/ScrollJourney";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { FounderSection } from "@/components/sections/FounderSection";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { AISection } from "@/components/sections/AISection";
import { getDictionary } from "@/lib/dictionaries";
import { localeOpenGraph, normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const metadata = getDictionary(locale).home.metadata;

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const dictionary = getDictionary(locale);

  return (
    <>
      <HeroSection />
      <TrustStrip pillars={dictionary.home.trustStrip.pillars} />
      <ScrollJourney />
      <ServicesOverview />
      <FounderSection locale={locale} content={dictionary.home.founderSection} />
      <ProcessPreview locale={locale} content={dictionary.home.processPreview} />
      <TestimonialsSection content={dictionary.home.testimonials} />
      <AISection />
      <ContactSection />
      <ClosingCTA locale={locale} content={dictionary.shared.closingCta} />
    </>
  );
}
