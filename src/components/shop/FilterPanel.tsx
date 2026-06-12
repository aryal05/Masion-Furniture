"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { PriceRangeSlider } from "./PriceRangeSlider";
import type { ShopFilters } from "@/lib/filters";

const MATERIALS = [
  { value: "teak", label: "Teak", swatch: "#8B5E3C" },
  { value: "walnut", label: "Walnut", swatch: "#3B2314" },
  { value: "oak", label: "Oak", swatch: "#C9A878" },
  { value: "rattan", label: "Rattan", swatch: "#D4B483" },
  { value: "linen", label: "Linen", swatch: "#E8E0D4" },
  { value: "velvet", label: "Velvet", swatch: "#6B4E5B" },
];

const COLORS = [
  { value: "natural", label: "Natural", hex: "#C9A878" },
  { value: "walnut", label: "Walnut Brown", hex: "#3B2314" },
  { value: "ivory", label: "Ivory", hex: "#F8F5F0" },
  { value: "charcoal", label: "Charcoal", hex: "#1A1714" },
  { value: "sage", label: "Sage", hex: "#4A7C59" },
  { value: "terracotta", label: "Terracotta", hex: "#C0504A" },
];

interface Props {
  filters: ShopFilters;
  setFilters: (p: Partial<ShopFilters>) => void;
  toggleArrayValue: (key: "materials" | "colors", v: string) => void;
}

export function FilterPanel({ filters, setFilters, toggleArrayValue }: Props) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories")
        .select("name, slug").is("parent_id", null).order("sort_order");
      return data ?? [];
    },
    staleTime: Infinity,
  });

  return (
    <div className="space-y-8">
      {/* Category */}
      <FilterSection title="Category">
        <ul className="space-y-2">
          {categories?.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() =>
                  setFilters({ category: filters.category === cat.slug ? null : cat.slug })
                }
                aria-pressed={filters.category === cat.slug}
                className={`text-sm transition-colors hover:text-walnut ${
                  filters.category === cat.slug
                    ? "text-walnut font-medium"
                    : "text-muted"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <PriceRangeSlider
          min={0} max={500000}
          valueMin={filters.priceMin ?? 0}
          valueMax={filters.priceMax ?? 500000}
          onCommit={(min, max) =>
            setFilters({
              priceMin: min === 0 ? null : min,
              priceMax: max === 500000 ? null : max,
            })
          }
        />
      </FilterSection>

      {/* Material — swatch checkboxes */}
      <FilterSection title="Material">
        <div className="space-y-2.5">
          {MATERIALS.map((m) => (
            <label key={m.value} className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={filters.materials.includes(m.value)}
                onChange={() => toggleArrayValue("materials", m.value)}
                className="h-4 w-4 accent-walnut"
              />
              <span
                className="h-4 w-4 rounded-sm border border-walnut/15"
                style={{ backgroundColor: m.swatch }}
                aria-hidden
              />
              {m.label}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Color — circular swatches */}
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => {
            const active = filters.colors.includes(c.value);
            return (
              <button
                key={c.value}
                title={c.label}
                aria-label={`Filter by color ${c.label}`}
                aria-pressed={active}
                onClick={() => toggleArrayValue("colors", c.value)}
                className={`h-8 w-8 rounded-full border transition-all duration-200 ${
                  active
                    ? "ring-2 ring-walnut ring-offset-2 ring-offset-ivory border-transparent"
                    : "border-walnut/15 hover:scale-110"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Rating">
        {[4, 3, 2].map((stars) => (
          <button
            key={stars}
            onClick={() => setFilters({ rating: filters.rating === stars ? null : stars })}
            aria-pressed={filters.rating === stars}
            className={`flex items-center gap-2 py-1 text-sm ${
              filters.rating === stars ? "text-walnut font-medium" : "text-muted"
            }`}
          >
            <span className="text-brass">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</span>
            &nbsp;& up
          </button>
        ))}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex cursor-pointer items-center justify-between text-sm">
          In stock only
          <button
            role="switch"
            aria-checked={filters.inStock}
            onClick={() => setFilters({ inStock: !filters.inStock })}
            className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
              filters.inStock ? "bg-walnut" : "bg-walnut/15"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ease-luxe ${
                filters.inStock ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </label>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="eyebrow !text-charcoal mb-4">{title}</h3>
      {children}
      <div className="mt-6 h-px bg-walnut/10" />
    </section>
  );
}