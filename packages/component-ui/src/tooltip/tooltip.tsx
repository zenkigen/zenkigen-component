import { typography } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { CSSProperties, PropsWithChildren, useCallback, useRef, useState } from 'react';

import { TailIcon } from './tail-icon';
import { TooltipHorizontalAlign, TooltipSize, TooltipVerticalPosition } from './type';

type Props = {
  content: string;
  size?: TooltipSize;
  maxWidth?: CSSProperties['width'];
  verticalPosition?: TooltipVerticalPosition;
  horizontalAlign?: TooltipHorizontalAlign;
  isDisabledHover?: boolean;
};

export function Tooltip({
  children,
  content,
  size = 'small',
  maxWidth,
  verticalPosition = 'bottom',
  horizontalAlign = 'center',
  isDisabledHover = false,
}: PropsWithChildren<Props>) {
  const [isVisible, setIsVisible] = useState(false);
  const [targetDimensions, setTargetDimensions] = useState({
    width: 0,
    height: 0,
  });

  const targetRef = useRef<HTMLDivElement>(null);

  const handleMouseOverWrapper = useCallback(() => {
    if (targetRef.current === null || isDisabledHover) {
      return;
    }

    const dimensions = targetRef.current.getBoundingClientRect();
    const calculatedDimensions = {
      width: dimensions.right - dimensions.left,
      height: dimensions.bottom - dimensions.top,
    };

    setTargetDimensions(calculatedDimensions);
    setIsVisible(true);
  }, [isDisabledHover]);

  const handleMouseOutWrapper = useCallback(() => {
    setIsVisible(false);
  }, []);

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
    typography.body[size === 'small' ? 'body3regular' : 'body2regular'],
  );

  return (
    <div
      ref={targetRef}
      className={targetClasses}
      onMouseOver={handleMouseOverWrapper}
      onMouseLeave={handleMouseOutWrapper}
    >
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
          <TailIcon size={size} verticalPosition={verticalPosition} horizontalAlign={horizontalAlign} />
        </div>
      )}
    </div>
  );
}
