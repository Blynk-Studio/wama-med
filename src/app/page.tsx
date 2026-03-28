import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { FounderSection } from "@/components/sections/FounderSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AIAssistantSection } from "@/components/sections/AIAssistantSection";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesOverview />
      <FounderSection />
      <AudienceSection />
      <ProcessPreview />
      <TestimonialsSection />
      <AIAssistantSection />
      <ClosingCTA />
    </>
  );
}
