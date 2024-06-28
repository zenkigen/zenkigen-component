import { tagColors, tagLightColors } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';

import { DeleteIcon } from './delete-icon';
import type { ColorVariant, TagColor } from './type';

type Props = {
  id: string;
  children: string;
  color: TagColor;
  variant?: ColorVariant;
  size?: 'x-small' | 'small' | 'medium';
} & ({ isEditable: true; onDelete: (id: string) => void } | { isEditable?: undefined; onDelete?: never });

export function Tag({ id, children, color, variant = 'normal', size = 'medium', isEditable, onDelete }: Props) {
  const wrapperClasses = clsx('flex', 'items-center', 'justify-center', {
    [tagColors[color]]: variant === 'normal',
    [tagLightColors[color]]: variant === 'light',
    'h-[14px] typography-label11regular': !isEditable && size === 'x-small',
    'h-4 typography-label12regular': !isEditable && size === 'small',
    'h-[18px] typography-label14regular': !isEditable && size === 'medium',
    'h-[22px] typography-label14regular': isEditable && size === 'medium',
    'rounded-full': isEditable,
    rounded: !isEditable,
    'py-0.5 px-1': !isEditable,
    'py-1 px-2': isEditable,
  });

  return (
    <div className={wrapperClasses}>
      {children}
      {isEditable ? <DeleteIcon onClick={() => onDelete(id)} color={color} variant={variant} /> : null}
    </div>
  );
}
