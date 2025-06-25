import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import React, { Children } from 'react';

import { useRovingFocus } from '../hooks/use-roving-focus';
import type { SegmentedControlContextValue } from './segmented-control-context';
import { SegmentedControlContext } from './segmented-control-context';
import { SegmentedControlItem } from './segmented-control-item';

export type SegmentedControlProps = Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'className'> & {
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  size?: 'small' | 'medium';
  isDisabled?: boolean;
};

export const SegmentedControl = ({
  children,
  value,
  onChange,
  size = 'medium',
  isDisabled = false,
  ...rest
}: SegmentedControlProps) => {
  // 子要素からidのリストを抽出（isDisabled: trueの要素は除外）
  const itemIds = Children.toArray(children)
    .filter((child): child is React.ReactElement<{ id: string; isDisabled?: boolean }> => {
      if (
        !React.isValidElement(child) ||
        typeof child.props !== 'object' ||
        child.props === null ||
        !('id' in child.props)
      ) {
        return false;
      }
      const props = child.props as { id: string; isDisabled?: boolean };

      return props.isDisabled !== true;
    })
    .map((child) => child.props.id);

  const childrenCount = Children.count(children);
  const containerStyle = { gridTemplateColumns: `repeat(${childrenCount}, 1fr)` };

  const { focusedValue, handleFocusChange, handleKeyDown, handleBlur } = useRovingFocus({
    values: itemIds,
    isDisabled,
  });

  const handleFocusAndChange = (newValue: string) => {
    handleFocusChange(newValue);
    if (!isDisabled && typeof onChange === 'function' && newValue !== value) {
      onChange(newValue);
    }
  };

  const contextValue: SegmentedControlContextValue = {
    value,
    onChange,
    size,
    isDisabled,
    focusedValue,
    onFocusChange: handleFocusAndChange,
    values: itemIds,
  };

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <div
        className="inline-grid gap-1 rounded-lg bg-uiBackground02 p-1"
        style={containerStyle}
        role="tablist"
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        {...rest}
      >
        {children}
      </div>
    </SegmentedControlContext.Provider>
  );
};

SegmentedControl.Item = SegmentedControlItem;
