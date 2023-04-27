import { CSSProperties, ReactNode, useCallback, useMemo, useState } from 'react';

import { IconName } from '@zenkigen-component/icons';
import { buttonColors, focusVisible, typography } from '@zenkigen-component/theme';
import classNames from 'classnames';

import { Icon } from '../icon';

export type SelectOption = {
  id: string;
  value: string;
  icon?: IconName;
};

type Props = {
  size: 'small' | 'small-medium' | 'medium' | 'large';
  variant: 'text' | 'outline';
  width?: CSSProperties['width'];
  placeholder?: SelectOption;
  listHeight?: number;
  options: SelectOption[];
  defaultOptionId?: string;
  isDisabled?: boolean;
  isError?: boolean;
  useSelected?: boolean;
  onChange?: (id: string, index: number) => void;
  listAlign?: 'left' | 'right';
  listPosition?: 'top' | 'bottom';
  children?: ReactNode;
};

export function Select({ size, variant, placeholder, options, defaultOptionId, onChange }: Props) {
  const [selectedOptionId, setSelectedOptionId] = useState(defaultOptionId ? defaultOptionId : null);
  const [showOptionList, setShowOptionList] = useState(false);

  const selectedOption = useMemo(
    () => options.find((option) => option.id === selectedOptionId),
    [options, selectedOptionId],
  );

  const handleToggle = useCallback(() => {
    setShowOptionList((prev) => !prev);
  }, []);
  const handleClickItem = useCallback(
    (id: string, index: number) => {
      setSelectedOptionId(id);
      onChange && onChange(id, index);
      setShowOptionList(false);
    },
    [onChange],
  );

  const labelVariant =
    size === 'small'
      ? 'label4regular'
      : size === 'small-medium' || size === 'medium'
      ? 'label3regular'
      : 'label2regular';

  const wrapperClasses = classNames(
    'relative',
    'flex',
    'gap-1',
    'items-center',
    'w-fit',
    'rounded',
    'bg-background-uiBackground01',
    {
      'h-6': size === 'small' || size === 'small-medium',
      'h-8': size === 'medium',
      'h-10': size === 'large',
    },
  );

  const buttonClass = classNames(
    'flex',
    'items-center',
    'w-full',
    'h-full',
    'rounded',
    buttonColors[variant].base,
    buttonColors[variant].hover,
    buttonColors[variant].active,
    buttonColors[variant].disabled,
    focusVisible,
    {
      'px-2': size === 'small' || size === 'small-medium',
      'px-4': size === 'medium' || size === 'large',
    },
  );

  const labelClass = classNames(
    'flex',
    'item-center',
    'mr-2',
    'text-interactive-interactive02',
    typography.label[labelVariant],
    {
      'mr-1': size === 'small',
    },
  );

  const arrowIconClass = classNames('ml-auto');

  const menuClass = classNames(
    'absolute',
    'w-max',
    'py-2',
    'overflow-y-auto',
    'bg-background-uiBackground01',
    'rounded',
    'shadow-menu',
    {
      'top-7': size === 'small' || size === 'small-medium',
      'top-9': size === 'medium',
      'top-11': size === 'large',
      'border-solid border border-border-uiBorder01': variant === 'outline',
    },
  );

  const listItemClass = classNames('flex items-center w-full');

  const itemClass = classNames(
    'flex',
    'items-center',
    'w-full',
    'h-8',
    'px-3',
    'hover:bg-hover-hover02',
    'active:bg-active-active02',
    focusVisible,
    typography.label.label2regular,
  );

  const leftIconClass = classNames('flex items-center mr-1');

  const valueClass = classNames('mr-6');

  const checkIconClass = classNames('ml-auto');

  return (
    <div className={wrapperClasses}>
      <button type="button" onClick={handleToggle} className={buttonClass}>
        {(selectedOption?.icon || placeholder?.icon) && (
          <Icon
            name={selectedOption?.icon ? selectedOption.icon : placeholder?.icon ? placeholder.icon : 'add'}
            size={size === 'large' ? 'medium' : 'small'}
            color="icon01"
            className={leftIconClass}
          />
        )}
        <span className={labelClass}>
          {selectedOption ? selectedOption.value : placeholder ? placeholder.value : options[0]?.value}
        </span>
        <Icon
          name={showOptionList ? 'angle-small-up' : 'angle-small-down'}
          size="small"
          color="icon01"
          className={arrowIconClass}
        />
      </button>
      {showOptionList && (
        <ul className={menuClass}>
          {options.map((option, index) => (
            <li className={listItemClass} key={option.id} onClick={() => handleClickItem(option.id, index)}>
              <button
                className={classNames(itemClass, { 'bg-selected-selectedUi': option.id === selectedOptionId })}
                type="button"
                data-selected={option.id === selectedOptionId}
              >
                {option.icon && (
                  <Icon
                    name={option.icon}
                    size="small"
                    color={option.id === selectedOptionId ? 'interactive01' : 'icon01'}
                    className={leftIconClass}
                  />
                )}
                <span
                  className={classNames(
                    valueClass,
                    option.id === selectedOptionId
                      ? 'text-interactive-interactive01'
                      : 'text-interactive-interactive02',
                  )}
                >
                  {option.value}
                </span>
                {option.id === selectedOptionId && (
                  <Icon name="check" size="small" color="interactive01" className={checkIconClass} />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
