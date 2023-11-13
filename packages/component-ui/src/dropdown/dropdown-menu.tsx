import clsx from 'clsx';
import { CSSProperties, PropsWithChildren, useContext } from 'react';

import { DropdownContext } from './dropdown-context';
import { DropdownHorizontalAlign, DropdownVerticalPosition } from './type';

type Props = {
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
}: PropsWithChildren<Props>) {
  const { isVisible, isDisabled, targetDimensions, variant } = useContext(DropdownContext);
  const wrapperClasses = clsx(
    'absolute z-dropdown w-max overflow-y-auto rounded bg-background-uiBackground01 shadow-floatingShadow',
    {
      'border-solid border border-border-uiBorder01': variant === 'outline',
      'py-1': !isNoPadding,
      'left-0': horizontalAlign === 'left',
      'right-0': horizontalAlign === 'right',
      'left-auto': horizontalAlign === 'center',
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
