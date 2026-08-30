import React from "react";
import { cn } from "@/lib/utils";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  badge,
  badgeColor = "orange",
  color = "#F1681D",
}) {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#141414] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-xs font-bold text-white/50 tracking-wider uppercase">
          {title}
        </span>
        {icon && (
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-sm"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3">
        <span className="font-heading font-bold text-2xl sm:text-3xl text-white">
          {value}
        </span>
        {badge && (
          <span
            className={cn(
              "text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider",
              badgeColor === "orange" && "bg-[#F1681D]/20 text-[#F1681D]",
              badgeColor === "green" && "bg-emerald-500/20 text-emerald-400",
              badgeColor === "blue" && "bg-sky-500/20 text-sky-400"
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-white/40 mt-2">{subtitle}</p>}
    </div>
  );
}

