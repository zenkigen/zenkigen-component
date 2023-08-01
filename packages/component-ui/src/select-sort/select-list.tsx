import { focusVisible, typography } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

import { SelectItem } from './select-item';
import type { SortOrder } from './type';

type Props = {
  size: 'x-small' | 'small' | 'medium' | 'large';
  variant: 'text' | 'outline';
  sortOrder: SortOrder;
  onClickItem: (value: SortOrder) => void;
  onClickDeselect?: () => void;
};

export function SelectList({ size, variant, sortOrder, onClickItem, onClickDeselect }: Props) {
  const listClasses = clsx(
    'z-dropdown',
    'absolute',
    'w-max',
    'py-2',
    'overflow-y-auto',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-floatingShadow',
    {
      'top-7': size === 'x-small' || size === 'small',
      'top-9': size === 'medium',
      'top-11': size === 'large',
      'border-solid border border-border-uiBorder01': variant === 'outline',
    },
  );

  const deselectButtonClasses = clsx(
    'flex',
    'items-center',
    'w-full',
    'h-8',
    'px-3',
    'hover:bg-hover-hover02',
    'active:bg-active-active02',
    'text-interactive-interactive02',
    focusVisible.inset,
    typography.label.label2regular,
  );

  return (
    <ul className={listClasses}>
      <SelectItem isSortKey={sortOrder === 'ascend'} onClickItem={() => onClickItem('ascend')}>
        昇順で並び替え
      </SelectItem>
      <SelectItem isSortKey={sortOrder === 'descend'} onClickItem={() => onClickItem('descend')}>
        降順で並び替え
      </SelectItem>
      {sortOrder !== null && onClickDeselect && (
        <li>
          <button className={deselectButtonClasses} type="button" onClick={onClickDeselect}>
            選択解除
          </button>
        </li>
      )}
    </ul>
  );
}
