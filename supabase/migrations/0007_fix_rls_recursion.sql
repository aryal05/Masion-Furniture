-- ============================================
-- 0007_fix_rls_recursion.sql
-- Fix infinite recursion in RLS policies
-- ============================================

-- The issue: "Admin can view all profiles" policy queries profiles table
-- to check if user is admin, which triggers the same policy check = infinite loop

-- Drop problematic policies
DROP POLICY IF EXISTS "Admin can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create simple, non-recursive policies for profiles
DROP POLICY IF EXISTS "Anyone can read profiles" ON profiles;
CREATE POLICY "Anyone can read profiles" ON profiles 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles 
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Alternative: Disable RLS on profiles entirely (simpler for development)
-- ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Also fix admin policies on other tables that reference profiles
-- These use a subquery that can cause recursion

-- For products - allow public read without admin check
DROP POLICY IF EXISTS "Admin can manage all products" ON products;
DROP POLICY IF EXISTS "Published products are publicly readable" ON products;

DROP POLICY IF EXISTS "Products are publicly readable" ON products;
CREATE POLICY "Products are publicly readable" ON products 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin can manage products" ON products;
CREATE POLICY "Admin can manage products" ON products 
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- For categories
DROP POLICY IF EXISTS "Admin can manage categories" ON categories;
DROP POLICY IF EXISTS "Categories admin manage" ON categories;

CREATE POLICY "Admin can manage categories" ON categories 
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- For product_images
DROP POLICY IF EXISTS "Admin can manage product images" ON product_images;
DROP POLICY IF EXISTS "Product images admin manage" ON product_images;

CREATE POLICY "Admin can manage product images" ON product_images 
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- For variants
DROP POLICY IF EXISTS "Admin can manage variants" ON variants;
DROP POLICY IF EXISTS "Variants admin manage" ON variants;

CREATE POLICY "Admin can manage variants" ON variants 
  FOR ALL USING (
    auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
  );

-- Quick fix: If above doesn't work, disable RLS on read-heavy tables
-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE product_images DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE variants DISABLE ROW LEVEL SECURITY;
