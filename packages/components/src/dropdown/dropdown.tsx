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
      size?: 'x-small' | 'small' | 'medium' | 'large';
      variant?: 'text' | 'outline';
      items: DropdownItemType[];
      isDisabled?: boolean;
      verticalPosition?: VerticalPosition;
      horizontalAlign?: HorizontalAlign;
    } & (
      | { children: ReactElement; label?: never; icon?: never }
      | {
          children?: undefined;
          label: string;
          icon?: IconName;
        }
    );

export function Dropdown({
  children,
  size = 'medium',
  variant = children ? 'text' : 'outline',
  items,
  isDisabled = false,
  verticalPosition = 'bottom',
  horizontalAlign = 'center',
  label,
  icon,
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

  const childrenWithProps = children && cloneElement(children, { size, isDisabled });

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
    children
      ? {
          'p-1': size === 'x-small' || size === 'small' || size === 'medium',
          'p-2': size === 'large',
        }
      : {
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
      <button type="button" className={buttonClasses} onClick={handleToggle} disabled={isDisabled}>
        {children ? (
          childrenWithProps
        ) : (
          <>
            {icon && (
              <span className="mr-1 flex">
                <Icon name={icon} size={size === 'large' ? 'medium' : 'small'} />
              </span>
            )}
            <span className={labelClasses}>{label}</span>
            <div className="ml-auto flex items-center">
              <Icon name={isVisible ? 'angle-small-up' : 'angle-small-down'} size="small" />
            </div>
          </>
        )}
      </button>
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
