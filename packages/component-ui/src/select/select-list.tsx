import { CSSProperties, ReactNode, useContext } from 'react';

import { focusVisible, typography } from '@zenkigen/component-theme';
import clsx from 'clsx';

import { SelectContext } from './select-context';

type Props = {
  children: ReactNode;
  maxHeight?: CSSProperties['height'];
};

export function SelectList({ children, maxHeight }: Props) {
  const { size, selectedOption, setIsOptionListOpen, variant, placeholder, onChange } = useContext(SelectContext);

  const handleClickDeselect = () => {
    onChange?.(null);
    setIsOptionListOpen(false);
  };

  const listClasses = clsx(
    'z-dropdown',
    'absolute',
    'w-max',
    'py-2',
    'overflow-y-auto',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-floatingShadow',
    {
      'top-7': size === 'x-small' || size === 'small',
      'top-9': size === 'medium',
      'top-11': size === 'large',
      'border-solid border border-border-uiBorder01': variant === 'outline',
    },
  );

  const deselectButtonClasses = clsx(
    'flex',
    'items-center',
    'w-full',
    'h-8',
    'px-3',
    'hover:bg-hover-hover02',
    'active:bg-active-active02',
    'text-interactive-interactive02',
    focusVisible.inset,
    typography.label.label2regular,
  );

  return (
    <ul className={listClasses} style={{ maxHeight }}>
      {children}
      {placeholder && selectedOption !== null && (
        <li>
          <button className={deselectButtonClasses} type="button" onClick={handleClickDeselect}>
            選択解除
          </button>
        </li>
      )}
    </ul>
  );
}
