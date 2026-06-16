'use client';

interface RatingFilterProps {
  selectedRating?: number;
  onSelect: (rating: number | undefined) => void;
}

export function RatingFilter({ selectedRating, onSelect }: RatingFilterProps) {
  const ratings = [4, 3, 2, 1];

  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelect(undefined)}
        className={`
          w-full text-left px-3 py-2 rounded-lg transition-colors
          ${!selectedRating ? 'bg-primary/10 text-primary' : 'hover:bg-surface text-body'}
        `}
      >
        All ratings
      </button>
      {ratings.map((rating) => (
        <button
          key={rating}
          onClick={() => onSelect(rating)}
          className={`
            w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2
            ${selectedRating === rating ? 'bg-primary/10 text-primary' : 'hover:bg-surface text-body'}
          `}
        >
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-transparent'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm">& Up</span>
        </button>
      ))}
    </div>
  );
}
