"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { api } from "@/lib/api";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ImageUpload from "@/components/admin/ImageUpload";
import { cn } from "@/lib/utils";

const GROUPS = ["Build", "Design", "Grow", "Deploy", "Engineering"];

export default function AdminPortfolioPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [serviceNames, setServiceNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tagInput, setTagInput] = useState("");

  const initialFormState = {
    title: "",
    service: "Web Development",
    group: "Build",
    subcategory: "",
    tags: [],
    img: "",
    shortDesc: "",
    stars: [
      { label: "Situation", text: "" },
      { label: "Task", text: "" },
      { label: "Action", text: "" },
      { label: "Result", text: "" },
    ],
    github: "https://github.com",
    live: "https://zubyte.com",
  };

  const [form, setForm] = useState(initialFormState);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedGroup !== "All") params.append("group", selectedGroup);
      if (searchQuery) params.append("search", searchQuery);

      const res = await api.portfolio.getAll(params.toString());
      if (res.data) {
        setCaseStudies(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch case studies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedGroup, searchQuery]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.services.getAll();
        if (res.data && Array.isArray(res.data)) {
          const names = [];
          res.data.forEach((group) => {
            if (group.items) {
              group.items.forEach((item) => {
                if (item.name && !names.includes(item.name)) names.push(item.name);
              });
            }
          });
          if (names.length > 0) setServiceNames(names);
        }
      } catch (err) {
        console.error("Failed to load services for portfolio select:", err);
      }
    };
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setForm(initialFormState);
    setTagInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    const parsedTags = Array.isArray(project.tags)
      ? project.tags
      : typeof project.tags === "string"
      ? project.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    setForm({
      title: project.title,
      service: project.service,
      group: project.group || "Build",
      subcategory: project.subcategory || "",
      tags: parsedTags,
      img: project.img || "",
      shortDesc: project.shortDesc,
      stars: project.stars || [
        { label: "Situation", text: "" },
        { label: "Task", text: "" },
        { label: "Action", text: "" },
        { label: "Result", text: "" },
      ],
      github: project.github || "https://github.com",
      live: project.live || "https://zubyte.com",
    });
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleStarChange = (index, text) => {
    const updatedStars = [...form.stars];
    updatedStars[index] = { ...updatedStars[index], text };
    setForm({ ...form, stars: updatedStars });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.img) {
      alert("Please upload or provide an image for the case study.");
      return;
    }

    setIsSaving(true);
    try {
      let finalTags = Array.isArray(form.tags) ? [...form.tags] : [];
      if (tagInput && tagInput.trim()) {
        const pending = tagInput
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t && !finalTags.includes(t));
        finalTags.push(...pending);
      }

      const payload = {
        ...form,
        tags: finalTags,
      };

      if (editingProject) {
        const res = await api.portfolio.update(editingProject._id, payload);
        setCaseStudies((prev) =>
          prev.map((p) => (p._id === editingProject._id ? res.data : p))
        );
        setMessage("Case study updated successfully!");
      } else {
        const res = await api.portfolio.create(payload);
        setCaseStudies((prev) => [res.data, ...prev]);
        setMessage("Case study created successfully!");
      }

      setIsModalOpen(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to save case study");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    setIsSaving(true);
    try {
      await api.portfolio.delete(projectToDelete._id);
      setCaseStudies((prev) => prev.filter((p) => p._id !== projectToDelete._id));
      setProjectToDelete(null);
      setMessage("Case study deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to delete case study");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            STAR Case Studies (Proof of Work)
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Manage real-world case studies formatted with Situation, Task, Action, Result & Cloudinary images.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-2xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          + Add New Case Study
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
          {message}
        </div>
      )}

      <div className="p-4 rounded-2xl bg-[#141414] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {["All", ...GROUPS].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                selectedGroup === grp
                  ? "bg-[#F1681D] text-white shadow-sm"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              {grp}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search title, tech, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#F1681D]"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="p-16 text-center text-xs text-white/50">Loading case studies...</div>
      ) : caseStudies.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-[#141414] border border-white/10">
          <p className="text-sm font-bold text-white mb-1">No Case Studies Found</p>
          <p className="text-xs text-white/40 mb-4">
            Try adjusting your search or add a new case study.
          </p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-[#F1681D] text-xs font-bold text-white cursor-pointer"
          >
            Create First Case Study
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {caseStudies.map((proj, idx) => {
            const displayImg = proj.img?.startsWith("http") || proj.img?.startsWith("/")
              ? proj.img
              : `https://images.unsplash.com/${proj.img}?w=700&h=400&fit=crop&auto=format`;

            return (
              <div
                key={proj._id || proj.title || `proj_${idx}`}
                className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:border-white/20 transition-all group"
              >
                <div className="relative h-44 overflow-hidden bg-black/80">
                  <img
                    src={displayImg}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-black/40" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#F1681D] text-white shadow-sm">
                      {proj.service}
                    </span>
                    {proj.subcategory && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {proj.subcategory}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-bold text-white text-base mb-1.5">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {proj.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-1.5 py-3 border-y border-white/5">
                    {proj.stars?.map((star) => (
                      <div key={star.label} className="flex items-start gap-2 text-[11px]">
                        <span className="text-[10px] font-bold text-[#F1681D] w-14 shrink-0 uppercase">
                          {star.label}
                        </span>
                        <p className="text-white/60 line-clamp-1 flex-1">
                          {star.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-white/50 hover:text-white"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-[#F1681D] hover:underline"
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setProjectToDelete(proj)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete Case Study"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Case Study Modal with Cloudinary Integration */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit STAR Case Study" : "Create STAR Case Study"}
        size="lg"
      >
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Project Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Enterprise Client Portal"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Service Category</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              >
                {(serviceNames.length > 0 ? serviceNames : [form.service || "Web Development"]).map((name) => (
                  <option key={name} value={name} className="bg-[#141414]">
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Discipline Group</label>
              <select
                value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              >
                {GROUPS.map((g) => (
                  <option key={g} value={g} className="bg-[#141414]">
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Subcategory / Domain</label>
              <input
                type="text"
                placeholder="e.g. FinTech, E-Commerce, SaaS"
                value={form.subcategory}
                onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
          </div>

          {/* Interactive Multi-Tag Tech Tags Manager */}
          <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wide">
                Tech Tags ({form.tags?.length || 0})
              </label>
              <span className="text-[10px] text-white/40">
                Type and press Enter, comma, or "+ Add"
              </span>
            </div>

            {/* Active Tag Chips */}
            <div className="flex flex-wrap gap-1.5 min-h-9.5 p-2 bg-black/40 rounded-xl border border-white/10 items-center">
              {form.tags && form.tags.length > 0 ? (
                form.tags.map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F1681D]/20 text-[#F1681D] border border-[#F1681D]/40 text-xs font-semibold animate-in fade-in"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = form.tags.filter((_, i) => i !== idx);
                        setForm({ ...form, tags: updated });
                      }}
                      className="w-3.5 h-3.5 rounded-full hover:bg-[#F1681D] hover:text-white flex items-center justify-center text-[10px] transition-colors cursor-pointer"
                      title="Remove tag"
                    >
                      ✕
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-xs text-white/30 italic px-2">
                  No tags added yet. Type below or pick a suggestion.
                </span>
              )}
            </div>

            {/* Tag Input Field with Add Button */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a technology (e.g. Next.js, React, Node.js) and press Enter or comma..."
                value={tagInput}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.includes(",")) {
                    const parts = val.split(",");
                    const newTags = parts
                      .map((p) => p.trim())
                      .filter((p) => p && !form.tags?.includes(p));
                    if (newTags.length > 0) {
                      setForm({ ...form, tags: [...(form.tags || []), ...newTags] });
                    }
                    setTagInput("");
                  } else {
                    setTagInput(val);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    if (tagInput.trim()) {
                      const clean = tagInput.trim();
                      if (!form.tags?.includes(clean)) {
                        setForm({ ...form, tags: [...(form.tags || []), clean] });
                      }
                      setTagInput("");
                    }
                  }
                }}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
              <button
                type="button"
                onClick={() => {
                  if (tagInput.trim()) {
                    const parts = tagInput.split(",").map((p) => p.trim()).filter(Boolean);
                    const newTags = parts.filter((p) => !form.tags?.includes(p));
                    if (newTags.length > 0) {
                      setForm({ ...form, tags: [...(form.tags || []), ...newTags] });
                    }
                    setTagInput("");
                  }
                }}
                className="px-4 py-2 bg-[#F1681D] hover:bg-[#d65715] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 shadow-xs"
              >
                + Add Tag
              </button>
            </div>

            {/* Quick Popular Technology Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wider mr-1">
                Quick add:
              </span>
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "Python",
                "Tailwind CSS",
                "MongoDB",
                "PostgreSQL",
                "AWS",
                "Docker",
                "GraphQL",
                "Figma",
                "REST API",
                "Redis",
              ].map((sug) => {
                const isAlreadyAdded = form.tags?.includes(sug);
                return (
                  <button
                    key={sug}
                    type="button"
                    disabled={isAlreadyAdded}
                    onClick={() => {
                      if (!isAlreadyAdded) {
                        setForm({ ...form, tags: [...(form.tags || []), sug] });
                      }
                    }}
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer",
                      isAlreadyAdded
                        ? "bg-white/5 border-white/5 text-white/20 cursor-not-allowed"
                        : "bg-white/5 border-white/15 text-white/60 hover:bg-[#F1681D]/20 hover:text-[#F1681D] hover:border-[#F1681D]/40"
                    )}
                  >
                    +{sug}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <ImageUpload
              value={form.img}
              onChange={(url) => setForm({ ...form, img: url })}
              folder="zubyte_asset"
              label="Case Study Cover Image (Cloudinary Integration)"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">Short Executive Summary</label>
            <textarea
              required
              rows={2}
              placeholder="A secure, multi-tenant portal built for..."
              value={form.shortDesc}
              onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3.5">
            <p className="text-xs font-bold text-[#F1681D] uppercase tracking-wider">
              ★ STAR Framework Breakdown
            </p>

            {form.stars.map((star, idx) => (
              <div key={star.label} className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-white/70 uppercase flex items-center justify-between">
                  <span>{star.label}</span>
                  <span className="text-[10px] text-white/40">
                    {star.label === "Situation" && "Context & legacy problem"}
                    {star.label === "Task" && "The scoped challenge"}
                    {star.label === "Action" && "Architecture & tech executed"}
                    {star.label === "Result" && "Measurable outcome / ROI metric"}
                  </span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={star.text}
                  onChange={(e) => handleStarChange(idx, e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">GitHub Link</label>
              <input
                type="url"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Live Demo Link</label>
              <input
                type="url"
                value={form.live}
                onChange={(e) => setForm({ ...form, live: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Case Study"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Case Study"
        message={`Are you sure you want to permanently delete "${projectToDelete?.title}"?`}
        isLoading={isSaving}
      />
    </div>
  );
}

