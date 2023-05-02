import { focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { SelectItem } from './select-item';
import type { SelectOption } from './type';

type Props = {
  size: 'x-small' | 'small' | 'medium' | 'large';
  variant: 'text' | 'outline';
  options: SelectOption[];
  selectedOptionId: string | null;
  placeholder?: string;
  onClickItem: (id: string, index: number) => void;
  onClickDeselect: () => void;
};

export function SelectList({
  size,
  variant,
  options,
  selectedOptionId,
  placeholder,
  onClickItem,
  onClickDeselect,
}: Props) {
  const listClasses = clsx(
    'absolute',
    'w-max',
    'py-2',
    'overflow-y-auto',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-menu',
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
    focusVisible,
    typography.label.label2regular,
  );

  return (
    <ul className={listClasses}>
      {options.map((option, index) => (
        <SelectItem
          key={option.id}
          option={option}
          selectedOptionId={selectedOptionId}
          onClickItem={() => onClickItem(option.id, index)}
        />
      ))}
      {placeholder && selectedOptionId !== null && (
        <li>
          <button className={deselectButtonClasses} type="button" onClick={onClickDeselect}>
            選択解除
          </button>
        </li>
      )}
    </ul>
  );
}
