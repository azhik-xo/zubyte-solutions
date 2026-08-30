import React from "react";
import { cn } from "@/lib/utils";

/**
 * Standard responsive max-width container wrapper
 */
export default function Container({
  children,
  className = "",
  size = "default",
  as: Component = "div",
  ...props
}) {
  const sizeStyles = {
    sm: "max-w-4xl",
    default: "max-w-6xl",
    lg: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn("mx-auto px-4 sm:px-6 md:px-8 w-full", sizeStyles[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

