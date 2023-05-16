import { ReactElement, cloneElement, useCallback, useRef, useState } from 'react';

import { IconName } from '@zenkigen-component/icons';
import { buttonColors, focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { useOutsideClick } from '../hooks/useOutsideClick';
import { Icon } from '../icon';

import { DropdownMenu } from './dropdown-menu';
import { DropdownItemType, HorizontalAlign, VerticalPosition } from './type';

type Props =
  | {
      variant?: 'text' | 'outline';
      items: DropdownItemType[];
      isDisabled?: boolean;
      verticalPosition?: VerticalPosition;
      horizontalAlign?: HorizontalAlign;
    } & (
      | { children: ReactElement; label?: never; icon?: never; size?: never }
      | {
          children?: undefined;
          label: string;
          icon?: IconName;
          size: 'x-small' | 'small' | 'medium' | 'large';
        }
    );

export function Dropdown({
  variant = 'outline',
  items,
  isDisabled = false,
  verticalPosition = 'bottom',
  horizontalAlign = 'center',
  children,
  label,
  icon,
  size = 'medium',
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

  const handleClickItem = useCallback((onClickAction: () => void) => {
    setIsVisible(false);
    onClickAction();
  }, []);

  const childrenWithProps = children && cloneElement(children, { isDisabled });

  const wrapperClasses = clsx(
    'relative',
    'flex',
    'shrink-0',
    'gap-1',
    'items-center',
    'rounded',
    'bg-background-uiBackground01',
    !children && {
      'h-6': size === 'x-small' || size === 'small',
      'h-8': size === 'medium',
      'h-10': size === 'large',
    },
    isDisabled && 'cursor-not-allowed',
  );

  const childrenButtonClasses = clsx('flex', 'items-center', 'justify-center', {
    'cursor-not-allowed': isDisabled,
  });

  const buttonClasses = clsx(
    'flex',
    'items-center',
    'w-full',
    'h-full',
    'rounded',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    !children && {
      'px-2': size === 'x-small' || size === 'small',
      'px-4': size === 'medium' || size === 'large',
    },
    isDisabled && 'pointer-events-none',
  );

  const labelClasses = clsx(
    'flex',
    'items-center',
    size === 'x-small' ? 'mr-1' : 'mr-2',
    typography.label[
      size === 'x-small' ? 'label3regular' : size === 'small' || size === 'medium' ? 'label2regular' : 'label1regular'
    ],
  );

  return (
    <div ref={targetRef} className={wrapperClasses}>
      {children ? (
        <button type="button" className={childrenButtonClasses} onClick={handleToggle} disabled={isDisabled}>
          {childrenWithProps}
        </button>
      ) : (
        <button type="button" className={buttonClasses} onClick={handleToggle} disabled={isDisabled}>
          {icon && (
            <span className="mr-1 flex">
              <Icon name={icon} size={size === 'large' ? 'medium' : 'small'} />
            </span>
          )}
          <span className={labelClasses}>{label}</span>
          <div className="ml-auto flex items-center">
            <Icon name={isVisible ? 'angle-small-up' : 'angle-small-down'} size="small" />
          </div>
        </button>
      )}
      {!isDisabled && isVisible && (
        <DropdownMenu
          variant={variant}
          items={items}
          targetDimensions={targetDimensions}
          verticalPosition={verticalPosition}
          horizontalAlign={horizontalAlign}
          onClickItem={handleClickItem}
        />
      )}
    </div>
  );
}
