import * as React from 'react';
import { forwardRef } from 'react';

import { composeRefs, isElement } from '../utils';
import { usePopoverContext } from './popover-context';

type PopoverTriggerProps = {
  children: React.ReactElement;
};

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(function PopoverTrigger({ children }, ref) {
  const { isOpen, floating, triggerRef, panelId } = usePopoverContext();

  if (!isElement(children)) {
    return null;
  }

  const setTriggerRefs = composeRefs<HTMLElement>(
    floating.refs.setReference as unknown as React.Ref<HTMLElement>,
    (node: HTMLElement | null) => {
      (triggerRef as React.RefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node as HTMLElement);
      } else if (ref != null) {
        (ref as React.RefObject<HTMLElement | null>).current = node;
      }
    },
  );

  const childProps = children.props as Record<string, unknown>;
  const childRef = childProps.ref as React.Ref<HTMLElement> | undefined;

  return React.cloneElement(children, {
    ...childProps,
    ref: composeRefs(childRef, setTriggerRefs),
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': panelId,
  } as Partial<typeof childProps>);
});
