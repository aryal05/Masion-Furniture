'use client';

import { m, useReducedMotion } from 'framer-motion';

const SUBJECTS = [
  'General Inquiry',
  'Order Issue',
  'Returns & Exchanges',
  'Product Information',
  'Partnership',
];

interface SubjectPillsProps {
  selected: string;
  onChange: (value: string) => void;
}

export function SubjectPills({ selected, onChange }: SubjectPillsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select a subject">
      {SUBJECTS.map((subject) => {
        const isSelected = selected === subject;
        return (
          <button
            key={subject}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(subject)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              isSelected
                ? 'bg-primary text-white border-primary'
                : 'bg-card text-body border-line hover:border-primary'
            }`}
          >
            {subject}
            {isSelected && !shouldReduceMotion && (
              <m.span
                className="inline-block ml-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                ✓
              </m.span>
            )}
          </button>
        );
      })}
    </div>
  );
}
