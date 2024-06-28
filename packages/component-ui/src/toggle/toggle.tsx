import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
  id: string;
  size: 'small' | 'medium';
  isChecked: boolean;
  onChange: () => void;
  label?: ReactNode;
  labelPosition?: 'left' | 'right';
  isDisabled?: boolean;
};

export function Toggle({
  id,
  size = 'medium',
  isChecked,
  onChange,
  label,
  labelPosition = 'right',
  isDisabled = false,
}: Props) {
  const baseClasses = clsx('relative flex items-center rounded-full', {
    'bg-disabledOn': isDisabled && isChecked,
    'bg-disabled01': isDisabled && !isChecked,
    'bg-interactive01 peer-hover:bg-hover01': !isDisabled && isChecked,
    'bg-interactive02 peer-hover:bg-hover02Dark': !isDisabled && !isChecked,
    'w-8 h-4 px-[3px]': size === 'small',
    'w-12 h-6 px-1': size === 'medium',
  });
  const inputClasses = clsx(
    'peer absolute inset-0 z-[1] opacity-0',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );
  const indicatorClasses = clsx('rounded-full bg-iconOnColor', {
    'w-2.5 h-2.5': size === 'small',
    'w-4 h-4': size === 'medium',
    'ml-auto': isChecked,
  });
  const labelClasses = clsx('break-all', {
    'mr-2': labelPosition === 'left',
    'ml-2': labelPosition === 'right',
    'typography-label12regular': size === 'small',
    'typography-label16regular': size === 'medium',
    'pointer-events-none cursor-not-allowed text-disabled01': isDisabled,
    'cursor-pointer text-text01': !isDisabled,
  });

  return (
    <div className="relative flex flex-[0_0_auto] items-center">
      {label != null && labelPosition === 'left' && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        type="checkbox"
        name={id}
        id={id}
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />
      <div className={baseClasses}>
        <span className={indicatorClasses} />
      </div>
      {label != null && labelPosition === 'right' && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
    </div>
  );
}
