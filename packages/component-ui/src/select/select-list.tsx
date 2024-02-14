import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { CSSProperties, PropsWithChildren } from 'react';
import { useContext, useLayoutEffect, useRef } from 'react';

import { SelectContext } from './select-context';

type Props = {
  maxHeight?: CSSProperties['height'];
};

export function SelectList({ children, maxHeight }: PropsWithChildren<Props>) {
  const ref = useRef<HTMLUListElement>(null);
  const { size, selectedOption, setIsOptionListOpen, variant, placeholder, onChange } = useContext(SelectContext);

  const handleClickDeselect = () => {
    onChange?.(null);
    setIsOptionListOpen(false);
  };

  useLayoutEffect(() => {
    if (maxHeight != null && ref.current) {
      const element = Array.from(ref.current.children ?? []).find(
        (item) => item.getAttribute('data-id') === selectedOption?.id,
      );
      if (element != null && ref.current.scroll != null) {
        const wrapRect = ref.current.getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        ref.current.scroll(0, rect.top - wrapRect.top - wrapRect.height / 2 + rect.height / 2);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listClasses = clsx(
    'absolute z-dropdown w-max overflow-y-auto rounded bg-uiBackground01 py-2 shadow-floatingShadow',
    {
      'top-7': size === 'x-small' || size === 'small',
      'top-9': size === 'medium',
      'top-11': size === 'large',
      'border-solid border border-uiBorder01': variant === 'outline',
    },
  );

  const deselectButtonClasses = clsx(
    'typography-label2regular flex h-8 w-full items-center px-3 text-interactive02 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
  );

  return (
    <ul className={listClasses} style={{ maxHeight }} ref={ref}>
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
