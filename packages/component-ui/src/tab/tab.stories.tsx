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
  parameters: {
    chromatic: { disable: true },
  },
  render: function MyFunc() {
    const [selectedTab, setSelectedTab] = useState('tab1');

    return (
      <Tab>
        <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
          タブラベル
        </Tab.Item>
        <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
          タブラベル
        </Tab.Item>
        <Tab.Item id="tab3" isSelected={selectedTab === 'tab3'} onClick={setSelectedTab} isDisabled>
          タブラベル
        </Tab.Item>
      </Tab>
    );
  },
};

export const ComponentItem: Story = {
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

export function LayoutExamples() {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <Tab>
          <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
            発言別
          </Tab.Item>
          <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
            カテゴリ別
          </Tab.Item>
          <Tab.Item id="tab3" isSelected={selectedTab === 'tab3'} onClick={setSelectedTab}>
            面談担当者別
          </Tab.Item>
        </Tab>
      </div>
      <div className="flex flex-col items-start gap-4">
        <Tab>
          <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
            発言別
          </Tab.Item>
          <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
            カテゴリ別
          </Tab.Item>
          <Tab.Item id="tab3" isSelected={selectedTab === 'tab3'} onClick={setSelectedTab}>
            面談担当者別
          </Tab.Item>
        </Tab>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Tab>
          <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
            発言別
          </Tab.Item>
          <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
            カテゴリ別
          </Tab.Item>
          <Tab.Item id="tab3" isSelected={selectedTab === 'tab3'} onClick={setSelectedTab}>
            面談担当者別
          </Tab.Item>
        </Tab>
      </div>
      <div className="flex flex-col items-end gap-4">
        <Tab>
          <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab}>
            発言別
          </Tab.Item>
          <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab}>
            カテゴリ別
          </Tab.Item>
          <Tab.Item id="tab3" isSelected={selectedTab === 'tab3'} onClick={setSelectedTab}>
            面談担当者別
          </Tab.Item>
        </Tab>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Tab>
          <Tab.Item id="tab1" isSelected={selectedTab === 'tab1'} onClick={setSelectedTab} minWidth="160px">
            発言別
          </Tab.Item>
          <Tab.Item id="tab2" isSelected={selectedTab === 'tab2'} onClick={setSelectedTab} minWidth="160px">
            カテゴリ別
          </Tab.Item>
          <Tab.Item id="tab3" isSelected={selectedTab === 'tab3'} onClick={setSelectedTab} minWidth="160px">
            面談担当者別
          </Tab.Item>
        </Tab>
      </div>
    </div>
  );
}
