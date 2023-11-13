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
  const { isVisible, isDisabled, targetDimensions, variant, portalTargetRef } = useContext(DropdownContext);
  const wrapperClasses = clsx(
    'z-dropdown',
    'w-max',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-floatingShadow',
    'overflow-y-auto',
    horizontalAlign === 'left' ? 'left-0' : horizontalAlign === 'right' ? 'right-0' : 'left-auto',
    {
      absolute: !portalTargetRef,
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
          top: !portalTargetRef && verticalPosition === 'bottom' ? `${targetDimensions.height + 4}px` : 'unset',
          bottom: !portalTargetRef && verticalPosition === 'top' ? `${targetDimensions.height + 4}px` : 'unset',
          maxHeight,
        }}
      >
        {children}
      </ul>
    )
  );
}
