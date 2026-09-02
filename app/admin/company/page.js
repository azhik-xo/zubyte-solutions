"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/components/admin/AuthProvider";
import ImageUpload from "@/components/admin/ImageUpload";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "general", label: "Identity & General", icon: "🏢" },
  { id: "leadership", label: "Leadership & Vision", icon: "👤" },
  { id: "stats", label: "Stats & Numbers", icon: "📈" },
  { id: "clients", label: "Client Marquee", icon: "🤝" },
  { id: "values", label: "Principles & Values", icon: "💎" },
  { id: "milestones", label: "Story & Milestones", icon: "📜" },
  { id: "offices", label: "Global Offices", icon: "🌍" },
  { id: "faqs", label: "FAQ Library", icon: "❓" },
];

export default function AdminCompanyPage() {
  const { role } = useAuth();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "general";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // State for all company data
  const [general, setGeneral] = useState({
    name: "Zubyte Solution",
    legalName: "Zubyte IT Solutions Inc.",
    shortName: "Zubyte",
    tagline: "Where Ideas Evolve Into Products",
    description: "",
    email: "hello@zubyte.org",
    phone: "+1 (800) 555-0199",
    foundedYear: "2025",
  });

  const [leadership, setLeadership] = useState({
    name: "Dinesh Murugan",
    role: "CEO, ZuByte Solution",
    initials: "DM",
    quote: "",
  });

  const [stats, setStats] = useState([]);
  const [clients, setClients] = useState([]);
  const [coreValues, setCoreValues] = useState([]);
  const [storyMilestones, setStoryMilestones] = useState([]);
  const [offices, setOffices] = useState([]);
  const [faqs, setFaqs] = useState([]);

  // Client modal
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [clientForm, setClientForm] = useState({ name: "", logoUrl: "", active: true });
  const [editingClientIndex, setEditingClientIndex] = useState(null);

  const isAuthorized = role === "admin" || role === "developer";

  const showNotification = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.company.getInfo();
      if (res.data) {
        const d = res.data;
        setGeneral({
          name: d.name || "Zubyte Solution",
          legalName: d.legalName || "Zubyte IT Solutions Inc.",
          shortName: d.shortName || "Zubyte",
          tagline: d.tagline || "Where Ideas Evolve Into Products",
          description: d.description || "",
          email: d.email || "hello@zubyte.org",
          phone: d.phone || "+1 (800) 555-0199",
          foundedYear: d.foundedYear || "2025",
        });

        if (d.leadership) {
          setLeadership({
            name: d.leadership.name || "Dinesh Murugan",
            role: d.leadership.role || "CEO, ZuByte Solution",
            initials: d.leadership.initials || "DM",
            quote: d.leadership.quote || "",
          });
        }

        setStats(d.stats || []);
        setClients(d.clientLogos || []);
        setCoreValues(d.coreValues || []);
        setStoryMilestones(d.storyMilestones || []);
        setOffices(d.offices || []);
        setFaqs(d.faqs || []);
      }
    } catch (err) {
      showNotification("Failed to load company data: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save General Info
  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.company.updateInfo(general);
      showNotification("Company identity updated successfully!");
    } catch (err) {
      showNotification("Error saving company info: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save Leadership
  const handleSaveLeadership = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.company.updateLeadership(leadership);
      showNotification("Leadership profile updated successfully!");
    } catch (err) {
      showNotification("Error saving leadership: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save Stats
  const handleSaveStats = async () => {
    try {
      setSaving(true);
      await api.company.updateStats(stats);
      showNotification("Proof in numbers (stats) updated successfully!");
    } catch (err) {
      showNotification("Error saving stats: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save Clients
  const handleSaveClients = async (updated) => {
    try {
      setSaving(true);
      const res = await api.company.updateClients(updated);
      setClients(res.data || updated);
      showNotification("Client marquee updated successfully!");
    } catch (err) {
      showNotification("Error saving clients: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save Core Values
  const handleSaveValues = async () => {
    try {
      setSaving(true);
      await api.company.updateCoreValues(coreValues);
      showNotification("Core principles & values updated successfully!");
    } catch (err) {
      showNotification("Error saving values: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save Story Milestones
  const handleSaveMilestones = async () => {
    try {
      setSaving(true);
      await api.company.updateStoryMilestones(storyMilestones);
      showNotification("Story milestones updated successfully!");
    } catch (err) {
      showNotification("Error saving milestones: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save Offices
  const handleSaveOffices = async () => {
    try {
      setSaving(true);
      await api.company.updateOffices(offices);
      showNotification("Global offices updated successfully!");
    } catch (err) {
      showNotification("Error saving offices: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Save FAQs
  const handleSaveFaqs = async () => {
    try {
      setSaving(true);
      await api.company.updateFaqs(faqs);
      showNotification("FAQs updated successfully!");
    } catch (err) {
      showNotification("Error saving FAQs: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Company & Brand Profile
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#F1681D]/20 text-[#F1681D] border border-[#F1681D]/30">
              Live Database
            </span>
          </div>
          <p className="text-sm text-white/50 mt-1">
            Manage your company identity, leadership quote, statistics, marquee logos, values, story chapters, offices, and FAQs in real time.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
        >
          <svg className={cn("w-3.5 h-3.5", loading && "animate-spin")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      {/* Toast Notification */}
      {message.text && (
        <div
          className={cn(
            "p-4 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-lg transition-all animate-in fade-in",
            message.type === "error"
              ? "bg-red-500/10 border border-red-500/30 text-red-300"
              : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
          )}
        >
          <div className="flex items-center gap-2">
            <span>{message.type === "error" ? "⚠️" : "✓"}</span>
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage({ text: "", type: "" })} className="text-white/40 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 scrollbar-hide">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 cursor-pointer",
                isActive
                  ? "bg-[#F1681D] text-white shadow-md font-bold"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-3xl bg-white/5" />
        </div>
      ) : (
        <div>
          {/* TAB 1: IDENTITY & GENERAL */}
          {activeTab === "general" && (
            <form onSubmit={handleSaveGeneral} className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">General & Branding Information</h2>
                  <p className="text-xs text-white/50">Powers your headers, footers, metadata, and direct contact details.</p>
                </div>
                {isAuthorized && (
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-[#F1681D] hover:bg-[#d95510] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Identity Changes"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Company Name</label>
                  <input
                    type="text"
                    value={general.name}
                    onChange={(e) => setGeneral({ ...general, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Legal Registered Name</label>
                  <input
                    type="text"
                    value={general.legalName}
                    onChange={(e) => setGeneral({ ...general, legalName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Short Name / Brand</label>
                  <input
                    type="text"
                    value={general.shortName}
                    onChange={(e) => setGeneral({ ...general, shortName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Founded Year</label>
                  <input
                    type="text"
                    value={general.foundedYear}
                    onChange={(e) => setGeneral({ ...general, foundedYear: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Support / Inquiries Email</label>
                  <input
                    type="email"
                    value={general.email}
                    onChange={(e) => setGeneral({ ...general, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Official Phone</label>
                  <input
                    type="text"
                    value={general.phone}
                    onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Tagline</label>
                  <input
                    type="text"
                    value={general.tagline}
                    onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Company Overview Description</label>
                  <textarea
                    rows={4}
                    value={general.description}
                    onChange={(e) => setGeneral({ ...general, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: LEADERSHIP & VISION */}
          {activeTab === "leadership" && (
            <form onSubmit={handleSaveLeadership} className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">Leadership Profile & Vision Quote</h2>
                  <p className="text-xs text-white/50">Displayed on the Home Testimonial quote section and About page narrative.</p>
                </div>
                {isAuthorized && (
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-[#F1681D] hover:bg-[#d95510] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Leadership Profile"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Leader / Founder Name</label>
                  <input
                    type="text"
                    value={leadership.name}
                    onChange={(e) => setLeadership({ ...leadership, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Official Role</label>
                  <input
                    type="text"
                    value={leadership.role}
                    onChange={(e) => setLeadership({ ...leadership, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Avatar Initials</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={leadership.initials}
                    onChange={(e) => setLeadership({ ...leadership, initials: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Strategic Vision Quote</label>
                  <textarea
                    rows={4}
                    value={leadership.quote}
                    onChange={(e) => setLeadership({ ...leadership, quote: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                    placeholder="Enter founder or leadership quote..."
                    required
                  />
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 mt-6">
                <div className="w-12 h-12 rounded-full bg-[#F1681D] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {leadership.initials || "DM"}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{leadership.name}</p>
                  <p className="text-xs text-white/50">{leadership.role}</p>
                  <p className="text-xs text-white/70 italic mt-2">“{leadership.quote}”</p>
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: STATS & NUMBERS */}
          {activeTab === "stats" && (
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">Proof in Numbers (Key Metrics)</h2>
                  <p className="text-xs text-white/50">Highlighted on the Homepage social proof section and About page.</p>
                </div>
                {isAuthorized && (
                  <button
                    onClick={handleSaveStats}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-[#F1681D] hover:bg-[#d95510] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Stats"}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between gap-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Metric #{idx + 1}</span>
                    <input
                      type="text"
                      value={s.stat}
                      onChange={(e) => {
                        const next = [...stats];
                        next[idx].stat = e.target.value;
                        setStats(next);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-heading font-bold text-xl text-[#F1681D] focus:border-[#F1681D] focus:outline-none"
                      placeholder="e.g. 50+"
                    />
                    <input
                      type="text"
                      value={s.label}
                      onChange={(e) => {
                        const next = [...stats];
                        next[idx].label = e.target.value;
                        setStats(next);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:border-[#F1681D] focus:outline-none"
                      placeholder="e.g. Products launched"
                    />
                    <input
                      type="text"
                      value={s.sub || ""}
                      onChange={(e) => {
                        const next = [...stats];
                        next[idx].sub = e.target.value;
                        setStats(next);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white/50 text-xs focus:border-[#F1681D] focus:outline-none"
                      placeholder="e.g. across 12 industries"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CLIENT MARQUEE */}
          {activeTab === "clients" && (
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">Client Marquee Partners ({clients.length})</h2>
                  <p className="text-xs text-white/50">Partners scrolling infinitely in the social proof ticker.</p>
                </div>
                <div className="flex gap-3">
                  {isAuthorized && (
                    <>
                      <button
                        onClick={() => {
                          setEditingClientIndex(null);
                          setClientForm({ name: "", logoUrl: "", active: true });
                          setClientModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        + Add Partner
                      </button>
                      <button
                        onClick={() => handleSaveClients(clients)}
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95510] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save Marquee"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Client List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {clients.map((c, idx) => (
                  <div
                    key={c._id || idx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between gap-3 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white/40 uppercase">#{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...clients];
                          next[idx].active = !next[idx].active;
                          setClients(next);
                        }}
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer",
                          c.active ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/40"
                        )}
                      >
                        {c.active ? "Active" : "Hidden"}
                      </button>
                    </div>

                    <div className="h-14 flex items-center justify-center bg-black/40 rounded-xl border border-white/5 p-2">
                      {c.logoUrl ? (
                        <img src={c.logoUrl} alt={c.name} className="max-h-full max-w-full object-contain filter brightness-90 hover:brightness-100" />
                      ) : (
                        <span className="text-xs font-bold text-white/80 tracking-wider uppercase truncate px-2">{c.name}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs font-semibold text-white truncate max-w-[120px]">{c.name}</span>
                      {isAuthorized && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingClientIndex(idx);
                              setClientForm({ ...c });
                              setClientModalOpen(true);
                            }}
                            className="text-xs text-white/60 hover:text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              const next = clients.filter((_, i) => i !== idx);
                              setClients(next);
                            }}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRINCIPLES & VALUES */}
          {activeTab === "values" && (
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">Principles of Practice ({coreValues.length})</h2>
                  <p className="text-xs text-white/50">Displayed in the 3 Bento cards on the About page.</p>
                </div>
                <div className="flex gap-3">
                  {isAuthorized && (
                    <>
                      <button
                        onClick={() => {
                          const nextNum = `0${coreValues.length + 1}`;
                          setCoreValues([
                            ...coreValues,
                            { num: nextNum, icon: "◈", name: "New Principle", desc: "Description of the principle." },
                          ]);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        + Add Tenet
                      </button>
                      <button
                        onClick={handleSaveValues}
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95510] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save Principles"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coreValues.map((val, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={val.num}
                          onChange={(e) => {
                            const next = [...coreValues];
                            next[idx].num = e.target.value;
                            setCoreValues(next);
                          }}
                          className="w-12 px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-xs"
                        />
                        <input
                          type="text"
                          value={val.icon}
                          onChange={(e) => {
                            const next = [...coreValues];
                            next[idx].icon = e.target.value;
                            setCoreValues(next);
                          }}
                          className="w-10 px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-center text-xs"
                        />
                      </div>
                      {isAuthorized && (
                        <button
                          onClick={() => setCoreValues(coreValues.filter((_, i) => i !== idx))}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          ✕ Delete
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase mb-1">Tenet Title</label>
                      <input
                        type="text"
                        value={val.name}
                        onChange={(e) => {
                          const next = [...coreValues];
                          next[idx].name = e.target.value;
                          setCoreValues(next);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-bold focus:border-[#F1681D] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={val.desc}
                        onChange={(e) => {
                          const next = [...coreValues];
                          next[idx].desc = e.target.value;
                          setCoreValues(next);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white/70 text-xs focus:border-[#F1681D] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: STORY & MILESTONES */}
          {activeTab === "milestones" && (
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">Our Story & Milestones ({storyMilestones.length})</h2>
                  <p className="text-xs text-white/50">Chronological chapters of Zubyte’s evolution on the About page.</p>
                </div>
                <div className="flex gap-3">
                  {isAuthorized && (
                    <>
                      <button
                        onClick={() => {
                          const nextNum = `0${storyMilestones.length + 1}`;
                          setStoryMilestones([
                            ...storyMilestones,
                            { num: nextNum, title: "New Chapter", body: "Chapter story details." },
                          ]);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        + Add Milestone
                      </button>
                      <button
                        onClick={handleSaveMilestones}
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95510] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save Milestones"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {storyMilestones.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-6 items-start">
                    <div className="shrink-0 flex items-center gap-3">
                      <input
                        type="text"
                        value={item.num}
                        onChange={(e) => {
                          const next = [...storyMilestones];
                          next[idx].num = e.target.value;
                          setStoryMilestones(next);
                        }}
                        className="w-14 px-3 py-2 rounded-xl bg-[#F1681D] text-white font-bold text-center text-xs"
                      />
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const next = [...storyMilestones];
                          next[idx].title = e.target.value;
                          setStoryMilestones(next);
                        }}
                        className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-bold focus:border-[#F1681D] focus:outline-none"
                        placeholder="Chapter Title (e.g. The Frustration)"
                      />
                      <textarea
                        rows={3}
                        value={item.body}
                        onChange={(e) => {
                          const next = [...storyMilestones];
                          next[idx].body = e.target.value;
                          setStoryMilestones(next);
                        }}
                        className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white/70 text-xs focus:border-[#F1681D] focus:outline-none"
                        placeholder="Chapter Narrative..."
                      />
                    </div>

                    {isAuthorized && (
                      <button
                        onClick={() => setStoryMilestones(storyMilestones.filter((_, i) => i !== idx))}
                        className="text-xs text-red-400 hover:text-red-300 shrink-0 self-start md:self-center"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: GLOBAL OFFICES */}
          {activeTab === "offices" && (
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">Global Offices ({offices.length})</h2>
                  <p className="text-xs text-white/50">Locations shown in the Contact page interactive map and Footer.</p>
                </div>
                <div className="flex gap-3">
                  {isAuthorized && (
                    <>
                      <button
                        onClick={() => {
                          setOffices([
                            ...offices,
                            { city: "San Francisco", role: "Innovation Lab", address: "Market St, San Francisco, CA" },
                          ]);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        + Add Office
                      </button>
                      <button
                        onClick={handleSaveOffices}
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95510] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save Offices"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {offices.map((loc, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#F1681D] uppercase tracking-wider">Office #{idx + 1}</span>
                      {isAuthorized && (
                        <button
                          onClick={() => setOffices(offices.filter((_, i) => i !== idx))}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          ✕ Delete
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase mb-1">City</label>
                      <input
                        type="text"
                        value={loc.city}
                        onChange={(e) => {
                          const next = [...offices];
                          next[idx].city = e.target.value;
                          setOffices(next);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-bold focus:border-[#F1681D] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase mb-1">Hub Role</label>
                      <input
                        type="text"
                        value={loc.role}
                        onChange={(e) => {
                          const next = [...offices];
                          next[idx].role = e.target.value;
                          setOffices(next);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                        placeholder="e.g. Headquarters / Regional Hub"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase mb-1">Physical Address</label>
                      <textarea
                        rows={3}
                        value={loc.address}
                        onChange={(e) => {
                          const next = [...offices];
                          next[idx].address = e.target.value;
                          setOffices(next);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white/70 text-xs focus:border-[#F1681D] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: FAQS */}
          {activeTab === "faqs" && (
            <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-heading font-bold text-white">Frequently Asked Questions ({faqs.length})</h2>
                  <p className="text-xs text-white/50">Displayed in the accordion on the Homepage and inquiries portal.</p>
                </div>
                <div className="flex gap-3">
                  {isAuthorized && (
                    <>
                      <button
                        onClick={() => {
                          setFaqs([
                            ...faqs,
                            { q: "New Question?", a: "Detailed answer explaining the solution." },
                          ]);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        + Add Question
                      </button>
                      <button
                        onClick={handleSaveFaqs}
                        disabled={saving}
                        className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95510] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save FAQs"}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F1681D]">Q#{idx + 1}</span>
                      {isAuthorized && (
                        <button
                          onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          ✕ Delete
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={faq.q}
                      onChange={(e) => {
                        const next = [...faqs];
                        next[idx].q = e.target.value;
                        setFaqs(next);
                      }}
                      className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-bold focus:border-[#F1681D] focus:outline-none"
                      placeholder="Question..."
                    />

                    <textarea
                      rows={3}
                      value={faq.a}
                      onChange={(e) => {
                        const next = [...faqs];
                        next[idx].a = e.target.value;
                        setFaqs(next);
                      }}
                      className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white/70 text-xs focus:border-[#F1681D] focus:outline-none"
                      placeholder="Answer..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Client Modal */}
      {clientModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5">
            <h3 className="text-lg font-bold text-white font-heading">
              {editingClientIndex !== null ? "Edit Client Partner" : "Add Client Partner"}
            </h3>

            <div>
              <label className="block text-xs font-bold text-white/70 uppercase mb-2">Partner / Client Name</label>
              <input
                type="text"
                value={clientForm.name}
                onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                placeholder="e.g. Apex Systems"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 uppercase mb-2">Partner Logo (Cloudinary / Image)</label>
              <ImageUpload
                value={clientForm.logoUrl}
                onChange={(url) => setClientForm({ ...clientForm, logoUrl: url })}
                folder="zubyte_asset/clients"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="activeToggle"
                checked={clientForm.active}
                onChange={(e) => setClientForm({ ...clientForm, active: e.target.checked })}
                className="rounded text-[#F1681D] focus:ring-0"
              />
              <label htmlFor="activeToggle" className="text-xs text-white/80 cursor-pointer">
                Active in scrolling marquee ticker
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setClientModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!clientForm.name.trim()) return;
                  if (editingClientIndex !== null) {
                    const next = [...clients];
                    next[editingClientIndex] = { ...clientForm };
                    setClients(next);
                  } else {
                    setClients([...clients, { ...clientForm, order: Date.now() }]);
                  }
                  setClientModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-[#F1681D] text-white text-xs font-bold"
              >
                {editingClientIndex !== null ? "Update Partner" : "Add Partner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
