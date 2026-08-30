import React from "react";
import HeroSection from "@/components/sections/home/HeroSection";
import SocialProofSection from "@/components/sections/home/SocialProofSection";
import ServicesBentoSection from "@/components/sections/home/ServicesBentoSection";
import TeamBannerSection from "@/components/sections/home/TeamBannerSection";
import TestimonialSection from "@/components/sections/home/TestimonialSection";
import FaqSection from "@/components/sections/home/FaqSection";
import CtaSection from "@/components/sections/common/CtaSection";

export const metadata = {
  title: "Zubyte Solution — Next-Gen IT Solutions for Modern Enterprises",
  description:
    "Empowering teams that move at full stride with bespoke software, design systems, cloud architecture, and AI automation.",
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <SocialProofSection />
      <ServicesBentoSection />
      <TeamBannerSection />
      <TestimonialSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}

