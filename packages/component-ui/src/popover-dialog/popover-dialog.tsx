import type { CSSProperties, PropsWithChildren, RefObject } from 'react';

import { Dialog } from '../dialog';
import { Popover } from '../popover';

const LIMIT_WIDTH = 320;
const LIMIT_HEIGHT = 184;

type PopoverPlacement =
  // アンカーベース配置
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
  | 'right-end'
  // Corner配置（anchorRefオプショナル）
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

type Props<T extends PopoverPlacement = PopoverPlacement> = {
  /** Popoverの配置位置 */
  placement?: T;
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
  /** 閉じる操作が発生したときのコールバック */
  onClose?: () => void;
} & (T extends 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  ? {
      /** Corner配置の場合はオプショナル：要素基準またはViewport基準 */
      anchorRef?: RefObject<HTMLElement | null>;
      /** Corner配置では衝突回避は無効（固定位置配置のため） */
      shouldAvoidCollisions?: false;
    }
  : {
      /** 通常配置の場合は必須：配置の基準となる要素のref */
      anchorRef: RefObject<HTMLElement | null>;
      /** 衝突回避を有効にするかどうか */
      shouldAvoidCollisions?: boolean;
    });

export function PopoverDialog<T extends PopoverPlacement = PopoverPlacement>({
  children,
  anchorRef,
  placement = 'bottom' as T,
  isVisible,
  width = 480,
  height,
  maxWidth = 'calc(100vw - 40px)',
  portalTargetRef,
  offset = 8,
  shouldAvoidCollisions = true,
  onClose,
}: PropsWithChildren<Props<T>>) {
  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  // Corner配置かどうかを判定
  const isCornerPlacement = ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(placement as string);

  const popoverProps = {
    ...(anchorRef ? { anchorRef } : {}),
    placement,
    isVisible,
    portalTargetRef,
    offset,
    shouldAvoidCollisions: isCornerPlacement ? false : shouldAvoidCollisions,
  } as Parameters<typeof Popover>[0];

  return (
    <Popover {...popoverProps}>
      <Dialog width={renderWidth} height={renderHeight} maxWidth={maxWidth} onClose={onClose}>
        {children}
      </Dialog>
    </Popover>
  );
}

PopoverDialog.Body = Dialog.Body;
PopoverDialog.Header = Dialog.Header;
PopoverDialog.Footer = Dialog.Footer;
