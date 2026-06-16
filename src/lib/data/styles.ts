import { Style } from '@/types';

export const styles: Style[] = [
  {
    id: 'style-001',
    name: 'Scandinavian',
    slug: 'scandinavian',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
    productCount: 156
  },
  {
    id: 'style-002',
    name: 'Mid-Century Modern',
    slug: 'mid-century-modern',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    productCount: 234
  },
  {
    id: 'style-003',
    name: 'Industrial',
    slug: 'industrial',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    productCount: 89
  },
  {
    id: 'style-004',
    name: 'Bohemian',
    slug: 'bohemian',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    productCount: 67
  },
  {
    id: 'style-005',
    name: 'Minimalist',
    slug: 'minimalist',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
    productCount: 198
  },
  {
    id: 'style-006',
    name: 'Contemporary',
    slug: 'contemporary',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    productCount: 312
  },
  {
    id: 'style-007',
    name: 'Rustic',
    slug: 'rustic',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
    productCount: 78
  },
  {
    id: 'style-008',
    name: 'Art Deco',
    slug: 'art-deco',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    productCount: 45
  }
];

// Helper function to get style by slug
export function getStyleBySlug(slug: string): Style | undefined {
  return styles.find(s => s.slug === slug);
}

// Helper function to get all styles
export function getAllStyles(): Style[] {
  return styles;
}
