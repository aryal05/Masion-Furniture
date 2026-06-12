"use client";
import { motion } from "framer-motion";

interface Props {
  size?: number;
}

export function AnimatedCheckmark({ size = 120 }: Props) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      initial="hidden"
      animate="visible"
      className="text-sage"
    >
      {/* Circle */}
      <motion.circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />

      {/* Checkmark */}
      <motion.path
        d="M38 62 L52 76 L82 46"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />

      {/* Celebration particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = 60 + Math.cos(angle) * 70;
        const y = 60 + Math.sin(angle) * 70;

        return (
          <motion.circle
            key={i}
            cx={60}
            cy={60}
            r="3"
            fill="#C9933A"
            variants={{
              hidden: { x: 0, y: 0, opacity: 0 },
              visible: {
                x: x - 60,
                y: y - 60,
                opacity: [0, 1, 0],
                transition: { delay: 0.8 + i * 0.05, duration: 0.6 },
              },
            }}
          />
        );
      })}
    </motion.svg>
  );
}
