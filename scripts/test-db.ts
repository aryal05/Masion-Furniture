import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import WebSocket from 'ws';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: { transport: WebSocket }
});

async function test() {
  console.log('Testing Supabase connection...\n');
  
  // Test products
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, slug, name')
    .limit(5);
  
  if (productsError) {
    console.error('Products error:', productsError);
  } else {
    console.log('Products found:', products?.length);
    products?.forEach(p => console.log(`  - ${p.slug}: ${p.name}`));
  }
  
  // Test specific product
  console.log('\nTesting leather-sectional lookup...');
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('slug', 'leather-sectional')
    .single();
  
  if (productError) {
    console.error('Product lookup error:', productError);
  } else {
    console.log('Found product:', product?.name, '- Price:', product?.price);
  }
  
  // Check product_images
  console.log('\nChecking product_images table...');
  const { data: images, error: imagesError } = await supabase
    .from('product_images')
    .select('*')
    .limit(3);
  
  if (imagesError) {
    console.error('Images error:', imagesError);
  } else {
    console.log('Images found:', images?.length);
  }
}

test();
