import * as React from 'react';
import { forwardRef } from 'react';

import { composeRefs, isElement } from '../utils';
import { usePopoverContext } from './popover-context';

type PopoverTriggerProps = {
  children: React.ReactElement;
};

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(function PopoverTrigger({ children }, ref) {
  const { isOpen, floating, triggerRef, anchorRef, panelId } = usePopoverContext();

  if (!isElement(children)) {
    return null;
  }

  // anchorRefが提供されていない場合のみ、triggerRefをreferenceに設定
  const referenceRef = !anchorRef
    ? (floating.refs.setReference as unknown as React.Ref<HTMLElement>)
    : (null as unknown as undefined);

  const triggerOnlyRef: React.Ref<HTMLElement> = (node: HTMLElement | null) => {
    (triggerRef as React.RefObject<HTMLElement | null>).current = node;
    if (typeof ref === 'function') {
      ref(node as HTMLElement);
    } else if (ref != null) {
      (ref as React.RefObject<HTMLElement | null>).current = node;
    }
  };

  const setTriggerRefs: React.Ref<HTMLElement> = referenceRef
    ? composeRefs<HTMLElement>(referenceRef, triggerOnlyRef)
    : triggerOnlyRef;

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
