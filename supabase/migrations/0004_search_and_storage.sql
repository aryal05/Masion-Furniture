-- ============================================
-- 0004_search_and_storage.sql
-- Full-text search and storage buckets
-- ============================================

-- ============================================
-- Full-text search on products
-- ============================================

-- Add a tsvector column for search
ALTER TABLE products ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Populate the search vector
CREATE OR REPLACE FUNCTION products_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.material, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_search_update
  BEFORE INSERT OR UPDATE OF name, material, description ON products
  FOR EACH ROW
  EXECUTE FUNCTION products_search_vector_update();

-- GIN index for fast search
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING GIN(search_vector);

-- Update existing rows
UPDATE products SET search_vector =
  setweight(to_tsvector('english', COALESCE(name, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(material, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(description, '')), 'C');

-- ============================================
-- Search function for the storefront
-- ============================================
CREATE OR REPLACE FUNCTION search_products(query TEXT, result_limit INT DEFAULT 20)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  name TEXT,
  price NUMERIC,
  average_rating NUMERIC,
  image_url TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.slug,
    p.name,
    p.price,
    p.average_rating,
    (SELECT pi.url FROM product_images pi WHERE pi.product_id = p.id ORDER BY pi.sort_order LIMIT 1) AS image_url,
    ts_rank(p.search_vector, websearch_to_tsquery('english', query)) AS rank
  FROM products p
  WHERE p.status = 'published'
    AND p.search_vector @@ websearch_to_tsquery('english', query)
  ORDER BY rank DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Storage Buckets
-- ============================================

-- Product images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Avatars bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Payment slips bucket (for bank transfer proof)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'payment-slips',
  'payment-slips',
  false,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- Storage RLS Policies
-- ============================================

-- Product images: public read, admin write
CREATE POLICY "Product images public read"
  ON storage.objects FOR SELECT
  TO authenticated, anon
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Avatars: public read, owner write
CREATE POLICY "Avatar images public read"
  ON storage.objects FOR SELECT
  TO authenticated, anon
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = 'avatars'
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars');

-- Payment slips: owner + admin read, owner write
CREATE POLICY "Users can upload payment slips"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'payment-slips');

CREATE POLICY "Admin can view payment slips"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'payment-slips'
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
