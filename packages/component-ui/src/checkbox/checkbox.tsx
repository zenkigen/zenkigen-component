import { ChangeEvent, useCallback, useState } from 'react';

import { focusVisible, typography } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

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

  const wrapperClasses = clsx('flex', 'items-center');

  const baseClasses = clsx('flex', 'items-center', 'justify-center', 'h-6', 'w-6');

  const baseInputClasses = clsx(
    'absolute',
    'z-[1]',
    'opacity-0',
    'w-5',
    'h-5',
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
    'rounded-sm',
    focusVisible.normalPeer,
    isDisabled
      ? 'border-disabled-disabled01'
      : color === 'error'
      ? isMouseOver
        ? 'border-hover-hoverError'
        : 'border-support-supportError'
      : color === 'gray'
      ? isMouseOver
        ? 'border-hover-hoverUiBorder'
        : 'border-interactive-interactive02'
      : isMouseOver
      ? 'border-hover-hoverUiBorder'
      : 'border-border-uiBorder03',
  );

  const indicatorClasses = clsx('h-5', 'w-5', 'relative', 'flex', 'flex-[0_0_auto]', 'items-center', 'justify-center', {
    'bg-disabled-disabled01': isDisabled && isChecked,
    'border-disabled-disabled01': isDisabled,
  });

  const afterClasses = clsx(
    'absolute',
    'top-0',
    'right-0',
    'bottom-0',
    'left-0',
    'block',
    'm-auto',
    'rounded-sm',
    isDisabled && isChecked
      ? 'bg-disabled-disabled01'
      : color === 'gray'
      ? isMouseOver
        ? 'bg-hover-hover02Dark'
        : 'bg-interactive-interactive02'
      : color === 'error'
      ? isMouseOver
        ? 'bg-hover-hoverError'
        : 'bg-support-supportError'
      : isMouseOver
      ? 'bg-hover-hover01'
      : 'bg-interactive-interactive01',
    {
      'scale-0': !isChecked,
      'scale-100': isChecked,
    },
  );

  const hoverIndicatorClasses = clsx(
    'w-3',
    'h-3',
    'inline-block',
    'rounded-[1px]',
    !isDisabled && !isChecked && isMouseOver && 'bg-hover-hoverUi',
  );

  const labelClasses = clsx(
    'flex-[1_0_0]',
    'ml-2',
    typography.label.label2regular,
    'break-all',
    isDisabled ? 'pointer-events-none cursor-not-allowed text-disabled-disabled01' : 'cursor-pointer text-text-text01',
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
