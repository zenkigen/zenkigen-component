import { focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { Icon } from '../icon';

import type { SelectOption } from './type';

type Props = {
  option: SelectOption;
  selectedOptionId: string | null;
  onClickItem: () => void;
};

export function SelectItem({ option, selectedOptionId, onClickItem }: Props) {
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
        option.id === selectedOptionId,
      'text-interactive-interactive02 fill-icon-icon01 bg-background-uiBackground01': option.id !== selectedOptionId,
    },
  );

  return (
    <li className={listItemClasses} key={option.id} onClick={onClickItem}>
      <button className={itemClasses} type="button">
        {option.icon && <Icon name={option.icon} size="small" />}
        <span className="ml-1 mr-6">{option.label}</span>
        {option.id === selectedOptionId && (
          <div className="ml-auto flex items-center">
            <Icon name="check" size="small" />
          </div>
        )}
      </button>
    </li>
  );
}
