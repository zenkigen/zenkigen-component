import { autoUpdate, flip, offset, size as sizeMiddleware, useFloating } from '@floating-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

// CSSProperties['height'] は string | number | undefined を受ける。
// 数値はそのまま使い、文字列は parseFloat で「200」「200px」「10rem」等から数値部分を抽出する。
// 空文字や parse 失敗 (NaN) の場合は null を返し、利用可能高をそのまま使う。
function parseListMaxHeight(value: string | number | undefined): number | null {
  if (value == null || value === '') {
    return null;
  }
  const numeric = typeof value === 'number' ? value : parseFloat(value);

  return Number.isFinite(numeric) ? numeric : null;
}

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

  // Combobox.List 直下の openable content (Item / Loading / Empty) の有無。
  // List から setHasOpenableContent を経由して同期される。
  // toggle ボタンの disable 判定に利用する。
  const [hasOpenableContent, setHasOpenableContent] = useState(false);

  // Floating UI の middleware の apply は closure で props をキャプチャするため、
  // 単に毎 render で middleware 配列を作り直しても、useFloating が新しい closure を採用しない。
  // ref に最新値を保持して apply からは ref を参照することで、props 変更にも追従する。
  const listMaxHeightRef = useRef(listMaxHeight);
  listMaxHeightRef.current = listMaxHeight;
  const matchListToTriggerRef = useRef(matchListToTrigger);
  matchListToTriggerRef.current = matchListToTrigger;

  // middleware 配列は stable に保ち、不要な useFloating 内の再構築を避ける。
  const middleware = useMemo(
    () => [
      offset(FLOATING_OFFSET),
      flip({ padding: FLOATING_VIEWPORT_PADDING }),
      sizeMiddleware({
        padding: FLOATING_VIEWPORT_PADDING,
        apply({ availableHeight, availableWidth, elements, rects }) {
          const referenceWidth = rects.reference.width;
          const numericLimit = parseListMaxHeight(listMaxHeightRef.current);
          const allowedHeight = numericLimit == null ? availableHeight : Math.min(availableHeight, numericLimit);
          if (matchListToTriggerRef.current) {
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
    [],
  );

  const { refs, floatingStyles, update } = useFloating({
    open: combobox.isOpen,
    onOpenChange: combobox.setIsOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware,
  });

  // listMaxHeight / matchListToTrigger 変更時、Floating UI に再計算を促す。
  // (autoUpdate は要素サイズ変更しか検知しないため、props 変更には別途 update() が必要)
  useEffect(() => {
    update();
  }, [listMaxHeight, matchListToTrigger, update]);

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

  // floating element（候補リスト wrapper）を outside-click 判定で参照するため自前 ref にも保持する。
  const listElementRef = useRef<HTMLDivElement | null>(null);
  const setListRef = useCallback((node: HTMLDivElement | null) => {
    listElementRef.current = node;
    refsRef.current.setFloating(node);
  }, []);

  // 候補リストは FloatingPortal で wrapperRef の外（floating 要素配下）に描画される。
  // option 選択クリックを「外部クリック」と誤判定すると、option の onClick 経由の
  // setIsOpen(false) と二重に走り onOpenChange が 2 回飛ぶため、floating 要素内は除外する。
  const { setIsOpen } = combobox;
  const handleOutsideClick = useCallback(
    (event: Event) => {
      const floatingElement = listElementRef.current;
      const target = event.target;
      if (floatingElement != null && target instanceof Node && Boolean(floatingElement.contains(target))) {
        return;
      }
      setIsOpen(false);
    },
    [setIsOpen],
  );
  useOutsideClick(wrapperRef, handleOutsideClick);

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
        hasOpenableContent,
        setHasOpenableContent,
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
