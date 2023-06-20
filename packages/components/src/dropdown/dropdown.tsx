import { ReactElement, ReactNode, cloneElement, useCallback, useRef, useState } from 'react';

import { IconName } from '@zenkigen-component/icons';
import { buttonColors, focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';

import { DropdownContext } from './dropdown-context';
import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';

type Props =
  | {
      size?: 'x-small' | 'small' | 'medium' | 'large';
      variant?: 'text' | 'outline';
      isDisabled?: boolean;
      isArrowHidden?: boolean;
      children: ReactNode;
    } & (
      | { target: ReactElement; label?: never; icon?: never }
      | {
          target?: undefined;
          label: string;
          icon?: IconName;
        }
    );

export function Dropdown({
  children,
  target,
  label,
  icon,
  size = 'medium',
  variant = target ? 'text' : 'outline',
  isDisabled = false,
  isArrowHidden = false,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [targetDimensions, setTargetDimensions] = useState({
    width: 0,
    height: 0,
  });

  const targetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(targetRef, () => setIsVisible(false));

  const handleToggle = useCallback(() => {
    if (targetRef.current === null) {
      return;
    }

    if (isVisible) {
      setIsVisible(false);
    } else {
      const dimensions = targetRef.current.getBoundingClientRect();
      const calculatedDimensions = {
        width: dimensions.right - dimensions.left,
        height: dimensions.bottom - dimensions.top,
      };

      setTargetDimensions(calculatedDimensions);
      setIsVisible(true);
    }
  }, [isVisible]);

  const wrapperClasses = clsx(
    'relative',
    'flex shrink-0 items-center gap-1',
    'rounded',
    'bg-background-uiBackground01',
    isDisabled && 'cursor-not-allowed',
  );

  const childrenButtonClasses = clsx(
    'flex items-center justify-center',
    'rounded',
    'hover:bg-hover-hover02',
    'active:bg-active-active02',
    focusVisible.normal,
    isDisabled && 'pointer-events-none',
    {
      'h-6 w-6': size === 'x-small',
      'h-8 w-8': size === 'small',
      'h-10 w-10': size === 'medium',
      'h-12 w-12': size === 'large',
      'border border-border-uiBorder02': variant === 'outline',
    },
  );

  const buttonClasses = clsx(
    'flex items-center',
    'rounded',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    isDisabled && 'pointer-events-none',
    {
      'h-6 px-2': size === 'x-small' || size === 'small',
      'h-8 px-4': size === 'medium',
      'h-10 px-4': size === 'large',
    },
  );

  const labelClasses = clsx(
    'flex',
    'items-center',
    !isArrowHidden ? (size === 'x-small' ? 'mr-1' : 'mr-2') : null,
    typography.label[
      size === 'x-small' ? 'label3regular' : size === 'small' || size === 'medium' ? 'label2regular' : 'label1regular'
    ],
  );

  const targetWithProps = target && cloneElement(target, { isDisabled });

  return (
    <DropdownContext.Provider value={{ isVisible, setIsVisible, isDisabled, targetDimensions, variant }}>
      <div ref={targetRef} className={wrapperClasses}>
        {target ? (
          <button type="button" className={childrenButtonClasses} onClick={handleToggle} disabled={isDisabled}>
            {targetWithProps}
          </button>
        ) : (
          <button type="button" className={buttonClasses} onClick={handleToggle} disabled={isDisabled}>
            {icon && (
              <span className="mr-1 flex">
                <Icon name={icon} size={size === 'large' ? 'medium' : 'small'} />
              </span>
            )}
            <span className={labelClasses}>{label}</span>
            {!isArrowHidden && (
              <div className="ml-auto flex items-center">
                <Icon name={isVisible ? 'angle-small-up' : 'angle-small-down'} size="small" />
              </div>
            )}
          </button>
        )}
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
