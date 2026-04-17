import { clsx } from 'clsx';
import type { ReactElement, ReactNode } from 'react';
import { Children, cloneElement, Fragment, isValidElement, useMemo, useState } from 'react';

import { StepsContext } from './steps-context';
import { StepsItem } from './steps-item';
import { StepsSeparator } from './steps-separator';
import type { StepsItemProps, StepsProps, StepsSize, StepStatus, StepsTextOrientation } from './types';

function getSeparatorCellHeightClass(size: StepsSize): string {
  if (size === 'small') return 'h-6';
  if (size === 'medium') return 'h-8';

  return 'h-10';
}

function HorizontalSeparatorCell({
  status,
  size,
  textOrientation,
}: {
  status: StepStatus;
  size: StepsSize;
  textOrientation: StepsTextOrientation;
}) {
  const heightClass = getSeparatorCellHeightClass(size);
  const alignClass = textOrientation === 'vertical' ? 'self-start' : '';

  return (
    <li aria-hidden="true" className={clsx('flex items-center', heightClass, alignClass)} role="presentation">
      <StepsSeparator status={status} />
    </li>
  );
}

function collectStepsItems(children: ReactNode): ReactElement<StepsItemProps>[] {
  const result: ReactElement<StepsItemProps>[] = [];
  Children.toArray(children).forEach((child) => {
    if (!isValidElement(child)) {
      return;
    }
    if (child.type === StepsItem) {
      result.push(child as ReactElement<StepsItemProps>);

      return;
    }
    if (child.type === Fragment) {
      const fragmentChildren = (child.props as { children?: ReactNode }).children;
      result.push(...collectStepsItems(fragmentChildren));
    }
  });

  return result;
}

function StepsRoot({
  children,
  currentStep,
  defaultCurrentStep,
  size = 'medium',
  orientation = 'horizontal',
  textOrientation = 'horizontal',
  variant = 'bold',
  'aria-label': ariaLabel,
}: StepsProps) {
  const [internalStep] = useState<number>(defaultCurrentStep ?? 0);
  const resolvedCurrentStep = currentStep ?? internalStep;

  const itemElements = useMemo(() => collectStepsItems(children), [children]);

  const stepsCount = itemElements.length;

  const contextValue = useMemo(
    () => ({
      currentStep: resolvedCurrentStep,
      size,
      orientation,
      textOrientation,
      variant,
    }),
    [resolvedCurrentStep, size, orientation, textOrientation, variant],
  );

  if (stepsCount === 0) {
    return null;
  }

  const statuses: StepStatus[] = itemElements.map((_item, index) =>
    index < resolvedCurrentStep ? 'completed' : index === resolvedCurrentStep ? 'current' : 'upcoming',
  );

  const renderedChildren: ReactNode[] =
    orientation === 'horizontal'
      ? itemElements.flatMap((item, index) => {
          const nodes: ReactNode[] = [
            cloneElement<StepsItemProps>(item, {
              key: item.key ?? `item-${index}`,
              _index: index,
              _status: statuses[index],
              _isLast: index === stepsCount - 1,
            }),
          ];
          if (index < stepsCount - 1) {
            nodes.push(
              <HorizontalSeparatorCell
                key={`sep-${index}`}
                size={size}
                status={statuses[index] ?? 'upcoming'}
                textOrientation={textOrientation}
              />,
            );
          }

          return nodes;
        })
      : itemElements.map((item, index) =>
          cloneElement<StepsItemProps>(item, {
            key: item.key ?? `item-${index}`,
            _index: index,
            _status: statuses[index],
            _isLast: index === stepsCount - 1,
          }),
        );

  const listClassName = clsx(
    orientation === 'horizontal'
      ? ['grid w-full gap-x-2', textOrientation === 'vertical' ? 'items-start' : 'items-center']
      : 'flex flex-col items-stretch',
  );

  const horizontalGridTemplate = Array.from({ length: stepsCount }, (_unused, index) =>
    index === stepsCount - 1 ? 'max-content' : 'max-content 1fr',
  ).join(' ');

  const listStyleProps = orientation === 'horizontal' ? { style: { gridTemplateColumns: horizontalGridTemplate } } : {};

  return (
    <StepsContext.Provider value={contextValue}>
      <ol aria-label={ariaLabel} className={listClassName} role="list" {...listStyleProps}>
        {renderedChildren}
      </ol>
    </StepsContext.Provider>
  );
}

type StepsComponent = typeof StepsRoot & {
  Item: typeof StepsItem;
};

export const Steps = StepsRoot as StepsComponent;
Steps.Item = StepsItem;
