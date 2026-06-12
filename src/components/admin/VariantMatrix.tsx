"use client";
import { useState } from "react";
import type { Variant } from "@/types";

interface Props {
  variants: Variant[];
  onVariantsChange: (variants: Variant[]) => void;
}

export function VariantMatrix({ variants, onVariantsChange }: Props) {
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  const addVariant = () => {
    if (!newColor && !newSize) return;

    const newVariant: Variant = {
      id: crypto.randomUUID(),
      product_id: "",
      sku: `SKU-${Date.now()}`,
      color: newColor || null,
      size: newSize || null,
      price: null,
      stock: 0,
      is_default: variants.length === 0,
    };

    onVariantsChange([...variants, newVariant]);
    setNewColor("");
    setNewSize("");
  };

  const updateVariant = (id: string, updates: Partial<Variant>) => {
    onVariantsChange(
      variants.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const removeVariant = (id: string) => {
    onVariantsChange(variants.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Add new variant */}
      <div className="flex gap-4">
        <input
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="Color (e.g., Natural Walnut)"
          className="input flex-1"
        />
        <input
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
          placeholder="Size (e.g., 180cm)"
          className="input flex-1"
        />
        <button
          type="button"
          onClick={addVariant}
          className="rounded-btn border border-walnut px-4 text-sm"
        >
          Add Variant
        </button>
      </div>

      {/* Variants table */}
      {variants.length > 0 && (
        <div className="overflow-x-auto rounded-btn border border-walnut/10">
          <table className="w-full text-sm">
            <thead className="bg-walnut/5">
              <tr>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-left">Size</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Price Override</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Default</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => (
                <tr key={v.id} className="border-t border-walnut/5">
                  <td className="px-4 py-3">{v.color || "—"}</td>
                  <td className="px-4 py-3">{v.size || "—"}</td>
                  <td className="px-4 py-3">
                    <input
                      value={v.sku}
                      onChange={(e) => updateVariant(v.id, { sku: e.target.value })}
                      className="input !py-1.5"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={v.price ?? ""}
                      onChange={(e) =>
                        updateVariant(v.id, {
                          price: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      placeholder="Use base"
                      className="input !py-1.5 w-28"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={v.stock}
                      onChange={(e) =>
                        updateVariant(v.id, { stock: Number(e.target.value) })
                      }
                      className="input !py-1.5 w-20"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="radio"
                      name="default-variant"
                      checked={v.is_default}
                      onChange={() => {
                        onVariantsChange(
                          variants.map((vr) => ({
                            ...vr,
                            is_default: vr.id === v.id,
                          }))
                        );
                      }}
                      className="accent-walnut"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => removeVariant(v.id)}
                      className="text-rose hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {variants.length === 0 && (
        <p className="text-center text-sm text-muted py-8">
          No variants yet. Add color or size variations above.
        </p>
      )}
    </div>
  );
}
