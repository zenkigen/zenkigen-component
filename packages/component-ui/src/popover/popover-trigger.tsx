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

  // トリガー要素のrefを処理するコールバック
  // anchorRefがない場合は、Floating UIの参照も同時に設定
  const handleTriggerRef = (node: HTMLElement | null) => {
    // triggerRefを常に更新
    (triggerRef as React.RefObject<HTMLElement | null>).current = node;

    // anchorRefがない場合のみ、Floating UIの参照も更新
    if (anchorRef == null) {
      floating.refs.setReference(node);
    }

    // 外部から渡されたrefも処理
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref != null) {
      (ref as React.RefObject<HTMLElement | null>).current = node;
    }
  };

  const childProps = children.props as Record<string, unknown>;
  const childRef = childProps.ref as React.Ref<HTMLElement> | undefined;

  return React.cloneElement(children, {
    ...childProps,
    ref: composeRefs(childRef, handleTriggerRef),
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': panelId,
  } as Partial<typeof childProps>);
});
