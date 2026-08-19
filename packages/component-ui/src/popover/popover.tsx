import { autoUpdate, flip, offset, shift, useFloating, useId as useFloatingId } from '@floating-ui/react';
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

/**
 * ビューポート端との最小マージン（flip / shift の判定余白）
 *
 * combobox.tsx の FLOATING_VIEWPORT_PADDING と同値。
 * shift はこのマージンを確保するため、ビューポート端から 8px 以内に配置された
 * Popover を最大 8px 内側へ移動させる。
 */
const FLOATING_VIEWPORT_PADDING = 8;

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

  /**
   * 順序は offset → flip → shift で固定する
   *
   * flip がメイン軸（bottom↔top）の反転のみを担当し、クロス軸（左右）は shift が
   * 必要最小限だけずらす。逆順にすると shift がずらした結果を flip が判定してしまう。
   *
   * flipAlignment は既定で有効なため、無効化しないと flip が揃え位置（start/end）まで
   * 反転させてこの分担が崩れる。トリガーより広いパネル（例: DatePicker のカレンダー）が
   * 画面端に寄った際、shift の最小移動ではなく反対側の端揃えに切り替わってしまう。
   */
  const middleware = useMemo(
    () => [
      offset(offsetValue),
      flip({ padding: FLOATING_VIEWPORT_PADDING, flipAlignment: false }),
      shift({ padding: FLOATING_VIEWPORT_PADDING }),
    ],
    [offsetValue],
  );

  const floating = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      /**
       * Floating UIのuseDismissフックによって閉じられた場合の処理
       *
       * 注意: このコールバックは外部クリックで呼ばれるため、reasonは'outside-click'として扱う
       * Escapeキーの場合は、PopoverContent内の独自ハンドラーで処理される
       */
      if (!open && onClose != null) {
        onClose({ reason: 'outside-click' });
      }
    },
    placement,
    middleware,
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
