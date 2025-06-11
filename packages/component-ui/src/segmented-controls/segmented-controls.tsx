import type { IconName } from '@zenkigen-inc/component-icons';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import { SegmentedControlItem } from './segmented-control-item';

// Context for managing segmented controls state
type SegmentedControlsContextValue = {
  selectedValue?: string;
  onChange?: (value: string) => void;
  size: 'small' | 'medium';
  isDisabled: boolean;
  variant: 'default' | 'iconOnly';
  fullWidth: boolean;
  hoveredValue: string | null;
  setHoveredValue: (value: string | null) => void;
};

const SegmentedControlsContext = createContext<SegmentedControlsContextValue | null>(null);

const useSegmentedControlsContext = () => {
  const context = useContext(SegmentedControlsContext);
  if (context === null) {
    throw new Error('SegmentedControls.Item must be used within SegmentedControls');
  }

  return context;
};

// Types
export type SegmentedControlsProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  children: ReactNode;
  selectedValue?: string;
  onChange?: (value: string) => void;
  size?: 'small' | 'medium';
  isDisabled?: boolean;
  fullWidth?: boolean;
  variant?: 'default' | 'iconOnly';
};

export type SegmentedControlsItemProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick'> & {
  label?: string;
  value: string;
  icon?: IconName;
  isDisabled?: boolean;
};

// Main Component
export const SegmentedControls = ({
  children,
  selectedValue,
  onChange,
  size = 'medium',
  isDisabled = false,
  fullWidth = false,
  variant = 'default',
  className,
  ...props
}: SegmentedControlsProps) => {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  const containerClasses = clsx(
    'inline-flex gap-1 rounded-lg bg-uiBackground02 p-1',
    { 'w-full': fullWidth },
    className,
  );

  const contextValue: SegmentedControlsContextValue = {
    selectedValue,
    onChange,
    size,
    isDisabled,
    variant,
    fullWidth,
    hoveredValue,
    setHoveredValue,
  };

  return (
    <SegmentedControlsContext.Provider value={contextValue}>
      <div className={containerClasses} role="tablist" {...props}>
        {children}
      </div>
    </SegmentedControlsContext.Provider>
  );
};

// Item Component
const Item = ({ label, value, icon, isDisabled: itemDisabled, className, ...props }: SegmentedControlsItemProps) => {
  const {
    selectedValue,
    onChange,
    size,
    isDisabled: isContextDisabled,
    variant,
    fullWidth: isFullWidth,
    hoveredValue,
    setHoveredValue,
  } = useSegmentedControlsContext();

  const isSelected = selectedValue === value;
  const isHovered = hoveredValue === value;
  const isOptionDisabled = isContextDisabled || itemDisabled === true;

  const handleClick = (clickedValue: string) => {
    if (!isOptionDisabled) {
      onChange?.(clickedValue);
    }
  };

  const handleMouseEnter = () => {
    if (!isOptionDisabled) {
      setHoveredValue(value);
    }
  };

  const handleMouseLeave = () => {
    setHoveredValue(null);
  };

  return (
    <SegmentedControlItem
      label={label}
      value={value}
      icon={icon}
      isSelected={isSelected}
      isDisabled={isOptionDisabled}
      isHovered={isHovered}
      size={size}
      variant={variant}
      onMouseEnter={handleMouseEnter as () => void}
      onMouseLeave={handleMouseLeave as () => void}
      onClick={handleClick}
      className={clsx(isFullWidth && 'flex-1', className)}
      {...props}
    />
  );
};

// Attach Item to SegmentedControls
SegmentedControls.Item = Item;

// Legacy support - Keep original types for backward compatibility
export type SegmentedOption = { id: string; label?: string; value: string; icon?: IconName; isDisabled?: boolean };
