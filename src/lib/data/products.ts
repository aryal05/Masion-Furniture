import { Product } from '@/types';

// 24+ realistic seeded products with real furniture names and plausible prices
export const products: Product[] = [
  {
    id: 'prod-001',
    slug: 'nordic-lounge-chair',
    name: 'Nordic Lounge Chair',
    price: 349,
    compareAtPrice: 449,
    rating: 4.8,
    reviewCount: 127,
    category: 'chairs',
    material: 'wood',
    colors: [
      { name: 'Oak', hex: '#D4A574' },
      { name: 'Walnut', hex: '#5C4033' },
      { name: 'Black', hex: '#1A1A1A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'prod-002',
    slug: 'velvet-club-armchair',
    name: 'Velvet Club Armchair',
    price: 599,
    compareAtPrice: 799,
    rating: 4.9,
    reviewCount: 89,
    category: 'chairs',
    material: 'fabric',
    colors: [
      { name: 'Emerald', hex: '#2D4A2D' },
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Burgundy', hex: '#722F37' }
    ],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'prod-003',
    slug: 'scandinavian-dining-set',
    name: 'Scandinavian Dining Set',
    price: 1299,
    compareAtPrice: 1599,
    rating: 4.7,
    reviewCount: 156,
    category: 'dining',
    material: 'wood',
    colors: [
      { name: 'Oak', hex: '#D4A574' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 'prod-004',
    slug: 'mid-century-sofa',
    name: 'Mid-Century Modern Sofa',
    price: 1899,
    compareAtPrice: 2299,
    rating: 4.8,
    reviewCount: 234,
    category: 'sofas',
    material: 'fabric',
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Sage', hex: '#9DC183' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 'prod-005',
    slug: 'leather-sectional',
    name: 'Italian Leather Sectional',
    price: 3499,
    compareAtPrice: 4299,
    rating: 4.9,
    reviewCount: 78,
    category: 'sofas',
    material: 'leather',
    colors: [
      { name: 'Cognac', hex: '#9F381D' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'White', hex: '#F5F5F0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: 'prod-006',
    slug: 'glass-coffee-table',
    name: 'Tempered Glass Coffee Table',
    price: 449,
    compareAtPrice: 549,
    rating: 4.6,
    reviewCount: 145,
    category: 'tables',
    material: 'glass',
    colors: [
      { name: 'Clear', hex: '#E8E8E8' },
      { name: 'Bronze', hex: '#CD7F32' }
    ],
    images: [
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-01-25T00:00:00Z'
  },
  {
    id: 'prod-007',
    slug: 'marble-console-table',
    name: 'Carrara Marble Console Table',
    price: 899,
    compareAtPrice: 1199,
    rating: 4.8,
    reviewCount: 67,
    category: 'tables',
    material: 'marble',
    colors: [
      { name: 'White', hex: '#F5F5F0' },
      { name: 'Black', hex: '#1A1A1A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-02-05T00:00:00Z'
  },
  {
    id: 'prod-008',
    slug: 'platform-bed-frame',
    name: 'Walnut Platform Bed Frame',
    price: 799,
    compareAtPrice: 999,
    rating: 4.7,
    reviewCount: 198,
    category: 'bedroom',
    material: 'wood',
    colors: [
      { name: 'Walnut', hex: '#5C4033' },
      { name: 'Oak', hex: '#D4A574' }
    ],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-30T00:00:00Z'
  },
  {
    id: 'prod-009',
    slug: 'upholstered-headboard',
    name: 'Tufted Upholstered Headboard',
    price: 449,
    compareAtPrice: 599,
    rating: 4.6,
    reviewCount: 112,
    category: 'bedroom',
    material: 'fabric',
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Blush', hex: '#DE5D83' }
    ],
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-02-10T00:00:00Z'
  },
  {
    id: 'prod-010',
    slug: 'standing-desk',
    name: 'Electric Standing Desk',
    price: 699,
    compareAtPrice: 899,
    rating: 4.8,
    reviewCount: 287,
    category: 'office',
    material: 'metal',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Oak', hex: '#D4A574' }
    ],
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-18T00:00:00Z'
  },
  {
    id: 'prod-011',
    slug: 'ergonomic-office-chair',
    name: 'Ergonomic Mesh Office Chair',
    price: 449,
    compareAtPrice: 599,
    rating: 4.7,
    reviewCount: 342,
    category: 'office',
    material: 'metal',
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Gray', hex: '#808080' }
    ],
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-02-08T00:00:00Z'
  },
  {
    id: 'prod-012',
    slug: 'bookshelf-unit',
    name: 'Modular Bookshelf Unit',
    price: 549,
    compareAtPrice: 699,
    rating: 4.5,
    reviewCount: 178,
    category: 'storage',
    material: 'wood',
    colors: [
      { name: 'Oak', hex: '#D4A574' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1A1A1A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-22T00:00:00Z'
  },
  {
    id: 'prod-013',
    slug: 'rattan-armchair',
    name: 'Natural Rattan Armchair',
    price: 399,
    compareAtPrice: 499,
    rating: 4.6,
    reviewCount: 94,
    category: 'chairs',
    material: 'rattan',
    colors: [
      { name: 'Natural', hex: '#D4A574' },
      { name: 'White Wash', hex: '#F5F5F0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-02-12T00:00:00Z'
  },
  {
    id: 'prod-014',
    slug: 'acrylic-side-table',
    name: 'Lucite Acrylic Side Table',
    price: 299,
    compareAtPrice: 399,
    rating: 4.4,
    reviewCount: 67,
    category: 'tables',
    material: 'acrylic',
    colors: [
      { name: 'Clear', hex: '#E8E8E8' }
    ],
    images: [
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-02-18T00:00:00Z'
  },
  {
    id: 'prod-015',
    slug: 'pendant-light',
    name: 'Brass Pendant Light',
    price: 249,
    compareAtPrice: 329,
    rating: 4.7,
    reviewCount: 156,
    category: 'lighting',
    material: 'metal',
    colors: [
      { name: 'Brass', hex: '#D4A017' },
      { name: 'Chrome', hex: '#C0C0C0' },
      { name: 'Matte Black', hex: '#1A1A1A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1513506003011-3b03c801954b?w=800&q=80',
      'https://images.unsplash.com/photo-1540932296774-3ed6910f4a8a?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-01-28T00:00:00Z'
  },
  {
    id: 'prod-016',
    slug: 'floor-lamp',
    name: 'Arc Floor Lamp',
    price: 349,
    compareAtPrice: 449,
    rating: 4.8,
    reviewCount: 203,
    category: 'lighting',
    material: 'metal',
    colors: [
      { name: 'Brass', hex: '#D4A017' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1540932296774-3ed6910f4a8a?w=800&q=80',
      'https://images.unsplash.com/photo-1513506003011-3b03c801954b?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-02-02T00:00:00Z'
  },
  {
    id: 'prod-017',
    slug: 'accent-cabinet',
    name: 'Mid-Century Accent Cabinet',
    price: 699,
    compareAtPrice: 899,
    rating: 4.6,
    reviewCount: 89,
    category: 'storage',
    material: 'wood',
    colors: [
      { name: 'Walnut', hex: '#5C4033' },
      { name: 'Teal', hex: '#008080' }
    ],
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-12T00:00:00Z'
  },
  {
    id: 'prod-018',
    slug: 'bar-stool-set',
    name: 'Industrial Bar Stool Set',
    price: 399,
    compareAtPrice: 499,
    rating: 4.5,
    reviewCount: 134,
    category: 'chairs',
    material: 'metal',
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Copper', hex: '#B87333' }
    ],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-02-20T00:00:00Z'
  },
  {
    id: 'prod-019',
    slug: 'media-console',
    name: 'Low Profile Media Console',
    price: 899,
    compareAtPrice: 1099,
    rating: 4.7,
    reviewCount: 167,
    category: 'storage',
    material: 'wood',
    colors: [
      { name: 'Oak', hex: '#D4A574' },
      { name: 'Walnut', hex: '#5C4033' }
    ],
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-08T00:00:00Z'
  },
  {
    id: 'prod-020',
    slug: 'wingback-chair',
    name: 'Classic Wingback Chair',
    price: 799,
    compareAtPrice: 999,
    rating: 4.8,
    reviewCount: 98,
    category: 'chairs',
    material: 'fabric',
    colors: [
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Burgundy', hex: '#722F37' },
      { name: 'Forest Green', hex: '#2D4A2D' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-02-14T00:00:00Z'
  },
  {
    id: 'prod-021',
    slug: 'round-dining-table',
    name: 'Pedestal Round Dining Table',
    price: 1099,
    compareAtPrice: 1399,
    rating: 4.9,
    reviewCount: 145,
    category: 'dining',
    material: 'wood',
    colors: [
      { name: 'Oak', hex: '#D4A574' },
      { name: 'Walnut', hex: '#5C4033' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'prod-022',
    slug: 'ottoman-bench',
    name: 'Tufted Storage Ottoman',
    price: 349,
    compareAtPrice: 449,
    rating: 4.5,
    reviewCount: 112,
    category: 'sofas',
    material: 'fabric',
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Cream', hex: '#FFFDD0' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-02-16T00:00:00Z'
  },
  {
    id: 'prod-023',
    slug: 'vanity-mirror',
    name: 'Arched Vanity Mirror',
    price: 299,
    compareAtPrice: 399,
    rating: 4.6,
    reviewCount: 78,
    category: 'decor',
    material: 'metal',
    colors: [
      { name: 'Gold', hex: '#D4A017' },
      { name: 'Black', hex: '#1A1A1A' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-02-04T00:00:00Z'
  },
  {
    id: 'prod-024',
    slug: 'plant-stand',
    name: 'Mid-Century Plant Stand',
    price: 149,
    compareAtPrice: 199,
    rating: 4.4,
    reviewCount: 56,
    category: 'decor',
    material: 'wood',
    colors: [
      { name: 'Oak', hex: '#D4A574' },
      { name: 'Walnut', hex: '#5C4033' }
    ],
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: false,
    createdAt: '2024-02-22T00:00:00Z'
  },
  {
    id: 'prod-025',
    slug: 'recliner-sofa',
    name: 'Power Recliner Sofa',
    price: 2499,
    compareAtPrice: 2999,
    rating: 4.8,
    reviewCount: 134,
    category: 'sofas',
    material: 'leather',
    colors: [
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Brown', hex: '#8B4513' }
    ],
    images: [
      'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 'prod-026',
    slug: 'nightstand-set',
    name: 'Matching Nightstand Set',
    price: 449,
    compareAtPrice: 549,
    rating: 4.7,
    reviewCount: 189,
    category: 'bedroom',
    material: 'wood',
    colors: [
      { name: 'Oak', hex: '#D4A574' },
      { name: 'Walnut', hex: '#5C4033' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
    ],
    inStock: true,
    isOnSale: true,
    freeShipping: true,
    createdAt: '2024-02-06T00:00:00Z'
  }
];

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

// Helper function to get featured products (on sale + high rating)
export function getFeaturedProducts(limit = 8): Product[] {
  return products
    .filter(p => p.isOnSale && p.rating >= 4.7)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Helper function to get new products (most recent)
export function getNewProducts(limit = 8): Product[] {
  return products
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

// Helper function to get bestsellers (highest review count)
export function getBestsellers(limit = 8): Product[] {
  return products
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}
