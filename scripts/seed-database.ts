/**
 * Seed script to populate Supabase database with initial data
 * Run with: npx tsx scripts/seed-database.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ============================================
// CATEGORIES DATA
// ============================================
const categories = [
  { name: 'Chairs', slug: 'chairs', description: 'Comfortable seating for every room', image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80', sort_order: 1 },
  { name: 'Sofas', slug: 'sofas', description: 'Luxurious sofas and sectionals', image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', sort_order: 2 },
  { name: 'Tables', slug: 'tables', description: 'Dining, coffee, and side tables', image_url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80', sort_order: 3 },
  { name: 'Dining', slug: 'dining', description: 'Complete dining sets', image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80', sort_order: 4 },
  { name: 'Bedroom', slug: 'bedroom', description: 'Beds and bedroom furniture', image_url: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80', sort_order: 5 },
  { name: 'Office', slug: 'office', description: 'Home office furniture', image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80', sort_order: 6 },
  { name: 'Storage', slug: 'storage', description: 'Bookshelves and cabinets', image_url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80', sort_order: 7 },
  { name: 'Lighting', slug: 'lighting', description: 'Pendant lights and lamps', image_url: 'https://images.unsplash.com/photo-1513506003011-3b03c801954b?w=800&q=80', sort_order: 8 },
  { name: 'Decor', slug: 'decor', description: 'Decorative accents', image_url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80', sort_order: 9 },
];

// ============================================
// PRODUCTS DATA
// ============================================
const products = [
  {
    slug: 'nordic-lounge-chair',
    name: 'Nordic Lounge Chair',
    description: 'A beautifully crafted lounge chair inspired by Scandinavian design. Features clean lines, natural wood frame, and premium cushioning for ultimate comfort. Perfect for reading nooks or living room corners.',
    material: 'wood',
    price: 349,
    compare_at_price: 449,
    is_bestseller: true,
    is_new: false,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.8,
    review_count: 127,
    total_stock: 45,
    status: 'published',
    category_slug: 'chairs',
    dimensions: '75cm W x 80cm D x 85cm H',
    care_instructions: 'Wipe with damp cloth. Avoid direct sunlight.',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    ],
    colors: [
      { name: 'Oak', hex_code: '#D4A574' },
      { name: 'Walnut', hex_code: '#5C4033' },
      { name: 'Black', hex_code: '#1A1A1A' }
    ]
  },
  {
    slug: 'velvet-club-armchair',
    name: 'Velvet Club Armchair',
    description: 'Luxurious velvet armchair with deep button tufting and rolled arms. A statement piece that combines classic elegance with modern comfort. Solid hardwood frame ensures lasting durability.',
    material: 'fabric',
    price: 599,
    compare_at_price: 799,
    is_bestseller: true,
    is_new: false,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.9,
    review_count: 89,
    total_stock: 32,
    status: 'published',
    category_slug: 'chairs',
    dimensions: '85cm W x 90cm D x 95cm H',
    care_instructions: 'Professional dry clean only. Vacuum regularly.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
    ],
    colors: [
      { name: 'Emerald', hex_code: '#2D4A2D' },
      { name: 'Navy', hex_code: '#1E3A5F' },
      { name: 'Burgundy', hex_code: '#722F37' }
    ]
  },
  {
    slug: 'scandinavian-dining-set',
    name: 'Scandinavian Dining Set',
    description: 'Complete 7-piece dining set featuring a solid oak table and six matching chairs. Minimalist Scandinavian design with tapered legs and smooth finish. Seats 6-8 comfortably.',
    material: 'wood',
    price: 1299,
    compare_at_price: 1599,
    is_bestseller: false,
    is_new: false,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.7,
    review_count: 156,
    total_stock: 18,
    status: 'published',
    category_slug: 'dining',
    dimensions: 'Table: 180cm L x 90cm W x 75cm H',
    care_instructions: 'Wipe with damp cloth. Use coasters for hot items.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80'
    ],
    colors: [
      { name: 'Oak', hex_code: '#D4A574' },
      { name: 'White', hex_code: '#FFFFFF' }
    ]
  },
  {
    slug: 'mid-century-sofa',
    name: 'Mid-Century Modern Sofa',
    description: 'Iconic mid-century design with clean lines and tapered wooden legs. Premium fabric upholstery with high-density foam cushions. A timeless piece for any living room.',
    material: 'fabric',
    price: 1899,
    compare_at_price: 2299,
    is_bestseller: true,
    is_new: false,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.8,
    review_count: 234,
    total_stock: 25,
    status: 'published',
    category_slug: 'sofas',
    dimensions: '220cm W x 90cm D x 85cm H',
    care_instructions: 'Vacuum weekly. Professional cleaning recommended annually.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
    ],
    colors: [
      { name: 'Gray', hex_code: '#808080' },
      { name: 'Sage', hex_code: '#9DC183' },
      { name: 'Charcoal', hex_code: '#36454F' }
    ]
  },
  {
    slug: 'leather-sectional',
    name: 'Italian Leather Sectional',
    description: 'Premium Italian leather sectional with modular design. Features adjustable headrests, chrome legs, and generous seating for the whole family. Ultimate luxury and comfort.',
    material: 'leather',
    price: 3499,
    compare_at_price: 4299,
    is_bestseller: false,
    is_new: true,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.9,
    review_count: 78,
    total_stock: 12,
    status: 'published',
    category_slug: 'sofas',
    dimensions: '320cm W x 180cm D x 90cm H',
    care_instructions: 'Condition leather every 6 months. Avoid direct sunlight.',
    images: [
      'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80'
    ],
    colors: [
      { name: 'Cognac', hex_code: '#9F381D' },
      { name: 'Black', hex_code: '#1A1A1A' },
      { name: 'White', hex_code: '#F5F5F0' }
    ]
  },
  {
    slug: 'glass-coffee-table',
    name: 'Tempered Glass Coffee Table',
    description: 'Modern coffee table with tempered glass top and brushed metal frame. The transparent design creates an airy feel in any space. Scratch-resistant and easy to clean.',
    material: 'glass',
    price: 449,
    compare_at_price: 549,
    is_bestseller: false,
    is_new: false,
    is_on_sale: true,
    free_shipping: false,
    average_rating: 4.6,
    review_count: 145,
    total_stock: 38,
    status: 'published',
    category_slug: 'tables',
    dimensions: '120cm L x 60cm W x 45cm H',
    care_instructions: 'Clean with glass cleaner. Handle with care.',
    images: [
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80'
    ],
    colors: [
      { name: 'Clear', hex_code: '#E8E8E8' },
      { name: 'Bronze', hex_code: '#CD7F32' }
    ]
  },
  {
    slug: 'marble-console-table',
    name: 'Carrara Marble Console Table',
    description: 'Elegant console table featuring genuine Carrara marble top with natural veining. Gold-finished metal base adds a touch of glamour. Perfect for entryways or living rooms.',
    material: 'marble',
    price: 899,
    compare_at_price: 1199,
    is_bestseller: false,
    is_new: true,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.8,
    review_count: 67,
    total_stock: 22,
    status: 'published',
    category_slug: 'tables',
    dimensions: '140cm L x 40cm W x 80cm H',
    care_instructions: 'Seal marble annually. Wipe spills immediately.',
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80'
    ],
    colors: [
      { name: 'White', hex_code: '#F5F5F0' },
      { name: 'Black', hex_code: '#1A1A1A' }
    ]
  },
  {
    slug: 'platform-bed-frame',
    name: 'Walnut Platform Bed Frame',
    description: 'Solid walnut platform bed with integrated headboard and hidden storage. Low-profile design with sturdy slat support. No box spring needed.',
    material: 'wood',
    price: 799,
    compare_at_price: 999,
    is_bestseller: true,
    is_new: false,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.7,
    review_count: 198,
    total_stock: 30,
    status: 'published',
    category_slug: 'bedroom',
    dimensions: 'Queen: 165cm W x 215cm L x 35cm H',
    care_instructions: 'Dust regularly. Polish with wood oil annually.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80'
    ],
    colors: [
      { name: 'Walnut', hex_code: '#5C4033' },
      { name: 'Oak', hex_code: '#D4A574' }
    ]
  },
  {
    slug: 'standing-desk',
    name: 'Electric Standing Desk',
    description: 'Height-adjustable standing desk with dual motors and memory presets. Spacious desktop with cable management system. Promotes healthy posture and productivity.',
    material: 'metal',
    price: 699,
    compare_at_price: 899,
    is_bestseller: true,
    is_new: true,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.8,
    review_count: 287,
    total_stock: 55,
    status: 'published',
    category_slug: 'office',
    dimensions: '160cm W x 80cm D x 65-130cm H',
    care_instructions: 'Wipe with damp cloth. Keep electronics dry.',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80'
    ],
    colors: [
      { name: 'White', hex_code: '#FFFFFF' },
      { name: 'Black', hex_code: '#1A1A1A' },
      { name: 'Oak', hex_code: '#D4A574' }
    ]
  },
  {
    slug: 'ergonomic-office-chair',
    name: 'Ergonomic Mesh Office Chair',
    description: 'Premium ergonomic chair with breathable mesh back and adjustable lumbar support. Features 4D armrests, seat depth adjustment, and smooth-rolling casters.',
    material: 'metal',
    price: 449,
    compare_at_price: 599,
    is_bestseller: true,
    is_new: false,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.7,
    review_count: 342,
    total_stock: 65,
    status: 'published',
    category_slug: 'office',
    dimensions: '70cm W x 70cm D x 100-115cm H',
    care_instructions: 'Vacuum mesh regularly. Wipe frame with damp cloth.',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    ],
    colors: [
      { name: 'Black', hex_code: '#1A1A1A' },
      { name: 'Gray', hex_code: '#808080' }
    ]
  },
  {
    slug: 'bookshelf-unit',
    name: 'Modular Bookshelf Unit',
    description: 'Versatile modular bookshelf that can be configured to fit any space. Solid wood construction with adjustable shelves. Perfect for books, decor, and storage.',
    material: 'wood',
    price: 549,
    compare_at_price: 699,
    is_bestseller: false,
    is_new: false,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.5,
    review_count: 178,
    total_stock: 40,
    status: 'published',
    category_slug: 'storage',
    dimensions: '120cm W x 35cm D x 200cm H',
    care_instructions: 'Dust regularly. Avoid overloading shelves.',
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80'
    ],
    colors: [
      { name: 'Oak', hex_code: '#D4A574' },
      { name: 'White', hex_code: '#FFFFFF' },
      { name: 'Black', hex_code: '#1A1A1A' }
    ]
  },
  {
    slug: 'pendant-light',
    name: 'Brass Pendant Light',
    description: 'Elegant brass pendant light with frosted glass shade. Adjustable cord length for perfect positioning. Creates warm, ambient lighting for dining areas or kitchens.',
    material: 'metal',
    price: 249,
    compare_at_price: 329,
    is_bestseller: false,
    is_new: false,
    is_on_sale: true,
    free_shipping: false,
    average_rating: 4.7,
    review_count: 156,
    total_stock: 75,
    status: 'published',
    category_slug: 'lighting',
    dimensions: '30cm diameter x 25cm H',
    care_instructions: 'Dust with soft cloth. Use appropriate wattage bulbs.',
    images: [
      'https://images.unsplash.com/photo-1513506003011-3b03c801954b?w=800&q=80',
      'https://images.unsplash.com/photo-1540932296774-3ed6910f4a8a?w=800&q=80'
    ],
    colors: [
      { name: 'Brass', hex_code: '#D4A017' },
      { name: 'Chrome', hex_code: '#C0C0C0' },
      { name: 'Matte Black', hex_code: '#1A1A1A' }
    ]
  },
  {
    slug: 'arc-floor-lamp',
    name: 'Arc Floor Lamp',
    description: 'Dramatic arc floor lamp with marble base and adjustable arm. Perfect for reading corners or as a statement piece. Provides focused task lighting.',
    material: 'metal',
    price: 349,
    compare_at_price: 449,
    is_bestseller: false,
    is_new: true,
    is_on_sale: true,
    free_shipping: true,
    average_rating: 4.8,
    review_count: 203,
    total_stock: 35,
    status: 'published',
    category_slug: 'lighting',
    dimensions: '180cm H x 150cm reach',
    care_instructions: 'Dust regularly. Handle marble base with care.',
    images: [
      'https://images.unsplash.com/photo-1540932296774-3ed6910f4a8a?w=800&q=80',
      'https://images.unsplash.com/photo-1513506003011-3b03c801954b?w=800&q=80'
    ],
    colors: [
      { name: 'Brass', hex_code: '#D4A017' },
      { name: 'Black', hex_code: '#1A1A1A' },
      { name: 'White', hex_code: '#FFFFFF' }
    ]
  },
  {
    slug: 'rattan-armchair',
    name: 'Natural Rattan Armchair',
    description: 'Handwoven rattan armchair with comfortable cushion. Brings natural texture and bohemian charm to any space. Lightweight yet sturdy construction.',
    material: 'rattan',
    price: 399,
    compare_at_price: 499,
    is_bestseller: false,
    is_new: false,
    is_on_sale: true,
    free_shipping: false,
    average_rating: 4.6,
    review_count: 94,
    total_stock: 28,
    status: 'published',
    category_slug: 'chairs',
    dimensions: '75cm W x 80cm D x 90cm H',
    care_instructions: 'Keep away from moisture. Dust with soft brush.',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80'
    ],
    colors: [
      { name: 'Natural', hex_code: '#D4A574' },
      { name: 'White Wash', hex_code: '#F5F5F0' }
    ]
  },
  {
    slug: 'vanity-mirror',
    name: 'Arched Vanity Mirror',
    description: 'Elegant arched mirror with thin metal frame. Full-length design perfect for bedrooms or entryways. Can be wall-mounted or leaned against wall.',
    material: 'metal',
    price: 299,
    compare_at_price: 399,
    is_bestseller: false,
    is_new: false,
    is_on_sale: true,
    free_shipping: false,
    average_rating: 4.6,
    review_count: 78,
    total_stock: 45,
    status: 'published',
    category_slug: 'decor',
    dimensions: '60cm W x 180cm H',
    care_instructions: 'Clean with glass cleaner. Handle with care.',
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80'
    ],
    colors: [
      { name: 'Gold', hex_code: '#D4A017' },
      { name: 'Black', hex_code: '#1A1A1A' }
    ]
  }
];

// ============================================
// TEAM MEMBERS DATA
// ============================================
const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: 'Sarah founded Maison Furniture with a vision to bring sustainable, handcrafted furniture to modern homes. With 15 years in design and manufacturing, she leads our creative direction.',
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    sort_order: 1
  },
  {
    name: 'Marcus Williams',
    role: 'Head of Design',
    bio: 'Marcus brings a unique blend of Scandinavian minimalism and American craftsmanship to every piece. His designs have been featured in Architectural Digest and Dwell.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    sort_order: 2
  },
  {
    name: 'Elena Rodriguez',
    role: 'Sustainability Director',
    bio: 'Elena ensures every material we use meets our strict environmental standards. She partners with certified sustainable forests and eco-friendly manufacturers worldwide.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    sort_order: 3
  },
  {
    name: 'David Kim',
    role: 'Head of Operations',
    bio: 'David oversees our supply chain and logistics, ensuring timely delivery while maintaining our commitment to quality. He optimized our delivery network to reduce carbon footprint by 40%.',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    sort_order: 4
  },
  {
    name: 'Aisha Patel',
    role: 'Customer Experience Lead',
    bio: 'Aisha and her team are dedicated to ensuring every customer has an exceptional experience from browsing to delivery. She implemented our 24/7 support system.',
    image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    sort_order: 5
  },
  {
    name: 'James Morrison',
    role: 'Master Craftsman',
    bio: 'James leads our workshop with over 30 years of furniture crafting experience. Each piece passes his rigorous quality inspection before leaving our facility.',
    image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    sort_order: 6
  }
];

// ============================================
// MILESTONES DATA
// ============================================
const milestones = [
  { year: 2014, title: 'Founded', description: 'Started in a small workshop with a dream to create sustainable furniture.', sort_order: 1 },
  { year: 2016, title: 'First Showroom', description: 'Opened our flagship showroom in New York City.', sort_order: 2 },
  { year: 2018, title: 'Sustainability Certified', description: 'Achieved FSC certification for all wood products.', sort_order: 3 },
  { year: 2020, title: 'Online Launch', description: 'Launched our e-commerce platform to reach customers nationwide.', sort_order: 4 },
  { year: 2022, title: '50,000 Customers', description: 'Celebrated serving 50,000 happy customers.', sort_order: 5 },
  { year: 2023, title: 'Carbon Neutral', description: 'Achieved carbon neutral status across all operations.', sort_order: 6 },
  { year: 2024, title: 'International Expansion', description: 'Expanded to serve customers in 15 countries.', sort_order: 7 }
];

// ============================================
// FAQs DATA
// ============================================
const faqs = [
  { question: 'What is your return policy?', answer: 'We offer a 30-day return policy for all unused items in original packaging. Custom orders are final sale.', category: 'returns', sort_order: 1 },
  { question: 'How long does shipping take?', answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee.', category: 'shipping', sort_order: 1 },
  { question: 'Do you offer assembly services?', answer: 'Yes! We offer white-glove delivery with full assembly for an additional fee. Available in select areas.', category: 'shipping', sort_order: 2 },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, PayPal, Apple Pay, and offer financing through Affirm.', category: 'payment', sort_order: 1 },
  { question: 'Are your products sustainable?', answer: 'Yes! We use FSC-certified wood, water-based finishes, and eco-friendly packaging. We are carbon neutral since 2023.', category: 'general', sort_order: 1 },
  { question: 'Do you offer custom orders?', answer: 'Yes, we offer customization on select pieces including fabric, finish, and dimensions. Contact us for details.', category: 'products', sort_order: 1 },
  { question: 'What warranty do you provide?', answer: 'All furniture comes with a 2-year structural warranty. Extended warranties are available for purchase.', category: 'general', sort_order: 2 },
  { question: 'Can I track my order?', answer: 'Yes! Once shipped, you will receive a tracking number via email to monitor your delivery.', category: 'shipping', sort_order: 3 }
];

// ============================================
// HERO BANNERS DATA
// ============================================
const heroBanners = [
  {
    title: 'Summer Collection',
    subtitle: 'Discover our new arrivals designed for modern living',
    cta_text: 'Shop Now',
    cta_link: '/shop',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80',
    image_alt: 'Modern living room with sofa',
    sort_order: 1
  },
  {
    title: 'Handcrafted Excellence',
    subtitle: 'Each piece tells a story of craftsmanship',
    cta_text: 'Explore',
    cta_link: '/craftsmanship',
    image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80',
    image_alt: 'Craftsman working on furniture',
    sort_order: 2
  },
  {
    title: 'Sustainable Living',
    subtitle: 'Furniture that cares for the planet',
    cta_text: 'Learn More',
    cta_link: '/about',
    image_url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80',
    image_alt: 'Eco-friendly furniture',
    sort_order: 3
  }
];

// ============================================
// TESTIMONIALS DATA
// ============================================
const testimonials = [
  {
    customer_name: 'Jennifer M.',
    customer_title: 'Interior Designer',
    customer_image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    content: 'The quality of Maison furniture is exceptional. My clients are always impressed with the craftsmanship and attention to detail.',
    rating: 5,
    is_featured: true
  },
  {
    customer_name: 'Robert K.',
    customer_title: 'Homeowner',
    customer_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    content: 'We furnished our entire living room with Maison pieces. Two years later, everything still looks brand new.',
    rating: 5,
    is_featured: true
  },
  {
    customer_name: 'Amanda L.',
    customer_title: 'Architect',
    customer_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    content: 'Finally, a furniture company that takes sustainability seriously. Beautiful designs with a clear conscience.',
    rating: 5,
    is_featured: true
  }
];

// ============================================
// NAV ITEMS DATA
// ============================================
const navItems = [
  { menu_location: 'header', label: 'Shop', href: '/shop', sort_order: 1 },
  { menu_location: 'header', label: 'Collections', href: '/collections', sort_order: 2 },
  { menu_location: 'header', label: 'About', href: '/about', sort_order: 3 },
  { menu_location: 'header', label: 'Craftsmanship', href: '/craftsmanship', sort_order: 4 },
  { menu_location: 'header', label: 'Blog', href: '/blog', sort_order: 5 },
  { menu_location: 'header', label: 'Contact', href: '/contact', sort_order: 6 },
  { menu_location: 'footer', label: 'Shop All', href: '/shop', sort_order: 1 },
  { menu_location: 'footer', label: 'About Us', href: '/about', sort_order: 2 },
  { menu_location: 'footer', label: 'Contact', href: '/contact', sort_order: 3 },
  { menu_location: 'footer', label: 'FAQ', href: '/faq', sort_order: 4 },
  { menu_location: 'footer', label: 'Shipping', href: '/shipping', sort_order: 5 },
  { menu_location: 'footer', label: 'Returns', href: '/returns', sort_order: 6 },
  { menu_location: 'footer', label: 'Privacy Policy', href: '/privacy', sort_order: 7 },
  { menu_location: 'footer', label: 'Terms of Service', href: '/terms', sort_order: 8 },
];

// ============================================
// SITE SETTINGS DATA
// ============================================
const siteSettings = {
  id: 'default',
  site_name: 'Maison Furniture',
  site_tagline: 'Handcrafted Furniture for Modern Living',
  contact_email: 'hello@maisonfurniture.com',
  contact_phone: '+1 (555) 123-4567',
  contact_address: '123 Design District, New York, NY 10001',
  social_facebook: 'https://facebook.com/maisonfurniture',
  social_instagram: 'https://instagram.com/maisonfurniture',
  social_twitter: 'https://twitter.com/maisonfurniture',
  social_pinterest: 'https://pinterest.com/maisonfurniture',
  meta_title: 'Maison Furniture - Handcrafted Sustainable Furniture',
  meta_description: 'Discover handcrafted, sustainable furniture designed for modern living. Shop sofas, chairs, tables, and more.',
  footer_text: '© 2024 Maison Furniture. All rights reserved.',
  free_shipping_threshold: 500,
  return_days: 30,
  warranty_years: 2,
  show_newsletter: true,
  show_chat_widget: false,
  maintenance_mode: false
};

// ============================================
// SEED FUNCTIONS
// ============================================

async function seedCategories() {
  console.log('Seeding categories...');
  const { error } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' });
  if (error) throw error;
  console.log(`✓ Seeded ${categories.length} categories`);
}

async function seedProducts() {
  console.log('Seeding products...');
  
  // Get category IDs
  const { data: cats } = await supabase.from('categories').select('id, slug');
  const categoryMap = new Map(cats?.map(c => [c.slug, c.id]) ?? []);

  for (const product of products) {
    const { images, colors, category_slug, ...productData } = product;
    
    // Insert product
    const { data: insertedProduct, error: productError } = await supabase
      .from('products')
      .upsert({
        ...productData,
        category_id: categoryMap.get(category_slug) ?? null
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (productError) {
      console.error(`Error inserting product ${product.slug}:`, productError);
      continue;
    }

    // Insert images
    if (images.length > 0) {
      await supabase.from('product_images').delete().eq('product_id', insertedProduct.id);
      const imageData = images.map((url, index) => ({
        product_id: insertedProduct.id,
        url,
        alt: `${product.name} image ${index + 1}`,
        sort_order: index
      }));
      await supabase.from('product_images').insert(imageData);
    }

    // Insert colors
    if (colors.length > 0) {
      await supabase.from('product_colors').delete().eq('product_id', insertedProduct.id);
      const colorData = colors.map((color, index) => ({
        product_id: insertedProduct.id,
        name: color.name,
        hex_code: color.hex_code,
        sort_order: index
      }));
      await supabase.from('product_colors').insert(colorData);
    }

    // Create default variant
    const { data: existingVariant } = await supabase
      .from('variants')
      .select('id')
      .eq('product_id', insertedProduct.id)
      .eq('is_default', true)
      .single();

    if (!existingVariant) {
      await supabase.from('variants').insert({
        product_id: insertedProduct.id,
        sku: `${product.slug}-default`,
        stock: product.total_stock,
        is_default: true
      });
    }
  }

  console.log(`✓ Seeded ${products.length} products with images and colors`);
}

async function seedTeamMembers() {
  console.log('Seeding team members...');
  // Delete existing and insert fresh
  await supabase.from('team_members').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error } = await supabase.from('team_members').insert(teamMembers);
  if (error) throw error;
  console.log(`✓ Seeded ${teamMembers.length} team members`);
}

async function seedMilestones() {
  console.log('Seeding milestones...');
  await supabase.from('milestones').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error } = await supabase.from('milestones').insert(milestones);
  if (error) throw error;
  console.log(`✓ Seeded ${milestones.length} milestones`);
}

async function seedFaqs() {
  console.log('Seeding FAQs...');
  await supabase.from('faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error } = await supabase.from('faqs').insert(faqs);
  if (error) throw error;
  console.log(`✓ Seeded ${faqs.length} FAQs`);
}

async function seedHeroBanners() {
  console.log('Seeding hero banners...');
  await supabase.from('hero_banners').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error } = await supabase.from('hero_banners').insert(heroBanners);
  if (error) throw error;
  console.log(`✓ Seeded ${heroBanners.length} hero banners`);
}

async function seedTestimonials() {
  console.log('Seeding testimonials...');
  await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error } = await supabase.from('testimonials').insert(testimonials);
  if (error) throw error;
  console.log(`✓ Seeded ${testimonials.length} testimonials`);
}

async function seedNavItems() {
  console.log('Seeding nav items...');
  // Clear existing nav items first
  await supabase.from('nav_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error } = await supabase.from('nav_items').insert(navItems);
  if (error) throw error;
  console.log(`✓ Seeded ${navItems.length} nav items`);
}

async function seedSiteSettings() {
  console.log('Seeding site settings...');
  const { error } = await supabase.from('site_settings').upsert(siteSettings, { onConflict: 'id' });
  if (error) throw error;
  console.log('✓ Seeded site settings');
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('🌱 Starting database seed...\n');

  try {
    await seedCategories();
    await seedProducts();
    await seedTeamMembers();
    await seedMilestones();
    await seedFaqs();
    await seedHeroBanners();
    await seedTestimonials();
    await seedNavItems();
    await seedSiteSettings();

    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  }
}

main();
