import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../avatar';
import { Button } from '../button';
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

// 面談ログ テーブルデータ
type AvatarWithStatus = {
  userId: number;
  firstName: string;
  lastName: string;
  status: '未着手' | '進行中' | '完了';
};

const manyAvatars: AvatarWithStatus[] = [
  { userId: 1, firstName: '猛', lastName: '茂木', status: '完了' },
  { userId: 2, firstName: '麻衣', lastName: '松井', status: '進行中' },
  { userId: 3, firstName: '猛', lastName: '川上', status: '完了' },
  { userId: 4, firstName: 'あゆみ', lastName: '渋谷', status: '未着手' },
  { userId: 5, firstName: '恵美里', lastName: '栗原', status: '進行中' },
  { userId: 6, firstName: 'ジョシュ', lastName: 'アレクサンダー', status: '完了' },
  { userId: 7, firstName: 'Thomas', lastName: 'Patterson', status: '未着手' },
  { userId: 8, firstName: '猛', lastName: '茂木', status: '進行中' },
  { userId: 9, firstName: '麻衣', lastName: '松井', status: '完了' },
  { userId: 10, firstName: '猛', lastName: '川上', status: '未着手' },
  { userId: 11, firstName: 'あゆみ', lastName: '渋谷', status: '進行中' },
  { userId: 12, firstName: '恵美里', lastName: '栗原', status: '完了' },
];

const fewAvatars: AvatarWithStatus[] = [
  { userId: 3, firstName: '猛', lastName: '川上', status: '進行中' },
  { userId: 2, firstName: '麻衣', lastName: '松井', status: '完了' },
];

const interviewLogs = [
  {
    id: '1234567891',
    name: '栗原 恵美里',
    date: '2025/07/12 14:30',
    interviewer: manyAvatars,
    interviewee: manyAvatars,
  },
  { id: '1234567891', name: '松井 麻衣', date: '2025/07/10 11:30', interviewer: fewAvatars, interviewee: fewAvatars },
  {
    id: '1234567891',
    name: 'アレクサンダ...',
    date: '2025/07/09 14:01',
    interviewer: manyAvatars,
    interviewee: manyAvatars,
  },
  {
    id: '1234567891',
    name: '長谷川 あゆみ',
    date: '2025/07/05 15:30',
    interviewer: manyAvatars,
    interviewee: manyAvatars,
  },
  { id: '1234567891', name: '大口 猛', date: '2025/07/05 15:10', interviewer: manyAvatars, interviewee: manyAvatars },
  { id: '1234567891', name: '古澤 祐', date: '2025/06/30 11:30', interviewer: manyAvatars, interviewee: manyAvatars },
  {
    id: '1234567891',
    name: 'Terrance Tho...',
    date: '2025/06/29 11:00',
    interviewer: manyAvatars,
    interviewee: manyAvatars,
  },
  { id: '1234567891', name: '田中 太郎', date: '2025/06/28 10:00', interviewer: fewAvatars, interviewee: fewAvatars },
  { id: '1234567891', name: '鈴木 花子', date: '2025/06/27 09:30', interviewer: manyAvatars, interviewee: manyAvatars },
  { id: '1234567891', name: '佐藤 一郎', date: '2025/06/26 14:00', interviewer: manyAvatars, interviewee: fewAvatars },
];

function Status({ avatars }: { avatars: AvatarWithStatus[] }) {
  const hiddenAvatars = avatars.slice(4);

  return (
    <div className="flex cursor-default items-center gap-2">
      <AvatarGroup max={4} size="x-small">
        {avatars.map((data) => (
          <Tooltip
            key={data.userId}
            content={`${data.lastName} ${data.firstName}：${data.status}`}
            verticalPosition="top"
            portalTarget={document.body}
          >
            <Avatar userId={data.userId} firstName={data.firstName} lastName={data.lastName} />
          </Tooltip>
        ))}
        {avatars.length > 4 && (
          <Tooltip
            content={
              <div className="flex flex-col">
                {hiddenAvatars.map((data) => (
                  <span key={data.userId}>{`${data.lastName} ${data.firstName}：${data.status}`}</span>
                ))}
              </div>
            }
            verticalPosition="top"
            portalTarget={document.body}
          >
            <AvatarGroup.Remain />
          </Tooltip>
        )}
      </AvatarGroup>
    </div>
  );
}

export const LayoutExample2: Story = {
  name: 'LayoutExample2（面談ログ一覧）',
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div className="w-[960px] pt-[72px]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-uiBorder01">
            <th className="typography-label11regular p-2 text-left text-text02">ID</th>
            <th className="typography-label11regular p-2 text-left text-text02">名前</th>
            <th className="typography-label11regular p-2 text-left text-text02">日時</th>
            <th className="typography-label11regular p-2 text-left text-text02" colSpan={2}>
              ステータス
            </th>
            <th className="typography-label11regular p-2 text-right text-text02" />
          </tr>
        </thead>
        <tbody>
          {interviewLogs.map((log, index) => (
            <tr key={index} className="border-b border-uiBorder01">
              <td className="typography-label14regular p-2 text-text01">{log.id}</td>
              <td className="typography-label14regular w-[100px] p-2 text-text01">
                <span className="block truncate">{log.name}</span>
              </td>
              <td className="typography-label14regular p-2 text-text01">{log.date}</td>
              <td className="p-2">
                <Status avatars={log.interviewer} />
              </td>
              <td className="p-2">
                <Status avatars={log.interviewee} />
              </td>
              <td className="p-2 text-right">
                <Button variant="outline" size="small">
                  詳細
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

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
