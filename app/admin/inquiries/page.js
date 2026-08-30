"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { api, API_BASE_URL } from "@/lib/api";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { cn } from "@/lib/utils";

export default function AdminInquiriesPage() {
  const { isAdmin } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (searchQuery) params.append("search", searchQuery);

      const res = await api.inquiries.getAll(params.toString());
      if (res.data) {
        setInquiries(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, searchQuery]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.inquiries.updateStatus(id, { status: newStatus });
      setInquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry?._id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }
      setActionSuccess("Status updated successfully.");
      setTimeout(() => setActionSuccess(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!inquiryToDelete) return;
    setIsDeleting(true);
    try {
      await api.inquiries.delete(inquiryToDelete._id);
      setInquiries((prev) => prev.filter((item) => item._id !== inquiryToDelete._id));
      setInquiryToDelete(null);
      if (selectedInquiry?._id === inquiryToDelete._id) {
        setIsDetailOpen(false);
        setSelectedInquiry(null);
      }
      setActionSuccess("Inquiry deleted successfully.");
      setTimeout(() => setActionSuccess(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to delete inquiry");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Client Inquiries & Project Briefs
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Review incoming leads, scope requests, and project briefs submitted via the contact form.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors self-start sm:self-auto cursor-pointer"
        >
          ↻ Refresh List
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
          {actionSuccess}
        </div>
      )}

      {/* Filters & Search */}
      <div className="p-4 rounded-2xl bg-[#141414] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {["all", "new", "in_review", "contacted", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap",
                statusFilter === st
                  ? "bg-[#F1681D] text-white shadow-sm"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search name, email, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#F1681D]"
          />
        </div>
      </div>

      {/* Inquiries List Table */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden">
        {isLoading ? (
          <div className="p-16 text-center text-xs text-white/50">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-sm font-bold text-white mb-1">No Inquiries Found</p>
            <p className="text-xs text-white/40">
              There are no inquiries matching the selected filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-white/80">
              <thead className="bg-white/5 text-white/50 uppercase tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="p-4 pl-6">Client Name</th>
                  <th className="p-4">Service Interest</th>
                  <th className="p-4">Brief Snippet</th>
                  <th className="p-4">Attachment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.map((inq) => (
                  <tr
                    key={inq._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4 pl-6">
                      <p className="font-bold text-white">
                        {inq.firstName} {inq.lastName}
                      </p>
                      <p className="text-[11px] text-white/40">{inq.email}</p>
                      {inq.company && (
                        <p className="text-[10px] text-[#F1681D] font-semibold">
                          {inq.company}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-white/90">
                        {inq.serviceInterest || "General"}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="line-clamp-2 text-white/60 text-[11px]">
                        {inq.message}
                      </p>
                    </td>
                    <td className="p-4">
                      {inq.attachment ? (
                        <a
                          href={`${API_BASE_URL.replace('/api', '')}${inq.attachment.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors"
                        >
                          <span>📎 File</span>
                          <span className="text-[9px] text-white/50">
                            ({Math.round((inq.attachment.sizeBytes || 0) / 1024)}KB)
                          </span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-white/30">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={cn(
                          "text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider border outline-none cursor-pointer",
                          inq.status === "new" && "bg-[#F1681D]/20 text-[#F1681D] border-[#F1681D]/40",
                          inq.status === "in_review" && "bg-amber-500/20 text-amber-400 border-amber-500/40",
                          inq.status === "contacted" && "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
                          inq.status === "archived" && "bg-white/10 text-white/50 border-white/10"
                        )}
                      >
                        <option value="new" className="bg-[#141414] text-white">NEW</option>
                        <option value="in_review" className="bg-[#141414] text-white">IN REVIEW</option>
                        <option value="contacted" className="bg-[#141414] text-white">CONTACTED</option>
                        <option value="archived" className="bg-[#141414] text-white">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="p-4 text-[11px] text-white/40 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setIsDetailOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors cursor-pointer"
                        >
                          View Brief
                        </button>
                        <button
                          onClick={() => setInquiryToDelete(inq)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Manually Delete Inquiry"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Inquiry: ${selectedInquiry.firstName} ${selectedInquiry.lastName}`}
          subtitle={`Submitted on ${new Date(selectedInquiry.createdAt).toLocaleString()}`}
          size="lg"
        >
          <div className="flex flex-col gap-5">
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase">Email Address</p>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-xs font-semibold text-[#F1681D] hover:underline"
                >
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase">Company / Organization</p>
                <p className="text-xs font-semibold text-white">
                  {selectedInquiry.company || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase">Service of Interest</p>
                <p className="text-xs font-semibold text-white">
                  {selectedInquiry.serviceInterest}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase">Status</p>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry._id, e.target.value)}
                  className="mt-1 text-xs font-bold px-2 py-1 rounded bg-[#141414] border border-white/20 text-white outline-none"
                >
                  <option value="new">NEW</option>
                  <option value="in_review">IN REVIEW</option>
                  <option value="contacted">CONTACTED (Auto-deletes in 24h)</option>
                  <option value="archived">ARCHIVED</option>
                </select>
                {selectedInquiry.status === "contacted" && (
                  <p className="text-[10px] text-amber-400 font-semibold mt-1">
                    ⏳ Auto-deletes 24 hours after being marked contacted
                  </p>
                )}
              </div>
            </div>


            {/* Message Body */}
            <div>
              <p className="text-xs font-bold text-white/80 uppercase tracking-wide mb-2">
                Project Scope & Message
              </p>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Attachment */}
            {selectedInquiry.attachment && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Attached File / RFP Document</p>
                  <p className="text-[11px] text-white/50">
                    {selectedInquiry.attachment.originalName} •{" "}
                    {Math.round(selectedInquiry.attachment.sizeBytes / 1024)} KB
                  </p>
                </div>
                <a
                  href={
                    selectedInquiry.attachment.path?.startsWith("http")
                      ? selectedInquiry.attachment.path
                      : `${API_BASE_URL.replace("/api", "")}${selectedInquiry.attachment.path}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white transition-colors"
                >
                  Download File
                </a>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re:%20Zubyte%20Solution%20Inquiry%20-%20${encodeURIComponent(selectedInquiry.serviceInterest)}`}
                  className="px-5 py-2.5 rounded-xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white transition-colors"
                >
                  Reply via Email
                </a>
                <button
                  type="button"
                  onClick={() => setInquiryToDelete(selectedInquiry)}
                  className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors cursor-pointer border border-red-500/20"
                >
                  🗑️ Delete Inquiry
                </button>
              </div>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}


      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!inquiryToDelete}
        onClose={() => setInquiryToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Inquiry"
        message={`Are you sure you want to permanently delete the inquiry from ${inquiryToDelete?.firstName} ${inquiryToDelete?.lastName}?`}
        isLoading={isDeleting}
      />
    </div>
  );
}

