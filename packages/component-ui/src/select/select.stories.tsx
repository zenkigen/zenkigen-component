import type { Meta } from '@storybook/react';
import type { IconName } from '@zenkigen-inc/component-icons';
import { iconElements } from '@zenkigen-inc/component-icons';
import { useState } from 'react';

import { Select } from './select';
import type { SelectOption } from './type';

const meta: Meta<typeof Select> = {
  component: Select,
  argTypes: {
    width: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
    },
    placeholderIcon: {
      options: Object.keys(iconElements)
        .map((iconName) => iconName)
        .concat(['']),
      control: 'select',
    },
    selectedOption: {
      type: 'string',
    },
  },
};
export default meta;

const optionsList = [
  { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
  { id: '2', label: '選択肢B', value: 'B', icon: 'add' as IconName },
  { id: '3', label: '選択肢C', value: 'C', icon: 'add' as IconName },
];

const optionsList2 = [
  { id: '1', label: '選択肢A', value: 'A', icon: 'add' as IconName },
  { id: '2', label: '選択肢B', value: 'B', icon: 'add' as IconName },
  { id: '3', label: '選択肢C', value: 'C', icon: 'add' as IconName },
  { id: '4', label: '選択肢D', value: 'D', icon: 'add' as IconName },
  { id: '5', label: '選択肢E', value: 'E', icon: 'add' as IconName },
  { id: '6', label: '選択肢F', value: 'F', icon: 'add' as IconName },
];

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

export function SelectedIconPosition() {
  const [selectedOption1, setSelectedOption1] = useState<SelectOption | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<SelectOption | null>(null);

  const optionsList: SelectOption[] = [
    { id: '1', label: '選択項目1', value: 'A' },
    { id: '2', label: '選択項目2', value: 'B' },
    { id: '3', label: '選択項目3', value: 'C' },
    { id: '4', label: '選択項目4', value: 'D' },
    { id: '5', label: '選択項目5', value: 'E' },
  ];

  const optionsList2: SelectOption[] = [
    { id: '1', label: '選択項目1', value: 'A' },
    { id: '2', label: '選択項目2', value: 'B' },
    { id: '3', label: '選択項目3', value: 'C', icon: 'add' as IconName },
    { id: '4', label: '選択項目4', value: 'D' },
    { id: '5', label: '選択項目5', value: 'E' },
  ];

  return (
    <>
      <div>
        <div className="flex flex-col items-start gap-6">
          <div className="font-bold">選択アイコン ✔ の位置：</div>
          <div className="flex gap-4">
            <div>
              <div className="text-center">左指定</div>
              <Select
                size="medium"
                variant="outline"
                placeholder="選択"
                selectedOption={selectedOption1}
                selectedIconPosition="left"
                onChange={(option) => setSelectedOption1(option)}
              >
                {optionsList.map((option) => (
                  <Select.Option key={option.id} option={option} />
                ))}
              </Select>
            </div>
            <div>
              <div className="text-center">右指定</div>
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
            </div>
          </div>

          <div>
            <div className="font-bold">選択アイコン ✔ の位置（optionにicon有り）：</div>
            <div>※ 左指定＋icon有りの場合は、右位置となる</div>
          </div>
          <div className="flex gap-4">
            <div>
              <div className="text-center">左指定</div>
              <Select
                size="medium"
                variant="outline"
                placeholder="選択"
                selectedOption={selectedOption1}
                selectedIconPosition="left"
                onChange={(option) => setSelectedOption1(option)}
              >
                {optionsList2.map((option) => (
                  <Select.Option key={option.id} option={option} />
                ))}
              </Select>
            </div>
            <div>
              <div className="text-center">右指定</div>
              <Select
                size="medium"
                variant="outline"
                placeholder="選択"
                selectedOption={selectedOption3}
                onChange={(option) => setSelectedOption3(option)}
              >
                {optionsList2.map((option) => (
                  <Select.Option key={option.id} option={option} />
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function IsSelectedForBaseColor() {
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
            isSelectedForBaseColor
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
