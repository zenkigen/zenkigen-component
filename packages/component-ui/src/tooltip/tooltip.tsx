import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useDismissOnScroll } from '../hooks/use-dismiss-on-scroll';
import { isJustAfterScrollOf, subscribeScrollTime } from './scroll-time-tracker';
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
  const isDismissedByScrollRef = useRef(false);

  const handleMouseOverWrapper = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (isDisabledHover) {
        return;
      }
      // マウスがトリガー（ラッパー）の外から入ってきたときは、「スクロールで消えた」印を外す。
      // 印は mouseleave でも外すが、mouseleave は届かないことがある（マウスの下にあった吹き出しが取り除かれた場合や、
      // 非表示後の再描画が済む前に届いた続きのスクロールで、マウスが外へ出たあとに印が付いた場合）。
      // 入ってくる側でも外しておくことで、印が残り続けて次のホバーが無視されるのを防ぐ。
      // 印が効くのは、ラッパーの中の子要素から子要素へ移る mouseover だけになる
      const wrapper = targetRef.current;
      const from = event.relatedTarget;
      const isEnteringFromOutside = !(from instanceof Node) || wrapper === null || wrapper.contains(from) === false;
      if (isEnteringFromOutside) {
        isDismissedByScrollRef.current = false;
      }
      if (isDismissedByScrollRef.current) {
        return;
      }
      // トリガーを含む領域がスクロールされた直後のホバーは無視する（あとから表示もしない）。
      // スクロール中は、行がマウスの下を通るたびに mouseover が届くため、無視しないと吹き出しが出て次のスクロールで消え、ちらつく
      if (targetRef.current !== null && isJustAfterScrollOf(targetRef.current)) {
        return;
      }
      if (targetRef.current !== null) {
        const dimensions = targetRef.current.getBoundingClientRect();
        const position = calculatePosition({
          dimensions,
          maxWidth,
          verticalPosition,
          horizontalAlign,
          tooltipSize: size,
        });

        setTooltipPosition(position);
      }
      setIsVisible(true);
    },
    [isDisabledHover, calculatePosition, maxWidth, verticalPosition, horizontalAlign, size],
  );

  const handleMouseOutWrapper = useCallback(() => {
    isDismissedByScrollRef.current = false;
    setIsVisible(false);
  }, []);

  // 表示中に、トリガーを内側に含む領域（ページ全体、Modal の本文、表を包むスクロール枠など）がスクロールされたら消す。
  // トリガーを含まない領域、トリガーの内側にある要素、吹き出しの中身のスクロールでは消さない。
  // portalTarget の指定の有無によらず消す。
  // スクロールで消えたあとは、マウスがいったんトリガーの外へ出る（mouseleave）まで再表示しない。
  // mouseover はトリガーの中の子要素をまたぐたびに届くため、印が無いと、スクロール中に出たり消えたりする。
  useDismissOnScroll(
    targetRef,
    () => {
      isDismissedByScrollRef.current = true;
      setIsVisible(false);
    },
    isVisible,
  );

  // スクロールされた直後のホバーを判定するため、マウントされている間はスクロールの時刻を記録する（listener は全 Tooltip で 1 つ）
  useEffect(() => subscribeScrollTime(), []);

  useEffect(() => {
    if (targetRef.current === null) return;

    const dimensions = targetRef.current?.getBoundingClientRect();
    const position = calculatePosition({ dimensions, maxWidth, verticalPosition, horizontalAlign, tooltipSize: size });

    setTooltipPosition(position);
  }, [calculatePosition, horizontalAlign, maxWidth, size, verticalPosition]);

  // 表示中はウィンドウの resize でだけ位置を計算し直す。スクロールでは計算し直さない
  // （トリガーを含む領域のスクロールでは消す。含まない領域のスクロールに連動してトリガーが動く配置では、追従しない）。
  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      if (targetRef.current === null) return;
      const dimensions = targetRef.current.getBoundingClientRect();
      const position = calculatePosition({
        dimensions,
        maxWidth,
        verticalPosition,
        horizontalAlign,
        tooltipSize: size,
      });

      setTooltipPosition(position);
    };

    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, calculatePosition, maxWidth, verticalPosition, horizontalAlign, size]);

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
