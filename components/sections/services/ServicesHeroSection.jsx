import React from "react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SERVICES } from "@/data/services";

/**
 * Services Hero Section with split layout
 */
export default function ServicesHeroSection() {
  return (
    <section className="bg-[var(--background)] pt-36 pb-16 overflow-hidden">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <Badge color="#F1681D" dot className="self-start mb-6">
              Our Capabilities
            </Badge>

            <h1
              className="font-heading font-bold text-[#1b1b1b] leading-[1.04] mb-6"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)" }}
            >
              Comprehensive IT
              <br />
              Solutions for the
              <br />
              <span style={{ color: "#F1681D" }}>Modern Enterprise.</span>
            </h1>

            <p className="text-[var(--muted-foreground)] text-base leading-relaxed max-w-md mb-8">
              We design and build intelligent systems that drive digital transformation — from foundational cloud infrastructure to advanced AI and responsive user experiences.
            </p>

            <div className="flex flex-wrap gap-4 pt-8 border-t border-[var(--border)]">
              <Button href="/contact" variant="primary" size="md">
                Start a Project →
              </Button>
              <Button href="/portfolio" variant="outline" size="md">
                View Proof of Work
              </Button>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="relative h-[420px] sm:h-[500px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-[#1b1b1b]">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=1000&fit=crop&crop=center&auto=format"
                alt="Technology network and cloud systems"
                className="w-full h-full object-cover opacity-80"
                loading="eager"
              />
              <div className="absolute inset-0 bg-[#1b1b1b]/30" />
            </div>

            {/* Floating Service Count Badge */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-5 border border-[var(--border)] z-10 animate-in fade-in duration-300">
              <p className="font-brand font-bold text-2xl text-[#F1681D]">
                {SERVICES.length}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Discipline groups</p>
            </div>

            {/* Floating Delivery Pill */}
            <div className="absolute top-6 right-6 bg-[#1b1b1b] text-white text-xs font-semibold px-4 py-2.5 rounded-full z-10 flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#F1681D]" />
              End-to-end delivery
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[var(--border)]" />
      </Container>
    </section>
  );
}

