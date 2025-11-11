import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

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
  title: 'Layout/Popover',
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

// Popover + Popup 連携ストーリー
const PopoverWithPopupStory = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-[700px] flex-col items-center justify-center gap-4">
      <Popover
        isOpen={isOpen}
        placement={args?.placement ?? 'top'}
        offset={args?.offset ?? 8}
        onClose={() => setIsOpen(false)}
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
              <div className="flex w-full flex-col gap-2 px-6">
                <p className="typography-body14regular text-text01">このダイアログは以下の特徴があります：</p>
                <ul className="typography-body12regular list-disc pl-4 text-text02">
                  <li>この Popup は Popover 内で使用されており、PopoverContext の開閉状態を自動的に継承しています。</li>
                  <li>ヘッダーの閉じるボタンをクリックすると、Popoverも一緒に閉じます。</li>
                </ul>
              </div>
            </Popup.Body>
            <Popup.Footer>
              <div className="flex w-full flex-wrap items-center justify-end gap-4">
                <Button variant="outline" size="medium" onClick={() => setIsOpen(false)}>
                  閉じる
                </Button>
                <Button variant="fill" size="medium" onClick={() => setIsOpen(false)}>
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

// Popover + Popup 連携ストーリー（閉じるボタンなし、外部クリック・Escapeキーで閉じない）
const PopoverWithPopupNoCloseStory = (args: Story['args']) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-[700px] flex-col items-center justify-center gap-4">
      <Popover
        isOpen={isOpen}
        placement={args?.placement ?? 'bottom'}
        offset={args?.offset ?? 8}
        // onClose を設定しないことで、外部クリック・Escapeキーで閉じない
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
              <div className="flex w-full flex-col gap-2 px-6 pb-4">
                <p className="typography-body14regular text-text01">このダイアログは以下の特徴があります：</p>
                <ul className="typography-body12regular list-disc pl-4 text-text02">
                  <li>ヘッダーに閉じるボタンがありません</li>
                  <li>外部クリックでは閉じません</li>
                  <li>Escapeキーでは閉じません</li>
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
