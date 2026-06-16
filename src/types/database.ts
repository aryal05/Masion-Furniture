// Database types for Supabase tables

export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  material: string;
  price: number;
  compare_at_price: number | null;
  is_bestseller: boolean;
  is_new: boolean;
  is_on_sale: boolean;
  free_shipping: boolean;
  average_rating: number;
  review_count: number;
  total_stock: number;
  status: 'draft' | 'published' | 'archived';
  category_id: string | null;
  dimensions: string | null;
  care_instructions: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations
  category?: DbCategory;
  product_images?: DbProductImage[];
  product_colors?: DbProductColor[];
  variants?: DbVariant[];
  reviews?: DbReview[];
}

export interface DbProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
}

export interface DbProductColor {
  id: string;
  product_id: string;
  name: string;
  hex_code: string;
  sort_order: number;
}

export interface DbVariant {
  id: string;
  product_id: string;
  sku: string;
  color: string | null;
  size: string | null;
  price: number | null;
  stock: number;
  is_default: boolean;
}

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  created_at: string;
}

export interface DbCollection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string;
  is_featured: boolean;
  created_at: string;
}

export interface DbReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
  // Joined
  user?: {
    name: string | null;
    avatar_url: string | null;
  };
}

export interface DbSiteSettings {
  id: string;
  site_name: string;
  site_tagline: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_twitter: string | null;
  social_pinterest: string | null;
  social_linkedin: string | null;
  meta_title: string | null;
  meta_description: string | null;
  footer_text: string | null;
  free_shipping_threshold: number | null;
  return_days: number | null;
  warranty_years: number | null;
  show_newsletter: boolean;
  show_chat_widget: boolean;
  maintenance_mode: boolean;
  updated_at: string;
}

export interface DbTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbMilestone {
  id: string;
  year: number;
  title: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface DbFaq {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'shipping' | 'returns' | 'payment' | 'products';
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: 'interior-design' | 'sustainability' | 'trends' | 'care-tips';
  featured_image: string | null;
  author_name: string;
  author_avatar: string | null;
  read_time: number;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbHeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  image_url: string;
  image_alt: string | null;
  sort_order: number;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
}

export interface DbTestimonial {
  id: string;
  customer_name: string;
  customer_title: string | null;
  customer_image: string | null;
  content: string;
  rating: number;
  product_id: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface DbNavItem {
  id: string;
  menu_location: 'header' | 'footer' | 'mobile';
  label: string;
  href: string;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  opens_in_new_tab: boolean;
  created_at: string;
  children?: DbNavItem[];
}

export interface DbOrder {
  id: string;
  order_number: string;
  user_id: string | null;
  email: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total: number;
  shipping_method: string;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address: Record<string, unknown>;
  notes: string | null;
  promo_code_id: string | null;
  created_at: string;
  updated_at: string;
  order_items?: DbOrderItem[];
}

export interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  name: string;
  variant_label: string;
  image_url: string;
  price: number;
  quantity: number;
}

export interface DbPromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_order: number | null;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

export interface DbProfile {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}
