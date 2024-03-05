import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { AnimationEvent } from 'react';
import { useContext } from 'react';

import { SelectItem } from './select-item';
import { SelectSortContext } from './select-sort-context';
import type { SortOrder } from './type';

type Props = {
  size: 'x-small' | 'small' | 'medium' | 'large';
  variant: 'text' | 'outline';
  sortOrder: SortOrder;
  onClickItem: (value: SortOrder) => void;
  onClickDeselect?: () => void;
};

export function SelectList({ size, variant, sortOrder, onClickItem, onClickDeselect }: Props) {
  const { setIsOptionListOpen, isRemoving = false, setIsRemoving } = useContext(SelectSortContext);

  const handleAnimationEnd = (e: AnimationEvent<HTMLElement>) => {
    if (window.getComputedStyle(e.currentTarget).opacity === '0') {
      setIsRemoving(false);
      setIsOptionListOpen(false);
    }
  };

  const listClasses = clsx(
    'absolute z-dropdown w-max overflow-y-auto rounded bg-uiBackground01 py-2 shadow-floatingShadow',
    {
      'top-7': size === 'x-small' || size === 'small',
      'top-9': size === 'medium',
      'top-11': size === 'large',
      'border-solid border border-uiBorder01': variant === 'outline',
      [`animate-appear-in`]: !isRemoving,
      ['animate-appear-out opacity-0']: isRemoving,
    },
  );

  const deselectButtonClasses = clsx(
    'typography-label2regular flex h-8 w-full items-center px-3 text-interactive02 transition-colors duration-hover-out hover:bg-hover02 hover:transition-colors hover:duration-hover-over active:bg-active02',
    focusVisible.inset,
  );

  return (
    <ul className={listClasses} onAnimationEnd={handleAnimationEnd}>
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
