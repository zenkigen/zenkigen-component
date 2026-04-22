import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';

import { Icon } from '../icon';
import { Combobox } from './combobox';
import type { ComboboxChangeMeta } from './combobox.types';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  argTypes: {
    size: {
      control: 'radio',
      options: ['medium', 'large'],
      description: 'サイズ',
      table: { defaultValue: { summary: 'medium' } },
    },
    variant: {
      control: 'radio',
      options: ['outline', 'text'],
      description: 'バリアント',
      table: { defaultValue: { summary: 'outline' } },
    },
    placeholder: { control: 'text', description: 'プレースホルダー' },
    isError: {
      control: 'boolean',
      description: 'エラー状態',
      table: { defaultValue: { summary: 'false' } },
    },
    isDisabled: {
      control: 'boolean',
      description: '無効状態',
      table: { defaultValue: { summary: 'false' } },
    },
    width: { control: 'text', description: '幅' },
    maxWidth: { control: 'text', description: '最大幅' },
    matchListToTrigger: {
      control: 'boolean',
      description: 'true のとき候補リストの幅を input と一致させる',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const noop = () => {
  // intentionally empty
};

const fruits = [
  { value: 'apple', label: 'りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'cherry', label: 'さくらんぼ' },
  { value: 'durian', label: 'ドリアン' },
  { value: 'elderberry', label: 'エルダーベリー' },
  { value: 'fig', label: 'いちじく' },
  { value: 'grape', label: 'ぶどう' },
  { value: 'honeydew', label: 'ハネデューメロン' },
  { value: 'kiwi', label: 'キウイ' },
  { value: 'lemon', label: 'レモン' },
  { value: 'mango', label: 'マンゴー' },
  { value: 'orange', label: 'オレンジ' },
];

export const Component: Story = {
  args: {
    size: 'medium',
    variant: 'outline',
    placeholder: '果物を検索...',
    isError: false,
    isDisabled: false,
  },
  parameters: {
    chromatic: { disable: true },
  },
  render: function ComponentRender(args) {
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');

    const filtered = useMemo(
      () => fruits.filter((f) => f.label.toLowerCase().includes(inputText.toLowerCase())),
      [inputText],
    );

    const handleChange = (next: string | null, meta: ComboboxChangeMeta | null) => {
      setValue(next);
      setInputText(meta?.label ?? '');
    };

    return (
      <Combobox {...args} value={value} onChange={handleChange} inputValue={inputText} onInputChange={setInputText}>
        <Combobox.Input>
          <Combobox.HelperMessage>選択値: {value ?? '未選択'}</Combobox.HelperMessage>
          <Combobox.ErrorMessage>入力内容にエラーがあります</Combobox.ErrorMessage>
        </Combobox.Input>
        <Combobox.List>
          {filtered.length === 0 && inputText.length > 0 && <Combobox.Empty />}
          {filtered.map((opt) => (
            <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
          ))}
        </Combobox.List>
      </Combobox>
    );
  },
};

export const Synchronous: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function SynchronousRender() {
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');

    const filtered = useMemo(
      () => fruits.filter((f) => f.label.toLowerCase().includes(inputText.toLowerCase())),
      [inputText],
    );

    return (
      <div style={{ width: 300 }}>
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInputText(meta?.label ?? '');
          }}
          inputValue={inputText}
          onInputChange={setInputText}
          placeholder="果物を検索..."
        >
          <Combobox.Input />
          <Combobox.List>
            {filtered.length === 0 && inputText.length > 0 && <Combobox.Empty>該当なし</Combobox.Empty>}
            {filtered.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    );
  },
};

export const Asynchronous: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function AsynchronousRender() {
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState<typeof fruits>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if (inputText.length === 0) {
        setResults([]);
        setIsLoading(false);

        return;
      }
      setIsLoading(true);
      const timer = setTimeout(() => {
        setResults(fruits.filter((f) => f.label.toLowerCase().includes(inputText.toLowerCase())));
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }, [inputText]);

    return (
      <div style={{ width: 300 }}>
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInputText(meta?.label ?? '');
          }}
          inputValue={inputText}
          onInputChange={setInputText}
          placeholder="入力すると 600ms 後に検索"
        >
          <Combobox.Input>
            <Combobox.HelperMessage>非同期サジェストの例（疑似 API）</Combobox.HelperMessage>
          </Combobox.Input>
          <Combobox.List>
            {isLoading && <Combobox.Loading>読み込み中...</Combobox.Loading>}
            {!isLoading && inputText.length > 0 && results.length === 0 && (
              <Combobox.Empty>該当する候補はありません</Combobox.Empty>
            )}
            {!isLoading && results.map((opt) => <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />)}
          </Combobox.List>
        </Combobox>
      </div>
    );
  },
};

const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
  value: `item-${String(i + 1)}`,
  label: `アイテム ${String(i + 1).padStart(4, '0')}`,
}));

export const LargeDataset: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function LargeDatasetRender() {
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');

    // 2 文字以上入力されたらフィルタリング、それ未満は候補ゼロ → popup を開かない
    const filtered = useMemo(() => {
      if (inputText.length < 2) {
        return [];
      }

      return largeDataset.filter((item) => item.label.includes(inputText)).slice(0, 50);
    }, [inputText]);

    return (
      <div style={{ width: 320 }}>
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInputText(meta?.label ?? '');
          }}
          inputValue={inputText}
          onInputChange={setInputText}
          placeholder="2 文字以上入力してください..."
          listMaxHeight={240}
        >
          <Combobox.Input>
            <Combobox.HelperMessage>
              全 1000 件 / 最大 50 件まで表示。未入力時は popup を開かない
            </Combobox.HelperMessage>
          </Combobox.Input>
          <Combobox.List>
            {inputText.length >= 2 && filtered.length === 0 && <Combobox.Empty>該当なし</Combobox.Empty>}
            {filtered.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    );
  },
};

const users = [
  { value: 'taro', label: '田中 太郎', email: 'taro@example.com', icon: 'user' as const },
  { value: 'hanako', label: '佐藤 花子', email: 'hanako@example.com', icon: 'user' as const },
  { value: 'jiro', label: '鈴木 次郎', email: 'jiro@example.com', icon: 'user' as const },
];

export const WithCustomItem: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function WithCustomItemRender() {
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');

    const filtered = useMemo(
      () => users.filter((u) => u.label.includes(inputText) || u.email.includes(inputText)),
      [inputText],
    );

    return (
      <div style={{ width: 320 }}>
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInputText(meta?.label ?? '');
          }}
          inputValue={inputText}
          onInputChange={setInputText}
          placeholder="ユーザー名 / メールで検索"
        >
          <Combobox.Input />
          <Combobox.List>
            {filtered.length === 0 && inputText.length > 0 && <Combobox.Empty>ユーザーが見つかりません</Combobox.Empty>}
            {filtered.map((user) => (
              <Combobox.Item key={user.value} value={user.value} label={user.label}>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Icon name={user.icon} size="small" />
                  <div className="flex min-w-0 flex-col">
                    <span className="typography-label14regular truncate">{user.label}</span>
                    <span className="typography-label12regular truncate text-text02">{user.email}</span>
                  </div>
                </div>
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    );
  },
};

export const WithMessages: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function WithMessagesRender() {
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');
    const [isError, setIsError] = useState(false);

    const filtered = useMemo(
      () => fruits.filter((f) => f.label.toLowerCase().includes(inputText.toLowerCase())),
      [inputText],
    );

    return (
      <div className="flex flex-col gap-4" style={{ width: 300 }}>
        <Combobox
          value={value}
          onChange={(next, meta) => {
            setValue(next);
            setInputText(meta?.label ?? '');
          }}
          inputValue={inputText}
          onInputChange={(text) => {
            setInputText(text);
            setIsError(text.length > 0 && filtered.length === 0);
          }}
          placeholder="果物を検索..."
          isError={isError}
        >
          <Combobox.Input>
            <Combobox.HelperMessage>{value ?? '未選択'}</Combobox.HelperMessage>
            <Combobox.ErrorMessage>該当する候補が存在しません</Combobox.ErrorMessage>
          </Combobox.Input>
          <Combobox.List>
            {filtered.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function DisabledRender() {
    return (
      <div style={{ width: 300 }}>
        <Combobox
          value="apple"
          onChange={noop}
          inputValue="りんご"
          onInputChange={noop}
          isDisabled
          placeholder="無効状態"
        >
          <Combobox.Input />
          <Combobox.List>
            <Combobox.Item value="apple" label="りんご" />
          </Combobox.List>
        </Combobox>
      </div>
    );
  },
};
