import React from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable Badge component for category tags, status labels, and eyebrows
 */
export default function Badge({
  children,
  color,
  dot = false,
  className = "",
  variant = "subtle",
}) {
  const isCustomColor = Boolean(color);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full select-none",
        !isCustomColor &&
          variant === "subtle" &&
          "bg-[#1b1b1b]/5 text-[#1b1b1b] border border-[#1b1b1b]/10",
        !isCustomColor &&
          variant === "dark" &&
          "bg-white/10 text-white border border-white/15",
        !isCustomColor &&
          variant === "orange" &&
          "bg-[#F1681D]/15 text-[#F1681D] border border-[#F1681D]/20",
        className
      )}
      style={
        isCustomColor
          ? {
              backgroundColor: `${color}18`,
              color: color,
              borderColor: `${color}30`,
              borderWidth: "1px",
            }
          : undefined
      }
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
          style={{ backgroundColor: color || "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}

