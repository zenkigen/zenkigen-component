import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { action } from 'storybook/actions';

import { DatePicker } from '.';
import type { DatePickerProps } from './date-picker';

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
      {isError && (
        <DatePicker.ErrorMessage>入力内容にエラーがあります。日付を選択してください。</DatePicker.ErrorMessage>
      )}
    </DatePicker>
  );
};

export const Component: Story = {
  args: {
    value: null,
    placeholder: '日付を選択',
    size: 'medium',
    timeZone: 'UTC',
    isDisabled: false,
    isError: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: (args) => (
    <div className="flex">
      <DatePickerStory {...args} />
    </div>
  ),
};

export const Default: Story = {
  args: {
    value: null,
    placeholder: '日付を選択',
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => (
    <div className="flex">
      <DatePickerStory {...args} />
    </div>
  ),
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
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        const trigger = container.querySelector<HTMLButtonElement>('button');
        trigger?.click();
      }
    }, []);

    return (
      <div ref={containerRef} className="flex">
        <DatePicker
          {...args}
          value={value}
          onChange={(nextValue) => {
            action('onChange')(nextValue);
            setValue(nextValue);
          }}
        />
      </div>
    );
  },
};

export const Selected: Story = {
  args: {
    value: new Date('2026-01-12T00:00:00Z'),
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => (
    <div className="flex">
      <DatePickerStory {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: null,
    isDisabled: true,
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => (
    <div className="flex">
      <DatePickerStory {...args} />
    </div>
  ),
};

export const SelectedDisabled: Story = {
  args: {
    value: new Date('2026-01-12T00:00:00Z'),
    isDisabled: true,
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => (
    <div className="flex">
      <DatePickerStory {...args} />
    </div>
  ),
};
export const Error: Story = {
  args: {
    value: new Date('2026-01-12T00:00:00Z'),
    isError: true,
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => (
    <div className="flex">
      <DatePickerStory {...args} />
    </div>
  ),
};

export const MinMax: Story = {
  args: {
    value: new Date('2026-01-12T00:00:00Z'),
    min: new Date('2026-01-05T00:00:00Z'),
    max: new Date('2026-01-20T00:00:00Z'),
    size: 'medium',
    timeZone: 'UTC',
  },
  render: (args) => (
    <div className="flex">
      <DatePickerStory {...args} />
    </div>
  ),
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8">
      <div className="flex flex-col items-start gap-4">
        <p className="typography-label14regular text-text02">Normal</p>
        <DatePickerStory size="small" />
        <DatePickerStory size="medium" />
        <DatePickerStory size="large" />
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="typography-label14regular text-text02">Disabled</p>
        <DatePickerStory size="small" isDisabled />
        <DatePickerStory size="medium" isDisabled />
        <DatePickerStory size="large" isDisabled />
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="typography-label14regular text-text02">Error</p>
        <DatePickerStory size="small" isError />
        <DatePickerStory size="medium" isError />
        <DatePickerStory size="large" isError />
      </div>
    </div>
  ),
};

export const LayoutExamples: Story = {
  render: () => (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex">
        <DatePickerStory size="large" />
      </div>
      <div className="w-[140px]">
        <DatePickerStory size="large" />
      </div>
      <div className="w-[280px]">
        <DatePickerStory size="large" />
      </div>
      <div className="w-full">
        <DatePickerStory size="large" />
      </div>
    </div>
  ),
};

export const LayoutExamplesWithError: Story = {
  render: () => (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="flex">
        <DatePickerStory size="large" isError />
      </div>
      <div className="w-[140px]">
        <DatePickerStory size="large" isError />
      </div>
      <div className="w-[280px]">
        <DatePickerStory size="large" isError />
      </div>
      <div className="w-full">
        <DatePickerStory size="large" isError />
      </div>
    </div>
  ),
};
