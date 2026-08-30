import React from "react";
import Container from "@/components/ui/Container";
import { LEADERSHIP } from "@/data/company";

/**
 * Leadership Testimonial / Quote Section
 */
export default function TestimonialSection() {
  const { founder } = LEADERSHIP;

  return (
    <section className="bg-[var(--secondary)] border-y border-[var(--border)] py-20 sm:py-24">
      <Container size="sm" className="text-center">
        <p className="text-4xl sm:text-5xl text-[var(--muted-foreground)] mb-6 font-serif select-none">
          “
        </p>

        <blockquote
          className="font-heading font-bold text-[#1b1b1b] leading-snug mb-8 max-w-2xl mx-auto"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)" }}
        >
          {founder.quote}
        </blockquote>

        <div className="flex items-center justify-center gap-3.5">
          {/* Avatar with brand orange */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
            style={{ background: "#F1681D" }}
          >
            {founder.initials}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-[#1b1b1b] leading-tight">
              {founder.name}
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              {founder.role}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

