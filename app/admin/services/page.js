"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { api } from "@/lib/api";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { cn } from "@/lib/utils";

export default function AdminServicesPage() {
  const { isAdmin } = useAuth();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedParentGroup, setSelectedParentGroup] = useState(null);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [groupForm, setGroupForm] = useState({
    group: "",
    slug: "",
    portfolioKey: "",
    tagline: "",
    icon: "⬡",
    color: "#1b1b1b",
    items: [],
  });

  const [itemForm, setItemForm] = useState({
    name: "",
    desc: "",
  });

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const res = await api.services.getAll();
      if (res.data) {
        setServices(res.data);
        if (res.data.length > 0 && !activeGroup) {
          setActiveGroup(res.data[0]._id || res.data[0].slug);
        }
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateGroupModal = () => {
    setEditingGroup(null);
    setGroupForm({
      group: "",
      slug: "",
      portfolioKey: "",
      tagline: "",
      icon: "⬡",
      color: "#F1681D",
      items: [],
    });
    setIsModalOpen(true);
  };

  const openEditGroupModal = (group) => {
    setEditingGroup(group);
    setGroupForm({
      group: group.group,
      slug: group.slug,
      portfolioKey: group.portfolioKey,
      tagline: group.tagline,
      icon: group.icon || "⬡",
      color: group.color || "#1b1b1b",
      items: group.items || [],
    });
    setIsModalOpen(true);
  };

  const handleSaveGroup = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingGroup) {
        const res = await api.services.update(editingGroup._id, groupForm);
        setServices((prev) =>
          prev.map((g) => (g._id === editingGroup._id ? res.data : g))
        );
        setMessage("Discipline updated successfully!");
      } else {
        const res = await api.services.create(groupForm);
        setServices((prev) => [...prev, res.data]);
        setActiveGroup(res.data._id);
        setMessage("Discipline created successfully!");
      }
      setIsModalOpen(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to save discipline group");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!groupToDelete) return;
    setIsSaving(true);
    try {
      await api.services.delete(groupToDelete._id);
      setServices((prev) => prev.filter((g) => g._id !== groupToDelete._id));
      if (activeGroup === groupToDelete._id) {
        setActiveGroup(services.find((g) => g._id !== groupToDelete._id)?._id || null);
      }
      setGroupToDelete(null);
      setMessage("Discipline deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to delete discipline group");
    } finally {
      setIsSaving(false);
    }
  };

  const openCreateItemModal = (parentGroup) => {
    setSelectedParentGroup(parentGroup);
    setEditingItem(null);
    setItemForm({ name: "", desc: "" });
    setIsItemModalOpen(true);
  };

  const openEditItemModal = (parentGroup, item) => {
    setSelectedParentGroup(parentGroup);
    setEditingItem(item);
    setItemForm({ name: item.name, desc: item.desc });
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (!selectedParentGroup) return;
    setIsSaving(true);

    try {
      let updatedItems;
      if (editingItem) {
        updatedItems = selectedParentGroup.items.map((i) =>
          i._id === editingItem._id ? { ...i, ...itemForm } : i
        );
      } else {
        updatedItems = [...(selectedParentGroup.items || []), itemForm];
      }

      const res = await api.services.update(selectedParentGroup._id, {
        items: updatedItems,
      });

      setServices((prev) =>
        prev.map((g) => (g._id === selectedParentGroup._id ? res.data : g))
      );

      setIsItemModalOpen(false);
      setMessage("Service item saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to save service item");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete || !selectedParentGroup) return;
    setIsSaving(true);

    try {
      const updatedItems = selectedParentGroup.items.filter(
        (i) => i._id !== itemToDelete._id
      );

      const res = await api.services.update(selectedParentGroup._id, {
        items: updatedItems,
      });

      setServices((prev) =>
        prev.map((g) => (g._id === selectedParentGroup._id ? res.data : g))
      );

      setItemToDelete(null);
      setMessage("Service item removed!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to remove service item");
    } finally {
      setIsSaving(false);
    }
  };

  const currentGroup =
    services.find((g) => (g._id && g._id === activeGroup) || (g.slug && g.slug === activeGroup) || g.group === activeGroup) ||
    services[0];


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Services & Disciplines Manager
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Manage the 5 core discipline groups and all 21 service capabilities.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={openCreateGroupModal}
            className="px-4 py-2.5 rounded-2xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            + Add New Discipline
          </button>
        )}
      </div>

      {message && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
          {message}
        </div>
      )}

      {isLoading ? (
        <div className="p-16 text-center text-xs text-white/50">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-3xl bg-[#141414] border border-white/10 p-4 space-y-2">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-3 py-1">
              Discipline Groups ({services.length})
            </p>
            {services.map((g, idx) => {
              const groupKey = g._id || g.slug || `grp_${idx}`;
              const isActive = (g._id || g.slug) === activeGroup;
              return (
                <button
                  key={groupKey}
                  onClick={() => setActiveGroup(g._id || g.slug)}
                  className={cn(
                    "w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer",
                    isActive
                      ? "bg-[#1b1b1b] text-white border border-white/20 shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: g.color || "#F1681D" }}
                    />
                    <span className="text-sm">{g.group}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {g.items?.length || 0} items
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2 rounded-3xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-6">
            {currentGroup ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{currentGroup.icon}</span>
                      <h2 className="text-xl font-heading font-bold text-white">
                        {currentGroup.group}
                      </h2>
                      <span className="text-xs text-white/40 font-mono">
                        (slug: /{currentGroup.slug})
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-1 max-w-md">
                      {currentGroup.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditGroupModal(currentGroup)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Edit Group
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => setGroupToDelete(currentGroup)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete Discipline Group"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-heading font-bold text-white">
                      Service Offerings ({currentGroup.items?.length || 0})
                    </h3>
                    <button
                      onClick={() => openCreateItemModal(currentGroup)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#F1681D]/20 border border-[#F1681D]/40 text-[#F1681D] text-xs font-bold hover:bg-[#F1681D]/30 transition-colors cursor-pointer"
                    >
                      + Add Service Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentGroup.items?.map((item, iIdx) => (
                      <div
                        key={item._id || item.name || `item_${iIdx}`}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-all"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-white mb-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-white/50 leading-relaxed max-w-lg">
                            {item.desc}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => openEditItemModal(currentGroup, item)}
                            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedParentGroup(currentGroup);
                              setItemToDelete(item);
                            }}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-xs text-white/40">
                Select a discipline to view service details.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Discipline Group Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingGroup ? "Edit Discipline Group" : "Create Discipline Group"}
        size="md"
      >
        <form onSubmit={handleSaveGroup} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Group Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Build"
                value={groupForm.group}
                onChange={(e) => setGroupForm({ ...groupForm, group: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">URL Slug</label>
              <input
                type="text"
                required
                placeholder="e.g. build"
                value={groupForm.slug}
                onChange={(e) => setGroupForm({ ...groupForm, slug: e.target.value.toLowerCase() })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Portfolio Key</label>
              <input
                type="text"
                required
                placeholder="e.g. Web Development"
                value={groupForm.portfolioKey}
                onChange={(e) => setGroupForm({ ...groupForm, portfolioKey: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Icon Symbol</label>
              <input
                type="text"
                value={groupForm.icon}
                onChange={(e) => setGroupForm({ ...groupForm, icon: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Theme Color</label>
              <input
                type="text"
                value={groupForm.color}
                onChange={(e) => setGroupForm({ ...groupForm, color: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">Tagline</label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Web, mobile & bespoke software built to your specification."
              value={groupForm.tagline}
              onChange={(e) => setGroupForm({ ...groupForm, tagline: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
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
              className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Discipline"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Service Item Modal */}
      <Modal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        title={editingItem ? "Edit Service Offering" : "Add New Service Offering"}
        size="md"
      >
        <form onSubmit={handleSaveItem} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">Service Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mobile App Development"
              value={itemForm.name}
              onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">Description</label>
            <textarea
              required
              rows={3}
              placeholder="Performant, scalable applications engineered for reliability at scale..."
              value={itemForm.desc}
              onChange={(e) => setItemForm({ ...itemForm, desc: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsItemModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Service Item"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!groupToDelete}
        onClose={() => setGroupToDelete(null)}
        onConfirm={handleDeleteGroup}
        title="Delete Discipline Group"
        message={`Are you sure you want to delete the "${groupToDelete?.group}" discipline group and all its service offerings?`}
        isLoading={isSaving}
      />

      <ConfirmDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDeleteItem}
        title="Delete Service Offering"
        message={`Are you sure you want to remove "${itemToDelete?.name}" from ${selectedParentGroup?.group}?`}
        isLoading={isSaving}
      />
    </div>
  );
}

