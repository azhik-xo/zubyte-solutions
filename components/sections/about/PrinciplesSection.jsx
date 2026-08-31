import React from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CORE_VALUES } from "@/data/company";

/**
 * Principles of Practice Bento Section with Reveal entrance
 */
export default function PrinciplesSection() {
  return (
    <section className="bg-[#1b1b1b] py-20 sm:py-24 text-white border-y border-white/10">
      <Container size="default">
        {/* Header */}
        <Reveal direction="up" delay={50} duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/40 mb-3">
                Principles of Practice
              </p>
              <h2
                className="font-heading font-bold text-3xl sm:text-4xl text-white"
              >
                The core tenets
                <br />
                that guide us.
              </h2>
            </div>
            <p className="text-white/50 text-sm sm:text-base max-w-xs leading-relaxed">
              Every line of code we write and every pixel we place is grounded in these commitments.
            </p>
          </div>
        </Reveal>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_VALUES.map((val, idx) => {
            const isFeatured = idx === 1;

            return (
              <Reveal
                key={val.name}
                direction="up"
                delay={100 + idx * 100}
                duration={700}
                className="flex"
              >
                <div
                  className="w-full rounded-3xl p-8 sm:p-10 relative overflow-hidden group transition-all duration-300 shadow-xl"
                  style={
                    isFeatured
                      ? { background: "#F1681D" }
                      : { background: "#222222", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  {/* Large Background Watermark Number */}
                  <p className="font-brand font-bold text-7xl absolute top-4 right-6 opacity-10 select-none pointer-events-none">
                    {val.num}
                  </p>

                  <div className="text-3xl mb-6 text-white/90">{val.icon}</div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl mb-3 text-white">
                    {val.name}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed ${
                      isFeatured ? "text-white/90" : "text-white/50"
                    }`}
                  >
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
