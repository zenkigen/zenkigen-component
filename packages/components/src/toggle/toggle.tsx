import { ReactNode } from 'react';

import { typography } from '@zenkigen-component/theme';
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
  const wrapperClasses = clsx('flex', 'items-center');
  const baseClasses = clsx('relative', 'flex', 'items-center', 'rounded-full', {
    'w-8 h-4 px-[3px]': size === 'small',
    'w-12 h-6 px-1': size === 'medium',
    'bg-interactive-interactive01 hover:bg-hover-hover01': isChecked,
    'bg-interactive-interactive02 hover:bg-hover-hover02Dark': !isChecked,
  });
  const inputClasses = clsx('absolute', 'top-0', 'left-0', 'right-0', 'bottom-0', 'opacity-0', 'cursor-pointer');
  const indicatorClasses = clsx('bg-icon-iconOnColor', 'rounded-full', {
    'w-2.5 h-2.5': size === 'small',
    'w-4 h-4': size === 'medium',
    'ml-auto': isChecked,
  });
  const labelClasses = clsx(
    'ml-2',
    'text-text-text01',
    typography.label[size === 'small' ? 'label3regular' : 'label1regular'],
  );

  return (
    <div className={wrapperClasses}>
      {label && labelPosition === 'left' && <span className={labelClasses}>{label}</span>}
      <div className={baseClasses}>
        <input
          className={inputClasses}
          type="checkbox"
          name={id}
          id={id}
          checked={isChecked}
          onChange={onChange}
          disabled={isDisabled}
        />
        <span className={indicatorClasses} />
      </div>
      {label && labelPosition === 'right' && <span className={labelClasses}>{label}</span>}
    </div>
  );
}
