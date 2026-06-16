'use client';

import { useState, useCallback } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { accordionContent, durations, easeOut } from '@/lib/motion';
import type { FAQ } from '@/types';

interface FaqAccordionProps {
  faqs: FAQ[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = useCallback((id: string) => {
    setOpenId(prev => prev === id ? null : id);
  }, []);

  return (
    <div className="divide-y divide-line">
      {faqs.map((faq, index) => {
        const isOpen = openId === faq.id;
        return (
          <m.div
            key={faq.id}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: durations.fast,
              delay: shouldReduceMotion ? 0 : index * 0.04,
              ease: easeOut,
            }}
          >
            <button
              onClick={() => toggle(faq.id)}
              className="w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded-lg"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq.id}`}
              id={`faq-question-${faq.id}`}
            >
              <span className="text-sm sm:text-base font-semibold text-ink pr-4">{faq.question}</span>
              <m.span
                className="shrink-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center text-primary"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: durations.fast }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </m.span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <m.div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: durations.base }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-body leading-relaxed pb-5 pr-10">
                    {faq.answer}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        );
      })}
    </div>
  );
}
