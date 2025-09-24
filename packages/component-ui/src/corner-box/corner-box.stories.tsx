import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '../button';
import { CornerBox } from '.';

const meta: Meta<typeof CornerBox> = {
  title: 'Components/CornerBox',
  component: CornerBox,
  argTypes: {
    position: {
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      control: { type: 'radio' },
    },
    isShow: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CornerBox>;

export const Component: Story = {
  args: {
    position: 'top-right',
    isShow: true,
    children: (
      <div className="flex flex-col items-start justify-center gap-3 bg-slate-100 p-4">
        <p className="typography-body14regular text-text01">コーナーボックスの内容です</p>
        <Button>閉じる</Button>
      </div>
    ),
  },
  parameters: {
    chromatic: { disable: true },
  },
};

export function Base() {
  const [isShowTopLeft, setIsShowTopLeft] = React.useState(false);
  const [isShowTopRight, setIsShowTopRight] = React.useState(false);
  const [isShowBottomLeft, setIsShowBottomLeft] = React.useState(false);
  const [isShowBottomRight, setIsShowBottomRight] = React.useState(false);

  return (
    <div className="min-h-96 p-8">
      <div className="space-y-4">
        <h2 className="typography-h4 text-text01">CornerBox デモ</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => setIsShowTopLeft(!isShowTopLeft)}>左上を{isShowTopLeft ? '非表示' : '表示'}</Button>
          <Button onClick={() => setIsShowTopRight(!isShowTopRight)}>右上を{isShowTopRight ? '非表示' : '表示'}</Button>
          <Button onClick={() => setIsShowBottomLeft(!isShowBottomLeft)}>
            左下を{isShowBottomLeft ? '非表示' : '表示'}
          </Button>
          <Button onClick={() => setIsShowBottomRight(!isShowBottomRight)}>
            右下を{isShowBottomRight ? '非表示' : '表示'}
          </Button>
        </div>
      </div>

      {/* CornerBox の表示 */}
      <CornerBox position="top-left" isShow={isShowTopLeft}>
        <div className="flex flex-col items-start justify-center gap-3 bg-slate-100 p-4">
          <p className="typography-body14regular">左上のボックス</p>
          <Button variant="outline" onClick={() => setIsShowTopLeft(false)}>
            閉じる
          </Button>
        </div>
      </CornerBox>

      <CornerBox position="top-right" isShow={isShowTopRight}>
        <div className="flex flex-col items-start justify-center gap-3 bg-slate-100 p-4">
          <p className="typography-body14regular">右上のボックス</p>
          <Button variant="outline" onClick={() => setIsShowTopRight(false)}>
            閉じる
          </Button>
        </div>
      </CornerBox>

      <CornerBox position="bottom-left" isShow={isShowBottomLeft}>
        <div className="flex flex-col items-start justify-center gap-3 bg-slate-100 p-4">
          <p className="typography-body14regular">左下のボックス</p>
          <Button variant="outline" onClick={() => setIsShowBottomLeft(false)}>
            閉じる
          </Button>
        </div>
      </CornerBox>

      <CornerBox position="bottom-right" isShow={isShowBottomRight}>
        <div className="flex flex-col items-start justify-center gap-3 bg-slate-100 p-4">
          <p className="typography-body14regular">右下のボックス</p>
          <Button variant="outline" onClick={() => setIsShowBottomRight(false)}>
            閉じる
          </Button>
        </div>
      </CornerBox>
    </div>
  );
}
