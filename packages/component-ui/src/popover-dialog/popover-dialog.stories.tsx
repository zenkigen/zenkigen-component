import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Button } from '../button';
import { PopoverDialog } from '.';

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
      description: '衝突回避を有効にするかどうか（Corner配置では無効）',
    },
    anchorRef: {
      description: 'Corner配置の場合はオプショナル（未指定でViewport基準）',
    },
  },
};

type Story = StoryObj<typeof PopoverDialog>;

export default meta;

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

// Corner配置用のダイアログコンポーネント
const CornerPlacementDialog = ({
  args,
  buttonRef,
  isDialogVisible,
  shouldUseAnchorRef,
  handleCloseDialog,
}: {
  args: Story['args'];
  buttonRef: React.RefObject<HTMLDivElement | null>;
  isDialogVisible: boolean;
  shouldUseAnchorRef: boolean;
  handleCloseDialog: () => void;
}) => {
  const dialogContent = (
    <>
      <PopoverDialog.Header isNoBorder>タイトル</PopoverDialog.Header>
      <PopoverDialog.Body>
        <div className="flex w-full items-center justify-center pb-6">Content</div>
      </PopoverDialog.Body>
    </>
  );

  if (shouldUseAnchorRef) {
    return (
      <PopoverDialog
        placement={args?.placement as CornerPlacement}
        width={args?.width}
        height={args?.height}
        maxWidth={args?.maxWidth}
        portalTargetRef={args?.portalTargetRef}
        offset={args?.offset}
        anchorRef={buttonRef}
        isVisible={isDialogVisible}
        onClose={handleCloseDialog}
      >
        {dialogContent}
      </PopoverDialog>
    );
  }

  return (
    <PopoverDialog
      placement={args?.placement as CornerPlacement}
      width={args?.width}
      height={args?.height}
      maxWidth={args?.maxWidth}
      portalTargetRef={args?.portalTargetRef}
      offset={args?.offset}
      isVisible={isDialogVisible}
      onClose={handleCloseDialog}
      shouldAvoidCollisions={false}
    >
      {dialogContent}
    </PopoverDialog>
  );
};

// 通常配置用のダイアログコンポーネント
const NormalPlacementDialog = ({
  args,
  buttonRef,
  isDialogVisible,
  handleCloseDialog,
}: {
  args: Story['args'];
  buttonRef: React.RefObject<HTMLDivElement | null>;
  isDialogVisible: boolean;
  handleCloseDialog: () => void;
}) => (
  <PopoverDialog {...args} anchorRef={buttonRef} isVisible={isDialogVisible} onClose={handleCloseDialog}>
    <PopoverDialog.Header isNoBorder>タイトル</PopoverDialog.Header>
    <PopoverDialog.Body>
      <div className="flex w-full items-center justify-center pb-6">Content</div>
    </PopoverDialog.Body>
  </PopoverDialog>
);

const ComponentStory = (args: Story['args']) => {
  const anchorElementRef = useRef<HTMLDivElement>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [shouldUseAnchorRef, setShouldUseAnchorRef] = useState(true);

  const isCornerPlacementEnabled = isCornerPlacement(args?.placement);

  const handleOpenDialog = () => {
    setIsDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
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
          <Button variant="fill" onClick={handleOpenDialog}>
            Dialogを表示
          </Button>
          <Button variant="outline" onClick={handleCloseDialog}>
            Dialogを非表示
          </Button>
        </div>
      </div>

      {isCornerPlacementEnabled ? (
        <CornerPlacementDialog
          args={args}
          buttonRef={anchorElementRef}
          isDialogVisible={isDialogVisible}
          shouldUseAnchorRef={shouldUseAnchorRef}
          handleCloseDialog={handleCloseDialog}
        />
      ) : (
        <NormalPlacementDialog
          args={args}
          buttonRef={anchorElementRef}
          isDialogVisible={isDialogVisible}
          handleCloseDialog={handleCloseDialog}
        />
      )}
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
