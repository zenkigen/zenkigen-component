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
  /** true のとき 5 秒後に自動で閉じ、onClickClose を呼ぶ。既定は false（ToastProvider 経由のトーストには既定で true が渡される）。 */
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
  // 既定 false は v1.22.0 までの互換維持のため据え置き（自動クローズしない既定では、安全弁により閉じるボタンが表示される）。
  // 「自動クローズ・閉じるボタンなし」の新しい既定は ToastProvider が isAutoClose を明示的に渡すことで実現している。
  isAutoClose = false,
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
        {/*
          アイコン(24px)は 1 行分の高さ(約 20px)より大きいため、幾何学的にはテキストを 2px 下げると中心が揃う。
          ただし文字の実描画位置は行ボックスの中央より約 0.8px 上に来るため、それも含めて 3px 下げ、
          1 行目の文字とアイコンの光学的な中心を合わせる。下側には余白を入れず、1 行時の高さをアイコン基準に保つ
        */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 pt-[3px]">
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
