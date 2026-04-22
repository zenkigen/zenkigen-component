import type { CSSProperties, KeyboardEvent, RefObject } from 'react';
import { createContext, useContext } from 'react';

import type { ComboboxSize, ComboboxVariant } from './combobox.types';
import type { ComboboxInputMode } from './use-combobox';

export type ComboboxItemMeta = {
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
  /** 選択中の値 */
  selectedValue: string | null;
  /** Item を選択する操作 */
  selectValue: (value: string, label: string) => void;
  /** 選択解除 */
  clearValue: () => void;
  /** キーボードフォーカス中の Item index（items 配列上） */
  activeIndex: number | null;
  /** activeIndex を設定（activeValueRef も同期される） */
  setActiveIndex: (index: number | null) => void;
  /** キー / マウスの操作モード（keyboard 中のみ scrollIntoView が発動） */
  inputMode: ComboboxInputMode;
  /** inputMode を設定 */
  setInputMode: (mode: ComboboxInputMode) => void;
  /** 走査済み Item 一覧 */
  items: ComboboxItemMeta[];
  /** items を Combobox.List から登録 */
  setItems: (items: ComboboxItemMeta[]) => void;
  /** input への ref */
  inputRef: RefObject<HTMLInputElement | null>;
  /** input への ref 設定関数（Floating UI の reference と統合） */
  setInputElementRef: (node: HTMLInputElement | null) => void;
  /** 候補リスト ul への ref 設定関数（Floating UI と統合） */
  setListRef: (node: HTMLUListElement | null) => void;
  /** Floating UI の style */
  floatingStyles: CSSProperties;
  /** 候補リストの最大高さ */
  listMaxHeight?: CSSProperties['height'];
  /** input の keydown ハンドラ */
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
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
