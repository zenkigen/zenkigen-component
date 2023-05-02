import { ChangeEvent, useCallback } from 'react';

import { typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

type Props = {
  name?: string;
  id?: string;
  isChecked?: boolean;
  color: 'default' | 'gray' | 'error';
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  label?: string;
  handleOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Checkbox({
  name,
  id,
  isChecked = false,
  isIndeterminate = false,
  isDisabled = false,
  handleOnChange,
  label,
  color,
}: Props) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      !isDisabled && handleOnChange?.(e);
    },
    [isDisabled, handleOnChange],
  );

  // const actionColor = {
  //   hover: 'hover:bg-hover-hover01',
  //   after:
  //     'after:bg-active-activeSelectedUi after:inset-0 after:m-auto after:block after:content-[""] after:rounded-sm after:transform delay-[0.15s] after:scale-x-0 scale-y-0 scale-z-[1]',
  // } as const;

  const containerClasses = clsx('flex', 'items-center');

  const baseClasses = clsx('flex', 'items-center', 'justify-center', 'h-6', 'w-6', 'peer/focus-visible');

  const baseInputClasses = clsx(
    'absolute',
    'z-[-1]',
    'opacity-0',
    'peer/focus-visible:outline outline-1 outline-offset-1 outline-focus-focus',
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
    { 'border-disabled-disabled01': isDisabled },
    { 'border-support-supportError': color === 'error' },
    { 'border-border-uiBorder02': !isDisabled },
    'rounded-sm',
    'cursor-pointer',
    'hover:border-disabled-disabled01',
  );

  const indicatorClasses = clsx(
    'h-5',
    'w-5',
    'relative',
    'inline-block',
    'flex-[0_0_auto]',
    'after:bg-active-activeSelectedUi',
    // {
    //   'after:scale-x-[1] scale-y-[1] scale-z-[1] ': isChecked && !isDisabled,
    // },
  );

  const labelClasses = clsx(
    'flex-[1_0_0]',
    'ml-2',
    typography.label.label4regular,
    'text-text-text01',
    'break-all',
    'select-none',
  );

  const svgClasses = clsx(
    'z-10',
    'absolute',
    'h-5',
    'w-5',
    'fill-icon-iconOnColor',
    'rounded-sm',
    'hover:bg-hover-hover01',
  );

  const CheckedIcon = clsx(
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={svgClasses}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2887 5.38099C16.0069 5.09924 15.5518 5.09924 15.2701 5.38099L7.55461 13.0893L4.72993 10.2646C4.44818 9.98283 3.99305 9.98283 3.71131 10.2646C3.42956 10.5463 3.42956 11.0014 3.71131 11.2832L7.04891 14.6208C7.1934 14.7653 7.374 14.8303 7.56183 14.8303C7.74966 14.8303 7.93027 14.7581 8.07475 14.6208L16.2887 6.40683C16.5704 6.12508 16.5704 5.66273 16.2887 5.38099Z"
      />
    </svg>,
  );

  const MinusIcon = clsx(
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={svgClasses}>
      <path d="M4.94723 10.5028H9.49726H10.5028H15.0528C15.3293 10.5028 15.5556 10.2766 15.5556 10C15.5556 9.72352 15.3293 9.49725 15.0528 9.49725H10.5028H9.49726H4.94723C4.67071 9.49725 4.44446 9.72352 4.44446 10C4.44446 10.2766 4.67071 10.5028 4.94723 10.5028Z" />
    </svg>,
  );

  return (
    <div id={id} onClick={(e) => e.stopPropagation()} className={containerClasses}>
      <div className={baseClasses}>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className={baseInputClasses}
        />
        <div color={color} className={boxClasses}>
          <div color={color} className={indicatorClasses}>
            {isChecked && !isIndeterminate && CheckedIcon}
            {isIndeterminate && MinusIcon}
          </div>
        </div>
      </div>
      <label className={labelClasses}>{label}</label>
    </div>
  );
}
