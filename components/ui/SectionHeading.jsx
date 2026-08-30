import React from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable SectionHeading component with eyebrow label, title, and description
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className = "",
}) {
  const alignStyles = {
    center: "text-center items-center mx-auto",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 sm:mb-16", alignStyles[align], className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold tracking-[0.22em] uppercase mb-4",
            light ? "text-white/40" : "text-[var(--muted-foreground)]"
          )}
        >
          {eyebrow}
        </p>
      )}

      {title && (
        <h2
          className={cn(
            "font-heading font-bold leading-tight mb-4",
            light ? "text-white" : "text-[#1b1b1b]"
          )}
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={cn(
            "text-base leading-relaxed max-w-xl",
            light ? "text-white/60" : "text-[var(--muted-foreground)]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

