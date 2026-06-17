'use client';

import { useReducedMotion } from 'framer-motion';
import { useCountUp } from '@/lib/hooks/useCountUp';

interface StatsCounterProps {
  value: number;
  suffix: string;
  label: string;
}

export function StatsCounter({ value, suffix, label }: StatsCounterProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, value: animatedValue } = useCountUp(value, { duration: 2 });

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight">
        <span>{animatedValue}</span>
        <span className="text-gold">{suffix}</span>
      </div>
      <p className="text-sm text-muted mt-2 font-medium">{label}</p>
    </div>
  );
}
