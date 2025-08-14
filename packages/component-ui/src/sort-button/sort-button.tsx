import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { useCallback } from 'react';

import { Icon } from '../icon';
import type { SortOrder } from './type';

type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'type' | 'disabled' | 'onClick' | 'aria-disabled' | 'aria-label'
> & {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  width?: CSSProperties['width'];
  label: string;
  sortOrder: SortOrder;
  isDisabled?: boolean;
  'aria-label': string;
  onClick?: () => void;
};

export function SortButton({
  size = 'medium',
  width,
  label,
  sortOrder,
  isDisabled = false,
  onClick,
  'aria-label': ariaLabel,
  ...rest
}: Props) {
  const handleClick = useCallback(() => {
    if (isDisabled || !onClick) return;

    onClick();
  }, [isDisabled, onClick]);

  // アイコン名の決定
  const getIconName = () => {
    if (sortOrder === 'ascend') return 'arrow-up';
    if (sortOrder === 'descend') return 'arrow-down';

    return 'angle-small-down';
  };

  const wrapperClasses = clsx('relative flex shrink-0 items-center gap-1 rounded', {
    'h-6': size === 'x-small' || size === 'small',
    'h-8': size === 'medium',
    'h-10': size === 'large',
    'cursor-not-allowed': isDisabled,
  });

  const buttonClasses = clsx(
    'flex size-full items-center rounded',
    buttonColors.text.hover,
    buttonColors.text.active,
    buttonColors.text.disabled,
    focusVisible.normal,
    {
      [buttonColors.text.selected]: !isDisabled && sortOrder !== null, // ソート状態時は選択状態のスタイル
      [buttonColors.text.base]: sortOrder === null, // ソートなし時は通常のスタイル
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
    <div className={wrapperClasses} style={{ width }}>
      <button
        className={buttonClasses}
        {...rest}
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
      >
        <div className={labelClasses}>{label}</div>
        <div className="ml-auto flex items-center">
          <Icon name={getIconName()} size={size === 'large' ? 'medium' : 'small'} />
        </div>
      </button>
    </div>
  );
}
