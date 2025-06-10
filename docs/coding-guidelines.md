# コーディングガイドライン

このドキュメントは、zenkigen-componentプロジェクトにおける開発のコーディング標準と規約を定義しています。

## 目次

1. [プロジェクト構成](#プロジェクト構成)
2. [エディタ設定](#エディタ設定)
3. [TypeScript規約](#typescript規約)
4. [React規約](#react規約)
5. [スタイル規約](#スタイル規約)
6. [命名規約](#命名規約)
7. [Import/Export規約](#importexport規約)
8. [Lint・Format規約](#lintformat規約)
9. [禁止事項](#禁止事項)
10. [推奨VSCode拡張機能](#推奨vscode拡張機能)

---

## プロジェクト構成

本プロジェクトはmonorepo構成で、以下のワークスペースに分かれています：

- `packages/component-ui/` - UIコンポーネント
- `packages/component-config/` - 設定・トークン管理
- `packages/component-icons/` - アイコンコンポーネント
- `packages/component-theme/` - テーマ設定

```
zenkigen-component/
├── packages/
│   ├── component-ui/
│   ├── component-config/
│   ├── component-icons/
│   └── component-theme/
├── .vscode/
├── docs/
└── ...
```

---

## エディタ設定

### VSCode設定

プロジェクトルートの`.vscode/settings.json`により、以下が自動設定されます：

- **タブサイズ**: 2スペース
- **デフォルトフォーマッター**: Prettier
- **保存時の自動フォーマット**: 有効
- **保存時のESLint自動修正**: 有効
- **TypeScript**: ローカルのTypeScriptバージョンを使用

### 推奨拡張機能

以下の拡張機能のインストールを推奨します（`.vscode/extensions.json`で定義）：

- ESLint
- Prettier - Code formatter
- Pretty TypeScript Errors
- Highlight Matching Tag
- Tailwind CSS IntelliSense

---

## TypeScript規約

### 基本設定

- **ターゲット**: `esnext`
- **モジュール**: `esnext`
- **strict**: `true`（厳格モード）
- **noUncheckedIndexedAccess**: `true`（配列・オブジェクトアクセスの安全性向上）

### 型定義

```typescript
// ✅ 良い例: 型インポートを明示
import type { ReactNode } from 'react';
import type { ComponentProps } from './types';

// ❌ 悪い例: 通常のインポートと型インポートの混在
import React, { ReactNode } from 'react';
```

### Boolean型変数の命名

Boolean型の変数は以下のプレフィックスを使用：

```typescript
// ✅ 良い例
const isVisible = true;
const shouldRender = false;
const hasError = true;
const canSubmit = false;

// ❌ 悪い例
const visible = true;
const render = false;
```

### 厳格なBoolean式

条件式では厳格なBoolean評価を要求：

```typescript
// ✅ 良い例
if (value !== undefined) { ... }
if (array.length > 0) { ... }
if (user?.isActive === true) { ... }

// ❌ 悪い例
if (value) { ... }
if (array.length) { ... }
if (user?.isActive) { ... }
```

---

## React規約

### ファイル拡張子

React コンポーネントファイルは`.tsx`拡張子を使用：

```typescript
// ✅ 良い例: Button.tsx
export const Button = () => {
  return <button>Click me</button>;
};
```

### JSX記法

```typescript
// ✅ 良い例: Boolean属性は明示的に
<Button disabled={true} />
<Input required={false} />

// ❌ 悪い例: Boolean属性の省略形
<Button disabled />
<Input required />

// ✅ 良い例: 不要な中括弧を避ける
<div className="container">
  <span>Hello World</span>
</div>

// ❌ 悪い例: 不要な中括弧
<div className={"container"}>
  <span>{"Hello World"}</span>
</div>
```

### Hooks規約

```typescript
// ✅ 良い例: useEffectの依存配列を適切に管理
useEffect(() => {
  fetchData(id);
}, [id, fetchData]);

// ✅ 良い例: button要素のtype属性を明示
<button type="button" onClick={handleClick}>
  Click me
</button>

<button type="submit">
  Submit
</button>
```

### dangerouslySetInnerHTML禁止

```typescript
// ❌ 禁止: XSSリスクのため
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

---

## スタイル規約

### Prettier設定

- **行幅**: 120文字
- **インデント**: 2スペース
- **セミコロン**: 必須
- **クォート**: シングルクォート
- **末尾カンマ**: 必須
- **ブラケット周りのスペース**: 有効

```typescript
// ✅ 良い例
const config = {
  name: 'example',
  version: '1.0.0',
  dependencies: ['react', 'typescript'],
};
```

### Tailwind CSS

- `@zenkigen-inc/component-config`のプリセットを使用
- `clsx`を使用した動的クラス名生成をサポート

```typescript
// ✅ 良い例: clsxを使用した動的クラス
const buttonClasses = clsx(
  'px-4 py-2 rounded',
  isDisabled && 'opacity-50 cursor-not-allowed',
  variant === 'primary' && 'bg-blue-500 text-white',
);
```

---

## 命名規約

### 基本原則

**直感的でわかりやすい名前を使用する**

ディレクトリ名、ファイル名、変数名は以下の原則に従って命名します：

```typescript
// ✅ 良い例: 目的が明確で理解しやすい
const userAccountBalance = 1000;
const calculateTotalPrice = () => {};
const isEmailValidationEnabled = true;

// ❌ 悪い例: 略語や曖昧な名前
const bal = 1000;
const calc = () => {};
const flag = true;
```

### ファイル・ディレクトリ

**すべてkebab-caseで統一**

- **コンポーネントファイル**: kebab-case (`button.tsx`, `user-profile.tsx`)
- **ユーティリティファイル**: kebab-case (`format-date.ts`, `validate-email.ts`)
- **ストーリーファイル**: kebab-case (`button.stories.tsx`)
- **ディレクトリ**: kebab-case (`component-ui/`, `user-settings/`)

```typescript
// ✅ 良い例: kebab-caseで統一された分かりやすいファイル名
user-account-modal.tsx
email-validation-utils.ts
shopping-cart/
use-outside-click.ts

// ❌ 悪い例: 他の命名規約や略語・曖昧な名前
UserAccountModal.tsx  // PascalCase
emailValidationUtils.ts  // camelCase
UAM.tsx  // 略語
utils.ts  // 曖昧
cart/  // 略語
```

### 変数・関数

**基本的な命名規則**

```typescript
// ✅ 良い例: camelCase
const userName = 'john';
const currentUserRole = 'admin';
const maxRetryAttempts = 3;
```

**関数名は「動詞＋目的語」の形式**

```typescript
// ✅ 良い例: 動詞＋目的語
const calculateTotalPrice = () => {};
const validateEmailAddress = () => {};
const fetchUserData = () => {};
const updateUserProfile = () => {};
const deleteShoppingCartItem = () => {};

// ❌ 悪い例: 動詞のみ、または曖昧な名前
const calculate = () => {};
const validate = () => {};
const process = () => {};
const handle = () => {};
```

**イベントハンドラーの命名**

イベントハンドラーのcallback関数は `handle[イベント名]` の形式を使用：

```typescript
// ✅ 良い例: handleイベント名
const handleClick = () => {};
const handleSubmit = () => {};
const handleChange = () => {};
const handleMouseEnter = () => {};
const handleFormSubmit = () => {};
const handleButtonClick = () => {};

// ❌ 悪い例: handleプレフィックスなし
const onClick = () => {};
const onSubmit = () => {};
const clickHandler = () => {};
```

**React コンポーネントでの使用例**

```typescript
// ✅ 良い例
const LoginForm = () => {
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    // メール入力の処理
  };

  const handleFormSubmit = (event: FormEvent) => {
    // フォーム送信の処理
  };

  const handlePasswordVisibilityToggle = () => {
    // パスワード表示切り替えの処理
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input onChange={handleEmailChange} />
      <button type="button" onClick={handlePasswordVisibilityToggle}>
        Toggle Password
      </button>
    </form>
  );
};
```

**Boolean型変数のプレフィックス**

Boolean型の変数は以下のプレフィックスを使用：

```typescript
// ✅ 良い例
const isUserLoggedIn = true;
const shouldShowErrorMessage = false;
const hasValidationErrors = true;
const canSubmitForm = false;
const isEmailNotificationEnabled = true;

// ❌ 悪い例
const loggedIn = true;
const showError = false;
const errors = true;
```

### 定数

```typescript
// ✅ 良い例: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
```

---

## Import/Export規約

### インポート順序

simple-import-sortプラグインにより自動的にソートされます：

```typescript
// 1. Node.js built-in modules
import path from 'node:path';

// 2. External libraries
import React from 'react';
import clsx from 'clsx';

// 3. Internal modules
import { Button } from './Button';
import type { ComponentProps } from './types';
```

### 型インポート

```typescript
// ✅ 良い例: 型は明示的にimport type
import type { FC, ReactNode } from 'react';
import type { ButtonProps } from './Button.types';
```

### エクスポート

```typescript
// ✅ 良い例: 型エクスポートを明示
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

---

## Lint・Format規約

### 必須ツール

- **ESLint**: コード品質とスタイルのチェック
- **Prettier**: コード整形
- **TypeScript**: 型チェック

### 実行コマンド

```bash
# Lint実行
yarn lint

# Lint + 自動修正
yarn lint:fix

# 型チェック
yarn type-check
```

### 保存時の自動実行

VSCodeでは保存時に以下が自動実行されます：

1. Prettier による整形
2. ESLint による自動修正

---

## 禁止事項

### 絶対禁止

```typescript
// ❌ console.log/error（本番コードで）
console.log('debug message');
console.error('error');

// ❌ alert/confirm/prompt
alert('Hello');
confirm('Are you sure?');

// ❌ undefined変数の使用
const result = undefined; // 代わりにnullを使用

// ❌ == / != 演算子
if (value == null) // 代わりに===、!==を使用

// ❌ dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: content }} />
```

### 強く推奨

```typescript
// ✅ テンプレートリテラルの使用
const message = `Hello, ${name}!`;

// ❌ 文字列連結
const message = 'Hello, ' + name + '!';

// ✅ return文の前に改行
const calculate = () => {
  const result = a + b;

  return result;
};
```

---

## 推奨VSCode拡張機能

プロジェクトの推奨拡張機能（`.vscode/extensions.json`）：

1. **ESLint** (`dbaeumer.vscode-eslint`) - 必須
2. **Prettier** (`esbenp.prettier-vscode`) - 必須
3. **Prettier ESLint** (`rvest.vs-code-prettier-eslint`) - 推奨
4. **Pretty TypeScript Errors** (`yoavbls.pretty-ts-errors`) - 推奨
5. **Highlight Matching Tag** (`vincaslt.highlight-matching-tag`) - 推奨
6. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - 必須

---

## 開発フロー

### 1. コーディング前

- 必要な拡張機能がインストールされているか確認
- `.vscode/settings.json`の設定が有効になっているか確認

### 2. コーディング中

- 保存時にPrettierとESLintが自動実行されることを確認
- TypeScriptのエラーは都度解決する

### 3. コミット前

```bash
# 全体のLintチェックと修正
yarn lint:fix

# 型チェック
yarn type-check

# ビルドの確認
yarn build:all
```

### 4. 品質保証

- すべてのESLintエラーが解決されている
- TypeScriptの型エラーがない
- Prettierによる整形が完了している
- 自動生成ファイルは変更していない

---

このガイドラインに従うことで、チーム全体で一貫したコード品質を保ち、保守性の高いコードベースを維持できます。
