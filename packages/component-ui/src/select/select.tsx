import { autoUpdate, flip, FloatingPortal, offset, shift, useFloating } from '@floating-ui/react';
import type { IconName } from '@zenkigen-inc/component-icons';
import { focusVisible, selectColors } from '@zenkigen-inc/component-theme';
import clsx from 'clsx';
import type { CSSProperties, PropsWithChildren } from 'react';
import { useRef, useState } from 'react';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon';
import { SelectContext } from './select-context';
import { SelectItem } from './select-item';
import { SelectList } from './select-list';
import type { SelectOption } from './type';

type Props = {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  variant?: 'outline' | 'text';
  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  placeholder?: string;
  placeholderIcon?: IconName;
  selectedOption?: SelectOption | null;
  optionListMaxHeight?: CSSProperties['height'];
  isDisabled?: boolean;
  isError?: boolean;
  isOptionSelected?: boolean;
  onChange?: (option: SelectOption | null) => void;
};

export function Select({
  children,
  size = 'medium',
  variant = 'outline',
  width,
  maxWidth,
  placeholder,
  placeholderIcon,
  selectedOption = null,
  isDisabled = false,
  isError = false,
  isOptionSelected = false,
  onChange,
  optionListMaxHeight,
}: PropsWithChildren<Props>) {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  useOutsideClick(targetRef, () => setIsOptionListOpen(false));

  // Floating UI の設定
  const { refs, floatingStyles } = useFloating({
    open: isOptionListOpen,
    onOpenChange: setIsOptionListOpen,
    placement: 'bottom-start',
    middleware: [offset(4), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const handleClickToggle = () => setIsOptionListOpen((prev) => !prev);

  const buttonVariant: 'outline' | 'text' | 'outlineError' | 'textError' =
    isError && !isDisabled ? (`${variant}Error` as 'outlineError' | 'textError') : variant;

  const isSelected = isOptionSelected && !isDisabled && selectedOption !== null && !isError;

  const wrapperClasses = clsx('relative flex shrink-0 items-center gap-1 rounded bg-uiBackground01', {
    'h-6': size === 'x-small' || size === 'small',
    'h-8': size === 'medium',
    'h-10': size === 'large',
    'cursor-not-allowed': isDisabled,
  });

  const buttonClasses = clsx(
    'flex size-full items-center rounded',
    selectColors[buttonVariant].hover,
    selectColors[buttonVariant].active,
    selectColors[buttonVariant].disabled,
    focusVisible.normal,
    {
      [selectColors[buttonVariant].selected]: isSelected,
      [selectColors[buttonVariant].base]: !isSelected,
      'px-2': size === 'x-small' || size === 'small',
      'px-4': size === 'medium' || size === 'large',
      'pointer-events-none': isDisabled,
      'border-supportError': !isSelected && !isDisabled && isError,
    },
  );

  const labelClasses = clsx('overflow-hidden', {
    'mr-1': size === 'x-small',
    'mr-2': size !== 'x-small',
    'typography-label12regular': size === 'x-small',
    'typography-label14regular': size === 'small' || size === 'medium',
    'typography-label16regular': size === 'large',
  });

  return (
    <SelectContext.Provider
      value={{
        size,
        variant,
        placeholder,
        setIsOptionListOpen,
        selectedOption,
        onChange,
        isError,
        floatingStyles,
        floatingRef: refs.floating,
      }}
    >
      <div className={wrapperClasses} style={{ width, maxWidth }} ref={targetRef}>
        <button
          ref={refs.setReference}
          className={buttonClasses}
          type="button"
          onClick={handleClickToggle}
          disabled={isDisabled}
        >
          {selectedOption?.icon ? (
            <div className="mr-1 flex">
              <Icon name={selectedOption.icon} size={size === 'large' ? 'medium' : 'small'} />
            </div>
          ) : (
            placeholder != null &&
            placeholderIcon && (
              <div className="mr-1 flex">
                <Icon name={placeholderIcon} size={size === 'large' ? 'medium' : 'small'} />
              </div>
            )
          )}
          <div className={labelClasses}>
            <div className="truncate">{selectedOption ? selectedOption.label : placeholder != null && placeholder}</div>
          </div>
          <div className="ml-auto flex items-center">
            <Icon
              name={isOptionListOpen ? 'angle-small-up' : 'angle-small-down'}
              size={size === 'large' ? 'medium' : 'small'}
            />
          </div>
        </button>
        {isOptionListOpen && !isDisabled && (
          <FloatingPortal>
            <div className="relative z-overlay">
              <SelectList ref={refs.setFloating} maxHeight={optionListMaxHeight}>
                {children}
              </SelectList>
            </div>
          </FloatingPortal>
        )}
      </div>
    </SelectContext.Provider>
  );
}

Select.Option = SelectItem;
