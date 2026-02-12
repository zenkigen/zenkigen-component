import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../avatar';
import { Tooltip } from '../tooltip';
import { AvatarGroup } from '.';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const avatarData = [
  { userId: 1, firstName: '猛', lastName: '茂木' },
  { userId: 2, firstName: '麻衣', lastName: '松井' },
  { userId: 3, firstName: '猛', lastName: '川上' },
  { userId: 4, firstName: 'あゆみ', lastName: '渋谷' },
  { userId: 5, firstName: '恵美里', lastName: '栗原' },
  { userId: 6, firstName: 'ジョシュ', lastName: 'アレクサンダー' },
  { userId: 7, firstName: 'Thomas', lastName: 'Patterson' },
  { userId: 8, firstName: '太郎', lastName: '田中' },
];

export const Component: Story = {
  args: {
    size: 'medium',
    max: 5,
    children: null,
  },
  render: (args) => (
    <AvatarGroup size={args.size} max={args.max}>
      {avatarData.map((data) => (
        <Avatar key={data.userId} userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
      ))}
      <AvatarGroup.Remain />
    </AvatarGroup>
  ),
  parameters: {
    chromatic: { disable: true },
  },
};

export function Base() {
  return (
    <div className="flex flex-col gap-6">
      {/* サイズバリエーション */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">サイズバリエーション</p>
        {(['x-small', 'small', 'medium', 'large', 'x-large'] as const).map((size) => (
          <AvatarGroup key={size} size={size} max={4}>
            {avatarData.map((data) => (
              <Avatar key={data.userId} userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
            ))}
            <AvatarGroup.Remain />
          </AvatarGroup>
        ))}
      </div>

      {/* Remain（+N 形式） */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">Remain（+N 形式）</p>
        <AvatarGroup max={4} size="small">
          {avatarData.map((data) => (
            <Avatar key={data.userId} userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
          ))}
          <AvatarGroup.Remain />
        </AvatarGroup>
      </div>

      {/* Counter（総数形式） */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">Counter（総数形式）</p>
        <AvatarGroup max={4} size="small">
          {avatarData.map((data) => (
            <Avatar key={data.userId} userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
          ))}
          <AvatarGroup.Counter />
        </AvatarGroup>
      </div>

      {/* max 以下の場合（カウンター非表示） */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">max 以下の場合（カウンター非表示）</p>
        <AvatarGroup max={5} size="small">
          <Avatar userId={1} firstName="太郎" lastName="田中" />
          <Avatar userId={2} firstName="花子" lastName="鈴木" />
          <Avatar userId={3} firstName="一郎" lastName="佐藤" />
          <AvatarGroup.Remain />
        </AvatarGroup>
      </div>

      {/* Label（大量データ想定） */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">Label（大量データ想定：+N 形式）</p>
        <AvatarGroup size="small">
          {avatarData.slice(0, 5).map((data) => (
            <Avatar key={data.userId} userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
          ))}
          <AvatarGroup.Label>+995</AvatarGroup.Label>
        </AvatarGroup>
      </div>

      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">Label（大量データ想定：総数形式）</p>
        <AvatarGroup size="small">
          {avatarData.slice(0, 5).map((data) => (
            <Avatar key={data.userId} userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
          ))}
          <AvatarGroup.Label>1000</AvatarGroup.Label>
        </AvatarGroup>
      </div>

      {/* 名前なし（アイコン表示） */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">名前なし（アイコン表示）</p>
        <AvatarGroup max={3} size="medium">
          <Avatar userId={1} />
          <Avatar userId={2} />
          <Avatar userId={3} />
          <Avatar userId={4} />
          <AvatarGroup.Remain />
        </AvatarGroup>
      </div>
    </div>
  );
}

export const LayoutExample: Story = {
  parameters: {
    layout: 'centered',
    chromatic: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Tooltip との組み合わせ（Remain に全員の名前を表示） */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">Tooltip との組み合わせ</p>
        <AvatarGroup max={4} size="medium">
          {avatarData.slice(0, 6).map((data) => (
            <Avatar key={data.userId} userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
          ))}
          <Tooltip
            content={
              <div className="flex flex-col">
                {avatarData.slice(0, 6).map((data) => (
                  <span key={data.userId}>{`${data.lastName} ${data.firstName}`}</span>
                ))}
              </div>
            }
            verticalPosition="top"
            portalTarget={document.body}
          >
            <AvatarGroup.Remain />
          </Tooltip>
        </AvatarGroup>
      </div>

      {/* サイズバリエーション + Tooltip */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">サイズバリエーション + Tooltip</p>
        {(['small', 'medium', 'large'] as const).map((size) => (
          <AvatarGroup key={size} size={size} max={3}>
            {avatarData.slice(0, 5).map((data) => (
              <Tooltip
                key={data.userId}
                content={`${data.lastName} ${data.firstName}`}
                verticalPosition="top"
                portalTarget={document.body}
              >
                <Avatar userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
              </Tooltip>
            ))}
            <Tooltip
              content={
                <div className="flex flex-col">
                  {avatarData.slice(3, 5).map((data) => (
                    <span key={data.userId}>{`${data.lastName} ${data.firstName}`}</span>
                  ))}
                </div>
              }
              verticalPosition="top"
              portalTarget={document.body}
            >
              <AvatarGroup.Remain />
            </Tooltip>
          </AvatarGroup>
        ))}
      </div>

      {/* Label + Tooltip */}
      <div className="flex flex-col gap-2">
        <p className="typography-label14regular text-text02">Label + Tooltip（大量データ想定）</p>
        <AvatarGroup size="small">
          {avatarData.slice(0, 5).map((data) => (
            <Tooltip
              key={data.userId}
              content={`${data.lastName} ${data.firstName}`}
              verticalPosition="top"
              portalTarget={document.body}
            >
              <Avatar userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
            </Tooltip>
          ))}
          <Tooltip
            content={
              <div className="flex flex-col">
                {avatarData.slice(0, 5).map((data) => (
                  <span key={data.userId}>{`${data.lastName} ${data.firstName}`}</span>
                ))}
                <span>...</span>
              </div>
            }
            verticalPosition="top"
            portalTarget={document.body}
          >
            <AvatarGroup.Label>+995</AvatarGroup.Label>
          </Tooltip>
        </AvatarGroup>
      </div>
    </div>
  ),
};
