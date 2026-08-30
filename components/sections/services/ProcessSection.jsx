"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import { PROCESS_STEPS } from "@/data/process";
import { cn } from "@/lib/utils";

/**
 * 4-Phase Expandable Delivery Methodology Section
 */
export default function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const toggle = (idx) => {
    setActiveStepIndex(activeStepIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[var(--secondary)] border-y border-[var(--border)] py-20 sm:py-24">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Context */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--muted-foreground)] mb-3">
              How We Work
            </p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1b1b1b] mb-4 leading-tight">
              A disciplined methodology focused on clarity.
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed mb-8">
              Click each phase to inspect how we approach architecture, development sprints, and automated cloud deployments.
            </p>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#d4d0c8] shadow-md border border-[var(--border)]">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=450&fit=crop&auto=format"
                alt="Agile delivery process workshop"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Accordion Steps */}
          <div className="lg:col-span-7 space-y-3">
            {PROCESS_STEPS.map((stepItem, idx) => {
              const isOpen = activeStepIndex === idx;

              return (
                <div
                  key={stepItem.step}
                  className="rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
                  style={{
                    border: `1.5px solid ${isOpen ? "#F1681D" : "#e2e0d9"}`,
                  }}
                >
                  {/* Step Header Button */}
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full text-left flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 transition-colors cursor-pointer select-none"
                    style={{
                      background: isOpen ? "#1b1b1b" : "#ffffff",
                    }}
                    aria-expanded={isOpen}
                  >
                    {/* Number Badge */}
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-brand font-bold text-xs shadow-xs"
                      style={{
                        background: isOpen ? "#F1681D" : "#f0efe9",
                        color: isOpen ? "#ffffff" : "#797876",
                      }}
                    >
                      {stepItem.step}
                    </div>

                    {/* Titles */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-heading font-bold text-base"
                        style={{ color: isOpen ? "#ffffff" : "#1b1b1b" }}
                      >
                        {stepItem.name}
                      </p>
                      <p
                        className="text-xs truncate mt-0.5"
                        style={{
                          color: isOpen ? "rgba(255,255,255,0.6)" : "#797876",
                        }}
                      >
                        {stepItem.desc}
                      </p>
                    </div>

                    {/* Toggle Icon */}
                    <span
                      className="text-lg font-bold shrink-0"
                      style={{ color: isOpen ? "#F1681D" : "#c4c2bb" }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {/* Expanded Body */}
                  {isOpen && (
                    <div className="bg-[#faf9f5] border-t border-[var(--border)] p-6 animate-in fade-in duration-200">
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                        {stepItem.detail}
                      </p>

                      {stepItem.extras && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[var(--border)]">
                          {stepItem.extras.map((ex) => (
                            <div
                              key={ex.label}
                              className="bg-white rounded-xl p-3.5 border border-[var(--border)] shadow-2xs"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#F1681D]" />
                                <p className="text-xs font-bold text-[#1b1b1b]">
                                  {ex.label}
                                </p>
                              </div>
                              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed pl-3.5">
                                {ex.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

