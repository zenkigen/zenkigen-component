import React, { ChangeEvent, useCallback } from 'react';

import { focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

type Props = {
  name?: string;
  id?: string;
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export function Radio({ name = '', id, label = '', isChecked = false, isDisabled = false, value, onChange }: Props) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => !isDisabled && onChange?.(e),
    [isDisabled, onChange],
  );

  const wrapperClasses = clsx('flex', 'items-center');

  const baseClasses = clsx('flex', 'items-center', 'content-center', 'h-6', 'w-6');

  const inputClasses = clsx('absolute', 'z-[1]', 'opacity-0', 'peer');

  const boxClasses = clsx(
    'inline-flex',
    'items-center',
    'content-center',
    'h-5',
    'w-5',
    'bg-white',
    'border',
    'border-solid',
    'border-border-uiBorder02',
    'hover:border-hover-hoverUiBorder',
    'rounded-full',
    'cursor-pointer',
    focusVisible.normalPeer,
    {
      'border-disabled-disabled01': isDisabled,
      'hover:border-disabled-disabled01': isDisabled,
      'text-disabled-disabled01': isDisabled,
      'cursor-not-allowed': isDisabled,
    },
  );

  const indicatorClasses = clsx('h-5', 'w-5', 'relative', 'inline-block', 'flex-[0_0_auto]');

  const afterClasses = clsx(
    'h-3',
    'w-3',
    'absolute',
    'top-0',
    'right-0',
    'bottom-0',
    'left-0',
    'block',
    'm-auto',
    'bg-active-activeSelectedUi',
    'rounded-full',
    'scale-0',
    {
      'bg-disabled-disabled01': isDisabled,
      'scale-100': isChecked,
    },
  );

  const labelClasses = clsx(
    'flex-[1_0_0]',
    'ml-2',
    typography.label.label4regular,
    'text-text-text01',
    'break-all',
    'select-none',
  );

  return (
    <div className={wrapperClasses}>
      <div className={baseClasses}>
        <input
          type="checkbox"
          value={value}
          name={name}
          id={id}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className={inputClasses}
        />
        <div className={boxClasses}>
          <div className={indicatorClasses}>
            <span className={afterClasses} />
          </div>
        </div>
      </div>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}
