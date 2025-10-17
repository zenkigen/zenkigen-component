import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../button';
import { Popup } from '../popup';
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
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
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
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
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
    placement: 'bottom',
  },
  render: PopoverWithPopupStory,
};
