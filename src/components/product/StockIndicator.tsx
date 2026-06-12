interface Props {
  stock: number;
  lowStockThreshold?: number;
}

export function StockIndicator({ stock, lowStockThreshold = 5 }: Props) {
  if (stock === 0) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-rose" />
        <span className="text-rose font-medium">Out of Stock</span>
      </div>
    );
  }

  if (stock <= lowStockThreshold) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-amber-500" />
        <span className="text-amber-600 font-medium">
          Only {stock} left in stock
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="h-2 w-2 rounded-full bg-sage" />
      <span className="text-sage font-medium">In Stock</span>
    </div>
  );
}
