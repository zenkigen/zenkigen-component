import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Tab } from '../tab';
import { Modal } from '.';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
  argTypes: {
    width: { control: 'text', description: '幅（320px以上が指定できる）' },
    height: { control: 'text', description: '高さ（184px以上が指定できる）' },
    maxWidth: { control: 'text', description: '最大幅' },
    isOpen: { control: 'boolean', description: '開いているかどうか' },
    onClose: { action: 'onClose', description: '閉じる操作が発生したときのコールバック' },
    portalTargetRef: {
      control: 'text',
      description: 'ポータルのターゲット要素（指定がない場合は、document.body が使用される）',
    },
  },
};

type Story = StoryObj<typeof Modal>;

export default meta;

export const Component: Story = {
  args: {
    width: 480,
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsOpen(true)}>
          open
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex w-full items-center justify-center py-20">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full flex-wrap items-center justify-end gap-4">
              <Button
                variant="outline"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('キャンセル')(evt);
                }}
              >
                キャンセル
              </Button>
              <Button
                variant="fill"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('保存する')(evt);
                }}
              >
                保存する
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const Base: Story = {
  args: {
    width: 480,
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsOpen(true)}>
          open
        </Button>
        {Array.from({ length: 41 }, (_, i) => (
          <br key={i} />
        ))}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex w-full items-center justify-center py-20">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full flex-wrap items-center justify-end gap-4">
              <Button
                variant="outline"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('キャンセル')(evt);
                }}
              >
                キャンセル
              </Button>
              <Button
                variant="fill"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('保存する')(evt);
                }}
              >
                保存する
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const WithCheckbox: Story = {
  args: {
    width: 480,
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsOpen(true)}>
          open
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex w-full items-center justify-center py-20">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-between gap-4">
              <div className="flex flex-wrap items-center">
                <Checkbox
                  id="modal-checkbox"
                  label="ラベル"
                  isChecked={isChecked}
                  onChange={() => setIsChecked((prev) => !prev)}
                />
              </div>
              <div className="flex flex-wrap items-center justify-end gap-4">
                <Button
                  variant="outline"
                  size="large"
                  onClick={(evt) => {
                    setIsOpen(false);
                    action('キャンセル')(evt);
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  variant="fill"
                  size="large"
                  onClick={(evt) => {
                    setIsOpen(false);
                    action('保存する')(evt);
                  }}
                >
                  保存する
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const WithSubButton: Story = {
  args: {
    width: 480,
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsOpen(true)}>
          open
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex w-full items-center justify-center py-20">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-wrap items-center">
                <Button variant="text" size="large" onClick={action('ボタンラベル')}>
                  ボタンラベル
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-4">
                <Button
                  variant="outline"
                  size="large"
                  onClick={(evt) => {
                    setIsOpen(false);
                    action('キャンセル')(evt);
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  variant="fill"
                  size="large"
                  onClick={(evt) => {
                    setIsOpen(false);
                    action('保存する')(evt);
                  }}
                >
                  保存する
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const FixedHeight: Story = {
  args: {
    width: 480,
    height: 500,
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsOpen(true)}>
          open
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width={args.width} height={args.height}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex w-full items-center justify-center py-20">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full flex-wrap items-center justify-end gap-4">
              <Button
                variant="outline"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('キャンセル')(evt);
                }}
              >
                キャンセル
              </Button>
              <Button
                variant="fill"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('保存する')(evt);
                }}
              >
                保存する
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const WithTabs: Story = {
  args: {
    width: 480,
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState('tab1');
    const tabItems = [
      { id: 'tab1', label: 'タブラベル1' },
      { id: 'tab2', label: 'タブラベル2' },
      { id: 'tab3', label: 'タブラベル3' },
    ];

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsOpen(true)}>
          open
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width={args.width}>
          <Modal.Header isNoBorder>タイトル</Modal.Header>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full flex-wrap items-center justify-end gap-4">
              <Button
                variant="outline"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('キャンセル')(evt);
                }}
              >
                キャンセル
              </Button>
              <Button
                variant="fill"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('保存する')(evt);
                }}
              >
                保存する
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const WithoutButton: Story = {
  args: {
    width: 480,
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsOpen(true)}>
          open
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex w-full items-center justify-center py-20">Content</div>
          </Modal.Body>
        </Modal>
      </div>
    );
  },
};

export const Danger: Story = {
  args: {
    width: 420,
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsOpen(true)}>
          open
        </Button>
        <Modal isOpen={isOpen} width={args.width}>
          <Modal.Header isNoBorder>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-16 w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer isNoBorder>
            <div className="flex w-full flex-wrap items-center justify-end gap-4">
              <Button
                variant="outline"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('キャンセル')(evt);
                }}
              >
                キャンセル
              </Button>
              <Button
                variant="fillDanger"
                size="large"
                onClick={(evt) => {
                  setIsOpen(false);
                  action('削除する')(evt);
                }}
              >
                削除する
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};
