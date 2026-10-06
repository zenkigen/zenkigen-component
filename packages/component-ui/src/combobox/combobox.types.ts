import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';

export type ComboboxSize = 'medium' | 'large';
export type ComboboxVariant = 'outline' | 'text';

export type ComboboxChangeMeta = { label: string };

/** 複数選択モードの onChange に渡す差分情報 */
export type ComboboxMultipleChangeMeta = {
  /** 追加（add）か削除（remove）か */
  type: 'add' | 'remove';
  /** 追加・削除された値 */
  value: string;
};

type ComboboxCommonProps = PropsWithChildren<{
  /** 入力テキスト（controlled） */
  inputValue: string;
  /** 入力変更時のコールバック */
  onInputChange: (value: string) => void;
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

/** 単一選択モード（既定）の props */
export type ComboboxSingleProps = ComboboxCommonProps & {
  /** 複数選択モードにするか。単一選択では指定しない（または false） */
  isMultiple?: false;
  /** 選択値（controlled） */
  value: string | null;
  /** 選択変更時のコールバック */
  onChange: (value: string | null, meta: ComboboxChangeMeta | null) => void;
  /**
   * クリアボタンのクリック時に呼ばれるコールバック。
   * このコールバックを渡したときのみクリアボタンが表示される（TextInput と同一仕様）。
   * 値のクリア（`onChange(null, null)` / `onInputChange('')`）は利用者側で行う。
   */
  onClickClearButton?: () => void;
};

/** 複数選択モードの props */
export type ComboboxMultipleProps = ComboboxCommonProps & {
  /** 複数選択モードにする */
  isMultiple: true;
  /** 選択済みの値の配列（controlled） */
  value: string[];
  /** 追加・削除のたびに、次の配列と差分情報を渡すコールバック */
  onChange: (value: string[], meta: ComboboxMultipleChangeMeta) => void;
  /** 複数選択モードではクリアボタンを提供しない */
  onClickClearButton?: never;
};

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps;

export type ComboboxInputProps = PropsWithChildren<{
  /** input の autoFocus */
  autoFocus?: boolean;
  /** input の id。`<label htmlFor>` と関連付けるときに指定する */
  id?: string;
  /** input の accessible name */
  'aria-label'?: string;
  /** input の accessible name を、画面上の別要素の id で指定する */
  'aria-labelledby'?: string;
}>;

/** 複数選択モードで選択済みの値を表すチップ（`Combobox.Input` の直接の子に置く） */
export type ComboboxChipProps = {
  /** 対応する選択値。✗ で削除するとこの値が value から除かれる */
  value: string;
  /** チップの表示文字列。✗ の accessible name（「○○を削除」）と追加・削除の読み上げにも使う */
  label: string;
  /** false で外せないチップにする（✗ を描画せず、Backspace・候補の再選択でも外れない） */
  isRemovable?: boolean;
};

/** 候補リストの末尾などに置く「「{入力文字}」を作成」行（`Combobox.List` の直接の子に置く） */
export type ComboboxCreateItemProps = {
  /**
   * 作成行を Enter / クリックで選んだときに呼ばれる。text は入力文字を trim したもの。
   * ライブラリは onChange も onInputChange も呼ばない（value への追加と、成功時の入力クリアは利用側で行う）。
   */
  onCreate: (text: string) => void;
  /**
   * 入力文字が既存と重複しているかを判定する同期関数（任意）。true を返すと作成行を出さない。
   * 指定すると既定の判定（候補 Item の label、または value に含まれる値の Chip の label との完全一致）を置き換える。
   */
  checkDuplicate?: (text: string) => boolean;
};

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
