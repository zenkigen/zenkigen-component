import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';

import type { AvatarSize } from './avatar-group-context';
import { AvatarGroupContext } from './avatar-group-context';

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

export type RenderSurplusContext = {
  remain: number;
  total: number;
  defaultBadge: ReactNode;
};

type AvatarGroupProps = {
  children: ReactNode;
  size?: AvatarSize;
  max?: number;
  total?: number;
  renderSurplus?: (ctx: RenderSurplusContext) => ReactNode;
  'aria-label'?: string;
};

function DefaultSurplus({ remain, size }: { remain: number; size: AvatarSize }) {
  return (
    <span
      className={clsx(
        'flex items-center justify-center rounded-full bg-uiBackground02 text-text02',
        COUNTER_SIZE_CLASSES[size],
      )}
      aria-label={`残り${remain}人`}
    >
      +{remain}
    </span>
  );
}

export function AvatarGroup({
  children,
  size = 'medium',
  max: maxProp = 5,
  total,
  renderSurplus,
  'aria-label': ariaLabel,
}: AvatarGroupProps) {
  const max = Math.max(1, maxProp);
  const avatarNodes = Children.toArray(children).filter(isValidElement);
  const childrenCount = avatarNodes.length;
  const displayedTotal = total ?? childrenCount;
  const remain = Math.max(displayedTotal - max, 0);
  const visibleAvatars = avatarNodes.slice(0, max);

  const defaultBadge = remain > 0 ? <DefaultSurplus remain={remain} size={size} /> : null;
  const surplusNode =
    remain > 0
      ? typeof renderSurplus === 'function'
        ? renderSurplus({ remain, total: displayedTotal, defaultBadge })
        : defaultBadge
      : null;

  return (
    <AvatarGroupContext.Provider value={{ size }}>
      <div role="group" aria-label={ariaLabel} className="flex items-center">
        {visibleAvatars.map((child, index) => (
          <div
            key={index}
            className={clsx('relative rounded-full', BORDER_CLASSES[size], index > 0 && OVERLAP_CLASSES[size])}
            style={{ zIndex: index + 1 }}
          >
            {child}
          </div>
        ))}
        {surplusNode != null && (
          <div
            className={clsx('relative rounded-full', BORDER_CLASSES[size], OVERLAP_CLASSES[size])}
            style={{ zIndex: visibleAvatars.length + 1 }}
          >
            {surplusNode}
          </div>
        )}
      </div>
    </AvatarGroupContext.Provider>
  );
}
