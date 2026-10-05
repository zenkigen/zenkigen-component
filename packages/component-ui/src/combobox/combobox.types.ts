import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export type ComboboxSize = 'medium' | 'large';
export type ComboboxVariant = 'outline' | 'text';

export type ComboboxChangeMeta = { label: string };

export type ComboboxProps = PropsWithChildren<{
  /** 選択値（controlled） */
  value: string | null;
  /** 選択変更時のコールバック */
  onChange: (value: string | null, meta: ComboboxChangeMeta | null) => void;
  /** 入力テキスト（controlled） */
  inputValue: string;
  /** 入力変更時のコールバック */
  onInputChange: (value: string) => void;
  /**
   * クリアボタンのクリック時に呼ばれるコールバック。
   * このコールバックを渡したときのみクリアボタンが表示される（TextInput と同一仕様）。
   * 値のクリア（`onChange(null, null)` / `onInputChange('')`）は利用者側で行う。
   */
  onClickClearButton?: () => void;
  /** popup の開閉状態（任意、controlled） */
  isOpen?: boolean;
  /** 開閉変更時のコールバック */
  onOpenChange?: (isOpen: boolean) => void;
  /** サイズ */
  size?: ComboboxSize;
  /** バリアント */
  variant?: ComboboxVariant;
  /** プレースホルダー */
  placeholder?: string;
  /** エラー状態 */
  isError?: boolean;
  /** 無効状態 */
  isDisabled?: boolean;
  /** 幅 */
  width?: CSSProperties['width'];
  /** 最大幅 */
  maxWidth?: CSSProperties['maxWidth'];
  /** 候補リストの最大高さ */
  listMaxHeight?: CSSProperties['height'];
  /** true のとき候補リストの幅を input と一致させる。false のときコンテンツに応じて広がる（min: input 幅, max: ビューポート幅） */
  matchListToTrigger?: boolean;
}>;

export type ComboboxInputProps = PropsWithChildren<{
  /** input の autoFocus */
  autoFocus?: boolean;
}>;

export type ComboboxListProps = PropsWithChildren<{
  /** 候補リストの最大高さ（Combobox の listMaxHeight を上書き） */
  maxHeight?: CSSProperties['height'];
}>;

export type ComboboxItemProps = {
  /** 選択値として使う文字列（必須） */
  value: string;
  /** input 表示・選択時の復元用文字列（必須）。children 未指定時は 1 行 truncate 表示で自動レンダリングされる */
  label: string;
  /** 個別アイテムの無効化 */
  isDisabled?: boolean;
  /**
   * 候補行の見た目（任意）。指定時は label の代わりに描画する。見た目のみで、選択時の値・input 表示には label を使う。
   * インタラクティブ要素は置かない。高さは 1 行固定のため、はみ出し対策（truncate / min-w-0）は children 側で行う。
   */
  children?: ReactNode;
};
