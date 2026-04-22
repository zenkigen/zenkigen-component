import clsx from 'clsx';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { ListProps } from './list.types';
import { ListContextProvider } from './list-context';
import { ListOptionItem } from './list-option-item';

type ListComponent = ForwardRefExoticComponent<ListProps & RefAttributes<HTMLUListElement>> & {
  OptionItem: typeof ListOptionItem;
};

/**
 * List は 2 層構造:
 * - 外側 div (wrapper): 装飾 (bg / rounded / shadow / overflow-hidden) と maxHeight を担当
 * - 内側 ul: scrollable 領域 (overflow-y-auto) と ARIA role を担当
 *
 * この構造は macOS の rubber-band bounce 時に List 内部が透過する問題を避けるため。
 * wrapper の bg が bounce の裏に常に存在する + wrapper の overflow-hidden で
 * bounce 描画が rounded 枠の外に漏れない。
 *
 * ref (外部公開) は従来通り ul を指す。wrapper への ref は `containerRef` で expose。
 */
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
    containerRef,
  },
  ref,
) {
  const wrapperClasses = clsx(
    'flex flex-col overflow-hidden rounded bg-uiBackground01 shadow-floatingShadow',
    {
      'border border-solid border-uiBorder01': variant === 'outline',
    },
    className,
  );

  return (
    <ListContextProvider value={{ size, variant }}>
      <div ref={containerRef} style={{ maxHeight, width, ...style }} className={wrapperClasses}>
        <ul
          ref={ref}
          role={role}
          id={id}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          className="min-h-0 flex-1 overflow-y-auto py-2"
        >
          {children}
        </ul>
      </div>
    </ListContextProvider>
  );
});

const List = Object.assign(ListBase, {
  OptionItem: ListOptionItem,
  displayName: 'List',
}) satisfies ListComponent;

export { List };
