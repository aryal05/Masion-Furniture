"use client";
import type { Variant } from "@/types";

interface Props {
  variants: Variant[];
  selected: Variant | null;
  onSelect: (variant: Variant) => void;
}

export function VariantSelector({ variants, selected, onSelect }: Props) {
  // Group variants by attribute type
  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))];
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];

  // Find available options based on current selection
  const getAvailableVariant = (color?: string, size?: string) => {
    return variants.find(
      (v) =>
        (color ? v.color === color : true) &&
        (size ? v.size === size : true) &&
        v.stock > 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Color selector */}
      {colors.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium">
            Color: <span className="text-muted">{selected?.color}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const variant = variants.find((v) => v.color === color);
              const isSelected = selected?.color === color;
              const isAvailable = variants.some(
                (v) => v.color === color && v.stock > 0
              );

              return (
                <button
                  key={color}
                  onClick={() => {
                    const v = getAvailableVariant(color!, selected?.size ?? undefined);
                    if (v) onSelect(v);
                  }}
                  disabled={!isAvailable}
                  aria-pressed={isSelected}
                  className={`
                    rounded-btn border px-4 py-2.5 text-sm transition-all
                    ${isSelected ? "border-walnut bg-walnut text-ivory" : "border-walnut/20 hover:border-walnut"}
                    ${!isAvailable ? "opacity-40 line-through cursor-not-allowed" : ""}
                  `}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size selector */}
      {sizes.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium">
            Size: <span className="text-muted">{selected?.size}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isSelected = selected?.size === size;
              const isAvailable = variants.some(
                (v) =>
                  v.size === size &&
                  (selected?.color ? v.color === selected.color : true) &&
                  v.stock > 0
              );

              return (
                <button
                  key={size}
                  onClick={() => {
                    const v = getAvailableVariant(selected?.color ?? undefined, size!);
                    if (v) onSelect(v);
                  }}
                  disabled={!isAvailable}
                  aria-pressed={isSelected}
                  className={`
                    min-w-[60px] rounded-btn border px-4 py-2.5 text-sm transition-all
                    ${isSelected ? "border-walnut bg-walnut text-ivory" : "border-walnut/20 hover:border-walnut"}
                    ${!isAvailable ? "opacity-40 line-through cursor-not-allowed" : ""}
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
