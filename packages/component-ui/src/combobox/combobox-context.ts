import type { CSSProperties, FocusEvent, KeyboardEvent, RefObject } from 'react';
import { createContext, useContext } from 'react';

import type { ComboboxSize, ComboboxVariant } from './combobox.types';
import type { ComboboxCreateJudge, ComboboxInputMode } from './use-combobox';

export type ComboboxItemMeta = {
  /** 候補 Item（option）か、作成行（create）か */
  kind: 'option' | 'create';
  /** option は Item の value。create は作成する文字列（trim 済みの入力文字） */
  value: string;
  label: string;
  isDisabled: boolean;
};

export type ComboboxContextValue = {
  /** Item の id 採番に使うベース ID */
  baseId: string;
  /** 候補リスト（ul）の id（aria-controls の値） */
  listId: string;
  /** Combobox のサイズ */
  size: ComboboxSize;
  /** Combobox の variant */
  variant: ComboboxVariant;
  /** エラー状態 */
  isError: boolean;
  /** 無効状態 */
  isDisabled: boolean;
  /** プレースホルダー */
  placeholder?: string;
  /** input の現在値 */
  inputValue: string;
  /** input の変更通知 */
  onInputChange: (value: string) => void;
  /** popup の開閉状態 */
  isOpen: boolean;
  /** popup の開閉操作 */
  setIsOpen: (next: boolean) => void;
  /** 複数選択モードか */
  isMultiple: boolean;
  /** 選択中の値の一覧（単一選択は 0〜1 件）。Item の isSelected 判定に使う */
  selectedValues: string[];
  /** Item を選択する操作（複数選択では選択済みなら外す） */
  selectValue: (value: string, label: string) => void;
  /** 複数選択: 指定した値を選択から外す（value に無い・外せない値なら何もしない） */
  removeSelected: (value: string) => void;
  /**
   * 複数選択: Chip の label を登録する（aria-live 通知用と、作成行の重複判定用）。
   * 戻り値の関数で重複判定用の登録を解除する（aria-live 用は最後に知っていた label として残す）
   */
  registerChipLabel: (value: string, label: string) => () => void;
  /** 複数選択: 描画中の Chip の label（value → label）。作成行の重複判定に使う */
  chipLabels: ReadonlyMap<string, string>;
  /** IME 変換中か（作成行の表示判定に使う） */
  isComposing: boolean;
  /** IME 変換の開始・終了を通知する（Combobox.Input の compositionstart / compositionend から呼ぶ） */
  setIsComposing: (next: boolean) => void;
  /** 作成行の重複判定の材料を登録する（Combobox.List から。作成直前の再検証に使う） */
  registerCreateJudge: (judge: ComboboxCreateJudge | null) => void;
  /** 作成行の onCreate を登録する（Combobox.CreateItem から）。戻り値の関数で登録を解除する */
  registerCreateOnCreate: (onCreate: (text: string) => void) => () => void;
  /** 作成行を選ぶ操作（表示条件を最新の値で再検証してから onCreate を呼ぶ） */
  selectCreate: () => void;
  /** 複数選択: 外せない値を登録する。戻り値の関数で登録を解除する */
  registerFixedValue: (value: string) => () => void;
  /** クリアボタンのクリック時に呼ばれる利用者コールバック（渡されたときのみクリアボタンを表示） */
  onClickClearButton?: () => void;
  /** キーボードフォーカス中の Item index（items 配列上） */
  activeIndex: number | null;
  /** activeIndex を設定（activeItemRef も同期される） */
  setActiveIndex: (index: number | null) => void;
  /** キー / マウスの操作モード（keyboard 中のみ scrollIntoView が発動） */
  inputMode: ComboboxInputMode;
  /** inputMode を設定 */
  setInputMode: (mode: ComboboxInputMode) => void;
  /** 走査済み Item 一覧 */
  items: ComboboxItemMeta[];
  /** items を Combobox.List から登録 */
  setItems: (items: ComboboxItemMeta[]) => void;
  /** Combobox.List 直下に Item / Loading / Empty / 表示中の作成行のいずれかが存在するか */
  hasOpenableContent: boolean;
  /** hasOpenableContent を Combobox.List から登録 */
  setHasOpenableContent: (next: boolean) => void;
  /** input への ref */
  inputRef: RefObject<HTMLInputElement | null>;
  /** input への ref 設定関数 */
  setInputElementRef: (node: HTMLInputElement | null) => void;
  /** 複数選択: Chip 群のコンテナへの ref（✗ へのフォーカス移動を blur で判定する） */
  chipsRef: RefObject<HTMLDivElement | null>;
  /** 入力欄の枠 div への ref 設定関数（Floating UI の reference） */
  setFrameRef: (node: HTMLDivElement | null) => void;
  /** 候補リスト wrapper への ref 設定関数（Floating UI の floating element） */
  setListRef: (node: HTMLDivElement | null) => void;
  /** Floating UI の style */
  floatingStyles: CSSProperties;
  /** 候補リストの最大高さ */
  listMaxHeight?: CSSProperties['height'];
  /** input の keydown ハンドラ */
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  /** input の blur ハンドラ（Combobox 外・Chip の ✗ へのフォーカス移動時に close + revert） */
  handleInputBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

export const ComboboxContextProvider = ComboboxContext.Provider;

export function useComboboxContext(componentName: string): ComboboxContextValue {
  const ctx = useContext(ComboboxContext);
  if (ctx === null) {
    throw new Error(`<${componentName}> must be used inside <Combobox>`);
  }

  return ctx;
}

/**
 * Combobox.List が「有効な」Combobox.CreateItem（List の直接の子として認識した最初の 1 件）だけに配る値。
 * List はその 1 件だけをこの Provider で包むため、Fragment / ラッパーで包んだものや 2 件目以降には届かない。
 */
export type ComboboxCreateItemContextValue = {
  /** 作成行に表示する文字列（trim 済み）。作成行を出さないときは null */
  createText: string | null;
};

const ComboboxCreateItemContext = createContext<ComboboxCreateItemContextValue | null>(null);

export const ComboboxCreateItemContextProvider = ComboboxCreateItemContext.Provider;

/** 有効な CreateItem のときだけ値を返す。無効（Provider の外）なら null */
export function useComboboxCreateItemContext(): ComboboxCreateItemContextValue | null {
  return useContext(ComboboxCreateItemContext);
}
