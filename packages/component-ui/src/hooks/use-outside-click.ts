import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void,
  enabled = true,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const element = ref?.current;
      const target = event.target as Node | null;
      // Reactの再レンダリングで要素が置換されDOMから切り離された場合は外部クリックと判定しない
      if (target instanceof Node && target.isConnected === false) {
        return;
      }
      // ref要素内のクリック、またはrefが未設定の場合は外部クリックと判定しない
      if (element == null || Boolean(element.contains(target ?? null))) {
        return;
      }
      handler(event);
    };

    if (enabled) {
      document.addEventListener('click', listener);
    }

    return () => document.removeEventListener('click', listener);
  }, [ref, enabled, handler]);
};
