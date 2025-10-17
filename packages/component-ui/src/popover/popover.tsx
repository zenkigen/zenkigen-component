import { autoUpdate, offset, useFloating, useId as useFloatingId } from '@floating-ui/react';
import type { PropsWithChildren } from 'react';
import { useMemo, useRef } from 'react';

import { PopoverContent } from './popover-content';
import { PopoverContext, type PopoverContextValue, type PopoverPlacement } from './popover-context';
import { PopoverTrigger } from './popover-trigger';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  placement?: PopoverPlacement;
  offset?: number;
};

export function Popover({
  isOpen,
  onOpenChange,
  children,
  placement = 'top',
  offset: offsetValue = 8,
}: PropsWithChildren<Props>) {
  const triggerRef = useRef<HTMLElement>(null);

  const floating = useFloating({
    open: isOpen,
    onOpenChange,
    placement,
    middleware: [offset(offsetValue)],
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
  });

  const contentId = useFloatingId() ?? '';
  const panelId = `${contentId}-panel`;

  const contextValue = useMemo<PopoverContextValue>(
    () => ({ isOpen, setOpen: onOpenChange, triggerRef, floating, contentId, panelId }),
    [isOpen, onOpenChange, floating, contentId, panelId],
  );

  return <PopoverContext.Provider value={contextValue}>{children}</PopoverContext.Provider>;
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
