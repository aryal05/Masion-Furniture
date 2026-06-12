'use client';

import { m } from 'framer-motion';
import { useParams } from 'next/navigation';
import { getProductById, products } from '@/lib/products';
import { useState } from 'react';
import { useCart } from '@/stores/cart';
import CartCount from '@/components/CartCount';

export default function ProductDetail() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCart((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <h1 className="text-2xl">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      variantId: product.id,
      productId: product.id,
      name: product.name,
      variantLabel: 'Standard',
      image: product.image,
      price: product.price,
      quantity,
      maxStock: 10
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <m.a
              href="/"
              className="text-2xl font-light tracking-[0.2em]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              MAISON
            </m.a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/collections" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Collections</a>
              <a href="/about" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">About</a>
              <a href="/craftsmanship" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Craftsmanship</a>
              <a href="/contact" className="text-sm tracking-widest text-neutral-400 hover:text-amber-400 transition-colors">Contact</a>
            </div>
            <a href="/cart" className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <CartCount />
            </a>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-neutral-400 mb-8">
            <a href="/" className="hover:text-amber-400">Home</a>
            <span className="mx-2">/</span>
            <a href="/collections" className="hover:text-amber-400">Collections</a>
            <span className="mx-2">/</span>
            <span className="text-amber-400">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="px-4 md:px-8 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square bg-neutral-800 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </m.div>

          {/* Product Info */}
          <m.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-amber-400 tracking-widest text-sm mb-2">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-light tracking-[0.1em] mb-4">{product.name}</h1>
            <p className="text-3xl text-amber-400 font-light mb-6">${product.price.toLocaleString()}</p>
            <p className="text-neutral-300 leading-relaxed mb-8">{product.description}</p>

            {/* Materials */}
            <div className="mb-8">
              <h3 className="text-sm tracking-widest mb-3 text-neutral-400">MATERIALS</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <span key={index} className="px-3 py-1 border border-neutral-700 text-sm text-neutral-300">
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="mb-8">
              <h3 className="text-sm tracking-widest mb-3 text-neutral-400">DIMENSIONS</h3>
              <p className="text-neutral-300">{product.dimensions}</p>
            </div>

            {/* Care Instructions */}
            <div className="mb-8">
              <h3 className="text-sm tracking-widest mb-3 text-neutral-400">CARE INSTRUCTIONS</h3>
              <p className="text-neutral-300">{product.care}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-8">
              <span className={`inline-flex items-center gap-2 ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                <span className="w-2 h-2 rounded-full bg-current" />
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-neutral-700">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-neutral-800 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-3 min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-neutral-800 transition-colors"
                >
                  +
                </button>
              </div>
              <m.button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 font-medium tracking-widest transition-colors ${
                  addedToCart 
                    ? 'bg-green-500 text-neutral-950' 
                    : product.inStock 
                      ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400' 
                      : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                }`}
                whileHover={product.inStock && !addedToCart ? { scale: 1.02 } : {}}
                whileTap={product.inStock && !addedToCart ? { scale: 0.98 } : {}}
              >
                {addedToCart ? 'ADDED TO CART' : product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </m.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                2-Year Warranty
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-Day Returns
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure Payment
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-neutral-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-light tracking-[0.2em] mb-12 text-center">RELATED PRODUCTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <m.a
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="aspect-[3/4] mb-4 relative overflow-hidden bg-neutral-800">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-light tracking-widest mb-2">{relatedProduct.name}</h3>
                  <p className="text-amber-400 font-light">${relatedProduct.price.toLocaleString()}</p>
                </m.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-16 px-4 md:px-8 lg:px-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto text-center text-neutral-500 text-sm">
          <p>&copy; 2024 MAISON. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
