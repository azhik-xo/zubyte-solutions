import React from "react";
import ServicesHeroSection from "@/components/sections/services/ServicesHeroSection";
import ServicesNavigatorSection from "@/components/sections/services/ServicesNavigatorSection";
import ProcessSection from "@/components/sections/services/ProcessSection";
import CtaSection from "@/components/sections/common/CtaSection";

export const metadata = {
  title: "Expert IT Services & Capabilities",
  description:
    "Explore our 5 core engineering disciplines: Build, Design, Grow, Deploy, and Engineering. Tailored solutions for modern web, mobile, and cloud environments.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <ServicesHeroSection />
      <ServicesNavigatorSection />
      <ProcessSection />
      <CtaSection
        title="Ready to transform your digital presence?"
        description="Tell us about your project and we'll recommend the right architecture and delivery team for your goals."
        variant="dark"
      />
    </main>
  );
}

