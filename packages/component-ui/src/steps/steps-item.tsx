import { clsx } from 'clsx';

import { Icon } from '../icon';
import { useStepsContext } from './steps-context';
import { useStepsItemContext } from './steps-item-context';
import { StepsSeparator } from './steps-separator';
import type { StepProgress, StepsItemProps, StepsSize, StepState, StepsVariant } from './types';

const progressSrOnlyLabel: Record<StepProgress, string> = {
  completed: '完了: ',
  current: '現在のステップ: ',
  upcoming: '未着手: ',
};

function getCircleSizeClass(size: StepsSize): string {
  return clsx({
    'size-6 typography-label12regular': size === 'small',
    'size-8 typography-label12regular': size === 'medium',
    'size-10 typography-label16regular': size === 'large',
  });
}

function getCircleVariantProgressClass(variant: StepsVariant, progress: StepProgress): string {
  return clsx({
    // subtle（全 state border-transparent で box-sizing を揃える）
    'bg-uiBackground02 text-text01 border-transparent': variant === 'subtle' && progress === 'upcoming',
    'bg-activeUi text-text01 border-transparent': variant === 'subtle' && progress === 'current',
    'bg-supportInfoLight text-text01 border-transparent': variant === 'subtle' && progress === 'completed',
    // solid
    'bg-uiBackground01 text-text01 border-uiBorder01': variant === 'solid' && progress === 'upcoming',
    'bg-activeUi text-text01 border-interactive01': variant === 'solid' && progress === 'current',
    'bg-interactive01 text-iconOnColor border-transparent': variant === 'solid' && progress === 'completed',
  });
}

function getCircleClasses(size: StepsSize, variant: StepsVariant, state: StepState): string {
  return clsx(
    'box-border flex items-center justify-center rounded-full border-2',
    getCircleSizeClass(size),
    getCircleVariantProgressClass(variant, state.progress),
    // 将来追加: state.isError && getCircleErrorOverlay(variant)
    // 将来追加: state.isDisabled && getCircleDisabledOverlay()
  );
}

function getIconSize(size: StepsSize): 'medium' | 'large' | 'x-large' {
  if (size === 'small') return 'medium';
  if (size === 'medium') return 'large';

  return 'x-large';
}

export function StepsItem({ label }: StepsItemProps) {
  const { size, orientation, textOrientation, variant } = useStepsContext();
  const { state, index, isLast, id } = useStepsItemContext();

  const isCircleFilled = state.progress === 'completed';
  const circleClasses = getCircleClasses(size, variant, state);

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
    <span
      className={clsx(
        'whitespace-nowrap text-text01',
        textOrientation === 'vertical' && 'text-center',
        size === 'large' ? 'typography-body16regular' : 'typography-body14regular',
      )}
    >
      <span className="sr-only">{progressSrOnlyLabel[state.progress]}</span>
      {label}
    </span>
  );

  const ariaCurrentProps = state.progress === 'current' ? ({ 'aria-current': 'step' } as const) : {};

  if (orientation === 'horizontal' && textOrientation === 'horizontal') {
    return (
      <li {...ariaCurrentProps} id={id}>
        <div className="flex items-center gap-2">
          {circle}
          {labelBlock}
        </div>
      </li>
    );
  }

  if (orientation === 'horizontal' && textOrientation === 'vertical') {
    return (
      <li {...ariaCurrentProps} id={id}>
        <div className="flex flex-col items-center gap-1">
          {circle}
          {labelBlock}
        </div>
      </li>
    );
  }

  if (orientation === 'vertical' && textOrientation === 'horizontal') {
    return (
      <li
        {...ariaCurrentProps}
        className={clsx(
          'grid grid-cols-[min-content_1fr] grid-rows-[auto_1fr] items-center gap-x-2',
          !isLast && 'flex-1',
        )}
        id={id}
      >
        <div className="col-start-1 row-start-1 flex items-center">{circle}</div>
        <div className="col-start-2 row-start-1 flex items-center">{labelBlock}</div>
        {!isLast && (
          <div className="col-start-1 row-start-2 flex items-stretch justify-center self-stretch py-2">
            <StepsSeparator progress={state.progress} />
          </div>
        )}
      </li>
    );
  }

  return (
    <li {...ariaCurrentProps} className={clsx('flex flex-col items-center gap-1', !isLast && 'flex-1')} id={id}>
      {circle}
      {labelBlock}
      {!isLast && (
        <div className="flex flex-1 items-stretch self-stretch py-2">
          <StepsSeparator progress={state.progress} />
        </div>
      )}
    </li>
  );
}

StepsItem.displayName = 'Steps.Item';
