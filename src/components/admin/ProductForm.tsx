"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImageUploader } from "./ImageUploader";
import { VariantMatrix } from "./VariantMatrix";
import { RichTextEditor } from "./RichTextEditor";
import type { Product, ProductImage } from "@/types";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  material: z.string().min(1, "Material is required"),
  price: z.number().min(0, "Price must be positive"),
  compare_at_price: z.number().nullable(),
  category_id: z.string().min(1, "Category is required"),
  status: z.enum(["draft", "published", "archived"]),
  is_bestseller: z.boolean(),
  is_new: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Props {
  product?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  loading?: boolean;
}

export function ProductForm({ product, onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ?? {
      status: "draft",
      is_bestseller: false,
      is_new: true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Info */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Basic Information</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Product Name
            </label>
            <input {...register("name")} className="input" />
            {errors.name && (
              <p className="mt-1 text-xs text-rose">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">URL Slug</label>
            <input {...register("slug")} className="input" />
            {errors.slug && (
              <p className="mt-1 text-xs text-rose">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Material</label>
            <input {...register("material")} className="input" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Category</label>
            <select {...register("category_id")} className="input">
              <option value="">Select category</option>
              <option value="living-room">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="dining">Dining</option>
              <option value="office">Office</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">
              Description
            </label>
            <RichTextEditor
              value={watch("description") ?? ""}
              onChange={(val) => setValue("description", val)}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Pricing</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Price (NPR)
            </label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="input"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Compare at Price (NPR)
            </label>
            <input
              type="number"
              {...register("compare_at_price", { valueAsNumber: true })}
              className="input"
              placeholder="Optional"
            />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Images</h2>
        <ImageUploader
          images={(Array.isArray(product?.images) && typeof product?.images[0] === 'object' 
            ? product.images 
            : []) as ProductImage[]
          }
          onImagesChange={() => {}}
        />
      </section>

      {/* Variants */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Variants</h2>
        <VariantMatrix
          variants={product?.variants ?? []}
          onVariantsChange={() => {}}
        />
      </section>

      {/* Status */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h2 className="font-display text-lg mb-6">Status & Visibility</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Status</label>
            <select {...register("status")} className="input">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("is_bestseller")}
              className="h-4 w-4 accent-walnut"
            />
            <span className="text-sm">Mark as Bestseller</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("is_new")}
              className="h-4 w-4 accent-walnut"
            />
            <span className="text-sm">Mark as New</span>
          </label>
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="rounded-btn border border-walnut/20 px-6 py-3 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-btn bg-walnut px-8 py-3 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
