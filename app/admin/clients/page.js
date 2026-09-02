"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/components/admin/AuthProvider";
import ImageUpload from "@/components/admin/ImageUpload";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminClientsPage() {
  const { token, role } = useAuth();
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingStats, setSavingStats] = useState(false);
  const [savingClients, setSavingClients] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Modal / Form state for adding/editing client
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clientForm, setClientForm] = useState({
    name: "",
    logoUrl: "",
    active: true,
  });

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
        setClients(res.data.clientLogos || []);
        setStats(res.data.stats || []);
      }
    } catch (err) {
      showNotification("Failed to load client and company data: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Open modal for new client
  const handleOpenAdd = () => {
    setEditingClient(null);
    setClientForm({ name: "", logoUrl: "", active: true });
    setModalOpen(true);
  };

  // Open modal for editing client
  const handleOpenEdit = (client, idx) => {
    setEditingClient({ ...client, index: idx });
    setClientForm({
      name: client.name || "",
      logoUrl: client.logoUrl || "",
      active: client.active !== false,
    });
    setModalOpen(true);
  };

  // Save single client (Add or Update)
  const handleSaveClient = async (e) => {
    e.preventDefault();
    if (!clientForm.name.trim()) {
      showNotification("Client name is required", "error");
      return;
    }

    try {
      setSavingClients(true);
      let updatedList = [...clients];

      if (editingClient) {
        // Update existing in array
        updatedList[editingClient.index] = {
          ...updatedList[editingClient.index],
          name: clientForm.name.trim(),
          logoUrl: clientForm.logoUrl.trim(),
          active: clientForm.active,
        };
      } else {
        // Append new
        updatedList.push({
          name: clientForm.name.trim(),
          logoUrl: clientForm.logoUrl.trim(),
          active: clientForm.active,
          order: Date.now(),
        });
      }

      const res = await api.company.updateClients(updatedList);
      if (res.data) {
        setClients(res.data);
      } else {
        setClients(updatedList);
      }
      setModalOpen(false);
      showNotification(editingClient ? "Client updated successfully" : "Client added to marquee");
    } catch (err) {
      showNotification("Failed to save client: " + err.message, "error");
    } finally {
      setSavingClients(false);
    }
  };

  // Delete client
  const handleDeleteClient = async (idx) => {
    if (!confirm(`Are you sure you want to remove "${clients[idx]?.name}" from the marquee?`)) return;

    try {
      const updatedList = clients.filter((_, i) => i !== idx);
      const res = await api.company.updateClients(updatedList);
      if (res.data) {
        setClients(res.data);
      } else {
        setClients(updatedList);
      }
      showNotification("Client removed from marquee");
    } catch (err) {
      showNotification("Failed to remove client: " + err.message, "error");
    }
  };

  // Toggle active visibility
  const handleToggleActive = async (idx) => {
    try {
      const updatedList = [...clients];
      updatedList[idx] = {
        ...updatedList[idx],
        active: !updatedList[idx].active,
      };
      setClients(updatedList);
      await api.company.updateClients(updatedList);
      showNotification("Updated client visibility");
    } catch (err) {
      showNotification("Failed to toggle visibility: " + err.message, "error");
      loadData();
    }
  };

  // Move order up/down
  const handleMoveOrder = async (idx, direction) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= clients.length) return;

    const updatedList = [...clients];
    const temp = updatedList[idx];
    updatedList[idx] = updatedList[targetIdx];
    updatedList[targetIdx] = temp;

    setClients(updatedList);
    try {
      await api.company.updateClients(updatedList);
      showNotification("Reordered client marquee");
    } catch (err) {
      showNotification("Failed to save order: " + err.message, "error");
      loadData();
    }
  };

  // Save Stats
  const handleSaveStats = async (e) => {
    e.preventDefault();
    try {
      setSavingStats(true);
      await api.company.updateStats(stats);
      showNotification("Social proof stats updated successfully");
    } catch (err) {
      showNotification("Failed to save stats: " + err.message, "error");
    } finally {
      setSavingStats(false);
    }
  };

  const handleStatChange = (idx, field, value) => {
    const updated = [...stats];
    updated[idx] = { ...updated[idx], [field]: value };
    setStats(updated);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Client Marquee & Social Proof
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Manage live client brand names, partner logos, and proof-in-numbers statistics shown across the homepage.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/admin/company?tab=clients"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <span>🏢 All Company Settings →</span>
          </Link>
          {isAuthorized && (
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-[#F1681D] hover:bg-[#d65715] text-white transition-all shadow-md cursor-pointer"
            >
              <span>+ Add Client Partner</span>
            </button>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {message.text && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 transition-all ${
            message.type === "error"
              ? "bg-red-500/15 border border-red-500/30 text-red-400"
              : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
          }`}
        >
          <span>{message.type === "error" ? "⚠️" : "✅"}</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Live Preview Box */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">
              Live Homepage Preview ({clients.filter((c) => c.active !== false).length} Active)
            </p>
          </div>
          <span className="text-[11px] text-white/40">Continuously loops across viewport</span>
        </div>

        <div className="bg-[#1b1b1b] rounded-2xl py-6 px-4 overflow-hidden border border-white/5">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
            {clients.filter((c) => c.active !== false).length === 0 ? (
              <p className="text-xs text-white/30 italic mx-auto">No active client partners to display.</p>
            ) : (
              clients
                .filter((c) => c.active !== false)
                .map((client, idx) => (
                  <div key={idx} className="shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    {client.logoUrl ? (
                      <img src={client.logoUrl} alt={client.name} className="h-5 w-auto object-contain grayscale" />
                    ) : null}
                    <span className="text-sm font-bold text-white/80 tracking-wider uppercase">
                      {client.name}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Section 1: Client Logos List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="font-heading font-bold text-lg text-white">Client Partners ({clients.length})</h2>
            <p className="text-xs text-white/40 mt-0.5">Toggle visibility, reorder marquee sequence, or edit brand logos.</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <p className="text-sm">No client partners found.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-3 text-xs text-[#F1681D] underline hover:text-white transition-colors"
            >
              Add your first client
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {clients.map((client, idx) => (
              <div
                key={client._id || idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveOrder(idx, -1)}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white text-[10px] cursor-pointer"
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={idx === clients.length - 1}
                      onClick={() => handleMoveOrder(idx, 1)}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white text-[10px] cursor-pointer"
                      title="Move down"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Logo thumbnail or placeholder */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {client.logoUrl ? (
                      <img src={client.logoUrl} alt={client.name} className="max-w-full max-h-full object-contain p-1" />
                    ) : (
                      <span className="font-bold text-xs text-[#F1681D]">{client.name.substring(0, 2).toUpperCase()}</span>
                    )}
                  </div>

                  {/* Name and Status */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-white">{client.name}</p>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          client.active !== false
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {client.active !== false ? "Active" : "Hidden"}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 truncate max-w-xs">
                      {client.logoUrl ? "Custom Logo Attached" : "Typography Name Display"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                      client.active !== false
                        ? "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                        : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    }`}
                  >
                    {client.active !== false ? "Hide" : "Show"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(client, idx)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/15 text-white/80 border border-white/10 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteClient(idx)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Social Proof Numbers (Stats Grid) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="font-heading font-bold text-lg text-white">Social Proof Numbers</h2>
            <p className="text-xs text-white/40 mt-0.5">Customize the 4 key metrics highlighted on the homepage.</p>
          </div>
          {isAuthorized && (
            <button
              onClick={handleSaveStats}
              disabled={savingStats}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-[#F1681D] hover:bg-[#d65715] text-white disabled:opacity-50 transition-colors cursor-pointer"
            >
              {savingStats ? "Saving..." : "Save Stats"}
            </button>
          )}
        </div>

        <form onSubmit={handleSaveStats} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#F1681D]">
                Metric {idx + 1}
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-[10px] uppercase font-bold text-white/40 mb-1">Value</label>
                  <input
                    type="text"
                    value={item.stat || ""}
                    onChange={(e) => handleStatChange(idx, "stat", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm focus:border-[#F1681D] focus:outline-none"
                    placeholder="e.g. 50+"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-white/40 mb-1">Title Label</label>
                  <input
                    type="text"
                    value={item.label || ""}
                    onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-[#F1681D] focus:outline-none"
                    placeholder="e.g. Products launched"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-white/40 mb-1">Sub Description</label>
                <input
                  type="text"
                  value={item.sub || ""}
                  onChange={(e) => handleStatChange(idx, "sub", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs focus:border-[#F1681D] focus:outline-none"
                  placeholder="e.g. across 12 industries"
                />
              </div>
            </div>
          ))}
        </form>
      </div>

      {/* Add / Edit Client Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#181818] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingClient ? "Edit Client Partner" : "Add Client Partner"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/40 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                  Client / Partner Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  placeholder="e.g. ACME CORP, NOVACORP, GOOGLE"
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#F1681D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                  Logo Image (Cloudinary zubyte_asset or URL)
                </label>
                <ImageUpload
                  value={clientForm.logoUrl}
                  onChange={(url) => setClientForm({ ...clientForm, logoUrl: url })}
                  folder="zubyte_asset"
                  placeholderText="Upload partner logo PNG/SVG (transparent recommended)"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={clientForm.active}
                  onChange={(e) => setClientForm({ ...clientForm, active: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#F1681D] focus:ring-[#F1681D]"
                />
                <label htmlFor="activeCheck" className="text-xs font-semibold text-white/80 cursor-pointer">
                  Display in live marquee
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingClients}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#F1681D] hover:bg-[#d65715] transition-colors disabled:opacity-50"
                >
                  {savingClients ? "Saving..." : editingClient ? "Update Client" : "Add to Marquee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

