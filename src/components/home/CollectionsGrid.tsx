"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/components/motion/presets";

const COLLECTIONS = [
  {
    name: "Living Room",
    slug: "living-room",
    image: "/collections/living.jpg",
    description: "Sofas, armchairs & coffee tables",
    span: "col-span-2 row-span-2",
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    image: "/collections/bedroom.jpg",
    description: "Beds, nightstands & dressers",
    span: "col-span-1",
  },
  {
    name: "Dining",
    slug: "dining",
    image: "/collections/dining.jpg",
    description: "Tables, chairs & sideboards",
    span: "col-span-1",
  },
  {
    name: "Office",
    slug: "office",
    image: "/collections/office.jpg",
    description: "Desks, shelves & seating",
    span: "col-span-2",
  },
];

export function CollectionsGrid() {
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
          <p className="eyebrow">Explore</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Shop by Room</h2>
        </motion.header>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 md:grid-rows-2"
        >
          {COLLECTIONS.map((collection) => (
            <motion.div
              key={collection.slug}
              variants={fadeUp}
              className={`group relative ${collection.span}`}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="block h-full"
              >
                <div className="relative h-full min-h-[200px] overflow-hidden rounded-card md:min-h-[280px]">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-display text-xl text-ivory md:text-2xl">
                      {collection.name}
                    </h3>
                    <p className="mt-1 text-sm text-ivory/70">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
