"use client";
import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  trend?: "up" | "down" | "neutral";
}

export function KpiCard({ title, value, change, icon, trend = "neutral" }: Props) {
  const trendColors = {
    up: "text-sage",
    down: "text-rose",
    neutral: "text-muted",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    neutral: "→",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <p className="mt-2 font-display text-3xl">{value}</p>
          {change !== undefined && (
            <p className={`mt-2 flex items-center gap-1 text-sm ${trendColors[trend]}`}>
              <span>{trendIcons[trend]}</span>
              <span>{Math.abs(change)}%</span>
              <span className="text-muted">vs last month</span>
            </p>
          )}
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-walnut/5 text-2xl">
          {icon}
        </span>
      </div>
    </motion.div>
  );
}
