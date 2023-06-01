import { action } from '@storybook/addon-actions';

import { Tag } from './tag';

export default {
  component: Tag,
};

export function Basic() {
  return (
    <>
      <h2 className="mb-1 text-gray-gray50">Support</h2>
      <div className="flex items-center gap-x-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="SupportError" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="SupportError" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="SupportError" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="SupportSuccess" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="SupportSuccess" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="SupportSuccess" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="SupportWarning" size="medium">
            タグラベル
          </Tag>
          <Tag id="3" color="SupportWarning" size="small">
            タグラベル
          </Tag>
          <Tag id="3" color="SupportWarning" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="SupportDanger" size="medium">
            タグラベル
          </Tag>
          <Tag id="4" color="SupportDanger" size="small">
            タグラベル
          </Tag>
          <Tag id="4" color="SupportDanger" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex items-center gap-x-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="SupportError" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="SupportError" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="SupportError" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="SupportSuccess" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="SupportSuccess" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="SupportSuccess" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="SupportWarning" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="3" color="SupportWarning" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="3" color="SupportWarning" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="SupportDanger" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="4" color="SupportDanger" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="4" color="SupportDanger" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <h2 className="mb-1 text-gray-gray50">User</h2>
      <div className="flex flex-wrap items-center gap-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="UserRed" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="UserRed" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="UserRed" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="UserPink" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="UserPink" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="UserPink" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="UserPurple" size="medium">
            タグラベル
          </Tag>
          <Tag id="3" color="UserPurple" size="small">
            タグラベル
          </Tag>
          <Tag id="3" color="UserPurple" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="UserTurquoise" size="medium">
            タグラベル
          </Tag>
          <Tag id="4" color="UserTurquoise" size="small">
            タグラベル
          </Tag>
          <Tag id="4" color="UserTurquoise" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="5" color="UserRoyalBlue" size="medium">
            タグラベル
          </Tag>
          <Tag id="5" color="UserRoyalBlue" size="small">
            タグラベル
          </Tag>
          <Tag id="5" color="UserRoyalBlue" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="6" color="UserBlue" size="medium">
            タグラベル
          </Tag>
          <Tag id="6" color="UserBlue" size="small">
            タグラベル
          </Tag>
          <Tag id="6" color="UserBlue" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="7" color="UserAquamarine" size="medium">
            タグラベル
          </Tag>
          <Tag id="7" color="UserAquamarine" size="small">
            タグラベル
          </Tag>
          <Tag id="7" color="UserAquamarine" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="8" color="UserYellowGreen" size="medium">
            タグラベル
          </Tag>
          <Tag id="8" color="UserYellowGreen" size="small">
            タグラベル
          </Tag>
          <Tag id="8" color="UserYellowGreen" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="UserYellow" size="medium">
            タグラベル
          </Tag>
          <Tag id="9" color="UserYellow" size="small">
            タグラベル
          </Tag>
          <Tag id="9" color="UserYellow" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex flex-wrap items-center gap-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="UserRed" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="UserRed" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="UserRed" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="UserPink" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="UserPink" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="UserPink" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="UserPurple" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="3" color="UserPurple" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="3" color="UserPurple" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="UserTurquoise" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="4" color="UserTurquoise" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="4" color="UserTurquoise" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="5" color="UserRoyalBlue" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="5" color="UserRoyalBlue" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="5" color="UserRoyalBlue" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="6" color="UserBlue" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="6" color="UserBlue" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="6" color="UserBlue" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="7" color="UserAquamarine" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="7" color="UserAquamarine" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="7" color="UserAquamarine" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="8" color="UserYellowGreen" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="8" color="UserYellowGreen" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="8" color="UserYellowGreen" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="UserYellow" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="9" color="UserYellow" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="9" color="UserYellow" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="10" color="UserOrange" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="10" color="UserOrange" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="10" color="UserOrange" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <h2 className="mb-1 text-gray-gray50">Basic</h2>
      <div className="flex items-center gap-x-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="Default" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="Default" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="Default" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="Gray" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="Gray" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="Gray" size="x-small">
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex items-center gap-x-5">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="Default" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="1" color="Default" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="1" color="Default" variant="light" size="x-small">
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="Gray" variant="light" size="medium">
            タグラベル
          </Tag>
          <Tag id="2" color="Gray" variant="light" size="small">
            タグラベル
          </Tag>
          <Tag id="2" color="Gray" variant="light" size="x-small">
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
          <Tag id="1" color="SupportError" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="SupportSuccess" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="SupportWarning" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="SupportDanger" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="SupportError" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="SupportSuccess" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="SupportWarning" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="SupportDanger" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <h2 className="mb-1 text-gray-gray50">User</h2>
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="UserRed" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="UserPink" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="UserPurple" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="UserTurquoise" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="5" color="UserRoyalBlue" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="6" color="UserBlue" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="7" color="UserAquamarine" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="8" color="UserYellowGreen" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="UserYellow" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="10" color="UserOrange" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="UserRed" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="UserPink" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="3" color="UserPurple" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="4" color="UserTurquoise" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="5" color="UserRoyalBlue" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="6" color="UserBlue" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="7" color="UserAquamarine" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="8" color="UserYellowGreen" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="9" color="UserYellow" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
        <div className="grid justify-items-start gap-y-2">
          <Tag id="10" color="UserOrange" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <h2 className="mb-1 text-gray-gray50">Default</h2>
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="Default" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>

        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="Gray" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
      <br />
      <div className="flex gap-x-3">
        <div className="grid justify-items-start gap-y-2">
          <Tag id="1" color="Default" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>

        <div className="grid justify-items-start gap-y-2">
          <Tag id="2" color="Gray" variant="light" size="medium" isEditable onDelete={action('tag削除')}>
            タグラベル
          </Tag>
        </div>
      </div>
    </>
  );
}
