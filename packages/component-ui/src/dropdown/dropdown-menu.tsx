import clsx from 'clsx';
import type { CSSProperties, PropsWithChildren } from 'react';
import { useContext } from 'react';

import { DropdownContext } from './dropdown-context';
import type { DropdownHorizontalAlign, DropdownVerticalPosition } from './type';

/** Dropdown.Menu コンポーネントのプロパティ */
type Props = {
  /** メニュー全体の最大高さ。スクロール領域を制限したい場合に設定する。 */
  maxHeight?: CSSProperties['height'];
  /** true のとき上下の余白を取り除き、完全にカスタムなコンテンツを配置する。 */
  isNoPadding?: boolean;
  /** トリガーからの垂直方向（上側か下側か）を指定する。 */
  verticalPosition?: DropdownVerticalPosition;
  /** トリガーに対する水平方向の揃えを決める。 */
  horizontalAlign?: DropdownHorizontalAlign;
};

export function DropdownMenu({
  children,
  maxHeight,
  isNoPadding = false,
  verticalPosition = 'bottom',
  horizontalAlign = 'left',
}: PropsWithChildren<Props>) {
  const { isVisible, isDisabled, targetDimensions, variant, portalTargetRef } = useContext(DropdownContext);
  const wrapperClasses = clsx('z-dropdown w-max overflow-y-auto rounded bg-uiBackground01 shadow-floatingShadow', {
    absolute: !portalTargetRef,
    'border-solid border border-uiBorder01': variant === 'outline',
    'py-1': !isNoPadding,
    'left-0': horizontalAlign === 'left',
    'right-0': horizontalAlign === 'right',
    'left-auto': horizontalAlign === 'center',
  });

  return (
    isVisible &&
    !isDisabled && (
      <ul
        className={wrapperClasses}
        style={{
          top: !portalTargetRef && verticalPosition === 'bottom' ? `${targetDimensions.height + 4}px` : 'unset',
          bottom: !portalTargetRef && verticalPosition === 'top' ? `${targetDimensions.height + 4}px` : 'unset',
          maxHeight,
        }}
      >
        {children}
      </ul>
    )
  );
}
