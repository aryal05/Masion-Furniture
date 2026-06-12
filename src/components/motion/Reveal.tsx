"use client";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./presets";

interface Props {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
}: Props) {
  const reduced = useReducedMotion();

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  const initial = reduced
    ? { opacity: 0 }
    : { opacity: 0, ...directionMap[direction] };

  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
