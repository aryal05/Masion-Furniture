import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-001',
    name: 'Chairs',
    slug: 'chairs',
    description: 'Comfortable seating for every room in your home',
    image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    parent_id: null,
    sort_order: 1
  },
  {
    id: 'cat-002',
    name: 'Sofas',
    slug: 'sofas',
    description: 'Luxurious sofas and sectionals for your living room',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    parent_id: null,
    sort_order: 2
  },
  {
    id: 'cat-003',
    name: 'Tables',
    slug: 'tables',
    description: 'Dining, coffee, and side tables for every occasion',
    image_url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
    parent_id: null,
    sort_order: 3
  },
  {
    id: 'cat-004',
    name: 'Dining',
    slug: 'dining',
    description: 'Complete dining sets and individual pieces',
    image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    parent_id: null,
    sort_order: 4
  },
  {
    id: 'cat-005',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Beds, nightstands, and bedroom furniture',
    image_url: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80',
    parent_id: null,
    sort_order: 5
  },
  {
    id: 'cat-006',
    name: 'Office',
    slug: 'office',
    description: 'Ergonomic desks and chairs for your home office',
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    parent_id: null,
    sort_order: 6
  },
  {
    id: 'cat-007',
    name: 'Storage',
    slug: 'storage',
    description: 'Bookshelves, cabinets, and storage solutions',
    image_url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
    parent_id: null,
    sort_order: 7
  },
  {
    id: 'cat-008',
    name: 'Lighting',
    slug: 'lighting',
    description: 'Pendant lights, floor lamps, and fixtures',
    image_url: 'https://images.unsplash.com/photo-1513506003011-3b03c801954b?w=800&q=80',
    parent_id: null,
    sort_order: 8
  },
  {
    id: 'cat-009',
    name: 'Decor',
    slug: 'decor',
    description: 'Mirrors, plant stands, and decorative accents',
    image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
    parent_id: null,
    sort_order: 9
  }
];

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

// Helper function to get all top-level categories
export function getTopLevelCategories(): Category[] {
  return categories.filter(c => c.parent_id === null).sort((a, b) => a.sort_order - b.sort_order);
}
