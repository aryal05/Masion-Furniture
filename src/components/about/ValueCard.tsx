'use client';

import { m, useReducedMotion } from 'framer-motion';
import { fadeUp, durations, easeOut } from '@/lib/motion';

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export function ValueCard({ icon, title, description, index }: ValueCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className="text-center p-6 rounded-2xl bg-card border border-line hover:shadow-lg transition-shadow"
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: durations.base,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: easeOut,
      }}
    >
      <span className="text-4xl block mb-4">{icon}</span>
      <h3 className="text-lg font-bold text-ink mb-2">{title}</h3>
      <p className="text-sm text-body leading-relaxed">{description}</p>
    </m.div>
  );
}
