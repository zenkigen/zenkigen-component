import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../button';
import { Popup } from '../popup';
import { Select } from '../select';
import { Popover } from '.';

// 定数の抽出
const ALL_PLACEMENTS = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end',
] as const;

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
  argTypes: {
    placement: {
      options: ALL_PLACEMENTS,
      control: { type: 'select' },
      description: 'Popoverの配置位置',
    },
    isOpen: {
      control: { type: 'boolean' },
      description: 'Popoverの表示/非表示',
    },
    offset: {
      control: { type: 'number' },
      description: 'トリガー要素とPopoverコンテンツとの間隔（ピクセル単位）',
    },
    onOutsideClick: {
      action: 'outsideClicked',
      description: 'Popoverの外側をクリックした時に呼び出されるコールバック関数',
    },
    onEscapeKeyDown: {
      action: 'escapeKeyPressed',
      description: 'Escapeキーが押された時に呼び出されるコールバック関数',
    },
  },
};

type Story = StoryObj<typeof Popover>;

export default meta;

// 共通のPopoverコンテンツコンポーネント
const SamplePopoverContent = () => (
  <div className="rounded-lg bg-slate-200 p-4">
    <p className="mb-2 text-sm font-semibold text-text01">Popoverのコンテンツ</p>
    <p className="text-xs text-text02">
      ここにPopoverの内容を表示します。
      <br />
      複数行のテキストも表示可能です。
    </p>
  </div>
);

const ComponentStory = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <Popover
        isOpen={isOpen}
        placement={args?.placement ?? 'top'}
        onOutsideClick={() => setIsOpen(false)}
        onEscapeKeyDown={() => setIsOpen(false)}
      >
        <Popover.Trigger>
          <Button variant="fill" onClick={() => setIsOpen((value) => !value)}>
            {isOpen ? 'Popoverを非表示' : 'Popoverを表示'}
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <SamplePopoverContent />
        </Popover.Content>
      </Popover>
    </div>
  );
};

export const Component: Story = {
  args: {
    placement: 'top',
  },
  render: ComponentStory,
};

// Popover + Popup 連携ストーリー
const PopoverWithPopupStory = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-[700px] flex-col items-center justify-center gap-4">
      <Popover
        isOpen={isOpen}
        placement={args?.placement ?? 'bottom'}
        onOutsideClick={() => setIsOpen(false)}
        onEscapeKeyDown={() => setIsOpen(false)}
      >
        <Popover.Trigger>
          <Button variant="fill" onClick={() => setIsOpen((value) => !value)}>
            {isOpen ? 'Popoverを非表示' : 'Popoverを表示'}
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          {/* Popup は PopoverContext の状態を自動的に使用 */}
          <Popup width={400} onClose={() => setIsOpen(false)}>
            <Popup.Header>Popup in Popover</Popup.Header>
            <Popup.Body>
              <div className="flex w-full flex-col gap-2 p-4">
                <p className="text-sm text-text01">
                  この Popup は Popover 内で使用されており、
                  <br />
                  PopoverContext の開閉状態を自動的に継承しています。
                </p>
                <p className="text-xs text-text02">
                  ヘッダーの閉じるボタンをクリックすると、
                  <br />
                  Popover も一緒に閉じます。
                </p>
              </div>
            </Popup.Body>
            <Popup.Footer>
              <div className="flex w-full flex-wrap items-center justify-end gap-4">
                <Button variant="outline" size="large" onClick={() => setIsOpen(false)}>
                  閉じる
                </Button>
                <Button variant="fill" size="large">
                  保存する
                </Button>
              </div>
            </Popup.Footer>
          </Popup>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export const WithPopup: Story = {
  args: {
    placement: 'top',
  },
  render: PopoverWithPopupStory,
};

// Popover + Select 連携ストーリー（不具合修正の検証用）
const PopoverWithSelectStory = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ id: string; value: string; label: string } | null>(null);

  const options = [
    { id: '1', value: 'option1', label: 'オプション1' },
    { id: '2', value: 'option2', label: 'オプション2' },
    { id: '3', value: 'option3', label: 'オプション3' },
    { id: '4', value: 'option4', label: 'オプション4' },
    { id: '5', value: 'option5', label: 'オプション5' },
  ];

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Popover
        isOpen={isOpen}
        placement={args?.placement ?? 'bottom'}
        onOutsideClick={() => setIsOpen(false)}
        onEscapeKeyDown={() => setIsOpen(false)}
      >
        <Popover.Trigger>
          <Button variant="fill" onClick={() => setIsOpen((value) => !value)}>
            {isOpen ? 'Popoverを非表示' : 'Popoverを表示'}
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="rounded-lg bg-uiBackground01 p-4 shadow-floatingShadow" style={{ width: '320px' }}>
            <p className="mb-4 font-bold text-text01">Popover内のSelect</p>
            <div className="mb-4">
              <p className="typography-label12regular mb-2 text-text02">選択してください</p>
              <Select
                size="medium"
                placeholder="オプションを選択"
                selectedOption={selectedOption}
                onChange={setSelectedOption}
                optionListMaxHeight="200px"
              >
                {options.map((option) => (
                  <Select.Option key={option.id} option={option} />
                ))}
              </Select>
            </div>
            {selectedOption !== null && (
              <p className="typography-label12regular text-text02">
                選択中: <span className="font-semibold">{selectedOption.label}</span>
              </p>
            )}
            <p className="typography-label12regular mt-4 text-text03">
              Selectのドロップダウンをクリックしても
              <br />
              Popoverが閉じないことを確認してください。
            </p>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export const WithSelect: Story = {
  args: {
    placement: 'bottom',
  },
  render: PopoverWithSelectStory,
  parameters: {
    docs: {
      description: {
        story:
          'Popover内にSelectを配置した例です。Selectのドロップダウンリストからオプションを選択しても、Popoverが閉じないことを確認できます。',
      },
    },
  },
};

// Popover + Popup 連携ストーリー（閉じるボタンなし、外部クリック・Escapeキーで閉じない）
const PopoverWithPopupNoCloseStory = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-[700px] flex-col items-center justify-center gap-4">
      <Popover
        isOpen={isOpen}
        placement={args?.placement ?? 'bottom'}
        // onOutsideClick と onEscapeKeyDown を設定しないことで、外部クリック・Escapeキーで閉じない
      >
        <Popover.Trigger>
          <Button variant="fill" onClick={() => setIsOpen((value) => !value)}>
            {isOpen ? 'Popoverを非表示' : 'Popoverを表示'}
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          {/* Popup は onClose を渡さないことで閉じるボタンなし */}
          <Popup width={400}>
            <Popup.Header>確認ダイアログ（閉じるボタンなし）</Popup.Header>
            <Popup.Body>
              <div className="flex w-full flex-col gap-2 p-4">
                <p className="text-sm text-text01">このダイアログは以下の特徴があります：</p>
                <ul className="text-xs text-text02">
                  <li>• ヘッダーに閉じるボタンがありません</li>
                  <li>• 外部クリックでは閉じません</li>
                  <li>• Escapeキーでは閉じません</li>
                </ul>
              </div>
            </Popup.Body>
          </Popup>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export const WithPopupNoClose: Story = {
  args: {
    placement: 'top',
  },
  render: PopoverWithPopupNoCloseStory,
  parameters: {
    docs: {
      description: {
        story:
          'Popover内にPopupを配置し、閉じるボタンなし、外部クリック・Escapeキーで閉じない例です。フッターのボタンでのみ閉じることができます。',
      },
    },
  },
};
