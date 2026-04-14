import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    verticalPosition: { control: 'radio', options: ['top', 'bottom'] },
    horizontalAlign: { control: 'radio', options: ['left', 'center', 'right'] },
    content: { control: 'text' },
    maxWidth: { control: 'number' },
    isDisabledHover: { control: 'boolean' },
    portalTarget: { control: false },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Component: Story = {
  args: {
    size: 'small',
    verticalPosition: 'bottom',
    horizontalAlign: 'center',
    content: (
      <>
        内容説明テキスト1
        <br />
        内容説明テキスト2
      </>
    ),
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: (args) => (
    <div className="flex flex-col gap-10 px-20 py-10">
      <div className="flex items-center gap-20">
        <Tooltip {...args}>
          <Button variant="outline" size="small">
            ラベル
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const Base: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-20">
      <div className="flex items-center gap-20">
        <Tooltip content="内容説明テキスト" size="small" verticalPosition="top">
          <Button variant="outline" size="small">
            small / top
          </Button>
        </Tooltip>
        <Tooltip content="内容説明テキスト" size="small" verticalPosition="bottom">
          <Button variant="outline" size="small">
            small / bottom
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip content="内容説明テキスト" size="medium" verticalPosition="top">
          <Button variant="outline" size="medium">
            medium / top
          </Button>
        </Tooltip>
        <Tooltip content="内容説明テキスト" size="medium" verticalPosition="bottom">
          <Button variant="outline" size="medium">
            medium / bottom
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const Portal: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-20">
      <div className="flex items-center gap-20">
        <Tooltip content="内容説明テキスト" size="small" horizontalAlign="left" portalTarget={document.body}>
          <Button variant="outline" size="small">
            small / left
          </Button>
        </Tooltip>
        <Tooltip content="内容説明テキスト" size="small" horizontalAlign="center" portalTarget={document.body}>
          <Button variant="outline" size="small">
            small / center
          </Button>
        </Tooltip>
        <Tooltip content="内容説明テキスト" size="small" horizontalAlign="right" portalTarget={document.body}>
          <Button variant="outline" size="small">
            small / right
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip content="内容説明テキスト" size="medium" horizontalAlign="left" portalTarget={document.body}>
          <Button variant="outline" size="medium">
            medium / left
          </Button>
        </Tooltip>
        <Tooltip content="内容説明テキスト" size="medium" horizontalAlign="center" portalTarget={document.body}>
          <Button variant="outline" size="medium">
            medium / center
          </Button>
        </Tooltip>
        <Tooltip content="内容説明テキスト" size="medium" horizontalAlign="right" portalTarget={document.body}>
          <Button variant="outline" size="medium">
            medium / right
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const WithMaxWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-16 p-20">
      <div className="flex items-center gap-20">
        <Tooltip
          content="とても長いツールチップの説明テキストで自動的に折り返されることを確認する"
          size="small"
          maxWidth={120}
        >
          <Button variant="outline" size="small">
            small / maxWidth 120
          </Button>
        </Tooltip>
        <Tooltip content="とても長いツールチップの説明テキストで折り返しが発生しない例" size="small">
          <Button variant="outline" size="small">
            small / maxWidth 未指定
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-20">
        <Tooltip
          content="とても長いツールチップの説明テキストで自動的に折り返されることを確認する"
          size="medium"
          maxWidth={200}
        >
          <Button variant="outline" size="medium">
            medium / maxWidth 200
          </Button>
        </Tooltip>
        <Tooltip
          content={
            <>
              改行を含む説明テキストの1行目
              <br />
              改行を含む説明テキストの2行目
            </>
          }
          size="medium"
        >
          <Button variant="outline" size="medium">
            medium / 改行content
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
};

/**
 * `portalTarget` 指定時に、内部スクロール可能なコンテナ内で target 位置が変化した場合でも、
 * ホバー時に正しい位置に Tooltip が表示されることを確認する再現用ストーリー。
 *
 * 確認手順:
 * 1. 内側の灰色コンテナをスクロール
 * 2. target にホバーする
 * 3. Tooltip が target の直上（または直下）に表示されればOK
 */
export const ReproInnerScroll: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-2 px-20 py-10">
      <p className="typography-body14regular text-text02">
        内側のコンテナをスクロールしてから target にホバーしてください。
      </p>
      <div className="h-[300px] w-[400px] overflow-y-auto border border-uiBorder01">
        <div className="h-[200px] bg-uiBackground02" />
        <div className="flex items-center justify-center p-4">
          <Tooltip content="内容説明テキスト" portalTarget={document.body} verticalPosition="top">
            <Button variant="outline" size="small">
              ラベル
            </Button>
          </Tooltip>
        </div>
        <div className="h-[600px] bg-uiBackground02" />
      </div>
    </div>
  ),
};

/**
 * `portalTarget` 指定時に、親コンテナ幅が動的に変化した場合でも、
 * ホバー時に正しい位置に Tooltip が表示されることを確認する再現用ストーリー。
 *
 * harutaka-workspace でドロワー開閉により table 幅が変わる挙動を簡易再現したもの。
 *
 * 確認手順:
 * 1. トグルボタンで親コンテナの幅を変更
 * 2. target にホバーする
 * 3. Tooltip が target の直上に表示されればOK
 */
export const ReproLayoutShift: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function Render() {
    const [isWide, setIsWide] = useState(false);

    return (
      <div className="flex flex-col gap-2 px-20 py-10">
        <p className="typography-body14regular text-text02">ボタンで幅を切り替えてから target にホバーしてください。</p>
        <Button variant="outline" size="small" onClick={() => setIsWide((prev) => !prev)}>
          幅を切り替える（現在: {isWide ? 'wide' : 'narrow'}）
        </Button>
        <div style={{ width: isWide ? 600 : 300 }} className="border border-uiBorder01 p-4">
          <Tooltip content="内容説明テキスト" portalTarget={document.body} verticalPosition="top">
            <Button variant="outline" size="small">
              ラベル
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  },
};

/**
 * `portalTarget` 指定時に、window 自体をスクロールした場合でも、
 * Tooltip が target に追従することを確認する再現用ストーリー。
 *
 * 確認手順:
 * 1. window をスクロール（ページを下方向に動かす）
 * 2. target にホバーする
 * 3. Tooltip が target の直上に表示されればOK
 * 4. さらにホバー中にスクロールしても追従することを確認
 */
export const ReproWindowScroll: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-2 px-20 py-10">
      <p className="typography-body14regular text-text02">
        ページ全体をスクロールしてから target にホバーしてください。
      </p>
      <div className="h-[800px] bg-uiBackground02" />
      <div className="flex items-center justify-center py-4">
        <Tooltip content="内容説明テキスト" portalTarget={document.body} verticalPosition="top">
          <Button variant="outline" size="small">
            ラベル
          </Button>
        </Tooltip>
      </div>
      <div className="h-[800px] bg-uiBackground02" />
    </div>
  ),
};
