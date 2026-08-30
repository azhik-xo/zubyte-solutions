"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Portfolio Explorer with dynamic service filter and STAR framework breakdown cards
 */
export default function PortfolioExplorerSection({ initialService = "All Services" }) {
  const [selectedService, setSelectedService] = useState(initialService);
  const [hoveredProject, setHoveredProject] = useState(null);

  const filterOptions = [
    "All Services",
    "Web Development",
    "UI/UX Design",
    "Digital Marketing",
    "Cloud & DevOps",
    "AI & Automation",
  ];

  const filteredProjects =
    selectedService === "All Services"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.service === selectedService);

  return (
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <Container size="default">
        {/* Service Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-hide">
          {filterOptions.map((service) => {
            const isSelected = selectedService === service;

            return (
              <button
                key={service}
                type="button"
                onClick={() => setSelectedService(service)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer select-none",
                  isSelected
                    ? "bg-[#1b1b1b] text-white shadow-sm font-bold"
                    : "bg-white text-[#797876] border border-[var(--border)] hover:text-[#1b1b1b]"
                )}
              >
                {service}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-[var(--border)]">
            <p className="text-[var(--muted-foreground)] text-base">
              No projects listed yet for this service discipline.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => {
              const isHovered = hoveredProject === proj.title;

              return (
                <div
                  key={proj.title}
                  className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  onMouseEnter={() => setHoveredProject(proj.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image Banner & Hover Actions */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1b1b1b]">
                    <img
                      src={`https://images.unsplash.com/${proj.img}?w=700&h=400&fit=crop&auto=format`}
                      alt={proj.title}
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-500",
                        isHovered ? "scale-105" : "scale-100"
                      )}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Subcategory Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {proj.subcategory || proj.service}
                      </span>
                    </div>

                    {/* Action Overlay Links */}
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 bg-black/60 backdrop-blur-xs",
                        isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                      )}
                    >
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                          title="View on GitHub"
                          aria-label="View on GitHub"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1b1b1b">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                          title="View Live"
                          aria-label="View Live Project"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1b1b1b"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Content & STAR Framework */}
                  <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1">
                    <div>
                      <h3 className="font-heading font-bold text-[#1b1b1b] text-lg leading-snug mb-2">
                        {proj.title}
                      </h3>
                      <p className="text-[var(--muted-foreground)] text-xs sm:text-sm leading-relaxed">
                        {proj.shortDesc}
                      </p>
                    </div>

                    {/* STAR Breakdown */}
                    <div className="flex flex-col gap-2.5 pt-4 border-t border-[var(--border)] mt-auto">
                      {proj.stars.map((star) => (
                        <div key={star.label} className="flex items-start gap-2.5">
                          <span
                            className="text-[10px] font-bold tracking-widest uppercase mt-0.5 shrink-0 w-16"
                            style={{ color: "#F1681D" }}
                          >
                            {star.label}
                          </span>
                          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                            {star.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

