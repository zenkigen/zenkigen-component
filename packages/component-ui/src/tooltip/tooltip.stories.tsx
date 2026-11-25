import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../button';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { TextArea } from '../text-area';
import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium'] },
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
 * 4. ホバーしたまま内側のコンテナをスクロールすると、Tooltip が消える
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
 * ドロワーの開閉で表の幅が変わる画面を簡易に再現したもの。
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
      <div className="flex flex-col items-start gap-2 px-20 py-10">
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
 * `portalTarget` 指定時に、window をスクロールしたあとのホバーで正しい位置に表示されること、
 * 表示中にスクロールすると消えることを確認する再現用ストーリー。
 *
 * 確認手順:
 * 1. window をスクロール（ページを下方向に動かす）
 * 2. target にホバーする
 * 3. Tooltip が target の直上に表示されればOK
 * 4. ホバーしたままスクロールすると Tooltip が消える
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

function ScrollSpacer({ height, label }: { height: number; label: string }) {
  return (
    <div
      className="typography-body13regular flex shrink-0 items-center justify-center rounded bg-uiBackground02 text-text02"
      style={{ height }}
    >
      {label}
    </div>
  );
}

function IconLabelButton({ label }: { label: string }) {
  return (
    <Button variant="outline" size="small" before={<Icon name="information" size="small" />}>
      {label}
    </Button>
  );
}

const stickyListRows = Array.from({ length: 30 }, (_, index) => index + 1);

function AutoScrollArea() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const scrollArea = scrollAreaRef.current;
      if (scrollArea == null) {
        return;
      }
      const maxScrollTop = scrollArea.scrollHeight - scrollArea.clientHeight;
      scrollArea.scrollTop = scrollArea.scrollTop >= maxScrollTop ? 0 : scrollArea.scrollTop + 1;
    }, 30);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={scrollAreaRef}
      className="flex flex-col gap-4 overflow-y-auto rounded border border-uiBorder01 p-4"
      style={{ width: 320, height: 160 }}
    >
      <ScrollSpacer height={600} label="Tooltip を含まない、自動でスクロールし続ける枠" />
    </div>
  );
}

function DismissOnScrollContent() {
  const [textAreaValue, setTextAreaValue] = useState(
    Array.from({ length: 20 }, (_, index) => `テキストエリアの ${index + 1} 行目`).join('\n'),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 rounded border border-uiBorder01 bg-uiBackgroundBlue p-4">
        <p className="typography-label14bold text-text01">スクロールで Tooltip が消えることを確認する</p>
        <p className="typography-body14regular text-text01">
          Tooltip を表示してから、ページ、または Tooltip を含む枠をスクロールすると消える。Tooltip
          を含まない枠のスクロールと、トリガーの内側のスクロールでは消えない。消えたあとは、マウスをいったんトリガーの外へ出して、乗せ直すと表示される。
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text01">(1) ページのスクロールで消える</p>
        <div className="flex items-center gap-6">
          <Tooltip content="portalTarget なし">
            <IconLabelButton label="portalTarget なし" />
          </Tooltip>
          <Tooltip content="portalTarget あり" portalTarget={document.body}>
            <IconLabelButton label="portalTarget あり" />
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text01">
          (2) 固定見出しつきの一覧（枠をスクロールすると消える。固定見出しの手前に残らない）
        </p>
        <div className="overflow-y-auto rounded border border-uiBorder01" style={{ width: 480, height: 320 }}>
          <div className="typography-label14bold sticky top-0 z-10 flex items-center border-b border-uiBorder01 bg-uiBackground01 px-4 py-2 text-text01">
            <span className="flex-1">行</span>
            <span className="w-40">portalTarget なし</span>
            <span className="w-40">portalTarget あり</span>
          </div>
          {stickyListRows.map((row) => (
            <div
              key={row}
              className="typography-body14regular flex items-center border-b border-uiBorder01 px-4 py-2 text-text01"
            >
              <span className="flex-1">{row} 行目</span>
              <div className="flex w-40">
                <Tooltip content={`${row} 行目（portalTarget なし）`}>
                  <IconLabelButton label="なし" />
                </Tooltip>
              </div>
              <div className="flex w-40">
                <Tooltip content={`${row} 行目（portalTarget あり）`} portalTarget={document.body}>
                  <IconLabelButton label="あり" />
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text01">
          (3) Tooltip を含まない枠のスクロールでは消えない（この枠が動いている間に (1) のトリガーにホバーする）
        </p>
        <AutoScrollArea />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text01">
          (4) テキストエリアをトリガーにした Tooltip（中のスクロールでは消えない。端まで行ってページが動くと消える）
        </p>
        <div style={{ width: 320 }}>
          <Tooltip content="テキストエリアの Tooltip">
            <TextArea
              value={textAreaValue}
              height={120}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTextAreaValue(event.target.value)}
            />
          </Tooltip>
        </div>
      </div>
      <ScrollSpacer height={1200} label="ページをスクロールするための余白" />
    </div>
  );
}

export const DismissOnScroll: Story = {
  render: () => <DismissOnScrollContent />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story: [
          'スクロールで Tooltip が消えることを確認する Story。**トリガーにホバーしてからスクロールして確認する。**',
          '',
          '- 消える: ページ全体のスクロール、Tooltip を含む枠のスクロール（`portalTarget` の有無によらない）',
          '- 消えない: Tooltip を含まない枠のスクロール、トリガーの内側（テキストエリアの中）のスクロール',
          '- スクロールで消えたあとは、マウスをいったんトリガーの外へ出して、乗せ直すと表示される',
          '- Tooltip を含む領域がスクロールされた直後（200ms 以内）のホバーでは表示しない。マウスを止めたまま一覧をスクロールしても、行がマウスの下を通るたびに出たり消えたりしない',
          '',
          'テキストエリアの中を端までスクロールしてページへ伝わった場合は、ページのスクロールとして扱われ、消える。',
        ].join('\n'),
      },
    },
  },
};

function DismissOnScrollInModalContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded border border-uiBorder01 bg-uiBackgroundBlue p-4">
        <p className="typography-label14bold text-text01">
          Modal の本文をスクロールすると Tooltip が消えることを確認する
        </p>
        <p className="typography-body14regular text-text01">
          ボタンで Modal を開き、本文の中のトリガーにホバーしてから本文をスクロールする。Tooltip が消え、Modal の
          Header・Footer の手前に Tooltip が残らなければ成功。
        </p>
      </div>
      <div className="flex items-center gap-6">
        <Button variant="fill" size="medium" onClick={() => setIsModalOpen(true)}>
          Modal を開く
        </Button>
        <Tooltip content="ページ側の Tooltip">
          <IconLabelButton label="ページ側の Tooltip" />
        </Tooltip>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width={480} height={480}>
        <Modal.Header>本文がスクロールする Modal</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4 px-6 py-4">
            <div className="flex items-center gap-6">
              <Tooltip content="本文の上のほう（portalTarget なし）">
                <IconLabelButton label="portalTarget なし" />
              </Tooltip>
              <Tooltip content="本文の上のほう（portalTarget あり）" portalTarget={document.body}>
                <IconLabelButton label="portalTarget あり" />
              </Tooltip>
            </div>
            <ScrollSpacer height={720} label="本文の余白" />
            <div className="flex items-center gap-6">
              <Tooltip content="本文の末尾（portalTarget なし）">
                <IconLabelButton label="portalTarget なし" />
              </Tooltip>
              <Tooltip content="本文の末尾（portalTarget あり）" portalTarget={document.body}>
                <IconLabelButton label="portalTarget あり" />
              </Tooltip>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full items-center justify-end">
            <Button variant="outline" size="medium" onClick={() => setIsModalOpen(false)}>
              閉じる
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export const DismissOnScrollInModal: Story = {
  render: () => <DismissOnScrollInModalContent />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story: [
          'Modal の本文をスクロールすると Tooltip が消えることを確認する Story。**ボタンで Modal を開いて確認する。**',
          '',
          '- 本文の中のトリガーにホバーしてから本文をスクロールすると Tooltip が消え、Modal の Header・Footer の手前に残らない（`portalTarget` の有無によらない）',
          '- Modal を閉じたあと、ページ側の Tooltip がいままでどおり表示される',
        ].join('\n'),
      },
    },
  },
};
