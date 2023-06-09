import { ReactElement } from 'react';

import clsx from 'clsx';

import { DropdownItem } from './dropdown-item';
import { DropdownItemType, DropdownHorizontalAlign, DropdownVerticalPosition } from './type';

type Props =
  | {
      variant: 'text' | 'outline';
      verticalPosition?: DropdownVerticalPosition;
      horizontalAlign?: DropdownHorizontalAlign;
      targetDimensions: { width: number; height: number };
      onClickItem: (onClickAction: () => void) => void;
    } & ({ items: DropdownItemType[]; menuComponent?: never } | { items?: never; menuComponent: ReactElement });

export function DropdownMenu({
  variant,
  items,
  menuComponent,
  verticalPosition,
  horizontalAlign,
  targetDimensions,
  onClickItem,
}: Props) {
  const wrapperClasses = clsx(
    'z-dropdown',
    'absolute',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-componentShadow',
    'overflow-y-auto',
    horizontalAlign === 'left' ? 'left-0' : horizontalAlign === 'right' ? 'right-0' : 'left-auto',
    {
      'border-solid border border-border-uiBorder01': variant === 'outline',
    },
  );
  const menuClasses = clsx('w-max', 'py-2');

  return (
    <div
      className={wrapperClasses}
      style={{
        top: verticalPosition === 'bottom' ? `${targetDimensions.height + 4}px` : 'unset',
        bottom: verticalPosition === 'top' ? `${targetDimensions.height + 4}px` : 'unset',
      }}
    >
      {items ? (
        <ul className={menuClasses}>
          {items.map((item) => (
            <DropdownItem key={item.id} item={item} onClickItem={() => onClickItem(item.onClick)} />
          ))}
        </ul>
      ) : (
        menuComponent
      )}
    </div>
  );
}
