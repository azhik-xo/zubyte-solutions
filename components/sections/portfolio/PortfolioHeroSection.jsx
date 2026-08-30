import React from "react";
import Container from "@/components/ui/Container";

/**
 * Portfolio Hero Section
 */
export default function PortfolioHeroSection({ selectedService }) {
  return (
    <section className="pt-36 pb-16 sm:pb-20 border-b border-white/10 bg-[#1b1b1b] text-white">
      <Container size="default">
        <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[#F1681D]">
          Proof of Work
        </p>
        <h1
          className="font-heading font-bold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
        >
          {selectedService === "All Services" ? "Client Case Studies" : selectedService}
        </h1>
        <p className="text-white/60 text-base leading-relaxed max-w-2xl">
          A selection of delivered client solutions across {selectedService === "All Services" ? "engineering, design, and cloud architecture" : selectedService.toLowerCase()} — each structured using the STAR framework to show context, execution, and measurable outcomes.
        </p>
      </Container>
    </section>
  );
}

