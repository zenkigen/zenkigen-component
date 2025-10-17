import { autoUpdate, offset, useFloating, useId as useFloatingId } from '@floating-ui/react';
import type { PropsWithChildren } from 'react';
import { useMemo, useRef } from 'react';

import { PopoverContent } from './popover-content';
import { PopoverContext, type PopoverContextValue, type PopoverPlacement } from './popover-context';
import { PopoverTrigger } from './popover-trigger';

type Props = {
  isOpen: boolean;
  placement?: PopoverPlacement;
  offset?: number;
  onOutsideClick?: () => void;
  onEscapeKeyDown?: () => void;
};

export function Popover({
  isOpen,
  children,
  placement = 'top',
  offset: offsetValue = 8,
  onOutsideClick,
  onEscapeKeyDown,
}: PropsWithChildren<Props>) {
  const triggerRef = useRef<HTMLElement>(null);

  const floating = useFloating({
    open: isOpen,
    placement,
    middleware: [offset(offsetValue)],
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
  });

  const contentId = useFloatingId() ?? '';
  const panelId = `${contentId}-panel`;

  const contextValue = useMemo<PopoverContextValue>(
    () => ({
      isOpen,
      triggerRef,
      floating,
      contentId,
      panelId,
      onOutsideClick,
      onEscapeKeyDown,
    }),
    [isOpen, floating, contentId, panelId, onOutsideClick, onEscapeKeyDown],
  );

  return <PopoverContext.Provider value={contextValue}>{children}</PopoverContext.Provider>;
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
