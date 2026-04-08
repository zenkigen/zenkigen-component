import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import { CheckedIcon } from './checked-icon';
import { MinusIcon } from './minus-icon';

type Props = {
  /** フォーム送信用の name 属性 */
  name?: string;
  /** フォーム送信用の値 */
  value?: string;
  /** 入力要素の ID。label と関連付ける場合に指定する */
  id?: string;
  /** チェック状態（制御用） */
  isChecked?: boolean;
  /** 色バリエーション。default: インタラクティブ色 / gray: グレー系 / error: エラー色 */
  color?: 'default' | 'gray' | 'error';
  /** サイズバリエーション。medium: box 20px / large: box 24px */
  size?: 'medium' | 'large';
  /** インデターミネイト表示を行うか（表示時は isChecked も true を推奨） */
  isIndeterminate?: boolean;
  /** 無効状態にするか */
  isDisabled?: boolean;
  /** 右側に表示するラベルテキスト */
  label?: string;
  /** 状態変化時のハンドラー。isDisabled=true の場合は呼ばれない */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  name,
  value,
  id,
  isChecked = false,
  isIndeterminate = false,
  isDisabled = false,
  onChange,
  label,
  color = 'default',
  size = 'medium',
}: Props) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOverInput = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseOutInput = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => !isDisabled && onChange?.(e),
    [isDisabled, onChange],
  );

  const sizeBox = size === 'large' ? 'size-6' : 'size-5';

  const baseInputClasses = clsx('peer absolute inset-0 z-[1] opacity-0', {
    'cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  });

  const boxClasses = clsx(
    'inline-flex items-center justify-center rounded-sm border bg-white',
    sizeBox,
    focusVisible.normalPeer,
    {
      'border-disabled01': isDisabled,
      'border-hoverUiBorder': !isDisabled && isMouseOver && color === 'default',
      'border-uiBorder04': !isDisabled && !isMouseOver && color === 'default',
      'border-interactive02': !isDisabled && !isMouseOver && color === 'gray',
      'border-hoverError': !isDisabled && isMouseOver && color === 'error',
      'border-supportError': !isDisabled && !isMouseOver && color === 'error',
    },
  );

  const indicatorClasses = clsx('relative flex flex-[0_0_auto] items-center justify-center', sizeBox, {
    'bg-disabled01': isDisabled && isChecked,
    'border-disabled01': isDisabled,
  });

  const afterClasses = clsx('absolute inset-0 m-auto block rounded-sm', {
    'bg-disabled01': isDisabled && isChecked,
    'bg-hover01': !(isDisabled && isChecked) && isMouseOver,
    'bg-interactive01': !(isDisabled && isChecked) && !isMouseOver,
    'bg-hoverGray': !(isDisabled && isChecked) && isMouseOver && color === 'gray',
    'bg-interactive02': !(isDisabled && isChecked) && !isMouseOver && color === 'gray',
    'bg-hoverError': !(isDisabled && isChecked) && isMouseOver && color === 'error',
    'bg-supportError': !(isDisabled && isChecked) && !isMouseOver && color === 'error',
    'scale-0': !isChecked,
    'scale-100': isChecked,
  });

  const hoverIndicatorClasses = clsx('inline-block rounded-[1px]', {
    'size-3': size === 'medium',
    'size-4': size === 'large',
    'bg-hoverUi': !isDisabled && !isChecked && isMouseOver,
  });

  const labelClasses = clsx('ml-2 flex-[1_0_0] break-all', {
    'typography-label14regular': size === 'medium',
    'typography-label16regular': size === 'large',
    'pointer-events-none cursor-not-allowed text-disabled01': isDisabled,
    'cursor-pointer text-text01': !isDisabled,
  });

  const outerWrapperClasses = clsx('relative flex items-center justify-center', {
    'size-6': size === 'medium',
    'h-8 w-7': size === 'large',
  });

  return (
    <div className="flex items-center">
      <div className={outerWrapperClasses}>
        <input
          type="checkbox"
          value={value}
          name={name}
          id={id}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          onMouseOver={handleMouseOverInput}
          onMouseLeave={handleMouseOutInput}
          className={baseInputClasses}
        />
        <div className={boxClasses}>
          <div className={indicatorClasses}>
            <span className={afterClasses}>
              {isChecked && !isIndeterminate && <CheckedIcon size={size} />}
              {isIndeterminate && <MinusIcon size={size} />}
            </span>
            <span className={hoverIndicatorClasses} />
          </div>
        </div>
      </div>
      {label != null && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
    </div>
  );
}
