"use client";

import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BannerCTASection } from "@/components/sections/BannerCTASection";
import { LaunchOfferModal } from "@/components/modals/LaunchOfferModal";
import { initAllAnimations } from "@/animations";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initAllAnimations(containerRef.current);
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <PricingSection />
        <ShowcaseSection />
        <IntegrationsSection />
        <FAQSection />
        <TestimonialsSection />
        <BannerCTASection />
      </main>
      <Footer />
      <LaunchOfferModal />
    </div>
  );
}
