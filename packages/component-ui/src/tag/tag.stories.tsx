import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    variant: {
      options: ['normal', 'light'],
      control: { type: 'radio' },
      description: '濃色(normal) / 淡色(light)のスタイル',
      table: {
        type: { summary: `'normal' | 'light'` },
        defaultValue: { summary: 'normal' },
      },
    },
    size: {
      options: ['x-small', 'small', 'medium'],
      control: { type: 'radio' },
      description: '標準タグのサイズ。編集可能タグは常にmedium固定。',
      table: {
        type: { summary: `'x-small' | 'small' | 'medium'` },
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      options: [
        'supportError',
        'supportSuccess',
        'supportWarning',
        'supportDanger',
        'userRed',
        'userPink',
        'userPurple',
        'userTurquoise',
        'userRoyalBlue',
        'userBlue',
        'userAquamarine',
        'userYellowGreen',
        'userYellow',
        'userOrange',
        'default',
        'gray',
      ],
      control: { type: 'radio' },
      description: 'tagColors / tagLightColors で定義されたカラートークン',
    },
    children: {
      control: { type: 'text' },
      description: 'タグに表示するテキスト',
    },
    onDelete: { action: 'tag削除' },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Component: Story = {
  args: {
    size: 'medium',
    variant: 'normal',
    children: '重要',
    color: 'default',
    id: 'component',
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: ({ onDelete, isEditable, size, ...rest }) => {
    const handleDelete = onDelete ?? action('tag削除');
    const displaySize = isEditable === true ? 'medium' : size;

    return (
      <div className="flex items-center justify-center gap-x-4">
        {isEditable !== true && <Tag {...rest} size={displaySize} />}
        <Tag
          variant={rest.variant}
          color={rest.color}
          size="medium"
          id="component-editable"
          isEditable
          onDelete={handleDelete}
        >
          {rest.children}
        </Tag>
      </div>
    );
  },
};

export const Support: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="support-error-xs" color="supportError" size="x-small">
            エラー
          </Tag>
          <Tag id="support-success-xs" color="supportSuccess" size="x-small">
            成功
          </Tag>
          <Tag id="support-warning-xs" color="supportWarning" size="x-small">
            警告
          </Tag>
          <Tag id="support-danger-xs" color="supportDanger" size="x-small">
            危険
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="support-error-sm" color="supportError" size="small">
            エラー
          </Tag>
          <Tag id="support-success-sm" color="supportSuccess" size="small">
            成功
          </Tag>
          <Tag id="support-warning-sm" color="supportWarning" size="small">
            警告
          </Tag>
          <Tag id="support-danger-sm" color="supportDanger" size="small">
            危険
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="support-error-md" color="supportError" size="medium">
            エラー
          </Tag>
          <Tag id="support-success-md" color="supportSuccess" size="medium">
            成功
          </Tag>
          <Tag id="support-warning-md" color="supportWarning" size="medium">
            警告
          </Tag>
          <Tag id="support-danger-md" color="supportDanger" size="medium">
            危険
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="support-error-light-xs" color="supportError" variant="light" size="x-small">
            エラー
          </Tag>
          <Tag id="support-success-light-xs" color="supportSuccess" variant="light" size="x-small">
            成功
          </Tag>
          <Tag id="support-warning-light-xs" color="supportWarning" variant="light" size="x-small">
            警告
          </Tag>
          <Tag id="support-danger-light-xs" color="supportDanger" variant="light" size="x-small">
            危険
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="support-error-light-sm" color="supportError" variant="light" size="small">
            エラー
          </Tag>
          <Tag id="support-success-light-sm" color="supportSuccess" variant="light" size="small">
            成功
          </Tag>
          <Tag id="support-warning-light-sm" color="supportWarning" variant="light" size="small">
            警告
          </Tag>
          <Tag id="support-danger-light-sm" color="supportDanger" variant="light" size="small">
            危険
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="support-error-light-md" color="supportError" variant="light" size="medium">
            エラー
          </Tag>
          <Tag id="support-success-light-md" color="supportSuccess" variant="light" size="medium">
            成功
          </Tag>
          <Tag id="support-warning-light-md" color="supportWarning" variant="light" size="medium">
            警告
          </Tag>
          <Tag id="support-danger-light-md" color="supportDanger" variant="light" size="medium">
            危険
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const User: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="user-red-xs" color="userRed" size="x-small">
            営業
          </Tag>
          <Tag id="user-pink-xs" color="userPink" size="x-small">
            広報
          </Tag>
          <Tag id="user-purple-xs" color="userPurple" size="x-small">
            企画
          </Tag>
          <Tag id="user-turquoise-xs" color="userTurquoise" size="x-small">
            開発
          </Tag>
          <Tag id="user-royal-blue-xs" color="userRoyalBlue" size="x-small">
            デザイン
          </Tag>
          <Tag id="user-blue-xs" color="userBlue" size="x-small">
            CS
          </Tag>
          <Tag id="user-aquamarine-xs" color="userAquamarine" size="x-small">
            人事
          </Tag>
          <Tag id="user-yellow-green-xs" color="userYellowGreen" size="x-small">
            法務
          </Tag>
          <Tag id="user-yellow-xs" color="userYellow" size="x-small">
            経理
          </Tag>
          <Tag id="user-orange-xs" color="userOrange" size="x-small">
            総務
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="user-red-sm" color="userRed" size="small">
            営業
          </Tag>
          <Tag id="user-pink-sm" color="userPink" size="small">
            広報
          </Tag>
          <Tag id="user-purple-sm" color="userPurple" size="small">
            企画
          </Tag>
          <Tag id="user-turquoise-sm" color="userTurquoise" size="small">
            開発
          </Tag>
          <Tag id="user-royal-blue-sm" color="userRoyalBlue" size="small">
            デザイン
          </Tag>
          <Tag id="user-blue-sm" color="userBlue" size="small">
            CS
          </Tag>
          <Tag id="user-aquamarine-sm" color="userAquamarine" size="small">
            人事
          </Tag>
          <Tag id="user-yellow-green-sm" color="userYellowGreen" size="small">
            法務
          </Tag>
          <Tag id="user-yellow-sm" color="userYellow" size="small">
            経理
          </Tag>
          <Tag id="user-orange-sm" color="userOrange" size="small">
            総務
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="user-red-md" color="userRed" size="medium">
            営業
          </Tag>
          <Tag id="user-pink-md" color="userPink" size="medium">
            広報
          </Tag>
          <Tag id="user-purple-md" color="userPurple" size="medium">
            企画
          </Tag>
          <Tag id="user-turquoise-md" color="userTurquoise" size="medium">
            開発
          </Tag>
          <Tag id="user-royal-blue-md" color="userRoyalBlue" size="medium">
            デザイン
          </Tag>
          <Tag id="user-blue-md" color="userBlue" size="medium">
            CS
          </Tag>
          <Tag id="user-aquamarine-md" color="userAquamarine" size="medium">
            人事
          </Tag>
          <Tag id="user-yellow-green-md" color="userYellowGreen" size="medium">
            法務
          </Tag>
          <Tag id="user-yellow-md" color="userYellow" size="medium">
            経理
          </Tag>
          <Tag id="user-orange-md" color="userOrange" size="medium">
            総務
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="user-red-light-xs" color="userRed" variant="light" size="x-small">
            営業
          </Tag>
          <Tag id="user-pink-light-xs" color="userPink" variant="light" size="x-small">
            広報
          </Tag>
          <Tag id="user-purple-light-xs" color="userPurple" variant="light" size="x-small">
            企画
          </Tag>
          <Tag id="user-turquoise-light-xs" color="userTurquoise" variant="light" size="x-small">
            開発
          </Tag>
          <Tag id="user-royal-blue-light-xs" color="userRoyalBlue" variant="light" size="x-small">
            デザイン
          </Tag>
          <Tag id="user-blue-light-xs" color="userBlue" variant="light" size="x-small">
            CS
          </Tag>
          <Tag id="user-aquamarine-light-xs" color="userAquamarine" variant="light" size="x-small">
            人事
          </Tag>
          <Tag id="user-yellow-green-light-xs" color="userYellowGreen" variant="light" size="x-small">
            法務
          </Tag>
          <Tag id="user-yellow-light-xs" color="userYellow" variant="light" size="x-small">
            経理
          </Tag>
          <Tag id="user-orange-light-xs" color="userOrange" variant="light" size="x-small">
            総務
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="user-red-light-sm" color="userRed" variant="light" size="small">
            営業
          </Tag>
          <Tag id="user-pink-light-sm" color="userPink" variant="light" size="small">
            広報
          </Tag>
          <Tag id="user-purple-light-sm" color="userPurple" variant="light" size="small">
            企画
          </Tag>
          <Tag id="user-turquoise-light-sm" color="userTurquoise" variant="light" size="small">
            開発
          </Tag>
          <Tag id="user-royal-blue-light-sm" color="userRoyalBlue" variant="light" size="small">
            デザイン
          </Tag>
          <Tag id="user-blue-light-sm" color="userBlue" variant="light" size="small">
            CS
          </Tag>
          <Tag id="user-aquamarine-light-sm" color="userAquamarine" variant="light" size="small">
            人事
          </Tag>
          <Tag id="user-yellow-green-light-sm" color="userYellowGreen" variant="light" size="small">
            法務
          </Tag>
          <Tag id="user-yellow-light-sm" color="userYellow" variant="light" size="small">
            経理
          </Tag>
          <Tag id="user-orange-light-sm" color="userOrange" variant="light" size="small">
            総務
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="user-red-light-md" color="userRed" variant="light" size="medium">
            営業
          </Tag>
          <Tag id="user-pink-light-md" color="userPink" variant="light" size="medium">
            広報
          </Tag>
          <Tag id="user-purple-light-md" color="userPurple" variant="light" size="medium">
            企画
          </Tag>
          <Tag id="user-turquoise-light-md" color="userTurquoise" variant="light" size="medium">
            開発
          </Tag>
          <Tag id="user-royal-blue-light-md" color="userRoyalBlue" variant="light" size="medium">
            デザイン
          </Tag>
          <Tag id="user-blue-light-md" color="userBlue" variant="light" size="medium">
            CS
          </Tag>
          <Tag id="user-aquamarine-light-md" color="userAquamarine" variant="light" size="medium">
            人事
          </Tag>
          <Tag id="user-yellow-green-light-md" color="userYellowGreen" variant="light" size="medium">
            法務
          </Tag>
          <Tag id="user-yellow-light-md" color="userYellow" variant="light" size="medium">
            経理
          </Tag>
          <Tag id="user-orange-light-md" color="userOrange" variant="light" size="medium">
            総務
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const Basic: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="basic-default-xs" color="default" size="x-small">
            通常
          </Tag>
          <Tag id="basic-gray-xs" color="gray" size="x-small">
            グレー
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="basic-default-sm" color="default" size="small">
            通常
          </Tag>
          <Tag id="basic-gray-sm" color="gray" size="small">
            グレー
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="basic-default-md" color="default" size="medium">
            通常
          </Tag>
          <Tag id="basic-gray-md" color="gray" size="medium">
            グレー
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="basic-default-light-xs" color="default" variant="light" size="x-small">
            通常
          </Tag>
          <Tag id="basic-gray-light-xs" color="gray" variant="light" size="x-small">
            グレー
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="basic-default-light-sm" color="default" variant="light" size="small">
            通常
          </Tag>
          <Tag id="basic-gray-light-sm" color="gray" variant="light" size="small">
            グレー
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="basic-default-light-md" color="default" variant="light" size="medium">
            通常
          </Tag>
          <Tag id="basic-gray-light-md" color="gray" variant="light" size="medium">
            グレー
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const Editable: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="edit-supportError-normal" color="supportError" isEditable onDelete={action('tag削除')}>
            エラー
          </Tag>
          <Tag id="edit-supportSuccess-normal" color="supportSuccess" isEditable onDelete={action('tag削除')}>
            成功
          </Tag>
          <Tag id="edit-supportWarning-normal" color="supportWarning" isEditable onDelete={action('tag削除')}>
            警告
          </Tag>
          <Tag id="edit-supportDanger-normal" color="supportDanger" isEditable onDelete={action('tag削除')}>
            危険
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag
            id="edit-supportError-light"
            color="supportError"
            variant="light"
            isEditable
            onDelete={action('tag削除')}
          >
            エラー
          </Tag>
          <Tag
            id="edit-supportSuccess-light"
            color="supportSuccess"
            variant="light"
            isEditable
            onDelete={action('tag削除')}
          >
            成功
          </Tag>
          <Tag
            id="edit-supportWarning-light"
            color="supportWarning"
            variant="light"
            isEditable
            onDelete={action('tag削除')}
          >
            警告
          </Tag>
          <Tag
            id="edit-supportDanger-light"
            color="supportDanger"
            variant="light"
            isEditable
            onDelete={action('tag削除')}
          >
            危険
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="edit-userRed-normal" color="userRed" isEditable onDelete={action('tag削除')}>
            営業
          </Tag>
          <Tag id="edit-userPink-normal" color="userPink" isEditable onDelete={action('tag削除')}>
            広報
          </Tag>
          <Tag id="edit-userPurple-normal" color="userPurple" isEditable onDelete={action('tag削除')}>
            企画
          </Tag>
          <Tag id="edit-userTurquoise-normal" color="userTurquoise" isEditable onDelete={action('tag削除')}>
            開発
          </Tag>
          <Tag id="edit-userRoyalBlue-normal" color="userRoyalBlue" isEditable onDelete={action('tag削除')}>
            デザイン
          </Tag>
          <Tag id="edit-userBlue-normal" color="userBlue" isEditable onDelete={action('tag削除')}>
            CS
          </Tag>
          <Tag id="edit-userAquamarine-normal" color="userAquamarine" isEditable onDelete={action('tag削除')}>
            人事
          </Tag>
          <Tag id="edit-userYellowGreen-normal" color="userYellowGreen" isEditable onDelete={action('tag削除')}>
            法務
          </Tag>
          <Tag id="edit-userYellow-normal" color="userYellow" isEditable onDelete={action('tag削除')}>
            経理
          </Tag>
          <Tag id="edit-userOrange-normal" color="userOrange" isEditable onDelete={action('tag削除')}>
            総務
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="edit-userRed-light" color="userRed" variant="light" isEditable onDelete={action('tag削除')}>
            営業
          </Tag>
          <Tag id="edit-userPink-light" color="userPink" variant="light" isEditable onDelete={action('tag削除')}>
            広報
          </Tag>
          <Tag id="edit-userPurple-light" color="userPurple" variant="light" isEditable onDelete={action('tag削除')}>
            企画
          </Tag>
          <Tag
            id="edit-userTurquoise-light"
            color="userTurquoise"
            variant="light"
            isEditable
            onDelete={action('tag削除')}
          >
            開発
          </Tag>
          <Tag
            id="edit-userRoyalBlue-light"
            color="userRoyalBlue"
            variant="light"
            isEditable
            onDelete={action('tag削除')}
          >
            デザイン
          </Tag>
          <Tag id="edit-userBlue-light" color="userBlue" variant="light" isEditable onDelete={action('tag削除')}>
            CS
          </Tag>
          <Tag
            id="edit-userAquamarine-light"
            color="userAquamarine"
            variant="light"
            isEditable
            onDelete={action('tag削除')}
          >
            人事
          </Tag>
          <Tag
            id="edit-userYellowGreen-light"
            color="userYellowGreen"
            variant="light"
            isEditable
            onDelete={action('tag削除')}
          >
            法務
          </Tag>
          <Tag id="edit-userYellow-light" color="userYellow" variant="light" isEditable onDelete={action('tag削除')}>
            経理
          </Tag>
          <Tag id="edit-userOrange-light" color="userOrange" variant="light" isEditable onDelete={action('tag削除')}>
            総務
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag id="edit-default-normal" color="default" isEditable onDelete={action('tag削除')}>
            通常
          </Tag>
          <Tag id="edit-gray-normal" color="gray" isEditable onDelete={action('tag削除')}>
            グレー
          </Tag>
        </div>
        <div className="flex items-center gap-2">
          <Tag id="edit-default-light" color="default" variant="light" isEditable onDelete={action('tag削除')}>
            通常
          </Tag>
          <Tag id="edit-gray-light" color="gray" variant="light" isEditable onDelete={action('tag削除')}>
            グレー
          </Tag>
        </div>
      </div>
    </div>
  ),
};
