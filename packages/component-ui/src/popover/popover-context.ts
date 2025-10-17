import type { useFloating } from '@floating-ui/react';
import type * as React from 'react';
import { createContext, useContext } from 'react';

/**
 * Popoverの配置位置を定義する型
 */
export type PopoverPlacement =
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
 * Popover Context の値の型定義
 */
export type PopoverContextValue = {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  floating: ReturnType<typeof useFloating>;
  contentId: string;
  panelId: string;
  onOutsideClick?: () => void;
  onEscapeKeyDown?: () => void;
};

/**
 * Popover Context
 */
export const PopoverContext = createContext<PopoverContextValue | null>(null);

/**
 * Popover Context を取得するカスタムフック
 */
export const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (context == null) {
    throw new Error('Popover components must be used inside <Popover.Root>');
  }

  return context;
};
