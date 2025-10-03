import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { CSSProperties, PropsWithChildren } from 'react';
import { forwardRef, useContext, useLayoutEffect } from 'react';

import { SelectContext } from './select-context';

type Props = {
  maxHeight?: CSSProperties['height'];
};

export const SelectList = forwardRef<HTMLUListElement, PropsWithChildren<Props>>(({ children, maxHeight }, ref) => {
  const { selectedOption, setIsOptionListOpen, variant, placeholder, onChange, floatingStyles, floatingRef } =
    useContext(SelectContext);

  const handleClickDeselect = () => {
    onChange?.(null);
    setIsOptionListOpen(false);
  };

  useLayoutEffect(() => {
    if (maxHeight != null && selectedOption != null) {
      const container = floatingRef?.current;
      if (container != null) {
        const element = Array.from(container.children ?? []).find(
          (item) => item.getAttribute('data-id') === selectedOption.id,
        );

        if (element != null) {
          // 要素の位置を計算してスクロール
          const htmlElement = element as HTMLElement;
          const elementTop = htmlElement.offsetTop;
          const elementHeight = htmlElement.offsetHeight;
          const containerHeight = container.clientHeight;

          // 要素を中央に配置するためのスクロール位置を計算
          const scrollTop = elementTop - (containerHeight - elementHeight) / 2;

          container.scrollTo({
            top: Math.max(0, scrollTop),
          });
        }
      }
    }
  }, [selectedOption, maxHeight, floatingRef]);

  const listClasses = clsx('z-dropdown overflow-y-auto rounded bg-uiBackground01 py-2 shadow-floatingShadow', {
    'border-solid border border-uiBorder01': variant === 'outline',
  });

  const deselectButtonClasses = clsx(
    'typography-label14regular flex h-8 w-full items-center px-3 text-interactive02 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
  );

  return (
    <ul className={listClasses} style={{ maxHeight, ...floatingStyles }} ref={ref}>
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
});

SelectList.displayName = 'SelectList';
