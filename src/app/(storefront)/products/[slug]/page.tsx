import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, description, images:product_images(url)")
    .eq("slug", slug)
    .single();

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Maison Furniture`,
    description: product.description,
    openGraph: {
      images: [{ url: product.images?.[0]?.url }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      images:product_images(id, url, alt, sort_order),
      variants(id, sku, color, size, price, stock, is_default),
      category:categories(id, name, slug)
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !product) notFound();

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${slug}`;

  return (
    <>
      <ProductJsonLd product={product} url={url} />
      <main className="mx-auto max-w-[1440px] px-4 pt-28 pb-24 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <ImageGallery images={product.images} productName={product.name} />
          <ProductDetails product={product} />
        </div>

        <ReviewsSection
          productId={product.id}
          averageRating={product.average_rating}
          reviewCount={product.review_count}
        />

        <RelatedProducts
          currentProductId={product.id}
          categoryId={product.category_id}
        />

        <RecentlyViewed excludeId={product.id} />
      </main>
    </>
  );
}

function ProductDetails({ product }: { product: any }) {
  return (
    <div className="lg:py-8">
      <p className="eyebrow">{product.category?.name}</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">{product.name}</h1>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-brass">
          {"★".repeat(Math.round(product.average_rating))}
          {"☆".repeat(5 - Math.round(product.average_rating))}
        </span>
        <span className="text-sm text-muted">
          ({product.review_count} reviews)
        </span>
      </div>

      <p className="mt-6 text-2xl font-display">
        NPR {product.price.toLocaleString()}
        {product.compare_at_price && (
          <span className="ml-3 text-lg text-muted line-through">
            NPR {product.compare_at_price.toLocaleString()}
          </span>
        )}
      </p>

      <p className="mt-6 text-muted leading-relaxed">{product.description}</p>

      <div className="mt-8">
        <p className="text-sm font-medium mb-2">Material</p>
        <p className="text-muted">{product.material}</p>
      </div>
    </div>
  );
}
