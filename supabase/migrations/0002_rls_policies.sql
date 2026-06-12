-- ============================================
-- 0002_rls_policies.sql
-- Row Level Security policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES
-- ============================================
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Profile is created via trigger, insert not needed for user
-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- CATEGORIES (publicly readable)
-- ============================================
CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admin can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- COLLECTIONS (publicly readable)
-- ============================================
CREATE POLICY "Collections are publicly readable"
  ON collections FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admin can manage collections"
  ON collections FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- PRODUCTS (published are public, all to admin)
-- ============================================
CREATE POLICY "Published products are publicly readable"
  ON products FOR SELECT
  TO authenticated, anon
  USING (status = 'published');

CREATE POLICY "Admin can manage all products"
  ON products FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- PRODUCT IMAGES (same access as products)
-- ============================================
CREATE POLICY "Product images are publicly readable"
  ON product_images FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admin can manage product images"
  ON product_images FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- VARIANTS (publicly readable)
-- ============================================
CREATE POLICY "Variants are publicly readable"
  ON variants FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admin can manage variants"
  ON variants FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- COLLECTION PRODUCTS
-- ============================================
CREATE POLICY "Collection products publicly readable"
  ON collection_products FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admin can manage collection products"
  ON collection_products FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- ADDRESSES (user's own only)
-- ============================================
CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- ORDERS
-- ============================================
-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create orders (insert)
CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Admin can manage all orders
CREATE POLICY "Admin can manage all orders"
  ON orders FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can manage order items"
  ON order_items FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- REVIEWS
-- ============================================
CREATE POLICY "Reviews are publicly readable"
  ON reviews FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- WISHLISTS
-- ============================================
CREATE POLICY "Users can manage own wishlist"
  ON wishlists FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- PROMO CODES (public read for validation, admin manage)
-- ============================================
CREATE POLICY "Active promo codes are readable"
  ON promo_codes FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admin can manage promo codes"
  ON promo_codes FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================
CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Admin can view subscribers"
  ON newsletter_subscribers FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- STORE SETTINGS
-- ============================================
CREATE POLICY "Store settings publicly readable"
  ON store_settings FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admin can update store settings"
  ON store_settings FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
