import clsx from 'clsx';
import type { AnimationEvent, CSSProperties, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';
import type { ToastState } from './type';

const CLOSE_TIME_MSEC = 5000;

type Props = {
  /** 表示するメッセージの状態（色・アイコンを切り替えます） */
  state?: ToastState;
  /** トースト全体の幅。数値・文字列いずれも指定可能 */
  width?: CSSProperties['width'];
  /** true で 5 秒後に自動で閉じる */
  isAutoClose?: boolean;
  /** true でフェードイン/アウトのアニメーションを有効化 */
  isAnimation?: boolean;
  /** 表示する本文 */
  children?: ReactNode;
  /** クローズボタンや自動クローズ完了時に呼び出されるコールバック */
  onClickClose: () => void;
};

export function Toast({
  state = 'information',
  width = 'auto',
  isAutoClose = false,
  isAnimation = false,
  children,
  onClickClose,
}: Props) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClose = useCallback(() => {
    if (isAnimation) {
      setIsRemoving(true);
    } else {
      onClickClose();
    }
  }, [isAnimation, onClickClose]);

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) =>
    window.getComputedStyle(e.currentTarget).opacity === '0' && onClickClose();

  const wrapperClasses = clsx('pointer-events-auto flex items-start gap-1 bg-white p-4 shadow-floatingShadow', {
    ['animate-toast-in']: isAnimation && !isRemoving,
    ['animate-toast-out opacity-0']: isAnimation && isRemoving,
  });
  const iconClasses = clsx('flex items-center', {
    'fill-supportSuccess': state === 'success',
    'fill-supportError': state === 'error',
    'fill-supportWarning': state === 'warning',
    'fill-supportInfo': state === 'information',
  });
  const textClasses = clsx('typography-body13regular flex-1 pt-[3px]', {
    'text-supportError': state === 'error',
    'text-text01': state === 'success' || state === 'warning' || state === 'information',
  });

  const iconName = {
    success: 'success-filled',
    error: 'attention',
    warning: 'warning',
    information: 'information-filled',
  } as const;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isAutoClose) {
        setIsRemoving(true);
      }
    }, CLOSE_TIME_MSEC);

    return () => window.clearTimeout(timer);
  }, [isAutoClose]);

  return (
    <div className={wrapperClasses} style={{ width }} onAnimationEnd={handleAnimationEnd}>
      <div className={iconClasses}>
        <Icon name={iconName[state]} />
      </div>
      <p className={textClasses}>{children}</p>
      <IconButton icon="close" size="medium" variant="text" onClick={handleClose} isNoPadding />
    </div>
  );
}
