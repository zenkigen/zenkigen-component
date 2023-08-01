import { ReactNode } from 'react';

import { typography } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

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
  isDisabled,
}: Props) {
  const wrapperClasses = clsx('flex', 'flex-[0_0_auto]', 'items-center', 'relative');
  const baseClasses = clsx(
    'relative',
    'flex',
    'items-center',
    'rounded-full',
    {
      'w-8 h-4 px-[3px]': size === 'small',
      'w-12 h-6 px-1': size === 'medium',
    },
    isDisabled
      ? { 'bg-disabled-disabledOn': isChecked, 'bg-disabled-disabled01': !isChecked }
      : {
          'bg-interactive-interactive01 peer-hover:bg-hover-hover01': isChecked,
          'bg-interactive-interactive02 peer-hover:bg-hover-hover02Dark': !isChecked,
        },
  );
  const inputClasses = clsx(
    'peer',
    'absolute',
    'inset-0',
    'z-[1]',
    'opacity-0',
    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
  );
  const indicatorClasses = clsx('bg-icon-iconOnColor', 'rounded-full', {
    'w-2.5 h-2.5': size === 'small',
    'w-4 h-4': size === 'medium',
    'ml-auto': isChecked,
  });
  const labelClasses = clsx(
    labelPosition === 'right' ? 'ml-2' : 'mr-2',
    typography.label[size === 'small' ? 'label3regular' : 'label1regular'],
    'break-all',
    isDisabled ? 'pointer-events-none cursor-not-allowed text-disabled-disabled01' : 'cursor-pointer text-text-text01',
  );

  return (
    <div className={wrapperClasses}>
      {label && labelPosition === 'left' && (
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
      {label && labelPosition === 'right' && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
    </div>
  );
}
