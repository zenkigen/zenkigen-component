import type { useFloating } from '@floating-ui/react';
import type * as React from 'react';
import { createContext, useContext } from 'react';

/**
 * Popoverが閉じられる理由を定義する型
 */
export type CloseReason = 'outside-click' | 'escape-key-down';

/**
 * Popoverのクローズイベントの型定義
 */
export type PopoverCloseEvent = {
  /** 閉じられた理由 */
  reason: CloseReason;
};

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
  anchorRef?: React.RefObject<HTMLElement | null>;
  floating: ReturnType<typeof useFloating>;
  contentId: string;
  panelId: string;
  onClose?: (event: PopoverCloseEvent) => void;
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
