import { clsx } from 'clsx';
import type { AnimationEvent, CSSProperties, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';
import type { ToastState } from './type';

const CLOSE_TIME_MSEC = 5000;

type Props = {
  /** トーストの状態を表す。表示するアイコンとタイトルの文字色が切り替わる。 */
  state?: ToastState;
  /** トースト全体の幅。数値・文字列いずれも指定できる。 */
  width?: CSSProperties['width'];
  /** true のとき 5 秒後に自動で閉じ、onClickClose を呼ぶ。 */
  isAutoClose?: boolean;
  /** true のときフェードイン / フェードアウトのアニメーションを有効にする。 */
  isAnimation?: boolean;
  /** true のとき閉じるボタンを表示する。isAutoClose が false のときは指定に関わらず必ず表示される。 */
  hasCloseButton?: boolean;
  /** タイトルの下に表示する補足テキスト。 */
  description?: ReactNode;
  /** タイトルとして表示する本文。 */
  children?: ReactNode;
  /** 閉じるボタン押下時および自動クローズ完了時に呼ばれる、トースト終了の通知コールバック。 */
  onClickClose: () => void;
};

export function Toast({
  state = 'information',
  width = 'auto',
  isAutoClose = true,
  isAnimation = false,
  hasCloseButton = false,
  description,
  children,
  onClickClose,
}: Props) {
  const [isRemoving, setIsRemoving] = useState(false);

  // 自動クローズのタイマーから常に最新のコールバックを呼ぶために ref に保持する。
  // 依存配列に onClickClose を直接入れると、インライン関数を渡す ToastProvider ではレンダーのたびに
  // タイマーがリセットされ、永久に閉じなくなるため。
  const onClickCloseRef = useRef(onClickClose);

  useEffect(() => {
    onClickCloseRef.current = onClickClose;
  }, [onClickClose]);

  const handleClose = useCallback(() => {
    if (isAnimation) {
      setIsRemoving(true);
    } else {
      onClickClose();
    }
  }, [isAnimation, onClickClose]);

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) =>
    window.getComputedStyle(e.currentTarget).opacity === '0' && onClickClose();

  useEffect(() => {
    if (!isAutoClose) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (isAnimation) {
        setIsRemoving(true);
      } else {
        onClickCloseRef.current();
      }
    }, CLOSE_TIME_MSEC);

    return () => window.clearTimeout(timer);
  }, [isAutoClose, isAnimation]);

  // 自動で閉じないトーストで閉じるボタンまで無いと、利用者がトーストを消せなくなるための安全弁。
  const isCloseButtonShown = hasCloseButton || !isAutoClose;

  const wrapperClasses = clsx(
    'pointer-events-auto flex items-center gap-3 rounded border border-solid border-uiBorder01 bg-uiBackground01 p-4 shadow-floatingShadow',
    {
      ['animate-toast-in']: isAnimation && !isRemoving,
      ['animate-toast-out opacity-0']: isAnimation && isRemoving,
    },
  );
  const iconClasses = clsx('flex shrink-0 items-center', {
    'fill-supportSuccess': state === 'success',
    'fill-supportError': state === 'error',
    'fill-supportWarning': state === 'warning',
    'fill-supportInfo': state === 'information',
  });
  const titleClasses = clsx('typography-body13regular break-words', {
    'text-supportError': state === 'error',
    'text-text01': state !== 'error',
  });

  const iconName = {
    success: 'success-filled',
    error: 'attention',
    warning: 'warning',
    information: 'information-filled',
  } as const;

  return (
    <div className={wrapperClasses} style={{ width }} onAnimationEnd={handleAnimationEnd}>
      <div className="flex min-w-0 flex-1 items-start gap-1">
        <div className={iconClasses}>
          <Icon name={iconName[state]} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2 py-0.5">
          <p className={titleClasses}>{children}</p>
          {description != null && <p className="typography-label12regular break-words text-text01">{description}</p>}
        </div>
      </div>
      {isCloseButtonShown && (
        <div className="flex shrink-0 items-center">
          <IconButton icon="close" size="medium" variant="text" isNoPadding aria-label="閉じる" onClick={handleClose} />
        </div>
      )}
    </div>
  );
}
