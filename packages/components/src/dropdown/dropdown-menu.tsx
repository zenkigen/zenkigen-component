import clsx from 'clsx';

import { DropdownItem } from './dropdown-item';
import { DropdownItemType, HorizontalAlign, VerticalPosition } from './type';

type Props = {
  variant: 'text' | 'outline';
  items: DropdownItemType[];
  verticalPosition?: VerticalPosition;
  horizontalAlign?: HorizontalAlign;
  targetDimensions: { width: number; height: number };
  onClickItem: (onClickAction: () => void) => void;
};

export function DropdownMenu({
  variant,
  items,
  verticalPosition,
  horizontalAlign,
  targetDimensions,
  onClickItem,
}: Props) {
  const listClasses = clsx(
    'z-dropdown',
    'absolute',
    'w-max',
    'py-2',
    'overflow-y-auto',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-componentShadow',
    horizontalAlign === 'left' ? 'left-0' : horizontalAlign === 'right' ? 'right-0' : 'left-auto',
    {
      'border-solid border border-border-uiBorder01': variant === 'outline',
    },
  );

  return (
    <ul
      className={listClasses}
      style={{
        top: verticalPosition === 'bottom' ? `${targetDimensions.height + 4}px` : 'unset',
        bottom: verticalPosition === 'top' ? `${targetDimensions.height + 4}px` : 'unset',
      }}
    >
      {items.map((item) => (
        <DropdownItem key={item.id} item={item} onClickItem={() => onClickItem(item.onClick)} />
      ))}
    </ul>
  );
}
