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
    'p-[calc(0.5rem_-_1px)]': size === 'small',
    'p-[calc(0.75rem_-_1px)]': size === 'medium',
    'border-transparent': !isOutline,
    'border-supportError': isOutline && state === 'attention',
    'border-supportWarning': isOutline && state === 'warning',
    'border-supportInfo': isOutline && state === 'information',
    'border-supportSuccess': isOutline && state === 'success',
    'border-uiBorder04': isOutline && state === 'default',
  });

  const iconClasses = clsx('flex items-center', {
    'fill-supportError': state === 'attention',
    'fill-supportWarning': state === 'warning',
    'fill-blue-blue50': state === 'information',
    'fill-supportSuccess': state === 'success',
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
      {state !== 'default' && (
        <div className={iconClasses}>
          <Icon name={iconName[state]} size={iconSize[size]} />
        </div>
      )}
      <p className="flex-1">{props.children}</p>
      {props.showClose === true && (
        <div className="flex items-center">
          <IconButton icon="close" size="small" variant="text" onClick={props.onClickClose} />
        </div>
      )}
    </div>
  );
}
