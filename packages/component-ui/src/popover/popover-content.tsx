import { FloatingPortal, useInteractions, useRole } from '@floating-ui/react';
import * as React from 'react';
import { forwardRef, useCallback, useEffect, useRef } from 'react';

import { useDismissOnModalOpen } from '../hooks/use-dismiss-on-modal-open';
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

/**
 * スクロールバー上の押下かどうか（useDismiss が持っていた判定の踏襲。LTR 前提）。
 * スクロールバーの押下で閉じてしまうと、Modal 本文のような overflow 領域で Popover を開いたままスクロールできない。
 * jsdom では clientWidth / clientHeight が 0 のため常に false になる（ブラウザでのみ効く）。
 */
const isPointerOnScrollbar = (target: HTMLElement, event: PointerEvent) => {
  const isRoot = target === document.documentElement || target === document.body;
  const style = window.getComputedStyle(target);
  const canScrollX =
    (isRoot || /auto|scroll/.test(style.overflowX)) &&
    target.clientWidth > 0 &&
    target.scrollWidth > target.clientWidth;
  const canScrollY =
    (isRoot || /auto|scroll/.test(style.overflowY)) &&
    target.clientHeight > 0 &&
    target.scrollHeight > target.clientHeight;

  return (canScrollY && event.offsetX > target.clientWidth) || (canScrollX && event.offsetY > target.clientHeight);
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { children },
  ref,
) {
  const { isOpen, triggerRef, floating, panelId, onClose } = usePopoverContext();

  const interactions = useInteractions([useRole(floating.context, { role: 'dialog' })]);

  // 外側クリックの検知。document の pointerdown を自前で監視する（Select 等の useOutsideClick と同じ方式）。
  //
  // floating-ui の useDismiss は使わない。useDismiss は、文書内に FloatingFocusManager（Modal）が付けた
  // data-floating-ui-inert マーカーがあると、「マーカーを含まない根要素へのクリック」を後から挿入された
  // 第三者の要素（toast 等）とみなして無視する。Modal の中身にはマーカーが付かないため、Modal 内で開いた
  // Popover は Modal 内のどこを押しても閉じなくなる（別の DatePicker / Select を押しても閉じない）。
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const listener = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      // 再レンダリングで target が DOM から外れている場合（トリガー内の icon の差し替え等）に備え、
      // イベント発火時点の祖先が残る composedPath でも内側判定する（useOutsideClick と同じ）
      const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
      // contains() の戻り値は strict-boolean-expressions 対策で Boolean() で明示変換する（useOutsideClick と同じ）
      const isInside = (element: Element | null | undefined): boolean =>
        element != null &&
        (Boolean(element.contains(target)) ||
          path.some((node) => node instanceof Node && Boolean(element.contains(node))));

      // Popover 本体・トリガー・anchorRef で指定した参照要素の内側は外側クリックではない
      if (
        isInside(floating.refs.floating.current) ||
        isInside(floating.refs.domReference.current) ||
        isInside(triggerRef.current)
      ) {
        return;
      }

      // 別の floating UI（Popover の中で開いた Select / Dropdown / Tooltip 等の portal）の内側も外側クリックとして扱わない
      if (target.closest('.z-popover, .z-dropdown, .z-tooltip') !== null) {
        return;
      }

      if (target instanceof HTMLElement && isPointerOnScrollbar(target, event)) {
        return;
      }

      onClose?.({ reason: 'outside-click' });
    };

    // capture 段階で登録し、途中の要素が stopPropagation しても検知できるようにする（useDismiss の既定と同じ）
    document.addEventListener('pointerdown', listener, { capture: true });

    return () => document.removeEventListener('pointerdown', listener, { capture: true });
  }, [isOpen, floating.refs, triggerRef, onClose]);

  // Modal が開かれた際に Popover を閉じる（利用側で reason='modal-open' を判定して挙動を変更可能）
  useDismissOnModalOpen(() => {
    if (isOpen && onClose != null) {
      onClose({ reason: 'modal-open' });
    }
  });

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
            className: 'z-popover',
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
