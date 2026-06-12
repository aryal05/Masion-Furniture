"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { fadeUp } from "@/components/motion/presets";

export function PhilosophySplit() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="overflow-hidden bg-walnut/5 py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image with parallax */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <motion.div style={{ y: imageY }} className="absolute inset-0">
              <Image
                src="/philosophy.jpg"
                alt="Craftsman working on walnut dining table"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight">
              Made to be lived with,
              <br />
              not just looked at.
            </h2>
            <div className="mt-8 space-y-4 text-muted">
              <p>
                Every piece of Maison furniture begins with sustainably sourced
                hardwoods — solid walnut and white oak that will develop a rich
                patina over decades of daily use.
              </p>
              <p>
                Our craftsmen in Nepal combine time-honored joinery techniques
                with modern precision, creating furniture that's built to last
                for generations.
              </p>
              <p>
                No particleboard. No veneer. No shortcuts. Just honest materials
                and thoughtful design.
              </p>
            </div>
            <a
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-label text-walnut"
            >
              Learn Our Story
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
