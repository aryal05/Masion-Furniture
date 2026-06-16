import type { Metadata } from 'next';
import { categories } from '@/lib/data/categories';
import { styles } from '@/lib/data/styles';
import { products } from '@/lib/data/products';
import { CategoryHero } from '@/components/categories/CategoryHero';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { StyleScroller } from '@/components/categories/StyleScroller';

export const metadata: Metadata = {
  title: 'Browse Categories',
  description: 'Explore our furniture collections by category. From sofas and chairs to tables, bedroom sets, and decor — find the perfect piece for every room.',
  openGraph: {
    title: 'Browse Categories | Furniture',
    description: 'Explore our furniture collections by category.',
  },
};

// Pre-compute product counts per category
function getCategoryCounts() {
  const counts: Record<string, number> = {};
  products.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return counts;
}

export default function CategoriesPage() {
  const counts = getCategoryCounts();

  // Assign grid types: alternating large/small for visual variety
  const gridCategories = categories.map((cat, i) => ({
    ...cat,
    productCount: counts[cat.slug] || 0,
    // Type A (large) for indices 0, 3, 4, 7 — creates visual rhythm
    isLarge: i % 4 === 0 || i % 4 === 3,
  }));

  return (
    <>
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'Categories', item: '/categories' },
            ],
          }),
        }}
      />

      <CategoryHero />

      {/* Category Grid */}
      <section aria-labelledby="categories-grid" className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-12 lg:py-16">
        <h2 id="categories-grid" className="sr-only">All Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridCategories.map((cat, index) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isLarge={cat.isLarge}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Style Scroller */}
      <section aria-labelledby="shop-by-style" className="py-12 lg:py-16 bg-card">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <h2 id="shop-by-style" className="text-3xl lg:text-4xl font-black text-ink tracking-tight mb-8">
            Shop by Style
          </h2>
          <StyleScroller styles={styles} />
        </div>
      </section>
    </>
  );
}
