import { useCallback, useState } from 'react';

import { iconElements } from '@zenkigen-component/icons';
import clsx from 'clsx';

type Props = {
  value: number;
  isEditable?: boolean;
  onChangeRating?: (newRating: number) => void | null;
  size?: 'regular' | 'large';
};

export function Rating({ value, isEditable = false, onChangeRating, size }: Props) {
  const maxRating = 5;
  const [currentRating, setCurrentRating] = useState(value);

  const handleChangeRating = useCallback(
    (newRating: number) => {
      if (isEditable) {
        setCurrentRating(newRating);
        if (onChangeRating) {
          onChangeRating(newRating);
        }
      }
    },
    [isEditable, onChangeRating],
  );

  const starClasses = clsx({ 'w-6 h-6': size === 'large', 'w-4 h-4': size === 'regular' });
  const ratingStars = [];
  for (let i = 1; i < maxRating + 1; i++) {
    const color = i <= currentRating ? 'fill-support-supportWarning' : 'fill-icon-icon02';
    ratingStars.push(
      <span key={i} onClick={() => handleChangeRating(i)} className={clsx(color, starClasses)}>
        {iconElements['star-filled']}
      </span>,
    );
  }

  return <span className="flex flex-row">{ratingStars}</span>;
}
