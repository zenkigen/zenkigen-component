import { useCallback, useState } from 'react';

import { iconElements } from '@zenkigen-inc/component-icons';
import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

type Props = {
  value: number;
  isEditable?: boolean;
  onChangeRating?: (newRating: number) => void | null;
  size?: 'medium' | 'large';
};

export function EvaluationStar({ value, isEditable = false, onChangeRating, size = 'medium' }: Props) {
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

  const starClasses = clsx(focusVisible.inset, { 'w-6 h-6': size === 'large', 'w-4 h-4': size === 'medium' });
  const ratingStars = [];
  for (let i = 1; i < maxRating + 1; i++) {
    const color = i <= currentRating ? 'fill-support-supportWarning' : 'fill-icon-icon02';
    ratingStars.push(
      <button
        type="button"
        key={i}
        onClick={() => handleChangeRating(i)}
        className={clsx(color, starClasses)}
        disabled={!isEditable}
      >
        {iconElements['star-filled']}
      </button>,
    );
  }

  return <span className="flex flex-row">{ratingStars}</span>;
}
