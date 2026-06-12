"use client";
import { motion } from "framer-motion";

interface DataItem {
  label: string;
  value: number;
  color: string;
}

interface Props {
  data: DataItem[];
  total: number;
}

export function OrdersDonut({ data, total }: Props) {
  const size = 200;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
      <h3 className="font-display text-lg mb-6">Order Status</h3>

      <div className="flex items-center gap-8">
        {/* Donut chart */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            {data.map((item, i) => {
              const percentage = item.value / total;
              const strokeDasharray = `${percentage * circumference} ${circumference}`;
              const strokeDashoffset = -currentOffset * circumference;
              currentOffset += percentage;

              return (
                <motion.circle
                  key={item.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl">{total}</span>
            <span className="text-xs text-muted">Total Orders</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
