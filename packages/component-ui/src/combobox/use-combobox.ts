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
  /** activeIndex を設定（activeItemRef も同期される） */
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
  /**
   * 複数選択: Chip の label を登録する。aria-live 通知用（unmount では削除しない＝最後に知っていた label を保持）と、
   * 作成行の重複判定用（戻り値の関数で解除する）の 2 つに登録する
   */
  registerChipLabel: (value: string, label: string) => () => void;
  /** 複数選択: 描画中の Chip の label（作成行の重複判定用。Chip の追加・削除・label 変更で再描画される） */
  chipLabels: ReadonlyMap<string, string>;
  /** IME 変換中か */
  isComposing: boolean;
  /** IME 変換の開始・終了を通知する */
  setIsComposing: (next: boolean) => void;
  /** 作成行の重複判定の材料を登録する（Combobox.List から） */
  registerCreateJudge: (judge: ComboboxCreateJudge | null) => void;
  /** 作成行の onCreate を登録する（Combobox.CreateItem から）。戻り値の関数で解除する */
  registerCreateOnCreate: (onCreate: (text: string) => void) => () => void;
  /** 作成行を選ぶ（表示条件を最新の値で再検証し、満たすときだけ onCreate を呼ぶ） */
  selectCreate: () => void;
  /** 複数選択: 外せない値を登録する。戻り値の関数で登録を解除する */
  registerFixedValue: (value: string) => () => void;
  /**
   * 複数選択: aria-live 領域に出すメッセージ（value の差分から生成。単一選択では常に空）。
   * id は通知ごとに増える連番。同じ文言が続いても別の通知として描画し直すために使う。
   */
  liveMessage: { id: number; text: string };
};

/** 作成行の表示判定のうち、Combobox.List の children から得る材料 */
export type ComboboxCreateJudge = {
  /** Combobox.Loading が描画されているか */
  hasLoading: boolean;
  /** 候補 Item の label */
  optionLabels: string[];
  /** Combobox.CreateItem の checkDuplicate（指定時は既定の重複判定を置き換える） */
  checkDuplicate?: (text: string) => boolean;
};

/**
 * 作成行に出す文字列を求める。出さないときは null。描画時（Combobox.List）と実行直前（selectCreate）で共有する。
 * - 入力を trim して空 / IME 変換中 / Loading 描画中 / 重複 のときは出さない
 * - 重複の既定判定: 候補 Item の label、または選択中の値の Chip の label と完全一致（===）
 */
export function resolveCreateText({
  inputValue,
  isComposing,
  selectedValues,
  chipLabels,
  judge,
}: {
  inputValue: string;
  isComposing: boolean;
  selectedValues: string[];
  chipLabels: ReadonlyMap<string, string>;
  judge: ComboboxCreateJudge;
}): string | null {
  const text = inputValue.trim();
  if (text === '' || isComposing || judge.hasLoading) {
    return null;
  }
  const isDuplicate =
    judge.checkDuplicate != null
      ? judge.checkDuplicate(text)
      : judge.optionLabels.includes(text) || selectedValues.some((value) => chipLabels.get(value) === text);

  return isDuplicate ? null : text;
}

// active な項目の識別子。作成行は 1 つだけなので kind のみで同一とみなす（入力に合わせて文字列が変わっても active を保つ）。
type ActiveItemKey = { kind: ComboboxItemMeta['kind']; value: string };

function toActiveItemKey(item: ComboboxItemMeta | undefined): ActiveItemKey | null {
  return item == null ? null : { kind: item.kind, value: item.value };
}

function isSameItem(item: ComboboxItemMeta, key: ActiveItemKey): boolean {
  return item.kind === key.kind && (item.kind === 'create' || item.value === key.value);
}

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

  // 現 active item の識別子を ref で保持（items 変更時に再引き当てるための source of truth）
  const activeItemRef = useRef<ActiveItemKey | null>(null);

  // open セッションごとの初期化済みフラグ
  const hasInitializedActiveRef = useRef(false);

  // キー/マウスの操作モード（keyboard 中は scrollIntoView を発動）
  const [inputMode, setInputMode] = useState<ComboboxInputMode>('keyboard');

  // activeIndex と activeItemRef を同期するラッパ
  const setActiveIndex = useCallback((index: number | null) => {
    setActiveIndexState(index);
    activeItemRef.current = index === null ? null : toActiveItemKey(itemsRef.current[index]);
  }, []);

  const setItems = useCallback((next: ComboboxItemMeta[]) => {
    setItemsState((prev) => {
      // 浅い比較でループ更新を避ける
      if (
        prev.length === next.length &&
        prev.every(
          (p, i) =>
            p.kind === next[i]?.kind &&
            p.value === next[i]?.value &&
            p.label === next[i]?.label &&
            p.isDisabled === next[i]?.isDisabled,
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
      activeItemRef.current = null;
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
      activeItemRef.current = null;

      return;
    }

    const firstEnabledIdx = items.findIndex((item) => !item.isDisabled);
    const fallbackToFirstEnabled = () => {
      if (firstEnabledIdx === -1) {
        setActiveIndexState(null);
        activeItemRef.current = null;
      } else {
        setActiveIndexState(firstEnabledIdx);
        activeItemRef.current = toActiveItemKey(items[firstEnabledIdx]);
      }
    };

    if (!hasInitializedActiveRef.current) {
      // 初回（この open セッションの最初）: 単一選択は selectedValue 優先で初期化。
      // 複数選択は選択済みが通常候補から除外されるため、value 一致を優先せず先頭 enabled にする。
      const selectedValue = paramsRef.current.isMultiple === true ? null : paramsRef.current.value;
      const selectedIdx =
        selectedValue === null
          ? -1
          : items.findIndex((item) => item.kind === 'option' && item.value === selectedValue && !item.isDisabled);
      if (selectedIdx !== -1) {
        setActiveIndexState(selectedIdx);
        activeItemRef.current = toActiveItemKey(items[selectedIdx]);
      } else {
        fallbackToFirstEnabled();
      }
      hasInitializedActiveRef.current = true;

      return;
    }

    // 初期化済: 現 active を新 items から引き直す（index ではなく value（作成行は kind）で同一性を判定）
    const currentActiveItem = activeItemRef.current;
    if (currentActiveItem !== null) {
      const newIdx = items.findIndex((item) => isSameItem(item, currentActiveItem) && !item.isDisabled);
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

  // 複数選択: 作成行の重複判定用の Chip label（value → label）。描画中の判定に使うため ref ではなく state で持つ。
  // ref だと、入力・選択 ID を変えずに Chip の label だけが変わったとき再描画されず、完全一致しているのに作成行が残る。
  // Chip の layout effect から更新するため paint 前に同期で再描画され、作成行の表示がちらつかない。
  const [chipLabels, setChipLabels] = useState<ReadonlyMap<string, string>>(() => new Map());
  // 作成直前の再検証（selectCreate）で最新の値を参照するための ref
  const chipLabelsStateRef = useRef(chipLabels);
  chipLabelsStateRef.current = chipLabels;

  const registerChipLabel = useCallback((value: string, label: string) => {
    chipLabelsRef.current.set(value, label);
    // 同値なら同じ Map を返して再描画しない
    setChipLabels((prev) => (prev.get(value) === label ? prev : new Map(prev).set(value, label)));

    return () => {
      setChipLabels((prev) => {
        if (prev.get(value) !== label) {
          return prev;
        }
        const next = new Map(prev);
        next.delete(value);

        return next;
      });
    };
  }, []);

  // IME 変換中か。作成行の表示を切り替えるため state で持ち、作成直前の再検証用に ref でも即時に追跡する
  // （compositionstart の直後、再描画前に作成行がクリックされても未確定の文字で作成しないため）。
  const [isComposing, setIsComposingState] = useState(false);
  const isComposingRef = useRef(false);
  const setIsComposing = useCallback((next: boolean) => {
    isComposingRef.current = next;
    setIsComposingState(next);
  }, []);

  // 作成行: 重複判定の材料（Combobox.List が登録）と onCreate（Combobox.CreateItem が登録）。
  // items state にコールバックを入れると setItems の浅い比較が毎レンダー崩れるため、ref で持つ。
  const createJudgeRef = useRef<ComboboxCreateJudge | null>(null);
  const createOnCreateRef = useRef<((text: string) => void) | null>(null);

  const registerCreateJudge = useCallback((judge: ComboboxCreateJudge | null) => {
    createJudgeRef.current = judge;
  }, []);

  const registerCreateOnCreate = useCallback((onCreate: (text: string) => void) => {
    createOnCreateRef.current = onCreate;

    return () => {
      if (createOnCreateRef.current === onCreate) {
        createOnCreateRef.current = null;
      }
    };
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
      // isOpen useEffect 側で activeIndex / activeItemRef / hasInitializedActiveRef は null/false にリセットされる
    },
    [setIsOpen],
  );

  // 作成行を選ぶ。描画と実行の間に入力・変換状態・Chip の label 等が変わった場合に備え、
  // 表示条件を最新の値で再検証し、満たさなければ何もしない。
  // 作成後、入力は触らない（作成の成否を知っている利用側が成功時にクリアする。失敗時は文字が残り再試行できる）。
  const selectCreate = useCallback(() => {
    const current = paramsRef.current;
    const judge = createJudgeRef.current;
    const onCreate = createOnCreateRef.current;
    if (current.isDisabled === true || judge === null || onCreate === null) {
      return;
    }
    const text = resolveCreateText({
      inputValue: current.inputValue,
      isComposing: isComposingRef.current,
      selectedValues: current.isMultiple === true ? current.value : [],
      chipLabels: chipLabelsStateRef.current,
      judge,
    });
    if (text === null) {
      return;
    }
    onCreate(text);
    // 複数選択は続けて選べるよう開いたまま。単一選択は確定操作として閉じる
    if (current.isMultiple !== true) {
      setIsOpen(false);
    }
  }, [setIsOpen]);

  // value も inputValue も空になったら active 系（activeIndex / activeItemRef）をリセットする。
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
      activeItemRef.current = null;
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

      // activeItemRef を同期
      activeItemRef.current = nextIndex === null ? null : toActiveItemKey(currentItems[nextIndex]);

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
        if (item == null || item.isDisabled) {
          return;
        }
        if (item.kind === 'create') {
          selectCreate();
        } else {
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
    [
      isOpen,
      activeIndex,
      items,
      moveActive,
      setIsOpen,
      selectValue,
      selectCreate,
      revertInputToCommitted,
      removeLastSelected,
    ],
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
    chipLabels,
    isComposing,
    setIsComposing,
    registerCreateJudge,
    registerCreateOnCreate,
    selectCreate,
    registerFixedValue,
    liveMessage,
  };
}
