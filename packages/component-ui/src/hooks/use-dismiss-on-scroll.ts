import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

/**
 * トリガーを内側に含む領域がスクロールされたときに、floating UI を閉じるためのフック。
 *
 * `isEnabled` が `true` の間だけ `window` に `scroll` の listener を capture で登録し、
 * スクロールされた要素がトリガーを含んでいれば `dismiss` を呼び出す。
 * `scroll` イベントは bubble しないため、capture で受けて祖先・子孫すべてのスクロールを拾う。
 *
 * 閉じるスクロールと閉じないスクロール:
 * - 閉じる: ページ全体（`document` / `window`）、トリガーを内側に含むスクロール領域（Modal の本文など）
 * - 閉じない: トリガーを含まない領域（portal で描画したオプションリスト自身、無関係なスクロール領域など）、
 *   トリガーの内側にある要素
 *
 * 実装上の注意:
 * - `window` は `Node` ではないため `contains` で判定できないが、ページ全体を動かすので
 *   トリガーを含むものとして扱い、閉じる。`target` が `Node` で、かつトリガーを含まないときだけ無視する
 * - トリガー自身がスクロールする部品（入力欄など）に使う場合、入力欄の中のスクロールでも閉じてしまう。
 *   その場合は呼び出し側で、トリガー自身のスクロールを除外する処理が別に必要
 * - Shadow DOM の境界をまたぐ判定はしない（`contains` は shadow root の内側をたどらない）
 * - `dismissRef` で最新の `dismiss` を保持し、`dismiss` が毎レンダーで新しい関数として渡されても
 *   listener を貼り直さない
 *
 * @param triggerRef トリガー（を含む要素）への ref
 * @param dismiss 閉じる処理
 * @param isEnabled 開いている間だけ `true` を渡す
 */
export const useDismissOnScroll = (triggerRef: RefObject<Element | null>, dismiss: () => void, isEnabled: boolean) => {
  const dismissRef = useRef(dismiss);
  dismissRef.current = dismiss;

  useEffect(() => {
    // scroll は発生回数が多いため、閉じている間は listener を登録しない
    if (!isEnabled) {
      return;
    }

    const handleScroll = (event: Event) => {
      const trigger = triggerRef.current;
      if (trigger == null) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && target.contains(trigger) === false) {
        return;
      }

      dismissRef.current();
    };

    window.addEventListener('scroll', handleScroll, true);

    return () => window.removeEventListener('scroll', handleScroll, true);
    // dismissRef は ref 経由で最新値を参照するため依存に含めない
  }, [isEnabled, triggerRef]);
};
