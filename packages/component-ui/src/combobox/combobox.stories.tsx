import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useRef, useState } from 'react';

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
    listMaxHeight: { control: 'text', description: '候補リストの最大高さ' },
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

    return (
      <div style={{ width: 300 }}>
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
