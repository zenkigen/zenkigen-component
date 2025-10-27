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
    isOpen: {
      control: { type: 'boolean' },
      description: 'Popoverの表示/非表示',
    },
    offset: {
      control: { type: 'number' },
      description: 'トリガー要素とPopoverコンテンツとの間隔（ピクセル単位）',
    },
    anchorRef: {
      control: false,
      description: 'Popoverの配置基準となる要素のref（指定しない場合はTrigger要素が基準）',
    },
    onClose: {
      action: 'closed',
      description: 'Popoverが閉じられた時に呼び出されるコールバック関数（reason: "outside-click" | "escape-key-down"）',
    },
  },
};

type Story = StoryObj<typeof Popover>;

export default meta;

// 共通のPopoverコンテンツコンポーネント
const SamplePopoverContent = () => (
  <div className="bg-slate-200 p-4">
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
        offset={args?.offset ?? 8}
        onClose={(event) => {
          args?.onClose?.(event);
          setIsOpen(false);
        }}
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

// Custom Anchor Element ストーリー
const CustomAnchorStory = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false);
  const customAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-[800px] flex-col items-center justify-center gap-10">
      {/* カスタムアンカー要素 */}
      <div ref={customAnchorRef} className="flex size-[300px] items-center justify-center bg-blue-100 text-blue-800">
        カスタムアンカー
      </div>

      {/* トリガーボタン */}
      <Popover
        isOpen={isOpen}
        placement={args?.placement ?? 'top'}
        offset={args?.offset ?? 8}
        anchorRef={customAnchorRef}
        onClose={(event) => {
          args?.onClose?.(event);
          setIsOpen(false);
        }}
      >
        <Popover.Trigger>
          <Button variant="fill" onClick={() => setIsOpen((value) => !value)}>
            {isOpen ? 'Popoverを非表示' : 'Popoverを表示'}
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="rounded-lg bg-slate-200 p-4">
            <p className="mb-2 text-sm font-semibold text-text01">カスタムアンカー要素を基準としたPopover</p>
            <p className="text-xs text-text02">
              このPopoverは青い四角形の要素を基準に配置されています。
              <br />
              トリガーボタンではなく、別の要素を基準にできます。
            </p>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export const WithCustomAnchor: Story = {
  args: {
    placement: 'top',
  },
  render: CustomAnchorStory,
  parameters: {
    docs: {
      description: {
        story:
          'anchorRefプロパティを使用して、トリガー要素以外の要素を基準にPopoverを配置する例です。青い四角形の要素を基準にPopoverが表示されます。',
      },
    },
  },
};
