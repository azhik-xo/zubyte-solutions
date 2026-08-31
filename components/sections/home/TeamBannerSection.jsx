import React from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/**
 * "Built for every team" Banner Section with Reveal entrance
 */
export default function TeamBannerSection() {
  return (
    <section className="bg-[var(--background)] pb-24 sm:pb-28">
      <Container size="default">
        <Reveal direction="scale" delay={50} duration={800}>
          <div className="bg-[#222222] rounded-3xl overflow-hidden relative shadow-2xl">
            <div
              className="w-full h-[380px] sm:h-[440px] bg-cover bg-center opacity-25"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=600&fit=crop&auto=format')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/70 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 sm:p-12">
              <h2
                className="font-heading font-bold text-white leading-tight mb-4"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
              >
                Built for every team.
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                Zubyte aggressively grows your business with elite digital skills, proven system architecture, and fast operations.
              </p>
              <Button href="/contact" variant="dark" size="md">
                Grow with Zubyte
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
