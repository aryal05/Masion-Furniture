"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeUp } from "@/components/motion/presets";

const UGC_IMAGES = [
  { src: "/ugc/1.jpg", handle: "@minimalist.home" },
  { src: "/ugc/2.jpg", handle: "@nepal.interiors" },
  { src: "/ugc/3.jpg", handle: "@cozy.ktm" },
  { src: "/ugc/4.jpg", handle: "@furniture.love" },
  { src: "/ugc/5.jpg", handle: "@home.style.np" },
  { src: "/ugc/6.jpg", handle: "@modern.living" },
];

export function UgcGallery() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="eyebrow">@MaisonFurniture</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            In Your Homes
          </h2>
          <p className="mt-4 text-muted">
            Tag us on Instagram for a chance to be featured
          </p>
        </motion.header>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
        >
          {UGC_IMAGES.map((img, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/maisonfurniture"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="group relative aspect-square overflow-hidden rounded-card"
            >
              <Image
                src={img.src}
                alt={`Customer photo by ${img.handle}`}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/60 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm text-ivory">{img.handle}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
