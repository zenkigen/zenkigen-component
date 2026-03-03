import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    variant: {
      options: ['normal', 'light'],
      control: { type: 'select' },
      description: '濃色(normal) / 淡色(light)のスタイル',
      table: {
        type: { summary: `'normal' | 'light'` },
        defaultValue: { summary: 'normal' },
      },
    },
    size: {
      options: ['x-small', 'small', 'medium'],
      control: { type: 'select' },
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
      control: { type: 'select' },
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
    children: 'タグラベル',
    color: 'default',
    id: '1',
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: ({ onDelete, isEditable, size, ...rest }) => {
    const handleDelete = onDelete ?? action('tag削除');
    const displaySize = isEditable ? 'medium' : size;

    return (
      <div className="flex items-center justify-center gap-x-4">
        {typeof isEditable === 'undefined' && <Tag {...rest} size={displaySize} />}
        <Tag variant={rest.variant} color={rest.color} size="medium" id="2" isEditable onDelete={handleDelete}>
          {rest.children}
        </Tag>
      </div>
    );
  },
};

export function Basic() {
  return (
    <>
      <h2 className="mb-1 text-gray-gray50">Support</h2>
      <div className="flex items-center gap-x-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="supportError" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="supportError" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="supportError" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="supportSuccess" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="supportSuccess" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="supportSuccess" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="supportWarning" size="medium">
            タグラベル
          </Tag>
          <Tag id="3" color="supportWarning" size="small">
            タグラベル
          </Tag>
          <Tag id="3" color="supportWarning" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="supportDanger" size="medium">
            タグラベル
          </Tag>
          <Tag id="4" color="supportDanger" size="small">
            タグラベル
          </Tag>
          <Tag id="4" color="supportDanger" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex items-center gap-x-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="supportError" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="supportError" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="supportError" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="supportSuccess" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="supportSuccess" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="supportSuccess" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="supportWarning" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="3" color="supportWarning" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="3" color="supportWarning" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="supportDanger" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="4" color="supportDanger" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="4" color="supportDanger" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <h2 className="mb-1 text-gray-gray50">User</h2>
      <div className="flex flex-wrap items-center gap-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="userRed" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="userRed" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="userRed" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="userPink" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="userPink" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="userPink" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="userPurple" size="medium">
            タグラベル
          </Tag>
          <Tag id="3" color="userPurple" size="small">
            タグラベル
          </Tag>
          <Tag id="3" color="userPurple" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="userTurquoise" size="medium">
            タグラベル
          </Tag>
          <Tag id="4" color="userTurquoise" size="small">
            タグラベル
          </Tag>
          <Tag id="4" color="userTurquoise" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="5" color="userRoyalBlue" size="medium">
            タグラベル
          </Tag>
          <Tag id="5" color="userRoyalBlue" size="small">
            タグラベル
          </Tag>
          <Tag id="5" color="userRoyalBlue" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="6" color="userBlue" size="medium">
            タグラベル
          </Tag>
          <Tag id="6" color="userBlue" size="small">
            タグラベル
          </Tag>
          <Tag id="6" color="userBlue" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="7" color="userAquamarine" size="medium">
            タグラベル
          </Tag>
          <Tag id="7" color="userAquamarine" size="small">
            タグラベル
          </Tag>
          <Tag id="7" color="userAquamarine" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="8" color="userYellowGreen" size="medium">
            タグラベル
          </Tag>
          <Tag id="8" color="userYellowGreen" size="small">
            タグラベル
          </Tag>
          <Tag id="8" color="userYellowGreen" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="userYellow" size="medium">
            タグラベル
          </Tag>
          <Tag id="9" color="userYellow" size="small">
            タグラベル
          </Tag>
          <Tag id="9" color="userYellow" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="userOrange" size="medium">
            タグラベル
          </Tag>
          <Tag id="9" color="userOrange" size="small">
            タグラベル
          </Tag>
          <Tag id="9" color="userOrange" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex flex-wrap items-center gap-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="userRed" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="userRed" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="userRed" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="userPink" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="userPink" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="userPink" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="userPurple" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="3" color="userPurple" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="3" color="userPurple" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="userTurquoise" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="4" color="userTurquoise" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="4" color="userTurquoise" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="5" color="userRoyalBlue" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="5" color="userRoyalBlue" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="5" color="userRoyalBlue" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="6" color="userBlue" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="6" color="userBlue" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="6" color="userBlue" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="7" color="userAquamarine" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="7" color="userAquamarine" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="7" color="userAquamarine" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="8" color="userYellowGreen" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="8" color="userYellowGreen" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="8" color="userYellowGreen" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="userYellow" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="9" color="userYellow" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="9" color="userYellow" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="10" color="userOrange" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="10" color="userOrange" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="10" color="userOrange" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <h2 className="mb-1 text-gray-gray50">Basic</h2>
      <div className="flex items-center gap-x-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="default" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="default" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="default" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="gray" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="gray" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="gray" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex items-center gap-x-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="default" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="default" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="default" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="gray" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="gray" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="gray" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
    </>
  );
}

export function Editable() {
  return (
    <>
      <h2 className="mb-1 text-gray-gray50">Support</h2>
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="supportError" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="supportSuccess" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="supportWarning" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="supportDanger" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="supportError" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="supportSuccess" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="supportWarning" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="supportDanger" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <h2 className="mb-1 text-gray-gray50">User</h2>
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="userRed" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="userPink" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="userPurple" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="userTurquoise" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="5" color="userRoyalBlue" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="6" color="userBlue" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="7" color="userAquamarine" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="8" color="userYellowGreen" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="userYellow" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="10" color="userOrange" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="userRed" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="userPink" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="userPurple" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="userTurquoise" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="5" color="userRoyalBlue" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="6" color="userBlue" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="7" color="userAquamarine" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="8" color="userYellowGreen" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="userYellow" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="10" color="userOrange" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <h2 className="mb-1 text-gray-gray50">Default</h2>
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="default" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>

        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="gray" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="default" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>

        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="gray" variant="light" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
    </>
  );
}
