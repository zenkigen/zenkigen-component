import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Props = {
  /** 通知の状態を表す。表示する背景色とアイコンが切り替わる。 */
  state?: 'success' | 'warning' | 'information' | 'attention' | 'default';
  /** コンポーネントの縦サイズとパディングを制御する。 */
  size?: 'small' | 'medium';
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

export function NotificationInline({ state = 'default', size = 'medium', ...props }: Props) {
  const wrapperClasses = clsx('typography-body13regular flex items-center gap-1 rounded text-text01', {
    'bg-uiBackgroundError': state === 'attention',
    'bg-uiBackgroundWarning': state === 'warning',
    'bg-uiBackgroundBlue': state === 'information',
    'bg-uiBackgroundSuccess': state === 'success',
    'bg-uiBackgroundGray': state === 'default',
    'p-2': size === 'small',
    'p-3': size === 'medium',
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
