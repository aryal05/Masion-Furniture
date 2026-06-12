"use client";
import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) > threshold) {
        setDirection(diff > 0 ? "down" : "up");
        lastScrollY = currentScrollY;
      }

      setScrollY(currentScrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrollY, isAtTop: scrollY < 50 };
}
