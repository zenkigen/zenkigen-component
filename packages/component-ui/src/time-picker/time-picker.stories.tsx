import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { action } from 'storybook/actions';

import { DatePicker } from '../date-picker';
import type { TimePickerProps } from './time-picker';
import { TimePicker } from './time-picker';
import type { TimeValue } from './time-picker-utils';
import { formatTime } from './time-picker-utils';

const EMPTY_TIME: TimeValue = { hour: null, minute: null };

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  argTypes: {
    size: {
      description: 'サイズ',
    },
    minuteStep: {
      description: '分候補の刻み',
    },
    minTime: {
      type: 'string',
      description: '選択可能な最小時刻（"HH:mm"）',
    },
    maxTime: {
      type: 'string',
      description: '選択可能な最大時刻（"HH:mm"）',
    },
    isError: {
      type: 'boolean',
      description: 'エラー状態',
    },
    isDisabled: {
      type: 'boolean',
      description: '無効化の状態',
    },
    children: {
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

type TimePickerStoryProps = Omit<TimePickerProps, 'value' | 'onChange'> & {
  value?: TimeValue;
  onChange?: TimePickerProps['onChange'];
};

const TimePickerStory = ({
  value: initialValue = EMPTY_TIME,
  onChange,
  isError = false,
  ...args
}: TimePickerStoryProps) => {
  const [value, setValue] = useState<TimeValue>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <TimePicker
      {...args}
      value={value}
      isError={isError}
      onChange={(next) => {
        action('onChange')(next);
        onChange?.(next);
        setValue(next);
      }}
    >
      {isError && <TimePicker.ErrorMessage>時刻を選択してください。</TimePicker.ErrorMessage>}
    </TimePicker>
  );
};

export const Component: Story = {
  args: {
    value: EMPTY_TIME,
    size: 'medium',
    minuteStep: 15,
    isDisabled: false,
    isError: false,
  },
  render: (args) => (
    <div className="flex">
      <TimePickerStory {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      <div className="flex flex-col items-start gap-4">
        <p className="typography-label14regular text-text02">Normal</p>
        <TimePickerStory size="x-small" value={{ hour: 9, minute: 30 }} />
        <TimePickerStory size="small" value={{ hour: 9, minute: 30 }} />
        <TimePickerStory size="medium" value={{ hour: 9, minute: 30 }} />
        <TimePickerStory size="large" value={{ hour: 9, minute: 30 }} />
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="typography-label14regular text-text02">Error</p>
        <TimePickerStory size="x-small" isError />
        <TimePickerStory size="small" isError />
        <TimePickerStory size="medium" isError />
        <TimePickerStory size="large" isError />
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="typography-label14regular text-text02">Disabled</p>
        <TimePickerStory size="x-small" isDisabled />
        <TimePickerStory size="small" isDisabled />
        <TimePickerStory size="medium" isDisabled />
        <TimePickerStory size="large" isDisabled />
      </div>
    </div>
  ),
};

export const MinuteStep: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '分候補の刻み。候補リストの最大高さは 250px 固定のため、minuteStep=1（60 候補）でもスクロール表示になる。',
      },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-1">
        <p className="typography-label14regular text-text02">minuteStep = 1（60 候補・リストは 250px でスクロール）</p>
        <TimePickerStory minuteStep={1} />
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="typography-label14regular text-text02">minuteStep = 5</p>
        <TimePickerStory minuteStep={5} />
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="typography-label14regular text-text02">minuteStep = 15（既定）</p>
        <TimePickerStory minuteStep={15} />
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="typography-label14regular text-text02">minuteStep = 30</p>
        <TimePickerStory minuteStep={30} />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: {
    value: EMPTY_TIME,
    isError: true,
    size: 'medium',
  },
  render: (args) => (
    <div className="flex">
      <TimePickerStory {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: { hour: 9, minute: 30 },
    isDisabled: true,
    size: 'medium',
  },
  render: (args) => (
    <div className="flex">
      <TimePickerStory {...args} />
    </div>
  ),
};

export const MinMax: Story = {
  parameters: {
    docs: {
      description: {
        story: 'minTime / maxTime で選択可能な範囲を制限する。範囲外の候補は非表示になる（例: 9:00〜17:30）。',
      },
    },
  },
  render: () => (
    <div className="flex">
      <TimePickerStory minTime="09:00" maxTime="17:30" value={{ hour: 12, minute: 0 }} />
    </div>
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'value は `{ hour, minute }` 構造体の制御コンポーネント。両方 null が未入力を表す。',
      },
    },
  },
  render: function ControlledStory() {
    const [value, setValue] = useState<TimeValue>({ hour: 9, minute: null });

    return (
      <div className="flex flex-col items-start gap-4">
        <TimePicker
          value={value}
          onChange={(next) => {
            action('onChange')(next);
            setValue(next);
          }}
        />
        <p className="typography-label14regular text-text02">
          value: {JSON.stringify(value)} / formatTime: {String(formatTime(value))}
        </p>
      </div>
    );
  },
};

export const WithDatePicker: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'DatePicker と並べて日時選択に使う例。日時を統合したい場合は、選択された日付と `{ hour, minute }` を利用側で合成して Date を組み立てる。',
      },
    },
  },
  render: function WithDatePickerStory() {
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<TimeValue>({ hour: null, minute: null });

    const combined =
      date != null && time.hour != null && time.minute != null
        ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hour, time.minute)
        : null;

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-start gap-4">
          <DatePicker
            value={date}
            size="medium"
            onChange={(next) => {
              action('onChange:date')(next);
              setDate(next);
            }}
          />
          <TimePicker
            value={time}
            size="medium"
            onChange={(next) => {
              action('onChange:time')(next);
              setTime(next);
            }}
          />
        </div>
        <p className="typography-label14regular text-text02">
          合成した日時: {combined != null ? combined.toString() : '未確定'}
        </p>
      </div>
    );
  },
};
