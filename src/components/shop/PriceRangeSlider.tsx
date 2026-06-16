"use client";
import { useEffect, useRef, useState } from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onCommit: (min: number, max: number) => void;
}

export function PriceRangeSlider({ min, max, valueMin, valueMax, onCommit }: PriceRangeSliderProps) {
  // Local state during drag — only sync URL on release (avoids 60 router pushes/sec)
  const [lo, setLo] = useState(valueMin);
  const [hi, setHi] = useState(valueMax);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setLo(valueMin); setHi(valueMax); }, [valueMin, valueMax]);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-4 flex justify-between text-sm text-body">
        <span>${lo.toLocaleString()}</span>
        <span>${hi.toLocaleString()}{hi === max && "+"}</span>
      </div>

      <div ref={trackRef} className="relative h-2 rounded-full bg-line">
        <div
          className="absolute h-full rounded-full bg-primary"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
        />
        {/* Two overlapping native range inputs — accessible & touch-friendly */}
        {([["min", lo, setLo], ["max", hi, setHi]] as const).map(([which, val, setter]) => (
          <input
            key={which}
            type="range" min={min} max={max} step={50} value={val}
            aria-label={`${which === "min" ? "Minimum" : "Maximum"} price`}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (which === "min") setter(Math.min(v, hi - 50));
              else setter(Math.max(v, lo + 50));
            }}
            onPointerUp={() => onCommit(lo, hi)}
            onKeyUp={(e) => ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key) && onCommit(lo, hi)}
            className="price-thumb absolute inset-x-0 -top-1.5 h-4 w-full appearance-none bg-transparent pointer-events-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}