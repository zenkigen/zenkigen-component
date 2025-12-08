import { focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

import { SelectItem } from './select-item';
import type { SortOrder } from './type';

type Props = {
  /** 表示中の SelectSort と同期させるサイズ。リストの高さや位置に反映される。 */
  size: 'x-small' | 'small' | 'medium' | 'large';
  /** ドロップダウンのボーダー有無を決めるバリアント。 */
  variant: 'text' | 'outline';
  /** 現在の並び替え方向。選択中の項目をハイライトする。 */
  sortOrder: SortOrder;
  /** 昇順・降順を選んだときに呼び出すハンドラー。 */
  onClickItem: (value: SortOrder) => void;
  /** 選択解除ボタンを押したときに呼び出すハンドラー。 */
  onClickDeselect?: () => void;
};

export function SelectList({ size, variant, sortOrder, onClickItem, onClickDeselect }: Props) {
  const listClasses = clsx(
    'absolute z-dropdown w-max overflow-y-auto rounded bg-uiBackground01 py-2 shadow-floatingShadow',
    {
      'top-7': size === 'x-small' || size === 'small',
      'top-9': size === 'medium',
      'top-11': size === 'large',
      'border-solid border border-uiBorder01': variant === 'outline',
    },
  );

  const deselectButtonClasses = clsx(
    'typography-label14regular flex h-8 w-full items-center px-3 text-interactive02 hover:bg-hover02 active:bg-active02',
    focusVisible.inset,
  );

  return (
    <ul className={listClasses}>
      <SelectItem isSortKey={sortOrder === 'ascend'} onClickItem={() => onClickItem('ascend')}>
        昇順で並び替え
      </SelectItem>
      <SelectItem isSortKey={sortOrder === 'descend'} onClickItem={() => onClickItem('descend')}>
        降順で並び替え
      </SelectItem>
      {sortOrder !== null && onClickDeselect && (
        <li>
          <button className={deselectButtonClasses} type="button" onClick={onClickDeselect}>
            選択解除
          </button>
        </li>
      )}
    </ul>
  );
}
