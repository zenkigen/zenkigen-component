import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Tab } from '.';

const meta: Meta<typeof Tab.Item> = {
  title: 'Components/Tabs',
  component: Tab.Item,
};

export default meta;
type Story = StoryObj<typeof Tab.Item>;

export const Component: Story = {
  args: {
    children: 'タブラベル',
    id: 'tab1',
    isSelected: true,
    isDisabled: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: (args) => (
    <Tab>
      <Tab.Item {...args} />
    </Tab>
  ),
};

export function Base() {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <Tab>
      <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
        タブラベル
      </Tab.Item>
      <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
        タブラベル
      </Tab.Item>
      <Tab.Item id="tab3" isDisabled onClick={setSelectedTab}>
        タブラベル
      </Tab.Item>
    </Tab>
  );
}
