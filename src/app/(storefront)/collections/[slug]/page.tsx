import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: category } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!category) return { title: "Collection Not Found" };

  return {
    title: `${category.name} Collection | Maison Furniture`,
    description: category.description,
  };
}

export const revalidate = 3600; // ISR: 1 hour

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !category) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("*, product_images(url)")
    .eq("category_id", category.id)
    .eq("status", "published")
    .order("is_bestseller", { ascending: false })
    .limit(20);

  return (
    <main className="pt-28 pb-24">
      {/* Hero */}
      {category.image_url && (
        <div className="relative h-[40vh] min-h-[300px]">
          <Image
            src={category.image_url}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/40" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <h1 className="font-display text-4xl text-ivory md:text-5xl">
                {category.name}
              </h1>
              {category.description && (
                <p className="mt-4 max-w-lg text-ivory/80">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        {!category.image_url && (
          <header className="mb-12">
            <p className="eyebrow">Collection</p>
            <h1 className="mt-2 font-display text-4xl">{category.name}</h1>
            {category.description && (
              <p className="mt-4 max-w-2xl text-muted">{category.description}</p>
            )}
          </header>
        )}

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <a
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-card bg-white">
                <Image
                  src={product.product_images?.[0]?.url}
                  alt={product.name}
                  width={400}
                  height={533}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-lg">{product.name}</h3>
              <p className="mt-1 text-sm text-muted">{product.material}</p>
              <p className="mt-1 text-sm">
                NPR {product.price.toLocaleString()}
              </p>
            </a>
          ))}
        </div>

        {(!products || products.length === 0) && (
          <p className="text-center text-muted py-16">
            No products in this collection yet.
          </p>
        )}
      </div>
    </main>
  );
}
