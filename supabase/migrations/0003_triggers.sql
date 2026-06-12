-- ============================================
-- 0003_triggers.sql
-- Database triggers and functions
-- ============================================

-- ============================================
-- Auto-create profile on user signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- Auto-update updated_at timestamps
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Sync total_stock on variant changes
-- ============================================
CREATE OR REPLACE FUNCTION sync_product_total_stock()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET total_stock = (
    SELECT COALESCE(SUM(stock), 0) FROM variants WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
  )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_stock_on_variant_change
  AFTER INSERT OR UPDATE OR DELETE ON variants
  FOR EACH ROW
  EXECUTE FUNCTION sync_product_total_stock();

-- ============================================
-- Recalculate product average_rating on review changes
-- ============================================
CREATE OR REPLACE FUNCTION recalculate_product_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_product_id UUID;
BEGIN
  target_product_id := COALESCE(NEW.product_id, OLD.product_id);

  UPDATE products
  SET
    average_rating = COALESCE((
      SELECT AVG(rating)::NUMERIC(3,2) FROM reviews WHERE product_id = target_product_id
    ), 0),
    review_count = (
      SELECT COUNT(*) FROM reviews WHERE product_id = target_product_id
    )
  WHERE id = target_product_id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recalc_rating_on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION recalculate_product_rating();

-- ============================================
-- Decrement stock on order placement
-- ============================================
CREATE OR REPLACE FUNCTION decrement_variant_stock()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE variants
  SET stock = GREATEST(stock - NEW.quantity, 0)
  WHERE id = NEW.variant_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_stock_on_order_item
  AFTER INSERT ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION decrement_variant_stock();

-- ============================================
-- Increment promo code usage on order
-- ============================================
CREATE OR REPLACE FUNCTION increment_promo_usage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.promo_code_id IS NOT NULL THEN
    UPDATE promo_codes
    SET used_count = used_count + 1
    WHERE id = NEW.promo_code_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_promo_on_order
  AFTER INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION increment_promo_usage();

-- ============================================
-- Ensure only one default address per user
-- ============================================
CREATE OR REPLACE FUNCTION enforce_single_default_address()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_default = true THEN
    UPDATE addresses
    SET is_default = false
    WHERE user_id = NEW.user_id AND id != NEW.id AND is_default = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_default_address
  BEFORE INSERT OR UPDATE ON addresses
  FOR EACH ROW
  EXECUTE FUNCTION enforce_single_default_address();
