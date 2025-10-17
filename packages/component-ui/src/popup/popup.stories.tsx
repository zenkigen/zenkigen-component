import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Tab } from '../tab';
import { Popup } from '.';

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
    // layout: 'centered',
  },
  argTypes: {
    width: { control: 'text', description: '幅（320px以上が指定できる）' },
    height: { control: 'text', description: '高さ（184px以上が指定できる）' },
    maxWidth: { control: 'text', description: '最大幅' },
    onClose: { action: 'onClose', description: '閉じる操作が発生したときのコールバック' },
  },
};

type Story = StoryObj<typeof Popup>;

export default meta;

export const Component: Story = {
  args: {
    width: 480,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup width={args.width} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full items-center justify-center py-20">Content</div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full flex-wrap items-center justify-end gap-4">
            <Button variant="outline" size="large" onClick={action('キャンセル')}>
              キャンセル
            </Button>
            <Button variant="fill" size="large" onClick={action('保存する')}>
              保存する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};

export const Base: Story = {
  args: {
    width: 480,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup width={args.width} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full items-center justify-center py-20">Content</div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full flex-wrap items-center justify-end gap-4">
            <Button variant="outline" size="large" onClick={action('キャンセル')}>
              キャンセル
            </Button>
            <Button variant="fill" size="large" onClick={action('保存する')}>
              保存する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};

export const WithCheckbox: Story = {
  args: {
    width: 480,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <Popup width={args.width} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full items-center justify-center py-20">Content</div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-wrap items-center">
              <Checkbox
                id="dialog-checkbox"
                label="ラベル"
                isChecked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-end gap-4">
              <Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Button>
              <Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Button>
            </div>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};

export const WithSubButton: Story = {
  args: {
    width: 480,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup width={args.width} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full items-center justify-center py-20">Content</div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-wrap items-center">
              <Button variant="text" size="large" onClick={action('ボタンラベル')}>
                ボタンラベル
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-4">
              <Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Button>
              <Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Button>
            </div>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};

export const FixedHeight: Story = {
  args: {
    width: 480,
    height: 500,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup width={args.width} height={args.height} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full items-center justify-center py-20">Content</div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full flex-wrap items-center justify-end gap-4">
            <Button variant="outline" size="large" onClick={action('キャンセル')}>
              キャンセル
            </Button>
            <Button variant="fill" size="large" onClick={action('保存する')}>
              保存する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};

export const WithTabs: Story = {
  args: {
    width: 480,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    const [selectedTab, setSelectedTab] = useState('tab1');
    const tabItems = [
      { id: 'tab1', label: 'タブラベル1' },
      { id: 'tab2', label: 'タブラベル2' },
      { id: 'tab3', label: 'タブラベル3' },
    ];

    return (
      <Popup width={args.width} onClose={args.onClose}>
        <Popup.Header isNoBorder>タイトル</Popup.Header>
        <Popup.Body>
          <div className="mt-2 flex w-full flex-col">
            <div className="w-full">
              <Tab>
                {tabItems.map((item) => (
                  <Tab.Item key={item.id} id={item.id} isSelected={selectedTab === item.id} onClick={setSelectedTab}>
                    {item.label}
                  </Tab.Item>
                ))}
              </Tab>
            </div>
            <div className="flex w-full items-center justify-center py-20">
              {selectedTab === 'tab1' && <div>Content 1</div>}
              {selectedTab === 'tab2' && <div>Content 2</div>}
              {selectedTab === 'tab3' && <div>Content 3</div>}
            </div>
          </div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full flex-wrap items-center justify-end gap-4">
            <Button variant="outline" size="large" onClick={action('キャンセル')}>
              キャンセル
            </Button>
            <Button variant="fill" size="large" onClick={action('保存する')}>
              保存する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};

export const WithoutButton: Story = {
  args: {
    width: 480,
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup width={args.width} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full items-center justify-center py-20">Content</div>
        </Popup.Body>
      </Popup>
    );
  },
};

export const Danger: Story = {
  args: {
    width: 420,
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup width={args.width} onClose={args.onClose}>
        <Popup.Header isNoBorder>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex h-16 w-full items-center justify-center">Content</div>
        </Popup.Body>
        <Popup.Footer isNoBorder>
          <div className="flex w-full flex-wrap items-center justify-end gap-4">
            <Button variant="outline" size="large" onClick={action('キャンセル')}>
              キャンセル
            </Button>
            <Button variant="fillDanger" size="large" onClick={action('削除する')}>
              削除する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};
