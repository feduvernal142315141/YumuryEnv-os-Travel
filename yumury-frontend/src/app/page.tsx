import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesGridSection } from "@/components/home/CategoriesGridSection";
import { FeaturedCombosSection } from "@/components/home/FeaturedCombosSection";
import { FamiliesSectionTeaser } from "@/components/home/FamiliesSectionTeaser";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TrackingShowcaseSection } from "@/components/home/TrackingShowcaseSection";
import { BestsellersSection } from "@/components/home/BestsellersSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { GuaranteeSection } from "@/components/home/GuaranteeSection";
import { CTAFinalSection } from "@/components/home/CTAFinalSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesGridSection />
      <FeaturedCombosSection />
      <FamiliesSectionTeaser />
      <HowItWorksSection />
      <TrackingShowcaseSection />
      <BestsellersSection />
      <TestimonialsSection />
      <GuaranteeSection />
      <CTAFinalSection />
    </>
  );
}
