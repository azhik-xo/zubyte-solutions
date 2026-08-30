"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Interactive Service Navigator tab panel
 */
export default function ServicesNavigatorSection() {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const activeGroup = SERVICES[activeGroupIndex];

  return (
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <Container size="default">
        {/* Mobile Horizontal Tabs */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {SERVICES.map((group, idx) => {
            const isSelected = activeGroupIndex === idx;

            return (
              <button
                key={group.group}
                type="button"
                onClick={() => setActiveGroupIndex(idx)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer",
                  isSelected
                    ? "bg-[#1b1b1b] text-white shadow-sm"
                    : "bg-[#f0efe9] text-[#797876] hover:text-[#1b1b1b]"
                )}
              >
                <span>{group.icon}</span>
                <span>{group.group}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Tab Rail */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-2 sticky top-28">
            {SERVICES.map((group, idx) => {
              const isSelected = activeGroupIndex === idx;

              return (
                <button
                  key={group.group}
                  type="button"
                  onClick={() => setActiveGroupIndex(idx)}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all cursor-pointer group w-full",
                    isSelected
                      ? "bg-[#1b1b1b] text-white shadow-md font-bold"
                      : "bg-transparent text-[#797876] hover:bg-black/5 hover:text-[#1b1b1b]"
                  )}
                >
                  <span className="text-lg shrink-0">{group.icon}</span>
                  <span className="font-heading text-sm">{group.group}</span>
                  {isSelected && (
                    <span className="ml-auto text-xs text-[#F1681D]">→</span>
                  )}
                </button>
              );
            })}

            {/* Visual thumbnail preview */}
            <div className="mt-4 rounded-2xl overflow-hidden aspect-[4/3] bg-[#e8e7e1] shadow-inner">
              <img
                src={`https://images.unsplash.com/${activeGroup.img}?w=400&h=300&fit=crop&auto=format`}
                alt={activeGroup.group}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Service Cards Area */}
          <div className="lg:col-span-9">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[var(--border)]">
              <span className="text-2xl text-[#1b1b1b]">{activeGroup.icon}</span>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)]">
                  Discipline
                </p>
                <h2 className="font-heading font-bold text-2xl text-[#1b1b1b]">
                  {activeGroup.group}
                </h2>
              </div>
              <span className="ml-auto text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-white border border-[var(--border)] text-[var(--muted-foreground)]">
                {activeGroup.items.length} services
              </span>
            </div>

            {/* Grid of Service Offerings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeGroup.items.map((item, idx) => {
                const isDark = idx === 0;
                const isOrange = idx === 1;

                return (
                  <div
                    key={item.name}
                    className={cn(
                      "rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between min-h-[220px]",
                      isDark && "bg-[#1b1b1b] border-transparent text-white",
                      isOrange && "bg-[#F1681D] border-transparent text-white",
                      !isDark && !isOrange && "bg-white border-[#e2e0d9] text-[#1b1b1b]"
                    )}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading font-bold text-lg sm:text-xl">
                          {item.name}
                        </h3>
                        <span className="text-lg opacity-40">{activeGroup.icon}</span>
                      </div>

                      <p
                        className={cn(
                          "text-xs sm:text-sm leading-relaxed mb-6",
                          isDark && "text-white/70",
                          isOrange && "text-white/85",
                          !isDark && !isOrange && "text-[#797876]"
                        )}
                      >
                        {item.desc}
                      </p>
                    </div>

                    <div>
                      <Link
                        href={`/portfolio?service=${encodeURIComponent(activeGroup.portfolioKey)}`}
                        className={cn(
                          "inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase underline underline-offset-4 cursor-pointer transition-colors",
                          isDark && "text-white hover:text-white/80",
                          isOrange && "text-white hover:text-white/80",
                          !isDark && !isOrange && "text-[#1b1b1b] hover:text-[#F1681D]"
                        )}
                      >
                        Proof of Work →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

