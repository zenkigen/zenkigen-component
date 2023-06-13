import { CSSProperties, ReactElement, cloneElement, useCallback, useRef, useState } from 'react';

import { IconName } from '@zenkigen-component/icons';
import { buttonColors, focusVisible, typography } from '@zenkigen-component/theme';
import clsx from 'clsx';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';

import { DropdownMenu } from './dropdown-menu';
import { DropdownItemType, DropdownHorizontalAlign, DropdownVerticalPosition } from './type';

type Props =
  | {
      size?: 'x-small' | 'small' | 'medium' | 'large';
      variant?: 'text' | 'outline';
      menuMaxHeight?: CSSProperties['height'];
      isDisabled?: boolean;
      isShowArrow?: boolean;
      verticalPosition?: DropdownVerticalPosition;
      horizontalAlign?: DropdownHorizontalAlign;
    } & (
      | { children: ReactElement; label?: never; icon?: never }
      | {
          children?: undefined;
          label: string;
          icon?: IconName;
        }
    ) &
      ({ items: DropdownItemType[]; menu?: never } | { items?: never; menu: ReactElement });

export function Dropdown({
  children,
  size = 'medium',
  variant = children ? 'text' : 'outline',
  items,
  menu,
  menuMaxHeight,
  isDisabled = false,
  isShowArrow = true,
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

  const handleClickItem = useCallback((onClickAction?: () => void) => {
    setIsVisible(false);
    onClickAction?.();
  }, []);

  const childrenWithProps = children && cloneElement(children, { isDisabled });

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
          {isShowArrow && (
            <div className="ml-auto flex items-center">
              <Icon name={isVisible ? 'angle-small-up' : 'angle-small-down'} size="small" />
            </div>
          )}
        </button>
      )}
      {!isDisabled &&
        isVisible &&
        (menu ? (
          <DropdownMenu
            variant={variant}
            menu={menu}
            maxHeight={menuMaxHeight}
            targetDimensions={targetDimensions}
            verticalPosition={verticalPosition}
            horizontalAlign={horizontalAlign}
            onClickItem={handleClickItem}
          />
        ) : (
          items && (
            <DropdownMenu
              variant={variant}
              items={items && items}
              maxHeight={menuMaxHeight}
              targetDimensions={targetDimensions}
              verticalPosition={verticalPosition}
              horizontalAlign={horizontalAlign}
              onClickItem={handleClickItem}
            />
          )
        ))}
    </div>
  );
}
