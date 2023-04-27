import { focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { Icon } from '../icon';

import type { SelectOption } from './select';

type Props = {
  option: SelectOption;
  selectedOptionId?: string | null;
  onClickItem: () => void;
};

export function SelectItem({ option, selectedOptionId, onClickItem }: Props) {
  const listItemClass = clsx('flex items-center w-full');

  const itemClass = clsx(
    'flex',
    'items-center',
    'w-full',
    'h-8',
    'px-3',
    'hover:bg-hover-hover02',
    'active:bg-active-active02',
    focusVisible,
    typography.label.label2regular,
  );

  const leftIconClass = clsx('flex items-center mr-1');

  const valueClass = clsx('mr-6');

  const checkIconClass = clsx('ml-auto');

  return (
    <li className={listItemClass} key={option.id} onClick={onClickItem}>
      <button className={clsx(itemClass, { 'bg-selected-selectedUi': option.id === selectedOptionId })} type="button">
        {option.icon && (
          <Icon
            name={option.icon}
            size="small"
            color={option.id === selectedOptionId ? 'interactive01' : 'icon01'}
            className={leftIconClass}
          />
        )}
        <span
          className={clsx(
            valueClass,
            option.id === selectedOptionId ? 'text-interactive-interactive01' : 'text-interactive-interactive02',
          )}
        >
          {option.value}
        </span>
        {option.id === selectedOptionId && (
          <Icon name="check" size="small" color="interactive01" className={checkIconClass} />
        )}
      </button>
    </li>
  );
}
