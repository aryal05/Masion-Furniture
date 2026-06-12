'use client';

import { useEffect } from 'react';

export default function CartUpdate() {
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('maison-cart') || '[]');
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      const cartCountElements = document.querySelectorAll('#cart-count');
      cartCountElements.forEach((el) => {
        el.textContent = count.toString();
      });
    };

    // Initial update
    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cart-updated', updateCartCount);
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return null;
}
