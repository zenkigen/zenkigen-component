import { clsx } from 'clsx';

import { useStepsContext } from './steps-context';
import type { StepProgress } from './types';

type Props = {
  progress: StepProgress;
};

export function StepsSeparator({ progress }: Props) {
  const { orientation } = useStepsContext();

  const isVerticalLine = orientation === 'vertical';

  const colorClass = progress === 'completed' ? 'bg-interactive01' : 'bg-uiBorder01';

  if (isVerticalLine) {
    return <div aria-hidden="true" className={clsx('mx-auto h-full min-h-2 w-px', colorClass)} />;
  }

  return <div aria-hidden="true" className={clsx('h-px flex-1', colorClass)} />;
}
