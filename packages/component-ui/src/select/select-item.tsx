import { useContext } from 'react';

import { focusVisible, typography } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

import { Icon } from '../icon';

import { SelectContext } from './select-context';
import type { SelectOption } from './type';

type Props = {
  option: SelectOption;
};

export function SelectItem({ option }: Props) {
  const { setIsOptionListOpen, selectedOption, onChange } = useContext(SelectContext);
  const handleClickItem = (option: SelectOption) => {
    onChange?.(option);
    setIsOptionListOpen(false);
  };

  const listItemClasses = clsx('flex w-full items-center');

  const itemClasses = clsx(
    'flex',
    'items-center',
    'w-full',
    'h-8',
    'px-3',
    'hover:bg-hover-hover02',
    'active:bg-active-active02',
    focusVisible.inset,
    typography.label.label2regular,
    {
      'text-interactive-interactive01 fill-interactive-interactive01 bg-selected-selectedUi':
        option.id === selectedOption?.id,
      'text-interactive-interactive02 fill-icon-icon01 bg-background-uiBackground01': option.id !== selectedOption?.id,
    },
  );

  return (
    <li className={listItemClasses} key={option.id}>
      <button className={itemClasses} type="button" onClick={() => handleClickItem(option)}>
        {option.icon && <Icon name={option.icon} size="small" />}
        <span className="ml-1 mr-6">{option.label}</span>
        {option.id === selectedOption?.id && (
          <div className="ml-auto flex items-center">
            <Icon name="check" size="small" />
          </div>
        )}
      </button>
    </li>
  );
}
