import { createContext, useContext } from 'react';

import type { StepsContextValue } from './types';

export const StepsContext = createContext<StepsContextValue | null>(null);

export function useStepsContext(): StepsContextValue {
  const context = useContext(StepsContext);
  if (context === null) {
    throw new Error('Steps.Item must be used within <Steps>');
  }

  return context;
}
