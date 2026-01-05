import { iconElements } from '@zenkigen-inc/component-icons';
import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

type Props = {
  /** 表示・初期化に使用する評価値（0〜5の整数を推奨） */
  value: number;
  /** 星をクリックして評価を変更できるかを制御する */
  isEditable?: boolean;
  /** 評価が変更された際に新しい値を通知するコールバック */
  onChangeRating?: (newRating: number) => void | null;
  /** 星アイコンのサイズ（medium: 16px, large: 24px） */
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

  // 各評価のレンダリングロジックを分離（React Hooksのルールに準拠）
  const renderStar = (rating: number) => {
    const color = rating <= currentRating ? 'fill-yellow-yellow50' : 'fill-icon03';
    const IconComponent = iconElements['star-filled'];

    return (
      <button
        type="button"
        key={rating}
        onClick={() => handleChangeRating(rating)}
        className={clsx(color, starClasses)}
        disabled={!isEditable}
      >
        <IconComponent />
      </button>
    );
  };

  // 宣言的な方法で評価の配列を生成
  const ratingStars = Array.from({ length: maxRating }, (_, index) => renderStar(index + 1));

  return <span className="flex flex-row">{ratingStars}</span>;
}
