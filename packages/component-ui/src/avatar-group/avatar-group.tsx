import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Children, forwardRef, isValidElement } from 'react';

import { AvatarGroupContext, useAvatarGroupContext } from './avatar-group-context';

type AvatarSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

const OVERLAP_CLASSES: Record<AvatarSize, string> = {
  'x-small': '-ml-1.5',
  small: '-ml-2',
  medium: '-ml-2.5',
  large: '-ml-3',
  'x-large': '-ml-4',
};

const BORDER_CLASSES: Record<AvatarSize, string> = {
  'x-small': 'border border-white',
  small: 'border border-white',
  medium: 'border-2 border-white',
  large: 'border-2 border-white',
  'x-large': 'border-[3px] border-white',
};

const COUNTER_SIZE_CLASSES: Record<AvatarSize, string> = {
  'x-small': 'h-6 w-6 typography-label11regular',
  small: 'h-8 w-8 typography-label11regular',
  medium: 'h-10 w-10 typography-label14regular',
  large: 'h-12 w-12 typography-label14regular',
  'x-large': 'h-16 w-16 typography-label16regular',
};

function isNonAvatarElement(child: ReactNode): boolean {
  if (!isValidElement(child)) {
    return false;
  }

  return child.type === Remain || child.type === Counter || child.type === Label;
}

function isLabelElement(child: ReactNode): boolean {
  return isValidElement(child) && child.type === Label;
}

type AvatarGroupProps = {
  children: ReactNode;
  size?: AvatarSize;
  max?: number;
};

function AvatarGroupRoot({ children, size = 'medium', max = 5 }: AvatarGroupProps) {
  const childArray = Children.toArray(children);
  const avatarChildren = childArray.filter((child) => !isNonAvatarElement(child));
  const counterChildren = childArray.filter((child) => isNonAvatarElement(child) && !isLabelElement(child));
  const labelChildren = childArray.filter((child) => isLabelElement(child));
  const total = avatarChildren.length;
  const isOverflow = total > max;
  const remain = isOverflow ? total - max : 0;
  const visibleAvatars = isOverflow ? avatarChildren.slice(0, max) : avatarChildren;

  const contextValue = {
    size,
    total,
    max,
    isOverflow,
    remain,
  };

  const trailingElements = [...(isOverflow ? counterChildren : []), ...labelChildren];

  return (
    <AvatarGroupContext.Provider value={contextValue}>
      <div role="group" className="flex items-center">
        {visibleAvatars.map((child, index) => (
          <div
            key={index}
            className={clsx('relative rounded-full', BORDER_CLASSES[size], index > 0 && OVERLAP_CLASSES[size])}
            style={{ zIndex: index + 1 }}
          >
            {child}
          </div>
        ))}
        {trailingElements.map((child, index) => (
          <div
            key={`trailing-${index}`}
            className={clsx('relative rounded-full', BORDER_CLASSES[size], OVERLAP_CLASSES[size])}
            style={{ zIndex: visibleAvatars.length + index + 1 }}
          >
            {child}
          </div>
        ))}
      </div>
    </AvatarGroupContext.Provider>
  );
}

const Remain = forwardRef<HTMLSpanElement>(function Remain(_props, ref) {
  const { size, remain, isOverflow } = useAvatarGroupContext();

  if (!isOverflow) {
    return null;
  }

  const classes = clsx(
    'flex items-center justify-center rounded-full bg-uiBackground02 text-text02',
    COUNTER_SIZE_CLASSES[size],
  );

  return (
    <span ref={ref} className={classes}>
      +{remain}
    </span>
  );
});

const Counter = forwardRef<HTMLSpanElement>(function Counter(_props, ref) {
  const { size, total, isOverflow } = useAvatarGroupContext();

  if (!isOverflow) {
    return null;
  }

  const classes = clsx(
    'flex items-center justify-center rounded-full bg-uiBackground02 text-text02',
    COUNTER_SIZE_CLASSES[size],
  );

  return (
    <span ref={ref} className={classes}>
      {total}
    </span>
  );
});

type LabelProps = {
  children: ReactNode;
};

const Label = forwardRef<HTMLSpanElement, LabelProps>(function Label({ children }, ref) {
  const { size } = useAvatarGroupContext();

  const classes = clsx(
    'flex items-center justify-center rounded-full bg-uiBackground02 text-text02',
    COUNTER_SIZE_CLASSES[size],
  );

  return (
    <span ref={ref} className={classes}>
      {children}
    </span>
  );
});

export const AvatarGroup = Object.assign(AvatarGroupRoot, {
  Remain,
  Counter,
  Label,
});
