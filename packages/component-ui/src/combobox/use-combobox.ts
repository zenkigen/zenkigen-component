import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import type { ComboboxMultipleProps, ComboboxSingleProps } from './combobox.types';
import type { ComboboxItemMeta } from './combobox-context';

export type ComboboxInputMode = 'keyboard' | 'mouse';

/** 選択値まわりの params。props と同じく isMultiple で判別する */
type UseComboboxSelectionParams =
  | Pick<ComboboxSingleProps, 'isMultiple' | 'value' | 'onChange'>
  | Pick<ComboboxMultipleProps, 'isMultiple' | 'value' | 'onChange'>;

export type UseComboboxParams = UseComboboxSelectionParams & {
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
  /** 複数選択: 指定した値を選択から外す（value に無い・外せない値なら何もしない。開閉状態は変えない） */
  removeSelected: (value: string) => void;
  /** 複数選択: value の末尾から見て最初の外せる値を選択から外す（Backspace 用） */
  removeLastSelected: () => void;
  /** 複数選択: aria-live 通知用の label を登録する（unmount では削除しない＝最後に知っていた label を保持） */
  registerChipLabel: (value: string, label: string) => void;
  /** 複数選択: 外せない値を登録する。戻り値の関数で登録を解除する */
  registerFixedValue: (value: string) => () => void;
  /**
   * 複数選択: aria-live 領域に出すメッセージ（value の差分から生成。単一選択では常に空）。
   * id は通知ごとに増える連番。同じ文言が続いても別の通知として描画し直すために使う。
   */
  liveMessage: { id: number; text: string };
};

// blur / Escape で未確定入力を破棄して戻す先の表示テキストを求める。
// - 複数選択: 入力は常に未確定の検索テキストなので必ず ''
// - 単一選択: value===null のとき ''、それ以外は確定時の inputValue
function getCommittedInputValue(params: UseComboboxParams): string {
  if (params.isMultiple === true || params.value === null) {
    return '';
  }

  return params.inputValue;
}

// 複数選択の value の差分から aria-live のメッセージを組み立てる（削除 → 追加の順、「、」で連結）。
function buildLiveMessage(added: string[], removed: string[], getLabel: (value: string) => string): string {
  const toLabels = (values: string[]) => values.map((value) => `「${getLabel(value)}」`).join('、');
  const messages: string[] = [];
  if (removed.length > 0) {
    messages.push(`${toLabels(removed)}を削除しました`);
  }
  if (added.length > 0) {
    messages.push(`${toLabels(added)}を追加しました`);
  }

  return messages.join('、');
}

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
  // 不変条件（単一選択）: value===null のとき必ず ''、それ以外は最後に確定した label（＝確定時の inputValue）。
  // 不変条件（複数選択）: 常に ''（入力は常に未確定の検索テキスト。選択値はチップ側に保持される）。
  const committedInputValueRef = useRef(getCommittedInputValue(params));

  // 外部からの value 変更（プログラム的セット）に committed を追従させる。null は必ず空に正規化。
  useEffect(() => {
    committedInputValueRef.current = getCommittedInputValue(paramsRef.current);
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
      // 初回（この open セッションの最初）: 単一選択は selectedValue 優先で初期化。
      // 複数選択は選択済みが通常候補から除外されるため、value 一致を優先せず先頭 enabled にする。
      const selectedValue = paramsRef.current.isMultiple === true ? null : paramsRef.current.value;
      const selectedIdx =
        selectedValue === null ? -1 : items.findIndex((item) => item.value === selectedValue && !item.isDisabled);
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

  // 複数選択: aria-live 通知用の label 登録簿（value → 最後に知っていた label）。描画には使わない。
  const chipLabelsRef = useRef<Map<string, string>>(new Map());
  // 複数選択: 外せない値の集合。Combobox.Chip（isRemovable=false）が登録し、unmount / 変化時に解除する。
  const fixedValuesRef = useRef<Set<string>>(new Set());

  const registerChipLabel = useCallback((value: string, label: string) => {
    chipLabelsRef.current.set(value, label);
  }, []);

  const registerFixedValue = useCallback((value: string) => {
    fixedValuesRef.current.add(value);

    return () => {
      fixedValuesRef.current.delete(value);
    };
  }, []);

  const removeSelected = useCallback((value: string) => {
    const current = paramsRef.current;
    if (current.isMultiple !== true) {
      return;
    }
    if (!current.value.includes(value) || fixedValuesRef.current.has(value)) {
      return;
    }
    current.onChange(
      current.value.filter((selected) => selected !== value),
      { type: 'remove', value },
    );
  }, []);

  const removeLastSelected = useCallback(() => {
    const current = paramsRef.current;
    if (current.isMultiple !== true) {
      return;
    }
    // Chip の描画有無は問わず、value の配列順で末尾から外せる値を探す
    const target = [...current.value].reverse().find((selected) => !fixedValuesRef.current.has(selected));
    if (target == null) {
      return;
    }
    current.onChange(
      current.value.filter((selected) => selected !== target),
      { type: 'remove', value: target },
    );
  }, []);

  const selectValue = useCallback(
    (value: string, label: string) => {
      const current = paramsRef.current;
      if (current.isMultiple === true) {
        // 複数選択: 選択済みなら外し（toggle）、未選択なら追加する。リストは閉じない。
        if (current.value.includes(value)) {
          if (fixedValuesRef.current.has(value)) {
            return;
          }
          current.onChange(
            current.value.filter((selected) => selected !== value),
            { type: 'remove', value },
          );
        } else {
          // aria-live の追加通知で Item の label を使えるよう、onChange より先に登録する
          chipLabelsRef.current.set(value, label);
          current.onChange([...current.value, value], { type: 'add', value });
        }
        if (current.inputValue !== '') {
          current.onInputChange('');
        }

        return;
      }

      committedInputValueRef.current = label;
      current.onChange(value, { label });
      current.onInputChange(label);
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
  // - 複数選択では行わない（チップを全削除しても、開いているリストの active は維持する）。
  useEffect(() => {
    if (params.isMultiple !== true && params.inputValue === '' && params.value === null) {
      setActiveIndexState(null);
      activeValueRef.current = null;
    }
  }, [params.isMultiple, params.inputValue, params.value]);

  // 複数選択: value の前回との差分（value キー）から aria-live のメッセージを作る。
  // onChange 起点ではなく差分方式にするのは、利用側のプログラム的な変更も通知するため。mount 時は通知しない。
  const [liveMessage, setLiveMessage] = useState<{ id: number; text: string }>({ id: 0, text: '' });
  const prevSelectedValuesRef = useRef<string[]>(params.isMultiple === true ? params.value : []);
  useEffect(() => {
    const current = paramsRef.current;
    if (current.isMultiple !== true) {
      return;
    }
    const prev = prevSelectedValuesRef.current;
    const next = current.value;
    prevSelectedValuesRef.current = next;

    const added = next.filter((value) => !prev.includes(value));
    const removed = prev.filter((value) => !next.includes(value));
    if (added.length === 0 && removed.length === 0) {
      return;
    }
    const labels = chipLabelsRef.current;
    const text = buildLiveMessage(added, removed, (value) => labels.get(value) ?? value);
    // 同じ label の別の値を続けて追加・削除すると文言が前回と同じになる。連番を進めて毎回別の通知にする
    setLiveMessage((prevMessage) => ({ id: prevMessage.id + 1, text }));

    // 通知に使い終えた、現在の value に無い label を掃除する
    Array.from(labels.keys()).forEach((key) => {
      if (!next.includes(key)) {
        labels.delete(key);
      }
    });
  }, [params.value]);

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

      // IME 変換中（keydown 時点で isComposing=true、一部環境では keyCode=229）のキーは Combobox では扱わない。
      // - ↑↓: IME の変換候補の移動に使われる。扱うと preventDefault で候補移動を妨げ、active まで動いてしまう
      // - Enter: 変換の確定に使われる。候補選択として扱うと input が controlled value（候補ラベル）に更新された直後、
      //   IME 確定文字が追記され「(候補ラベル)(入力中の文字)」の二重入力になる
      // - Escape: 変換の取り消しに使われる。扱うと List が閉じ、未確定入力も選択値の表示へ戻されてしまう
      if (event.nativeEvent.isComposing === true || event.nativeEvent.keyCode === 229) {
        if (event.key === 'Escape') {
          // 親要素（Popover 等）は自前の keydown で Escape を処理し、IME 変換中かを判定しないため、
          // 伝搬すると変換の取り消しで親まで閉じてしまう。変換の取り消しを妨げないよう preventDefault はしない。
          event.stopPropagation();
        }

        return;
      }

      // 複数選択で入力が空のときの Backspace は、value の末尾（外せる値）を選択から外す。
      // IME 変換中の Backspace は上の共通ガードで除外される（変換中の文字削除として IME が処理する）。
      if (event.key === 'Backspace' && paramsRef.current.isMultiple === true && paramsRef.current.inputValue === '') {
        event.preventDefault();
        removeLastSelected();

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
          // 未確定入力は破棄し、選択値の表示へ戻す（blur と同じ revert 挙動）。
          revertInputToCommitted();
        }
      }
    },
    [isOpen, activeIndex, items, moveActive, setIsOpen, selectValue, revertInputToCommitted, removeLastSelected],
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
    removeSelected,
    removeLastSelected,
    registerChipLabel,
    registerFixedValue,
    liveMessage,
  };
}
