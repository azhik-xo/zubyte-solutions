import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Reusable Button component with multiple variants, sizes, and Next.js Link support.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-7 py-3.5",
    lg: "text-base px-8 py-4",
  };

  const variantStyles = {
    primary:
      "bg-[#1b1b1b] text-white hover:bg-[#333333] active:bg-[#000000] focus-visible:outline-[#1b1b1b]",
    orange:
      "bg-[#F1681D] text-white hover:bg-[#d85813] active:bg-[#bf4a0c] shadow-sm hover:shadow focus-visible:outline-[#F1681D]",
    outline:
      "border border-[#1b1b1b]/30 text-[#1b1b1b] hover:border-[#1b1b1b] hover:bg-[#1b1b1b]/5 active:bg-[#1b1b1b]/10 focus-visible:outline-[#1b1b1b]",
    outlineDark:
      "border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 active:bg-white/10 focus-visible:outline-white",
    dark:
      "bg-white text-[#1b1b1b] hover:bg-[#f0efe9] active:bg-[#e2e0d9] shadow-sm focus-visible:outline-white",
    ghost:
      "text-[#1b1b1b] hover:bg-[#1b1b1b]/5 active:bg-[#1b1b1b]/10 focus-visible:outline-[#1b1b1b]",
  };

  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

