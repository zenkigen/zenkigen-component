import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useRef, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '../button';
import { Modal } from '../modal';
import { Popover } from '../popover';
import { Popup } from '../popup';
import { Combobox } from './combobox';
import type { ComboboxChangeMeta, ComboboxSize, ComboboxVariant } from './combobox.types';

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
    listMaxHeight: { control: 'number', description: '候補リストの最大高さ (px)' },
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
  { value: 'green-apple', label: '青りんご' },
  { value: 'banana', label: 'バナナ' },
  { value: 'strawberry', label: 'いちご' },
  { value: 'fig', label: 'いちじく' },
  { value: 'blueberry', label: 'ブルーベリー' },
  { value: 'blackberry', label: 'ブラックベリー' },
  { value: 'raspberry', label: 'ラズベリー' },
  { value: 'cherry', label: 'さくらんぼ' },
  { value: 'melon', label: 'メロン' },
  { value: 'muskmelon', label: 'マスクメロン' },
  { value: 'watermelon', label: 'スイカ' },
  { value: 'mango', label: 'マンゴー' },
  { value: 'mangosteen', label: 'マンゴスチン' },
  { value: 'mikan', label: 'みかん' },
  { value: 'orange', label: 'オレンジ' },
  { value: 'grapefruit', label: 'グレープフルーツ' },
  { value: 'lemon', label: 'レモン' },
  { value: 'lime', label: 'ライム' },
  { value: 'lychee', label: 'ライチ' },
  { value: 'grape', label: 'ぶどう' },
  { value: 'muscat', label: 'マスカット' },
  { value: 'peach', label: '桃' },
  { value: 'pear', label: '梨' },
  { value: 'kiwi', label: 'キウイ' },
  { value: 'pineapple', label: 'パイナップル' },
  { value: 'papaya', label: 'パパイヤ' },
  { value: 'passionfruit', label: 'パッションフルーツ' },
  { value: 'dragonfruit', label: 'ドラゴンフルーツ' },
  { value: 'durian', label: 'ドリアン' },
];

type MatrixRowProps = {
  size: ComboboxSize;
  variant: ComboboxVariant;
};

// closed 状態のマトリクス用: 1 行 = 1 size, 列 = (default / typed / disabled / error)
function ClosedMatrixRow({ size, variant }: MatrixRowProps) {
  return (
    <div className="flex items-start gap-4">
      <div style={{ width: 220 }}>
        <Combobox
          size={size}
          variant={variant}
          value={null}
          onChange={noop}
          inputValue=""
          onInputChange={noop}
          placeholder="果物を検索..."
        >
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
      <div style={{ width: 220 }}>
        <Combobox
          size={size}
          variant={variant}
          value="apple"
          onChange={noop}
          inputValue="りんご"
          onInputChange={noop}
          onClickClearButton={noop}
          placeholder="果物を検索..."
        >
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
      <div style={{ width: 220 }}>
        <Combobox
          size={size}
          variant={variant}
          value="apple"
          onChange={noop}
          inputValue="りんご"
          onInputChange={noop}
          isDisabled
          placeholder="果物を検索..."
        >
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    </div>
  );
}

export const Component: Story = {
  args: {
    size: 'medium',
    variant: 'outline',
    placeholder: '果物を検索...',
    isError: false,
    isDisabled: false,
    width: '',
    maxWidth: '',
    // eslint-disable-next-line no-undefined
    listMaxHeight: undefined,
    matchListToTrigger: false,
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

    // クリアボタンの値クリアは利用者責務（onChange(null, null) / onInputChange('') を呼ぶ）。
    const handleClickClearButton = () => {
      setValue(null);
      setInputText('');
    };

    return (
      <div style={{ width: 300 }}>
        <Combobox
          {...args}
          value={value}
          onChange={handleChange}
          inputValue={inputText}
          onInputChange={setInputText}
          onClickClearButton={handleClickClearButton}
        >
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
      </div>
    );
  },
};

// onClickClearButton を渡さないパターン。クリアボタンは表示されない（TextInput と同一仕様）。
export const WithoutClearButton: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function WithoutClearButtonRender() {
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
      <div style={{ width: 300 }}>
        <Combobox
          value={value}
          onChange={handleChange}
          inputValue={inputText}
          onInputChange={setInputText}
          placeholder="果物を検索..."
        >
          <Combobox.Input>
            <Combobox.HelperMessage>
              onClickClearButton 未指定のためクリアボタンは表示されない（選択値: {value ?? '未選択'}）
            </Combobox.HelperMessage>
          </Combobox.Input>
          <Combobox.List>
            {filtered.length === 0 && inputText.length > 0 && <Combobox.Empty />}
            {filtered.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    );
  },
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <ClosedMatrixRow size="medium" variant="outline" />
      <ClosedMatrixRow size="large" variant="outline" />
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <ClosedMatrixRow size="medium" variant="text" />
      <ClosedMatrixRow size="large" variant="text" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* size=medium × (空 / 入力済 / 入力済+disabled) */}
      <div className="flex items-start gap-4">
        <div style={{ width: 220 }}>
          <Combobox
            size="medium"
            value={null}
            onChange={noop}
            inputValue=""
            onInputChange={noop}
            placeholder="果物を検索..."
            isError
          >
            <Combobox.Input>
              <Combobox.ErrorMessage>入力内容にエラーがあります</Combobox.ErrorMessage>
            </Combobox.Input>
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
        <div style={{ width: 220 }}>
          <Combobox
            size="medium"
            value={null}
            onChange={noop}
            inputValue="xxx"
            onInputChange={noop}
            onClickClearButton={noop}
            placeholder="果物を検索..."
            isError
          >
            <Combobox.Input>
              <Combobox.ErrorMessage>一致する候補がありません</Combobox.ErrorMessage>
            </Combobox.Input>
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
        <div style={{ width: 220 }}>
          <Combobox
            size="medium"
            value="apple"
            onChange={noop}
            inputValue="りんご"
            onInputChange={noop}
            placeholder="果物を検索..."
            isError
            isDisabled
          >
            <Combobox.Input>
              <Combobox.ErrorMessage>入力内容にエラーがあります</Combobox.ErrorMessage>
            </Combobox.Input>
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
      </div>
      {/* size=large */}
      <div className="flex items-start gap-4">
        <div style={{ width: 220 }}>
          <Combobox
            size="large"
            value={null}
            onChange={noop}
            inputValue=""
            onInputChange={noop}
            placeholder="果物を検索..."
            isError
          >
            <Combobox.Input>
              <Combobox.ErrorMessage>入力内容にエラーがあります</Combobox.ErrorMessage>
            </Combobox.Input>
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
        <div style={{ width: 220 }}>
          <Combobox
            size="large"
            value={null}
            onChange={noop}
            inputValue="xxx"
            onInputChange={noop}
            onClickClearButton={noop}
            placeholder="果物を検索..."
            isError
          >
            <Combobox.Input>
              <Combobox.ErrorMessage>一致する候補がありません</Combobox.ErrorMessage>
            </Combobox.Input>
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
        <div style={{ width: 220 }}>
          <Combobox
            size="large"
            value="apple"
            onChange={noop}
            inputValue="りんご"
            onInputChange={noop}
            placeholder="果物を検索..."
            isError
            isDisabled
          >
            <Combobox.Input>
              <Combobox.ErrorMessage>入力内容にエラーがあります</Combobox.ErrorMessage>
            </Combobox.Input>
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {/* size=medium × (空 / 入力済) */}
      <div className="flex items-center gap-4">
        <div style={{ width: 220 }}>
          <Combobox
            size="medium"
            value={null}
            onChange={noop}
            inputValue=""
            onInputChange={noop}
            placeholder="果物を検索..."
            isDisabled
          >
            <Combobox.Input />
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
        <div style={{ width: 220 }}>
          <Combobox
            size="medium"
            value="apple"
            onChange={noop}
            inputValue="りんご"
            onInputChange={noop}
            placeholder="果物を検索..."
            isDisabled
          >
            <Combobox.Input />
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
      </div>
      {/* size=large */}
      <div className="flex items-center gap-4">
        <div style={{ width: 220 }}>
          <Combobox
            size="large"
            value={null}
            onChange={noop}
            inputValue=""
            onInputChange={noop}
            placeholder="果物を検索..."
            isDisabled
          >
            <Combobox.Input />
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
        <div style={{ width: 220 }}>
          <Combobox
            size="large"
            value="apple"
            onChange={noop}
            inputValue="りんご"
            onInputChange={noop}
            placeholder="果物を検索..."
            isDisabled
          >
            <Combobox.Input />
            <Combobox.List>
              {fruits.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
      </div>
    </div>
  ),
};

export const WithMessages: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div style={{ width: 300 }}>
        <Combobox
          size="medium"
          value="apple"
          onChange={noop}
          inputValue="りんご"
          onInputChange={noop}
          onClickClearButton={noop}
          placeholder="果物を検索..."
        >
          <Combobox.Input>
            <Combobox.HelperMessage>選択した果物がカートに追加されます</Combobox.HelperMessage>
          </Combobox.Input>
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
      <div style={{ width: 300 }}>
        <Combobox
          size="medium"
          value={null}
          onChange={noop}
          inputValue="xxx"
          onInputChange={noop}
          onClickClearButton={noop}
          placeholder="果物を検索..."
          isError
        >
          <Combobox.Input>
            <Combobox.HelperMessage>選択した果物がカートに追加されます</Combobox.HelperMessage>
            <Combobox.ErrorMessage>一致する候補がありません</Combobox.ErrorMessage>
          </Combobox.Input>
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    </div>
  ),
};

// open 状態のスナップショット（outline × size 2）
export const OpenOutline: Story = {
  // list が input の下に portal で描画されるため、上下の余白を縦方向に確保
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 320 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-[320px]">
      <div style={{ width: 260 }}>
        <Combobox
          size="medium"
          variant="outline"
          value={null}
          onChange={noop}
          inputValue=""
          onInputChange={noop}
          isOpen
          onOpenChange={noop}
          placeholder="果物を検索..."
          listMaxHeight={240}
        >
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
      <div style={{ width: 260 }}>
        <Combobox
          size="large"
          variant="outline"
          value="apple"
          onChange={noop}
          inputValue="りんご"
          onInputChange={noop}
          onClickClearButton={noop}
          isOpen
          onOpenChange={noop}
          placeholder="果物を検索..."
          listMaxHeight={240}
        >
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    </div>
  ),
};

// open 状態のスナップショット（text × size 2）
export const OpenText: Story = {
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 320 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-[320px]">
      <div style={{ width: 260 }}>
        <Combobox
          size="medium"
          variant="text"
          value={null}
          onChange={noop}
          inputValue=""
          onInputChange={noop}
          isOpen
          onOpenChange={noop}
          placeholder="果物を検索..."
          listMaxHeight={240}
        >
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
      <div style={{ width: 260 }}>
        <Combobox
          size="large"
          variant="text"
          value="apple"
          onChange={noop}
          inputValue="りんご"
          onInputChange={noop}
          onClickClearButton={noop}
          isOpen
          onOpenChange={noop}
          placeholder="果物を検索..."
          listMaxHeight={240}
        >
          <Combobox.Input />
          <Combobox.List>
            {fruits.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    </div>
  ),
};

type StatusKind = 'loading' | 'empty';

function StatusMatrixRow({ variant, kind }: { variant: ComboboxVariant; kind: StatusKind }) {
  const inputValue = kind === 'loading' ? 'りん' : 'xxx';

  return (
    <div className="flex items-start gap-6">
      {(['medium', 'large'] as const).map((size) => (
        <div key={size} style={{ width: 220 }}>
          <Combobox
            size={size}
            variant={variant}
            value={null}
            onChange={noop}
            inputValue={inputValue}
            onInputChange={noop}
            onClickClearButton={noop}
            isOpen
            onOpenChange={noop}
            placeholder="果物を検索..."
          >
            <Combobox.Input />
            <Combobox.List>{kind === 'loading' ? <Combobox.Loading /> : <Combobox.Empty />}</Combobox.List>
          </Combobox>
        </div>
      ))}
    </div>
  );
}

export const Loading: Story = {
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 160 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-[120px]">
      <StatusMatrixRow variant="outline" kind="loading" />
      <StatusMatrixRow variant="text" kind="loading" />
    </div>
  ),
};

export const Empty: Story = {
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 160 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-[120px]">
      <StatusMatrixRow variant="outline" kind="empty" />
      <StatusMatrixRow variant="text" kind="empty" />
    </div>
  ),
};

export const MatchListToTrigger: Story = {
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 220 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => {
    const longLabelFruits = [
      { value: 'long-1', label: 'とても長いラベルのテスト用テキスト（その1）' },
      { value: 'long-2', label: 'さらに長いラベルのテスト用テキスト（その2）です' },
      { value: 'short', label: '短め' },
    ];

    return (
      <div className="flex flex-col gap-[220px]">
        <div>
          <p className="typography-label14regular mb-2 text-text01">
            matchListToTrigger: false（デフォルト）- リストはコンテンツに応じて広がる
          </p>
          <div style={{ width: 200 }}>
            <Combobox
              size="medium"
              value={null}
              onChange={noop}
              inputValue=""
              onInputChange={noop}
              isOpen
              onOpenChange={noop}
              placeholder="検索"
            >
              <Combobox.Input />
              <Combobox.List>
                {longLabelFruits.map((opt) => (
                  <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
                ))}
              </Combobox.List>
            </Combobox>
          </div>
        </div>
        <div>
          <p className="typography-label14regular mb-2 text-text01">
            matchListToTrigger: true - リストは input の幅に固定
          </p>
          <div style={{ width: 200 }}>
            <Combobox
              size="medium"
              value={null}
              onChange={noop}
              inputValue=""
              onInputChange={noop}
              isOpen
              onOpenChange={noop}
              matchListToTrigger
              placeholder="検索"
            >
              <Combobox.Input />
              <Combobox.List>
                {longLabelFruits.map((opt) => (
                  <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
                ))}
              </Combobox.List>
            </Combobox>
          </div>
        </div>
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
            {inputText.length >= 2 && filtered.length === 0 && <Combobox.Empty />}
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
            {isLoading && <Combobox.Loading />}
            {!isLoading && inputText.length > 0 && results.length === 0 && <Combobox.Empty />}
            {!isLoading && results.map((opt) => <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />)}
          </Combobox.List>
        </Combobox>
      </div>
    );
  },
};

// 日本語入力（IME 変換中も含む）で inputValue がどのように流れてくるかを確認するための Story。
// 入力欄の横に onInputChange のログを時系列で表示する。
export const ImeInputLog: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function ImeInputLogRender() {
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');
    const [log, setLog] = useState<Array<{ id: number; text: string; time: string }>>([]);
    const idRef = useRef(0);

    const filtered = useMemo(
      () => fruits.filter((f) => f.label.toLowerCase().includes(inputText.toLowerCase())),
      [inputText],
    );

    const handleInputChange = (next: string) => {
      setInputText(next);
      idRef.current += 1;
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      setLog((prev) => [{ id: idRef.current, text: next, time }, ...prev.slice(0, 29)]);
    };

    const handleClearLog = () => {
      setLog([]);
    };

    return (
      <div className="flex items-start gap-8">
        <div style={{ width: 300 }}>
          <Combobox
            value={value}
            onChange={(next, meta) => {
              setValue(next);
              setInputText(meta?.label ?? '');
            }}
            inputValue={inputText}
            onInputChange={handleInputChange}
            placeholder="日本語を入力してみてください（例: りんご）"
          >
            <Combobox.Input>
              <Combobox.HelperMessage>
                現在の inputValue: 「{inputText}」{' / '}選択値: {value ?? '未選択'}
              </Combobox.HelperMessage>
            </Combobox.Input>
            <Combobox.List>
              {filtered.length === 0 && inputText.length > 0 && <Combobox.Empty />}
              {filtered.map((opt) => (
                <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Combobox.List>
          </Combobox>
        </div>
        <div className="flex w-[320px] flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="typography-label14bold text-text01">onInputChange ログ（最新 30 件）</p>
            <button
              type="button"
              onClick={handleClearLog}
              className="typography-label12regular text-link01 hover:text-hoverLink01"
            >
              クリア
            </button>
          </div>
          <div className="max-h-[320px] overflow-y-auto rounded border border-uiBorder01 bg-uiBackground02 p-2">
            {log.length === 0 ? (
              <p className="typography-label12regular text-text02">未入力</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {log.map((entry) => (
                  <li key={entry.id} className="typography-label12regular flex gap-2 text-text01">
                    <span className="shrink-0 text-text02">{entry.time}</span>
                    <span className="break-all">「{entry.text}」</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  },
};

// Modal の中で Combobox が正しく動作するかを検証するための Story（VRT 除外）。
// 確認観点:
// - Combobox.List が Modal の上に表示される（z-index）
// - 入力・候補選択・Escape で List のみ閉じる（Modal は閉じない）
// - List の外側クリックで List のみ閉じる
export const WithinModal: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function WithinModalRender() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');

    const filtered = useMemo(
      () => fruits.filter((f) => f.label.toLowerCase().includes(inputText.toLowerCase())),
      [inputText],
    );

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const handleSave = () => {
      setIsModalOpen(false);
    };

    return (
      <div>
        <Button variant="fill" size="large" onClick={() => setIsModalOpen(true)}>
          open
        </Button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width={480}>
          <Modal.Header>果物を登録</Modal.Header>
          <Modal.Body>
            <div className="flex w-full flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <label className="typography-label14regular text-text01" htmlFor="fruit-combobox">
                  お気に入りの果物
                </label>
                <Combobox
                  value={value}
                  onChange={(next, meta) => {
                    setValue(next);
                    setInputText(meta?.label ?? '');
                  }}
                  inputValue={inputText}
                  onInputChange={setInputText}
                  placeholder="果物を検索..."
                  width="100%"
                >
                  <Combobox.Input>
                    <Combobox.HelperMessage>選択値: {value ?? '未選択'}</Combobox.HelperMessage>
                  </Combobox.Input>
                  <Combobox.List>
                    {filtered.length === 0 && inputText.length > 0 && <Combobox.Empty />}
                    {filtered.map((opt) => (
                      <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
                    ))}
                  </Combobox.List>
                </Combobox>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full flex-wrap items-center justify-end gap-4">
              <Button variant="outline" size="large" onClick={handleCancel}>
                キャンセル
              </Button>
              <Button variant="fill" size="large" onClick={handleSave}>
                保存する
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

// Popover.Content の中で Combobox が正しく動作するかを検証するための Story（VRT 除外）。
// 確認観点:
// - Combobox.List クリックで Popover が閉じない（外側クリック誤判定の検証）
// - 候補選択後、Combobox List のみ閉じ Popover は維持される
// - Escape で Combobox List → Popover の順に閉じる
export const WithinPopover: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: function WithinPopoverRender() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(true);
    const [value, setValue] = useState<string | null>(null);
    const [inputText, setInputText] = useState('');

    const filtered = useMemo(
      () => fruits.filter((f) => f.label.toLowerCase().includes(inputText.toLowerCase())),
      [inputText],
    );

    const handleCancel = () => {
      setIsPopoverOpen(false);
    };
    const handleSave = () => {
      setIsPopoverOpen(false);
    };

    return (
      <div className="flex min-h-[640px] flex-col items-center pt-12">
        <Popover isOpen={isPopoverOpen} placement="bottom" offset={8} onClose={() => setIsPopoverOpen(false)}>
          <Popover.Trigger>
            <Button variant="fill" size="medium" onClick={() => setIsPopoverOpen((v) => !v)}>
              {isPopoverOpen ? 'close' : 'open'}
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popup width={400}>
              <Popup.Header>果物を登録</Popup.Header>
              <Popup.Body>
                <div className="flex w-full flex-col gap-6 p-6">
                  <div className="flex flex-col gap-2">
                    <label className="typography-label14regular text-text01">お気に入りの果物</label>
                    <Combobox
                      value={value}
                      onChange={(next, meta) => {
                        setValue(next);
                        setInputText(meta?.label ?? '');
                      }}
                      inputValue={inputText}
                      onInputChange={setInputText}
                      placeholder="果物を検索..."
                      width="100%"
                    >
                      <Combobox.Input>
                        <Combobox.HelperMessage>選択値: {value ?? '未選択'}</Combobox.HelperMessage>
                      </Combobox.Input>
                      <Combobox.List>
                        {filtered.length === 0 && inputText.length > 0 && <Combobox.Empty />}
                        {filtered.map((opt) => (
                          <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
                        ))}
                      </Combobox.List>
                    </Combobox>
                  </div>
                </div>
              </Popup.Body>
              <Popup.Footer>
                <div className="flex w-full flex-wrap items-center justify-end gap-4">
                  <Button variant="outline" size="medium" onClick={handleCancel}>
                    キャンセル
                  </Button>
                  <Button variant="fill" size="medium" onClick={handleSave}>
                    保存する
                  </Button>
                </div>
              </Popup.Footer>
            </Popup>
          </Popover.Content>
        </Popover>
      </div>
    );
  },
};

/**
 * 時刻選択（HH:mm）を 1 つの Combobox で構成するサンプル（実験実装フェーズの検証用）。
 *
 * `docs/time-input-component-design-best-practices.md` の combo box 型（§3.2 USWDS / §2.9）を踏襲:
 * - `step`（既定 15 分）で `HH:mm` 候補を自動生成（24h）
 * - テキスト入力でインクリメンタルに絞り込み（`09`・`0930`・`09:30` のいずれでもヒット）
 * - 24 時間表記。未選択は `null`、placeholder で `HH:mm` フォーマットを提示
 *
 * Select×2（時・分）に対する利点: 1 フィールドで完結し、`0930` のような連続入力・ペーストで素早く絞り込める。
 * 注意: 候補に無い任意時刻（例 `09:38`）の確定には別途パース/バリデーションが必要（このデモは候補からの選択のみ）。
 */

type TimeOption = { value: string; label: string };

// step（分刻み）から HH:mm 候補を自動生成する（24h × (60 / step) 件）
function createTimeOptions(step: number): TimeOption[] {
  const minutesPerHour = Math.floor(60 / step);

  return Array.from({ length: 24 }, (_, hour) => hour).flatMap((hour) =>
    Array.from({ length: minutesPerHour }, (_, index) => {
      const label = `${String(hour).padStart(2, '0')}:${String(index * step).padStart(2, '0')}`;

      return { value: label, label };
    }),
  );
}

// 入力テキストで候補を絞り込む。`09:30`（そのまま）/ `0930`（数字のみ）の双方でヒットさせる
function filterTimeOptions(options: TimeOption[], inputText: string): TimeOption[] {
  if (inputText === '') {
    return options;
  }
  const normalized = inputText.replace(/[^0-9]/g, '');

  return options.filter((option) => {
    if (option.label.includes(inputText)) {
      return true;
    }

    return normalized !== '' && option.label.replace(':', '').includes(normalized);
  });
}

type TimeComboboxFieldProps = {
  step?: number;
  size?: ComboboxSize;
  isError?: boolean;
  isDisabled?: boolean;
};

function TimeComboboxField({
  step = 15,
  size = 'medium',
  isError = false,
  isDisabled = false,
}: TimeComboboxFieldProps) {
  const [value, setValue] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const options = useMemo(() => createTimeOptions(step), [step]);
  const filtered = useMemo(() => filterTimeOptions(options, inputText), [options, inputText]);

  const handleChange = (next: string | null, meta: ComboboxChangeMeta | null) => {
    setValue(next);
    setInputText(meta?.label ?? '');
  };

  return (
    <div style={{ width: 200 }}>
      <Combobox
        size={size}
        value={value}
        onChange={handleChange}
        inputValue={inputText}
        onInputChange={setInputText}
        placeholder="HH:mm"
        isError={isError}
        isDisabled={isDisabled}
        listMaxHeight={240}
        matchListToTrigger
      >
        <Combobox.Input>
          <Combobox.HelperMessage>選択値: {value ?? '未選択'}</Combobox.HelperMessage>
        </Combobox.Input>
        <Combobox.List>
          {filtered.length === 0 && inputText.length > 0 && <Combobox.Empty />}
          {filtered.map((opt) => (
            <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
          ))}
        </Combobox.List>
      </Combobox>
    </div>
  );
}

export const TimeCombobox: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="typography-label14bold text-text01">時刻（HH:mm）</p>
      <TimeComboboxField />
    </div>
  ),
  play: async ({ canvas }) => {
    const user = userEvent.setup();
    const input = canvas.getByRole('combobox');

    // 数字のみ（0930）でも HH:mm 候補が絞り込めることを確認
    await user.click(input);
    await user.type(input, '0930');
    const body = within(document.body);
    const option = await body.findByRole('option', { name: '09:30', hidden: true });
    await user.click(option);

    // 選択した候補が input に反映されることを確認
    await expect(input).toHaveValue('09:30');
  },
};

export const TimeComboboxSizes: Story = {
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 280 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">medium</p>
        <TimeComboboxField size="medium" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">large</p>
        <TimeComboboxField size="large" />
      </div>
    </div>
  ),
};

export const TimeComboboxVariants: Story = {
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 280 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">15分刻み（デフォルト）</p>
        <TimeComboboxField step={15} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">30分刻み</p>
        <TimeComboboxField step={30} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">エラー状態</p>
        <TimeComboboxField isError />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">無効状態</p>
        <TimeComboboxField isDisabled />
      </div>
    </div>
  ),
};

/**
 * 時刻選択を「時」「分」別々の Combobox×2 で構成するサンプル（実験実装フェーズの検証用）。
 *
 * 上の単一 Combobox（HH:mm）に対し、Select×2 と同じ「時・分を独立に選ぶ」操作感を Combobox で再現したもの。
 * - 時は 00〜23、分は `step`（既定 15 分）刻みの候補を自動生成
 * - 各フィールドはテキストで絞り込み可能（`9` → `09` 等）
 * - 24 時間表記。未選択は `null`、placeholder `--` で明示
 */

// 時の候補（00〜23）
const splitHourOptions: TimeOption[] = Array.from({ length: 24 }, (_, hour) => {
  const label = String(hour).padStart(2, '0');

  return { value: label, label };
});

// 分の候補を step（分刻み）から生成
function createSplitMinuteOptions(step: number): TimeOption[] {
  const count = Math.floor(60 / step);

  return Array.from({ length: count }, (_, index) => {
    const label = String(index * step).padStart(2, '0');

    return { value: label, label };
  });
}

// セパレータ「:」のタイポグラフィ・高さを Combobox のサイズに合わせる
const splitSeparatorClass: Record<ComboboxSize, string> = {
  medium: 'typography-label14regular h-8',
  large: 'typography-label16regular h-10',
};

type TimeComboboxSplitFieldProps = {
  minuteStep?: number;
  size?: ComboboxSize;
  isError?: boolean;
  isDisabled?: boolean;
};

function TimeComboboxSplitField({
  minuteStep = 15,
  size = 'medium',
  isError = false,
  isDisabled = false,
}: TimeComboboxSplitFieldProps) {
  const [hour, setHour] = useState<string | null>(null);
  const [hourInput, setHourInput] = useState('');
  const [minute, setMinute] = useState<string | null>(null);
  const [minuteInput, setMinuteInput] = useState('');

  const minuteOptions = useMemo(() => createSplitMinuteOptions(minuteStep), [minuteStep]);
  const filteredHours = useMemo(() => filterTimeOptions(splitHourOptions, hourInput), [hourInput]);
  const filteredMinutes = useMemo(() => filterTimeOptions(minuteOptions, minuteInput), [minuteOptions, minuteInput]);

  const fieldWidth = 112;

  const handleHourChange = (next: string | null, meta: ComboboxChangeMeta | null) => {
    setHour(next);
    setHourInput(meta?.label ?? '');
  };
  const handleMinuteChange = (next: string | null, meta: ComboboxChangeMeta | null) => {
    setMinute(next);
    setMinuteInput(meta?.label ?? '');
  };

  return (
    <div className="flex items-center gap-2">
      <div style={{ width: fieldWidth }}>
        <Combobox
          size={size}
          value={hour}
          onChange={handleHourChange}
          inputValue={hourInput}
          onInputChange={setHourInput}
          placeholder="--"
          isError={isError}
          isDisabled={isDisabled}
          listMaxHeight={200}
          matchListToTrigger
        >
          <Combobox.Input />
          <Combobox.List>
            {filteredHours.length === 0 && hourInput.length > 0 && <Combobox.Empty />}
            {filteredHours.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
      <span className={`${splitSeparatorClass[size]} flex items-center text-text02`}>:</span>
      <div style={{ width: fieldWidth }}>
        <Combobox
          size={size}
          value={minute}
          onChange={handleMinuteChange}
          inputValue={minuteInput}
          onInputChange={setMinuteInput}
          placeholder="--"
          isError={isError}
          isDisabled={isDisabled}
          listMaxHeight={200}
          matchListToTrigger
        >
          <Combobox.Input />
          <Combobox.List>
            {filteredMinutes.length === 0 && minuteInput.length > 0 && <Combobox.Empty />}
            {filteredMinutes.map((opt) => (
              <Combobox.Item key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Combobox.List>
        </Combobox>
      </div>
    </div>
  );
}

export const TimeComboboxSplit: Story = {
  parameters: {
    chromatic: { disable: true },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <p className="typography-label14bold text-text01">時刻（時・分を別々に選択）</p>
      <TimeComboboxSplitField />
    </div>
  ),
  play: async ({ canvas }) => {
    const user = userEvent.setup();
    const [hourInput, minuteInput] = canvas.getAllByRole('combobox');
    if (hourInput == null || minuteInput == null) {
      return;
    }
    const body = within(document.body);

    // 時: 「9」で絞り込み、候補 09 を選択
    await user.click(hourInput);
    await user.type(hourInput, '9');
    const hourOption = await body.findByRole('option', { name: '09', hidden: true });
    await user.click(hourOption);
    await expect(hourInput).toHaveValue('09');

    // 分: 「30」で絞り込み、候補 30 を選択
    await user.click(minuteInput);
    await user.type(minuteInput, '30');
    const minuteOption = await body.findByRole('option', { name: '30', hidden: true });
    await user.click(minuteOption);
    await expect(minuteInput).toHaveValue('30');
  },
};

export const TimeComboboxSplitSizes: Story = {
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 240 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">medium</p>
        <TimeComboboxSplitField size="medium" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">large</p>
        <TimeComboboxSplitField size="large" />
      </div>
    </div>
  ),
};

export const TimeComboboxSplitVariants: Story = {
  decorators: [
    (StoryFn) => (
      <div style={{ paddingBottom: 240 }}>
        <StoryFn />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">15分刻み（デフォルト）</p>
        <TimeComboboxSplitField minuteStep={15} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">30分刻み</p>
        <TimeComboboxSplitField minuteStep={30} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">エラー状態</p>
        <TimeComboboxSplitField isError />
      </div>
      <div className="flex flex-col gap-2">
        <p className="typography-label14bold text-text01">無効状態</p>
        <TimeComboboxSplitField isDisabled />
      </div>
    </div>
  ),
};
