"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { api } from "@/lib/api";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { cn } from "@/lib/utils";

export default function AdminDemosPage() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("demos");
  const [demos, setDemos] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [demoToDelete, setDemoToDelete] = useState(null);
  const [subToDelete, setSubToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [demosRes, subsRes] = await Promise.all([
        api.demos.getAll().catch(() => ({ data: [] })),
        api.demos.getSubscribers().catch(() => ({ data: [] })),
      ]);
      setDemos(demosRes.data || []);
      setSubscribers(subsRes.data || []);
    } catch (err) {
      console.error("Failed to load demos/subscribers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDemoStatus = async (id, status) => {
    try {
      await api.demos.updateStatus(id, { status });
      setDemos((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status } : d))
      );
      setMessage("Demo status updated.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to update demo");
    }
  };

  const handleDeleteDemo = async () => {
    if (!demoToDelete) return;
    setIsDeleting(true);
    try {
      await api.demos.delete(demoToDelete._id);
      setDemos((prev) => prev.filter((d) => d._id !== demoToDelete._id));
      setDemoToDelete(null);
      setMessage("Demo request deleted.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to delete demo");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteSubscriber = async () => {
    if (!subToDelete) return;
    setIsDeleting(true);
    try {
      await api.demos.deleteSubscriber(subToDelete._id);
      setSubscribers((prev) => prev.filter((s) => s._id !== subToDelete._id));
      setSubToDelete(null);
      setMessage("Subscriber removed.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to remove subscriber");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Demos & Newsletter Subscriptions
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Track enterprise product demo bookings and tech update subscribers.
          </p>
        </div>

        <button
          onClick={fetchData}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer self-start sm:self-auto"
        >
          ↻ Refresh
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
          {message}
        </div>
      )}

      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("demos")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            activeTab === "demos"
              ? "bg-[#F1681D] text-white shadow-sm"
              : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
          )}
        >
          Product Demo Requests ({demos.length})
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer",
            activeTab === "subscribers"
              ? "bg-[#F1681D] text-white shadow-sm"
              : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
          )}
        >
          Newsletter Subscribers ({subscribers.length})
        </button>
      </div>

      {isLoading ? (
        <div className="p-16 text-center text-xs text-white/50">Loading data...</div>
      ) : activeTab === "demos" ? (
        <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden">
          {demos.length === 0 ? (
            <div className="p-16 text-center text-xs text-white/40">
              No product demo requests booked yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-white/80">
                <thead className="bg-white/5 text-white/50 uppercase tracking-wider text-[10px] border-b border-white/10">
                  <tr>
                    <th className="p-4 pl-6">Contact Name</th>
                    <th className="p-4">Product Suite</th>
                    <th className="p-4">Team Size</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {demos.map((d) => (
                    <tr key={d._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6">
                        <p className="font-bold text-white">{d.name}</p>
                        <p className="text-[11px] text-white/40">{d.email}</p>
                        {d.company && (
                          <p className="text-[10px] text-[#F1681D] font-semibold">
                            {d.company}
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-white text-[11px]">
                          {d.productSuite}
                        </span>
                      </td>
                      <td className="p-4 text-[11px] text-white/60">{d.teamSize} seats</td>
                      <td className="p-4 max-w-xs text-[11px] text-white/50 line-clamp-1">
                        {d.notes || "—"}
                      </td>
                      <td className="p-4">
                        <select
                          value={d.status}
                          onChange={(e) => handleDemoStatus(d._id, e.target.value)}
                          className={cn(
                            "text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider border outline-none cursor-pointer",
                            d.status === "pending" && "bg-amber-500/20 text-amber-400 border-amber-500/40",
                            d.status === "scheduled" && "bg-sky-500/20 text-sky-400 border-sky-500/40",
                            d.status === "completed" && "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
                            d.status === "cancelled" && "bg-white/10 text-white/40 border-white/10"
                          )}
                        >
                          <option value="pending" className="bg-[#141414] text-white">PENDING</option>
                          <option value="scheduled" className="bg-[#141414] text-white">SCHEDULED</option>
                          <option value="completed" className="bg-[#141414] text-white">COMPLETED</option>
                          <option value="cancelled" className="bg-[#141414] text-white">CANCELLED</option>
                        </select>
                      </td>
                      <td className="p-4 text-[11px] text-white/40 whitespace-nowrap">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        {isAdmin && (
                          <button
                            onClick={() => setDemoToDelete(d)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Delete Demo"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden">
          {subscribers.length === 0 ? (
            <div className="p-16 text-center text-xs text-white/40">
              No newsletter subscribers registered yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-white/80">
                <thead className="bg-white/5 text-white/50 uppercase tracking-wider text-[10px] border-b border-white/10">
                  <tr>
                    <th className="p-4 pl-6">Subscriber Email</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Joined Date</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {subscribers.map((s) => (
                    <tr key={s._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 font-bold text-white">{s.email}</td>
                      <td className="p-4 text-[11px] text-white/50">{s.source || "website_footer"}</td>
                      <td className="p-4 text-[11px] text-white/40">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        {isAdmin && (
                          <button
                            onClick={() => setSubToDelete(s)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Remove Subscriber"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!demoToDelete}
        onClose={() => setDemoToDelete(null)}
        onConfirm={handleDeleteDemo}
        title="Delete Demo Request"
        message={`Delete demo request from ${demoToDelete?.name}?`}
        isLoading={isDeleting}
      />

      <ConfirmDialog
        isOpen={!!subToDelete}
        onClose={() => setSubToDelete(null)}
        onConfirm={handleDeleteSubscriber}
        title="Remove Subscriber"
        message={`Remove ${subToDelete?.email} from newsletter subscribers?`}
        isLoading={isDeleting}
      />
    </div>
  );
}

