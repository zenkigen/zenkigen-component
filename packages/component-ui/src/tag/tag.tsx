import { tagColors, tagLightColors } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

import { DeleteIcon } from './delete-icon';
import type { ColorVariant, TagColor } from './type';

type BaseProps = {
  /** 削除イベントで使用するタグの一意なID。 */
  id: string;
  /** タグに表示する1行のテキスト。 */
  children: string;
  /** `tagColors`/`tagLightColors` で定義されたカラートークンのキー。 */
  color: TagColor;
  /** `'normal'` は濃色、`'light'` は淡色のスタイルを適用する。 */
  variant?: ColorVariant;
};

type EditableProps = {
  /** 削除ボタンを表示してタグを編集可能にする。 */
  isEditable: true;
  /** 削除ボタン押下時にタグのIDを受け取るハンドラ。 */
  onDelete: (id: string) => void;
  /** 編集可能なタグは `medium` のみサポートする。 */
  size?: 'medium';
};

type DisplayProps = {
  /** 標準表示のため `isEditable` は指定しない。 */
  isEditable?: undefined;
  /** 編集不可のタグでは `onDelete` を受け付けない。 */
  onDelete?: never;
  /** 標準表示時に選択可能なサイズ。 */
  size?: 'x-small' | 'small' | 'medium';
};

type Props = BaseProps & (EditableProps | DisplayProps);

/** @internal Tag で内部利用する props（isDisabled / isDeletable を含む） */
type TagInternalProps = BaseProps &
  (
    | (EditableProps & {
        /** 無効状態にする。削除ボタンを描画せず、文字色を薄くする。形・余白は編集可能なタグのまま（内部実装用）。 */
        isDisabled?: boolean;
        /** `false` で削除ボタンを描画しない。形・余白・文字色は編集可能なタグのまま（内部実装用）。 */
        isDeletable?: boolean;
      })
    | (DisplayProps & {
        /** 編集不可のタグでは `isDisabled` を受け付けない。 */
        isDisabled?: never;
        /** 編集不可のタグでは `isDeletable` を受け付けない。 */
        isDeletable?: never;
      })
  );

/**
 * 無効状態の見た目。デザイン確認中の仮案のため、差し替えはこの関数だけで完結させる。
 * 仮案: 背景色はそのまま、文字色だけを `text-disabled01` に置き換える。
 *
 * `tagColors` / `tagLightColors` は文字色と背景色を 1 つの文字列にまとめているため、
 * `text-disabled01` を足すだけだと `text-*` が 2 つ付き、どちらが効くかが CSS の定義順に依存する。
 * テーマ側に文字色・背景色を分けた定義が無いので、元の文字色クラス（`text-` で始まるもの）を除いてから付与する。
 */
const getDisabledColorClasses = (colorClasses: string) =>
  clsx(
    colorClasses.split(' ').filter((className) => !className.startsWith('text-')),
    'text-disabled01',
  );

/**
 * 内部実装用の Tag（Combobox のチップで使用）。ライブラリ外には公開しない。
 * 公開 `Tag` の props に加え、編集可能なタグでのみ `isDisabled` / `isDeletable` を受け付ける。
 */
function InternalTag({
  id,
  children,
  color,
  variant = 'normal',
  size = 'medium',
  isEditable,
  onDelete,
  isDisabled = false,
  isDeletable = true,
}: TagInternalProps) {
  const colorClasses = variant === 'light' ? tagLightColors[color] : tagColors[color];
  const isDisabledEditable = isEditable === true && isDisabled;

  const wrapperClasses = clsx('flex', 'items-center', 'justify-center', {
    [colorClasses]: !isDisabledEditable,
    [getDisabledColorClasses(colorClasses)]: isDisabledEditable,
    'h-[14px] typography-label11regular': !isEditable && size === 'x-small',
    'h-4 typography-label12regular': !isEditable && size === 'small',
    'h-5 typography-label14regular': size === 'medium',
    'rounded-full': isEditable,
    rounded: !isEditable,
    'px-1': !isEditable,
    'px-2': isEditable,
  });

  // 無効状態では isDeletable の値に関わらず削除ボタンを描画しない
  const hasDeleteButton = isEditable === true && !isDisabled && isDeletable;

  return (
    <div className={wrapperClasses}>
      {children}
      {hasDeleteButton ? (
        <DeleteIcon onClick={() => onDelete(id)} color={color} variant={variant} ariaLabel={`${children}を削除`} />
      ) : null}
    </div>
  );
}

export function Tag(props: Props) {
  // 公開 props だけを明示的に転送する。`{...props}` で素通しすると、型にない isDisabled / isDeletable が
  // オブジェクトの展開などで実行時に届き、公開 Tag の見た目が変わってしまうため。
  if (props.isEditable === true) {
    const { id, children, color, variant, size, isEditable, onDelete } = props;

    return (
      <InternalTag id={id} color={color} variant={variant} size={size} isEditable={isEditable} onDelete={onDelete}>
        {children}
      </InternalTag>
    );
  }

  const { id, children, color, variant, size } = props;

  return (
    <InternalTag id={id} color={color} variant={variant} size={size}>
      {children}
    </InternalTag>
  );
}

export { InternalTag };
