import { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Tab } from '../tab';

import { Modal } from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
  argTypes: {
    width: {
      type: 'number',
    },
  },
};

type Story = StoryObj<typeof Modal>;

const widthSmall = 320;
const widthMedium = 480;

export default meta;

export const Base: Story = {
  args: {
    width: widthMedium,
  },
  render: function MyFunc({ ...args }) {
    const [, setIsOpen] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal isOpen setIsOpen={setIsOpen} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-[200px] w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const WithCheckbox: Story = {
  args: {
    width: widthMedium,
  },
  render: function MyFunc({ ...args }) {
    const [_, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal isOpen setIsOpen={setIsOpen} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-[200px] w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterGroup type="checkbox">
              <Checkbox
                id="modal-checkbox"
                label="ラベル"
                isChecked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
              />
            </Modal.FooterGroup>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const WithSubButton: Story = {
  args: {
    width: widthMedium,
  },
  render: function MyFunc({ ...args }) {
    const [_, setIsOpen] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal isOpen setIsOpen={setIsOpen} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-[200px] w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer abc>
            <Modal.FooterGroup>
              <Button variant="text" size="large" onClick={action('ボタンラベル')}>
                ボタンラベル
              </Button>
            </Modal.FooterGroup>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const SizeSmall: Story = {
  args: {
    width: widthSmall,
  },
  render: function MyFunc({ ...args }) {
    const [_, setIsOpen] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal isOpen setIsOpen={setIsOpen} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-[200px] w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const SizeSmallWithCheckbox: Story = {
  args: {
    width: widthSmall,
  },
  render: function MyFunc({ ...args }) {
    const [_, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal isOpen setIsOpen={setIsOpen} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-[200px] w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterGroup type="checkbox">
              <Checkbox
                id="modal-checkbox"
                label="ラベル"
                isChecked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
              />
            </Modal.FooterGroup>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const SizeSmallWithSubButton: Story = {
  args: {
    width: widthSmall,
  },
  render: function MyFunc({ ...args }) {
    const [_, setIsOpen] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal
          isOpen
          setIsOpen={setIsOpen}
          width={args.width}
          // headerElement={}
        >
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-[200px] w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer abc>
            <Modal.FooterGroup>
              <Button variant="text" size="large" onClick={action('ボタンラベル')}>
                ボタンラベル
              </Button>
            </Modal.FooterGroup>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const FixedHeight: Story = {
  args: {
    width: widthMedium,
  },
  render: function MyFunc({ ...args }) {
    const [_, setIsOpen] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal
          isOpen
          setIsOpen={setIsOpen}
          width={args.width}
          height={500}
          // headerElement={}
        >
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-[800px] w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const WithTabs: Story = {
  args: {
    width: widthMedium,
  },
  render: function MyFunc({ ...args }) {
    const [_, setIsOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('tab1');
    const tabItems = [
      { id: 'tab1', label: 'タブラベル1' },
      { id: 'tab2', label: 'タブラベル2' },
      { id: 'tab3', label: 'タブラベル3' },
    ];
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal isOpen setIsOpen={setIsOpen} width={args.width}>
          <Modal.Header isNoBorder>タイトル</Modal.Header>
          <Modal.Tab>
            {tabItems.map((item) => (
              <Tab.Item key={item.id} id={item.id} isSelected={selectedTab === item.id} onClick={setSelectedTab}>
                {item.label}
              </Tab.Item>
            ))}
          </Modal.Tab>
          <Modal.Body>
            <div className="flex h-[200px] w-full items-center justify-center">
              {selectedTab === 'tab1' && <div>Content 1</div>}
              {selectedTab === 'tab2' && <div>Content 2</div>}
              {selectedTab === 'tab3' && <div>Content 3</div>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fill" size="large" onClick={action('保存する')}>
                保存する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const WithoutButton: Story = {
  args: {
    width: widthMedium,
  },
  render: function MyFunc({ ...args }) {
    const [_, setIsOpen] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal isOpen setIsOpen={setIsOpen} width={args.width}>
          <Modal.Header>タイトル</Modal.Header>
          <Modal.Body>
            <div className="flex h-[200px] w-full items-center justify-center">Content</div>
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
    const [_, setIsOpen] = useState(false);
    return (
      <div>
        <button type="button" onClick={() => setIsOpen(true)}>
          open
        </button>
        <Modal isOpen setIsOpen={setIsOpen} width={args.width}>
          <Modal.Header isNoBorder isNoCloseButton>
            タイトル
          </Modal.Header>
          <Modal.Body>
            <div className="flex h-16 w-full items-center justify-center">Content</div>
          </Modal.Body>
          <Modal.Footer isNoBorder>
            <Modal.FooterGroup>
              <Modal.Button variant="outline" size="large" onClick={action('キャンセル')}>
                キャンセル
              </Modal.Button>
              <Modal.Button variant="fillDanger" size="large" onClick={action('削除する')}>
                削除する
              </Modal.Button>
            </Modal.FooterGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};
