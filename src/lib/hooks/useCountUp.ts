'use client';

import { useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

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
  const rounded = useTransform(count, (latest) => {
    return decimals === 0 ? Math.round(latest) : latest.toFixed(decimals);
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

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

  return { ref, value: rounded };
}
