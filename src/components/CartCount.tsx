'use client';

import { useCart } from '@/stores/cart';
import { useEffect, useState } from 'react';

export default function CartCount() {
  const count = useCart((state) => state.count());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="absolute -top-2 -right-2 bg-amber-500 text-neutral-950 text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>;
  }

  return <span className="absolute -top-2 -right-2 bg-amber-500 text-neutral-950 text-xs w-5 h-5 rounded-full flex items-center justify-center">{count}</span>;
}
