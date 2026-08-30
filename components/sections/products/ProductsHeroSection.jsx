import React from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/**
 * Products Page Dark Glowing Hero Section
 */
export default function ProductsHeroSection() {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pb-20 border-b border-white/10 bg-[#1b1b1b] text-white">
      {/* Glow Orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-25"
        style={{ background: "#F1681D" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: "#6366f1" }}
      />

      <Container size="default" className="relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/50">
            Zubyte Product Suite
          </span>
        </div>

        {/* Main Headline Block */}
        <div className="max-w-3xl mb-10">
          <h1
            className="font-heading font-bold text-white leading-[1.02] mb-6"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
          >
            Enterprise software
            <br />
            engineered for
            <br />
            <span style={{ color: "#F1681D" }}>every industry.</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">
            Four purpose-built product suites — each designed from first principles to solve operational, workforce, and technology challenges specific to its sector.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" variant="orange" size="md">
            Request a Demo →
          </Button>
          <Button href="/contact" variant="outlineDark" size="md">
            Talk to Sales
          </Button>
        </div>
      </Container>
    </section>
  );
}

