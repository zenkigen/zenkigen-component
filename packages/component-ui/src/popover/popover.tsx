import { autoUpdate, offset, useFloating, useId as useFloatingId } from '@floating-ui/react';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useRef } from 'react';

import { PopoverContent } from './popover-content';
import {
  type PopoverCloseEvent,
  PopoverContext,
  type PopoverContextValue,
  type PopoverPlacement,
} from './popover-context';
import { PopoverTrigger } from './popover-trigger';

type Props = {
  isOpen: boolean;
  placement?: PopoverPlacement;
  offset?: number;
  onClose?: (event: PopoverCloseEvent) => void;
  anchorRef?: React.RefObject<HTMLElement | null>;
};

export function Popover({
  isOpen,
  children,
  placement = 'top',
  offset: offsetValue = 8,
  onClose,
  anchorRef,
}: PropsWithChildren<Props>) {
  const triggerRef = useRef<HTMLElement>(null);

  const floating = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      // useDismissによって閉じられた場合、onCloseコールバックを呼ぶ
      // ただし、reasonは'outside-click'として扱う（Escapeキーの場合は別途ハンドラーで処理）
      if (!open && onClose != null) {
        onClose({ reason: 'outside-click' });
      }
    },
    placement,
    middleware: [offset(offsetValue)],
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
  });

  useEffect(() => {
    if (anchorRef?.current) {
      floating.refs.setReference(anchorRef.current);
    }
  }, [anchorRef, floating.refs]);

  const contentId = useFloatingId() ?? '';
  const panelId = `${contentId}-panel`;

  const contextValue = useMemo<PopoverContextValue>(
    () => ({
      isOpen,
      triggerRef,
      anchorRef,
      floating,
      contentId,
      panelId,
      onClose,
    }),
    [isOpen, triggerRef, anchorRef, floating, contentId, panelId, onClose],
  );

  return <PopoverContext.Provider value={contextValue}>{children}</PopoverContext.Provider>;
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
