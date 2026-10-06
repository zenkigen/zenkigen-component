import type { MouseEvent, RefObject } from 'react';
import { useCallback, useLayoutEffect, useRef } from 'react';

import { InternalTag } from '../tag/tag';
import type { ComboboxChipProps } from './combobox.types';
import { useComboboxContext } from './combobox-context';

type UseComboboxChipParams = {
  value: string;
  label: string;
  isRemovable: boolean;
  /** チップのルート要素。キーボード操作（✗ にフォーカスがある）での削除かを判定する */
  rootRef: RefObject<HTMLElement | null>;
};

/**
 * Combobox.Chip の登録・削除・フォーカス制御。
 * Avatar 付きの人用チップなど、見た目の異なるチップを後から足すときに共有できるよう分けている。
 */
function useComboboxChip({ value, label, isRemovable, rootRef }: UseComboboxChipParams) {
  const { isMultiple, inputRef, removeSelected, registerChipLabel, registerFixedValue } =
    useComboboxContext('Combobox.Chip');

  // aria-live の削除通知で使う label を登録する。子の layout effect は親の passive effect より先に走るため、
  // 同じコミットで追加・label 変更されたチップの label も通知に間に合う。
  useLayoutEffect(() => {
    if (isMultiple) {
      registerChipLabel(value, label);
    }
  }, [isMultiple, value, label, registerChipLabel]);

  // 外せないチップの値を登録し、unmount / isRemovable の変化で即解除する（未描画の値を外せないまま残さない）。
  useLayoutEffect(() => {
    if (!isMultiple || isRemovable) {
      return;
    }

    return registerFixedValue(value);
  }, [isMultiple, isRemovable, value, registerFixedValue]);

  const handleDelete = useCallback(() => {
    // キーボードで ✗ を押した場合は、削除でチップがアンマウントされる前に input へフォーカスを戻す（body に落とさない）。
    // マウスの場合は mousedown を抑止しているため、フォーカスは元の位置（input または未フォーカス）のまま。
    if (rootRef.current?.contains(document.activeElement) === true) {
      inputRef.current?.focus();
    }
    removeSelected(value);
  }, [rootRef, inputRef, removeSelected, value]);

  return { isMultiple, handleDelete };
}

export function ComboboxChip({ value, label, isRemovable = true }: ComboboxChipProps) {
  const { isDisabled } = useComboboxContext('Combobox.Chip');
  const rootRef = useRef<HTMLDivElement>(null);
  const { isMultiple, handleDelete } = useComboboxChip({ value, label, isRemovable, rootRef });

  const preventBlur = useCallback((event: MouseEvent<HTMLDivElement>) => {
    // ✗ のクリックで input のフォーカスを失わないため preventDefault
    event.preventDefault();
  }, []);

  // 単一選択モードでは描画しない
  if (!isMultiple) {
    return null;
  }

  return (
    // Tag は div のため、包む要素も div にする（span の中に div を置くと HTML の入れ子として不正）
    <div ref={rootRef} onMouseDown={preventBlur}>
      <InternalTag
        id={value}
        isEditable
        onDelete={handleDelete}
        color="gray"
        isDisabled={isDisabled}
        isDeletable={isRemovable}
      >
        {label}
      </InternalTag>
    </div>
  );
}
