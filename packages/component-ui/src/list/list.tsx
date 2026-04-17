import clsx from 'clsx';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { ListProps } from './list.types';
import { ListContextProvider } from './list-context';
import { ListOptionItem } from './list-option-item';

type ListComponent = ForwardRefExoticComponent<ListProps & RefAttributes<HTMLUListElement>> & {
  OptionItem: typeof ListOptionItem;
};

const ListBase = forwardRef<HTMLUListElement, ListProps>(function List(
  {
    children,
    size = 'medium',
    variant = 'outline',
    maxHeight,
    width,
    style,
    className,
    role = 'listbox',
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  },
  ref,
) {
  const classes = clsx(
    'overflow-y-auto rounded bg-uiBackground01 py-2 shadow-floatingShadow',
    {
      'border border-solid border-uiBorder01': variant === 'outline',
    },
    className,
  );

  return (
    <ListContextProvider value={{ size, variant }}>
      <ul
        ref={ref}
        role={role}
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        style={{ maxHeight, width, ...style }}
        className={classes}
      >
        {children}
      </ul>
    </ListContextProvider>
  );
});

const List = Object.assign(ListBase, {
  OptionItem: ListOptionItem,
  displayName: 'List',
}) satisfies ListComponent;

export { List };
