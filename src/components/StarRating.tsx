import { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  maxRating?: number;
  size?: number;
  readonly?: boolean;
}

export function StarRating({
  rating,
  onRatingChange,
  maxRating = 5,
  size = 24,
  readonly = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const value = i + 1;
        const isFilled = value <= (hoverRating || rating);

        return (
          <motion.button
            key={i}
            type="button"
            whileHover={{ scale: readonly ? 1 : 1.1 }}
            whileTap={{ scale: readonly ? 1 : 0.95 }}
            onClick={() => handleClick(value)}
            onMouseEnter={() => !readonly && setHoverRating(value)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            disabled={readonly}
            className={readonly ? 'cursor-default' : 'cursor-pointer'}
          >
            <Star
              size={size}
              className={`${
                isFilled
                  ? 'fill-[hsl(var(--secondary))] text-[hsl(var(--secondary))] drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]'
                  : 'fill-none text-muted-foreground'
              } transition-colors`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
