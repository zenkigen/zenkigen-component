import { focusVisible, typography } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { ReactNode } from 'react';

import { Icon } from '../icon';

type Props = {
  children: ReactNode;
  isSortKey: boolean;
  onClickItem: () => void;
};

export function SelectItem({ children, isSortKey, onClickItem }: Props) {
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
    isSortKey
      ? 'bg-selected-selectedUi fill-interactive-interactive01 text-interactive-interactive01'
      : 'bg-background-uiBackground01 fill-icon-icon01 text-interactive-interactive02',
  );

  return (
    <li className={listItemClasses} onClick={onClickItem}>
      <button className={itemClasses} type="button">
        <span className="ml-1 mr-6">{children}</span>
        {isSortKey && (
          <div className="ml-auto flex items-center">
            <Icon name="check" size="small" />
          </div>
        )}
      </button>
    </li>
  );
}
