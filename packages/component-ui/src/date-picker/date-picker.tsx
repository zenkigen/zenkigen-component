import 'react-day-picker/style.css';

import { focusVisible } from '@zenkigen-inc/component-theme';
import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, CSSProperties, MouseEventHandler, ReactElement, ReactNode } from 'react';
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { DayButtonProps, MonthCaptionProps, WeekdayProps } from 'react-day-picker';
import { DayPicker, getDefaultClassNames, useDayPicker } from 'react-day-picker';

import { Button, InternalButton } from '../button/button';
import { Icon } from '../icon';
import { IconButton } from '../icon-button';
import { Popover } from '../popover';
import { DatePickerCompoundContext } from './date-picker-context';
import type { DatePickerErrorMessageProps } from './date-picker-error-message';
import { DatePickerErrorMessage } from './date-picker-error-message';
import {
  createDateFromKey,
  createLocalDateFromKey,
  type DatePickerTimeZone,
  formatDateKey,
  formatDisplayDate,
  formatLocalDateKey,
  formatMonthLabel,
  getMonthStartDate,
} from './date-picker-utils';

type DatePickerButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onChange' | 'style' | 'value'
>;

export type DatePickerProps = DatePickerButtonProps & {
  /** 選択された日付。未選択の場合は `null` */
  value: Date | null;
  /** 日付が変更されたときに呼び出されるコールバック関数 */
  onChange: (value: Date | null) => void;
  /** 無効状態かどうか @default false */
  isDisabled?: boolean;
  /** エラー状態かどうか。`true` の場合、トリガーボタンが `outlineDanger` バリアントで表示される @default false */
  isError?: boolean;
  /** 選択可能な最小日付。この日付より前の日付は選択不可になる */
  min?: Date;
  /** 選択可能な最大日付。この日付より後の日付は選択不可になる */
  max?: Date;
  /** 未選択時に表示されるプレースホルダーテキスト @default '日付を選択' */
  placeholder?: string;
  /** トリガーボタンのサイズ @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  /** 日付変換に使用するタイムゾーン。選択された日付は指定タイムゾーンの 00:00:00 として返される @default 'Asia/Tokyo' */
  timeZone?: DatePickerTimeZone;
  /** Compound Component（ErrorMessage 等） */
  children?: ReactNode;
};

type DatePickerComponent = ((props: DatePickerProps) => ReactElement) & {
  ErrorMessage: typeof DatePickerErrorMessage;
  displayName?: string;
};

// react-day-picker のスタイル設定
const defaultDayPickerClassNames = getDefaultClassNames();

/** react-day-picker の CSS 変数によるスタイル上書き */
const dayPickerStyle = {
  '--rdp-font-family': "Arial, 'Noto Sans JP', sans-serif",
  '--rdp-nav-height': '30px',
  '--rdp-day-font': "700 12px/1 'Arial', 'Noto Sans JP', sans-serif",
  '--rdp-selected-font': "700 12px/1 'Arial', 'Noto Sans JP', sans-serif",
  '--rdp-weekday-font': "700 12px/1 'Arial', 'Noto Sans JP', sans-serif",
  '--rdp-day-width': '30px',
  '--rdp-day-height': '30px',
  '--rdp-day_button-width': '28px',
  '--rdp-day_button-height': '28px',
  '--rdp-day_button-border': '1px solid transparent',
  '--rdp-weekday-padding': '0px',
} as CSSProperties;

/** react-day-picker のクラス名上書き */
const dayPickerClassNames = {
  month: clsx(defaultDayPickerClassNames.month, 'flex flex-col px-[7px] py-2'),
};

/**
 * カレンダーヘッダー（月表示と前後月ナビゲーション）
 */
const CustomMonthCaption = ({ calendarMonth, className, ...props }: MonthCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const captionMonth = calendarMonth.date;

  return (
    <div className={clsx('flex items-center justify-between px-1 pb-0.5', className)} {...props}>
      <IconButton
        icon="angle-left"
        size="small"
        variant="text"
        isDisabled={!previousMonth}
        aria-label="前の月"
        onClick={() => previousMonth && goToMonth(previousMonth)}
      />
      <span className="typography-label12bold text-text02">{formatMonthLabel(captionMonth)}</span>
      <IconButton
        icon="angle-right"
        size="small"
        variant="text"
        isDisabled={!nextMonth}
        aria-label="次の月"
        onClick={() => nextMonth && goToMonth(nextMonth)}
      />
    </div>
  );
};

const dayButtonBaseClass = 'relative grid size-full place-items-center rounded-full !border !border-solid';

/**
 * カレンダーの日付ボタン
 *
 * 日付の状態に応じてスタイルを切り替える
 */
const CustomDayButton = ({ day, modifiers, className, ...buttonProps }: DayButtonProps) => {
  const isSelected = Boolean(modifiers.selected);
  const isOutside = Boolean(modifiers.outside);
  const isMinMaxDisabled = Boolean(modifiers.minMaxDisabled);
  const now = new Date();
  const isToday =
    day.date.getFullYear() === now.getFullYear() &&
    day.date.getMonth() === now.getMonth() &&
    day.date.getDate() === now.getDate();

  const isDisabledDay = isMinMaxDisabled;

  return (
    <button
      type="button"
      {...buttonProps}
      disabled={isDisabledDay}
      className={clsx(
        className,
        dayButtonBaseClass,
        // 共通: フォーカスリング（有効な日のみ）
        !isDisabledDay && focusVisible.normal,
        // min/max 制限日
        isMinMaxDisabled && '!cursor-not-allowed !border-transparent !text-disabled01',
        // 範囲外の日（前後月）
        isOutside && !isMinMaxDisabled && '!border-transparent !text-interactive04',
        // 通常の日
        !isDisabledDay && !isSelected && '!border-transparent',
        !isDisabledDay && !isToday && '!text-interactive02 hover:!bg-hoverUi',
        // 今日
        !isDisabledDay && isToday && !isSelected && '!border-selectedUiBorder !bg-interactive01 !text-textOnColor',
        // 選択された日
        isSelected && '!border-selectedUiBorder !bg-uiBackgroundBlue',
      )}
    >
      {buttonProps.children}
    </button>
  );
};

/**
 * カレンダーの曜日ヘッダー（日〜土）
 */
const CustomWeekday = ({ className, children, ...props }: WeekdayProps) => {
  return (
    <th
      {...props}
      className={clsx(className, 'm-0 flex size-7 items-center justify-center p-0 text-center text-text02')}
    >
      {children}
    </th>
  );
};

export const DatePicker: DatePickerComponent = ({
  value,
  onChange,
  isDisabled = false,
  isError = false,
  min,
  max,
  placeholder = '日付を選択',
  size = 'medium',
  timeZone = 'Asia/Tokyo',
  children,
  onClick,
  type,
  ...restProps
}: DatePickerProps) => {
  const autoGeneratedId = useId();
  const describedByBaseId = restProps.id ?? autoGeneratedId;
  const [isOpen, setIsOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(() => {
    if (value == null) {
      const todayKey = formatLocalDateKey(new Date());

      return createLocalDateFromKey(`${todayKey.slice(0, 7)}-01`);
    }

    return getMonthStartDate(value, timeZone);
  });
  const calendarRef = useRef<HTMLDivElement>(null);

  // 日付キー変換（タイムゾーンを考慮した文字列形式 "YYYY-MM-DD"）
  const selectedKey = useMemo(() => (value == null ? null : formatDateKey(value, timeZone)), [value, timeZone]);
  const selectedDate = useMemo(() => {
    if (selectedKey == null) {
      return;
    }

    return createLocalDateFromKey(selectedKey);
  }, [selectedKey]);
  const minKey = useMemo(() => (min == null ? null : formatDateKey(min, timeZone)), [min, timeZone]);
  const maxKey = useMemo(() => (max == null ? null : formatDateKey(max, timeZone)), [max, timeZone]);

  // 日付の有効/無効判定
  const currentMonthKey = useMemo(() => formatLocalDateKey(displayMonth).slice(0, 7), [displayMonth]);

  // 表示中の月の範囲外かどうかを判定
  const isOutsideMonth = useCallback(
    (date: Date) => formatLocalDateKey(date).slice(0, 7) !== currentMonthKey,
    [currentMonthKey],
  );

  // min/max 範囲外かどうかを判定（カスタム modifier として DayPicker に渡す）
  const isMinMaxDisabled = useCallback(
    (date: Date) => {
      const dateKey = formatLocalDateKey(date);
      if (minKey != null && dateKey < minKey) {
        return true;
      }
      if (maxKey != null && dateKey > maxKey) {
        return true;
      }

      return false;
    },
    [maxKey, minKey],
  );

  // DayPicker の disabled 判定（範囲外 or min/max 制限）
  const disabledDays = useCallback(
    (date: Date) => {
      if (isOutsideMonth(date)) {
        return true;
      }

      return isMinMaxDisabled(date);
    },
    [isOutsideMonth, isMinMaxDisabled],
  );

  // カレンダー表示用の「今日」（ローカル日付として生成）
  const todayForCalendar = useMemo(() => createLocalDateFromKey(formatLocalDateKey()), []);

  // value 変更時に表示月を同期
  useEffect(() => {
    if (value == null) {
      const todayKey = formatLocalDateKey(new Date());
      setDisplayMonth(createLocalDateFromKey(`${todayKey.slice(0, 7)}-01`));

      return;
    }

    setDisplayMonth(getMonthStartDate(value, timeZone));
  }, [value, timeZone]);

  // カレンダー展開時に選択日または今日にフォーカス
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      const container = calendarRef.current;
      if (!container) {
        return;
      }

      const selected = container.querySelector<HTMLButtonElement>('button[aria-selected="true"]');
      const today = container.querySelector<HTMLButtonElement>('button[aria-current="date"]');
      const focusTarget = selected ?? today;

      focusTarget?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [displayMonth, isOpen, value]);

  // disabled 状態になったらカレンダーを閉じる
  useEffect(() => {
    if (isDisabled) {
      setIsOpen(false);
    }
  }, [isDisabled]);

  const handleTriggerClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isDisabled) {
      event.preventDefault();

      return;
    }

    onClick?.(event);
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (selected: Date | undefined) => {
    if (!selected) {
      return;
    }

    const selectedKey = formatLocalDateKey(selected);
    onChange(createDateFromKey(selectedKey, timeZone));
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setIsOpen(false);
  };

  const handleClickToday = () => {
    const todayKey = formatLocalDateKey(new Date());
    setDisplayMonth(createLocalDateFromKey(`${todayKey.slice(0, 7)}-01`));
  };

  const formatters = useMemo(() => {
    const weekdayFormatter = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' });

    return {
      formatCaption: (date: Date) => formatMonthLabel(date),
      formatDay: (date: Date) => String(date.getDate()),
      formatWeekdayName: (date: Date) => weekdayFormatter.format(date),
    };
  }, []);

  const iconSize = size === 'large' ? 'medium' : 'small';
  const displayText = value ? formatDisplayDate(value, timeZone) : placeholder;
  const displayTextClasses = 'min-w-0 truncate';

  // アクセシビリティ: ErrorMessage の ID 管理と aria 属性
  const errorIds: string[] = [];

  // ErrorMessage に自動で ID を付与し、aria-describedby 用に収集
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (child.type === DatePickerErrorMessage && isError) {
      const errorChild = child as ReactElement<DatePickerErrorMessageProps>;
      const assignedId = errorChild.props.id ?? `${describedByBaseId}-error-${errorIds.length + 1}`;
      errorIds.push(assignedId);

      return cloneElement(errorChild, { id: assignedId });
    }

    return child;
  });

  // aria-describedby: props からの値と ErrorMessage の ID を結合
  const describedByFromProps = typeof restProps['aria-describedby'] === 'string' ? restProps['aria-describedby'] : null;
  const describedByList = [describedByFromProps, ...errorIds].filter(
    (id): id is string => typeof id === 'string' && id.trim().length > 0,
  );
  const describedByProps =
    describedByList.length > 0
      ? {
          'aria-describedby': describedByList.join(' '),
        }
      : {};

  // aria-invalid: props からの値を優先、なければ isError または errorIds の有無で判定
  const shouldMarkInvalid = isError === true || errorIds.length > 0;
  const ariaInvalidFromProps = restProps['aria-invalid'];
  const ariaInvalidValue = ariaInvalidFromProps != null ? ariaInvalidFromProps : shouldMarkInvalid ? true : null;
  const ariaInvalidProps = ariaInvalidValue == null ? {} : { 'aria-invalid': ariaInvalidValue };

  const mergedButtonProps = {
    ...restProps,
    ...describedByProps,
    ...ariaInvalidProps,
  };

  // Compound Component 用のコンテキスト値
  const contextValue = useMemo(
    () => ({
      size,
      isError,
    }),
    [isError, size],
  );

  const popoverContent = (
    <Popover isOpen={isOpen} placement="bottom-start" onClose={handleClose}>
      <Popover.Trigger>
        <InternalButton
          {...mergedButtonProps}
          type={type ?? 'button'}
          size={size}
          variant={isError ? 'outlineDanger' : 'outline'}
          isDisabled={isDisabled}
          before={<Icon name="calendar" size={iconSize} />}
          justifyContent="start"
          onClick={handleTriggerClick}
        >
          <span className={displayTextClasses}>{displayText}</span>
          {/* {displayText} */}
        </InternalButton>
      </Popover.Trigger>
      <Popover.Content>
        <div ref={calendarRef} className="rounded bg-uiBackground01 shadow-floatingShadow" aria-label="日付選択">
          <DayPicker
            mode="single"
            showOutsideDays
            hideNavigation
            weekStartsOn={0}
            style={dayPickerStyle}
            month={displayMonth}
            onMonthChange={setDisplayMonth}
            selected={selectedDate}
            onSelect={handleSelect}
            today={todayForCalendar}
            disabled={disabledDays}
            modifiers={{ minMaxDisabled: isMinMaxDisabled }}
            classNames={dayPickerClassNames}
            formatters={formatters}
            fixedWeeks
            components={{ MonthCaption: CustomMonthCaption, DayButton: CustomDayButton, Weekday: CustomWeekday }}
          />
          <div className="flex items-center justify-between border-t border-uiBorder01 px-2 py-1">
            <IconButton
              icon="calendar-today"
              size="medium"
              variant="text"
              aria-label="今日に戻る"
              iconAccentColor="supportInfo"
              onClick={handleClickToday}
            />
            <Button type="button" size="small" variant="text" onClick={handleClear}>
              クリア
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );

  const stackedChildren = enhancedChildren == null ? [] : Children.toArray(enhancedChildren);
  const hasMessageChildren = stackedChildren.length > 0;

  if (!hasMessageChildren) {
    return (
      <DatePickerCompoundContext.Provider value={contextValue}>
        <div className="flex flex-col">{popoverContent}</div>
      </DatePickerCompoundContext.Provider>
    );
  }

  return (
    <DatePickerCompoundContext.Provider value={contextValue}>
      <div className="flex flex-col gap-2">
        {popoverContent}
        {stackedChildren}
      </div>
    </DatePickerCompoundContext.Provider>
  );
};

DatePicker.ErrorMessage = DatePickerErrorMessage;
DatePicker.displayName = 'DatePicker';
