'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { durations, easeOut } from '@/lib/motion';
import type { Milestone } from '@/types';

interface TimelineProps {
  milestones: Milestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // The timeline line fills as the user scrolls through the section
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto">
      {/* Timeline line */}
      <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-line lg:-translate-x-px">
        {!shouldReduceMotion && (
          <m.div
            className="absolute top-0 left-0 right-0 bg-primary origin-top"
            style={{ scaleY, height: '100%' }}
          />
        )}
      </div>

      {/* Milestone items */}
      <div className="space-y-12 lg:space-y-16">
        {milestones.map((milestone, index) => {
          const isLeft = index % 2 === 0;
          return (
            <m.div
              key={milestone.id}
              className={`relative flex items-start gap-8 ${
                isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: durations.base,
                delay: shouldReduceMotion ? 0 : 0.1,
                ease: easeOut,
              }}
            >
              {/* Dot */}
              <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-[5px] lg:-translate-x-[5px] mt-2 ring-4 ring-card z-10" />

              {/* Content */}
              <div className={`ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-2">
                  {milestone.year}
                </span>
                <h3 className="text-lg font-bold text-ink">{milestone.title}</h3>
                <p className="text-sm text-body mt-1 leading-relaxed">{milestone.description}</p>
              </div>

              {/* Spacer for the other side on desktop */}
              <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
