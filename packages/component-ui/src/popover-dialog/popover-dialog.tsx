import type { CSSProperties, PropsWithChildren, RefObject } from 'react';

import { Popover } from '../popover';
import { Popup } from '../popup';

const LIMIT_WIDTH = 320;
const LIMIT_HEIGHT = 184;

type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

type Props = {
  /** 配置の基準となる要素のref */
  anchorRef: RefObject<HTMLElement | null>;
  /** Popoverの配置位置 */
  placement?: PopoverPlacement;
  /** PopoverDialogの表示/非表示を制御 */
  isVisible: boolean;
  /** Dialogの幅 */
  width?: CSSProperties['width'];
  /** Dialogの高さ */
  height?: CSSProperties['height'];
  /** Dialogの最大幅 */
  maxWidth?: CSSProperties['maxWidth'];
  /** ポータルする先のDOM要素のref（未指定の場合はdocument.body） */
  portalTargetRef?: RefObject<HTMLElement | null>;
  /** アンカー要素からのオフセット（ピクセル） */
  offset?: number;
  /** 衝突回避を有効にするかどうか */
  shouldAvoidCollisions?: boolean;
  /** 閉じる操作が発生したときのコールバック */
  onClose?: () => void;
};

export function PopoverDialog({
  children,
  anchorRef,
  placement = 'bottom',
  isVisible,
  width = 480,
  height,
  maxWidth = 'calc(100vw - 40px)',
  portalTargetRef,
  offset = 8,
  shouldAvoidCollisions = true,
  onClose,
}: PropsWithChildren<Props>) {
  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  return (
    <Popover
      anchorRef={anchorRef}
      placement={placement}
      isVisible={isVisible}
      portalTargetRef={portalTargetRef}
      offset={offset}
      shouldAvoidCollisions={shouldAvoidCollisions}
    >
      <Popup width={renderWidth} height={renderHeight} maxWidth={maxWidth} onClose={onClose}>
        {children}
      </Popup>
    </Popover>
  );
}

PopoverDialog.Body = Popup.Body;
PopoverDialog.Header = Popup.Header;
PopoverDialog.Footer = Popup.Footer;
