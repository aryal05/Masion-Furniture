"use client";
import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ProductForm } from "@/components/admin/ProductForm";
import { useUI } from "@/stores/ui";
import type { Product } from "@/types";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const addToast = useUI((s) => s.addToast);
  const [loading, setLoading] = useState(false);

  const { data: product, isLoading: fetching } = useQuery({
    queryKey: ["admin-product", id],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*, product_images(id, url, alt, sort_order, product_id), variants(*)")
        .eq("id", id)
        .single();
      return data as Product;
    },
  });

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: data.name,
          slug: data.slug,
          description: data.description,
          material: data.material,
          price: data.price,
          compare_at_price: data.compare_at_price || null,
          category_id: data.category_id,
          status: data.status,
          is_bestseller: data.is_bestseller,
          is_new: data.is_new,
        })
        .eq("id", id);

      if (error) throw error;

      addToast({ type: "success", message: "Product updated successfully" });
      router.push("/admin/products");
    } catch (error: any) {
      addToast({
        type: "error",
        message: error.message ?? "Failed to update product",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-shimmer rounded" />
        <div className="h-96 animate-shimmer rounded-card" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-card border border-walnut/10 bg-white p-12 text-center">
        <p className="font-display text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="text-sm text-muted hover:text-walnut"
        >
          ← Back to Products
        </button>
        <h1 className="mt-2 font-display text-3xl">Edit: {product.name}</h1>
      </div>

      <ProductForm product={product} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
