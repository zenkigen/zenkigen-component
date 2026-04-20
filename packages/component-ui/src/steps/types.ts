import type { ReactNode } from 'react';

export type StepsSize = 'small' | 'medium' | 'large';

export type StepsOrientation = 'horizontal' | 'vertical';

export type StepsTextOrientation = 'horizontal' | 'vertical';

export type StepsVariant = 'subtle' | 'solid';

export type StepStatus = 'completed' | 'current' | 'upcoming';

export type StepsContextValue = {
  currentStep: number;
  size: StepsSize;
  orientation: StepsOrientation;
  textOrientation: StepsTextOrientation;
  variant: StepsVariant;
};

export type StepsProps = {
  children: ReactNode;
  currentStep?: number;
  defaultCurrentStep?: number;
  size?: StepsSize;
  orientation?: StepsOrientation;
  textOrientation?: StepsTextOrientation;
  variant?: StepsVariant;
  'aria-label'?: string;
};

export type StepsItemProps = {
  label: string;
  /**
   * Steps が自動で注入する内部 props。外部から直接渡すことは想定していない。
   */
  _index?: number;
  /**
   * Steps が自動で注入する内部 props。外部から直接渡すことは想定していない。
   */
  _status?: StepStatus;
  /**
   * Steps が自動で注入する内部 props。外部から直接渡すことは想定していない。
   */
  _isLast?: boolean;
};
