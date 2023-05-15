import { CSSProperties, ReactNode, useCallback, useRef, useState } from 'react';

import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { TailIcon } from './tail-icon';

type Props = {
  children: ReactNode;
  content: string;
  size?: 'small' | 'medium';
  maxWidth?: CSSProperties['width'];
  verticalPosition?: 'top' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
};

export function Tooltip({
  children,
  content,
  size = 'small',
  maxWidth,
  verticalPosition = 'bottom',
  horizontalAlign = 'center',
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [targetDimensions, setTargetDimensions] = useState({
    width: 0,
    height: 0,
  });

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

  const showTooltip = useCallback(() => {
    getDimensions();
    setIsVisible(true);
  }, [getDimensions]);

  const hideTooltip = useCallback(() => {
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
    'shadow-componentShadow',
    typography.body[size === 'small' ? 'body3regular' : 'body2regular'],
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
          <TailIcon size={size} verticalPosition={verticalPosition} horizontalAlign={horizontalAlign} />
        </div>
      )}
    </div>
  );
}
