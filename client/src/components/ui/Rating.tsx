interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };

export default function Rating({ value, onChange, size = 'md' }: RatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          disabled={!onChange}
          className={`${sizes[size]} ${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform disabled:opacity-100`}
        >
          {star <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
}
