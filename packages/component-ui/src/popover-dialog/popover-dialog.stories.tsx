import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../button';
import { PopoverDialog } from '.';

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
      options: [
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
      ],
      control: { type: 'select' },
      description: 'Popoverの配置位置',
    },
    width: { control: 'text', description: '幅（320px以上が指定できる）' },
    shouldAvoidCollisions: {
      control: { type: 'boolean' },
      description: '衝突回避を有効にするかどうか',
    },
  },
};

type Story = StoryObj<typeof PopoverDialog>;

export default meta;

const ComponentStory = (args: Story['args']) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <div ref={buttonRef}>
        <Button variant="fill" onClick={handleOpenDialog}>
          Dialogを表示
        </Button>
      </div>
      <PopoverDialog {...args} anchorRef={buttonRef} isVisible={isDialogVisible} onClose={handleCloseDialog}>
        <PopoverDialog.Header>タイトル</PopoverDialog.Header>
        <PopoverDialog.Body>
          <div className="flex w-full items-center justify-center py-10">Content</div>
        </PopoverDialog.Body>
      </PopoverDialog>
    </div>
  );
};

export const Component: Story = {
  args: {
    placement: 'bottom',
    width: 480,
    shouldAvoidCollisions: false,
  },
  render: ComponentStory,
};
