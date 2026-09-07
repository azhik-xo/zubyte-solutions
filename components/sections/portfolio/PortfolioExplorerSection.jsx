"use client";

import React, { useState, useEffect, useMemo } from "react";
import Container from "@/components/ui/Container";
import { PortfolioCardSkeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * Portfolio Explorer with dynamic service & case study fetching strictly from MongoDB
 */
export default function PortfolioExplorerSection({ initialService = "All Services" }) {
  const [projects, setProjects] = useState([]);
  const [serviceGroups, setServiceGroups] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(initialService || "All Services");
  const [activeGroup, setActiveGroup] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLivePortfolio = async () => {
      try {
        setIsLoading(true);
        const [portRes, servRes] = await Promise.all([
          api.portfolio.getAll(),
          api.services.getAll(),
        ]);
        if (portRes.data && Array.isArray(portRes.data)) {
          setProjects(portRes.data);
        }
        if (servRes.data && Array.isArray(servRes.data)) {
          setServiceGroups(servRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch live portfolio from DB:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLivePortfolio();
  }, []);

  // Sync with initialService parameter from URL (e.g., when redirected from services page)
  useEffect(() => {
    if (initialService && initialService !== "All Services") {
      setSelectedFilter(initialService);

      const targetLower = initialService.toLowerCase().trim();
      const parentGroup = serviceGroups.find((g) =>
        g.group?.toLowerCase() === targetLower ||
        g.slug?.toLowerCase() === targetLower ||
        g.portfolioKey?.toLowerCase() === targetLower ||
        g.items?.some((item) =>
          item.name?.toLowerCase() === targetLower ||
          item.name?.toLowerCase().includes(targetLower) ||
          targetLower.includes(item.name?.toLowerCase())
        )
      );

      if (parentGroup) {
        setActiveGroup(parentGroup.group);
      }
    }
  }, [initialService, serviceGroups]);

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
    projects.forEach((p) => {
      if (p.service && !names.includes(p.service)) names.push(p.service);
    });
    return names;
  }, [serviceGroups, projects]);

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
    let options = [];
    if (activeGroup === "All") {
      options = ["All Services", ...allServiceNames];
    } else {
      const matchingGroup = serviceGroups.find((g) => g.group === activeGroup);
      if (!matchingGroup || !matchingGroup.items) {
        options = ["All Services", ...allServiceNames];
      } else {
        options = [activeGroup, ...matchingGroup.items.map((i) => i.name)];
      }
    }

    // Ensure selectedFilter is visible even if deep linking
    if (selectedFilter && selectedFilter !== "All Services" && !options.includes(selectedFilter)) {
      options.splice(1, 0, selectedFilter);
    }
    return options;
  }, [activeGroup, allServiceNames, serviceGroups, selectedFilter]);

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
        return (
          proj.group?.toLowerCase() === activeGroup.toLowerCase() ||
          proj.tags?.some((t) => t.toLowerCase() === activeGroup.toLowerCase())
        );
      }

      const selLower = selectedFilter.toLowerCase().trim();

      // If selected filter matches a discipline group name
      const groupNames = serviceGroups.map((g) => g.group.toLowerCase());
      if (groupNames.includes(selLower)) {
        return (
          proj.group?.toLowerCase() === selLower ||
          proj.tags?.some((t) => t.toLowerCase() === selLower)
        );
      }

      // Specific service match (exact or substring/tag)
      return (
        proj.service?.toLowerCase() === selLower ||
        proj.tags?.some((t) => t.toLowerCase() === selLower) ||
        proj.subcategory?.toLowerCase() === selLower ||
        (proj.service && selLower.includes(proj.service.toLowerCase())) ||
        (proj.service && proj.service.toLowerCase().includes(selLower)) ||
        (proj.title && proj.title.toLowerCase().includes(selLower))
      );
    });
  }, [selectedFilter, activeGroup, searchQuery, projects, serviceGroups]);

  // Helper to count projects matching a specific filter
  const getCountForFilter = (filterName) => {
    if (filterName === "All Services" || filterName === "All") {
      return projects.length;
    }
    const filterLower = filterName.toLowerCase().trim();
    const groupNames = serviceGroups.map((g) => g.group.toLowerCase());
    if (groupNames.includes(filterLower)) {
      return projects.filter(
        (p) =>
          p.group?.toLowerCase() === filterLower ||
          p.tags?.some((t) => t.toLowerCase() === filterLower)
      ).length;
    }
    return projects.filter(
      (p) =>
        p.service?.toLowerCase() === filterLower ||
        p.tags?.some((t) => t.toLowerCase() === filterLower) ||
        p.subcategory?.toLowerCase() === filterLower ||
        (p.service && filterLower.includes(p.service.toLowerCase())) ||
        (p.service && p.service.toLowerCase().includes(filterLower)) ||
        (p.title && p.title.toLowerCase().includes(filterLower))
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
        {/* Top Control Bar: Search & Discipline Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[var(--border)]">
          {/* Discipline Groups Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
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
                      : "text-[var(--muted-foreground)] hover:bg-black/5 hover:text-[#1b1b1b]"
                  )}
                >
                  {grp.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search case studies, tags, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--border)] bg-white text-xs text-[#1b1b1b] placeholder-[var(--muted-foreground)] focus:border-[#1b1b1b] focus:outline-none transition-colors shadow-2xs"
            />
            <svg
              className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[var(--muted-foreground)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-xs text-[var(--muted-foreground)] hover:text-[#1b1b1b]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* All Individual Services Filter List */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
              Available Service Filters ({visibleFilterOptions.length})
            </p>
            <span className="text-xs text-[var(--muted-foreground)]">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? "case study" : "case studies"}
            </span>
          </div>

          {/* Full Horizontal Scrollable & Wrappable Pill Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {visibleFilterOptions.map((serviceName) => {
              const isSelected = selectedFilter.toLowerCase() === serviceName.toLowerCase();
              const count = getCountForFilter(serviceName);

              return (
                <button
                  key={serviceName}
                  type="button"
                  onClick={() => setSelectedFilter(serviceName)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none border",
                    isSelected
                      ? "bg-[#F1681D] text-white border-[#F1681D] shadow-sm font-bold scale-[1.02]"
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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PortfolioCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
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
              className="px-6 py-2.5 rounded-xl bg-[#1b1b1b] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const liveUrl = project.live?.startsWith("http")
                ? project.live
                : project.live
                ? `https://${project.live}`
                : project.link || project.url;

              return (
                <div
                  key={project._id || project.title || idx}
                  onMouseEnter={() => setHoveredProject(project._id || idx)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
                >
                  {/* Visual Header Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#222222]">
                    <img
                      src={
                        project.img?.startsWith("http") || project.img?.startsWith("/")
                          ? project.img
                          : `https://images.unsplash.com/${project.img}?w=700&h=450&fit=crop&auto=format`
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Discipline / Subcategory Badge */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {project.group || "Engineering"}
                      </span>
                      {project.subcategory && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white">
                          {project.subcategory}
                        </span>
                      )}
                    </div>

                    {/* Floating Hover Bubble with Link Icon */}
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#F1681D] text-[#1b1b1b] hover:text-white shadow-xl backdrop-blur-md flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 hover:scale-110 active:scale-95 transition-all duration-300 ease-out border border-white/40 cursor-pointer"
                        title={`Visit Live System: ${liveUrl}`}
                        aria-label="Open live link"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      </a>
                    )}

                    {/* Specific Service pill on bottom left */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <p className="text-[11px] font-semibold text-[#F1681D] tracking-wider uppercase mb-1">
                        {project.service}
                      </p>
                      <h3 className="font-heading font-bold text-white text-lg sm:text-xl leading-snug line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1 justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-2">
                        {project.shortDesc}
                      </p>

                      {/* STAR Breakdown Pills Accordion / List */}
                      {project.stars && project.stars.length > 0 && (
                        <div className="space-y-2 pt-3 border-t border-[var(--border)]">
                          {project.stars.map((step) => {
                            const isResult = step.label.toLowerCase() === "result";

                            return (
                              <div
                                key={step.label}
                                className={cn(
                                  "p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-colors",
                                  isResult
                                    ? "bg-emerald-500/10 border border-emerald-500/20 text-[#1b1b1b]"
                                    : "bg-[var(--secondary)]/60 text-[var(--muted-foreground)]"
                                )}
                              >
                                <span
                                  className={cn(
                                    "font-bold text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0",
                                    isResult
                                      ? "bg-emerald-500 text-white font-extrabold"
                                      : "bg-black/10 text-[#1b1b1b]"
                                  )}
                                >
                                  {step.label}
                                </span>
                                <span className="leading-snug text-[11px] flex-1">
                                  {step.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Tags & Live Link Bubble footer */}
                    <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-2 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-[var(--secondary)] text-[var(--muted-foreground)] border border-[var(--border)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-full bg-[var(--secondary)] border border-[var(--border)] text-[#1b1b1b] hover:bg-[#F1681D] hover:text-white hover:border-[#F1681D] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xs group-hover:bg-[#F1681D] group-hover:text-white group-hover:border-[#F1681D] cursor-pointer shrink-0"
                          title={`Visit Live System: ${liveUrl}`}
                          aria-label="Open live link"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
                        </a>
                      )}
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
