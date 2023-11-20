import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { ChangeEvent, useCallback, useState } from 'react';

import { CheckedIcon } from './checked-icon';
import { MinusIcon } from './minus-icon';

type Props = {
  name?: string;
  value?: string;
  id?: string;
  isChecked?: boolean;
  color?: 'default' | 'gray' | 'error';
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  label?: string;
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
}: Props) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOverInput = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseOutInput = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      !isDisabled && onChange?.(e);
    },
    [isDisabled, onChange],
  );

  const baseInputClasses = clsx('peer absolute z-[1] h-5 w-5 opacity-0', {
    'cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  });

  const boxClasses = clsx(
    'inline-flex h-5 w-5 items-center justify-center rounded-sm border bg-white',
    focusVisible.normalPeer,
    {
      'border-disabled-disabled01': isDisabled,
      'border-hover-hoverUiBorder': !isDisabled && isMouseOver,
      'border-border-uiBorder03': !isDisabled && !isMouseOver,
      'border-interactive-interactive02': !isDisabled && !isMouseOver && color === 'gray',
      'border-hover-hoverError': !isDisabled && isMouseOver && color === 'error',
      'border-support-supportError': !isDisabled && !isMouseOver && color === 'error',
    },
  );

  const indicatorClasses = clsx('relative flex h-5 w-5 flex-[0_0_auto] items-center justify-center', {
    'bg-disabled-disabled01': isDisabled && isChecked,
    'border-disabled-disabled01': isDisabled,
  });

  const afterClasses = clsx('absolute inset-0 m-auto block rounded-sm', {
    'bg-disabled-disabled01': isDisabled && isChecked,
    'bg-hover-hover01': !(isDisabled && isChecked) && isMouseOver,
    'bg-interactive-interactive01': !(isDisabled && isChecked) && !isMouseOver,
    'bg-hover-hover02Dark': !(isDisabled && isChecked) && isMouseOver && color === 'gray',
    'bg-interactive-interactive02': !(isDisabled && isChecked) && !isMouseOver && color === 'gray',
    'bg-hover-hoverError': !(isDisabled && isChecked) && isMouseOver && color === 'error',
    'bg-support-supportError': !(isDisabled && isChecked) && !isMouseOver && color === 'error',
    'scale-0': !isChecked,
    'scale-100': isChecked,
  });

  const hoverIndicatorClasses = clsx('inline-block h-3 w-3 rounded-[1px]', {
    'bg-hover-hoverUi': !isDisabled && !isChecked && isMouseOver,
  });

  const labelClasses = clsx('typography-label2regular ml-2 flex-[1_0_0] break-all', {
    'pointer-events-none cursor-not-allowed text-disabled-disabled01': isDisabled,
    'cursor-pointer text-text-text01': !isDisabled,
  });

  return (
    <div className="flex items-center">
      <div className="flex h-6 w-6 items-center justify-center">
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
              {isChecked && !isIndeterminate && <CheckedIcon />}
              {isIndeterminate && <MinusIcon />}
            </span>
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
