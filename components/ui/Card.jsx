import React from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable Card component for content surfaces
 */
export default function Card({
  children,
  variant = "default",
  className = "",
  hover = true,
  ...props
}) {
  const variantStyles = {
    default: "bg-white border border-[var(--border)] text-[#1b1b1b]",
    secondary: "bg-[var(--secondary)] border border-[var(--border)] text-[#1b1b1b]",
    dark: "bg-[#1b1b1b] border border-white/10 text-white",
    darkElevated: "bg-[#222222] border border-white/10 text-white",
    orange: "bg-[#F1681D] text-white border-transparent",
    glass: "glass-card bg-white/70 border border-white/40 shadow-sm",
  };

  const hoverStyles = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    : "";

  return (
    <div
      className={cn(
        "rounded-2xl p-6 sm:p-8 relative overflow-hidden",
        variantStyles[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

