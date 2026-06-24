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

  const cardClasses = clsx(
    'pointer-events-none flex flex-col gap-2 rounded border border-solid px-4 py-3',
    focusVisible.normalPeer,
    {
      'border-uiBorder02 bg-uiBackground01': isDisabled,
      'border-supportError bg-uiBackground01 peer-hover:bg-hoverUi02': isError,
      'border-selectedUiBorder bg-selectedUi peer-hover:bg-hoverUi02': !isDisabled && !isError && isChecked,
      'border-uiBorder02 bg-uiBackground01 peer-hover:bg-hoverUi02': !isDisabled && !isError && !isChecked,
    },
  );

  const boxClasses = clsx(
    'inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-solid bg-white',
    {
      'border-disabled01': isDisabled,
      'border-uiBorder04': !isDisabled,
    },
  );

  const dotClasses = clsx('block size-3 rounded-full', {
    'scale-100': isChecked,
    'scale-0': !isChecked,
    'bg-disabled01': isDisabled && isChecked,
    'bg-activeSelectedUi': !isDisabled && isChecked,
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
    <div className="relative">
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
