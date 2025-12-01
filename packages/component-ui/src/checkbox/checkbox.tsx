import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

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
    (e: ChangeEvent<HTMLInputElement>) => !isDisabled && onChange?.(e),
    [isDisabled, onChange],
  );

  const baseInputClasses = clsx('peer absolute z-[1] size-5 opacity-0', {
    'cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  });

  const boxClasses = clsx(
    'inline-flex size-5 items-center justify-center rounded-sm border bg-white',
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

  const indicatorClasses = clsx('relative flex size-5 flex-[0_0_auto] items-center justify-center', {
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

  const hoverIndicatorClasses = clsx('inline-block size-3 rounded-[1px]', {
    'bg-hoverUi': !isDisabled && !isChecked && isMouseOver,
  });

  const labelClasses = clsx('typography-label14regular ml-2 flex-[1_0_0] break-all', {
    'pointer-events-none cursor-not-allowed text-disabled01': isDisabled,
    'cursor-pointer text-text01': !isDisabled,
  });

  return (
    <div className="flex items-center">
      <div className="relative flex size-6 items-center justify-center">
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
      {label != null && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
    </div>
  );
}
