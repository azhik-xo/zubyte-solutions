"use client";

import React, { useState, useEffect, useMemo } from "react";
import Container from "@/components/ui/Container";
import { PORTFOLIO_PROJECTS as FALLBACK_PROJECTS } from "@/data/portfolio";
import { SERVICES as FALLBACK_SERVICES, ALL_SERVICE_NAMES as FALLBACK_NAMES } from "@/data/services";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * Portfolio Explorer with dynamic service & case study fetching from MongoDB
 */
export default function PortfolioExplorerSection({ initialService = "All Services" }) {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [serviceGroups, setServiceGroups] = useState(FALLBACK_SERVICES);
  const [selectedFilter, setSelectedFilter] = useState(initialService);
  const [activeGroup, setActiveGroup] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLivePortfolio = async () => {
      try {
        const [portRes, servRes] = await Promise.all([
          api.portfolio.getAll(),
          api.services.getAll(),
        ]);
        if (portRes.data && portRes.data.length > 0) {
          setProjects(portRes.data);
        }
        if (servRes.data && servRes.data.length > 0) {
          setServiceGroups(servRes.data);
        }
      } catch (err) {
        console.warn("Could not fetch live portfolio from DB, using cache:", err.message);
      }
    };
    fetchLivePortfolio();
  }, []);

  // Compute all available service names dynamically
  const allServiceNames = useMemo(() => {
    const names = [];
    serviceGroups.forEach((g) => {
      if (g.items) {
        g.items.forEach((i) => {
          if (i.name && !names.includes(i.name)) names.push(i.name);
        });
      }
    });
    return names.length > 0 ? names : FALLBACK_NAMES;
  }, [serviceGroups]);

  // Discipline groups list
  const groups = useMemo(() => {
    const list = [{ name: "All", label: "All Disciplines" }];
    serviceGroups.forEach((g) => {
      const count = g.items?.length || 0;
      list.push({
        name: g.group,
        label: `${g.group} (${count})`,
      });
    });
    return list;
  }, [serviceGroups]);

  // Services to show in the filter options based on active group tab
  const visibleFilterOptions = useMemo(() => {
    if (activeGroup === "All") {
      return ["All Services", ...allServiceNames];
    }
    const matchingGroup = serviceGroups.find((g) => g.group === activeGroup);
    if (!matchingGroup || !matchingGroup.items) {
      return ["All Services", ...allServiceNames];
    }
    return [activeGroup, ...matchingGroup.items.map((i) => i.name)];
  }, [activeGroup, allServiceNames, serviceGroups]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          proj.title?.toLowerCase().includes(q) ||
          proj.shortDesc?.toLowerCase().includes(q) ||
          proj.service?.toLowerCase().includes(q) ||
          (proj.subcategory && proj.subcategory.toLowerCase().includes(q)) ||
          (proj.tags && proj.tags.some((t) => t.toLowerCase().includes(q)));

        if (!matchesQuery) return false;
      }

      // 2. Service/Group filter
      if (selectedFilter === "All Services" || selectedFilter === "All") {
        if (activeGroup === "All") return true;
        return proj.group === activeGroup || proj.tags?.includes(activeGroup);
      }

      // If selected filter matches a group name
      const groupNames = serviceGroups.map((g) => g.group);
      if (groupNames.includes(selectedFilter)) {
        return proj.group === selectedFilter || proj.tags?.includes(selectedFilter);
      }

      // Specific service match
      return (
        proj.service === selectedFilter ||
        proj.tags?.includes(selectedFilter) ||
        proj.subcategory === selectedFilter
      );
    });
  }, [selectedFilter, activeGroup, searchQuery, projects, serviceGroups]);

  // Helper to count projects matching a specific filter
  const getCountForFilter = (filterName) => {
    if (filterName === "All Services" || filterName === "All") {
      return projects.length;
    }
    const groupNames = serviceGroups.map((g) => g.group);
    if (groupNames.includes(filterName)) {
      return projects.filter(
        (p) => p.group === filterName || p.tags?.includes(filterName)
      ).length;
    }
    return projects.filter(
      (p) =>
        p.service === filterName ||
        p.tags?.includes(filterName) ||
        p.subcategory === filterName
    ).length;
  };

  const handleGroupSelect = (groupName) => {
    setActiveGroup(groupName);
    if (groupName === "All") {
      setSelectedFilter("All Services");
    } else {
      setSelectedFilter(groupName);
    }
  };

  return (
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <Container size="default">
        {/* Top Discipline Group Selector */}
        <div className="flex flex-col gap-6 mb-10 pb-8 border-b border-[var(--border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--muted-foreground)] mb-1">
                Filter by Discipline Group
              </p>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1b1b1b]">
                Explore Services & Case Studies
              </h2>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search services or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[var(--border)] rounded-full px-4 py-2.5 text-xs text-[#1b1b1b] placeholder:text-[#797876] outline-none focus:border-[#1b1b1b] shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#797876] hover:text-[#1b1b1b]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Discipline Level Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {groups.map((grp) => {
              const isActive = activeGroup === grp.name;
              return (
                <button
                  key={grp.name}
                  type="button"
                  onClick={() => handleGroupSelect(grp.name)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer select-none",
                    isActive
                      ? "bg-[#1b1b1b] text-white shadow-sm font-bold"
                      : "bg-[var(--secondary)] text-[#797876] hover:text-[#1b1b1b] hover:bg-black/5"
                  )}
                >
                  {grp.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* All Individual Services Filter List */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
              All Available Services ({visibleFilterOptions.length})
            </p>
            <span className="text-xs text-[var(--muted-foreground)]">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? "case study" : "case studies"}
            </span>
          </div>

          {/* Full Horizontal Scrollable & Wrappable Pill Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {visibleFilterOptions.map((serviceName) => {
              const isSelected = selectedFilter === serviceName;
              const count = getCountForFilter(serviceName);

              return (
                <button
                  key={serviceName}
                  type="button"
                  onClick={() => setSelectedFilter(serviceName)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none border",
                    isSelected
                      ? "bg-[#F1681D] text-white border-[#F1681D] shadow-sm font-bold"
                      : "bg-white text-[#555555] border-[var(--border)] hover:border-[#1b1b1b] hover:text-[#1b1b1b]"
                  )}
                >
                  <span>{serviceName}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                      isSelected
                        ? "bg-white/25 text-white"
                        : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-[var(--border)] shadow-xs">
            <p className="text-lg font-heading font-bold text-[#1b1b1b] mb-2">
              No matching case studies found
            </p>
            <p className="text-[var(--muted-foreground)] text-sm mb-6 max-w-sm mx-auto">
              We did not find case studies matching "{selectedFilter}". You can reset the filters to view all work.
            </p>
            <button
              onClick={() => {
                setActiveGroup("All");
                setSelectedFilter("All Services");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#1b1b1b] text-white hover:bg-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((proj, pIdx) => {
              const isHovered = hoveredProject === proj.title;
              const displayImg =
                proj.img?.startsWith("http") || proj.img?.startsWith("/")
                  ? proj.img
                  : `https://images.unsplash.com/${proj.img}?w=700&h=400&fit=crop&auto=format`;

              return (
                <div
                  key={proj._id || proj.title || pIdx}
                  className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  onMouseEnter={() => setHoveredProject(proj.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image Banner & Hover Actions */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1b1b1b]">
                    <img
                      src={displayImg}
                      alt={proj.title}
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-transform duration-500",
                        isHovered ? "scale-105" : "scale-100"
                      )}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Service & Subcategory Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#F1681D] text-white shadow-xs">
                        {proj.service}
                      </span>
                      {proj.subcategory && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {proj.subcategory}
                        </span>
                      )}
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
                    {proj.stars && proj.stars.length > 0 && (
                      <div className="flex flex-col gap-2.5 pt-4 border-t border-[var(--border)] mt-auto">
                        {proj.stars.map((star, sIdx) => (
                          <div key={star.label || sIdx} className="flex items-start gap-2.5">
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
                    )}
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
