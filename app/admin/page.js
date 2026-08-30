"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/admin/AuthProvider";
import { api } from "@/lib/api";
import StatsCard from "@/components/admin/StatsCard";

export default function AdminDashboardOverviewPage() {
  const { user, role } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const res = await api.admin.getStats();
      if (res.data) {
        setStats(res.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const metrics = stats?.metrics || {
    totalInquiries: 0,
    newInquiries: 0,
    totalDisciplines: 5,
    totalServices: 21,
    totalProductSuites: 4,
    totalProducts: 5,
    totalCaseStudies: 21,
    totalDemos: 0,
    totalSubscribers: 0,
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1b1b1b] to-[#141414] border border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F1681D]">
              Operational Overview
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs text-white/60 font-semibold">
              Role: <strong className="text-white uppercase">{role}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Welcome, {user?.name || "Administrator"}
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1 max-w-xl">
            Manage your service catalogs, enterprise product suites, STAR case studies, and live contact inquiries.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Link
            href="/admin/portfolio"
            className="px-4 py-2.5 rounded-2xl bg-[#F1681D] hover:bg-[#d95610] text-xs font-bold text-white transition-all shadow-md flex items-center gap-2"
          >
            <span>+ Add Case Study</span>
          </Link>
          <Link
            href="/admin/inquiries"
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors"
          >
            <span>View Inquiries</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Contact Inquiries"
          value={metrics.totalInquiries}
          subtitle={`${metrics.newInquiries} require review`}
          badge={metrics.newInquiries > 0 ? `${metrics.newInquiries} New` : "Updated"}
          badgeColor={metrics.newInquiries > 0 ? "orange" : "green"}
          color="#F1681D"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            </svg>
          }
        />
        <StatsCard
          title="Total Services"
          value={metrics.totalServices}
          subtitle={`Across ${metrics.totalDisciplines} core disciplines`}
          badge="Live"
          badgeColor="green"
          color="#10b981"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
            </svg>
          }
        />
        <StatsCard
          title="Product Suites"
          value={metrics.totalProductSuites}
          subtitle={`${metrics.totalProducts} active products`}
          badge="Enterprise"
          badgeColor="blue"
          color="#0ea5e9"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            </svg>
          }
        />
        <StatsCard
          title="STAR Case Studies"
          value={metrics.totalCaseStudies}
          subtitle="Client proof of work"
          badge="STAR"
          badgeColor="orange"
          color="#6366f1"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        />
      </div>

      {/* Two Column Layout: Recent Inquiries & Catalog Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 rounded-3xl bg-[#141414] border border-white/10 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-heading font-bold text-white">
                Recent Inquiries & RFP Briefs
              </h2>
              <p className="text-xs text-white/50">
                Latest client messages submitted from the public website
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-[#F1681D] hover:underline"
            >
              View All →
            </Link>
          </div>

          {isLoading ? (
            <div className="py-16 text-center text-xs text-white/50">Loading inquiries...</div>
          ) : stats?.recentInquiries?.length === 0 ? (
            <div className="py-12 text-center rounded-2xl bg-white/5 border border-white/5">
              <p className="text-xs text-white/60">No contact inquiries received yet.</p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {stats?.recentInquiries?.map((inq) => (
                <div
                  key={inq._id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {inq.firstName?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {inq.firstName} {inq.lastName}
                        {inq.company && (
                          <span className="text-white/40 font-normal ml-1">
                            • {inq.company}
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-white/50 line-clamp-1 max-w-md">
                        {inq.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        inq.status === "new"
                          ? "bg-[#F1681D]/20 text-[#F1681D]"
                          : inq.status === "in_review"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {inq.status}
                    </span>
                    <span className="text-[10px] text-white/40">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Disciplines & Product Distribution (1 Col) */}
        <div className="rounded-3xl bg-[#141414] border border-white/10 p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-base font-heading font-bold text-white mb-1">
              Discipline Catalog
            </h2>
            <p className="text-xs text-white/50 mb-4">
              5 Disciplines & 21 Service Offerings
            </p>

            <div className="space-y-2.5">
              {stats?.disciplines?.map((disc) => (
                <div
                  key={disc.name}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: disc.color || "#F1681D" }}
                    />
                    <span className="text-xs font-bold text-white">{disc.name}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {disc.count} services
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-white/80 uppercase tracking-wide mb-3">
              Cloudinary Integration Status
            </h3>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-emerald-400">Cloudinary Ready</p>
                <p className="text-[10px] text-emerald-300/70">
                  Ready for portfolio case study image uploads
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

