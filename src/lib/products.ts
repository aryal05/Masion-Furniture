export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  materials: string[];
  dimensions: string;
  care: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'velvet-sofa',
    name: 'Velvet Sofa',
    price: 4500,
    description: 'A luxurious velvet sofa that combines comfort with sophisticated design. Perfect for modern living spaces, this piece features premium velvet upholstery and solid wood construction.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    category: 'Living Room',
    materials: ['Premium Velvet', 'Solid Oak Frame', 'High-Density Foam', 'Stainless Steel Legs'],
    dimensions: '220cm W x 90cm D x 85cm H',
    care: 'Professional dry clean only. Avoid direct sunlight to prevent fading.',
    inStock: true
  },
  {
    id: 'oak-dining-table',
    name: 'Oak Dining Table',
    price: 3200,
    description: 'Crafted from sustainably sourced oak, this dining table showcases natural wood grain and exceptional durability. Seats 8-10 people comfortably.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    category: 'Dining',
    materials: ['Solid Oak', 'Natural Oil Finish', 'Reinforced Joints'],
    dimensions: '240cm L x 100cm W x 75cm H',
    care: 'Wipe with damp cloth. Re-apply oil finish annually.',
    inStock: true
  },
  {
    id: 'leather-armchair',
    name: 'Leather Armchair',
    price: 2800,
    description: 'An elegant leather armchair with classic design elements. Features premium Italian leather and ergonomic support for ultimate comfort.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    category: 'Living Room',
    materials: ['Italian Leather', 'Walnut Frame', 'Down Feather Cushions'],
    dimensions: '85cm W x 90cm D x 95cm H',
    care: 'Condition leather every 6 months. Keep away from heat sources.',
    inStock: true
  },
  {
    id: 'modern-bed',
    name: 'Modern Platform Bed',
    price: 3800,
    description: 'A sleek platform bed with integrated storage. Features a minimalist design with premium upholstery and solid wood slats.',
    image: 'https://images.unsplash.com/photo-1616594039964-40891a913161?w=800&q=80',
    category: 'Bedroom',
    materials: ['Upholstered Headboard', 'Solid Pine Slats', 'Hydraulic Storage'],
    dimensions: '200cm L x 180cm W x 35cm H',
    care: 'Vacuum regularly. Spot clean with mild detergent.',
    inStock: true
  },
  {
    id: 'executive-desk',
    name: 'Executive Desk',
    price: 4200,
    description: 'A commanding executive desk crafted from walnut with leather inlay. Features cable management and spacious drawers.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    category: 'Office',
    materials: ['Walnut Veneer', 'Leather Inlay', 'Soft-Close Drawers'],
    dimensions: '180cm L x 90cm W x 75cm H',
    care: 'Polish with wood-specific cleaner. Avoid water exposure.',
    inStock: true
  },
  {
    id: 'outdoor-lounge',
    name: 'Outdoor Lounge Set',
    price: 5500,
    description: 'Weather-resistant lounge set perfect for patios. Includes sofa, two armchairs, and coffee table with UV-resistant cushions.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    category: 'Outdoor',
    materials: ['Teak Wood', 'Sunbrella Fabric', 'Weather-Resistant Finish'],
    dimensions: 'Sofa: 200cm W x 90cm D',
    care: 'Cover when not in use. Clean with mild soap and water.',
    inStock: true
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}
