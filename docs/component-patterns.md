# コンポーネント実装パターン

このドキュメントでは、Zenkigen Component ライブラリにおけるコンポーネントの実装パターンと設計方針について説明します。

## コンポーネント構造

各コンポーネントは以下のファイル構造で実装されています：

```
component-name/
  ├── index.ts              # エントリーポイント、再エクスポート
  ├── component-name.tsx    # メインコンポーネント実装
  ├── component-name.stories.tsx  # Storybook用のストーリー
  └── Docs.mdx              # ドキュメンテーション
```

## 設計パターン

### ポリモーフィックコンポーネント

多くのコンポーネントは、`elementAs` プロパティを使用して、任意のHTML要素やReactコンポーネントとしてレンダリングできるポリモーフィックパターンを採用しています。

```tsx
// Buttonコンポーネントの例
export const Button = <T extends ElementAs = 'button'>({ elementAs, children, ...props }: Props<T>) => {
  // ...
  const Component = elementAs ?? 'button';
  return <Component {...props}>{children}</Component>;
};
```

これにより、例えば `<Button>` を `<a>` 要素としてレンダリングすることが可能です：

```tsx
<Button elementAs="a" href="/example">
  リンクボタン
</Button>
```

### Tailwind CSSの活用

コンポーネントのスタイリングには、Tailwind CSSを使用しています。clsxを用いて条件付きクラス適用を行なっています。

```tsx
const baseClasses = clsx(
  'flex shrink-0 items-center justify-center gap-1',
  buttonColors[variant].hover,
  buttonColors[variant].active,
  {
    'h-6 px-2.5': size === 'small',
    'h-8 px-3': size === 'medium',
    'h-10 px-4 leading-[24px]': size === 'large',
    'pointer-events-none': isDisabled,
  },
);
```

### Theme変数の利用

スタイリングとカラーは、`@zenkigen-inc/component-theme` パッケージから提供される変数を使用しています。

```tsx
import { buttonColors, focusVisible } from '@zenkigen-inc/component-theme';

// ...
buttonColors[variant].hover,
buttonColors[variant].active,
focusVisible.normal,
```

### TypeScript型設計

コンポーネントは厳格な型付けを採用し、Props型を明示的に定義しています。

```tsx
type Size = 'small' | 'medium' | 'large';
type Variant = 'fill' | 'fillDanger' | 'outline' | 'text';

type Props<T extends ElementAs> = PolymorphicPropsWithoutRef<
  T,
  {
    size?: Size;
    width?: CSSProperties['width'];
    isDisabled?: boolean;
    variant?: Variant;
    before?: ReactNode;
    after?: ReactNode;
    // ...
  }
>;
```

## コンポーネント開発ワークフロー

### 1. コンポーネント雛形の生成

新しいコンポーネントを開発する際は、hygenを使って雛形を生成します：

```bash
yarn generate-component
```

このコマンドは、適切なディレクトリ構造とファイルテンプレートを作成します。

### 2. コンポーネント実装

生成されたテンプレートを元に、コンポーネントのロジックとスタイリングを実装します。

### 3. Storybookでのテスト

実装したコンポーネントは、Storybookを使用してビジュアルテストを行います：

```bash
yarn storybook
```

### 4. インデックスファイルへのエクスポート追加

実装したコンポーネントは、パッケージのルートインデックスファイル（packages/component-ui/src/index.ts）から再エクスポートする必要があります：

```tsx
export * from './new-component';
```

## 共通パターン

### アクセシビリティ対応

コンポーネントはアクセシビリティを考慮して設計されています。具体的には：

- 適切なARIA属性の使用
- キーボードナビゲーションのサポート
- 十分なコントラスト比の確保

### レスポンシブ対応

コンポーネントは、様々な画面サイズに対応するレスポンシブな設計を採用しています。

### バリエーションとプロパティ

多くのコンポーネントは、以下のような共通プロパティを持っています：

- **size**: サイズバリエーション（small、medium、large）
- **variant**: 見た目のバリエーション（fill、outline、text）
- **isDisabled**: 無効状態
- **isSelected**: 選択状態

## コンポーネントの例

### Button

```tsx
<Button size="medium" variant="fill" isDisabled={false} onClick={handleClick}>
  ボタンテキスト
</Button>
```

### TextInput

```tsx
<TextInput
  placeholder="入力してください"
  value={value}
  onChange={handleChange}
  isError={hasError}
  errorMessage="エラーメッセージ"
/>
```

## 発展的な実装例

より高度なコンポーネントは、内部状態を管理し、複雑なインタラクションをサポートしています：

### Modal

```tsx
<Modal isOpen={isModalOpen} onClose={handleModalClose} title="モーダルタイトル">
  <div>モーダルコンテンツ</div>
</Modal>
```

### Select

```tsx
<Select
  options={[
    { value: '1', label: 'オプション1' },
    { value: '2', label: 'オプション2' },
  ]}
  value={selectedValue}
  onChange={handleSelectChange}
/>
```
