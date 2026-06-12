export interface ShopFilters {
  category: string | null;
  materials: string[];
  colors: string[];
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  inStock: boolean;
  sort: SortOption;
  view: "grid" | "list";
}

export type SortOption =
  | "featured" | "price-asc" | "price-desc"
  | "newest" | "rating" | "bestselling";

export const DEFAULT_FILTERS: ShopFilters = {
  category: null, materials: [], colors: [],
  priceMin: null, priceMax: null, rating: null,
  inStock: false, sort: "featured", view: "grid",
};

export function parseFilters(params: URLSearchParams): ShopFilters {
  const price = params.get("price")?.split("-").map(Number);
  return {
    category: params.get("category"),
    materials: params.get("material")?.split(",").filter(Boolean) ?? [],
    colors: params.get("color")?.split(",").filter(Boolean) ?? [],
    priceMin: price?.[0] ?? null,
    priceMax: price?.[1] ?? null,
    rating: params.get("rating") ? Number(params.get("rating")) : null,
    inStock: params.get("inStock") === "true",
    sort: (params.get("sort") as SortOption) ?? "featured",
    view: params.get("view") === "list" ? "list" : "grid",
  };
}

export function serializeFilters(f: ShopFilters): string {
  const p = new URLSearchParams();
  if (f.category) p.set("category", f.category);
  if (f.materials.length) p.set("material", f.materials.join(","));
  if (f.colors.length) p.set("color", f.colors.join(","));
  if (f.priceMin != null || f.priceMax != null)
    p.set("price", `${f.priceMin ?? 0}-${f.priceMax ?? 999999}`);
  if (f.rating) p.set("rating", String(f.rating));
  if (f.inStock) p.set("inStock", "true");
  if (f.sort !== "featured") p.set("sort", f.sort);
  if (f.view !== "grid") p.set("view", f.view);
  return p.toString();
}

export function countActiveFilters(f: ShopFilters): number {
  return (
    (f.category ? 1 : 0) + f.materials.length + f.colors.length +
    (f.priceMin != null || f.priceMax != null ? 1 : 0) +
    (f.rating ? 1 : 0) + (f.inStock ? 1 : 0)
  );
}