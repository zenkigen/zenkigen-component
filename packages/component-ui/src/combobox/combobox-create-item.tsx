import { useEffect, useLayoutEffect, useRef } from 'react';

import { Icon } from '../icon';
import { ListOptionItem } from '../list/list-option-item';
import type { ComboboxCreateItemProps } from './combobox.types';
import { useComboboxContext, useComboboxCreateItemContext } from './combobox-context';

/**
 * 「「{入力文字}」を作成」行。表示するかどうか（空・IME 変換中・Loading 描画中・重複）はライブラリが判定し、
 * 条件を満たさないときは区切り線も含めて何も描画しない。利用側は List に置いて onCreate を渡すだけでよい。
 */
export function ComboboxCreateItem({ onCreate }: ComboboxCreateItemProps) {
  const { baseId, items, activeIndex, setActiveIndex, inputMode, setInputMode, selectCreate, registerCreateOnCreate } =
    useComboboxContext('Combobox.CreateItem');
  // List の直接の子として認識された最初の 1 件だけが値を受け取る。それ以外（Fragment / ラッパーで包んだもの・
  // 2 件目以降）は null で、何も描画せず onCreate も登録しない。
  const createItemContext = useComboboxCreateItemContext();
  const isEnabled = createItemContext !== null;
  const createText = createItemContext?.createText ?? null;

  // onCreate は context の ref に登録する（items state に入れると setItems の浅い比較が毎レンダー崩れるため）。
  // 非表示の間も登録したままにし、表示条件の判定は selectCreate 側で行う。
  useLayoutEffect(() => {
    if (!isEnabled) {
      return;
    }

    return registerCreateOnCreate(onCreate);
  }, [isEnabled, onCreate, registerCreateOnCreate]);

  const index = items.findIndex((item) => item.kind === 'create');
  const isActive = index !== -1 && activeIndex === index;

  const liRef = useRef<HTMLLIElement | null>(null);

  // active になったら keyboard mode の時だけ scrollIntoView（Combobox.Item と同じ）
  useEffect(() => {
    if (!isActive || inputMode === 'mouse') {
      return;
    }
    liRef.current?.scrollIntoView({ block: 'nearest' });
  }, [isActive, inputMode]);

  const handleMouseEnter = () => {
    setInputMode('mouse');
    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  if (createText === null) {
    return null;
  }

  return (
    <>
      <li role="presentation" aria-hidden="true" className="my-2 h-px shrink-0 bg-uiBorder01" />
      <ListOptionItem
        ref={liRef}
        id={`${baseId}-create-option`}
        isActive={isActive}
        onClick={selectCreate}
        onMouseEnter={handleMouseEnter}
      >
        {/* アイコンの svg は aria-label を持つため、option の accessible name に混ざらないよう隠す */}
        <span className="flex shrink-0" aria-hidden="true">
          <Icon name="plus" size="small" color="interactive01" />
        </span>
        <span className="min-w-0 flex-1 truncate text-interactive01">「{createText}」を作成</span>
      </ListOptionItem>
    </>
  );
}
