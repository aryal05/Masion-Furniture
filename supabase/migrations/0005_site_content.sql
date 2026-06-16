-- ============================================
-- 0005_site_content.sql
-- Site content tables for dynamic CMS
-- ============================================

-- ============================================
-- SITE SETTINGS (enhanced singleton)
-- ============================================
DROP TABLE IF EXISTS store_settings CASCADE;

CREATE TABLE site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  -- Branding
  site_name TEXT NOT NULL DEFAULT 'Maison Furniture',
  site_tagline TEXT DEFAULT 'Handcrafted Furniture for Modern Living',
  logo_url TEXT,
  favicon_url TEXT,
  -- Contact Info
  contact_email TEXT DEFAULT 'hello@maisonfurniture.com',
  contact_phone TEXT DEFAULT '+1 (555) 123-4567',
  contact_address TEXT DEFAULT '123 Design District, New York, NY 10001',
  -- Social Links
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_pinterest TEXT,
  social_linkedin TEXT,
  -- SEO
  meta_title TEXT DEFAULT 'Maison Furniture - Handcrafted Furniture',
  meta_description TEXT DEFAULT 'Discover handcrafted, sustainable furniture designed for modern living.',
  -- Footer
  footer_text TEXT DEFAULT '© 2024 Maison Furniture. All rights reserved.',
  -- Shipping & Policies
  free_shipping_threshold NUMERIC(12,2) DEFAULT 500,
  return_days INT DEFAULT 30,
  warranty_years INT DEFAULT 2,
  -- Feature Flags
  show_newsletter BOOLEAN DEFAULT true,
  show_chat_widget BOOLEAN DEFAULT false,
  maintenance_mode BOOLEAN DEFAULT false,
  -- Timestamps
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TEAM MEMBERS
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- MILESTONES (Company Timeline)
-- ============================================
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- FAQ
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'shipping', 'returns', 'payment', 'products')),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'trends' CHECK (category IN ('interior-design', 'sustainability', 'trends', 'care-tips')),
  featured_image TEXT,
  author_name TEXT NOT NULL DEFAULT 'Maison Team',
  author_avatar TEXT,
  read_time INT NOT NULL DEFAULT 5,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- HERO BANNERS / SLIDES
-- ============================================
CREATE TABLE IF NOT EXISTS hero_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  cta_text TEXT DEFAULT 'Shop Now',
  cta_link TEXT DEFAULT '/shop',
  image_url TEXT NOT NULL,
  image_alt TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TESTIMONIALS
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_title TEXT,
  customer_image TEXT,
  content TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- NAVIGATION MENUS
-- ============================================
CREATE TABLE IF NOT EXISTS nav_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_location TEXT NOT NULL DEFAULT 'header' CHECK (menu_location IN ('header', 'footer', 'mobile')),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  parent_id UUID REFERENCES nav_items(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  opens_in_new_tab BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- PRODUCT COLORS (normalized)
-- ============================================
CREATE TABLE IF NOT EXISTS product_colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hex_code TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_milestones_active ON milestones(is_active, year);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category, is_active);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_hero_banners_active ON hero_banners(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured, is_active);
CREATE INDEX IF NOT EXISTS idx_nav_items_location ON nav_items(menu_location, is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_product_colors_product ON product_colors(product_id);

-- ============================================
-- RLS POLICIES
-- ============================================

-- Site Settings: Public read, admin write
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update site settings" ON site_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Team Members: Public read active, admin full access
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage team members" ON team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Milestones: Public read active, admin full access
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active milestones" ON milestones FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage milestones" ON milestones FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- FAQs: Public read active, admin full access
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage faqs" ON faqs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Blog Posts: Public read published, admin full access
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage blog posts" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Hero Banners: Public read active, admin full access
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active hero banners" ON hero_banners FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage hero banners" ON hero_banners FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Testimonials: Public read active, admin full access
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Nav Items: Public read active, admin full access
ALTER TABLE nav_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active nav items" ON nav_items FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage nav items" ON nav_items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Product Colors: Public read, admin full access
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read product colors" ON product_colors FOR SELECT USING (true);
CREATE POLICY "Admins can manage product colors" ON product_colors FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Insert default site settings
INSERT INTO site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
