"use client";
import { motion } from "framer-motion";

interface DataPoint {
  label: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  height?: number;
}

export function RevenueChart({ data, height = 300 }: Props) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  // Generate SVG path for the line
  const pathD = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - minValue) / range) * 80 - 10;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Area path (for fill)
  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
      <h3 className="font-display text-lg mb-6">Revenue Overview</h3>

      <div className="relative" style={{ height }}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#3B2314"
              strokeOpacity="0.05"
              strokeWidth="0.5"
            />
          ))}

          {/* Area fill */}
          <motion.path
            d={areaD}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#3B2314"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Data points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((d.value - minValue) / range) * 80 - 10;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="1.5"
                fill="#3B2314"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              />
            );
          })}

          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B2314" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3B2314" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 -ml-12 flex flex-col justify-between text-xs text-muted">
          <span>NPR {(maxValue / 1000).toFixed(0)}K</span>
          <span>NPR {(minValue / 1000).toFixed(0)}K</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex justify-between text-xs text-muted">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
