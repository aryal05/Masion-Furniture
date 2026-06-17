import { Product, Filter } from '@/types';
import type { SortOption } from './filters';

/**
 * Filter products based on the provided filter criteria
 * Pure function - testable and side-effect free
 */
export function filterProducts(products: Product[], filters: Filter): Product[] {
  return products.filter((product) => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }

    // Material filter
    if (filters.material && product.material !== filters.material) {
      return false;
    }

    // Rating filter
    if (filters.rating && product.rating < filters.rating) {
      return false;
    }

    // In stock filter
    if (filters.inStock && !product.inStock) {
      return false;
    }

    // Free shipping filter
    if (filters.freeShipping && !product.freeShipping) {
      return false;
    }

    // On sale filter
    if (filters.onSale && !product.isOnSale) {
      return false;
    }

    return true;
  });
}

/**
 * Sort products based on the provided sort option
 * Pure function - testable and side-effect free
 */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt || b.created_at || 0).getTime() - new Date(a.createdAt || a.created_at || 0).getTime()
      );
    
    case 'rating':
      return sorted.sort((a, b) => {
        // First sort by rating, then by review count for tiebreaker
        const ratingA = a.rating || a.average_rating || 0;
        const ratingB = b.rating || b.average_rating || 0;
        if (ratingB !== ratingA) {
          return ratingB - ratingA;
        }
        const reviewCountA = a.reviewCount || a.review_count || 0;
        const reviewCountB = b.reviewCount || b.review_count || 0;
        return reviewCountB - reviewCountA;
      });
    
    case 'bestselling':
      // Sort by a combination of sales and rating
      return sorted.sort((a, b) => {
        const scoreA = (a.rating || a.average_rating || 0) * (a.reviewCount || a.review_count || 1);
        const scoreB = (b.rating || b.average_rating || 0) * (b.reviewCount || b.review_count || 1);
        return scoreB - scoreA;
      });
    
    case 'featured':
    default:
      // Return products as-is (they're already in featured order)
      return sorted;
  }
}

/**
 * Paginate products
 * Pure function - testable and side-effect free
 */
export function paginateProducts(products: Product[], page: number, pageSize: number = 12): Product[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return products.slice(startIndex, endIndex);
}

/**
 * Get total pages for pagination
 */
export function getTotalPages(totalItems: number, pageSize: number = 12): number {
  return Math.ceil(totalItems / pageSize);
}

/**
 * Get price range from products
 */
export function getPriceRange(products: Product[]): [number, number] {
  if (products.length === 0) return [0, 5000];
  
  const prices = products.map(p => p.price);
  return [Math.min(...prices), Math.max(...prices)];
}

/**
 * Get available materials from products
 */
export function getAvailableMaterials(products: Product[]): string[] {
  const materials = new Set(products.map(p => p.material));
  return Array.from(materials).sort();
}

/**
 * Get available categories from products
 */
export function getAvailableCategories(products: Product[]): string[] {
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories).sort();
}

/**
 * Get filter count (number of active filters)
 */
export function getFilterCount(filters: Filter): number {
  let count = 0;
  if (filters.category) count++;
  if (filters.priceRange) count++;
  if (filters.material) count++;
  if (filters.rating) count++;
  if (filters.inStock) count++;
  if (filters.freeShipping) count++;
  if (filters.onSale) count++;
  return count;
}

/**
 * Check if any filters are active
 */
export function hasActiveFilters(filters: Filter): boolean {
  return getFilterCount(filters) > 0;
}

/**
 * Clear specific filter
 */
export function clearFilter(filters: Filter, key: keyof Filter): Filter {
  const newFilters = { ...filters };
  delete newFilters[key];
  return newFilters;
}
