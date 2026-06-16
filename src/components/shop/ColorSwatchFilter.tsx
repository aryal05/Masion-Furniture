'use client';

import { ColorOption } from '@/types';

interface ColorSwatchFilterProps {
  colors: ColorOption[];
  selectedColor?: string;
  onSelect: (color: string | undefined) => void;
}

export function ColorSwatchFilter({ colors, selectedColor, onSelect }: ColorSwatchFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(undefined)}
        className={`
          w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors
          ${!selectedColor ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-line hover:border-primary'}
        `}
        aria-label="All colors"
      >
        <span className="text-xs text-muted">All</span>
      </button>
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onSelect(color.name)}
          className={`
            w-8 h-8 rounded-full border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            ${selectedColor === color.name ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-line hover:border-primary'}
          `}
          style={{ backgroundColor: color.hex }}
          aria-label={color.name}
          title={color.name}
        />
      ))}
    </div>
  );
}
