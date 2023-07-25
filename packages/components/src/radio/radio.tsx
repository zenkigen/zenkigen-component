import { ChangeEvent, useCallback, useState } from 'react';

import { focusVisible, typography } from '@zenkigen/theme';
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

export function Radio({ name, value, id, label, isChecked = false, isDisabled = false, onChange }: Props) {
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

  const inputClasses = clsx('absolute', 'z-[1]', 'opacity-0', 'peer', {
    'cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  });

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
    focusVisible.normalPeer,
    {
      'border-disabled-disabled01 hover:border-disabled-disabled01': isDisabled && !isMouseOver,
      'border-hover-hoverUiBorder': !isDisabled && isMouseOver,
      'border-border-uiBorder03': !isDisabled,
      'cursor-not-allowed': isDisabled,
      'cursor-pointer': !isDisabled,
    },
  );

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
    {
      'bg-disabled-disabled01': isDisabled && isChecked,
      'bg-active-activeSelectedUi': !isDisabled && isChecked,
      'scale-0': !isChecked,
      'scale-100': isChecked,
    },
  );

  const hoverIndicatorClasses = clsx(
    'w-3',
    'h-3',
    'inline-block',
    'rounded-full',
    !isDisabled && !isChecked && isMouseOver && 'bg-hover-hoverUi',
  );

  const labelClasses = clsx('flex-[1_0_0]', 'ml-2', typography.label.label2regular, 'break-all', 'select-none', {
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
          className={inputClasses}
        />
        <div className={boxClasses}>
          <div className="relative flex h-5 w-5 flex-[0_0_auto] items-center justify-center">
            <span className={afterClasses} />
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
