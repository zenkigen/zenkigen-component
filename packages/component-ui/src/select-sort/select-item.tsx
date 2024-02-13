import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Icon } from '../icon';

type Props = {
  isSortKey: boolean;
  onClickItem: () => void;
};

export function SelectItem({ children, isSortKey, onClickItem }: PropsWithChildren<Props>) {
  const itemClasses = clsx(
    'typography-label2regular flex h-8 w-full items-center px-3 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
    {
      'bg-selectedUi fill-interactive01 text-interactive01': isSortKey,
      'bg-uiBackground01 fill-icon01 text-interactive02': !isSortKey,
    },
  );

  return (
    <li className="flex w-full items-center" onClick={onClickItem}>
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
