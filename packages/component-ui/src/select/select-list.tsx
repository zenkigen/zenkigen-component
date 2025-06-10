import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { CSSProperties, PropsWithChildren } from 'react';
import { useContext, useLayoutEffect, useRef, useState } from 'react';

import { SelectContext } from './select-context';

type Props = { maxHeight?: CSSProperties['height'] };

export function SelectList({ children, maxHeight }: PropsWithChildren<Props>) {
  const ref = useRef<HTMLUListElement>(null);
  const { size, selectedOption, setIsOptionListOpen, variant, placeholder, onChange } = useContext(SelectContext);
  const [computedMaxHeight, setComputedMaxHeight] = useState<CSSProperties['height']>(maxHeight);
  const [showAbove, setShowAbove] = useState(false);

  const handleClickDeselect = () => {
    onChange?.(null);
    setIsOptionListOpen(false);
  };

  useLayoutEffect(() => {
    if (ref.current) {
      // Select要素（親要素）を取得
      const selectButton = ref.current.parentElement;
      if (!selectButton) return;

      const buttonRect = selectButton.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const bottomMargin = 16; // マージンを考慮
      const topMargin = 16; // 上側のマージンも考慮

      // 上下の利用可能スペースを計算
      const spaceBelow = viewportHeight - buttonRect.bottom - bottomMargin;
      const spaceAbove = buttonRect.top - topMargin;

      // 基本は下に表示、下側に十分なスペースがない場合のみ上に表示
      const minRequiredSpace = 150; // 下側に最低限必要なスペース
      const shouldShowAbove = spaceBelow < minRequiredSpace && spaceAbove > 100;
      setShowAbove(shouldShowAbove);

      // 利用可能スペースに基づいてmaxHeightを計算
      const availableHeight = shouldShowAbove ? spaceAbove : spaceBelow;
      let finalMaxHeight = availableHeight;

      // propsでmaxHeightが指定されている場合は、小さい方を使用
      if (maxHeight != null) {
        const maxHeightValue = typeof maxHeight === 'string' ? parseInt(maxHeight, 10) : maxHeight;
        finalMaxHeight = Math.min(availableHeight, maxHeightValue);
      }

      setComputedMaxHeight(finalMaxHeight);

      // 選択されたオプションへのスクロール処理
      if (computedMaxHeight != null) {
        const element = Array.from(ref.current.children ?? []).find(
          (item) => item.getAttribute('data-id') === selectedOption?.id,
        );
        if (element != null && ref.current.scroll != null) {
          const wrapRect = ref.current.getBoundingClientRect();
          const rect = element.getBoundingClientRect();
          ref.current.scroll(0, rect.top - wrapRect.top - wrapRect.height / 2 + rect.height / 2);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxHeight]);

  const listClasses = clsx(
    'absolute z-dropdown w-max min-w-full overflow-y-auto rounded bg-uiBackground01 py-2 shadow-floatingShadow',
    {
      // 下に表示する場合のtop位置
      'top-7': !showAbove && (size === 'x-small' || size === 'small'),
      'top-9': !showAbove && size === 'medium',
      'top-11': !showAbove && size === 'large',
      // 上に表示する場合のbottom位置
      'bottom-7': showAbove && (size === 'x-small' || size === 'small'),
      'bottom-9': showAbove && size === 'medium',
      'bottom-11': showAbove && size === 'large',
      'border-solid border border-uiBorder01': variant === 'outline',
    },
  );

  const deselectButtonClasses = clsx(
    'typography-label14regular flex h-8 w-full items-center px-3 text-interactive02 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
  );

  return (
    <ul className={listClasses} style={{ maxHeight: computedMaxHeight }} ref={ref}>
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
