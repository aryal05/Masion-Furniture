import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'how-to-choose-the-perfect-sofa',
    title: 'How to Choose the Perfect Sofa for Your Living Room',
    excerpt: 'Finding the right sofa is about more than just style. Learn about frame construction, cushion fill, fabric durability, and the dimensions that actually work for your space.',
    content: '',
    category: 'interior-design',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    author: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    readTime: 8,
    publishedAt: '2024-12-10T00:00:00Z',
    isFeatured: true
  },
  {
    id: 'blog-002',
    slug: 'sustainable-wood-sourcing',
    title: 'From Forest to Furniture: Our Sustainable Wood Sourcing Journey',
    excerpt: 'Every piece of wood tells a story. We trace our supply chain from FSC-certified forests to your living room, ensuring zero deforestation and fair labor at every step.',
    content: '',
    category: 'sustainability',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
    author: { name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80' },
    readTime: 6,
    publishedAt: '2024-11-28T00:00:00Z',
    isFeatured: false
  },
  {
    id: 'blog-003',
    slug: '2025-furniture-trends',
    title: '2025 Furniture Trends: Curves, Warmth, and Quiet Luxury',
    excerpt: 'Rounded silhouettes, warm-toned woods, and understated elegance define the year ahead. Here are the trends reshaping modern interiors.',
    content: '',
    category: 'trends',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
    author: { name: 'Marcus Williams', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    readTime: 5,
    publishedAt: '2024-11-15T00:00:00Z',
    isFeatured: false
  },
  {
    id: 'blog-004',
    slug: 'caring-for-leather-furniture',
    title: 'The Complete Guide to Caring for Leather Furniture',
    excerpt: 'Leather develops a beautiful patina over time — but only with proper care. Learn conditioning schedules, stain removal, and the products that actually work.',
    content: '',
    category: 'care-tips',
    image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800&q=80',
    author: { name: 'James Morrison', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80' },
    readTime: 7,
    publishedAt: '2024-11-01T00:00:00Z',
    isFeatured: false
  },
  {
    id: 'blog-005',
    slug: 'small-space-furniture-solutions',
    title: '10 Furniture Solutions for Small Apartments Under 500 sq ft',
    excerpt: 'Limited square footage demands smart furniture. Discover multi-functional pieces, vertical storage hacks, and layout tricks from our design team.',
    content: '',
    category: 'interior-design',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    author: { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    readTime: 9,
    publishedAt: '2024-10-20T00:00:00Z',
    isFeatured: false
  },
  {
    id: 'blog-006',
    slug: 'mixing-wood-tones',
    title: 'The Art of Mixing Wood Tones Without Clashing',
    excerpt: 'Oak, walnut, teak — they can all coexist beautifully. Learn the undertone rules, the 60/30/10 ratio, and why contrast is your best friend.',
    content: '',
    category: 'trends',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
    author: { name: 'Marcus Williams', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    readTime: 6,
    publishedAt: '2024-10-05T00:00:00Z',
    isFeatured: false
  },
  {
    id: 'blog-007',
    slug: 'fabric-upholstery-guide',
    title: 'Upholstery Fabrics Decoded: Performance vs. Natural Fibers',
    excerpt: 'Choosing between linen, velvet, and performance fabrics? We break down durability ratings, cleaning ease, and which fabric suits your lifestyle.',
    content: '',
    category: 'care-tips',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    author: { name: 'Aisha Patel', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80' },
    readTime: 7,
    publishedAt: '2024-09-18T00:00:00Z',
    isFeatured: false
  },
  {
    id: 'blog-008',
    slug: 'carbon-neutral-furniture',
    title: 'Our Path to Carbon Neutral: What It Means for Your Purchase',
    excerpt: 'In 2023 we achieved carbon-neutral operations. Here is what that means in practice — from renewable energy in workshops to last-mile delivery offsets.',
    content: '',
    category: 'sustainability',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    author: { name: 'Elena Rodriguez', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80' },
    readTime: 5,
    publishedAt: '2024-09-02T00:00:00Z',
    isFeatured: false
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find(p => p.isFeatured);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter(p => p.category === category);
}
