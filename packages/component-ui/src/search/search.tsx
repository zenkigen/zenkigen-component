import { clsx } from 'clsx';
import type { ChangeEvent, FormEvent } from 'react';
import { forwardRef } from 'react';

import { Icon } from '../icon';
import { IconButton } from '../icon-button';

type Props = {
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

export const Search = forwardRef<HTMLDivElement, Props>(({ width = '100%', size = 'medium', ...props }: Props, ref) => {
  const classes = clsx(
    'flex items-center rounded-full border border-uiBorder02 bg-uiBackground01 focus-within:border-activeInput',
    { 'h-8 px-3': size === 'medium' },
    { 'h-10 px-4': size === 'large' },
  );

  const inputClasses = clsx('mx-2 h-full flex-1 text-text01 outline-0 placeholder:text-textPlaceholder', {
    ['typography-label14regular']: size === 'medium',
    ['typography-label16regular']: size === 'large',
  });

  return (
    <div className="relative" ref={ref}>
      <form onSubmit={props.onSubmit}>
        <div className={classes} style={{ width }}>
          <Icon name="search" color="icon01" size="medium" />
          <input
            type="text"
            size={1}
            value={props.value}
            className={inputClasses}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
          {props.onClickClearButton && props.value && props.value.length !== 0 && (
            <IconButton
              variant="text"
              icon="close"
              size={size === 'medium' ? 'small' : 'medium'}
              isNoPadding
              onClick={props.onClickClearButton}
            />
          )}
        </div>
      </form>
    </div>
  );
});
Search.displayName = 'Search';
