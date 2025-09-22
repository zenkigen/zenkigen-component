import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../button';
import { Dialog } from '../dialog';
import { Popover } from '.';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
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
    },
    isVisible: {
      control: { type: 'boolean' },
    },
    shouldAvoidCollisions: {
      control: { type: 'boolean' },
    },
    offset: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

const DefaultStory = (args: Story['args']) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div ref={buttonRef}>
        <Button variant="fill">Popoverを表示</Button>
      </div>
      <Popover {...args} anchorRef={buttonRef} isVisible={args?.isVisible ?? true}>
        <div className="bg-slate-100 p-2">
          <p className="mb-2 font-semibold">Popoverのコンテンツ</p>
          <p className="text-text02">
            ここにPopoverの内容を表示します。
            <br />
            複数行のテキストも表示可能です。
          </p>
        </div>
      </Popover>
    </div>
  );
};

export const Default: Story = {
  args: {
    placement: 'bottom',
    isVisible: true,
    shouldAvoidCollisions: true,
  },
  render: DefaultStory,
};

const InteractiveStory = (args: Story['args']) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleTogglePopover = () => {
    setIsPopoverVisible((prev) => !prev);
  };

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div ref={buttonRef}>
        <Button variant="outline" onClick={handleTogglePopover}>
          {isPopoverVisible ? 'Popoverを隠す' : 'Popoverを表示'}
        </Button>
      </div>
      <Popover {...args} anchorRef={buttonRef} isVisible={isPopoverVisible}>
        <div className="bg-slate-100 p-2">
          <p className="mb-2 font-semibold">インタラクティブなPopover</p>
          <p className="text-text02">ボタンをクリックして表示/非表示を切り替えられます。</p>
        </div>
      </Popover>
    </div>
  );
};

export const Interactive: Story = {
  args: {
    placement: 'bottom',
    shouldAvoidCollisions: true,
  },
  render: InteractiveStory,
};

const PlacementsStory = (args: Story['args']) => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid h-[500px] grid-cols-3 grid-rows-3 gap-4 p-8">
      {/* Top row */}
      <div />
      <div className="flex items-end justify-center">
        <div ref={topRef}>
          <Button variant="outline" size="small">
            Top
          </Button>
        </div>
        <Popover {...args} anchorRef={topRef} placement="top" isVisible={args?.isVisible ?? true}>
          <div className="bg-slate-100 p-2 text-text02">Top Popover</div>
        </Popover>
      </div>
      <div />

      {/* Middle row */}
      <div className="flex items-center justify-end">
        <div ref={leftRef}>
          <Button variant="outline" size="small">
            Left
          </Button>
        </div>
        <Popover {...args} anchorRef={leftRef} placement="left" isVisible={args?.isVisible ?? true}>
          <div className="bg-slate-100 p-2 text-text02">Left Popover</div>
        </Popover>
      </div>
      <div className="flex items-center justify-center">
        <div className="rounded border-2 border-dashed border-uiBorder01 p-4 text-center text-text03">
          各方向の配置例
        </div>
      </div>
      <div className="flex items-center justify-start">
        <div ref={rightRef}>
          <Button variant="outline" size="small">
            Right
          </Button>
        </div>
        <Popover {...args} anchorRef={rightRef} placement="right" isVisible={args?.isVisible ?? true}>
          <div className="bg-slate-100 p-2 text-text02">Right Popover</div>
        </Popover>
      </div>

      {/* Bottom row */}
      <div />
      <div className="flex items-start justify-center">
        <div ref={bottomRef}>
          <Button variant="outline" size="small">
            Bottom
          </Button>
        </div>
        <Popover {...args} anchorRef={bottomRef} placement="bottom" isVisible={args?.isVisible ?? true}>
          <div className="bg-slate-100 p-2 text-text02">Bottom Popover</div>
        </Popover>
      </div>
      <div />
    </div>
  );
};

export const Placements: Story = {
  args: {
    isVisible: true,
    shouldAvoidCollisions: false,
  },
  render: PlacementsStory,
};

const WithDialogStory = (args: Story['args']) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <div ref={buttonRef}>
        <Button variant="fill" onClick={handleOpenDialog}>
          Dialogを表示
        </Button>
      </div>
      <Popover {...args} anchorRef={buttonRef} isVisible={isDialogVisible}>
        <Dialog width={480} onClose={handleCloseDialog}>
          <Dialog.Header isNoBorder>タイトル</Dialog.Header>
          <Dialog.Body>
            <div className="flex w-full items-center justify-center py-20">Content</div>
          </Dialog.Body>
        </Dialog>
      </Popover>
    </div>
  );
};

export const WithDialog: Story = {
  args: {
    placement: 'top',
    shouldAvoidCollisions: false,
  },
  render: WithDialogStory,
};
