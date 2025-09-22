import type { Placement } from '@floating-ui/react-dom';
import { autoUpdate, flip, offset as flOffset, shift, useFloating } from '@floating-ui/react-dom';
import type { ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';

/**
 * Popoverの配置位置を定義する型
 */
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

/**
 * Popoverコンポーネントのプロパティ
 */
export type PopoverProps = {
  /** Popoverを配置する基準となる要素のref */
  anchorRef: RefObject<HTMLElement | null>;
  /** Popoverの配置位置 */
  placement?: PopoverPlacement;
  /** Popoverの表示/非表示を制御 */
  isVisible: boolean;
  /** ポータルする先のDOM要素のref（未指定の場合はdocument.body） */
  portalTargetRef?: RefObject<HTMLElement | null>;
  /** アンカー要素からのオフセット（ピクセル） */
  offset?: number;
  /** 衝突回避を有効にするかどうか */
  shouldAvoidCollisions?: boolean;
  /** Popover内に表示するコンテンツ */
  children: ReactNode;
};

/**
 * Popoverコンポーネント
 * フローティング要素として表示される小さなポップアップ
 */
export const Popover = ({
  anchorRef,
  placement = 'bottom',
  isVisible,
  portalTargetRef,
  offset = 8,
  shouldAvoidCollisions = true,
  children,
}: PopoverProps) => {
  const { refs, floatingStyles } = useFloating({
    elements: {
      reference: anchorRef.current,
    },
    placement: placement as Placement,
    strategy: 'fixed',
    middleware: [flOffset(offset), ...(shouldAvoidCollisions ? [flip(), shift({ padding: 8 })] : [])],
    whileElementsMounted: autoUpdate,
  });

  if (isVisible === false) {
    return null;
  }

  const renderPopoverContent = () => (
    <div ref={refs.setFloating} style={floatingStyles} className="z-overlay">
      {children}
    </div>
  );

  return createPortal(
    renderPopoverContent(),
    portalTargetRef?.current != null ? portalTargetRef.current : document.body,
  );
};
