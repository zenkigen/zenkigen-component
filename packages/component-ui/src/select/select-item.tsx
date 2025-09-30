import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { useContext } from 'react';

import { Icon } from '../icon';
import { SelectContext } from './select-context';
import type { SelectOption } from './type';

type Props = {
  option: SelectOption;
};

export function SelectItem({ option }: Props) {
  const { setIsOptionListOpen, selectedOption, onChange, isError } = useContext(SelectContext);

  const handleClickItem = (option: SelectOption) => {
    onChange?.(option);
    setIsOptionListOpen(false);
  };

  const itemClasses = clsx(
    'typography-label14regular flex h-8 w-full items-center px-3 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
    {
      'text-interactive01 fill-interactive01 bg-selectedUi': option.id === selectedOption?.id && !(isError ?? false),
      'text-supportError fill-supportError bg-uiBackgroundError': option.id === selectedOption?.id && isError,
      'text-interactive02 fill-icon01 bg-uiBackground01': option.id !== selectedOption?.id,
    },
  );

  return (
    <li className="flex w-full items-center" key={option.id} data-id={option.id}>
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
