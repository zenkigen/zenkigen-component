import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { MouseEvent } from 'react';
import { forwardRef } from 'react';

import { Icon } from '../icon';
import type { ListOptionItemProps } from './list.types';
import { useListContext } from './list-context';

export const ListOptionItem = forwardRef<HTMLLIElement, ListOptionItemProps>(function ListOptionItem(
  {
    children,
    id,
    isActive = false,
    isSelected = false,
    isDisabled = false,
    isError = false,
    onClick,
    onMouseEnter,
    'aria-selected': ariaSelected,
    'aria-disabled': ariaDisabled,
  },
  ref,
) {
  const { size, selectionIndicator } = useListContext('List.OptionItem');

  const classes = clsx(
    'flex w-full items-center gap-1 border-l-2 border-solid border-l-transparent pl-2.5 pr-3',
    focusVisible.inset,
    {
      // sizes
      'h-8 typography-label14regular': size === 'medium',
      'h-10 typography-label16regular': size === 'large',

      // disabled (最優先)
      'cursor-not-allowed bg-uiBackground01 text-disabled01 fill-disabled01': isDisabled,

      // selected + error
      'cursor-pointer bg-uiBackgroundError text-supportError fill-supportError': !isDisabled && isSelected && isError,

      // selected (default)
      'cursor-pointer bg-selectedUi text-interactive01 fill-interactive01': !isDisabled && isSelected && !isError,

      // active only (not selected): bg-hover02
      'cursor-pointer bg-hover02 text-interactive02 fill-icon01': !isDisabled && !isSelected && isActive,

      // base + hover
      'cursor-pointer bg-uiBackground01 text-interactive02 fill-icon01 hover:bg-hover02 active:bg-active02':
        !isDisabled && !isSelected && !isActive,

      // active accent border（selected と同時成立可）
      'border-l-interactive03': !isDisabled && isActive,
    },
  );

  const handleMouseDown = (event: MouseEvent<HTMLLIElement>) => {
    // input フォーカスを失わないため preventDefault
    event.preventDefault();
  };

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    if (isDisabled) {
      return;
    }
    onClick?.(event);
  };

  const handleMouseEnter = () => {
    if (isDisabled) {
      return;
    }
    onMouseEnter?.();
  };

  const indicator =
    selectionIndicator === 'none' ? null : (
      <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true" data-selection-indicator>
        {isSelected && !isDisabled && <Icon name="check" size="small" />}
      </span>
    );

  return (
    <li
      ref={ref}
      id={id}
      role="option"
      aria-selected={ariaSelected ?? isSelected}
      aria-disabled={ariaDisabled ?? isDisabled}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={classes}
    >
      {selectionIndicator === 'left' && indicator}
      {children}
      {selectionIndicator === 'right' && indicator}
    </li>
  );
});
