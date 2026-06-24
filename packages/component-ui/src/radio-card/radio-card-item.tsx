import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { useId } from 'react';

import { useRadioCardContext } from './radio-card-context';

export type RadioCardItemProps = {
  /** このカードの値。グループの value と一致したとき選択状態になる */
  value: string;
  /** 主ラベル */
  label: string;
  /** 補足説明（ラベルの下に表示） */
  description?: string;
  /** このカード個別の無効化（グループの isDisabled と OR） */
  isDisabled?: boolean;
  /** input の id。未指定なら自動生成 */
  id?: string;
};

export function RadioCardItem({ value, label, description, isDisabled: itemDisabled = false, id }: RadioCardItemProps) {
  const context = useRadioCardContext('RadioCard.Item');
  const autoId = useId();
  const inputId = id ?? autoId;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-description`;

  const isChecked = context.value === value;
  const isDisabled = context.isDisabled || itemDisabled;
  const isError = context.isError && !isDisabled;
  const hasDescription = description != null && description !== '';
  const describedByProps = hasDescription ? { 'aria-describedby': descriptionId } : {};

  const handleChange = () => {
    if (!isDisabled) {
      context.onChange(value);
    }
  };

  // hover は丸（孫要素）にも効かせる必要があるため、card ルートを group にして group-hover で制御する。
  // （peer-hover は input の直接の兄弟にしか効かない）。focus リングは input の兄弟である card 見た目に peer で当てる。
  const cardClasses = clsx(
    'pointer-events-none flex flex-col gap-2 rounded border border-solid px-4 py-3',
    focusVisible.normalPeer,
    {
      'border-uiBorder02 bg-uiBackground01': isDisabled,
      'border-supportError bg-uiBackground01 group-hover:bg-hoverUi02': isError,
      'border-selectedUiBorder bg-selectedUi group-hover:bg-hoverUi02': !isDisabled && !isError && isChecked,
      'border-uiBorder02 bg-uiBackground01 group-hover:bg-hoverUi02': !isDisabled && !isError && !isChecked,
    },
  );

  const boxClasses = clsx(
    'relative inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-solid bg-white',
    {
      'border-disabled01': isDisabled,
      'border-supportError group-hover:border-hoverError': !isDisabled && isError,
      'border-uiBorder04 group-hover:border-hoverUiBorder': !isDisabled && !isError,
    },
  );

  // 選択時の中央ドット（色は状態別）。未選択時は scale-0 で隠す。
  const dotClasses = clsx('absolute inset-0 m-auto size-3 rounded-full', {
    'scale-100': isChecked,
    'scale-0': !isChecked,
    'bg-disabled01': isDisabled && isChecked,
    'bg-supportError': !isDisabled && isError && isChecked,
    'bg-activeSelectedUi': !isDisabled && !isError && isChecked,
  });

  // 未選択かつ有効時、ホバーで中央にグレーのインジケータを表示する。
  const hoverDotClasses = clsx('size-3 rounded-full bg-transparent', {
    'group-hover:bg-hoverUi': !isDisabled && !isChecked,
  });

  const labelClasses = clsx('typography-label14regular ml-2 select-none break-all', {
    'text-disabled01': isDisabled,
    'text-text01': !isDisabled,
  });

  const descriptionClasses = clsx('typography-body12regular pl-7', {
    'text-disabled01': isDisabled,
    'text-text02': !isDisabled,
  });

  return (
    <div className="group relative">
      <input
        type="radio"
        id={inputId}
        name={context.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
        aria-labelledby={labelId}
        aria-invalid={isError}
        className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        {...describedByProps}
      />
      <div className={cardClasses}>
        <div className="flex items-center">
          <span className={boxClasses} aria-hidden="true">
            <span className={dotClasses} />
            <span className={hoverDotClasses} />
          </span>
          <span id={labelId} className={labelClasses}>
            {label}
          </span>
        </div>
        {hasDescription ? (
          <p id={descriptionId} className={descriptionClasses}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

RadioCardItem.displayName = 'RadioCard.Item';
