import { FloatingPortal, useDismiss, useInteractions, useRole } from '@floating-ui/react';
import * as React from 'react';
import { forwardRef, useCallback, useEffect } from 'react';

import { composeRefs, isElement } from '../utils';
import { usePopoverContext } from './popover-context';

type PopoverContentProps = {
  children?: React.ReactNode;
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { children },
  ref,
) {
  const { isOpen, triggerRef, anchorRef, floating, panelId, onClose } = usePopoverContext();

  const dismiss = useDismiss(floating.context, {
    outsidePressEvent: 'pointerdown',
  });

  const interactions = useInteractions([dismiss, useRole(floating.context, { role: 'dialog' })]);

  useEffect(() => {
    if (isOpen) {
      const element = floating.refs.floating.current as HTMLElement | null;
      element?.focus?.({ preventScroll: true });
    }
  }, [isOpen, floating.refs.floating]);

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen, triggerRef]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      if (onClose != null) {
        onClose('escape-key-down');
      }
    }
  };

  const handlePointerDownOutside = useCallback(() => {
    if (onClose != null) {
      onClose('outside-click');
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const floatingElement = floating.refs.floating.current as Element | null;
      const referenceElement = floating.refs.reference.current as Element | null;

      if (!(floatingElement instanceof Element) || !(referenceElement instanceof Element)) {
        return;
      }

      const floatingEl: Element = floatingElement;
      const referenceEl: Element = referenceElement;

      const isOutsideFloating = !(floatingEl.contains(target) as boolean);
      const isOutsideReference = !(referenceEl.contains(target) as boolean);

      // クリックされた要素が別のFloating UI要素内にあるかチェック
      // （Select、Dropdown、Tooltipなどの子コンポーネントのポータル要素）
      // 自分自身のfloating elementではなく、他のz-overlayやz-dropdown要素内のクリックを除外
      let isInsideOtherFloatingElement = false;
      if (target instanceof Element) {
        const closestOverlay = target.closest('.z-overlay, .z-dropdown');
        if (closestOverlay !== null && (floatingEl.contains(closestOverlay) as boolean) === false) {
          isInsideOtherFloatingElement = true;
        }
      }

      if (isOutsideFloating === true && isOutsideReference === true && !isInsideOtherFloatingElement) {
        handlePointerDownOutside();
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isOpen, floating.refs.floating, floating.refs.reference, handlePointerDownOutside, anchorRef]);

  let wrappedChildren = children;
  if (isElement(children)) {
    const childProps = children.props as Record<string, unknown> & { id?: string; role?: string };
    wrappedChildren = React.cloneElement(children, {
      ...childProps,
      id: childProps.id ?? panelId,
      role: childProps.role ?? 'dialog',
    } as Partial<typeof childProps>);
  }

  return (
    <FloatingPortal>
      {isOpen ? (
        <div
          {...interactions.getFloatingProps({
            ref: composeRefs(floating.refs.setFloating, ref),
            tabIndex: -1,
            onKeyDown,
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
