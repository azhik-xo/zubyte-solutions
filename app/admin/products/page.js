"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { api } from "@/lib/api";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const { isAdmin } = useAuth();
  const [suites, setSuites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSuiteId, setActiveSuiteId] = useState(null);
  const [isSuiteModalOpen, setIsSuiteModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingSuite, setEditingSuite] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedParentSuite, setSelectedParentSuite] = useState(null);
  const [suiteToDelete, setSuiteToDelete] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [suiteForm, setSuiteForm] = useState({
    id: "",
    suite: "",
    label: "",
    tagline: "",
    desc: "",
    color: "#6366f1",
    subcategories: "",
    img: "photo-1523050854058-8df90110c9f1",
    products: [],
  });

  const [productForm, setProductForm] = useState({
    name: "",
    type: "",
    desc: "",
    status: "Live",
  });

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await api.products.getAll();
      if (res.data) {
        setSuites(res.data);
        if (res.data.length > 0 && !activeSuiteId) {
          setActiveSuiteId(res.data[0]._id || res.data[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateSuiteModal = () => {
    setEditingSuite(null);
    setSuiteForm({
      id: "",
      suite: "",
      label: "",
      tagline: "",
      desc: "",
      color: "#6366f1",
      subcategories: "Education ERP, LMS, Assessment",
      img: "photo-1523050854058-8df90110c9f1",
      products: [],
    });
    setIsSuiteModalOpen(true);
  };

  const openEditSuiteModal = (suite) => {
    setEditingSuite(suite);
    setSuiteForm({
      id: suite.id,
      suite: suite.suite,
      label: suite.label,
      tagline: suite.tagline,
      desc: suite.desc,
      color: suite.color || "#6366f1",
      subcategories: suite.subcategories?.join(", ") || "",
      img: suite.img || "photo-1523050854058-8df90110c9f1",
      products: suite.products || [],
    });
    setIsSuiteModalOpen(true);
  };

  const handleSaveSuite = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...suiteForm,
        subcategories: suiteForm.subcategories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      if (editingSuite) {
        const res = await api.products.update(editingSuite._id, payload);
        setSuites((prev) =>
          prev.map((s) => (s._id === editingSuite._id ? res.data : s))
        );
        setMessage("Product Suite updated!");
      } else {
        const res = await api.products.create(payload);
        setSuites((prev) => [...prev, res.data]);
        setActiveSuiteId(res.data._id);
        setMessage("Product Suite created!");
      }
      setIsSuiteModalOpen(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to save product suite");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSuite = async () => {
    if (!suiteToDelete) return;
    setIsSaving(true);
    try {
      await api.products.delete(suiteToDelete._id);
      setSuites((prev) => prev.filter((s) => s._id !== suiteToDelete._id));
      if (activeSuiteId === suiteToDelete._id) {
        setActiveSuiteId(suites.find((s) => s._id !== suiteToDelete._id)?._id || null);
      }
      setSuiteToDelete(null);
      setMessage("Product Suite deleted!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to delete suite");
    } finally {
      setIsSaving(false);
    }
  };

  const openCreateProductModal = (suite) => {
    setSelectedParentSuite(suite);
    setEditingProduct(null);
    setProductForm({ name: "", type: "", desc: "", status: "Live" });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (suite, prod) => {
    setSelectedParentSuite(suite);
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      type: prod.type,
      desc: prod.desc,
      status: prod.status || "Live",
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!selectedParentSuite) return;
    setIsSaving(true);

    try {
      let updatedProducts;
      if (editingProduct) {
        updatedProducts = selectedParentSuite.products.map((p) =>
          p._id === editingProduct._id ? { ...p, ...productForm } : p
        );
      } else {
        updatedProducts = [...(selectedParentSuite.products || []), productForm];
      }

      const res = await api.products.update(selectedParentSuite._id, {
        products: updatedProducts,
      });

      setSuites((prev) =>
        prev.map((s) => (s._id === selectedParentSuite._id ? res.data : s))
      );

      setIsProductModalOpen(false);
      setMessage("Product saved!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete || !selectedParentSuite) return;
    setIsSaving(true);

    try {
      const updatedProducts = selectedParentSuite.products.filter(
        (p) => p._id !== productToDelete._id
      );

      const res = await api.products.update(selectedParentSuite._id, {
        products: updatedProducts,
      });

      setSuites((prev) =>
        prev.map((s) => (s._id === selectedParentSuite._id ? res.data : s))
      );

      setProductToDelete(null);
      setMessage("Product removed!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to remove product");
    } finally {
      setIsSaving(false);
    }
  };

  const currentSuite =
    suites.find((s) => (s._id && s._id === activeSuiteId) || (s.id && s.id === activeSuiteId) || s.suite === activeSuiteId) ||
    suites[0];


  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Enterprise Product Suites
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Manage product suites (Zubyte Edu, Business, Work, Staff) and specific products.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={openCreateSuiteModal}
            className="px-4 py-2.5 rounded-2xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            + Add Product Suite
          </button>
        )}
      </div>

      {message && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
          {message}
        </div>
      )}

      {isLoading ? (
        <div className="p-16 text-center text-xs text-white/50">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-3xl bg-[#141414] border border-white/10 p-4 space-y-2">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-3 py-1">
              Product Suites ({suites.length})
            </p>
            {suites.map((s, idx) => {
              const suiteKey = s._id || s.id || `suite_${idx}`;
              const isActive = (s._id || s.id) === activeSuiteId;
              return (
                <button
                  key={suiteKey}
                  onClick={() => setActiveSuiteId(s._id || s.id)}
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
                      style={{ backgroundColor: s.color || "#6366f1" }}
                    />
                    <div>
                      <p className="text-sm font-bold">{s.suite}</p>
                      <p className="text-[10px] text-white/40">{s.label}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {s.products?.length || 0}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2 rounded-3xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-6">
            {currentSuite ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F1681D]">
                      {currentSuite.label}
                    </span>
                    <h2 className="text-xl font-heading font-bold text-white mt-0.5">
                      {currentSuite.suite}
                    </h2>
                    <p className="text-xs text-white/60 mt-1 max-w-md">
                      {currentSuite.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditSuiteModal(currentSuite)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Edit Suite
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => setSuiteToDelete(currentSuite)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        title="Delete Product Suite"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {currentSuite.subcategories?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {currentSuite.subcategories.map((sub, sIdx) => (
                      <span
                        key={`${sub}_${sIdx}`}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-heading font-bold text-white">
                      Products in Suite ({currentSuite.products?.length || 0})
                    </h3>
                    <button
                      onClick={() => openCreateProductModal(currentSuite)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#F1681D]/20 border border-[#F1681D]/40 text-[#F1681D] text-xs font-bold hover:bg-[#F1681D]/30 transition-colors cursor-pointer"
                    >
                      + Add Product
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentSuite.products?.map((prod, pIdx) => (
                      <div
                        key={prod._id || prod.name || `prod_${pIdx}`}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-xs font-bold text-white">
                              {prod.name}
                            </h4>
                            <span
                              className={cn(
                                "text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase",
                                prod.status === "Live"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-amber-500/20 text-amber-400"
                              )}
                            >
                              {prod.status || "Live"}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#F1681D] font-semibold mb-1">
                            {prod.type}
                          </p>
                          <p className="text-xs text-white/50 leading-relaxed max-w-lg">
                            {prod.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => openEditProductModal(currentSuite, prod)}
                            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedParentSuite(currentSuite);
                              setProductToDelete(prod);
                            }}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Delete Product"
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
                Select a product suite to view products.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suite Modal */}
      <Modal
        isOpen={isSuiteModalOpen}
        onClose={() => setIsSuiteModalOpen(false)}
        title={editingSuite ? "Edit Product Suite" : "Create Product Suite"}
        size="md"
      >
        <form onSubmit={handleSaveSuite} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Suite Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Zubyte Edu"
                value={suiteForm.suite}
                onChange={(e) => setSuiteForm({ ...suiteForm, suite: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Suite ID (slug)</label>
              <input
                type="text"
                required
                placeholder="e.g. edu"
                value={suiteForm.id}
                onChange={(e) => setSuiteForm({ ...suiteForm, id: e.target.value.toLowerCase() })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Category Label</label>
              <input
                type="text"
                required
                placeholder="e.g. Education Technology"
                value={suiteForm.label}
                onChange={(e) => setSuiteForm({ ...suiteForm, label: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Theme Color</label>
              <input
                type="text"
                value={suiteForm.color}
                onChange={(e) => setSuiteForm({ ...suiteForm, color: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">Tagline</label>
            <input
              type="text"
              required
              placeholder="e.g. End-to-end digital infrastructure for modern institutions."
              value={suiteForm.tagline}
              onChange={(e) => setSuiteForm({ ...suiteForm, tagline: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">Full Description</label>
            <textarea
              required
              rows={3}
              value={suiteForm.desc}
              onChange={(e) => setSuiteForm({ ...suiteForm, desc: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">
              Subcategories (comma-separated)
            </label>
            <input
              type="text"
              placeholder="Education ERP, LMS, Assessment, Placement"
              value={suiteForm.subcategories}
              onChange={(e) => setSuiteForm({ ...suiteForm, subcategories: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsSuiteModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Product Suite"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Product Item Modal */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add New Product"}
        size="md"
      >
        <form onSubmit={handleSaveProduct} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Product Name</label>
              <input
                type="text"
                required
                placeholder="e.g. One Digital Campus"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-white/70 uppercase">Status</label>
              <select
                value={productForm.status}
                onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
              >
                <option value="Live" className="bg-[#141414]">Live</option>
                <option value="Beta" className="bg-[#141414]">Beta</option>
                <option value="Coming Soon" className="bg-[#141414]">Coming Soon</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">Product Type / Category</label>
            <input
              type="text"
              required
              placeholder="e.g. Education ERP / Campus Management"
              value={productForm.type}
              onChange={(e) => setProductForm({ ...productForm, type: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-white/70 uppercase">Description</label>
            <textarea
              required
              rows={3}
              placeholder="A unified ERP that digitises every administrative and academic process..."
              value={productForm.desc}
              onChange={(e) => setProductForm({ ...productForm, desc: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#F1681D]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!suiteToDelete}
        onClose={() => setSuiteToDelete(null)}
        onConfirm={handleDeleteSuite}
        title="Delete Product Suite"
        message={`Are you sure you want to delete "${suiteToDelete?.suite}" and all its associated products?`}
        isLoading={isSaving}
      />

      <ConfirmDialog
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to remove "${productToDelete?.name}"?`}
        isLoading={isSaving}
      />
    </div>
  );
}

