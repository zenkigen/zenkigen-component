import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../button';
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
    isVisible: {
      control: { type: 'boolean' },
      description: 'Popoverの表示/非表示',
    },
    shouldAvoidCollisions: {
      control: { type: 'boolean' },
      description: '衝突回避を有効にするかどうか',
    },
    offset: {
      control: { type: 'number' },
      description: 'アンカー要素からのオフセット（ピクセル）',
    },
    anchorRef: {
      description: '配置の基準となる要素のref',
    },
  },
};

type Story = StoryObj<typeof Popover>;

export default meta;

// 共通のPopoverコンテンツコンポーネント
const SamplePopoverContent = () => (
  <div className="bg-slate-100 p-2">
    <p className="mb-2 font-semibold">Popoverのコンテンツ</p>
    <p className="text-text02">
      ここにPopoverの内容を表示します。
      <br />
      複数行のテキストも表示可能です。
    </p>
  </div>
);

const ComponentStory = (args: Story['args']) => {
  const anchorElementRef = useRef<HTMLDivElement>(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleShowPopover = () => {
    setIsPopoverVisible(true);
  };

  const handleHidePopover = () => {
    setIsPopoverVisible(false);
  };

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
      <div
        ref={anchorElementRef}
        className="relative flex h-[150px] w-[400px] items-start justify-start border border-gray-300 p-4"
      >
        基準要素
        <div className="absolute left-0 top-0 flex size-full items-center justify-center gap-2">
          <Button variant="fill" onClick={handleShowPopover}>
            Popoverを表示
          </Button>
          <Button variant="outline" onClick={handleHidePopover}>
            Popoverを非表示
          </Button>
        </div>
      </div>

      <Popover {...args} anchorRef={anchorElementRef} isVisible={isPopoverVisible}>
        <SamplePopoverContent />
      </Popover>
    </div>
  );
};

export const Component: Story = {
  args: {
    placement: 'top',
    shouldAvoidCollisions: true,
    offset: 8,
  },
  render: ComponentStory,
};
