import React from "react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";

/**
 * Mission & Vision Bento Section with Reveal entrance
 */
export default function MissionVisionSection() {
  const VALUES_LIST = ["Clarity", "Craft", "Ownership", "Ambition", "Empathy", "Agility"];

  return (
    <section className="bg-[var(--background)] py-20 sm:py-24">
      <Container size="default">
        {/* Header */}
        <Reveal direction="up" delay={50} duration={600}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--muted-foreground)] mb-3">
                Mission & Vision
              </p>
              <h2
                className="font-heading font-bold text-[#1b1b1b] leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                What drives us
                <br />
                every single day.
              </h2>
            </div>
            <p className="text-[var(--muted-foreground)] text-sm sm:text-base max-w-xs leading-relaxed">
              Two guiding lights that shape every product architecture, client partnership, and team member we onboard.
            </p>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Mission Card — Col 7 */}
          <Reveal direction="up" delay={100} duration={700} className="md:col-span-7 flex">
            <div className="w-full bg-[#1b1b1b] rounded-3xl p-8 sm:p-12 text-white flex flex-col justify-between min-h-[380px] shadow-xl border border-white/10">
              <div>
                <Badge color="#F1681D" dot className="mb-8">
                  Mission
                </Badge>

                <p
                  className="font-heading font-bold leading-snug text-white max-w-lg"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                >
                  To make expert, scalable technology accessible to every ambitious enterprise — turning bold ideas into world-class digital products.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-white/10 pt-8 mt-8">
                {[
                  { v: "50+", l: "Projects delivered" },
                  { v: "3", l: "Global continents" },
                  { v: "5+", l: "Years of craft" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-brand font-bold text-xl sm:text-2xl text-[#F1681D]">
                      {s.v}
                    </p>
                    <p className="text-white/40 text-xs mt-1 leading-tight">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Vision & Values Stack — Col 5 */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Vision Image Card */}
            <Reveal direction="scale" delay={150} duration={700} className="flex-1 flex">
              <div className="w-full relative rounded-3xl overflow-hidden min-h-[220px] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&h=400&fit=crop&auto=format"
                  alt="Architectural workspace"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-xs font-bold tracking-widest uppercase text-white/50 mb-2">
                    Vision
                  </span>
                  <p className="font-heading font-bold text-white text-lg sm:text-xl leading-snug">
                    A world where ambitious ideas are never constrained by technical execution.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Core Values Pills Box */}
            <Reveal direction="up" delay={200} duration={700}>
              <div className="bg-[var(--secondary)] rounded-3xl p-6 sm:p-8 border border-[var(--border)]">
                <p className="text-xs font-bold tracking-widest uppercase text-[var(--muted-foreground)] mb-4">
                  Our Values
                </p>
                <div className="flex flex-wrap gap-2">
                  {VALUES_LIST.map((v) => (
                    <span
                      key={v}
                      className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-white border border-[var(--border)] text-[#1b1b1b] shadow-2xs"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
