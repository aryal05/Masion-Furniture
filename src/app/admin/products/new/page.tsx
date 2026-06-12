"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { ProductForm } from "@/components/admin/ProductForm";
import { useUI } from "@/stores/ui";

export default function NewProductPage() {
  const router = useRouter();
  const addToast = useUI((s) => s.addToast);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { data: product, error } = await supabase
        .from("products")
        .insert({
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
          average_rating: 0,
          review_count: 0,
          total_stock: 0,
        })
        .select()
        .single();

      if (error) throw error;

      addToast({ type: "success", message: "Product created successfully" });
      router.push("/admin/products");
    } catch (error: any) {
      addToast({
        type: "error",
        message: error.message ?? "Failed to create product",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="text-sm text-muted hover:text-walnut"
        >
          ← Back to Products
        </button>
        <h1 className="mt-2 font-display text-3xl">New Product</h1>
      </div>

      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
