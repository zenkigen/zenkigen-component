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

  const targetRef = useRef<HTMLDivElement>(null);

  const handleMouseOverWrapper = useCallback(() => {
    if (isDisabledHover) {
      return;
    }
    setIsVisible(true);
  }, [isDisabledHover]);

  const handleMouseOutWrapper = useCallback(() => {
    setIsVisible(false);
  }, []);

  const tooltipWrapClasses = clsx('absolute inset-x-0 z-tooltip m-auto flex', {
    'top-0': verticalPosition !== 'bottom',
    'bottom-0': verticalPosition === 'bottom',
    'justify-start': horizontalAlign === 'left',
    'justify-center': horizontalAlign === 'center',
    'justify-end': horizontalAlign === 'right',
    'w-[24px]': size === 'small',
    'w-[46px]': size !== 'small',
  });

  const tooltipBodyClasses = clsx(
    'absolute z-tooltip inline-block w-max rounded bg-background-uiBackgroundTooltip text-text-textOnColor',
    {
      'typography-body3regular': size === 'small',
      'typography-body2regular': size === 'medium',
      'px-2 pb-1 pt-1.5': size === 'small',
      'px-4 py-3': size === 'medium',
      'bottom-2': verticalPosition !== 'bottom' && size === 'small',
      'bottom-3': verticalPosition !== 'bottom' && size === 'medium',
      'top-2': verticalPosition === 'bottom' && size === 'small',
      'top-3': verticalPosition === 'bottom' && size === 'medium',
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
        <div className={tooltipWrapClasses}>
          <div
            className={tooltipBodyClasses}
            style={{
              maxWidth,
            }}
          >
            {content}
            <TailIcon size={size} verticalPosition={verticalPosition} horizontalAlign={horizontalAlign} />
          </div>
        </div>
      )}
    </div>
  );
}
