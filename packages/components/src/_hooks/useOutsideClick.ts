import { RefObject, useEffect } from 'react';

/**
 * ある要素の領域外をクリックしたイベントを検知する。
 *
 * @param ref - 領域（起点）となる要素。
 * @param callback - 領域外をクリックした時に発火するコールバック関数
 * @param enabled - 有効化フラグ
 */
export const useOutsideClick = (ref: RefObject<HTMLElement>, callback: (e: MouseEvent) => void, enabled = true) => {
  useEffect(() => {
    const args = [
      'click',
      (e: MouseEvent) => {
        if (ref.current !== null && !ref.current.contains(e.target as HTMLElement)) {
          callback(e);
        }
      },
      true,
    ] as const;

    if (enabled) {
      globalThis.removeEventListener(...args);
      window.requestAnimationFrame(() => window.addEventListener(...args));
    }

    return () => window.removeEventListener(...args);
  }, [ref, callback, enabled]);
};
