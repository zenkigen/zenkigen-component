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
 * スクロールバー上の押下かどうか（floating-ui の useDismiss の判定を移したもの）。
 * スクロールバーの押下で閉じてしまうと、Modal 本文のような overflow 領域で Popover を開いたままスクロールできない。
 * `direction: rtl` の領域では縦スクロールバーが左側に付くため、左右で判定を分ける。
 * jsdom では clientWidth / clientHeight が 0 のため、寸法を与えない限り常に false になる。
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
  const isRtl = style.direction === 'rtl';

  const isOnVerticalScrollbar =
    canScrollY &&
    (isRtl ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
  const isOnHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;

  return isOnVerticalScrollbar || isOnHorizontalScrollbar;
};

/**
 * イベントが実際に起きた要素。Shadow DOM の中で起きたイベントは、document で受けると event.target が
 * ホスト要素に置き換わるため、composedPath の先頭を使う（floating-ui の getTarget と同じ）。
 */
const getEventTarget = (event: Event): EventTarget | null => {
  const path = typeof event.composedPath === 'function' ? event.composedPath() : [];

  return path[0] ?? event.target;
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { children },
  ref,
) {
  const { isOpen, triggerRef, floating, panelId, onClose } = usePopoverContext();

  const interactions = useInteractions([useRole(floating.context, { role: 'dialog' })]);

  // 押下が React ツリー上で Popover の内側から来たか。Popover の中身が createPortal で別の場所に描いた要素は、
  // DOM 上は外側でも React ツリー上は内側なので、閉じない（floating-ui の useDismiss の insideReactTree と同じ）。
  const isPressInsideReactTreeRef = useRef(false);

  // 外側クリックの検知。floating-ui の useDismiss の外側判定を移したもの。
  //
  // useDismiss そのものは使わない。useDismiss は、文書内に FloatingFocusManager（Modal）が付けた
  // data-floating-ui-inert マーカーがあると、「マーカーを含まない根要素へのクリック」を後から挿入された
  // 第三者の要素（toast 等）とみなして無視する。Modal の中身にはマーカーが付かないため、Modal 内で開いた
  // Popover は Modal 内のどこを押しても閉じなくなる（別の DatePicker / Select を押しても閉じない）。
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isActive = true;

    const closeIfOutside = (event: PointerEvent) => {
      const isInsideReactTree = isPressInsideReactTreeRef.current;
      isPressInsideReactTreeRef.current = false;

      if (!isActive || isInsideReactTree) {
        return;
      }

      const target = getEventTarget(event);
      if (!(target instanceof Element)) {
        return;
      }

      // 再レンダリングで target が DOM から外れている場合（トリガー内の icon の差し替え等）に備え、
      // イベント発火時点の祖先が残る composedPath でも内側判定する（useOutsideClick の内側判定と同じ）
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

    // document の capture 段階で受け、判定は押された要素に届くまで遅らせる（useDismiss の closeOnPressOutsideCapture と同じ）。
    // - capture で受けるのは、途中の要素が stopPropagation しても検知できるようにするため
    // - 遅らせるのは、React の onPointerDownCapture（isPressInsideReactTreeRef を立てる）が先に動くようにするため。
    //   React のリスナーはアプリの根要素にあり、document の capture より後、押された要素より前に動く
    const listener = (event: PointerEvent) => {
      isPressInsideReactTreeRef.current = false;
      const target = getEventTarget(event);
      if (target == null) {
        return;
      }
      target.addEventListener('pointerdown', closeIfOutside as EventListener, { once: true });
    };

    document.addEventListener('pointerdown', listener, { capture: true });

    return () => {
      isActive = false;
      document.removeEventListener('pointerdown', listener, { capture: true });
    };
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
            onPointerDownCapture: () => {
              isPressInsideReactTreeRef.current = true;
            },
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
