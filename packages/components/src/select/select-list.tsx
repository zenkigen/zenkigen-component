import clsx from 'clsx';

import type { SelectOption } from './select';
import { SelectItem } from './select-item';

type Props = {
  size: 'small' | 'small-medium' | 'medium' | 'large';
  variant: 'text' | 'outline';
  options: SelectOption[];
  selectedOptionId: string | null;
  placeholder?: SelectOption;
  onClickItem: (id: string, index: number) => void;
  onDeselect: () => void;
};

export function SelectList({ size, variant, options, selectedOptionId, placeholder, onClickItem, onDeselect }: Props) {
  const menuClass = clsx(
    'absolute',
    'w-max',
    'py-2',
    'overflow-y-auto',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-menu',
    {
      'top-7': size === 'small' || size === 'small-medium',
      'top-9': size === 'medium',
      'top-11': size === 'large',
      'border-solid border border-border-uiBorder01': variant === 'outline',
    },
  );

  return (
    <ul className={menuClass}>
      {options.map((option, index) => (
        <SelectItem
          key={option.id}
          option={option}
          selectedOptionId={selectedOptionId}
          onClickItem={() => onClickItem(option.id, index)}
        />
      ))}
      {placeholder && selectedOptionId !== null && (
        <SelectItem option={{ id: 'deselect', value: '選択解除' }} onClickItem={onDeselect} />
      )}
    </ul>
  );
}
