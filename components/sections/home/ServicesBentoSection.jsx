"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";

/**
 * Services Snapshot Bento Grid Section fetching dynamic services from MongoDB
 */
export default function ServicesBentoSection() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const res = await api.services.getAll();
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch live services for Bento section:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const totalServices = services.reduce((acc, g) => acc + (g.items?.length || 0), 0);
  const cardOne = services[0];
  const cardTwo = services[1];
  const otherCards = services.slice(2);

  return (
    <section className="bg-[var(--background)] py-24 sm:py-28">
      <Container size="default">
        {/* Header row */}
        <Reveal direction="up" delay={50} duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--muted-foreground)] mb-3">
                What we do
              </p>
              <h2
                className="font-heading font-bold text-[#1b1b1b] leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                Five disciplines.
                <br />
                One trusted partner.
              </h2>
            </div>

            <Button href="/services" variant="outline" size="md">
              View all services →
            </Button>
          </div>
        </Reveal>

        {/* Bento Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
            <div className="md:col-span-7 h-72 rounded-3xl bg-[#1b1b1b]/5 animate-pulse" />
            <div className="md:col-span-5 h-72 rounded-3xl bg-[#F1681D]/10 animate-pulse" />
            <div className="md:col-span-4 h-64 rounded-3xl bg-[#1b1b1b]/5 animate-pulse" />
            <div className="md:col-span-4 h-64 rounded-3xl bg-[#1b1b1b]/5 animate-pulse" />
            <div className="md:col-span-4 h-64 rounded-3xl bg-[#1b1b1b]/5 animate-pulse" />
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
            {/* Card 1 — Dark Featured Card (col 7) */}
            {cardOne && (
              <Reveal direction="up" delay={100} duration={700} className="md:col-span-7 flex">
                <Link
                  href="/services"
                  className="w-full rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-70 relative overflow-hidden group transition-all duration-300 border border-white/10 hover:border-white/25 hover:shadow-xl"
                  style={{ background: "#1b1b1b" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-3xl mb-4 block text-white/90">{cardOne.icon || "◈"}</span>
                      <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-2">
                        {cardOne.group}
                      </h3>
                      <p className="text-white/50 text-xs sm:text-sm max-w-sm leading-relaxed">
                        {cardOne.tagline || "Engineered digital platforms and intelligent software."}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/70">
                      {cardOne.items?.length || 0} Services
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {cardOne.items?.map((item) => (
                      <span
                        key={item.name}
                        className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/70 group-hover:border-white/30 transition-colors"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#F1681D]">
                      Explore {cardOne.group} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Card 2 — Orange Accent Card (col 5) */}
            {cardTwo && (
              <Reveal direction="up" delay={200} duration={700} className="md:col-span-5 flex">
                <Link
                  href="/services"
                  className="w-full rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-70 group transition-all duration-300 shadow-md hover:shadow-xl"
                  style={{ background: "#F1681D" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-3xl mb-4 block text-white">{cardTwo.icon || "◇"}</span>
                      <h3 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-2">
                        {cardTwo.group}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm max-w-xs leading-relaxed">
                        {cardTwo.tagline || "User experiences and visual interface design."}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">
                      {cardTwo.items?.length || 0}&nbsp;Services
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {cardTwo.items?.map((item) => (
                      <span
                        key={item.name}
                        className="text-xs px-3 py-1.5 rounded-full border border-white/30 text-white"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <span className="text-xs font-semibold text-white">
                      Explore {cardTwo.group} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Other Cards in Grid */}
            {otherCards.map((service, idx) => (
              <Reveal
                key={service.group || idx}
                direction="up"
                delay={100 + idx * 100}
                duration={700}
                className="md:col-span-4 flex"
              >
                <Link
                  href="/services"
                  className="w-full rounded-3xl p-7 sm:p-8 flex flex-col justify-between min-h-60 group transition-all duration-300 border border-white/10 hover:border-white/25 hover:shadow-lg"
                  style={{
                    background: idx === 2 ? "#0d1f1a" : "#1d1d1d",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-2xl mb-3 block text-white/80">{service.icon || "⬡"}</span>
                      <h3 className="font-heading font-bold text-white text-xl mb-1">
                        {service.group}
                      </h3>
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: idx === 2 ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.08)",
                        color: idx === 2 ? "#10b981" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {service.items?.length || 0}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mt-2 flex-1">
                    {service.items?.map((item) => (
                      <li key={item.name} className="flex items-center gap-2 text-xs text-white/50">
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{
                            background: idx === 2 ? "#10b981" : "rgba(255,255,255,0.3)",
                          }}
                        />
                        {item.name}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: idx === 2 ? "#10b981" : "#F1681D",
                      }}
                    >
                      Explore {service.group} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* Bottom Banner */}
        <Reveal direction="scale" delay={150} duration={700}>
          <div
            className="rounded-3xl overflow-hidden relative min-h-40 flex items-center shadow-md mt-4"
            style={{ background: "#222222" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=400&fit=crop&auto=format')",
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full p-8 sm:p-10">
              <div>
                <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-1.5">
                  End-to-end capability
                </p>
                <p className="font-heading font-bold text-white text-lg sm:text-xl">
                  {totalServices > 0 ? `${totalServices} services across ${services.length} disciplines` : "Comprehensive digital engineering"} — engineered for scale.
                </p>
              </div>
              <Button href="/contact" variant="orange" size="md" className="shrink-0">
                Start a Project →
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
