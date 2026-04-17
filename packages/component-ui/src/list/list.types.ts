import type { CSSProperties, MouseEvent, PropsWithChildren } from 'react';

export type ListSize = 'medium' | 'large';
export type ListVariant = 'outline' | 'borderless';
export type ListRole = 'listbox' | 'menu';

export type ListProps = PropsWithChildren<{
  /** リストのサイズ */
  size?: ListSize;
  /** 枠線の有無 */
  variant?: ListVariant;
  /** リスト全体の最大高さ */
  maxHeight?: CSSProperties['height'];
  /** リスト全体の幅 */
  width?: CSSProperties['width'];
  /** 追加の style（Floating UI の floatingStyles 等を渡す用途） */
  style?: CSSProperties;
  /** 追加の className（z-index 制御等の用途） */
  className?: string;
  /** ARIA role。Combobox では 'listbox'、Dropdown では 'menu' */
  role?: ListRole;
  /** 要素 ID（aria-controls のターゲットに使う） */
  id?: string;
  /** アクセシブルな名前 */
  'aria-label'?: string;
  /** アクセシブルな名前（参照） */
  'aria-labelledby'?: string;
}>;

export type ListOptionItemProps = PropsWithChildren<{
  /** aria-activedescendant のターゲット ID（必須） */
  id: string;
  /** キーボードフォーカス中（視覚強調） */
  isActive?: boolean;
  /** 選択済み（背景強調） */
  isSelected?: boolean;
  /** 無効状態 */
  isDisabled?: boolean;
  /** エラー状態（Selected_Error スタイル用） */
  isError?: boolean;
  /** クリック時のハンドラ */
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  /** ホバー検知（activeIndex 同期用） */
  onMouseEnter?: () => void;
  /** ARIA: 選択状態。未指定時は isSelected を使用 */
  'aria-selected'?: boolean;
  /** ARIA: 無効状態。未指定時は isDisabled を使用 */
  'aria-disabled'?: boolean;
}>;
