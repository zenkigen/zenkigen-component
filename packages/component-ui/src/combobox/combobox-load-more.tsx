import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import type { ComboboxLoadMoreProps } from './combobox.types';
import { useComboboxContext, useComboboxListContext } from './combobox-context';
import { DEFAULT_LOADING_MESSAGE, hasCustomContent, StatusItem } from './combobox-status';

/**
 * 候補の追加読み込み。置かれているあいだ ↑↓ は端でループせず、末尾の項目でさらに ↓ を押すと onLoadMore を呼ぶ。
 * リストが下端付近（残りが 1 画面分以下）までスクロールされたときにも onLoadMore を呼ぶ。
 * 取得・件数・終端の判定は利用側が持ち、これ以上の候補が無くなったらこの部品を描画しない。
 * isLoading のあいだだけ読み込み中の行を描画する（候補ではないので、単独では popup を開く材料にならない）。
 */
export function ComboboxLoadMore({ onLoadMore, isLoading = false, children }: ComboboxLoadMoreProps) {
  const { registerLoadMore, items, isOpen } = useComboboxContext('Combobox.LoadMore');
  const { scrollRef } = useComboboxListContext('Combobox.LoadMore');

  // 最新の onLoadMore / isLoading は ref で持ち、登録する関数の identity を安定させる
  // （毎レンダー登録し直すと、解除のたびに Combobox 本体が持つ ↓ による移動の予約が消える）。
  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  // スクロールからの要求は「武装」しているときだけ通す（同じ位置での多重発火を防ぐ）。
  // 武装は、候補の中身が変わった・リストが開いた・下端付近からいったん離れた、のいずれかで入れ直す。
  const isArmedRef = useRef(false);

  // キーボード（末尾の項目でさらに ↓）からの要求。取得中は呼ばない。
  // 呼ぶ前にスクロール用の武装も解く（残すと、この取得が失敗して isLoading が戻っただけで再び呼んでしまう）。
  const requestLoadMore = useCallback(() => {
    if (isLoadingRef.current) {
      return;
    }
    isArmedRef.current = false;
    onLoadMoreRef.current();
  }, []);

  useLayoutEffect(() => {
    registerLoadMore(requestLoadMore);

    return () => {
      registerLoadMore(null);
    };
  }, [registerLoadMore, requestLoadMore]);

  // 下端付近 = 残りが 1 画面分以下。高さが取れないとき（非表示など）は下端付近とみなさない。
  const isNearEnd = useCallback(() => {
    const list = scrollRef.current;
    if (list == null || list.clientHeight === 0) {
      return false;
    }

    return list.scrollHeight - list.scrollTop - list.clientHeight <= list.clientHeight;
  }, [scrollRef]);

  const check = useCallback(() => {
    if (!isArmedRef.current || isLoadingRef.current || !isOpenRef.current || !isNearEnd()) {
      return;
    }
    // onLoadMore の中で同期的に再判定が走っても二重に呼ばないよう、呼ぶ前に武装を解く
    isArmedRef.current = false;
    onLoadMoreRef.current();
  }, [isNearEnd]);

  useEffect(() => {
    const list = scrollRef.current;
    if (list == null) {
      return;
    }
    const handleScroll = () => {
      if (isNearEnd()) {
        check();
      } else {
        isArmedRef.current = true;
      }
    };
    list.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      list.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, isNearEnd, check]);

  // 候補の中身（候補行の value の並び）。items は中身が同じでも作り直されることがあり、作成行は入力のたびに変わるため、
  // 「候補が変わった」は参照ではなくこの署名の変化で判定する。
  const optionsSignature = useMemo(
    () => JSON.stringify(items.flatMap((item) => (item.kind === 'option' ? [item.value] : []))),
    [items],
  );

  // 候補の変化・開閉・isLoading の変化をまとめて 1 回で判定する（別々の effect にすると、mount 時にそれぞれが
  // 武装して判定し、onLoadMore を重ねて呼ぶ）。mount 時は「開いた」と同じ扱い。
  // isLoading が戻っただけでは武装しない（候補が増えなかった＝取得失敗のときに呼び続けない）。
  const prevRef = useRef<{ optionsSignature: string; isOpen: boolean } | null>(null);
  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = { optionsSignature, isOpen };
    if (prev === null || prev.optionsSignature !== optionsSignature || (!prev.isOpen && isOpen)) {
      isArmedRef.current = true;
    }
    check();
  }, [optionsSignature, isOpen, isLoading, check]);

  if (!isLoading) {
    return null;
  }

  return (
    <StatusItem componentName="Combobox.LoadMore">
      {hasCustomContent(children) ? children : DEFAULT_LOADING_MESSAGE}
    </StatusItem>
  );
}
