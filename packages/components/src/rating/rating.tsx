import { ReactNode, useCallback, useEffect, useState } from 'react';

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
  const [ratingStars, setRatingStars] = useState([] as ReactNode[]);
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

  useEffect(() => {
    const newRatingStars = [] as ReactNode[];
    for (let i = 1; i < maxRating + 1; i++) {
      const color = i <= currentRating ? 'fill-support-supportWarning' : 'fill-icon-icon02';
      newRatingStars.push(
        <span
          key={i}
          onClick={() => handleChangeRating(i)}
          className={clsx(color, { 'w-6 h-6': size === 'large', 'w-4 h-4': size === 'regular' })}
        >
          {iconElements['star-filled']}
        </span>,
      );
    }
    setRatingStars(newRatingStars);
  }, [currentRating, handleChangeRating, size]);

  return <span className="flex flex-row">{ratingStars}</span>;
}
