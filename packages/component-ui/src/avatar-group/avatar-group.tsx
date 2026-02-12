import { clsx } from 'clsx';
import type { ReactElement, ReactNode } from 'react';
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

const DISPLAY_NAMES = {
  remain: 'AvatarGroup.Remain',
  counter: 'AvatarGroup.Counter',
  label: 'AvatarGroup.Label',
} as const;

type ComponentType = (typeof DISPLAY_NAMES)[keyof typeof DISPLAY_NAMES];

function getDisplayName(element: ReactElement): string | null {
  const type = element.type;
  if (typeof type === 'function' || typeof type === 'object') {
    return (type as { displayName?: string }).displayName ?? null;
  }

  return null;
}

function findComponentType(child: ReactNode): ComponentType | null {
  if (!isValidElement(child)) {
    return null;
  }

  const displayName = getDisplayName(child);
  if (displayName !== null && Object.values(DISPLAY_NAMES).includes(displayName as ComponentType)) {
    return displayName as ComponentType;
  }

  const childProps = child.props as { children?: ReactNode };
  if (childProps.children != null) {
    const nestedChildren = Children.toArray(childProps.children);
    for (const nestedChild of nestedChildren) {
      const found = findComponentType(nestedChild);
      if (found !== null) {
        return found;
      }
    }
  }

  return null;
}

function classifyChildren(children: ReactNode) {
  const childArray = Children.toArray(children);
  const avatarChildren: ReactNode[] = [];
  const remainChildren: ReactNode[] = [];
  const counterChildren: ReactNode[] = [];
  const labelChildren: ReactNode[] = [];

  for (const child of childArray) {
    const componentType = findComponentType(child);
    switch (componentType) {
      case DISPLAY_NAMES.remain:
        remainChildren.push(child);
        break;
      case DISPLAY_NAMES.counter:
        counterChildren.push(child);
        break;
      case DISPLAY_NAMES.label:
        labelChildren.push(child);
        break;
      default:
        avatarChildren.push(child);
    }
  }

  return { avatarChildren, remainChildren, counterChildren, labelChildren };
}

type AvatarGroupProps = {
  children: ReactNode;
  size?: AvatarSize;
  max?: number;
};

function AvatarGroupRoot({ children, size = 'medium', max = 5 }: AvatarGroupProps) {
  const { avatarChildren, remainChildren, counterChildren, labelChildren } = classifyChildren(children);
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

  const trailingElements = [...(isOverflow ? [...remainChildren, ...counterChildren] : []), ...labelChildren];

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
Remain.displayName = DISPLAY_NAMES.remain;

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
Counter.displayName = DISPLAY_NAMES.counter;

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
Label.displayName = DISPLAY_NAMES.label;

export const AvatarGroup = Object.assign(AvatarGroupRoot, {
  Remain,
  Counter,
  Label,
});
