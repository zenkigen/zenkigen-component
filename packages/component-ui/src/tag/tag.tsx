import { tagColors, tagLightColors } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

import { DeleteIcon } from './delete-icon';
import type { ColorVariant, TagColor } from './type';

type Props = {
  /** 削除イベントで使用するタグの一意なID。 */
  id: string;
  /** タグに表示する1行のテキスト。 */
  children: string;
  /** `tagColors`/`tagLightColors` で定義されたカラートークンのキー。 */
  color: TagColor;
  /** `'normal'` は濃色、`'light'` は淡色のスタイルを適用する。 */
  variant?: ColorVariant;
} & (
  | {
      /** 削除ボタンを表示してタグを編集可能にする。 */
      isEditable: true;
      /** 削除ボタン押下時にタグのIDを受け取るハンドラ。 */
      onDelete: (id: string) => void;
      /** 編集可能なタグは `medium` のみサポートする。 */
      size?: 'medium';
    }
  | {
      /** 標準表示のため `isEditable` は指定しない。 */
      isEditable?: undefined;
      /** 編集不可のタグでは `onDelete` を受け付けない。 */
      onDelete?: never;
      /** 標準表示時に選択可能なサイズ。 */
      size?: 'x-small' | 'small' | 'medium';
    }
);

export function Tag({ id, children, color, variant = 'normal', size = 'medium', isEditable, onDelete }: Props) {
  const wrapperClasses = clsx('flex', 'items-center', 'justify-center', {
    [tagColors[color]]: variant === 'normal',
    [tagLightColors[color]]: variant === 'light',
    'h-[14px] typography-label11regular': !isEditable && size === 'x-small',
    'h-4 typography-label12regular': !isEditable && size === 'small',
    'h-[18px] typography-label14regular': !isEditable && size === 'medium',
    'h-[22px] typography-label14regular': isEditable && size === 'medium',
    'rounded-full': isEditable,
    rounded: !isEditable,
    'py-0.5 px-1': !isEditable,
    'py-1 px-2': isEditable,
  });

  return (
    <div className={wrapperClasses}>
      {children}
      {isEditable ? <DeleteIcon onClick={() => onDelete(id)} color={color} variant={variant} /> : null}
    </div>
  );
}
