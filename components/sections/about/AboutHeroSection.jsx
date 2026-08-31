import React from "react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import { COMPANY_INFO } from "@/data/company";

/**
 * About Page Split Hero Section with Reveal entrance
 */
export default function AboutHeroSection() {
  return (
    <section className="bg-[var(--background)] pt-36 pb-16 overflow-hidden">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-12">
          {/* Left Content */}
          <Reveal direction="up" delay={50} duration={700} className="flex flex-col justify-center">
            <Badge color="#F1681D" dot className="self-start mb-6">
              About Zubyte
            </Badge>

            <h1
              className="font-heading font-bold text-[#1b1b1b] leading-[1.04] mb-6"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.8rem)" }}
            >
              Driven by the
              <br />
              desire to liberate
              <br />
              <span style={{ color: "#F1681D" }}>creative teams.</span>
            </h1>

            <p className="text-[var(--muted-foreground)] text-base leading-relaxed max-w-md mb-8">
              We build operating systems for modern work, blending deep technical expertise with a refined aesthetic to empower visionaries worldwide.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-[var(--border)]">
              {[
                { v: "50+", l: "Projects shipped" },
                { v: "3", l: "Continents" },
                { v: "98%", l: "Client retention" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-brand font-bold text-2xl text-[#F1681D]">{s.v}</p>
                  <p className="text-[var(--muted-foreground)] text-xs tracking-widest uppercase mt-0.5">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Image Composition */}
          <Reveal direction="scale" delay={150} duration={800} className="relative h-[440px] sm:h-[500px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-[#e8e7e1]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=1000&fit=crop&crop=center&auto=format"
                alt="Modern collaborative workspace"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-[#faf9f5]/10" />
            </div>

            {/* Floating Stat Card */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-5 border border-[var(--border)] z-10 animate-in fade-in duration-300">
              <p className="font-brand font-bold text-2xl text-[#F1681D]">
                {COMPANY_INFO.foundedYear}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Founded year</p>
            </div>

            {/* Floating Pill */}
            <div className="absolute top-6 right-6 bg-[#1b1b1b] text-white text-xs font-semibold px-4 py-2.5 rounded-full z-10 flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#F1681D]" />
              End-to-end ownership
            </div>
          </Reveal>
        </div>

        <div className="h-px w-full bg-[var(--border)]" />
      </Container>
    </section>
  );
}
