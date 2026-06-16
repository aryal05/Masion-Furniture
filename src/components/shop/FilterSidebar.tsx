'use client';

import { FilterAccordion } from './FilterAccordion';
import { PriceRangeSlider } from './PriceRangeSlider';
import { RatingFilter } from './RatingFilter';
import { Checkbox } from '@/components/ui/Checkbox';
import { Filter, Material } from '@/types';
import { getPriceRange, getAvailableMaterials } from '@/lib/filterProducts';
import { products } from '@/lib/data/products';

interface FilterSidebarProps {
  filters: Filter;
  onCategoryChange: (category: string | undefined) => void;
  onPriceRangeChange: (range: [number, number] | undefined) => void;
  onMaterialChange: (material: Material | undefined) => void;
  onRatingChange: (rating: number | undefined) => void;
  onInStockChange: (inStock: boolean | undefined) => void;
  onFreeShippingChange: (freeShipping: boolean | undefined) => void;
  onOnSaleChange: (onSale: boolean | undefined) => void;
}

const priceRange = getPriceRange(products);
const availableMaterials = getAvailableMaterials(products);

export function FilterSidebar({
  filters,
  onCategoryChange,
  onPriceRangeChange,
  onMaterialChange,
  onRatingChange,
  onInStockChange,
  onFreeShippingChange,
  onOnSaleChange,
}: FilterSidebarProps) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-card rounded-2xl p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-ink mb-6">Filters</h2>

        {/* Category */}
        <FilterAccordion title="Category" defaultOpen>
          <div className="space-y-2">
            <Checkbox
              label="All Categories"
              checked={!filters.category}
              onChange={() => onCategoryChange(undefined)}
            />
            <Checkbox
              label="Chairs"
              checked={filters.category === 'chairs'}
              onChange={() => onCategoryChange(filters.category === 'chairs' ? undefined : 'chairs')}
            />
            <Checkbox
              label="Sofas"
              checked={filters.category === 'sofas'}
              onChange={() => onCategoryChange(filters.category === 'sofas' ? undefined : 'sofas')}
            />
            <Checkbox
              label="Tables"
              checked={filters.category === 'tables'}
              onChange={() => onCategoryChange(filters.category === 'tables' ? undefined : 'tables')}
            />
            <Checkbox
              label="Dining"
              checked={filters.category === 'dining'}
              onChange={() => onCategoryChange(filters.category === 'dining' ? undefined : 'dining')}
            />
            <Checkbox
              label="Bedroom"
              checked={filters.category === 'bedroom'}
              onChange={() => onCategoryChange(filters.category === 'bedroom' ? undefined : 'bedroom')}
            />
            <Checkbox
              label="Office"
              checked={filters.category === 'office'}
              onChange={() => onCategoryChange(filters.category === 'office' ? undefined : 'office')}
            />
          </div>
        </FilterAccordion>

        {/* Price Range */}
        <FilterAccordion title="Price Range">
          <PriceRangeSlider
            min={priceRange[0]}
            max={priceRange[1]}
            valueMin={filters.priceRange?.[0] ?? priceRange[0]}
            valueMax={filters.priceRange?.[1] ?? priceRange[1]}
            onCommit={(min, max) => onPriceRangeChange([min, max])}
          />
        </FilterAccordion>

        {/* Material */}
        <FilterAccordion title="Material">
          <div className="space-y-2">
            <Checkbox
              label="All Materials"
              checked={!filters.material}
              onChange={() => onMaterialChange(undefined)}
            />
            {availableMaterials.map((material) => (
              <Checkbox
                key={material}
                label={material}
                checked={filters.material === material}
                onChange={() => onMaterialChange(filters.material === material ? undefined : material as Material)}
              />
            ))}
          </div>
        </FilterAccordion>

        {/* Rating */}
        <FilterAccordion title="Rating">
          <RatingFilter
            selectedRating={filters.rating}
            onSelect={onRatingChange}
          />
        </FilterAccordion>

        {/* Availability */}
        <FilterAccordion title="Availability">
          <div className="space-y-3">
            <Checkbox
              label="In Stock"
              checked={filters.inStock || false}
              onChange={(e) => onInStockChange(e.target.checked ? true : undefined)}
            />
            <Checkbox
              label="Free Shipping"
              checked={filters.freeShipping || false}
              onChange={(e) => onFreeShippingChange(e.target.checked ? true : undefined)}
            />
            <Checkbox
              label="On Sale"
              checked={filters.onSale || false}
              onChange={(e) => onOnSaleChange(e.target.checked ? true : undefined)}
            />
          </div>
        </FilterAccordion>
      </div>
    </aside>
  );
}
