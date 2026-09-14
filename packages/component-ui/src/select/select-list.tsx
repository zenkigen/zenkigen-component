import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { CSSProperties, KeyboardEvent, PropsWithChildren } from 'react';
import { forwardRef, useContext, useLayoutEffect, useRef } from 'react';

import { SelectContext } from './select-context';

type Props = {
  maxHeight?: CSSProperties['height'];
};

export const SelectList = forwardRef<HTMLUListElement, PropsWithChildren<Props>>(({ children, maxHeight }, ref) => {
  const {
    selectedOption,
    variant,
    isDeselectVisible,
    onChange,
    floatingStyles,
    floatingRef,
    size,
    closeAndFocusTrigger,
  } = useContext(SelectContext);
  const hasFocusedOnOpenRef = useRef(false);

  const handleClickDeselect = () => {
    onChange?.(null);
    closeAndFocusTrigger?.();
  };

  const getOptionButtons = () =>
    floatingRef?.current == null ? [] : Array.from(floatingRef.current.querySelectorAll<HTMLButtonElement>('button'));

  // リスト内のキーボード操作。候補は body 直下のポータルに描画されトリガーから Tab で辿れないため、
  // 矢印キーで移動し、Escape / Tab で閉じてトリガーへ戻す（Enter / Space は button のネイティブ挙動で選択）
  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const buttons = getOptionButtons();
    if (buttons.length === 0) {
      return;
    }

    const currentIndex = buttons.findIndex((button) => button === document.activeElement);
    const lastIndex = buttons.length - 1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        buttons[currentIndex === -1 || currentIndex === lastIndex ? 0 : currentIndex + 1]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        buttons[currentIndex <= 0 ? lastIndex : currentIndex - 1]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        buttons[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        buttons[lastIndex]?.focus();
        break;
      case 'Escape':
        // Modal 等の外側のハンドラへ伝えない（リストだけを閉じる）
        event.preventDefault();
        event.stopPropagation();
        closeAndFocusTrigger?.();
        break;
      case 'Tab':
        // 閉じてトリガーへ戻す。次の Tab はトリガーから通常どおり進む
        event.preventDefault();
        closeAndFocusTrigger?.();
        break;
      default:
        break;
    }
  };

  useLayoutEffect(() => {
    if (selectedOption == null) {
      return;
    }

    const container = floatingRef?.current;

    // スクロールが発生しない場合（全件が収まっている、maxHeight="none" 等）は何もしない
    if (container == null || container.scrollHeight <= container.clientHeight) {
      return;
    }

    const element = container.querySelector(`[data-id="${selectedOption.id}"]`);

    if (element == null) {
      return;
    }

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
  }, [selectedOption, maxHeight, floatingRef]);

  // 開いたら候補へフォーカスを移す（選択中の項目、なければ先頭）。リストは閉じると unmount されるので、開くたびに 1 回だけ実行される
  useLayoutEffect(() => {
    if (hasFocusedOnOpenRef.current) {
      return;
    }

    const container = floatingRef?.current;
    if (container == null) {
      return;
    }

    const selectedButton =
      selectedOption == null
        ? null
        : container.querySelector<HTMLButtonElement>(`[data-id="${selectedOption.id}"] button`);
    const target = selectedButton ?? container.querySelector<HTMLButtonElement>('button');
    target?.focus({ preventScroll: true });
    hasFocusedOnOpenRef.current = true;
  }, [selectedOption, floatingRef]);

  const listClasses = clsx('overflow-y-auto rounded bg-uiBackground01 py-2 shadow-floatingShadow', {
    'border-solid border border-uiBorder01': variant === 'outline',
  });

  const deselectButtonClasses = clsx(
    'typography-label14regular flex w-full items-center px-3 text-interactive02 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
    {
      'h-8': size !== 'large',
      'h-10': size === 'large',
    },
  );

  return (
    <ul className={listClasses} style={{ maxHeight, ...floatingStyles }} ref={ref} onKeyDown={handleKeyDown}>
      {children}
      {isDeselectVisible && selectedOption !== null && (
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
