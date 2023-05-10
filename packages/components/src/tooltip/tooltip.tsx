import { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import type { VerticalPosition, HorizontalAlign } from './type';

type Props = {
  children: ReactNode;
  content: string;
  visible?: boolean;
  size?: 'small' | 'medium';
  maxWidth?: CSSProperties['width'];
  verticalPosition?: VerticalPosition;
  horizontalAlign?: HorizontalAlign;
};

const defaultDimensions = {
  width: 0,
  height: 0,
};

export function Tooltip({
  visible,
  children,
  content,
  size = 'small',
  maxWidth,
  verticalPosition = 'bottom',
  horizontalAlign = 'center',
}: Props) {
  const [isVisible, setIsVisible] = useState(visible);
  const [targetDimensions, setTargetDimensions] = useState(defaultDimensions);
  const targetRef = useRef<HTMLDivElement>(null);

  const getDimensions = useCallback(() => {
    if (targetRef.current === null) {
      return;
    }
    const dimensions = targetRef.current.getBoundingClientRect();
    const calculatedDimensions = {
      width: dimensions.right - dimensions.left,
      height: dimensions.bottom - dimensions.top,
    };
    setTargetDimensions(calculatedDimensions);
  }, []);

  useEffect(() => {
    getDimensions();
  }, [getDimensions]);

  const showTooltip = useCallback(() => {
    getDimensions();
    setIsVisible(true);
  }, [getDimensions]);

  const hideTooltip = useCallback(() => {
    setIsVisible(visible);
  }, [visible]);

  const targetClasses = clsx('relative', 'flex', 'items-center', 'justify-center');

  const tooltipBodyClasses = clsx(
    'z-tooltip',
    'absolute',
    'w-max',
    horizontalAlign === 'left' ? 'left-0' : horizontalAlign === 'right' ? 'right-0' : 'left-auto',
    'inline-block',
    size === 'small' ? 'px-2 pb-1 pt-1.5' : 'px-4 py-3',
    'text-text-textOnColor',
    'bg-background-uiBackgroundTooltip',
    'rounded',
    'shadow-componentShadow',
    typography.body[size === 'small' ? 'body3regular' : 'body2regular'],
  );

  const tailClasses = clsx(
    'absolute',
    verticalPosition === 'bottom' ? 'rotate-180' : 'rotate-0',
    verticalPosition === 'bottom'
      ? size === 'small'
        ? '-top-1'
        : '-top-2'
      : size === 'small'
      ? '-bottom-1'
      : '-bottom-2',
    horizontalAlign === 'right'
      ? size === 'small'
        ? 'right-2'
        : 'right-4'
      : horizontalAlign === 'left'
      ? size === 'small'
        ? 'left-2'
        : 'left-4'
      : size === 'small'
      ? 'left-2/4 -translate-x-1'
      : 'left-2/4 -translate-x-2',
    'fill-background-uiBackgroundTooltip',
  );

  const TailIconSmall = (
    <svg className={tailClasses} width="8" height="4" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L0 0H8L4 4Z" />
    </svg>
  );

  const TailIconMedium = (
    <svg
      className={tailClasses}
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 8L0 0H14L7 8Z" />
    </svg>
  );

  return (
    <div ref={targetRef} className={targetClasses} onMouseOver={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <div
          className={tooltipBodyClasses}
          style={{
            maxWidth,
            top:
              verticalPosition === 'bottom'
                ? size === 'small'
                  ? `${targetDimensions.height + 8}px`
                  : `${targetDimensions.height + 12}px`
                : 'unset',
            bottom:
              verticalPosition === 'top'
                ? size === 'small'
                  ? `${targetDimensions.height + 8}px`
                  : `${targetDimensions.height + 12}px`
                : 'unset',
          }}
        >
          {content}
          {size === 'small' ? TailIconSmall : TailIconMedium}
        </div>
      )}
    </div>
  );
}
