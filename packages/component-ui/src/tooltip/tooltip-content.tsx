import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

import { TailIcon } from './tail-icon';
import type { TooltipHorizontalAlign, TooltipPosition, TooltipSize, TooltipVerticalPosition } from './type';

export const TooltipContent = ({
  content,
  horizontalAlign,
  verticalPosition,
  size,
  tooltipPosition,
  maxWidth,
  isPortal = false,
}: {
  content: ReactNode;
  size: TooltipSize;
  maxWidth: CSSProperties['maxWidth'];
  verticalPosition: TooltipVerticalPosition;
  horizontalAlign: TooltipHorizontalAlign;
  tooltipPosition: TooltipPosition;
  isPortal?: boolean;
}) => {
  const tooltipWrapperClasses = clsx('absolute z-tooltip m-auto flex', {
    'top-0': !isPortal && verticalPosition === 'top',
    'bottom-0': !isPortal && verticalPosition === 'bottom',
    'justify-start': horizontalAlign === 'left',
    'justify-center': horizontalAlign === 'center',
    'justify-end': horizontalAlign === 'right',
    'w-[24px]': size === 'small',
    'w-[46px]': size !== 'small',
  });

  const tooltipBodyClasses = clsx(
    'absolute z-tooltip inline-block w-max rounded bg-uiBackgroundTooltip text-textOnColor',
    {
      'typography-body12regular': size === 'small',
      'typography-body13regular': size === 'medium',
      'px-2 pb-1 pt-1.5': size === 'small',
      'px-4 py-3': size === 'medium',
      'bottom-2': verticalPosition !== 'bottom' && size === 'small',
      'bottom-3': verticalPosition !== 'bottom' && size === 'medium',
      'top-2': verticalPosition === 'bottom' && size === 'small',
      'top-3': verticalPosition === 'bottom' && size === 'medium',
    },
  );

  const tooltipWrapperStyle = isPortal
    ? {
        transform: `translate(${tooltipPosition.translateX}, ${tooltipPosition.translateY})`,
        ...tooltipPosition,
      }
    : {};

  return (
    <div className={tooltipWrapperClasses} style={tooltipWrapperStyle}>
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
  );
};
