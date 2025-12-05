import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { TooltipContent } from './tooltip-content';
import { useTooltip } from './tooltip-hook';
import type { TooltipHorizontalAlign, TooltipPosition, TooltipSize, TooltipVerticalPosition } from './type';

/**
 * Tooltipコンポーネントに渡すProps。
 */
type TooltipProps = {
  /** Tooltipを表示させるトリガー要素。hover対象となる。 */
  children: ReactNode;
  /** Tooltip内に表示する内容。テキストに限らず複数行の要素を渡せる。 */
  content: ReactNode;
  /** Tooltipのタイポグラフィとパディングを切り替えるサイズ。 */
  size?: TooltipSize;
  /** Tooltip本体の最大幅。未指定時は内容に合わせて伸縮する。 */
  maxWidth?: CSSProperties['maxWidth'];
  /** トリガーに対してTooltipを上下どちらに配置するか。 */
  verticalPosition?: TooltipVerticalPosition;
  /** 水平方向の揃え位置。左右端または中央に合わせる。 */
  horizontalAlign?: TooltipHorizontalAlign;
  /** trueの場合、hoverしてもTooltipを表示しない。 */
  isDisabledHover?: boolean;
  /** Tooltipを別DOMツリー（例: document.body）に描画したい場合のポータル先。 */
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
}: TooltipProps) {
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
