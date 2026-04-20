import { createContext, useContext } from 'react';

import type { StepStatus } from './types';

export type StepsItemContextValue = {
  index: number;
  status: StepStatus;
  isLast: boolean;
};

export const StepsItemContext = createContext<StepsItemContextValue | null>(null);

export function useStepsItemContext(): StepsItemContextValue {
  const context = useContext(StepsItemContext);
  if (context === null) {
    throw new Error('Steps.Item must be rendered inside a <Steps> component');
  }

  return context;
}
