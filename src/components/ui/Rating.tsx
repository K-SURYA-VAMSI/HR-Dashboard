'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Rating({ value, max = 5, size = 'md', className }: RatingProps) {
  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < value;
        return (
          <span
            key={index}
            className={clsx('text-yellow-400', {
              'h-4 w-4': size === 'sm',
              'h-5 w-5': size === 'md',
              'h-6 w-6': size === 'lg',
            })}
          >
            {isFilled ? (
              <StarIcon className="h-full w-full" />
            ) : (
              <StarOutlineIcon className="h-full w-full" />
            )}
          </span>
        );
      })}
    </div>
  );
} 