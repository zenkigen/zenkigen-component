import type { IconName } from '@zenkigen-inc/component-icons';
import { focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import React, { useContext, useEffect, useRef } from 'react';

import { Icon } from '../icon';
import { SegmentedControlContext } from './segmented-control-context';

type BaseProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'className'> & {
  value: string;
  isDisabled?: boolean;
};

export type SegmentedControlItemProps = BaseProps &
  (
    | {
        icon: IconName;
        label?: never;
        'aria-label': string;
      }
    | {
        icon: IconName;
        label: string;
        'aria-label'?: string;
      }
    | {
        icon?: never;
        label: string;
        'aria-label'?: string;
      }
    | {
        icon?: never;
        label?: never;
        'aria-label'?: string;
      }
  );

export const SegmentedControlItem = ({
  label,
  value,
  icon,
  isDisabled: itemDisabled,
  'aria-label': ariaLabel,
  ...rest
}: SegmentedControlItemProps) => {
  const context = useContext(SegmentedControlContext);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastInteractionWasMouse = useRef(false);

  if (context === null) {
    throw new Error('SegmentedControl.Item must be used within SegmentedControl');
  }

  const {
    value: selectedValue,
    onChange,
    size,
    isDisabled: isContextDisabled,
    focusedValue,
    onFocusChange,
    onBlur,
  } = context;

  const isSelected = value === selectedValue;
  const isFocused = value === focusedValue;
  const isOptionDisabled = isContextDisabled || itemDisabled === true;

  // フォーカス管理
  useEffect(() => {
    if (isFocused === true && buttonRef.current !== null) {
      buttonRef.current.focus();
    }
  }, [isFocused]);

  const handleClick = () => {
    if (!isOptionDisabled) {
      onChange?.(value);
    }
  };

  const handleFocus = () => {
    // 直前の操作がマウスでなければ（=キーボード操作）、onFocusChangeを呼ぶ
    if (!lastInteractionWasMouse.current && !isOptionDisabled) {
      onFocusChange?.(value);
    }
  };

  const handleMouseDown = () => {
    lastInteractionWasMouse.current = true;
  };

  const handleBlur = () => {
    lastInteractionWasMouse.current = false;
    onBlur?.();
  };

  const buttonClasses = clsx('relative flex items-center justify-center gap-1 rounded', focusVisible.normal, {
    'px-2 py-1 min-h-[32px] typography-label12regular': size === 'small',
    'px-4 py-2 min-h-[36px] typography-label14regular': size === 'medium',
    // States - Default with hover
    'bg-transparent text-text01 hover:bg-hover02': isSelected === false && isOptionDisabled === false,
    // States - Selected
    'bg-uiBackground01 text-interactive01': isSelected === true && isOptionDisabled === false,
    // States - Disabled
    'text-disabled01 bg-transparent': isOptionDisabled === true,
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-label={ariaLabel}
      disabled={isOptionDisabled}
      tabIndex={isFocused === true || (isSelected === true && focusedValue === null) ? 0 : -1}
      className={buttonClasses}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      {...rest}
    >
      {Boolean(icon) === true && icon && (
        <span
          className={clsx('flex items-center', {
            'fill-disabled01': isOptionDisabled === true,
            'fill-interactive01': isSelected === true && isOptionDisabled === false,
            'fill-icon01': isSelected === false && isOptionDisabled === false,
          })}
        >
          <Icon name={icon} size="small" />
        </span>
      )}
      {Boolean(label) === true && <span className="whitespace-nowrap">{label}</span>}
    </button>
  );
};
