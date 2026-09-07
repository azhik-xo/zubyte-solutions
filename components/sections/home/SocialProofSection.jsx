"use client";

import React from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useCompany } from "@/context/CompanyContext";

/**
 * Social proof stats grid and dynamic marquee client logos fetched from MongoDB
 */
export default function SocialProofSection() {
  const { stats, clientLogos } = useCompany();

  const activeClients = (clientLogos || []).filter((c) => c.active !== false);

  // Duplicate client items for a seamless marquee loop
  const marqueeItems = activeClients.length > 0
    ? [...activeClients, ...activeClients, ...activeClients]
    : [];

  return (
    <section className="bg-[#1b1b1b] py-16 sm:py-20 text-white border-y border-white/10">
      <Container size="default">
        <Reveal direction="up" delay={50} duration={600}>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/40 text-center mb-10">
            Proof in numbers
          </p>
        </Reveal>

        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <Reveal direction="scale" delay={100} duration={700}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {stats.map((item, idx) => (
                <div
                  key={item.label || idx}
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
        )}

        {/* Dynamic Client Marquee - Original Styling Preserved */}
        {marqueeItems.length > 0 && (
          <Reveal direction="up" delay={200} duration={600}>
            <div className="mt-14 overflow-hidden mask-fade">
              <div className="marquee-track items-center">
                {marqueeItems.map((client, idx) => (
                  <div
                    key={`${client._id || client.name}-${idx}`}
                    className="mx-8 sm:mx-12 shrink-0 flex items-center gap-3 select-none group"
                  >
                    {client.logoUrl ? (
                      <img
                        src={client.logoUrl}
                        alt={client.name}
                        className="h-7 sm:h-8 w-auto object-contain opacity-40 group-hover:opacity-90 transition-opacity grayscale"
                        loading="lazy"
                      />
                    ) : null}
                    <span className="text-lg sm:text-xl font-bold text-white/25 group-hover:text-white/60 tracking-widest uppercase transition-colors">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
