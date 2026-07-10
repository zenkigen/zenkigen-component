import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Props = {
  /** 通知の状態を表す。表示する背景色とアイコンが切り替わる。 */
  state?: 'success' | 'warning' | 'information' | 'attention' | 'default';
  /** コンポーネントの縦サイズとパディングを制御する。 */
  size?: 'small' | 'medium';
  /** 枠線の有無を切り替える。outline は state に応じた 1px の枠線を表示する。 */
  variant?: 'default' | 'outline';
  /** 通知に表示するメッセージ本体。 */
  children?: ReactNode;
} & (
  | {
      /** 閉じるボタンを表示しない場合の設定。 */
      showClose?: false;
    }
  | {
      /** 閉じるボタンを表示する場合の設定。 */
      showClose: true;
      /** 閉じるボタンがクリックされたときのハンドラ。 */
      onClickClose: () => void;
    }
);

export function NotificationInline({ state = 'default', size = 'medium', variant = 'default', ...props }: Props) {
  const isOutline = variant === 'outline';
  // 枠線の有無で外形寸法が変わらないよう、常時 1px の border を張り padding を 1px 分差し引く
  const wrapperClasses = clsx('typography-body13regular flex items-center gap-1 rounded border text-text01', {
    'bg-uiBackgroundError': state === 'attention',
    'bg-uiBackgroundWarning': state === 'warning',
    'bg-uiBackgroundBlue': state === 'information',
    'bg-uiBackgroundSuccess': state === 'success',
    'bg-uiBackgroundGray': state === 'default',
    'p-[calc(0.75rem_-_1px)]': size === 'small',
    // medium はアイコン(24px)が高さの基準になるため、アイコン非表示(state='default')でも同じ高さになるよう最小高を確保する
    'min-h-14 p-[calc(1rem_-_1px)]': size === 'medium',
    'border-transparent': !isOutline,
    'border-supportError': isOutline && state === 'attention',
    'border-supportWarning': isOutline && state === 'warning',
    'border-supportInfo': isOutline && state === 'information',
    'border-supportSuccess': isOutline && state === 'success',
    'border-uiBorder04': isOutline && state === 'default',
  });

  // 複数行時にアイコンが 1 行目の中央に揃うよう、small は 1 行分の高さの箱の中でアイコンを中央配置する
  const iconClasses = clsx('flex shrink-0 items-center', {
    'h-5': size === 'small',
    'fill-supportError': state === 'attention',
    'fill-supportWarning': state === 'warning',
    'fill-blue-blue50': state === 'information',
    'fill-supportSuccess': state === 'success',
  });

  // medium はアイコン(24px)が 1 行分の高さ(約20px)より大きいため、テキスト側を 2px 下げて 1 行目とアイコンの中心を揃える
  const textClasses = clsx('flex-1', {
    'pt-[2px]': size === 'medium',
  });

  const iconName = {
    attention: 'attention',
    success: 'success-filled',
    warning: 'warning',
    information: 'information-filled',
  } as const;

  const iconSize = {
    small: 'small',
    medium: 'medium',
  } as const;

  return (
    <div className={wrapperClasses}>
      {/* アイコンとメッセージは上揃えのグループにまとめ、複数行時もアイコンが 1 行目に揃うようにする */}
      <div className="flex flex-1 items-start gap-1">
        {state !== 'default' && (
          <div className={iconClasses}>
            <Icon name={iconName[state]} size={iconSize[size]} />
          </div>
        )}
        <p className={textClasses}>{props.children}</p>
      </div>
      {props.showClose === true && (
        <div className="ml-2 flex shrink-0 items-center">
          <IconButton icon="close" size="small" variant="text" onClick={props.onClickClose} />
        </div>
      )}
    </div>
  );
}
