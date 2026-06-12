import type { Product } from "@/types";

interface Props {
  product: Product;
  url: string;
}

export function ProductJsonLd({ product, url }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => img.url),
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "Maison Furniture",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "NPR",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: product.total_stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Maison Furniture",
      },
    },
    aggregateRating: product.review_count > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: product.average_rating,
          reviewCount: product.review_count,
        }
      : undefined,
    material: product.material,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
