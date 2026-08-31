import React from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/**
 * Homepage Hero Section with Entrance Animations
 */
export default function HeroSection() {
  return (
    <section className="bg-[var(--background)] pt-36 pb-20 overflow-hidden">
      <Container size="default" className="flex flex-col items-center text-center">
        {/* Eyebrow */}
        <Reveal direction="up" delay={50} duration={600}>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--muted-foreground)] mb-6">
            Next-gen IT solutions
          </p>
        </Reveal>

        {/* Main Headline */}
        <Reveal direction="up" delay={150} duration={700}>
          <h1
            className="font-heading font-bold text-[#1b1b1b] leading-[1.04] mb-6 max-w-4xl"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.8rem)" }}
          >
            Next-gen IT solutions for the
            <br />
            modern enterprise.
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal direction="up" delay={250} duration={700}>
          <p className="text-[var(--muted-foreground)] text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            Empowers teams that move at full stride, unlocks unprecedented business speed and delivers reliable engineering at scale.
          </p>
        </Reveal>

        {/* CTA Actions */}
        <Reveal direction="up" delay={350} duration={700}>
          <div className="flex flex-wrap gap-4 mb-16 sm:mb-20 justify-center">
            <Button href="/contact" variant="primary" size="md">
              Get started →
            </Button>
            <Button href="/services" variant="outline" size="md">
              Explore services
            </Button>
          </div>
        </Reveal>

        {/* Grain Gradient Intelligence Card */}
        <Reveal direction="scale" delay={400} duration={800} className="w-full">
          <div className="w-full relative rounded-3xl overflow-hidden aspect-[16/7] sm:aspect-[21/9] grain-gradient-bg shadow-xl border border-black/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border border-white/25 shadow-2xl">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 33 33"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M27 12L25.125 7.875L21 6L25.125 4.125L27 0L28.875 4.125L33 6L28.875 7.875L27 12V12M27 33L25.125 28.875L21 27L25.125 25.125L27 21L28.875 25.125L33 27L28.875 28.875L27 33V33M12 28.5L8.25 20.25L0 16.5L8.25 12.75L12 4.5L15.75 12.75L24 16.5L15.75 20.25L12 28.5V28.5"
                    fill="white"
                  />
                </svg>
                Zubyte Intelligence
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
