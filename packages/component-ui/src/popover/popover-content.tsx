import { FloatingPortal, useDismiss, useInteractions, useRole } from '@floating-ui/react';
import * as React from 'react';
import { forwardRef, useCallback, useEffect, useRef } from 'react';

import { composeRefs, isElement } from '../utils';
import { usePopoverContext } from './popover-context';

type PopoverContentProps = {
  children?: React.ReactNode;
};

type ChildProps = {
  id?: string;
  role?: string;
  [key: string]: unknown;
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { children },
  ref,
) {
  const { isOpen, triggerRef, floating, panelId, onClose } = usePopoverContext();

  // 外側クリック判定のカスタムロジック
  // ネストされたFloating UI要素（Select、Dropdown等）のクリックを除外
  const shouldCloseOnOutsidePress = useCallback(
    (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return true;
      }

      // クリックされた要素が別のFloating UI要素内にあるかチェック
      // 自分自身のfloating elementではなく、他のz-overlayやz-dropdown要素内のクリックを除外
      const floatingElement = floating.refs.floating.current;
      const closestOverlay = target.closest('.z-overlay, .z-dropdown');

      if (closestOverlay !== null && floatingElement instanceof Element) {
        const isInsideOwnFloating = floatingElement.contains(closestOverlay);

        return isInsideOwnFloating;
      }

      return true;
    },
    [floating.refs.floating],
  );

  // useDismissで外側クリックを検出（Escapeキーは無効化し、独自処理で対応）
  const dismiss = useDismiss(floating.context, {
    outsidePressEvent: 'pointerdown',
    outsidePress: shouldCloseOnOutsidePress,
    escapeKey: false,
  });

  const interactions = useInteractions([dismiss, useRole(floating.context, { role: 'dialog' })]);

  // Popover表示時にフォーカスを移動
  useEffect(() => {
    if (isOpen) {
      const element = floating.refs.floating.current as HTMLElement | null;
      element?.focus?.({ preventScroll: true });
    }
  }, [isOpen, floating.refs.floating]);

  // Popover非表示時にトリガーにフォーカスを戻す
  // 初回マウント時ではなく、isOpen が true → false に変わったときのみ実行
  const prevIsOpenRef = useRef(isOpen);
  useEffect(() => {
    const hasPreviouslyBeenOpen = prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (hasPreviouslyBeenOpen && !isOpen) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen, triggerRef]);

  // Escapeキーハンドラー（reasonを'escape-key-down'として正しく渡すため）
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        if (onClose != null) {
          onClose({ reason: 'escape-key-down' });
        }
      }
    },
    [onClose],
  );

  let wrappedChildren = children;
  if (isElement(children)) {
    const childProps = children.props as ChildProps;
    wrappedChildren = React.cloneElement(children, {
      ...childProps,
      ...(childProps.id == null && { id: panelId }),
      ...(childProps.role == null && { role: 'dialog' }),
    });
  }

  return (
    <FloatingPortal>
      {isOpen ? (
        <div
          {...interactions.getFloatingProps({
            ref: composeRefs(floating.refs.setFloating, ref),
            tabIndex: -1,
            onKeyDown: handleKeyDown,
            style: {
              position: floating.strategy,
              top: floating.y ?? 0,
              left: floating.x ?? 0,
              outline: '0',
            },
          })}
        >
          {wrappedChildren}
        </div>
      ) : null}
    </FloatingPortal>
  );
});
