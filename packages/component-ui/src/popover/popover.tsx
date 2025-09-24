import type { Placement } from '@floating-ui/react-dom';
import { autoUpdate, flip, offset as flOffset, shift, useFloating } from '@floating-ui/react-dom';
import type { ReactNode, RefObject } from 'react';
import { useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Popoverの配置位置を定義する型
 */
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

/**
 * Popoverコンポーネントのプロパティ
 * Corner配置の場合のみanchorRefがオプショナル
 */
export type PopoverProps<T extends PopoverPlacement = PopoverPlacement> = {
  /** Popoverの配置位置 */
  placement?: T;
  /** Popoverの表示/非表示を制御 */
  isVisible: boolean;
  /** ポータルする先のDOM要素のref（未指定の場合はdocument.body） */
  portalTargetRef?: RefObject<HTMLElement | null>;
  /** アンカー要素からのオフセット（ピクセル） */
  offset?: number;
  /** Popover内に表示するコンテンツ */
  children: ReactNode;
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

/**
 * Popoverコンポーネント
 * フローティング要素として表示される小さなポップアップ
 * Corner配置の場合、要素基準またはViewport基準で配置可能
 */
export const Popover = <T extends PopoverPlacement = PopoverPlacement>({
  anchorRef,
  placement = 'top' as T,
  isVisible,
  portalTargetRef,
  offset = 8,
  shouldAvoidCollisions = true,
  children,
}: PopoverProps<T>) => {
  // Corner配置の判定
  const isCornerPlacement = ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(placement);

  // Corner配置用の仮想要素を生成
  const getVirtualElement = useCallback(() => {
    if (isCornerPlacement !== true) {
      return null;
    }

    // anchorRefがある場合：要素基準のCorner配置（オフセット適用）
    if (anchorRef?.current != null) {
      return {
        getBoundingClientRect: () => {
          // スクロール時にも最新の座標を計算
          const anchorRect = anchorRef.current!.getBoundingClientRect();

          // Corner配置でのオフセット適用方向
          const offsetDirections = {
            'top-left': { x: offset, y: offset }, // 右下方向にオフセット
            'top-right': { x: -offset, y: offset }, // 左下方向にオフセット
            'bottom-left': { x: offset, y: -offset }, // 右上方向にオフセット
            'bottom-right': { x: -offset, y: -offset }, // 左上方向にオフセット
          };

          const offsetDir = offsetDirections[placement as keyof typeof offsetDirections];

          const elementCornerCoordinates = {
            'top-left': { x: anchorRect.left + offsetDir.x, y: anchorRect.top + offsetDir.y },
            'top-right': { x: anchorRect.right + offsetDir.x, y: anchorRect.top + offsetDir.y },
            'bottom-left': { x: anchorRect.left + offsetDir.x, y: anchorRect.bottom + offsetDir.y },
            'bottom-right': { x: anchorRect.right + offsetDir.x, y: anchorRect.bottom + offsetDir.y },
          };

          const coords = elementCornerCoordinates[placement as keyof typeof elementCornerCoordinates];

          return {
            width: 0,
            height: 0,
            x: coords.x,
            y: coords.y,
            left: coords.x,
            top: coords.y,
            right: coords.x,
            bottom: coords.y,
          };
        },
      };
    }

    // anchorRefがない場合：Viewport基準のCorner配置（オフセット適用）
    return {
      getBoundingClientRect: () => {
        // リサイズ時にも最新のViewportサイズを計算
        const viewportCornerCoordinates = {
          'top-left': { x: offset, y: offset },
          'top-right': { x: window.innerWidth - offset, y: offset },
          'bottom-left': { x: offset, y: window.innerHeight - offset },
          'bottom-right': { x: window.innerWidth - offset, y: window.innerHeight - offset },
        };

        const coords = viewportCornerCoordinates[placement as keyof typeof viewportCornerCoordinates];

        return {
          width: 0,
          height: 0,
          x: coords.x,
          y: coords.y,
          left: coords.x,
          top: coords.y,
          right: coords.x,
          bottom: coords.y,
        };
      },
    };
  }, [placement, isCornerPlacement, anchorRef, offset]);

  // floating-ui用のplacement設定
  const getFloatingPlacement = (): Placement => {
    if (isCornerPlacement) {
      // Corner配置の場合、要素の角から画面中央方向に向けて配置
      const cornerPlacementMap = {
        'top-left': 'bottom-start' as const,
        'top-right': 'bottom-end' as const,
        'bottom-left': 'top-start' as const,
        'bottom-right': 'top-end' as const,
      };

      return cornerPlacementMap[placement as keyof typeof cornerPlacementMap];
    }

    return placement as Placement;
  };

  const { refs, floatingStyles } = useFloating({
    elements: {
      reference: isCornerPlacement ? getVirtualElement() : anchorRef?.current,
    },
    placement: getFloatingPlacement(),
    strategy: 'fixed',
    middleware: [
      // Corner配置では手動でオフセット適用済みなのでflOffsetは不要
      ...(isCornerPlacement ? [] : [flOffset(offset)]),
      // Corner配置では衝突回避を無効にする（固定位置配置のため）
      ...(shouldAvoidCollisions && !isCornerPlacement ? [flip(), shift({ padding: 8 })] : []),
    ],
    whileElementsMounted: autoUpdate,
  });

  if (isVisible !== true) {
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
