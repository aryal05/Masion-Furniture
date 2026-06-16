-- ============================================
-- 0006_product_enhancements.sql
-- Add missing columns to products table
-- ============================================

-- Add missing columns if they don't exist
DO $$ 
BEGIN
  -- Add is_on_sale column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_on_sale') THEN
    ALTER TABLE products ADD COLUMN is_on_sale BOOLEAN NOT NULL DEFAULT false;
  END IF;

  -- Add free_shipping column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'free_shipping') THEN
    ALTER TABLE products ADD COLUMN free_shipping BOOLEAN NOT NULL DEFAULT false;
  END IF;

  -- Add dimensions column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'dimensions') THEN
    ALTER TABLE products ADD COLUMN dimensions TEXT;
  END IF;

  -- Add care_instructions column
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'care_instructions') THEN
    ALTER TABLE products ADD COLUMN care_instructions TEXT;
  END IF;
END $$;

-- Update is_on_sale based on compare_at_price
UPDATE products 
SET is_on_sale = true 
WHERE compare_at_price IS NOT NULL AND compare_at_price > price;
