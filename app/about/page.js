import React from "react";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import OurStorySection from "@/components/sections/about/OurStorySection";
import PrinciplesSection from "@/components/sections/about/PrinciplesSection";
import MissionVisionSection from "@/components/sections/about/MissionVisionSection";
import CtaSection from "@/components/sections/common/CtaSection";

export const metadata = {
  title: "About Us | Our Story, Vision & Principles",
  description:
    "Driven by the desire to liberate creative teams from menial tasks. Discover our story, core practice tenets, mission, and leadership.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHeroSection />
      <OurStorySection />
      <PrinciplesSection />
      <MissionVisionSection />
      <CtaSection
        title="Ready to refine your digital ecosystem?"
        description="Partner with us to build tools that amplify your team's potential — from first concept to production."
        variant="dark"
      />
    </main>
  );
}

