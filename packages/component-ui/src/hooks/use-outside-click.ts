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
      if (element == null) {
        return;
      }

      const target = event.target as Node | null;
      // ref要素内のクリックは外部クリックと判定しない
      if (target != null && Boolean(element.contains(target))) {
        return;
      }

      // Reactの再レンダリングで target がDOMから切り離されているケースに備え、
      // composedPath にイベント発火時点の祖先要素が残っているため、それを使って内側判定する。
      // これにより自身のトグル ボタン押下で icon の svg が再生成されるケースを内側として扱いつつ、
      // 他のフローティング要素のトグルを押した場合は外部クリックとして判定できる。
      const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
      const isInsideViaPath = path.some((node) => node instanceof Node && Boolean(element.contains(node)));
      if (isInsideViaPath) {
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
