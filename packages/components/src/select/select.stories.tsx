import { useState } from 'react';

import type { Meta } from '@storybook/react';
import { IconName, iconElements } from '@zenkigen-component/icons';

import { Select } from './select';

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
    selectedOptionId: {
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

export function Base() {
  const [selectedOptionId1, setSelectedOptionId1] = useState<string | null>(null);
  const [selectedOptionId2, setSelectedOptionId2] = useState<string | null>(null);
  const [selectedOptionId3, setSelectedOptionId3] = useState<string | null>(null);
  const [selectedOptionId4, setSelectedOptionId4] = useState<string | null>(null);

  return (
    <>
      <div style={{ display: 'grid', rowGap: '180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="outline"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId1}
            onChange={(id) => setSelectedOptionId1(id)}
          />
          <Select
            size="small"
            variant="outline"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId2}
            onChange={(id) => setSelectedOptionId2(id)}
          />
          <Select
            size="medium"
            variant="outline"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId3}
            onChange={(id) => setSelectedOptionId3(id)}
          />
          <Select
            size="large"
            variant="outline"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId4}
            onChange={(id) => setSelectedOptionId4(id)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="text"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId1}
            onChange={(id) => setSelectedOptionId1(id)}
          />
          <Select
            size="small"
            variant="text"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId2}
            onChange={(id) => setSelectedOptionId2(id)}
          />
          <Select
            size="medium"
            variant="text"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId3}
            onChange={(id) => setSelectedOptionId3(id)}
          />
          <Select
            size="large"
            variant="text"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId4}
            onChange={(id) => setSelectedOptionId4(id)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="outline"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId1}
            onChange={(id) => setSelectedOptionId1(id)}
            isDisabled
          />
          <Select
            size="small"
            variant="outline"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId2}
            onChange={(id) => setSelectedOptionId2(id)}
            isDisabled
          />
          <Select
            size="medium"
            variant="outline"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId3}
            onChange={(id) => setSelectedOptionId3(id)}
            isDisabled
          />
          <Select
            size="large"
            variant="outline"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId4}
            onChange={(id) => setSelectedOptionId4(id)}
            isDisabled
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="text"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId1}
            onChange={(id) => setSelectedOptionId1(id)}
            isDisabled
          />
          <Select
            size="small"
            variant="text"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId2}
            onChange={(id) => setSelectedOptionId2(id)}
            isDisabled
          />
          <Select
            size="medium"
            variant="text"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId3}
            onChange={(id) => setSelectedOptionId3(id)}
            isDisabled
          />
          <Select
            size="large"
            variant="text"
            options={optionsList}
            placeholder="選択"
            selectedOptionId={selectedOptionId4}
            onChange={(id) => setSelectedOptionId4(id)}
            isDisabled
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
          <Select
            size="x-small"
            variant="outline"
            options={optionsList}
            placeholder="選択選択選択選択選択"
            selectedOptionId={selectedOptionId1}
            onChange={(id) => setSelectedOptionId1(id)}
            width={140}
          />
          <Select
            size="small"
            variant="outline"
            options={optionsList}
            placeholder="選択選択選択選択選択"
            selectedOptionId={selectedOptionId2}
            onChange={(id) => setSelectedOptionId2(id)}
            width={140}
          />
          <Select
            size="medium"
            variant="outline"
            options={optionsList}
            placeholder="選択選択選択選択選択"
            selectedOptionId={selectedOptionId3}
            onChange={(id) => setSelectedOptionId3(id)}
            width={140}
          />
          <Select
            size="large"
            variant="outline"
            options={optionsList}
            placeholder="選択選択選択選択選択"
            selectedOptionId={selectedOptionId4}
            onChange={(id) => setSelectedOptionId4(id)}
            width={140}
          />
        </div>
      </div>
    </>
  );
}
