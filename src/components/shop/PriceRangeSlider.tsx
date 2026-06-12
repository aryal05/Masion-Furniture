"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  min: number; max: number;
  valueMin: number; valueMax: number;
  onCommit: (min: number, max: number) => void;
}

export function PriceRangeSlider({ min, max, valueMin, valueMax, onCommit }: Props) {
  // Local state during drag — only sync URL on release (avoids 60 router pushes/sec)
  const [lo, setLo] = useState(valueMin);
  const [hi, setHi] = useState(valueMax);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setLo(valueMin); setHi(valueMax); }, [valueMin, valueMax]);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-4 flex justify-between text-sm">
        <span>NPR {lo.toLocaleString()}</span>
        <span>NPR {hi.toLocaleString()}{hi === max && "+"}</span>
      </div>

      <div ref={trackRef} className="relative h-1 rounded-full bg-walnut/10">
        <div
          className="absolute h-full rounded-full bg-walnut"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
        />
        {/* Two overlapping native range inputs — accessible & touch-friendly */}
        {([["min", lo, setLo], ["max", hi, setHi]] as const).map(([which, val, setter]) => (
          <input
            key={which}
            type="range" min={min} max={max} step={1000} value={val}
            aria-label={`${which === "min" ? "Minimum" : "Maximum"} price`}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (which === "min") setter(Math.min(v, hi - 1000));
              else setter(Math.max(v, lo + 1000));
            }}
            onPointerUp={() => onCommit(lo, hi)}
            onKeyUp={(e) => ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key) && onCommit(lo, hi)}
            className="price-thumb absolute inset-x-0 -top-1.5 h-4 w-full appearance-none bg-transparent pointer-events-none"
          />
        ))}
      </div>
    </div>
  );
}