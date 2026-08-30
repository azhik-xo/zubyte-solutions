import React from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Reusable CTA conversion section with customizable titles, descriptions, and buttons.
 */
export default function CtaSection({
  title = "Ready to transform your digital presence?",
  description = "Share your brief and we'll come back with a scoped proposal within 48 hours.",
  primaryBtnText = "Start a Project →",
  primaryBtnHref = "/contact",
  secondaryBtnText = "Explore Services",
  secondaryBtnHref = "/services",
  variant = "light",
  className = "",
}) {
  const isDark = variant === "dark";

  return (
    <section className={cn("py-20 sm:py-28", className)}>
      <Container size="default">
        <div
          className={cn(
            "rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden",
            isDark ? "bg-[#1b1b1b] text-white" : "bg-[#f0efe9] text-[#1b1b1b]"
          )}
        >
          {/* Background ambient glow if dark */}
          {isDark && (
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20"
              style={{ background: "#F1681D" }}
            />
          )}

          <h2
            className="font-heading font-bold leading-tight mb-5 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {title}
          </h2>

          <p
            className={cn(
              "mb-10 max-w-md mx-auto text-sm sm:text-base leading-relaxed",
              isDark ? "text-white/60" : "text-[var(--muted-foreground)]"
            )}
          >
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryBtnHref} variant="orange" size="md">
              {primaryBtnText}
            </Button>
            {secondaryBtnText && (
              <Button
                href={secondaryBtnHref}
                variant={isDark ? "outlineDark" : "outline"}
                size="md"
              >
                {secondaryBtnText}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

