import { clsx } from 'clsx';
import type { ChangeEvent, FormEvent, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';

/**
 * 内部の input にそのまま渡す属性（`autoComplete` / `name` / `id` / `aria-*` / `onKeyDown` など）。
 * 以下は Search 側で意味を持つ、または見た目を固定しているため型で受け取らない。
 * - `size` / `width` / `onSubmit`: Search の props として別の意味で使う（`width` は外枠の幅、`onSubmit` は内部 form の送信）
 * - `className` / `style`: 見た目はコンポーネント側で固定する
 * - `type`: 常に `text`
 * - `disabled`: 無効時のスタイル・クリアボタンの扱いを持たないため提供しない（仕様書の注意事項を参照）
 * 除外は型によるもので、実行時には取り除かない（`className` / `type` は展開の後に指定するため上書きされる）。
 */
type InputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'width' | 'className' | 'style' | 'type' | 'disabled' | 'value' | 'onChange' | 'onSubmit' | 'placeholder'
>;

type Props = InputAttributes & {
  /** サイズ */
  size?: 'medium' | 'large';
  /** 入力欄に表示するプレースホルダー */
  placeholder?: string;
  /** 入力フィールドの幅。CSSの幅指定文字列を渡す */
  width?: string;
  /** 現在の入力値 */
  value: string;
  /** 入力値変更時に呼び出されるハンドラ */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Enterキーなどでフォーム送信された際のハンドラ */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** クリアボタン押下時のハンドラ。指定時のみボタンを描画する */
  onClickClearButton?: () => void;
};

export const Search = forwardRef<HTMLDivElement, Props>(
  ({ width = '100%', size = 'medium', value, onChange, onSubmit, onClickClearButton, ...inputProps }: Props, ref) => {
    const classes = clsx(
      'flex items-center rounded-full border border-uiBorder02 bg-uiBackground01 focus-within:border-activeInput',
      { 'h-8 px-3': size === 'medium' },
      { 'h-10 px-4': size === 'large' },
    );

    const inputClasses = clsx('mx-2 h-full flex-1 text-text01 outline-none placeholder:text-textPlaceholder', {
      ['typography-label14regular']: size === 'medium',
      ['typography-label16regular']: size === 'large',
    });

    return (
      <div className="relative" ref={ref}>
        <form onSubmit={onSubmit}>
          <div className={classes} style={{ width }}>
            <Icon name="search" color="icon01" size="medium" />
            <input {...inputProps} type="text" size={1} value={value} className={inputClasses} onChange={onChange} />
            {onClickClearButton && value && value.length !== 0 && (
              <IconButton
                variant="text"
                icon="close"
                size={size === 'medium' ? 'small' : 'medium'}
                isNoPadding
                onClick={onClickClearButton}
              />
            )}
          </div>
        </form>
      </div>
    );
  },
);
Search.displayName = 'Search';
