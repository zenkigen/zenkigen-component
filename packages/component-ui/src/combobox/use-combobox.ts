import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import type { ComboboxChangeMeta } from './combobox.types';
import type { ComboboxItemMeta } from './combobox-context';

export type ComboboxInputMode = 'keyboard' | 'mouse';

export type UseComboboxParams = {
  value: string | null;
  onChange: (value: string | null, meta: ComboboxChangeMeta | null) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  isDisabled?: boolean;
};

export type UseComboboxReturn = {
  baseId: string;
  listId: string;
  isOpen: boolean;
  setIsOpen: (next: boolean) => void;
  activeIndex: number | null;
  /** activeIndex を設定（activeValueRef も同期される） */
  setActiveIndex: (index: number | null) => void;
  inputMode: ComboboxInputMode;
  setInputMode: (mode: ComboboxInputMode) => void;
  items: ComboboxItemMeta[];
  setItems: (items: ComboboxItemMeta[]) => void;
  selectValue: (value: string, label: string) => void;
  clearValue: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export function useCombobox(params: UseComboboxParams): UseComboboxReturn {
  const baseId = useId();
  const listId = `${baseId}-list`;

  const isOpenControlled = params.isOpen != null;
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isOpen = isOpenControlled ? params.isOpen === true : isOpenInternal;

  const setIsOpen = useCallback(
    (next: boolean) => {
      if (!isOpenControlled) {
        setIsOpenInternal(next);
      }
      params.onOpenChange?.(next);
    },
    [isOpenControlled, params],
  );

  const [activeIndex, setActiveIndexState] = useState<number | null>(null);
  const [items, setItemsState] = useState<ComboboxItemMeta[]>([]);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // 現 active item の value を ref で保持（items 変更時に再引き当てるための source of truth）
  const activeValueRef = useRef<string | null>(null);

  // params.value を ref で保持（useEffect 内で最新値を参照するため）
  const valueRef = useRef(params.value);
  valueRef.current = params.value;

  // open セッションごとの初期化済みフラグ
  const hasInitializedActiveRef = useRef(false);

  // キー/マウスの操作モード（keyboard 中は scrollIntoView を発動）
  const [inputMode, setInputMode] = useState<ComboboxInputMode>('keyboard');

  // activeIndex と activeValueRef を同期するラッパ
  const setActiveIndex = useCallback((index: number | null) => {
    setActiveIndexState(index);
    if (index === null) {
      activeValueRef.current = null;
    } else {
      const item = itemsRef.current[index];
      activeValueRef.current = item?.value ?? null;
    }
  }, []);

  const setItems = useCallback((next: ComboboxItemMeta[]) => {
    setItemsState((prev) => {
      // 浅い比較でループ更新を避ける
      if (
        prev.length === next.length &&
        prev.every(
          (p, i) => p.value === next[i]?.value && p.label === next[i]?.label && p.isDisabled === next[i]?.isDisabled,
        )
      ) {
        return prev;
      }

      return next;
    });
  }, []);

  // isOpen の切替を検知
  // - false → true: inputMode を keyboard にリセット（初回 active の scrollIntoView を抑止させない）
  // - true → false: 初期化フラグ / active をリセット
  useEffect(() => {
    if (isOpen) {
      setInputMode('keyboard');
    } else {
      hasInitializedActiveRef.current = false;
      activeValueRef.current = null;
      setActiveIndexState(null);
    }
  }, [isOpen]);

  // items 変更 + open 状態 → 初期化 or value 再引き当て
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (items.length === 0) {
      setActiveIndexState(null);
      activeValueRef.current = null;

      return;
    }

    const firstEnabledIdx = items.findIndex((item) => !item.isDisabled);
    const fallbackToFirstEnabled = () => {
      if (firstEnabledIdx === -1) {
        setActiveIndexState(null);
        activeValueRef.current = null;
      } else {
        setActiveIndexState(firstEnabledIdx);
        activeValueRef.current = items[firstEnabledIdx]?.value ?? null;
      }
    };

    if (!hasInitializedActiveRef.current) {
      // 初回（この open セッションの最初）: selectedValue 優先で初期化
      const selectedIdx = items.findIndex((item) => item.value === valueRef.current && !item.isDisabled);
      if (selectedIdx !== -1) {
        setActiveIndexState(selectedIdx);
        activeValueRef.current = items[selectedIdx]?.value ?? null;
      } else {
        fallbackToFirstEnabled();
      }
      hasInitializedActiveRef.current = true;

      return;
    }

    // 初期化済: 現 active value を新 items から引き直す（index ではなく value で同一性を判定）
    const currentActiveValue = activeValueRef.current;
    if (currentActiveValue !== null) {
      const newIdx = items.findIndex((item) => item.value === currentActiveValue && !item.isDisabled);
      if (newIdx !== -1) {
        setActiveIndexState(newIdx);

        return;
      }
    }
    // 残っていない（フィルタで落ちた / disabled 化）→ 先頭 enabled にフォールバック
    fallbackToFirstEnabled();
  }, [items, isOpen]);

  const inputRef = useRef<HTMLInputElement>(null);

  const selectValue = useCallback(
    (value: string, label: string) => {
      params.onChange(value, { label });
      params.onInputChange(label);
      setIsOpen(false);
      // isOpen useEffect 側で activeIndex / activeValueRef / hasInitializedActiveRef は null/false にリセットされる
    },
    [params, setIsOpen],
  );

  const clearValue = useCallback(() => {
    params.onChange(null, null);
    params.onInputChange('');
    setActiveIndexState(null);
    activeValueRef.current = null;
    inputRef.current?.focus();
  }, [params]);

  const moveActive = useCallback((direction: 'next' | 'prev') => {
    const currentItems = itemsRef.current;
    const enabledIndices = currentItems.flatMap((item, i) => (item.isDisabled ? [] : [i]));
    if (enabledIndices.length === 0) {
      return;
    }

    setActiveIndexState((prev) => {
      const currentPos = prev === null ? -1 : enabledIndices.indexOf(prev);

      let nextIndex: number | null;
      if (direction === 'next') {
        const nextPos = currentPos < 0 ? 0 : (currentPos + 1) % enabledIndices.length;
        nextIndex = enabledIndices[nextPos] ?? null;
      } else {
        const nextPos = currentPos <= 0 ? enabledIndices.length - 1 : currentPos - 1;
        nextIndex = enabledIndices[nextPos] ?? null;
      }

      // activeValueRef を同期
      if (nextIndex === null) {
        activeValueRef.current = null;
      } else {
        activeValueRef.current = currentItems[nextIndex]?.value ?? null;
      }

      return nextIndex;
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (params.isDisabled === true) {
        return;
      }

      if (event.altKey && event.key === 'ArrowDown') {
        event.preventDefault();
        setInputMode('keyboard');
        setIsOpen(true);

        return;
      }
      if (event.altKey && event.key === 'ArrowUp') {
        event.preventDefault();
        setIsOpen(false);

        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setInputMode('keyboard');
        if (!isOpen) {
          setIsOpen(true);

          return;
        }
        moveActive('next');

        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setInputMode('keyboard');
        if (!isOpen) {
          setIsOpen(true);

          return;
        }
        moveActive('prev');

        return;
      }

      if (event.key === 'Enter') {
        if (!isOpen || activeIndex === null) {
          return;
        }
        event.preventDefault();
        const item = items[activeIndex];
        if (item != null && !item.isDisabled) {
          selectValue(item.value, item.label);
        }

        return;
      }

      if (event.key === 'Escape') {
        if (isOpen) {
          // List が開いているときの Escape は List のみを閉じる。
          // 親要素（Popover / Modal 等）まで伝搬すると、それらも同時に閉じてしまうため stopPropagation する。
          event.preventDefault();
          event.stopPropagation();
          setIsOpen(false);
        }
      }
    },
    [params.isDisabled, isOpen, activeIndex, items, moveActive, setIsOpen, selectValue],
  );

  return {
    baseId,
    listId,
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    inputMode,
    setInputMode,
    items,
    setItems,
    selectValue,
    clearValue,
    inputRef,
    handleKeyDown,
  };
}
