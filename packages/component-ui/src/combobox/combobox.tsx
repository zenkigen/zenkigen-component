import { autoUpdate, flip, offset, size as sizeMiddleware, useFloating } from '@floating-ui/react';
import { useCallback, useRef } from 'react';

import { useOutsideClick } from '../hooks/use-outside-click';
import { TextInputErrorMessage } from '../text-input/text-input-error-message';
import { TextInputHelperMessage } from '../text-input/text-input-helper-message';
import type { ComboboxProps } from './combobox.types';
import { ComboboxContextProvider } from './combobox-context';
import { ComboboxInput } from './combobox-input';
import { ComboboxItem } from './combobox-item';
import { ComboboxList } from './combobox-list';
import { ComboboxEmpty, ComboboxLoading } from './combobox-status';
import { useCombobox } from './use-combobox';

const FLOATING_OFFSET = 4;
const FLOATING_VIEWPORT_PADDING = 8;

function ComboboxBase({
  children,
  value,
  onChange,
  inputValue,
  onInputChange,
  isOpen: isOpenProp,
  onOpenChange,
  size = 'medium',
  variant = 'outline',
  placeholder,
  isError = false,
  isDisabled = false,
  width,
  maxWidth,
  listMaxHeight,
  matchListToTrigger = false,
}: ComboboxProps) {
  const combobox = useCombobox({
    value,
    onChange,
    inputValue,
    onInputChange,
    isOpen: isOpenProp,
    onOpenChange,
    isDisabled,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => combobox.setIsOpen(false));

  const { refs, floatingStyles } = useFloating({
    open: combobox.isOpen,
    onOpenChange: combobox.setIsOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(FLOATING_OFFSET),
      flip({ padding: FLOATING_VIEWPORT_PADDING }),
      sizeMiddleware({
        padding: FLOATING_VIEWPORT_PADDING,
        apply({ availableHeight, availableWidth, elements, rects }) {
          const referenceWidth = rects.reference.width;
          const allowedHeight =
            listMaxHeight == null ? availableHeight : Math.min(availableHeight, Number(listMaxHeight));
          if (matchListToTrigger) {
            // input と同じ幅に固定
            elements.floating.style.width = `${referenceWidth}px`;
          } else {
            // コンテンツに応じて幅が広がる（input 幅が最小、ビューポート幅が最大）
            elements.floating.style.minWidth = `${referenceWidth}px`;
            elements.floating.style.maxWidth = `${availableWidth}px`;
          }
          elements.floating.style.maxHeight = `${allowedHeight}px`;
        },
      }),
    ],
  });

  // refs.setReference / setFloating は再レンダリングで identity が変わる可能性があるため、
  // ref に保持して ref callback の identity を完全に stable にする。
  // identity が変わると ref callback が「null で呼ばれた後に新しい node で呼び直される」
  // という余計なサイクルが発生し、リサイズと噛み合うと position 計算結果が x=0/y=0 になる。
  const refsRef = useRef(refs);
  refsRef.current = refs;

  // Floating UI の reference は input の親 (TextInput 内部の inner wrap div) にする。
  // - 位置基準: input の枠（HelperMessage / ErrorMessage を含まない）
  // - 幅基準: input の枠（IconButton も含む全幅）
  // input 自身を reference にすると IconButton の分だけ list 幅が狭くなる。
  // wrapper を reference にすると HelperMessage を含む高さ分 list が下にずれる。
  const setInputElementRef = useCallback(
    (node: HTMLInputElement | null) => {
      combobox.inputRef.current = node;
      refsRef.current.setReference(node?.parentElement ?? null);
    },
    [combobox.inputRef],
  );

  const setListRef = useCallback((node: HTMLDivElement | null) => {
    refsRef.current.setFloating(node);
  }, []);

  return (
    <ComboboxContextProvider
      value={{
        baseId: combobox.baseId,
        listId: combobox.listId,
        size,
        variant,
        isError,
        isDisabled,
        placeholder,
        inputValue,
        onInputChange,
        isOpen: combobox.isOpen,
        setIsOpen: combobox.setIsOpen,
        selectedValue: value,
        selectValue: combobox.selectValue,
        clearValue: combobox.clearValue,
        activeIndex: combobox.activeIndex,
        setActiveIndex: combobox.setActiveIndex,
        inputMode: combobox.inputMode,
        setInputMode: combobox.setInputMode,
        items: combobox.items,
        setItems: combobox.setItems,
        inputRef: combobox.inputRef,
        setInputElementRef,
        setListRef,
        floatingStyles,
        listMaxHeight,
        handleKeyDown: combobox.handleKeyDown,
      }}
    >
      <div ref={wrapperRef} style={{ width, maxWidth }}>
        {children}
      </div>
    </ComboboxContextProvider>
  );
}

export const Combobox = Object.assign(ComboboxBase, {
  Input: ComboboxInput,
  List: ComboboxList,
  Item: ComboboxItem,
  Loading: ComboboxLoading,
  Empty: ComboboxEmpty,
  HelperMessage: TextInputHelperMessage,
  ErrorMessage: TextInputErrorMessage,
  displayName: 'Combobox',
});
