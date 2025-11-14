import type { ForwardedRef, MutableRefObject } from 'react';

type PossibleRef<T> = ForwardedRef<T> | MutableRefObject<T | null> | null | undefined;

export const assignRef = <T>(ref: PossibleRef<T>, value: T | null) => {
  if (typeof ref === 'function') {
    ref(value);

    return;
  }

  if (ref != null) {
    (ref as MutableRefObject<T | null>).current = value;
  }
};
