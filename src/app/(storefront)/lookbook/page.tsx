import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lookbook | Maison Furniture",
  description: "Explore our curated room inspirations featuring handcrafted furniture.",
};

const LOOKS = [
  {
    id: 1,
    title: "Minimal Living",
    image: "/lookbook/minimal-living.jpg",
    products: ["walnut-sofa", "oak-coffee-table", "brass-lamp"],
  },
  {
    id: 2,
    title: "Cozy Bedroom",
    image: "/lookbook/cozy-bedroom.jpg",
    products: ["platform-bed", "nightstand-duo", "linen-throw"],
  },
  {
    id: 3,
    title: "Modern Dining",
    image: "/lookbook/modern-dining.jpg",
    products: ["dining-table-8", "copenhagen-chairs", "pendant-light"],
  },
  {
    id: 4,
    title: "Home Office",
    image: "/lookbook/home-office.jpg",
    products: ["executive-desk", "ergonomic-chair", "floating-shelf"],
  },
];

export default function LookbookPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <header className="mb-12 text-center">
          <p className="eyebrow">Inspiration</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Lookbook</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted">
            Curated room settings featuring our handcrafted furniture. Click any
            look to shop the featured pieces.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {LOOKS.map((look, i) => (
            <Link
              key={look.id}
              href={`/shop?collection=lookbook-${look.id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-card"
            >
              <Image
                src={look.image}
                alt={look.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="font-display text-2xl text-ivory md:text-3xl">
                  {look.title}
                </h2>
                <p className="mt-2 text-sm text-ivory/70">
                  {look.products.length} featured pieces
                </p>
                <span className="mt-4 inline-block text-sm text-ivory underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
                  Shop this look →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
