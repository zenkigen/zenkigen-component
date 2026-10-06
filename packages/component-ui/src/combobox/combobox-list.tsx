import { FloatingPortal } from '@floating-ui/react';
import type { ReactNode } from 'react';
import { Children, isValidElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { List } from '../list/list';
import type { ComboboxCreateItemProps, ComboboxItemProps, ComboboxListProps } from './combobox.types';
import type { ComboboxCreateItemContextValue, ComboboxItemMeta } from './combobox-context';
import { ComboboxCreateItemContextProvider, useComboboxContext } from './combobox-context';
import { ComboboxCreateItem } from './combobox-create-item';
import { ComboboxItem } from './combobox-item';
import { ComboboxEmpty, ComboboxLoading } from './combobox-status';
import type { ComboboxCreateJudge } from './use-combobox';
import { resolveCreateText } from './use-combobox';

type ExtractedChildren = {
  /** 候補 Item の meta（children の順） */
  options: ComboboxItemMeta[];
  /** 作成行を items に差し込む位置（options 上の index）。CreateItem が無ければ null */
  createPosition: number | null;
  /** 最初の CreateItem の props（2 件目以降は無視する） */
  createProps: ComboboxCreateItemProps | null;
  /** Combobox.Loading があるか */
  hasLoading: boolean;
};

function extractChildren(children: ReactNode): ExtractedChildren {
  const result: ExtractedChildren = {
    options: [],
    createPosition: null,
    createProps: null,
    hasLoading: false,
  };
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.type === ComboboxItem) {
      const props = child.props as ComboboxItemProps;
      result.options.push({
        kind: 'option',
        value: props.value,
        label: props.label,
        isDisabled: props.isDisabled ?? false,
      });
    } else if (child.type === ComboboxCreateItem) {
      if (result.createProps === null) {
        result.createProps = child.props as ComboboxCreateItemProps;
        result.createPosition = result.options.length;
      }
    } else if (child.type === ComboboxLoading) {
      result.hasLoading = true;
    }
  });

  return result;
}

// 直接の子として認識した最初の CreateItem だけを Provider で包み、有効にする。
// 包まれないもの（Fragment / ラッパーで包んだもの・2 件目以降）は何も描画せず、onCreate も登録しない。
function wrapEnabledCreateItem(children: ReactNode, value: ComboboxCreateItemContextValue): ReactNode {
  let isCreateItemFound = false;

  return Children.map(children, (child) => {
    if (!isValidElement(child) || child.type !== ComboboxCreateItem || isCreateItemFound) {
      return child;
    }
    isCreateItemFound = true;

    return <ComboboxCreateItemContextProvider value={value}>{child}</ComboboxCreateItemContextProvider>;
  });
}

function hasOpenableContent(children: ReactNode): boolean {
  let isFound = false;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.type === ComboboxItem || child.type === ComboboxLoading || child.type === ComboboxEmpty) {
      isFound = true;
    }
  });

  return isFound;
}

export function ComboboxList({ children, maxHeight: maxHeightProp }: ComboboxListProps) {
  const {
    listId,
    isOpen,
    isMultiple,
    inputValue,
    isComposing,
    selectedValues,
    chipLabels,
    registerCreateJudge,
    setItems,
    setHasOpenableContent,
    setListRef,
    floatingStyles,
    listMaxHeight,
    variant,
    size,
  } = useComboboxContext('Combobox.List');

  const extracted = useMemo(() => extractChildren(children), [children]);
  const { options, createPosition, createProps, hasLoading } = extracted;

  // 作成行の表示判定の材料（CreateItem が無ければ null）
  const createJudge = useMemo<ComboboxCreateJudge | null>(
    () =>
      createProps === null
        ? null
        : {
            hasLoading,
            optionLabels: options.map((option) => option.label),
            checkDuplicate: createProps.checkDuplicate,
          },
    [createProps, hasLoading, options],
  );

  // 作成行に出す文字列。表示条件（空・変換中・Loading 描画中・重複）を満たさなければ null で、
  // そのときは区切り線も含めて何も描画せず、items にも hasOpenableContent にも数えない。
  const createText =
    createJudge === null
      ? null
      : resolveCreateText({ inputValue, isComposing, selectedValues, chipLabels, judge: createJudge });

  const items = useMemo(() => {
    if (createText === null || createPosition === null) {
      return options;
    }
    const createItem: ComboboxItemMeta = { kind: 'create', value: createText, label: createText, isDisabled: false };

    return [...options.slice(0, createPosition), createItem, ...options.slice(createPosition)];
  }, [options, createText, createPosition]);

  const hasStaticContent = useMemo(() => hasOpenableContent(children), [children]);
  const hasContent = hasStaticContent || createText !== null;

  // 作成直前の再検証（selectCreate）のため、判定の材料を Combobox 本体に登録する
  useLayoutEffect(() => {
    registerCreateJudge(createJudge);

    return () => {
      registerCreateJudge(null);
    };
  }, [createJudge, registerCreateJudge]);

  const createItemContextValue = useMemo(() => ({ createText }), [createText]);

  // items を Combobox 本体に通知
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  // hasOpenableContent を Combobox 本体に通知（toggle ボタンの disable 判定に使う）
  useEffect(() => {
    setHasOpenableContent(hasContent);
  }, [hasContent, setHasOpenableContent]);

  // scrollable な内側 ul への ref（scrollTop リセット用）
  const ulRef = useRef<HTMLUListElement | null>(null);

  // Floating UI の floating element として wrapper (List の containerRef) を渡す
  const mergedContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      setListRef(node);
    },
    [setListRef],
  );

  // open false → true で内側 ul の scrollTop をリセット（前回 scroll 位置を持ち越さない）
  const prevOpenRef = useRef(isOpen);
  useEffect(() => {
    if (!prevOpenRef.current && isOpen && ulRef.current != null) {
      ulRef.current.scrollTop = 0;
    }
    prevOpenRef.current = isOpen;
  }, [isOpen]);

  // popup を常時 DOM に残し visibility で制御する。
  // null で unmount すると Floating UI の autoUpdate が再起動する瞬間に
  // floatingStyles の初期値 (top:0, left:0) で 1 フレーム描画されてしまう。
  const isVisible = isOpen && hasContent;

  // Floating UI の floating element (= setFloating で参照される DOM) と
  // floatingStyles の適用先は同じ要素である必要がある。
  // ここでは wrapper div (List の外側) を floating element とし、style は wrapper に適用される。
  // wrapper: bg / rounded / shadow / overflow-hidden / maxHeight (macOS bounce 透過対策)
  // 内側 ul: overflow-y-auto で実際の scroll を担当
  return (
    <FloatingPortal>
      <List
        ref={ulRef}
        containerRef={mergedContainerRef}
        id={listId}
        size={size}
        variant={variant === 'outline' ? 'outline' : 'borderless'}
        selectionIndicator="right"
        maxHeight={maxHeightProp ?? listMaxHeight}
        aria-label="候補一覧"
        {...(isMultiple ? { 'aria-multiselectable': true } : {})}
        className="z-popover"
        style={{
          ...floatingStyles,
          visibility: isVisible ? 'visible' : 'hidden',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        {wrapEnabledCreateItem(children, createItemContextValue)}
      </List>
    </FloatingPortal>
  );
}
