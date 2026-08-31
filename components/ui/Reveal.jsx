"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll Reveal Animation Component
 * Smoothly reveals content when scrolled into the viewport using IntersectionObserver
 */
export default function Reveal({
  children,
  className = "",
  direction = "up", // 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
  delay = 0, // delay in ms or seconds
  duration = 700, // duration in ms
  threshold = 0.15,
  once = true,
  as: Component = "div",
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If browser doesn't support IntersectionObserver, make visible immediately
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Initial hidden transform styles by direction
  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1)";
    switch (direction) {
      case "up":
        return "translate3d(0, 32px, 0)";
      case "down":
        return "translate3d(0, -32px, 0)";
      case "left":
        return "translate3d(32px, 0, 0)";
      case "right":
        return "translate3d(-32px, 0, 0)";
      case "scale":
        return "scale(0.95)";
      default:
        return "none";
    }
  };

  const delayMs = typeof delay === "number" ? delay : parseFloat(delay) * 1000;

  return (
    <Component
      ref={ref}
      className={cn("reveal-element", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delayMs}ms`,
        willChange: "opacity, transform",
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

