import { FloatingPortal, useDismiss, useInteractions, useRole } from '@floating-ui/react';
import * as React from 'react';
import { forwardRef, useEffect } from 'react';

import { composeRefs, isElement } from '../utils';
import { usePopoverContext } from './popover-context';

type PopoverContentProps = {
  children?: React.ReactNode;
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { children },
  ref,
) {
  const { isOpen, setOpen, triggerRef, floating, panelId } = usePopoverContext();

  const interactions = useInteractions([
    useDismiss(floating.context, { outsidePressEvent: 'pointerdown' }),
    useRole(floating.context, { role: 'dialog' }),
  ]);

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
      setOpen(false);
    }
  };

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
