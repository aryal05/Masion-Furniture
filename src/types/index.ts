// Core domain types for Maison Furniture

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  material: string;
  price: number;
  compare_at_price: number | null;
  is_bestseller: boolean;
  is_new: boolean;
  average_rating: number;
  review_count: number;
  total_stock: number;
  status: "draft" | "published" | "archived";
  category_id: string;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  variants?: Variant[];
  category?: Category;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
}

export interface Variant {
  id: string;
  product_id: string;
  sku: string;
  color: string | null;
  size: string | null;
  price: number | null;
  stock: number;
  is_default: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string;
  is_featured: boolean;
}

export interface Address {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  email?: string;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  province: string;
  pincode: string;
  is_default: boolean;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  email: string;
  status: OrderStatus;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total: number;
  shipping_method: string;
  payment_method: string;
  payment_status: PaymentStatus;
  shipping_address: Address;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
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

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
  user?: {
    name: string;
    avatar_url: string | null;
  };
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: "customer" | "admin";
  created_at: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  min_order: number | null;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  starts_at: string;
  expires_at: string;
  is_active: boolean;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  added_at: string;
  product?: Product;
}

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
