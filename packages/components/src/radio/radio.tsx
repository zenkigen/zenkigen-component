import React, { ChangeEvent, useCallback, useState } from 'react';

import { focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

type Props = {
  name?: string;
  value?: string;
  id?: string;
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Radio({ name = '', value, id, label = '', isChecked = false, isDisabled = false, onChange }: Props) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => !isDisabled && onChange?.(e),
    [isDisabled, onChange],
  );

  const handleMouseOverInput = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseOutInput = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const wrapperClasses = clsx('flex', 'items-center');

  const baseClasses = clsx('flex', 'items-center', 'justify-center', 'h-6', 'w-6');

  const inputClasses = clsx(
    'absolute',
    'z-[1]',
    'opacity-0',
    'peer',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );

  const boxClasses = clsx(
    'inline-flex',
    'items-center',
    'justify-center',
    'h-5',
    'w-5',
    'bg-white',
    'border',
    'border-solid',
    'rounded-full',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
    focusVisible.normalPeer,
    isDisabled
      ? 'border-disabled-disabled01 hover:border-disabled-disabled01'
      : isMouseOver
      ? 'border-hover-hoverUiBorder'
      : 'border-border-uiBorder02',
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
    'rounded-full',
    isDisabled && isChecked ? 'bg-disabled-disabled01' : 'bg-active-activeSelectedUi',
    {
      'scale-0': !isChecked,
      'scale-100': isChecked,
    },
  );

  const labelClasses = clsx(
    'flex-[1_0_0]',
    'ml-2',
    typography.label.label2regular,
    isDisabled ? 'pointer-events-none cursor-not-allowed text-disabled-disabled01' : 'cursor-pointer text-text-text01',
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
          onMouseOver={handleMouseOverInput}
          onMouseLeave={handleMouseOutInput}
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
