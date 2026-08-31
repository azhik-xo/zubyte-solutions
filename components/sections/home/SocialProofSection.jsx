import React from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SOCIAL_PROOF_STATS, CLIENT_LOGOS } from "@/data/company";

/**
 * Social proof stats grid and marquee client logos with Reveal entrance
 */
export default function SocialProofSection() {
  return (
    <section className="bg-[#1b1b1b] py-16 sm:py-20 text-white border-y border-white/10">
      <Container size="default">
        <Reveal direction="up" delay={50} duration={600}>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/40 text-center mb-10">
            Proof in numbers
          </p>
        </Reveal>

        {/* Stats Grid */}
        <Reveal direction="scale" delay={100} duration={700}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {SOCIAL_PROOF_STATS.map((item, idx) => (
              <div
                key={item.label}
                className="bg-[#1b1b1b] p-6 sm:p-8 text-center group hover:bg-[#222222] transition-colors"
              >
                <p
                  className="font-brand font-bold mb-1 text-[#F1681D]"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  }}
                >
                  {item.stat}
                </p>
                <p className="text-sm font-semibold text-white mb-1">
                  {item.label}
                </p>
                <p className="text-xs text-white/40">{item.sub}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Client Marquee */}
        <Reveal direction="up" delay={200} duration={600}>
          <div className="mt-14 overflow-hidden mask-fade">
            <div className="marquee-track">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
                <span
                  key={idx}
                  className="text-lg sm:text-xl font-bold text-white/25 hover:text-white/60 tracking-widest uppercase mx-8 sm:mx-12 shrink-0 transition-colors select-none"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
