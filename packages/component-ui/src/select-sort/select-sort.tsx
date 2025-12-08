import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { useCallback, useRef, useState } from 'react';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';
import { SelectList } from './select-list';
import type { SortOrder } from './type';

type Props = {
  /** ボタンとドロップダウンの高さ・タイポグラフィを切り替えるサイズ。 */
  size?: 'x-small' | 'small' | 'medium' | 'large';
  /** スタイルバリエーション。 */
  variant?: 'outline' | 'text';
  /** コンポーネント全体の幅。省略時は内容幅に合わせる。 */
  width?: CSSProperties['width'];
  /** トリガーボタンに表示する列名。 */
  label: string;
  /** 現在の並び替え方向。外部状態で `'ascend' | 'descend' | null` を制御する。 */
  sortOrder: SortOrder;
  /** true の場合はボタンやリストの操作を無効化する。 */
  isDisabled?: boolean;
  /** この列が現在のソートキーであるかどうか。矢印アイコンと選択スタイルを切り替える。 */
  isSortKey?: boolean;
  /** 並び替え方向を選択したときに呼ばれるコールバック。 */
  onChange?: (value: SortOrder) => void;
  /** ドロップダウン内の「選択解除」をクリックしたときに呼ばれるコールバック。 */
  onClickDeselect?: () => void;
};

export function SelectSort({
  size = 'medium',
  variant = 'outline',
  width,
  label,
  sortOrder,
  isDisabled = false,
  isSortKey = false,
  onChange,
  onClickDeselect,
}: Props) {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(targetRef, () => setIsOptionListOpen(false));

  const handleClickToggle = () => setIsOptionListOpen((prev) => !prev);
  const handleClickItem = useCallback(
    (value: SortOrder) => {
      onChange?.(value);
      setIsOptionListOpen(false);
    },
    [onChange],
  );

  const wrapperClasses = clsx('relative flex shrink-0 items-center gap-1 rounded', {
    'h-6': size === 'x-small' || size === 'small',
    'h-8': size === 'medium',
    'h-10': size === 'large',
    'cursor-not-allowed': isDisabled,
  });

  const buttonClasses = clsx(
    'flex size-full items-center rounded',
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    {
      [buttonColors[variant].selected]: isSortKey,
      [buttonColors[variant].base]: !isSortKey,
      'px-2': size === 'x-small' || size === 'small',
      'px-4': size === 'medium' || size === 'large',
      'pointer-events-none': isDisabled,
    },
  );

  const labelClasses = clsx('truncate', {
    'typography-label12regular': size === 'x-small',
    'typography-label14regular': size === 'small' || size === 'medium',
    'typography-label16regular': size === 'large',
    'mr-1': size === 'x-small',
    'mr-2': size !== 'x-small',
  });

  return (
    <div className={wrapperClasses} style={{ width }} ref={targetRef}>
      <button className={buttonClasses} type="button" onClick={handleClickToggle} disabled={isDisabled}>
        <div className={labelClasses}>{label}</div>
        <div className="ml-auto flex items-center">
          {isSortKey ? (
            <Icon
              name={sortOrder === 'ascend' ? 'arrow-up' : 'arrow-down'}
              size={size === 'large' ? 'medium' : 'small'}
            />
          ) : (
            <Icon
              name={isOptionListOpen ? 'angle-small-up' : 'angle-small-down'}
              size={size === 'large' ? 'medium' : 'small'}
            />
          )}
        </div>
      </button>
      {isOptionListOpen && !isDisabled && (
        <SelectList
          size={size}
          variant={variant}
          sortOrder={sortOrder}
          onClickItem={handleClickItem}
          onClickDeselect={onClickDeselect}
        />
      )}
    </div>
  );
}
