import React from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { STORY_MILESTONES } from "@/data/company";

/**
 * Our Story Section with pull-quote band and milestones
 */
export default function OurStorySection() {
  return (
    <section className="bg-[var(--background)] py-0">
      {/* Top Band: Dark pull-quote */}
      <div className="bg-[#1b1b1b] py-16 sm:py-20 text-white border-y border-white/10">
        <Container size="default">
          <Reveal direction="up" delay={50} duration={600}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-3">
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/40 mb-2">
                  Our Story
                </p>
                <div className="w-12 h-1 rounded-full bg-[#F1681D]" />
              </div>
              <blockquote
                className="md:col-span-9 font-heading font-bold text-white leading-snug"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}
              >
                “Technology should recede into the background — freeing people to do their best work without friction.”
              </blockquote>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* Story Body */}
      <div className="py-20 sm:py-24">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Image Stack */}
            <Reveal direction="scale" delay={100} duration={700} className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-[#d4d0c8] shadow-xl border border-black/5">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=930&fit=crop&auto=format"
                  alt="Zubyte team collaborating"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -right-4 sm:right-6 bg-white rounded-2xl shadow-xl p-5 border border-[var(--border)]">
                <p className="font-brand font-bold text-3xl text-[#F1681D]">2025</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Founded</p>
              </div>
            </Reveal>

            {/* Right Story Content */}
            <Reveal direction="up" delay={150} duration={700} className="flex flex-col gap-8 pt-4">
              {STORY_MILESTONES.map((item) => (
                <div key={item.num} className="flex gap-5 group">
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mt-1 shadow-sm"
                    style={{ background: "#F1681D" }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1b1b1b] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}

              {/* Core Capabilities Pills */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-6 border-t border-[var(--border)]">
                {["Design", "Engineering", "Cloud", "Growth"].map((cap) => (
                  <div
                    key={cap}
                    className="flex items-center gap-2 bg-[var(--secondary)] rounded-xl px-4 py-3 border border-[var(--border)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#F1681D]" />
                    <span className="text-sm font-semibold text-[#1b1b1b]">{cap}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
