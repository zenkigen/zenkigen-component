import { clsx } from 'clsx';

import { useStepsContext } from './steps-context';
import type { StepStatus } from './types';

type Props = {
  status: StepStatus;
};

export function StepsSeparator({ status }: Props) {
  const { orientation, size } = useStepsContext();

  const isVerticalLine = orientation === 'vertical';

  const colorClass = status === 'completed' ? 'bg-interactive01' : 'bg-uiBorder01';

  if (isVerticalLine) {
    const minHeightClass = clsx({
      'min-h-6': size === 'small',
      'min-h-8': size === 'medium',
      'min-h-10': size === 'large',
    });

    return <div aria-hidden="true" className={clsx('mx-auto h-full w-px', minHeightClass, colorClass)} />;
  }

  return <div aria-hidden="true" className={clsx('h-px flex-1', colorClass)} />;
}
