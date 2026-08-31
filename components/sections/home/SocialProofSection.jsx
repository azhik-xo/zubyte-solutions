"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SOCIAL_PROOF_STATS, CLIENT_LOGOS as FALLBACK_LOGOS } from "@/data/company";
import { api } from "@/lib/api";

/**
 * Social proof stats grid and dynamic marquee client logos
 */
export default function SocialProofSection() {
  const [stats, setStats] = useState(SOCIAL_PROOF_STATS);
  const [clients, setClients] = useState(
    FALLBACK_LOGOS.map((name, idx) => ({ _id: `fallback_${idx}`, name, active: true }))
  );

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await api.company.getInfo();
        if (res.data) {
          if (res.data.stats && res.data.stats.length > 0) {
            setStats(res.data.stats);
          }
          if (res.data.clientLogos && res.data.clientLogos.length > 0) {
            const activeOnly = res.data.clientLogos.filter((c) => c.active !== false);
            if (activeOnly.length > 0) {
              setClients(activeOnly);
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch live client logos, using fallback:", err.message);
      }
    };
    fetchCompanyData();
  }, []);

  // Duplicate client items for a seamless marquee loop
  const marqueeItems = [...clients, ...clients, ...clients];

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

        {/* Dynamic Client Marquee */}
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
      </Container>
    </section>
  );
}
