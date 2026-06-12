"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MegaMenuProps {
  activeMenu: string;
  onClose: () => void;
}

const SHOP_CATEGORIES = [
  { name: "Living Room", slug: "living-room", image: "/categories/living.jpg" },
  { name: "Bedroom", slug: "bedroom", image: "/categories/bedroom.jpg" },
  { name: "Dining", slug: "dining", image: "/categories/dining.jpg" },
  { name: "Office", slug: "office", image: "/categories/office.jpg" },
  { name: "Outdoor", slug: "outdoor", image: "/categories/outdoor.jpg" },
];

const COLLECTIONS = [
  { name: "New Arrivals", slug: "new-arrivals", description: "Fresh designs for 2025" },
  { name: "Bestsellers", slug: "bestsellers", description: "Customer favorites" },
  { name: "Sale", slug: "sale", description: "Up to 40% off" },
  { name: "Minimal Living", slug: "minimal", description: "Clean, modern aesthetics" },
];

export function MegaMenu({ activeMenu, onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-full bg-ivory shadow-warm-lg"
    >
      <div className="mx-auto max-w-[1440px] px-10 py-10">
        {activeMenu === "Shop" && (
          <div className="grid grid-cols-5 gap-6">
            {SHOP_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                onClick={onClose}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-card">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-display text-lg text-ivory">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeMenu === "Collections" && (
          <div className="grid grid-cols-4 gap-8">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                onClick={onClose}
                className="group rounded-card border border-walnut/10 bg-white p-6 transition-all hover:border-walnut hover:shadow-warm"
              >
                <h3 className="font-display text-xl">{col.name}</h3>
                <p className="mt-2 text-sm text-muted">{col.description}</p>
                <span className="mt-4 inline-block text-sm text-walnut underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Featured promo */}
        <div className="mt-8 flex items-center justify-between rounded-card bg-walnut/5 px-8 py-6">
          <div>
            <p className="eyebrow !text-brass">Limited Time</p>
            <p className="mt-1 font-display text-xl">Free delivery on orders over NPR 50,000</p>
          </div>
          <Link
            href="/shop"
            onClick={onClose}
            className="rounded-btn bg-walnut px-6 py-3 text-sm uppercase tracking-label text-ivory transition-transform hover:-translate-y-0.5"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
