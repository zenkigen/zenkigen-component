import { ListOptionItem } from '../list/list-option-item';
import type { ComboboxItemProps } from './combobox.types';
import { useComboboxContext } from './combobox-context';

export function ComboboxItem({ value, label: _label, isDisabled = false, children }: ComboboxItemProps) {
  const { baseId, items, activeIndex, selectedValue, selectValue, setActiveIndex } =
    useComboboxContext('Combobox.Item');

  const index = items.findIndex((item) => item.value === value);
  const isActive = index !== -1 && activeIndex === index;
  const isSelected = selectedValue === value;
  const id = `${baseId}-option-${value}`;

  const handleClick = () => {
    if (isDisabled) {
      return;
    }
    selectValue(value, _label);
  };

  const handleMouseEnter = () => {
    if (isDisabled) {
      return;
    }
    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  // Combobox では選択済みの視覚強調（青背景）は出さない。
  // input に選択中ラベルが既に表示されているため、候補リストでは
  // active (キーボードフォーカス) のみハイライトする方が UX として自然。
  // ARIA 上は選択中である事実を伝えるため aria-selected のみ付与する。
  return (
    <ListOptionItem
      id={id}
      isActive={isActive}
      isDisabled={isDisabled}
      aria-selected={isSelected}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </ListOptionItem>
  );
}
