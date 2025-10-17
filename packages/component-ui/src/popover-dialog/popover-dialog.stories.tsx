import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../button';
import { PopoverDialog } from '.';

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

const meta: Meta<typeof PopoverDialog> = {
  title: 'Components/PopoverDialog',
  component: PopoverDialog,
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
    width: { control: 'text', description: '幅（320px以上が指定できる）' },
    shouldAvoidCollisions: {
      control: { type: 'boolean' },
      description: '衝突回避を有効にするかどうか',
    },
    anchorRef: {
      description: '配置の基準となる要素のref',
    },
  },
};

type Story = StoryObj<typeof PopoverDialog>;

export default meta;

const ComponentStory = (args: Story['args']) => {
  const anchorElementRef = useRef<HTMLDivElement>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
      <div
        ref={anchorElementRef}
        className="relative flex h-[150px] w-[400px] items-start justify-start border border-gray-300 p-4"
      >
        基準要素
        <div className="absolute left-0 top-0 flex size-full items-center justify-center gap-2">
          <Button variant="fill" onClick={handleOpenDialog}>
            Dialogを表示
          </Button>
          <Button variant="outline" onClick={handleCloseDialog}>
            Dialogを非表示
          </Button>
        </div>
      </div>

      <PopoverDialog {...args} anchorRef={anchorElementRef} isVisible={isDialogVisible} onClose={handleCloseDialog}>
        <PopoverDialog.Header isNoBorder>タイトル</PopoverDialog.Header>
        <PopoverDialog.Body>
          <div className="flex w-full items-center justify-center pb-6">Content</div>
        </PopoverDialog.Body>
      </PopoverDialog>
    </div>
  );
};

export const Component: Story = {
  args: {
    placement: 'top',
    width: 480,
    shouldAvoidCollisions: false,
  },
  render: ComponentStory,
};
