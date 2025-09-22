import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Select } from '../select';
import type { SelectOption } from '../select/type';
import { TextArea } from '../text-area';
import { TextInput } from '../text-input';
import { CornerDialog } from '.';

const meta: Meta<typeof CornerDialog> = {
  title: 'Components/CornerDialog',
  component: CornerDialog,
  parameters: {
    docs: {
      source: {
        code: ``,
      },
    },
  },
  argTypes: {
    position: {
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      control: { type: 'radio' },
      description: 'ダイアログの表示位置',
    },
    isShow: {
      control: { type: 'boolean' },
      description: 'ダイアログの表示状態',
    },
    width: { control: 'text', description: '幅（320px以上が指定できる）' },
    height: { control: 'text', description: '高さ（184px以上が指定できる）' },
    maxWidth: { control: 'text', description: '最大幅' },
    onClose: { action: 'onClose', description: '閉じる操作が発生したときのコールバック' },
  },
};

type Story = StoryObj<typeof CornerDialog>;

export default meta;

const themeOptions: SelectOption[] = [
  { id: 'light', label: 'ライト', value: 'light' },
  { id: 'dark', label: 'ダーク', value: 'dark' },
  { id: 'system', label: 'システム設定に従う', value: 'system' },
];

export const Component: Story = {
  args: {
    position: 'top-right',
    isShow: true,
    width: 320,
    onClose: action('onClose'),
  },
  render: function MyFunc({ ...args }) {
    return (
      <CornerDialog {...args}>
        <CornerDialog.Header>設定</CornerDialog.Header>
        <CornerDialog.Body>
          <div className="flex w-full items-center justify-center py-20">
            <span className="typography-body14regular text-text01">CornerDialog コンテンツ</span>
          </div>
        </CornerDialog.Body>
        <CornerDialog.Footer>
          <div className="flex w-full justify-end gap-2">
            <Button variant="outline" onClick={action('キャンセル')}>
              キャンセル
            </Button>
            <Button variant="fill" onClick={action('保存')}>
              保存
            </Button>
          </div>
        </CornerDialog.Footer>
      </CornerDialog>
    );
  },
};

export function SettingsExample() {
  const [isShowDialog, setIsShowDialog] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState<SelectOption | null>(null);
  const [isEmailNotification, setIsEmailNotification] = React.useState(true);
  const [isPushNotification, setIsPushNotification] = React.useState(false);

  return (
    <div className="min-h-96 p-8">
      <div className="space-y-4">
        <h2 className="typography-h4 text-text01">設定ダイアログの例</h2>
        <Button onClick={() => setIsShowDialog(true)}>設定を表示</Button>
      </div>

      <CornerDialog position="top-right" isShow={isShowDialog} width={320} onClose={() => setIsShowDialog(false)}>
        <CornerDialog.Header>設定</CornerDialog.Header>
        <CornerDialog.Body>
          <div className="space-y-4 p-4">
            <div>
              <label className="typography-body14bold block text-text01">通知設定</label>
              <div className="mt-2 space-y-2">
                <Checkbox
                  id="email-notification"
                  label="メール通知を受け取る"
                  isChecked={isEmailNotification}
                  onChange={() => setIsEmailNotification(!isEmailNotification)}
                />
                <Checkbox
                  id="push-notification"
                  label="プッシュ通知を受け取る"
                  isChecked={isPushNotification}
                  onChange={() => setIsPushNotification(!isPushNotification)}
                />
              </div>
            </div>
            <div>
              <label className="typography-body14bold block text-text01">テーマ</label>
              <div className="mt-1">
                <Select
                  placeholder="テーマを選択してください"
                  selectedOption={selectedTheme}
                  onChange={(option) => setSelectedTheme(option)}
                  width="100%"
                >
                  {themeOptions.map((option) => (
                    <Select.Option key={option.id} option={option} />
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </CornerDialog.Body>
        <CornerDialog.Footer>
          <div className="flex w-full justify-end gap-2">
            <Button variant="outline" onClick={() => setIsShowDialog(false)}>
              キャンセル
            </Button>
            <Button variant="fill" onClick={() => setIsShowDialog(false)}>
              保存
            </Button>
          </div>
        </CornerDialog.Footer>
      </CornerDialog>
    </div>
  );
}

export function MultipleDialogsExample() {
  const [isShowInfoDialog, setIsShowInfoDialog] = React.useState(false);
  const [isShowFormDialog, setIsShowFormDialog] = React.useState(false);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = React.useState(false);
  const [subjectValue, setSubjectValue] = React.useState('');
  const [contentValue, setContentValue] = React.useState('');

  return (
    <div className="min-h-96 p-8">
      <div className="space-y-4">
        <h2 className="typography-h4 text-text01">複数CornerDialogの例</h2>
        <div className="space-x-2">
          <Button onClick={() => setIsShowInfoDialog(true)}>お知らせ</Button>
          <Button onClick={() => setIsShowFormDialog(true)}>フィードバック</Button>
          <Button onClick={() => setIsShowConfirmDialog(true)}>確認ダイアログ</Button>
        </div>
      </div>

      {/* 情報表示Dialog */}
      <CornerDialog
        position="top-left"
        isShow={isShowInfoDialog}
        width={280}
        onClose={() => setIsShowInfoDialog(false)}
      >
        <CornerDialog.Header>お知らせ</CornerDialog.Header>
        <CornerDialog.Body>
          <div className="p-4">
            <div className="mb-3 flex items-center">
              <div className="mr-3 flex size-10 items-center justify-center rounded-full bg-uiBackgroundBlue">
                <span className="text-supportInfo">ℹ️</span>
              </div>
              <div>
                <h3 className="typography-body14bold text-text01">システムメンテナンス</h3>
                <p className="typography-body12regular text-text03">2024年1月15日 2:00-4:00</p>
              </div>
            </div>
            <p className="typography-body14regular text-text02">
              定期メンテナンスのため、上記時間帯はサービスを一時停止いたします。
            </p>
          </div>
        </CornerDialog.Body>
        <CornerDialog.Footer isNoBorder>
          <div className="flex w-full justify-end">
            <Button variant="fill" onClick={() => setIsShowInfoDialog(false)}>
              了解
            </Button>
          </div>
        </CornerDialog.Footer>
      </CornerDialog>

      {/* フォーム入力Dialog */}
      <CornerDialog
        position="bottom-left"
        isShow={isShowFormDialog}
        width={320}
        onClose={() => setIsShowFormDialog(false)}
      >
        <CornerDialog.Header>フィードバック送信</CornerDialog.Header>
        <CornerDialog.Body>
          <div className="space-y-4 p-4">
            <div>
              <label className="typography-body14bold block text-text01">件名</label>
              <div className="mt-1">
                <TextInput
                  value={subjectValue}
                  onChange={(e) => setSubjectValue(e.target.value)}
                  placeholder="件名を入力してください"
                />
              </div>
            </div>
            <div>
              <label className="typography-body14bold block text-text01">内容</label>
              <div className="mt-1">
                <TextArea
                  value={contentValue}
                  onChange={(e) => setContentValue(e.target.value)}
                  placeholder="フィードバック内容を入力してください"
                  height="6rem"
                />
              </div>
            </div>
          </div>
        </CornerDialog.Body>
        <CornerDialog.Footer>
          <div className="flex w-full justify-end gap-2">
            <Button variant="outline" onClick={() => setIsShowFormDialog(false)}>
              キャンセル
            </Button>
            <Button variant="fill" onClick={() => setIsShowFormDialog(false)}>
              送信
            </Button>
          </div>
        </CornerDialog.Footer>
      </CornerDialog>

      {/* 確認Dialog */}
      <CornerDialog
        position="bottom-right"
        isShow={isShowConfirmDialog}
        width={300}
        onClose={() => setIsShowConfirmDialog(false)}
      >
        <CornerDialog.Header isNoBorder>削除の確認</CornerDialog.Header>
        <CornerDialog.Body>
          <div className="px-4 py-2">
            <div className="flex items-center">
              <div className="mr-3 flex size-12 items-center justify-center rounded-full bg-uiBackgroundError">
                <span className="text-supportError">⚠️</span>
              </div>
              <div>
                <p className="typography-body14bold text-text01">本当に削除しますか？</p>
                <p className="typography-body12regular mt-1 text-text03">この操作は取り消せません</p>
              </div>
            </div>
          </div>
        </CornerDialog.Body>
        <CornerDialog.Footer isNoBorder>
          <div className="flex w-full justify-end gap-2">
            <Button variant="outline" onClick={() => setIsShowConfirmDialog(false)}>
              キャンセル
            </Button>
            <Button variant="fillDanger" onClick={() => setIsShowConfirmDialog(false)}>
              削除
            </Button>
          </div>
        </CornerDialog.Footer>
      </CornerDialog>
    </div>
  );
}
