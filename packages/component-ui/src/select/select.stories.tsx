import type { Meta, StoryObj } from '@storybook/react';
import type { IconName } from '@zenkigen-inc/component-icons';
import { iconElements } from '@zenkigen-inc/component-icons';
import { useState } from 'react';

import { Select } from './select';
import type { SelectOption } from './type';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: {
      description: 'サイズ',
    },
    variant: {
      description: 'バリエーション',
    },
    width: {
      type: 'string',
      description: '幅',
    },
    maxWidth: {
      type: 'string',
      description: '最大幅',
    },
    optionListMaxHeight: {
      type: 'string',
      description: 'オプションリストの最大高さ',
    },
    placeholder: {
      type: 'string',
      description: 'placeholderのテキスト',
    },
    placeholderIcon: {
      options: Object.keys(iconElements)
        .map((iconName) => iconName)
        .concat(['']),
      control: 'select',
      description: 'placeholderのアイコン',
    },
    isOptionSelected: {
      type: 'boolean',
      description: '選択状態の見た目にするかどうか（selectedOption が指定されている場合のみ有効）',
    },
    isError: {
      type: 'boolean',
      description: 'エラー状態',
    },
    isDisabled: {
      type: 'boolean',
      description: '無効化の状態',
    },
    selectedOption: {
      description: '選択されたオプション',
    },
    children: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

const optionsList = [
  { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
  { id: '2', label: '選択肢B', value: 'B', icon: 'warning' as IconName },
  { id: '3', label: '選択肢C', value: 'C', icon: 'volume' as IconName },
  { id: '4', label: '選択肢D', value: 'D', icon: 'video' as IconName },
  { id: '5', label: '選択肢E', value: 'E', icon: 'user' as IconName },
  { id: '6', label: '選択肢F', value: 'F', icon: 'upload' as IconName },
];

const optionsList2 = [
  { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
  {
    id: '2',
    label: '選択肢B',
    value: 'B',
    icon: 'warning' as IconName,
  },
  { id: '3', label: '選択肢C', value: 'C', icon: 'volume' as IconName },
  { id: '4', label: '選択肢D', value: 'D', icon: 'video' as IconName },
  { id: '5', label: '選択肢E', value: 'E', icon: 'user' as IconName },
  { id: '6', label: '選択肢F', value: 'F', icon: 'upload' as IconName },
];

export const Component: Story = {
  args: {
    // eslint-disable-next-line no-undefined
    placeholderIcon: undefined,
    placeholder: '選択',
    size: 'medium',
    variant: 'outline',
    width: '100%',
    maxWidth: '',
    optionListMaxHeight: '130px',
    selectedOption: { id: '2', label: '選択肢B', value: 'B', icon: 'warning' as IconName },
    isOptionSelected: false,
    isError: false,
    isDisabled: false,
    children: (
      <>
        {optionsList2.map((option) => (
          <Select.Option key={option.id} option={option} />
        ))}
      </>
    ),
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function MyFunc(args) {
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

    return (
      <div style={{ height: '100px' }}>
        <Select {...args} selectedOption={selectedOption} onChange={(option) => setSelectedOption(option)} />
      </div>
    );
  },
};

export function Base() {
  const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<SelectOption | null>(null);

  return (
    <>
      <div style={{ display: 'grid', rowGap: '180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption1}
            onChange={(option) => setSelectedOption1(option)}
            optionListMaxHeight={120}
          >
            {optionsList2.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="small"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption2}
            onChange={(option) => setSelectedOption2(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="medium"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption3}
            onChange={(option) => setSelectedOption3(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            isDisabled
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption1}
            onChange={(option) => setSelectedOption1(option)}
            optionListMaxHeight={120}
          >
            {optionsList2.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="small"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption2}
            onChange={(option) => setSelectedOption2(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="medium"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption3}
            onChange={(option) => setSelectedOption3(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="text"
            placeholder="選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            isDisabled
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption1}
            onChange={(option) => setSelectedOption1(option)}
            width={140}
            optionListMaxHeight={120}
          >
            {optionsList2.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="small"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption2}
            onChange={(option) => setSelectedOption2(option)}
            width={140}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="medium"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption3}
            onChange={(option) => setSelectedOption3(option)}
            width={140}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            width={140}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            width={140}
            isDisabled
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}

export const IsOptionSelected: Story = {
  args: {
    isOptionSelected: true,
    isError: false,
  },
  argTypes: {
    size: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    width: {
      table: { disable: true },
    },
    maxWidth: {
      table: { disable: true },
    },
    optionListMaxHeight: {
      table: { disable: true },
    },
    placeholder: {
      table: { disable: true },
    },
    placeholderIcon: {
      table: { disable: true },
    },
    isDisabled: {
      table: { disable: true },
    },
    selectedOption: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  render: function MyFunc(args) {
    const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>({
      id: '3',
      label: '選択肢C',
      value: 'C',
      icon: 'volume' as IconName,
    });
    const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>({
      id: '2',
      label: '選択肢B',
      value: 'B',
      icon: 'add' as IconName,
    });
    const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>({
      id: '2',
      label: '選択肢B',
      value: 'B',
      icon: 'add' as IconName,
    });
    const [selectedOption4, setSelectedOption4] = useState<SelectOption | null>({
      id: '2',
      label: '選択肢B',
      value: 'B',
      icon: 'add' as IconName,
    });

    return (
      <>
        <div style={{ display: 'grid', rowGap: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <Select
              {...args}
              size="x-small"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption1}
              onChange={(option) => setSelectedOption1(option)}
              optionListMaxHeight={120}
            >
              {optionsList2.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="small"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption2}
              onChange={(option) => setSelectedOption2(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="medium"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption3}
              onChange={(option) => setSelectedOption3(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
              isDisabled
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <Select
              {...args}
              size="x-small"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption1}
              onChange={(option) => setSelectedOption1(option)}
              optionListMaxHeight={120}
            >
              {optionsList2.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="small"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption2}
              onChange={(option) => setSelectedOption2(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="medium"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption3}
              onChange={(option) => setSelectedOption3(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
              isDisabled
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </div>
        </div>
      </>
    );
  },
};

export const IsError: Story = {
  args: {
    isError: true,
    isOptionSelected: false,
  },
  argTypes: {
    size: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
    width: {
      table: { disable: true },
    },
    maxWidth: {
      table: { disable: true },
    },
    optionListMaxHeight: {
      table: { disable: true },
    },
    placeholder: {
      table: { disable: true },
    },
    placeholderIcon: {
      table: { disable: true },
    },
    isDisabled: {
      table: { disable: true },
    },
    selectedOption: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  render: function MyFunc(args) {
    const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>(null);
    const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>(null);
    const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>(null);
    const [selectedOption4, setSelectedOption4] = useState<SelectOption | null>(null);

    return (
      <>
        <div style={{ display: 'grid', rowGap: '180px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <Select
              {...args}
              size="x-small"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption1}
              onChange={(option) => setSelectedOption1(option)}
              optionListMaxHeight={120}
            >
              {optionsList2.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="small"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption2}
              onChange={(option) => setSelectedOption2(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="medium"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption3}
              onChange={(option) => setSelectedOption3(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="outline"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
              isDisabled
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
            <Select
              {...args}
              size="x-small"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption1}
              onChange={(option) => setSelectedOption1(option)}
              optionListMaxHeight={120}
            >
              {optionsList2.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="small"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption2}
              onChange={(option) => setSelectedOption2(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="medium"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption3}
              onChange={(option) => setSelectedOption3(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
            <Select
              {...args}
              size="large"
              variant="text"
              placeholder="選択"
              selectedOption={selectedOption4}
              onChange={(option) => setSelectedOption4(option)}
              isDisabled
            >
              {optionsList.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </div>
        </div>
      </>
    );
  },
};

export function MaxWidth() {
  const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<SelectOption | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>(null);
  const [selectedOption4, setSelectedOption4] = useState<SelectOption | null>(null);
  const maxWidth = 190;

  return (
    <>
      <div>
        <div className="flex flex-col items-start gap-4">
          <Select
            size="x-small"
            variant="outline"
            placeholder="選択選"
            selectedOption={selectedOption1}
            onChange={(option) => setSelectedOption1(option)}
            maxWidth={maxWidth}
          >
            {optionsList2.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="small"
            variant="outline"
            placeholder="選択選択選択選択"
            selectedOption={selectedOption2}
            onChange={(option) => setSelectedOption2(option)}
            maxWidth={maxWidth}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="medium"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption3}
            onChange={(option) => setSelectedOption3(option)}
            maxWidth={maxWidth}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
          <Select
            size="large"
            variant="outline"
            placeholder="選択選択選択選択選択"
            selectedOption={selectedOption4}
            onChange={(option) => setSelectedOption4(option)}
            maxWidth={maxWidth}
          >
            {optionsList.map((option) => (
              <Select.Option key={option.id} option={option} />
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}
