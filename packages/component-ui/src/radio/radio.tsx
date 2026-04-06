import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

type Props = {
  /** フォーム送信用の name 属性。グループ化して単一選択を扱う場合に指定する */
  name?: string;
  /** フォーム送信用の値 */
  value?: string;
  /** 入力要素の ID。label と関連付ける場合に指定する */
  id?: string;
  /** 右側に表示するラベルテキスト */
  label?: string;
  /** 選択状態（制御用） */
  isChecked?: boolean;
  /** 無効状態にするか */
  isDisabled?: boolean;
  /** ラジオボタンのサイズ */
  size?: 'medium' | 'large';
  /** 状態変化時のハンドラー。isDisabled=true の場合は呼ばれない */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Radio({
  name,
  value,
  id,
  label,
  isChecked = false,
  isDisabled = false,
  size = 'medium',
  onChange,
}: Props) {
  const isLarge = size === 'large';
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

  const inputClasses = clsx('peer absolute z-[1] opacity-0', {
    'size-6': !isLarge,
    'size-8': isLarge,
    'cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  });

  const boxClasses = clsx(
    'inline-flex items-center justify-center rounded-full border border-solid bg-white',
    { 'size-5': !isLarge, 'size-7': isLarge },
    focusVisible.normalPeer,
    {
      'border-disabled01 hover:border-disabled01': isDisabled && !isMouseOver,
      'border-hoverUiBorder': !isDisabled && isMouseOver,
      'border-uiBorder04': !isDisabled,
      'cursor-not-allowed': isDisabled,
      'cursor-pointer': !isDisabled,
    },
  );

  const afterClasses = clsx(
    'absolute inset-0 m-auto block rounded-full',
    { 'size-3': !isLarge, 'size-4': isLarge },
    {
      'bg-disabled01': isDisabled && isChecked,
      'bg-activeSelectedUi': !isDisabled && isChecked,
      'scale-0': !isChecked,
      'scale-100': isChecked,
    },
  );

  const hoverIndicatorClasses = clsx(
    'inline-block rounded-full',
    { 'size-3': !isLarge, 'size-4': isLarge },
    {
      'bg-hoverUi': !isDisabled && !isChecked && isMouseOver,
    },
  );

  const labelClasses = clsx('ml-2 flex-[1_0_0] select-none break-all', {
    'typography-label14regular': !isLarge,
    'typography-label16regular': isLarge,
    'pointer-events-none cursor-not-allowed text-disabled01': isDisabled,
    'cursor-pointer text-text01': !isDisabled,
  });

  return (
    <div className="flex items-center">
      <div className={clsx('relative flex items-center justify-center', { 'size-6': !isLarge, 'size-8': isLarge })}>
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
          className={inputClasses}
        />
        <div className={boxClasses}>
          <div
            className={clsx('relative flex flex-[0_0_auto] items-center justify-center', {
              'size-5': !isLarge,
              'size-7': isLarge,
            })}
          >
            <span className={afterClasses} />
            <span className={hoverIndicatorClasses} />
          </div>
        </div>
      </div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}
