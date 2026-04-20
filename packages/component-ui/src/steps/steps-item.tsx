import { clsx } from 'clsx';

import { Icon } from '../icon';
import { useStepsContext } from './steps-context';
import { StepsSeparator } from './steps-separator';
import type { StepsItemProps, StepsSize, StepStatus, StepsVariant } from './types';

const statusSrOnlyLabel: Record<StepStatus, string> = {
  completed: '完了: ',
  current: '現在のステップ: ',
  upcoming: '未着手: ',
};

function getCircleClasses(size: StepsSize, variant: StepsVariant, status: StepStatus): string {
  const sizeClass = clsx({
    'size-6 typography-label12regular': size === 'small',
    'size-8 typography-label12regular': size === 'medium',
    'size-10 typography-label16regular': size === 'large',
  });

  const stateClass = clsx({
    // subtle（全 state border-transparent で box-sizing を揃える）
    'bg-uiBackground02 text-text01 border-transparent': variant === 'subtle' && status === 'upcoming',
    'bg-activeUi text-text01 border-transparent': variant === 'subtle' && status === 'current',
    'bg-supportInfoLight text-text01 border-transparent': variant === 'subtle' && status === 'completed',
    // solid
    'bg-uiBackground01 text-text01 border-uiBorder01': variant === 'solid' && status === 'upcoming',
    'bg-activeUi text-text01 border-interactive01': variant === 'solid' && status === 'current',
    'bg-interactive01 text-iconOnColor border-transparent': variant === 'solid' && status === 'completed',
  });

  return clsx('box-border flex items-center justify-center rounded-full border-2', sizeClass, stateClass);
}

function getIconSize(size: StepsSize): 'medium' | 'large' | 'x-large' {
  if (size === 'small') return 'medium';
  if (size === 'medium') return 'large';

  return 'x-large';
}

export function StepsItem({ label, description, _index, _status, _isLast }: StepsItemProps) {
  const { size, orientation, textOrientation, variant } = useStepsContext();

  if (_status == null || _index == null || _isLast == null) {
    throw new Error('Steps.Item must be rendered as a direct child of <Steps>');
  }

  const status = _status;
  const index = _index;
  const isLast = _isLast;

  const isCircleFilled = status === 'completed';
  const circleClasses = getCircleClasses(size, variant, status);

  const checkIcon =
    variant === 'solid' ? (
      <Icon name="check" size={getIconSize(size)} color="iconOnColor" />
    ) : (
      <Icon name="check" size={getIconSize(size)} className="fill-gray-gray100" />
    );

  const circle = (
    <span aria-hidden="true" className={circleClasses}>
      {isCircleFilled ? checkIcon : <span>{index + 1}</span>}
    </span>
  );

  const labelBlock = (
    <span className={clsx('flex flex-col gap-1', textOrientation === 'vertical' && 'items-center text-center')}>
      <span
        className={clsx(
          'whitespace-nowrap text-text01',
          size === 'large' ? 'typography-label16regular' : 'typography-label14regular',
        )}
      >
        <span className="sr-only">{statusSrOnlyLabel[status]}</span>
        {label}
      </span>
      {description != null && description !== '' && (
        <span className="typography-label12regular text-text02">{description}</span>
      )}
    </span>
  );

  const ariaCurrentProps = status === 'current' ? ({ 'aria-current': 'step' } as const) : {};

  if (orientation === 'horizontal' && textOrientation === 'horizontal') {
    return (
      <li {...ariaCurrentProps} className="flex items-center gap-2">
        {circle}
        {labelBlock}
      </li>
    );
  }

  if (orientation === 'horizontal' && textOrientation === 'vertical') {
    return (
      <li {...ariaCurrentProps} className="flex flex-col items-center gap-1">
        {circle}
        {labelBlock}
      </li>
    );
  }

  if (orientation === 'vertical' && textOrientation === 'horizontal') {
    return (
      <li {...ariaCurrentProps} className="grid grid-cols-[min-content_1fr] grid-rows-[auto_1fr] items-start gap-x-2">
        <div className="col-start-1 row-start-1 flex items-center">{circle}</div>
        <div className="col-start-2 row-start-1 flex items-center pb-1">{labelBlock}</div>
        {!isLast && (
          <div className="col-start-1 row-start-2 flex items-stretch justify-center self-stretch">
            <StepsSeparator status={status} />
          </div>
        )}
      </li>
    );
  }

  return (
    <li {...ariaCurrentProps} className="flex flex-col items-center gap-1">
      {circle}
      {labelBlock}
      {!isLast && (
        <div className="flex items-stretch self-stretch">
          <StepsSeparator status={status} />
        </div>
      )}
    </li>
  );
}

StepsItem.displayName = 'Steps.Item';
