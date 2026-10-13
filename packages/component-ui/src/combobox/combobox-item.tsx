import { useEffect, useRef } from 'react';

import { ListOptionItem } from '../list/list-option-item';
import type { ComboboxItemProps } from './combobox.types';
import { useComboboxContext } from './combobox-context';
import { hasRenderableChildren } from './has-renderable-children';

export function ComboboxItem({ value, label, isDisabled = false, children }: ComboboxItemProps) {
  const { baseId, items, activeItemKey, selectedValues, selectValue, setActiveIndex, inputMode, setInputMode } =
    useComboboxContext('Combobox.Item');

  const index = items.findIndex((item) => item.kind === 'option' && item.value === value);
  // index ではなく項目の同一性で判定する。active より前に候補が挿入されて index がずれても isActive が瞬断せず、
  // 下の scrollIntoView が「active の項目そのものが変わったとき」だけ発火する。
  const isActive = activeItemKey !== null && activeItemKey.kind === 'option' && activeItemKey.value === value;
  const isSelected = selectedValues.includes(value);
  const id = `${baseId}-option-${value}`;

  const liRef = useRef<HTMLLIElement | null>(null);

  // active になったら keyboard mode の時だけ scrollIntoView。
  // mouse hover 中は既に可視位置にあるのでスキップ。
  useEffect(() => {
    if (!isActive) {
      return;
    }
    if (inputMode === 'mouse') {
      return;
    }
    liRef.current?.scrollIntoView({ block: 'nearest' });
  }, [isActive, inputMode]);

  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    selectValue(value, label);
  };

  const handleMouseEnter = () => {
    if (isDisabled) {
      return;
    }
    setInputMode('mouse');
    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  // `{isX && <Badge />}` が false の場合など、描画されるものが無い children は未指定とみなし、label を描画する（空の行にしない）
  const hasCustomContent = hasRenderableChildren(children);

  return (
    <ListOptionItem
      ref={liRef}
      id={id}
      isActive={isActive}
      isSelected={isSelected}
      isDisabled={isDisabled}
      aria-selected={isSelected}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {hasCustomContent ? (
        // 選択チェック（ml-auto）と共存させるため flex-1 で残り幅を取る
        <span className="flex min-w-0 flex-1 items-center">{children}</span>
      ) : (
        <span className="min-w-0 flex-1 truncate">{label}</span>
      )}
    </ListOptionItem>
  );
}
