import { useEffect, useRef } from 'react';

export const MODAL_OPEN_EVENT = 'zenkigen-modal-open';

/**
 * Modal が開かれた瞬間に外側の floating UI を閉じるためのフック。
 *
 * Modal 側で `MODAL_OPEN_EVENT` が `window` に dispatch されたタイミングで、
 * 引数の `dismiss` を呼び出す。
 *
 * 実装上の注意:
 * - `dismissRef` で最新の `dismiss` を保持し、`useEffect` の依存配列は意図的に空にする
 *   ことで、listener をマウント時に1回だけ登録する形にしている
 * - `dismiss` が毎レンダーで新しい関数として渡されても、listener を貼り直さない
 */
export const useDismissOnModalOpen = (dismiss: () => void) => {
  const dismissRef = useRef(dismiss);
  dismissRef.current = dismiss;

  useEffect(() => {
    const handler = () => {
      dismissRef.current();
    };
    window.addEventListener(MODAL_OPEN_EVENT, handler);

    return () => window.removeEventListener(MODAL_OPEN_EVENT, handler);
    // dismissRef は ref 経由で最新値を参照するため依存に含めない（意図的に空配列）
  }, []);
};
