import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Button } from '../button';
import { Tab } from '.';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
  argTypes: {
    layout: { control: 'radio', options: ['auto', 'equal'] },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabExample = ({
  layout = 'auto',
  children,
  onChange,
}: {
  layout?: 'auto' | 'equal';
  children: React.ReactNode;
  onChange?: (value: string) => void;
}) => {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <Tab layout={layout}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Tab.Item) {
          type TabItemProps = {
            id: string;
            isDisabled?: boolean;
            onClick?: (id: string) => void;
            isSelected?: boolean;
          };

          const props = child.props as TabItemProps;

          return React.cloneElement(child as React.ReactElement<TabItemProps>, {
            // eslint-disable-next-line react/prop-types
            isSelected: selectedTab === props.id,
            onClick: (id: string) => {
              setSelectedTab(id);
              onChange?.(id);
            },
          });
        }

        return child;
      })}
    </Tab>
  );
};

export const Component: Story = {
  args: {
    layout: 'auto',
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function MyFunc(args) {
    const [selectedTab, setSelectedTab] = useState('tab1');
    const [disabledTab, setDisabledTab] = useState('tab3');

    return (
      <div className="flex flex-col gap-5">
        <Tab {...args}>
          <Tab.Item
            id="tab1"
            isSelected={selectedTab === 'tab1'}
            onClick={setSelectedTab}
            isDisabled={disabledTab === 'tab1'}
          >
            短い
          </Tab.Item>
          <Tab.Item
            id="tab2"
            isSelected={selectedTab === 'tab2'}
            onClick={setSelectedTab}
            isDisabled={disabledTab === 'tab2'}
          >
            中程度のタブ
          </Tab.Item>
          <Tab.Item
            id="tab3"
            isSelected={selectedTab === 'tab3'}
            onClick={setSelectedTab}
            isDisabled={disabledTab === 'tab3'}
          >
            とても長いタブのテキスト
          </Tab.Item>
        </Tab>
        <div className="flex flex-col gap-5">
          <div className="typography-label12regular">
            {selectedTab === 'tab1' && '「短い」が選択されています'}
            {selectedTab === 'tab2' && '「中程度のタブ」が選択されています'}
            {selectedTab === 'tab3' && '「とても長いタブのテキスト」が選択されています'}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                setDisabledTab('tab1');
              }}
            >
              「短い」を無効にする
            </Button>
            <Button
              onClick={() => {
                setDisabledTab('tab2');
              }}
            >
              「中程度のタブ」を無効にする
            </Button>
            <Button
              onClick={() => {
                setDisabledTab('tab3');
              }}
            >
              「とても長いタブのテキスト」を無効にする
            </Button>
            <Button
              onClick={() => {
                setDisabledTab('');
              }}
            >
              無効を解除
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const LayoutAutoExample: Story = {
  args: {
    layout: 'auto',
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <div className="flex items-center justify-center">
      <TabExample {...args}>
        <Tab.Item id="tab1" onClick={() => {}}>
          短い
        </Tab.Item>
        <Tab.Item id="tab2" onClick={() => {}}>
          中程度のタブ
        </Tab.Item>
        <Tab.Item id="tab3" onClick={() => {}}>
          とても長いタブのテキスト
        </Tab.Item>
      </TabExample>
    </div>
  ),
};

export const LayoutEqualExample: Story = {
  args: {
    layout: 'equal',
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <div className="flex items-center justify-center">
      <TabExample {...args}>
        <Tab.Item id="tab1" onClick={() => {}}>
          短い
        </Tab.Item>
        <Tab.Item id="tab2" onClick={() => {}}>
          中程度のタブ
        </Tab.Item>
        <Tab.Item id="tab3" onClick={() => {}}>
          とても長いタブのテキスト
        </Tab.Item>
      </TabExample>
    </div>
  ),
};

export const LayoutExamples: Story = {
  args: {
    layout: 'auto',
    children: <></>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div>
      <div className="flex w-full flex-col items-center gap-5 p-5">
        <TabExample layout="auto">
          <Tab.Item id="tab1" onClick={() => {}}>
            短い
          </Tab.Item>
          <Tab.Item id="tab2" onClick={() => {}}>
            中程度のタブ
          </Tab.Item>
          <Tab.Item id="tab3" onClick={() => {}}>
            とても長いタブのテキスト
          </Tab.Item>
        </TabExample>

        <TabExample layout="equal">
          <Tab.Item id="tab4" onClick={() => {}}>
            短い
          </Tab.Item>
          <Tab.Item id="tab5" onClick={() => {}}>
            中程度のタブ
          </Tab.Item>
          <Tab.Item id="tab6" onClick={() => {}}>
            とても長いタブのテキスト
          </Tab.Item>
        </TabExample>
      </div>
      <div className="flex w-full flex-col gap-5 p-5">
        <TabExample layout="auto">
          <Tab.Item id="tab1" onClick={() => {}}>
            短い
          </Tab.Item>
          <Tab.Item id="tab2" onClick={() => {}}>
            中程度のタブ
          </Tab.Item>
          <Tab.Item id="tab3" onClick={() => {}}>
            とても長いタブのテキスト
          </Tab.Item>
        </TabExample>

        <TabExample layout="equal">
          <Tab.Item id="tab4" onClick={() => {}}>
            短い
          </Tab.Item>
          <Tab.Item id="tab5" onClick={() => {}}>
            中程度のタブ
          </Tab.Item>
          <Tab.Item id="tab6" onClick={() => {}}>
            とても長いタブのテキスト
          </Tab.Item>
        </TabExample>
      </div>
    </div>
  ),
};
