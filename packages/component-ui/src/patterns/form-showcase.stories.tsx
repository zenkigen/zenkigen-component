import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { DatePicker } from '../date-picker';
import { Heading } from '../heading';
import { Pagination } from '../pagination';
import { PasswordInput } from '../password-input';
import { Radio } from '../radio';
import { Search } from '../search';
import { Select } from '../select';
import type { SelectOption } from '../select/type';
import { Tab } from '../tab';
import { TextArea } from '../text-area';
import { TextInput } from '../text-input';
import { Toggle } from '../toggle';

const meta: Meta = {
  title: 'Patterns/Form Showcase',
  parameters: {
    layout: 'fullscreen',
    chromatic: { disable: true },
    docs: {
      description: {
        component:
          'フォーム系コンポーネントを実用レイアウトで配置した作例。Tab キーを押してフォーカスを順に送ると、各コンポーネントのフォーカス表現（リング・border 色変化・抜け）を一画面で比較確認できる。フォーカス対象が並んで初めて気づく不揃いの検出に使う想定。',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const timezoneOptions: SelectOption[] = [
  { id: '1', label: '(GMT+09:00) Asia/Tokyo', value: 'Asia/Tokyo' },
  { id: '2', label: '(GMT+00:00) UTC', value: 'UTC' },
  { id: '3', label: '(GMT-08:00) America/Los_Angeles', value: 'America/Los_Angeles' },
  { id: '4', label: '(GMT+01:00) Europe/London', value: 'Europe/London' },
];

function AccountSettingsForm() {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('山田 太郎');
  const [email, setEmail] = useState('taro@example.com');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState<SelectOption | null>(timezoneOptions[0] ?? null);
  const [searchValue, setSearchValue] = useState('');
  const [bio, setBio] = useState('');
  const [isEmailNotificationOn, setIsEmailNotificationOn] = useState(true);
  const [isPushNotificationOn, setIsPushNotificationOn] = useState(false);
  const [isNewsletterProductChecked, setIsNewsletterProductChecked] = useState(true);
  const [isNewsletterCampaignChecked, setIsNewsletterCampaignChecked] = useState(false);
  const [isNewsletterSecurityChecked, setIsNewsletterSecurityChecked] = useState(true);
  const [isTwoFactorOn, setIsTwoFactorOn] = useState(false);
  const [theme, setTheme] = useState('system');
  const [page, setPage] = useState(1);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value);
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => setTheme(e.target.value);

  return (
    <div className="bg-uiBackground02" style={{ minHeight: '100vh', padding: '40px 16px' }}>
      <div
        className="flex flex-col gap-6 rounded border border-uiBorder01 bg-uiBackground01 p-6 shadow-floatingShadow"
        style={{ maxWidth: '760px', margin: '0 auto' }}
      >
        <header className="flex flex-col gap-2">
          <Heading level={1}>アカウント設定</Heading>
          <p className="typography-label14regular text-text02">
            Tab
            キーでフォーカスを順送りし、各コンポーネントのフォーカス表現（リング太さ・色・オフセット・抜けの有無）を比較できます。
          </p>
        </header>

        <Tab>
          <Tab.Item id="profile" isSelected={activeTab === 'profile'} onClick={setActiveTab}>
            基本情報
          </Tab.Item>
          <Tab.Item id="notification" isSelected={activeTab === 'notification'} onClick={setActiveTab}>
            通知
          </Tab.Item>
          <Tab.Item id="security" isSelected={activeTab === 'security'} onClick={setActiveTab}>
            セキュリティ
          </Tab.Item>
        </Tab>

        <section className="flex flex-col gap-6">
          <Heading level={2}>基本情報</Heading>

          <label className="flex flex-col gap-1">
            <span className="typography-label14bold text-text01">表示名</span>
            <TextInput value={name} onChange={handleNameChange} placeholder="表示名を入力" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="typography-label14bold text-text01">メールアドレス</span>
            <TextInput value={email} onChange={handleEmailChange} placeholder="email@example.com" type="email">
              <TextInput.HelperMessage>ログインや通知の送信先として利用されます。</TextInput.HelperMessage>
            </TextInput>
          </label>

          <label className="flex flex-col gap-1">
            <span className="typography-label14bold text-text01">パスワード</span>
            <PasswordInput value={password} onChange={handlePasswordChange} placeholder="パスワードを入力" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="typography-label14bold text-text01">生年月日</span>
            <DatePicker value={birthday} onChange={setBirthday} placeholder="日付を選択" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="typography-label14bold text-text01">タイムゾーン</span>
            <Select selectedOption={timezone} onChange={setTimezone} placeholder="タイムゾーンを選択" width="100%">
              {timezoneOptions.map((option) => (
                <Select.Option key={option.id} option={option} />
              ))}
            </Select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="typography-label14bold text-text01">メンバーを検索</span>
            <Search value={searchValue} onChange={handleSearchChange} placeholder="名前で検索" />
          </label>

          <label className="flex flex-col gap-1">
            <span className="typography-label14bold text-text01">自己紹介</span>
            <TextArea value={bio} onChange={handleBioChange} placeholder="自己紹介を入力" />
          </label>
        </section>

        <section className="flex flex-col gap-6">
          <Heading level={2}>通知</Heading>

          <Toggle
            id="email-notification"
            size="medium"
            isChecked={isEmailNotificationOn}
            onChange={() => setIsEmailNotificationOn((v) => !v)}
            label="メール通知を受け取る"
          />
          <Toggle
            id="push-notification"
            size="medium"
            isChecked={isPushNotificationOn}
            onChange={() => setIsPushNotificationOn((v) => !v)}
            label="プッシュ通知を受け取る"
          />

          <fieldset className="flex flex-col gap-2">
            <legend className="typography-label14bold mb-2 text-text01">ニュースレター購読</legend>
            <Checkbox
              id="newsletter-product"
              label="プロダクトアップデート"
              isChecked={isNewsletterProductChecked}
              onChange={() => setIsNewsletterProductChecked((v) => !v)}
            />
            <Checkbox
              id="newsletter-campaign"
              label="キャンペーン情報"
              isChecked={isNewsletterCampaignChecked}
              onChange={() => setIsNewsletterCampaignChecked((v) => !v)}
            />
            <Checkbox
              id="newsletter-security"
              label="セキュリティ通知"
              isChecked={isNewsletterSecurityChecked}
              onChange={() => setIsNewsletterSecurityChecked((v) => !v)}
            />
          </fieldset>
        </section>

        <section className="flex flex-col gap-6">
          <Heading level={2}>セキュリティ</Heading>

          <Toggle
            id="two-factor"
            size="medium"
            isChecked={isTwoFactorOn}
            onChange={() => setIsTwoFactorOn((v) => !v)}
            label="2 要素認証を有効にする"
          />

          <fieldset className="flex flex-col gap-2">
            <legend className="typography-label14bold mb-2 text-text01">テーマ</legend>
            <Radio
              id="theme-light"
              name="theme"
              value="light"
              label="ライト"
              isChecked={theme === 'light'}
              onChange={handleThemeChange}
            />
            <Radio
              id="theme-dark"
              name="theme"
              value="dark"
              label="ダーク"
              isChecked={theme === 'dark'}
              onChange={handleThemeChange}
            />
            <Radio
              id="theme-system"
              name="theme"
              value="system"
              label="システム設定に従う"
              isChecked={theme === 'system'}
              onChange={handleThemeChange}
            />
          </fieldset>
        </section>

        <footer className="flex justify-end gap-2 border-t border-uiBorder01 pt-6">
          <Button variant="text">キャンセル</Button>
          <Button variant="fill">保存</Button>
        </footer>

        <section className="flex flex-col gap-4">
          <Heading level={2}>変更履歴</Heading>
          <p className="typography-label14regular text-text02">
            ページ送りボタンも Tab 巡回対象。リング表示の有無を確認してください。
          </p>
          <Pagination currentPage={page} totalPage={10} onClick={setPage} />
        </section>
      </div>
    </div>
  );
}

export const FormShowcase: Story = {
  render: () => <AccountSettingsForm />,
};
