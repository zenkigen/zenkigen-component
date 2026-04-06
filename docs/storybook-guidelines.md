# Storybook ガイドライン

このドキュメントは、zenkigen-component プロジェクトにおける Storybook Story の作成・構成に関する規約を定義しています。

## 目次

1. [基本構造](#基本構造)
2. [Story の分割方針](#story-の分割方針)
3. [Story の種類と使い分け](#story-の種類と使い分け)
4. [play function](#play-function)
5. [Chromatic 対応](#chromatic-対応)
6. [カバレッジ観点](#カバレッジ観点)
7. [避けるべきこと](#避けるべきこと)

---

## 基本構造

### ファイル形式

Storybook 9 の CSF3（Component Story Format 3）を使用する。

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { MyComponent } from '.';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    variant: { control: 'select', options: ['fill', 'outline', 'text'] },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;
```

### インポートルール

- `Meta`, `StoryObj` は `@storybook/react-vite` からインポート
- テストユーティリティは `storybook/test` からインポート（`@storybook/test` ではない）

```tsx
// OK
import { expect, fn, waitFor } from 'storybook/test';

// NG
import { expect, fn, waitFor } from '@storybook/test';
```

---

## Story の分割方針

### 原則: variant ごとに独立した Story を作成する

1 つの Story に全バリエーションを詰め込まない。variant（見た目の種類）ごとに独立した Story に分割する。

**理由**: Chromatic のビジュアルリグレッションテストで、変更の影響範囲を最小限に抑えるため。

```
# NG: 全 variant を 1 つの Story に詰め込む
Base
├── fill: small / medium / large
├── fillDanger: small / medium / large
├── outline: small / medium / large
└── text: small / medium / large

# OK: variant ごとに分割
Component  ← args 駆動（Controls 操作用）
Fill       ← fill variant の全 size × 状態
FillDanger ← fillDanger variant の全 size × 状態
Outline    ← outline variant の全 size × 状態
Text       ← text variant の全 size × 状態
Custom     ← 特殊パターン（borderRadius, elementAs 等）
```

### 分割単位のガイドライン

| コンポーネントの特徴 | 分割単位          | 例                                    |
| -------------------- | ----------------- | ------------------------------------- |
| variant を持つ       | variant ごと      | Button: Fill / Outline / Text         |
| size のみ            | 状態ごと          | Loading: Sizes / States               |
| 複合コンポーネント   | 構成パターンごと  | Modal: Base / WithTabs / WithCheckbox |
| 単純なコンポーネント | 1〜2 Story で十分 | Heading: Component / AllLevels        |

### 各 Story 内の構成

1 つの Story 内では、**size × 状態**（default / icon 付き / disabled / selected 等）を行と列で整理する。

```tsx
export const Fill: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {/* 1行 = 1つの size、列 = 各状態 */}
      <div className="flex items-center gap-2">
        <Button size="small">ラベル</Button>
        <Button size="small" isDisabled>
          ラベル
        </Button>
        <Button size="small" isSelected>
          ラベル
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="medium">ラベル</Button>
        <Button size="medium" isDisabled>
          ラベル
        </Button>
        <Button size="medium" isSelected>
          ラベル
        </Button>
      </div>
    </div>
  ),
};
```

### 新しい size / variant 追加時の指針

- **末尾に追加**: 新しい size は末尾の行として追加する（既存行のズレを防ぎ、Chromatic 差分を最小化）
- **新しい variant**: 新しい Story export を追加するだけで、既存 Story に影響なし

---

## Story の種類と使い分け

### args 駆動型

Controls パネルで操作可能な Story。`chromatic: { disable: true }` を付けて VRT 対象外にする。

```tsx
export const Component: Story = {
  args: {
    children: 'ラベル',
    size: 'medium',
    variant: 'fill',
  },
  parameters: {
    chromatic: { disable: true },
  },
};
```

### render 固定型

バリエーション一覧を表示する Story。Chromatic のスナップショット対象。

```tsx
export const Fill: Story = {
  render: () => <div className="flex flex-col gap-2">{/* size × 状態の組み合わせ */}</div>,
};
```

### state 管理型

`useState` 等で内部状態を持つインタラクティブなデモ。

```tsx
export const WithState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>開く</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Body>コンテンツ</Modal.Body>
        </Modal>
      </>
    );
  },
};
```

### play function 型

自動テスト付きの Story。ユーザーインタラクションのテストに使用する。

```tsx
export const Submitted: Story = {
  args: { onSubmit: fn() },
  play: async ({ args, canvas, step, userEvent }) => {
    await step('フォーム入力', async () => {
      await userEvent.type(canvas.getByRole('textbox'), 'テスト');
    });
    await step('送信', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '送信' }));
    });
    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  },
};
```

---

## play function

### 基本ルール

- `canvas` を直接使ってクエリする（`within(canvas)` は NG）
- `step()` で手順をグルーピングする
- `fn()` でコールバックをスパイし、呼び出しをアサートする
- ロールベースのクエリを優先する（`getByRole` > `getByTestId`）

```tsx
// OK: canvas を直接使う
play: async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole('button'));
};

// OK: canvasElement + within
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.getByRole('button').click();
};

// NG: within(canvas) は冗長でエラーになる
play: async ({ canvas }) => {
  const screen = within(canvas); // Error!
};
```

### play function の合成

複雑なフローは Story 間で play function を再利用できる。

```tsx
export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('名前'), '田中太郎');
  },
};

export const SubmittedForm: Story = {
  play: async (context) => {
    await FilledForm.play!(context);
    await context.userEvent.click(context.canvas.getByRole('button'));
  },
};
```

### play function を付けるべきケース

- ドロップダウン / セレクトの開閉
- フォーム入力 → 送信
- トグル / チェックボックスの切り替え
- キーボード操作（Tab, Enter, Escape）
- 非同期操作の結果表示

---

## Chromatic 対応

### スナップショット戦略

| Story の種類                | Chromatic    | 設定                                |
| --------------------------- | ------------ | ----------------------------------- |
| args 駆動型（Component）    | 対象外       | `chromatic: { disable: true }`      |
| render 固定型（variant 別） | **対象**     | 設定不要                            |
| state 管理型                | 必要に応じて | 初期状態をスナップショット          |
| play function 型            | **対象**     | play 実行後の状態をスナップショット |

### VRT 用の固定値

日付やランダム値を含むコンポーネントは decorator で値を固定する。

```tsx
import MockDate from 'mockdate';
import type { Decorator } from '@storybook/react-vite';

const withMockedDate: Decorator = (Story) => {
  MockDate.set('2026-01-15T00:00:00Z');
  return <Story />;
};

const meta: Meta<typeof DatePicker> = {
  decorators: [withMockedDate],
};
```

---

## カバレッジ観点

各コンポーネントの Story で以下の観点をカバーする。すべてが必須ではなく、コンポーネントに該当するもののみ対応する。

### 必須

- [ ] **Component**: args 駆動の基本 Story（Controls 操作用）
- [ ] **variant 別**: 各 variant を独立した Story で網羅
- [ ] **size**: 各 size を含める
- [ ] **disabled**: 無効状態
- [ ] **error**: エラー状態（該当する場合）

### 推奨

- [ ] **icon 付き**: before / after アイコン
- [ ] **selected**: 選択状態
- [ ] **loading**: ローディング状態
- [ ] **empty**: 空状態
- [ ] **play function**: 主要なインタラクション
- [ ] **Custom / Layout**: 特殊なカスタマイズや実際のレイアウトでの使用例

---

## 避けるべきこと

1. **1 つの Story に全 variant × 全 size を詰め込む**: Chromatic で巨大な差分が出る
2. **`within(canvas)` を使う**: `canvas` に直接クエリメソッドがある
3. **`@storybook/test` からインポート**: `storybook/test` が正しい
4. **同じロジックを見せる冗長な Story**: 意味のある差分だけを Story にする
5. **意味のないダミーテキスト**: 実際的なラベル/テキストを使う
6. **レイアウトに `mt-*` を使う**: `flex flex-col gap-*` で統一する

---

## 参考: 既存の良い例

| ファイル                  | 参考ポイント                           |
| ------------------------- | -------------------------------------- |
| `button.stories.tsx`      | variant 別の分割パターン               |
| `date-picker.stories.tsx` | decorator で日付固定（VRT 対応）       |
| `modal.stories.tsx`       | render 内 useState、構成パターン別分割 |
| `file-input.stories.tsx`  | argTypes の `if` 条件、autodocs タグ   |
| `dropdown.stories.tsx`    | play function + カスタムメニュー実装例 |
