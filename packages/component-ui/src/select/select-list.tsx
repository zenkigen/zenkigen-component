import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useContext, useLayoutEffect, useRef } from 'react';

import { SelectContext } from './select-context';

export function SelectList({ children }: PropsWithChildren) {
  const ref = useRef<HTMLUListElement>(null);
  const { selectedOption, setIsOptionListOpen, variant, placeholder, onChange, floatingRefs, floatingStyles } =
    useContext(SelectContext);

  const handleClickDeselect = () => {
    onChange?.(null);
    setIsOptionListOpen(false);
  };

  // 選択されたオプションへのスクロール処理
  useLayoutEffect(() => {
    if (ref.current !== null) {
      const element = Array.from(ref.current.children ?? []).find(
        (item) => item.getAttribute('data-id') === selectedOption?.id,
      );
      if (ref.current.scroll !== null && element instanceof Element) {
        const wrapRect = ref.current.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        ref.current.scroll(0, rect.top - wrapRect.top - wrapRect.height / 2 + rect.height / 2);
      }
    }
  }, [selectedOption]);

  const listClasses = clsx(
    'z-dropdown w-max min-w-full overflow-y-auto rounded bg-uiBackground01 py-2 shadow-floatingShadow',
    {
      'border-solid border border-uiBorder01': variant === 'outline',
    },
  );

  const deselectButtonClasses = clsx(
    'typography-label14regular flex h-8 w-full items-center px-3 text-interactive02 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
  );

  return (
    <ul
      className={listClasses}
      ref={(node) => {
        ref.current = node;
        floatingRefs?.setFloating(node);
      }}
      style={floatingStyles}
    >
      {children}
      {placeholder != null && selectedOption !== null && (
        <li>
          <button className={deselectButtonClasses} type="button" onClick={handleClickDeselect}>
            選択解除
          </button>
        </li>
      )}
    </ul>
  );
}
