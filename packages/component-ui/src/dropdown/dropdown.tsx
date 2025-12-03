import type { IconName } from '@zenkigen-inc/component-icons';
import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { MutableRefObject, PropsWithChildren, ReactElement } from 'react';
import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';
import { DropdownContext } from './dropdown-context';
import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';

type Props = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  variant?: 'text' | 'outline';
  title?: string;
  isDisabled?: boolean;
  isArrowHidden?: boolean;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
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
  variant = 'outline',
  title,
  isDisabled = false,
  isArrowHidden = false,
  portalTargetRef,
}: PropsWithChildren<Props>) {
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

  const wrapperClasses = clsx('relative flex shrink-0 items-center gap-1 rounded', {
    'cursor-not-allowed': isDisabled,
  });

  const childrenButtonClasses = clsx(
    'flex items-center justify-center rounded bg-uiBackground01 p-1 hover:bg-hover02 active:bg-active02',
    focusVisible.normal,
    {
      'pointer-events-none': isDisabled,
      'border border-uiBorder02': variant === 'outline',
    },
  );

  const buttonClasses = clsx(
    'flex items-center rounded bg-uiBackground01',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible.normal,
    {
      'pointer-events-none': isDisabled,
      'h-6 px-2': size === 'x-small' || size === 'small',
      'h-8 px-4': size === 'medium',
      'h-10 px-4': size === 'large',
    },
  );

  const labelClasses = clsx('flex items-center', {
    'mr-1': !isArrowHidden && size === 'x-small',
    'mr-2': !isArrowHidden && size !== 'x-small',
    'typography-label12regular': size === 'x-small',
    'typography-label14regular': size === 'small' || size === 'medium',
    'typography-label16regular': size === 'large',
  });

  return (
    <DropdownContext.Provider
      value={{ isVisible, setIsVisible, isDisabled, targetDimensions, variant, portalTargetRef }}
    >
      <div ref={targetRef} className={wrapperClasses}>
        {target ? (
          <button
            type="button"
            title={title}
            className={childrenButtonClasses}
            onClick={handleToggle}
            disabled={isDisabled}
          >
            {target}
            {!isArrowHidden && (
              <div className="ml-2 flex items-center fill-icon01">
                <Icon
                  name={isVisible ? 'angle-small-up' : 'angle-small-down'}
                  size={size === 'large' ? 'medium' : 'small'}
                />
              </div>
            )}
          </button>
        ) : (
          <button type="button" title={title} className={buttonClasses} onClick={handleToggle} disabled={isDisabled}>
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
        {!portalTargetRef
          ? children
          : portalTargetRef != null && portalTargetRef.current && createPortal(children, portalTargetRef.current)}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
