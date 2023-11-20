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

  const tooltipBodyClasses = clsx(
    'absolute z-tooltip inline-block w-max rounded bg-background-uiBackgroundTooltip text-text-textOnColor',
    {
      'typography-body3regular': size === 'small',
      'typography-body2regular': size === 'medium',
      'px-2 pb-1 pt-1.5': size === 'small',
      'px-4 py-3': size === 'medium',
      'left-0': horizontalAlign === 'left',
      'right-0': horizontalAlign === 'right',
      'left-auto': horizontalAlign === 'center',
    },
  );

  return (
    <div
      ref={targetRef}
      className="relative flex items-center justify-center"
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
