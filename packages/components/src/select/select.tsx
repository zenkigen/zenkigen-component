import { CSSProperties, ReactNode, useCallback, useMemo, useState } from 'react';

import { IconName } from '@zenkigen-component/icons';
import { buttonColors, focusVisible, typography } from '@zenkigen-component/theme';
import classNames from 'classnames';

import { Icon } from '../icon';

import { SelectList } from './select-list';

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

export function Select({ size, variant, placeholder, options, defaultOptionId, isDisabled = false, onChange }: Props) {
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
  const handleClickDeselect = useCallback(() => {
    setSelectedOptionId(null);
    setShowOptionList(false);
  }, []);

  const labelVariant =
    size === 'small'
      ? 'label4regular'
      : size === 'small-medium' || size === 'medium'
      ? 'label3regular'
      : 'label2regular';

  const wrapperClasses = classNames(
    'relative',
    'flex',
    'shrink-0',
    'gap-1',
    'items-center',
    'w-fit',
    'rounded',
    'bg-background-uiBackground01',
    {
      'h-6': size === 'small' || size === 'small-medium',
      'h-8': size === 'medium',
      'h-10': size === 'large',
      'cursor-not-allowed': isDisabled,
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
      'pointer-events-none': isDisabled,
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
      'text-disabled-disabled01': isDisabled,
    },
  );

  const arrowIconClass = classNames('ml-auto');

  const leftIconClass = classNames('flex items-center mr-1');

  return (
    <div className={wrapperClasses}>
      <button type="button" onClick={handleToggle} disabled={isDisabled} className={buttonClass}>
        {(selectedOption?.icon || placeholder?.icon) && (
          <Icon
            name={selectedOption?.icon ? selectedOption.icon : placeholder?.icon ? placeholder.icon : 'add'}
            size={size === 'large' ? 'medium' : 'small'}
            isDisabled={isDisabled}
            className={leftIconClass}
          />
        )}
        <span className={labelClass}>
          {selectedOption ? selectedOption.value : placeholder ? placeholder.value : options[0]?.value}
        </span>
        <Icon
          name={showOptionList ? 'angle-small-up' : 'angle-small-down'}
          size="small"
          isDisabled={isDisabled}
          className={arrowIconClass}
        />
      </button>
      {showOptionList && !isDisabled && (
        <SelectList
          size={size}
          variant={variant}
          options={options}
          placeholder={placeholder}
          selectedOptionId={selectedOptionId}
          onClickItem={handleClickItem}
          onDeselect={handleClickDeselect}
        />
      )}
    </div>
  );
}