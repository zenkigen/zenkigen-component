import { CSSProperties, ReactNode, useContext } from 'react';

import clsx from 'clsx';

import { DropdownContext } from './dropdown-context';
import { DropdownHorizontalAlign, DropdownVerticalPosition } from './type';

type Props = {
  children: ReactNode;
  maxHeight?: CSSProperties['height'];
  isNoPadding?: boolean;
  verticalPosition?: DropdownVerticalPosition;
  horizontalAlign?: DropdownHorizontalAlign;
};

export function DropdownMenu({
  children,
  maxHeight,
  isNoPadding,
  verticalPosition = 'bottom',
  horizontalAlign = 'left',
}: Props) {
  const { isVisible, isDisabled, targetDimensions, variant } = useContext(DropdownContext);
  const wrapperClasses = clsx(
    'z-dropdown',
    'absolute',
    'w-max',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-floatingShadow',
    'overflow-y-auto',
    horizontalAlign === 'left' ? 'left-0' : horizontalAlign === 'right' ? 'right-0' : 'left-auto',
    {
      'border-solid border border-border-uiBorder01': variant === 'outline',
      'py-1': !isNoPadding,
    },
  );

  return (
    isVisible &&
    !isDisabled && (
      <ul
        className={wrapperClasses}
        style={{
          top: verticalPosition === 'bottom' ? `${targetDimensions.height + 4}px` : 'unset',
          bottom: verticalPosition === 'top' ? `${targetDimensions.height + 4}px` : 'unset',
          maxHeight,
        }}
      >
        {children}
      </ul>
    )
  );
}
