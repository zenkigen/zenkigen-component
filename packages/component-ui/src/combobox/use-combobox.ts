import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import type { ComboboxChangeMeta } from './combobox.types';
import type { ComboboxItemMeta } from './combobox-context';

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
  setActiveIndex: (index: number | null) => void;
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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [items, setItemsState] = useState<ComboboxItemMeta[]>([]);
  const itemsRef = useRef(items);
  itemsRef.current = items;

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

  // items が変わったら activeIndex をリセット（先頭の有効 Item へ）
  useEffect(() => {
    if (items.length === 0) {
      setActiveIndex(null);

      return;
    }
    const firstEnabled = items.findIndex((item) => !item.isDisabled);
    setActiveIndex(firstEnabled === -1 ? null : firstEnabled);
  }, [items]);

  const inputRef = useRef<HTMLInputElement>(null);

  const selectValue = useCallback(
    (value: string, label: string) => {
      params.onChange(value, { label });
      params.onInputChange(label);
      setIsOpen(false);
      setActiveIndex(null);
    },
    [params, setIsOpen],
  );

  const clearValue = useCallback(() => {
    params.onChange(null, null);
    params.onInputChange('');
    setActiveIndex(null);
    inputRef.current?.focus();
  }, [params]);

  const moveActive = useCallback((direction: 'next' | 'prev') => {
    const currentItems = itemsRef.current;
    const enabledIndices = currentItems.flatMap((item, i) => (item.isDisabled ? [] : [i]));
    if (enabledIndices.length === 0) {
      return;
    }

    setActiveIndex((prev) => {
      const currentPos = prev === null ? -1 : enabledIndices.indexOf(prev);

      if (direction === 'next') {
        const nextPos = currentPos < 0 ? 0 : (currentPos + 1) % enabledIndices.length;

        return enabledIndices[nextPos] ?? null;
      }
      const nextPos = currentPos <= 0 ? enabledIndices.length - 1 : currentPos - 1;

      return enabledIndices[nextPos] ?? null;
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (params.isDisabled === true) {
        return;
      }

      if (event.altKey && event.key === 'ArrowDown') {
        event.preventDefault();
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
        if (!isOpen) {
          setIsOpen(true);

          return;
        }
        moveActive('next');

        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
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
          event.preventDefault();
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
    items,
    setItems,
    selectValue,
    clearValue,
    inputRef,
    handleKeyDown,
  };
}
