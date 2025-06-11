import type { IconName } from '@zenkigen-inc/component-icons';
import { focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import { Icon } from '../icon';

export type SegmentedControlItemProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> & {
  label?: string;
  value: string;
  icon?: IconName;
  isSelected?: boolean;
  isDisabled?: boolean;
  isHovered?: boolean;
  size?: 'small' | 'medium';
  variant?: 'default' | 'iconOnly';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (value: string) => void;
};

export const SegmentedControlItem = ({
  label,
  value,
  icon,
  isSelected = false,
  isDisabled = false,
  isHovered = false,
  size = 'medium',
  variant = 'default',
  onMouseEnter,
  onMouseLeave,
  onClick,
  className,
  ...props
}: SegmentedControlItemProps) => {
  const buttonClasses = clsx(
    'relative flex items-center justify-center rounded transition-all duration-200',
    focusVisible.normal,
    {
      // Size variants - Figmaのspacing仕様に合わせて調整
      'px-4 py-2 min-h-[32px] text-sm': size === 'small', // spacing/4 = 16px (px-4), text-sm = 14px
      'px-4 py-2 min-h-[36px] text-sm': size === 'medium', // spacing/4 = 16px (px-4), text-sm = 14px

      // Icon only spacing - Figmaのspacing仕様に合わせて調整
      'px-2 w-8': variant === 'iconOnly' && size === 'small', // spacing/2 = 8px (px-2), width 32px
      'px-2 w-9': variant === 'iconOnly' && size === 'medium', // spacing/2 = 8px (px-2), width 36px

      // States - Selected (Figmaの"Select"状態)
      'bg-uiBackground01 text-interactive01': isSelected && !isDisabled,

      // States - Hover (Figmaの"Hover"状態)
      'bg-hover02': isHovered && !isSelected && !isDisabled,

      // States - Default (Figmaの"Default"状態)
      'bg-transparent text-text01': !isSelected && !isHovered && !isDisabled,

      // States - Disabled (Figmaの"Disabled"状態)
      'text-disabled01 cursor-not-allowed bg-transparent': isDisabled,
      'cursor-pointer': !isDisabled,

      // Font weight - Figma specification uses Regular (400)
      'font-normal': true,
    },
    className,
  );

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick(value);
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      disabled={isDisabled}
      className={buttonClasses}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {Boolean(icon) && icon && (
        <span
          className={clsx('flex items-center', {
            'mr-1.5': variant === 'default' && Boolean(label),
            'fill-disabled01': isDisabled,
            'fill-interactive01': isSelected && !isDisabled,
            'fill-icon01': !isSelected && !isDisabled,
          })}
        >
          <Icon name={icon} size={size === 'small' ? 'small' : 'medium'} />
        </span>
      )}
      {variant === 'default' && Boolean(label) && <span>{label}</span>}
    </button>
  );
};
