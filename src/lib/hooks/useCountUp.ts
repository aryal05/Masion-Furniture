'use client';

import { useMotionValue, useTransform, animate, useInView, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  duration?: number;
  start?: number;
  decimals?: number;
}

export function useCountUp(
  end: number,
  options: UseCountUpOptions = {}
) {
  const { duration = 2, start = 0, decimals = 0 } = options;
  const count = useMotionValue(start);
  const [displayValue, setDisplayValue] = useState(
    decimals === 0 ? Math.round(start).toString() : start.toFixed(decimals)
  );
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useMotionValueEvent(count, 'change', (latest) => {
    const formatted = decimals === 0 ? Math.round(latest).toString() : latest.toFixed(decimals);
    setDisplayValue(formatted);
  });

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const controls = animate(count, end, {
        duration,
        ease: [0.16, 1, 0.3, 1]
      });
      return controls.stop;
    }
  }, [isInView, end, duration, count]);

  return { ref, value: displayValue };
}
