import { FloatingPortal } from '@floating-ui/react';
import type { ReactNode } from 'react';
import { Children, isValidElement, useEffect, useMemo } from 'react';

import { List } from '../list/list';
import type { ComboboxItemProps, ComboboxListProps } from './combobox.types';
import type { ComboboxItemMeta } from './combobox-context';
import { useComboboxContext } from './combobox-context';
import { ComboboxItem } from './combobox-item';
import { ComboboxEmpty, ComboboxLoading } from './combobox-status';

function extractItems(children: ReactNode): ComboboxItemMeta[] {
  const result: ComboboxItemMeta[] = [];
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.type === ComboboxItem) {
      const props = child.props as ComboboxItemProps;
      result.push({
        value: props.value,
        label: props.label,
        isDisabled: props.isDisabled ?? false,
      });
    }
  });

  return result;
}

function hasOpenableContent(children: ReactNode): boolean {
  let isFound = false;
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.type === ComboboxItem || child.type === ComboboxLoading || child.type === ComboboxEmpty) {
      isFound = true;
    }
  });

  return isFound;
}

export function ComboboxList({ children, maxHeight: maxHeightProp }: ComboboxListProps) {
  const { listId, isOpen, setItems, setListRef, floatingStyles, listMaxHeight, variant } =
    useComboboxContext('Combobox.List');

  const items = useMemo(() => extractItems(children), [children]);
  const hasContent = useMemo(() => hasOpenableContent(children), [children]);

  // items を Combobox 本体に通知
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  // popup を常時 DOM に残し visibility で制御する。
  // null で unmount すると Floating UI の autoUpdate が再起動する瞬間に
  // floatingStyles の初期値 (top:0, left:0) で 1 フレーム描画されてしまう。
  const isVisible = isOpen && hasContent;

  // Floating UI の floating element (= setFloating で参照される DOM) と
  // floatingStyles の適用先は同じ要素である必要がある。
  // ここでは ul (List) 自身を floating element とし、floatingStyles を
  // List に直接渡す。
  // List 自体が position: absolute (floatingStyles) なので、z-index も List に直接当てる。
  // 中間 div を挟むと position: static になり z-index が効かないか、relative にすると
  // Floating UI の絶対座標計算とズレる。
  return (
    <FloatingPortal>
      <List
        ref={setListRef}
        id={listId}
        variant={variant === 'outline' ? 'outline' : 'borderless'}
        maxHeight={maxHeightProp ?? listMaxHeight}
        aria-label="候補一覧"
        className="z-popover"
        style={{
          ...floatingStyles,
          visibility: isVisible ? 'visible' : 'hidden',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        {children}
      </List>
    </FloatingPortal>
  );
}
