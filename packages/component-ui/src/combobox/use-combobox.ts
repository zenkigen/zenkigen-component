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
  /** 未確定入力を破棄し、最後に確定した表示テキストへ input を戻す（blur / Escape 用） */
  revertInputToCommitted: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export function useCombobox(params: UseComboboxParams): UseComboboxReturn {
  const baseId = useId();
  const listId = `${baseId}-list`;

  // params を ref に退避し、コールバック群を params の identity 変化から切り離す。
  // 毎レンダー新規の params に依存すると setIsOpen / selectValue が毎回再生成され、
  // Combobox の context value も毎回変わって全 consumer（全 Item）が再レンダーするのを防ぐ。
  const paramsRef = useRef(params);
  paramsRef.current = params;

  const isOpenControlled = params.isOpen != null;
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isOpen = isOpenControlled ? params.isOpen === true : isOpenInternal;

  // 「最後に要求 / 反映された open 状態」を即時追跡する ref。
  // render 時に実際の isOpen（controlled の親更新・内部 state・isOpen useEffect の close 等）へ同期し、
  // setIsOpen 内では onOpenChange の前に即時更新する。これにより blur → outside-click が再レンダー前に
  // 連続しても 2 回目を no-op にでき、onOpenChange(false) の二重発火を防ぐ。
  const openStateRef = useRef(isOpen);
  openStateRef.current = isOpen;

  const setIsOpen = useCallback(
    (next: boolean) => {
      if (openStateRef.current === next) {
        return;
      }
      openStateRef.current = next;
      if (!isOpenControlled) {
        setIsOpenInternal(next);
      }
      paramsRef.current.onOpenChange?.(next);
    },
    [isOpenControlled],
  );

  // blur / Escape で未確定入力を破棄して戻す先の表示テキスト。
  // 不変条件: value===null のとき必ず ''、それ以外は最後に確定した label（＝確定時の inputValue）。
  const committedInputValueRef = useRef(params.value === null ? '' : params.inputValue);

  // 外部からの value 変更（プログラム的セット）に committed を追従させる。null は必ず空に正規化。
  useEffect(() => {
    committedInputValueRef.current = paramsRef.current.value === null ? '' : paramsRef.current.inputValue;
  }, [params.value]);

  const revertInputToCommitted = useCallback(() => {
    const committed = committedInputValueRef.current;
    if (paramsRef.current.inputValue !== committed) {
      paramsRef.current.onInputChange(committed);
    }
  }, []);

  const [activeIndex, setActiveIndexState] = useState<number | null>(null);
  const [items, setItemsState] = useState<ComboboxItemMeta[]>([]);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  // 現 active item の value を ref で保持（items 変更時に再引き当てるための source of truth）
  const activeValueRef = useRef<string | null>(null);

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
      const selectedIdx = items.findIndex((item) => item.value === paramsRef.current.value && !item.isDisabled);
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
      committedInputValueRef.current = label;
      paramsRef.current.onChange(value, { label });
      paramsRef.current.onInputChange(label);
      setIsOpen(false);
      // isOpen useEffect 側で activeIndex / activeValueRef / hasInitializedActiveRef は null/false にリセットされる
    },
    [setIsOpen],
  );

  // value も inputValue も空になったら active 系（activeIndex / activeValueRef）をリセットする。
  // クリアボタン経由（利用者が onClickClearButton で onChange(null,null) + onInputChange('') する）に加え、
  // 外部から完全リセットされた場合も含めて state-driven に揃える。
  // - value !== null のまま inputValue だけ空（例: 選択済みのまま Ctrl+A Delete）はリセットしない
  //   ＝ 既存仕様「selectedValue がある間は active 位置を維持」を保つため。
  // - active を残すと open 中のクリア後に aria-activedescendant / Enter 選択対象が
  //   クリア前のまま残るため、完全クリア時は明示的に null へ戻す。
  useEffect(() => {
    if (params.inputValue === '' && params.value === null) {
      setActiveIndexState(null);
      activeValueRef.current = null;
    }
  }, [params.inputValue, params.value]);

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
      if (paramsRef.current.isDisabled === true) {
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
        // IME 変換確定の Enter（keydown 時点で isComposing=true、一部環境では keyCode=229）は
        // 候補選択として扱わない。選択すると input が controlled value（候補ラベル）に更新された直後、
        // IME 確定文字が追記され「(候補ラベル)(入力中の文字)」の二重入力になるため。
        if (event.nativeEvent.isComposing === true || event.nativeEvent.keyCode === 229) {
          return;
        }
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
          // 未確定入力は破棄し、選択値の表示へ戻す（blur と同じ revert 挙動）。
          revertInputToCommitted();
        }
      }
    },
    [isOpen, activeIndex, items, moveActive, setIsOpen, selectValue, revertInputToCommitted],
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
    revertInputToCommitted,
    inputRef,
    handleKeyDown,
  };
}
