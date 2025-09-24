import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../button';
import { Popover } from '.';

// 定数の抽出
const CORNER_PLACEMENTS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;
const ALL_PLACEMENTS = [
  // 通常配置
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
  // Corner配置
  ...CORNER_PLACEMENTS,
] as const;

type CornerPlacement = (typeof CORNER_PLACEMENTS)[number];

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
      description: '衝突回避を有効にするかどうか（Corner配置では無効）',
    },
    offset: {
      control: { type: 'number' },
      description: 'アンカー要素からのオフセット（ピクセル）',
    },
    anchorRef: {
      description: 'Corner配置の場合はオプショナル（未指定でViewport基準）',
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

// 型ガード関数
const isCornerPlacement = (placement?: string): placement is CornerPlacement => {
  return Boolean(placement) && CORNER_PLACEMENTS.includes(placement as CornerPlacement);
};

// アンカー参照コントロール用コンポーネント
const AnchorReferenceControl = ({
  shouldUseAnchorRef,
  isCornerPlacementEnabled,
  onToggleAnchorRef,
}: {
  shouldUseAnchorRef: boolean;
  isCornerPlacementEnabled: boolean;
  onToggleAnchorRef: () => void;
}) => (
  <div className="absolute bottom-2 flex flex-col gap-2">
    <div className="text-xs font-bold text-gray-500">基準要素の指定：</div>
    <Button
      variant={shouldUseAnchorRef ? 'fill' : 'outline'}
      onClick={onToggleAnchorRef}
      isDisabled={isCornerPlacementEnabled === false}
    >
      {shouldUseAnchorRef ? '基準要素を指定しない（Viewport基準に切り替え）' : '要素基準に戻す'}
    </Button>
    <div className="text-xs text-gray-500">※placement が {CORNER_PLACEMENTS.join(', ')} の場合に変更可能</div>
  </div>
);

// Corner配置用のPopoverコンポーネント
const CornerPlacementPopover = ({
  args,
  anchorElementRef,
  isPopoverVisible,
  shouldUseAnchorRef,
}: {
  args: Story['args'];
  anchorElementRef: React.RefObject<HTMLDivElement | null>;
  isPopoverVisible: boolean;
  shouldUseAnchorRef: boolean;
}) => {
  if (shouldUseAnchorRef) {
    return (
      <Popover
        placement={args?.placement as CornerPlacement}
        isVisible={isPopoverVisible}
        portalTargetRef={args?.portalTargetRef}
        offset={args?.offset}
        anchorRef={anchorElementRef}
      >
        <SamplePopoverContent />
      </Popover>
    );
  }

  return (
    <Popover
      placement={args?.placement as CornerPlacement}
      isVisible={isPopoverVisible}
      portalTargetRef={args?.portalTargetRef}
      offset={args?.offset}
      shouldAvoidCollisions={false}
    >
      <SamplePopoverContent />
    </Popover>
  );
};

// 通常配置用のPopoverコンポーネント
const NormalPlacementPopover = ({
  args,
  anchorElementRef,
  isPopoverVisible,
}: {
  args: Story['args'];
  anchorElementRef: React.RefObject<HTMLDivElement | null>;
  isPopoverVisible: boolean;
}) => (
  <Popover {...args} anchorRef={anchorElementRef} isVisible={isPopoverVisible}>
    <SamplePopoverContent />
  </Popover>
);

const ComponentStory = (args: Story['args']) => {
  const anchorElementRef = useRef<HTMLDivElement>(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [shouldUseAnchorRef, setShouldUseAnchorRef] = useState(true);

  const isCornerPlacementEnabled = isCornerPlacement(args?.placement);

  const handleShowPopover = () => {
    setIsPopoverVisible(true);
  };

  const handleHidePopover = () => {
    setIsPopoverVisible(false);
  };

  const handleToggleAnchorRef = () => {
    setShouldUseAnchorRef(!shouldUseAnchorRef);
  };

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
      <AnchorReferenceControl
        shouldUseAnchorRef={shouldUseAnchorRef}
        isCornerPlacementEnabled={isCornerPlacementEnabled}
        onToggleAnchorRef={handleToggleAnchorRef}
      />

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

      {isCornerPlacementEnabled ? (
        <CornerPlacementPopover
          args={args}
          anchorElementRef={anchorElementRef}
          isPopoverVisible={isPopoverVisible}
          shouldUseAnchorRef={shouldUseAnchorRef}
        />
      ) : (
        <NormalPlacementPopover args={args} anchorElementRef={anchorElementRef} isPopoverVisible={isPopoverVisible} />
      )}
    </div>
  );
};

export const Component: Story = {
  args: {
    placement: 'bottom',
    shouldAvoidCollisions: true,
    offset: 8,
  },
  render: ComponentStory,
};
