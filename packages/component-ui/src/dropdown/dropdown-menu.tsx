import clsx from 'clsx';
import type { AnimationEvent, CSSProperties, PropsWithChildren } from 'react';
import { useContext } from 'react';

import { DropdownContext } from './dropdown-context';
import type { DropdownHorizontalAlign, DropdownVerticalPosition } from './type';

type Props = {
  maxHeight?: CSSProperties['height'];
  isNoPadding?: boolean;
  verticalPosition?: DropdownVerticalPosition;
  horizontalAlign?: DropdownHorizontalAlign;
};

export function DropdownMenu({
  children,
  maxHeight,
  isNoPadding = false,
  verticalPosition = 'bottom',
  horizontalAlign = 'left',
}: PropsWithChildren<Props>) {
  const {
    isVisible,
    setIsVisible,
    isDisabled,
    targetDimensions,
    variant,
    portalTargetRef,
    isRemoving = false,
    setIsRemoving,
  } = useContext(DropdownContext);

  const handleAnimationEnd = (e: AnimationEvent<HTMLElement>) => {
    if (window.getComputedStyle(e.currentTarget).opacity === '0') {
      setIsRemoving(false);
      setIsVisible(false);
    }
  };

  const wrapperClasses = clsx('z-dropdown w-max overflow-y-auto rounded bg-uiBackground01 shadow-floatingShadow', {
    absolute: !portalTargetRef,
    'border-solid border border-uiBorder01': variant === 'outline',
    'py-1': !isNoPadding,
    'left-0': horizontalAlign === 'left',
    'right-0': horizontalAlign === 'right',
    'left-auto': horizontalAlign === 'center',
    [`animate-appear-in`]: !isRemoving,
    ['animate-appear-out opacity-0']: isRemoving,
  });

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
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </ul>
    )
  );
}
