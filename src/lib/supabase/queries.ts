import { createClient } from './server';
import type {
  DbProduct,
  DbCategory,
  DbCollection,
  DbReview,
  DbSiteSettings,
  DbTeamMember,
  DbMilestone,
  DbFaq,
  DbBlogPost,
  DbHeroBanner,
  DbTestimonial,
  DbNavItem,
} from '@/types/database';

// ============================================
// PRODUCTS
// ============================================

export async function getProducts(options?: {
  category?: string;
  limit?: number;
  offset?: number;
  status?: 'published' | 'draft' | 'archived';
  sortBy?: 'created_at' | 'price' | 'average_rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      product_images(*),
      product_colors(*)
    `)
    .eq('status', options?.status ?? 'published');

  if (options?.category) {
    query = query.eq('categories.slug', options.category);
  }

  if (options?.sortBy) {
    query = query.order(options.sortBy, { ascending: options.sortOrder === 'asc' });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit ?? 10) - 1);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data as DbProduct[];
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  
  // First try with all relations
  let { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      product_images(*),
      product_colors(*),
      variants(*)
    `)
    .eq('slug', slug)
    .single();

  // If product_colors or other tables don't exist, try simpler query
  if (error && error.message?.includes('product_colors')) {
    const result = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        product_images(*)
      `)
      .eq('slug', slug)
      .single();
    data = result.data;
    error = result.error;
  }

  if (error) {
    console.error('Error fetching product by slug:', slug, error);
    return null;
  }

  return data as DbProduct;
}

export async function getProductById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      product_images(*),
      product_colors(*),
      variants(*),
      reviews(
        *,
        user:profiles(name, avatar_url)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data as DbProduct;
}

export async function getRelatedProducts(productId: string, categoryId: string | null, limit = 4) {
  const supabase = await createClient();
  
  let query = supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .eq('status', 'published')
    .neq('id', productId)
    .limit(limit);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching related products:', error);
    return [];
  }

  return data as DbProduct[];
}

export async function getFeaturedProducts(limit = 8) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .eq('status', 'published')
    .eq('is_on_sale', true)
    .gte('average_rating', 4.5)
    .order('average_rating', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data as DbProduct[];
}

export async function getNewProducts(limit = 8) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .eq('status', 'published')
    .eq('is_new', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching new products:', error);
    return [];
  }

  return data as DbProduct[];
}

export async function getBestsellers(limit = 8) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .eq('status', 'published')
    .eq('is_bestseller', true)
    .order('review_count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching bestsellers:', error);
    return [];
  }

  return data as DbProduct[];
}

// ============================================
// CATEGORIES
// ============================================

export async function getCategories() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data as DbCategory[];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data as DbCategory;
}

// ============================================
// COLLECTIONS
// ============================================

export async function getCollections() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  return data as DbCollection[];
}

export async function getFeaturedCollections(limit = 4) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('is_featured', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching featured collections:', error);
    return [];
  }

  return data as DbCollection[];
}

// ============================================
// REVIEWS
// ============================================

export async function getProductReviews(productId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data as DbReview[];
}

// ============================================
// SITE SETTINGS
// ============================================

export async function getSiteSettings() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 'default')
    .single();

  if (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }

  return data as DbSiteSettings;
}

// ============================================
// TEAM MEMBERS
// ============================================

export async function getTeamMembers() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return data as DbTeamMember[];
}

// ============================================
// MILESTONES
// ============================================

export async function getMilestones() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('is_active', true)
    .order('year', { ascending: true });

  if (error) {
    console.error('Error fetching milestones:', error);
    return [];
  }

  return data as DbMilestone[];
}

// ============================================
// FAQs
// ============================================

export async function getFaqs(category?: string) {
  const supabase = await createClient();
  
  let query = supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return data as DbFaq[];
}

// ============================================
// BLOG POSTS
// ============================================

export async function getBlogPosts(options?: {
  category?: string;
  limit?: number;
  featured?: boolean;
}) {
  const supabase = await createClient();
  
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data as DbBlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data as DbBlogPost;
}

// ============================================
// HERO BANNERS
// ============================================

export async function getHeroBanners() {
  const supabase = await createClient();
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('hero_banners')
    .select('*')
    .eq('is_active', true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching hero banners:', error);
    return [];
  }

  return data as DbHeroBanner[];
}

// ============================================
// TESTIMONIALS
// ============================================

export async function getTestimonials(featured = false) {
  const supabase = await createClient();
  
  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (featured) {
    query = query.eq('is_featured', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data as DbTestimonial[];
}

// ============================================
// NAVIGATION
// ============================================

export async function getNavItems(location: 'header' | 'footer' | 'mobile') {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('nav_items')
    .select('*')
    .eq('menu_location', location)
    .eq('is_active', true)
    .is('parent_id', null)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching nav items:', error);
    return [];
  }

  // Fetch children for each parent
  const itemsWithChildren = await Promise.all(
    (data as DbNavItem[]).map(async (item) => {
      const { data: children } = await supabase
        .from('nav_items')
        .select('*')
        .eq('parent_id', item.id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      return {
        ...item,
        children: children as DbNavItem[] ?? [],
      };
    })
  );

  return itemsWithChildren;
}
