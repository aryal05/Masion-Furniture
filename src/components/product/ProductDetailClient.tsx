'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { useCart } from '@/stores/cart';
import type { DbProduct, DbReview } from '@/types/database';

interface Props {
  product: DbProduct;
  relatedProducts: DbProduct[];
  reviews: DbReview[];
}

export function ProductDetailClient({ product, relatedProducts, reviews }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.product_colors?.[0]?.name ?? '');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const addItem = useCart((state) => state.addItem);

  const images = product.product_images?.sort((a, b) => a.sort_order - b.sort_order) ?? [];
  const colors = product.product_colors?.sort((a, b) => a.sort_order - b.sort_order) ?? [];
  const currentImage = images[selectedImageIndex]?.url ?? '/placeholder.jpg';
  const inStock = product.total_stock > 0;
  const discount = product.compare_at_price 
    ? Math.round((1 - product.price / product.compare_at_price) * 100) 
    : 0;

  const handleAddToCart = () => {
    const variant = product.variants?.find(v => v.is_default) ?? product.variants?.[0];
    addItem({
      variantId: variant?.id ?? product.id,
      productId: product.id,
      name: product.name,
      variantLabel: selectedColor || 'Standard',
      image: currentImage,
      price: product.price,
      quantity,
      maxStock: product.total_stock
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-line">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-4">
          <nav className="text-sm text-muted" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              {product.category && (
                <>
                  <li>/</li>
                  <li>
                    <Link 
                      href={`/shop?category=${product.category.slug}`} 
                      className="hover:text-primary transition-colors capitalize"
                    >
                      {product.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-ink font-medium truncate">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <m.div 
              className="aspect-square bg-card rounded-2xl overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {discount > 0 && (
                <span className="absolute top-4 left-4 z-10 bg-rose text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
              {product.is_new && (
                <span className="absolute top-4 right-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              <AnimatePresence mode="wait">
                <m.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    src={currentImage}
                    alt={images[selectedImageIndex]?.alt ?? product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </m.div>
              </AnimatePresence>
            </m.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt ?? `${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Name */}
            <div>
              {product.category && (
                <Link 
                  href={`/shop?category=${product.category.slug}`}
                  className="text-xs uppercase tracking-widest text-gold font-medium hover:text-primary transition-colors"
                >
                  {product.category.name}
                </Link>
              )}
              <h1 className="text-3xl lg:text-4xl font-black text-ink tracking-tight mt-2">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(product.average_rating) ? 'text-gold' : 'text-line'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-muted">
                {product.average_rating.toFixed(1)} ({product.review_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-ink">
                ${product.price.toLocaleString()}
              </span>
              {product.compare_at_price && (
                <span className="text-xl text-muted line-through">
                  ${product.compare_at_price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-body leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {colors.length > 0 && (
              <div>
                <label className="text-sm font-medium text-ink mb-3 block">
                  Color: <span className="text-muted">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name 
                          ? 'border-primary ring-2 ring-primary ring-offset-2' 
                          : 'border-line hover:border-muted'
                      }`}
                      style={{ backgroundColor: color.hex_code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Material */}
            {product.material && (
              <div>
                <span className="text-sm font-medium text-ink">Material: </span>
                <span className="text-sm text-muted capitalize">{product.material}</span>
              </div>
            )}

            {/* Dimensions */}
            {product.dimensions && (
              <div>
                <span className="text-sm font-medium text-ink">Dimensions: </span>
                <span className="text-sm text-muted">{product.dimensions}</span>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-rose'}`} />
              <span className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-rose'}`}>
                {inStock ? `In Stock (${product.total_stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border border-line rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-surface transition-colors text-lg"
                  disabled={!inStock}
                >
                  −
                </button>
                <span className="px-4 py-3 min-w-[60px] text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.total_stock, quantity + 1))}
                  className="px-4 py-3 hover:bg-surface transition-colors text-lg"
                  disabled={!inStock}
                >
                  +
                </button>
              </div>
              <m.button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`flex-1 py-4 px-8 rounded-full font-semibold text-sm uppercase tracking-wider transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : inStock
                      ? 'bg-primary text-white hover:bg-primary-hover'
                      : 'bg-line text-muted cursor-not-allowed'
                }`}
                whileHover={inStock && !addedToCart ? { scale: 1.02 } : {}}
                whileTap={inStock && !addedToCart ? { scale: 0.98 } : {}}
              >
                {addedToCart ? '✓ Added to Cart' : inStock ? 'Add to Cart' : 'Out of Stock'}
              </m.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-line">
              {product.free_shipping && (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Shipping
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                2-Year Warranty
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-Day Returns
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure Payment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Description & Reviews */}
      <section className="bg-card border-t border-line">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-12">
          {/* Tab Headers */}
          <div className="flex gap-8 border-b border-line mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors relative ${
                activeTab === 'description' ? 'text-primary' : 'text-muted hover:text-ink'
              }`}
            >
              Details
              {activeTab === 'description' && (
                <m.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-semibold uppercase tracking-wider transition-colors relative ${
                activeTab === 'reviews' ? 'text-primary' : 'text-muted hover:text-ink'
              }`}
            >
              Reviews ({reviews.length})
              {activeTab === 'reviews' && (
                <m.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'description' ? (
              <m.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="text-lg font-bold text-ink mb-4">Product Description</h3>
                  <p className="text-body leading-relaxed">{product.description}</p>
                </div>
                <div className="space-y-6">
                  {product.dimensions && (
                    <div>
                      <h4 className="text-sm font-semibold text-ink mb-2">Dimensions</h4>
                      <p className="text-muted">{product.dimensions}</p>
                    </div>
                  )}
                  {product.material && (
                    <div>
                      <h4 className="text-sm font-semibold text-ink mb-2">Material</h4>
                      <p className="text-muted capitalize">{product.material}</p>
                    </div>
                  )}
                  {product.care_instructions && (
                    <div>
                      <h4 className="text-sm font-semibold text-ink mb-2">Care Instructions</h4>
                      <p className="text-muted">{product.care_instructions}</p>
                    </div>
                  )}
                </div>
              </m.div>
            ) : (
              <m.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted">No reviews yet. Be the first to review this product!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-line pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {review.user?.avatar_url ? (
                              <Image
                                src={review.user.avatar_url}
                                alt={review.user.name ?? 'User'}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted">
                                {(review.user?.name ?? 'A')[0].toUpperCase()}
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-ink">{review.user?.name ?? 'Anonymous'}</p>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className={`w-4 h-4 ${star <= review.rating ? 'text-gold' : 'text-line'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-muted">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {review.title && (
                          <h4 className="font-semibold text-ink mb-2">{review.title}</h4>
                        )}
                        <p className="text-body">{review.body}</p>
                        {review.is_verified && (
                          <span className="inline-flex items-center gap-1 mt-3 text-xs text-green-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-16">
          <h2 className="text-2xl lg:text-3xl font-black text-ink tracking-tight mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => {
              const relatedImage = relatedProduct.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0];
              return (
                <m.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/product/${relatedProduct.slug}`} className="group block">
                    <div className="aspect-square bg-card rounded-xl overflow-hidden mb-3 relative">
                      {relatedImage && (
                        <Image
                          src={relatedImage.url}
                          alt={relatedImage.alt ?? relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <h3 className="font-semibold text-ink group-hover:text-primary transition-colors line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-primary font-bold mt-1">
                      ${relatedProduct.price.toLocaleString()}
                    </p>
                  </Link>
                </m.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
