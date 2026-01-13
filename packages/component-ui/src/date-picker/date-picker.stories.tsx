import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { action } from 'storybook/actions';

import { DatePicker } from '.';
import type { DatePickerProps } from './date-picker.types';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

type DatePickerStoryProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value?: Date | null;
  onChange?: DatePickerProps['onChange'];
};

const DatePickerStory = ({ value: initialValue = null, onChange, isError = false, ...args }: DatePickerStoryProps) => {
  const [value, setValue] = useState<Date | null>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <DatePicker
      {...args}
      value={value}
      isError={isError}
      onChange={(nextValue) => {
        action('onChange')(nextValue);
        onChange?.(nextValue);
        setValue(nextValue);
      }}
    >
      {isError && <DatePicker.ErrorMessage>入力内容にエラーがあります</DatePicker.ErrorMessage>}
    </DatePicker>
  );
};

export const Default: Story = {
  args: {
    value: null,
    placeholder: '日付を選択',
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => <DatePickerStory {...args} />,
};

export const Open: Story = {
  args: {
    value: null,
    placeholder: '日付を選択',
    size: 'medium',
    timeZone: 'UTC',
  },
  render: function OpenStory({ value: initialValue = null, ...args }) {
    const [value, setValue] = useState<Date | null>(initialValue);

    useEffect(() => {
      const trigger = document.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]');
      trigger?.click();
    }, []);

    return (
      <DatePicker
        {...args}
        value={value}
        onChange={(nextValue) => {
          action('onChange')(nextValue);
          setValue(nextValue);
        }}
      />
    );
  },
};

export const Selected: Story = {
  args: {
    value: new Date('2026-01-12T00:00:00Z'),
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => <DatePickerStory {...args} />,
};

export const Disabled: Story = {
  args: {
    value: null,
    isDisabled: true,
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => <DatePickerStory {...args} />,
};

export const Error: Story = {
  args: {
    value: new Date('2026-01-12T00:00:00Z'),
    isError: true,
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => <DatePickerStory {...args} />,
};

export const TimeZoneTokyo: Story = {
  args: {
    value: new Date('2026-01-01T00:00:00+09:00'),
    size: 'medium',
    timeZone: 'Asia/Tokyo',
  },
  render: (args) => <DatePickerStory {...args} />,
};

export const MinMax: Story = {
  args: {
    value: new Date('2026-01-12T00:00:00Z'),
    min: new Date('2026-01-05T00:00:00Z'),
    max: new Date('2026-01-20T00:00:00Z'),
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => <DatePickerStory {...args} />,
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePickerStory size="small" />
      <DatePickerStory size="medium" />
      <DatePickerStory size="large" />
    </div>
  ),
};
