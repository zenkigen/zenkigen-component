import type { CSSProperties, PropsWithChildren } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useTooltip } from './tooltip.hook';
import { TooltipContent } from './tooltip-content';
import type { TooltipHorizontalAlign, TooltipPosition, TooltipSize, TooltipVerticalPosition } from './type';

type Props = {
  content: string;
  size?: TooltipSize;
  maxWidth?: CSSProperties['maxWidth'];
  verticalPosition?: TooltipVerticalPosition;
  horizontalAlign?: TooltipHorizontalAlign;
  isDisabledHover?: boolean;
  portalTarget?: HTMLElement;
};

export function Tooltip({
  children,
  content,
  size = 'small',
  maxWidth,
  verticalPosition = 'bottom',
  horizontalAlign = 'center',
  isDisabledHover = false,
  portalTarget,
}: PropsWithChildren<Props>) {
  const { calculatePosition } = useTooltip();

  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    maxWidth: 'none',
    width: 'auto',
    left: '0px',
    top: '0px',
    bottom: '0px',
    translateX: '0',
    translateY: '0',
  });

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

  useEffect(() => {
    if (targetRef.current === null) return;

    const dimensions = targetRef.current?.getBoundingClientRect();
    const position = calculatePosition({ dimensions, maxWidth, verticalPosition, horizontalAlign, tooltipSize: size });

    setTooltipPosition(position);
  }, [calculatePosition, horizontalAlign, maxWidth, size, verticalPosition]);

  return (
    <div
      ref={targetRef}
      className="relative flex items-center justify-center"
      onMouseOver={handleMouseOverWrapper}
      onMouseLeave={handleMouseOutWrapper}
    >
      {children}
      {isVisible &&
        (portalTarget == null ? (
          <TooltipContent
            content={content}
            size={size}
            maxWidth={maxWidth}
            verticalPosition={verticalPosition}
            horizontalAlign={horizontalAlign}
            tooltipPosition={tooltipPosition}
          />
        ) : (
          createPortal(
            <TooltipContent
              isPortal
              content={content}
              size={size}
              maxWidth={maxWidth}
              verticalPosition={verticalPosition}
              horizontalAlign={horizontalAlign}
              tooltipPosition={tooltipPosition}
            />,
            portalTarget,
          )
        ))}
    </div>
  );
}
