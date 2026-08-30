import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind class names cleanly using clsx and tailwind-merge.
 * @param {...any} inputs - Class names or conditional class objects
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Brand color constants
 */
export const BRAND = {
  orange: "#F1681D",
  dark: "#1b1b1b",
  darkSurface: "#171717",
  light: "#faf9f5",
  secondary: "#f0efe9",
  border: "#e2e0d9",
  muted: "#797876",
};

