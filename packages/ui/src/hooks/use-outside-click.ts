import { RefObject, useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  enabled = true,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const element = ref?.current;
      if (!element || element.contains((event?.target as Node) || null)) {
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
