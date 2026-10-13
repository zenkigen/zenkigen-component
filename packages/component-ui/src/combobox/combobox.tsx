import { autoUpdate, flip, offset, size as sizeMiddleware, useFloating } from '@floating-ui/react';
import type { FocusEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useOutsideClick } from '../hooks/use-outside-click';
import { TextInputErrorMessage } from '../text-input/text-input-error-message';
import { TextInputHelperMessage } from '../text-input/text-input-helper-message';
import type { ComboboxProps } from './combobox.types';
import { ComboboxChip } from './combobox-chip';
import { ComboboxContextProvider } from './combobox-context';
import { ComboboxCreateItem } from './combobox-create-item';
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

function ComboboxBase(props: ComboboxProps) {
  const {
    children,
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
    matchListToTrigger: shouldMatchListToTrigger = false,
    onClickClearButton,
  } = props;
  // value / onChange は isMultiple と型が連動するため、分割代入せずユニオンのまま扱う。
  // onClickClearButton は複数選択では型で禁止（never）しているため、複数選択では常に未指定になる。
  const isMultiple = props.isMultiple === true;
  const selection =
    props.isMultiple === true
      ? { isMultiple: true as const, value: props.value, onChange: props.onChange }
      : { isMultiple: false as const, value: props.value, onChange: props.onChange };

  const combobox = useCombobox({
    ...selection,
    inputValue,
    onInputChange,
    isOpen: isOpenProp,
    onOpenChange,
    isDisabled,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  // 複数選択: Combobox.Input が描画する Chip 群のコンテナ（blur 先が ✗ かの判定に使う）
  const chipsRef = useRef<HTMLDivElement>(null);

  // Combobox.List 直下の openable content (Item / Loading / Empty) の有無。
  // List から setHasOpenableContent を経由して同期される。
  // toggle ボタンの disable 判定に利用する。
  const [hasOpenableContent, setHasOpenableContent] = useState(false);

  // Floating UI の middleware の apply は closure で props をキャプチャするため、
  // 単に毎 render で middleware 配列を作り直しても、useFloating が新しい closure を採用しない。
  // ref に最新値を保持して apply からは ref を参照することで、props 変更にも追従する。
  const listMaxHeightRef = useRef(listMaxHeight);
  listMaxHeightRef.current = listMaxHeight;
  const matchListToTriggerRef = useRef(shouldMatchListToTrigger);
  matchListToTriggerRef.current = shouldMatchListToTrigger;

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
  }, [listMaxHeight, shouldMatchListToTrigger, update]);

  // refs.setReference / setFloating は再レンダリングで identity が変わる可能性があるため、
  // ref に保持して ref callback の identity を完全に stable にする。
  // identity が変わると ref callback が「null で呼ばれた後に新しい node で呼び直される」
  // という余計なサイクルが発生し、リサイズと噛み合うと position 計算結果が x=0/y=0 になる。
  const refsRef = useRef(refs);
  refsRef.current = refs;

  const setInputElementRef = useCallback(
    (node: HTMLInputElement | null) => {
      combobox.inputRef.current = node;
    },
    [combobox.inputRef],
  );

  // Floating UI の reference は TextInput 内部の枠 div（frameRef）にする。
  // - 位置基準: input の枠（HelperMessage / ErrorMessage を含まない）
  // - 幅基準: input の枠（IconButton も含む全幅）
  // input 自身を reference にすると IconButton の分だけ list 幅が狭くなる。
  // wrapper を reference にすると HelperMessage を含む高さ分 list が下にずれる。
  const setFrameRef = useCallback((node: HTMLDivElement | null) => {
    refsRef.current.setReference(node);
  }, []);

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

  // input が Combobox の外（wrapper / 候補リスト以外）へフォーカスを移したら close + revert する。
  // - 候補リストは FloatingPortal で wrapper の DOM 外に描画されるため listElementRef でも判定する。
  // - option / IconButton は preventBlur（onMouseDown.preventDefault）でフォーカスを奪わないため通常は到達しない。
  // - relatedTarget=null（タッチ / 一部ブラウザ）は「外」とみなす。
  // - setIsOpen は idempotent のため、outside-click と重なっても onOpenChange(false) は 1 回に収まる。
  // - 複数選択で Chip の ✗ へ移った場合は wrapper 内でも close + revert する。開いたまま残すと、✗ 上の Escape が
  //   input の keydown（stopPropagation 付き）を通らず親（Popover / Modal）まで閉じてしまうため。
  //   これで ✗ にフォーカスがある間はリストが常に閉じており、Escape の伝搬は「閉じた input で Escape」と同じになる。
  const { revertInputToCommitted } = combobox;
  const handleInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const next = event.relatedTarget;
      if (next instanceof Node) {
        if (chipsRef.current?.contains(next) === true) {
          setIsOpen(false);
          revertInputToCommitted();

          return;
        }
        if (wrapperRef.current?.contains(next) === true) {
          return;
        }
        if (listElementRef.current?.contains(next) === true) {
          return;
        }
      }
      setIsOpen(false);
      revertInputToCommitted();
    },
    [setIsOpen, revertInputToCommitted],
  );

  // Item の isSelected 判定を単一 / 複数で一本化するため、選択値を配列に正規化する。
  // 単一選択の value は string | null（参照が安定）なので、値が変わったときだけ再生成される。
  const selectedValue = props.value;
  const selectedValues = useMemo(() => {
    if (Array.isArray(selectedValue)) {
      return selectedValue;
    }

    return selectedValue === null ? [] : [selectedValue];
  }, [selectedValue]);

  // context value は useMemo で安定化する。毎レンダー新規だと全 consumer（Input / 全 Item）が
  // 無条件で再レンダーするため、依存が実際に変化したときのみ再生成する。
  const contextValue = useMemo(
    () => ({
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
      setIsOpen,
      isMultiple,
      selectedValues,
      selectValue: combobox.selectValue,
      removeSelected: combobox.removeSelected,
      registerChipLabel: combobox.registerChipLabel,
      chipLabels: combobox.chipLabels,
      isComposing: combobox.isComposing,
      setIsComposing: combobox.setIsComposing,
      registerCreateJudge: combobox.registerCreateJudge,
      registerCreateOnCreate: combobox.registerCreateOnCreate,
      selectCreate: combobox.selectCreate,
      registerFixedValue: combobox.registerFixedValue,
      onClickClearButton,
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
      chipsRef,
      setFrameRef,
      setListRef,
      floatingStyles,
      listMaxHeight,
      handleKeyDown: combobox.handleKeyDown,
      handleInputBlur,
    }),
    [
      combobox.baseId,
      combobox.listId,
      size,
      variant,
      isError,
      isDisabled,
      placeholder,
      inputValue,
      onInputChange,
      combobox.isOpen,
      setIsOpen,
      isMultiple,
      selectedValues,
      combobox.selectValue,
      combobox.removeSelected,
      combobox.registerChipLabel,
      combobox.chipLabels,
      combobox.isComposing,
      combobox.setIsComposing,
      combobox.registerCreateJudge,
      combobox.registerCreateOnCreate,
      combobox.selectCreate,
      combobox.registerFixedValue,
      onClickClearButton,
      combobox.activeIndex,
      combobox.setActiveIndex,
      combobox.inputMode,
      combobox.setInputMode,
      combobox.items,
      combobox.setItems,
      hasOpenableContent,
      setHasOpenableContent,
      combobox.inputRef,
      setInputElementRef,
      chipsRef,
      setFrameRef,
      setListRef,
      floatingStyles,
      listMaxHeight,
      combobox.handleKeyDown,
      handleInputBlur,
    ],
  );

  return (
    <ComboboxContextProvider value={contextValue}>
      <div ref={wrapperRef} style={{ width, maxWidth }}>
        {children}
        {/* 複数選択の追加・削除を読み上げる領域。更新前から存在させるため multiple のとき常時描画する */}
        {isMultiple && (
          <div className="sr-only" aria-live="polite">
            {/* 中身だけを通知ごとの key で入れ替える。同じ文言が続いても DOM が変わり、新しい通知として伝わる */}
            {combobox.liveMessage.text !== '' && <span key={combobox.liveMessage.id}>{combobox.liveMessage.text}</span>}
          </div>
        )}
      </div>
    </ComboboxContextProvider>
  );
}

export const Combobox = Object.assign(ComboboxBase, {
  Input: ComboboxInput,
  List: ComboboxList,
  Item: ComboboxItem,
  Chip: ComboboxChip,
  CreateItem: ComboboxCreateItem,
  Loading: ComboboxLoading,
  Empty: ComboboxEmpty,
  HelperMessage: TextInputHelperMessage,
  ErrorMessage: TextInputErrorMessage,
  displayName: 'Combobox',
});
