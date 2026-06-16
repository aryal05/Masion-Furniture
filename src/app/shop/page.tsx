import type { Metadata } from 'next';
import { ShopClient } from '@/components/shop/ShopClient';

export const metadata: Metadata = {
  title: 'Shop Premium Furniture',
  description: 'Browse our curated collection of handcrafted furniture. Filter by category, material, price range, and more. Free shipping on select items.',
  openGraph: {
    title: 'Shop Premium Furniture | Furniture',
    description: 'Browse our curated collection of handcrafted furniture.',
  },
};

export default function ShopPage() {
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
              { '@type': 'ListItem', position: 2, name: 'Shop', item: '/shop' },
            ],
          }),
        }}
      />
      <ShopClient />
    </>
  );
}
