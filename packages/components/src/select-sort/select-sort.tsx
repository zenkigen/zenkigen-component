import { CSSProperties, useCallback, useRef, useState } from 'react';

import { buttonColors, focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';

import { SelectList } from './select-list';
import type { SortOrder } from './type';

type Props = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  variant?: 'outline' | 'text';
  width?: CSSProperties['width'];
  label: string;
  sortOrder: SortOrder;
  isDisabled?: boolean;
  isSortKey?: boolean;
  onChange?: (value: SortOrder) => void;
  onClickDeselect?: () => void;
};

export function SelectSort({
  size = 'medium',
  variant = 'outline',
  width,
  label,
  sortOrder,
  isDisabled = false,
  isSortKey,
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

  const wrapperClasses = clsx(
    'relative',
    'flex',
    'shrink-0',
    'gap-1',
    'items-center',
    'rounded',
    'bg-background-uiBackground01',
    {
      'h-6': size === 'x-small' || size === 'small',
      'h-8': size === 'medium',
      'h-10': size === 'large',
      'cursor-not-allowed': isDisabled,
    },
  );

  const buttonClasses = clsx(
    'flex',
    'items-center',
    'w-full',
    'h-full',
    'rounded',
    isSortKey ? buttonColors[variant].selected : buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    {
      'px-2': size === 'x-small' || size === 'small',
      'px-4': size === 'medium' || size === 'large',
      'pointer-events-none': isDisabled,
    },
  );

  const labelClasses = clsx(
    'flex',
    'items-center',
    size === 'x-small' ? 'mr-1' : 'mr-2',
    typography.label[
      size === 'x-small' ? 'label3regular' : size === 'small' || size === 'medium' ? 'label2regular' : 'label1regular'
    ],
  );

  return (
    <div className={wrapperClasses} style={{ width }} ref={targetRef}>
      <button className={buttonClasses} type="button" onClick={handleClickToggle} disabled={isDisabled}>
        <span className={labelClasses}>{label}</span>
        <div className="ml-auto flex items-center">
          {isSortKey ? (
            <Icon
              name={sortOrder === 'ascend' ? 'arrow-up' : 'arrow-down'}
              size={size === 'large' ? 'medium' : 'small'}
            />
          ) : (
            <Icon name={isOptionListOpen ? 'angle-small-up' : 'angle-small-down'} size="small" />
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
