import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { ChangeEvent, useCallback, useState } from 'react';

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

  const inputClasses = clsx('peer absolute z-[1] size-6 opacity-0', {
    'cursor-not-allowed': isDisabled,
    'cursor-pointer': !isDisabled,
  });

  const boxClasses = clsx(
    'inline-flex size-5 items-center justify-center rounded-full border border-solid bg-white',
    focusVisible.normalPeer,
    {
      'border-disabled-disabled01 hover:border-disabled-disabled01': isDisabled && !isMouseOver,
      'border-hover-hoverUiBorder': !isDisabled && isMouseOver,
      'border-border-uiBorder03': !isDisabled,
      'cursor-not-allowed': isDisabled,
      'cursor-pointer': !isDisabled,
    },
  );

  const afterClasses = clsx('absolute inset-0 m-auto block size-3 rounded-full', {
    'bg-disabled-disabled01': isDisabled && isChecked,
    'bg-active-activeSelectedUi': !isDisabled && isChecked,
    'scale-0': !isChecked,
    'scale-100': isChecked,
  });

  const hoverIndicatorClasses = clsx('inline-block size-3 rounded-full', {
    'bg-hover-hoverUi': !isDisabled && !isChecked && isMouseOver,
  });

  const labelClasses = clsx('typography-label2regular ml-2 flex-[1_0_0] select-none break-all', {
    'pointer-events-none cursor-not-allowed text-disabled-disabled01': isDisabled,
    'cursor-pointer text-text-text01': !isDisabled,
  });

  return (
    <div className="flex items-center">
      <div className="flex size-6 items-center justify-center">
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
          <div className="relative flex size-5 flex-[0_0_auto] items-center justify-center">
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
