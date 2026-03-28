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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ScrollJourney />
      <ServicesOverview />
      <FounderSection />
      <ProcessPreview />
      <TestimonialsSection />
      <AISection />
      <ContactSection />
      <ClosingCTA />
    </>
  );
}
