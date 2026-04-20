import type { ReactNode } from 'react';

export type StepsSize = 'small' | 'medium' | 'large';

export type StepsOrientation = 'horizontal' | 'vertical';

export type StepsTextOrientation = 'horizontal' | 'vertical';

export type StepsVariant = 'subtle' | 'solid';

export type StepStatus = 'completed' | 'current' | 'upcoming';

export type StepsContextValue = {
  size: StepsSize;
  orientation: StepsOrientation;
  textOrientation: StepsTextOrientation;
  variant: StepsVariant;
};

export type StepsProps = {
  children: ReactNode;
  currentStep?: number;
  initialCurrentStep?: number;
  size?: StepsSize;
  orientation?: StepsOrientation;
  textOrientation?: StepsTextOrientation;
  variant?: StepsVariant;
  'aria-label'?: string;
};

export type StepsItemProps = {
  label: string;
};
