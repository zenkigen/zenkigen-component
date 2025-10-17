import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../button';
import { Popover } from '../popover';
import { Popup } from '.';

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
    // layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean', description: '表示状態' },
    width: { control: 'text', description: '幅（320px以上が指定できる）' },
    height: { control: 'text', description: '高さ（184px以上が指定できる）' },
    maxWidth: { control: 'text', description: '最大幅' },
    onClose: { action: 'onClose', description: '閉じる操作が発生したときのコールバック' },
  },
};

type Story = StoryObj<typeof Popup>;

export default meta;

export const Component: Story = {
  args: {
    isOpen: true,
    width: 480,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup isOpen={args.isOpen} width={args.width} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full items-center justify-center py-20">Content</div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full flex-wrap items-center justify-end gap-4">
            <Button variant="outline" size="medium" onClick={action('キャンセル')}>
              キャンセル
            </Button>
            <Button variant="fill" size="medium" onClick={action('保存する')}>
              保存する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};

export const FixedHeight: Story = {
  args: {
    isOpen: true,
    width: 480,
    height: 320,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup isOpen={args.isOpen} width={args.width} height={args.height} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full flex-col px-4">
            <p>
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
            </p>
            <p>
              五月のしまいの日曜でした。わたくしは賑にぎやかな市の教会の鐘の音で眼をさましました。もう日はよほど登って、まわりはみんなきらきらしていました。時計を見るとちょうど六時でした。わたくしはすぐチョッキだけ着て山羊を見に行きました。すると小屋のなかはしんとして藁わらが凹んでいるだけで、あのみじかい角も白い髯も見えませんでした。「あんまりいい天気なもんだから大将ひとりででかけたな。」
            </p>
            <p>
              わたくしは半分わらうように半分つぶやくようにしながら、向うの信号所からいつも放して遊ばせる輪道の内側の野原、ポプラの中から顔をだしている市はずれの白い教会の塔までぐるっと見まわしました。けれどもどこにもあの白い頭もせなかも見えていませんでした。うまやを一まわりしてみましたがやっぱりどこにも居ませんでした。
            </p>
            <p>
              「いったい山羊は馬だの犬のように前居たところや来る道をおぼえていて、そこへ戻っているということがあるのかなあ。」
              わたくしはひとりで考えました。さあ、そう思うと早くそれを知りたくてたまらなくなりました。けれども役所のなかとちがって競馬場には物知りの年とった書記も居なければ、そんなことを書いた辞書もそこらにありませんでしたから、わたくしは何ということなしに輪道を半分通って、それからこの前山羊が村の人に連れられて来た路をそのまま野原の方へあるきだしました。
            </p>
          </div>
        </Popup.Body>
        <Popup.Footer>
          <div className="flex w-full flex-wrap items-center justify-end gap-4">
            <Button variant="outline" size="medium" onClick={action('キャンセル')}>
              キャンセル
            </Button>
            <Button variant="fill" size="medium" onClick={action('保存する')}>
              保存する
            </Button>
          </div>
        </Popup.Footer>
      </Popup>
    );
  },
};

export const WithoutButton: Story = {
  args: {
    isOpen: true,
    width: 480,
  },
  render: function MyFunc({ ...args }) {
    return (
      <Popup isOpen={args.isOpen} width={args.width} onClose={args.onClose}>
        <Popup.Header>タイトル</Popup.Header>
        <Popup.Body>
          <div className="flex w-full flex-col px-4 pb-4">
            <p>
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。
            </p>
          </div>
        </Popup.Body>
      </Popup>
    );
  },
};

// Popover と連動するストーリー
export const WithPopover: Story = {
  args: {
    width: 480,
  },
  render: function MyFunc({ ...args }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex min-h-[800px] flex-col items-center justify-center gap-4">
        <Popover
          isOpen={isOpen}
          placement="top"
          onOutsideClick={() => setIsOpen(false)}
          onEscapeKeyDown={() => setIsOpen(false)}
        >
          <Popover.Trigger>
            <Button variant="fill" onClick={() => setIsOpen((value) => !value)}>
              {isOpen ? 'Popover を閉じる' : 'Popover を開く'}
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            {/* Popup は isOpen を指定しなくても PopoverContext から自動取得 */}
            <Popup width={args.width} onClose={() => setIsOpen(false)}>
              <Popup.Header>Popover 内の Popup</Popup.Header>
              <Popup.Body>
                <div className="typography-body14regular flex w-full flex-col gap-3 p-4 text-text01">
                  <p>この Popup は Popover 内で使用されています。</p>
                  <p>ヘッダーの ✕ ボタンをクリックすると、Popup と Popover の両方が閉じます。</p>
                </div>
              </Popup.Body>
            </Popup>
          </Popover.Content>
        </Popover>
      </div>
    );
  },
};
