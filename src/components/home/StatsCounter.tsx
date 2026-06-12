"use client";
import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { staggerContainer, fadeUp } from "@/components/motion/presets";

const STATS = [
  { value: 12, suffix: "+", label: "Years of craftsmanship" },
  { value: 5000, suffix: "+", label: "Pieces delivered" },
  { value: 98, suffix: "%", label: "Customer satisfaction" },
  { value: 25, suffix: "", label: "Master craftsmen" },
];

export function StatsCounter() {
  return (
    <section className="border-y border-walnut/10 bg-ivory py-20">
      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-10"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="text-center"
          >
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-muted uppercase tracking-label">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
