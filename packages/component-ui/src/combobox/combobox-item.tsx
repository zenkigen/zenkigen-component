import { useEffect, useRef } from 'react';

import { ListOptionItem } from '../list/list-option-item';
import type { ComboboxItemProps } from './combobox.types';
import { useComboboxContext } from './combobox-context';

export function ComboboxItem({ value, label, isDisabled = false, children }: ComboboxItemProps) {
  const { baseId, items, activeIndex, selectedValue, selectValue, setActiveIndex, inputMode, setInputMode } =
    useComboboxContext('Combobox.Item');

  const index = items.findIndex((item) => item.value === value);
  const isActive = index !== -1 && activeIndex === index;
  const isSelected = selectedValue === value;
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
      {children ?? <span className="min-w-0 flex-1 truncate">{label}</span>}
    </ListOptionItem>
  );
}
