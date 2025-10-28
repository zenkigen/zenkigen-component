# FileInput コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [オプションプロパティ](#オプションプロパティ)
   - [継承プロパティ](#継承プロパティ)
5. [Ref API](#ref-api)
6. [状態とスタイル](#状態とスタイル)
   - [バリエーション](#バリエーション)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
7. [使用例](#使用例)
   - [基本的な使用例（Button）](#基本的な使用例button)
   - [Dropzoneバリエーション](#dropzoneバリエーション)
   - [サイズバリエーション](#サイズバリエーション-1)
   - [ファイル制約の設定](#ファイル制約の設定)
   - [Refを使った制御](#refを使った制御)
   - [エラー状態](#エラー状態)
   - [無効状態](#無効状態)
8. [ファイルバリデーション](#ファイルバリデーション)
   - [サイズチェック](#サイズチェック)
   - [形式チェック](#形式チェック)
9. [技術的な詳細](#技術的な詳細)
   - [実装について](#実装について)
   - [ドラッグ&ドロップ](#ドラッグドロップ)
   - [ファイル選択のリセット](#ファイル選択のリセット)
10. [アクセシビリティ](#アクセシビリティ)
11. [注意事項](#注意事項)
12. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
13. [更新履歴](#更新履歴)
14. [関連ドキュメント](#関連ドキュメント)

---

## 概要

FileInputコンポーネントは、ファイル選択とアップロード機能を提供するUIコンポーネントである。ボタン形式とドロップゾーン形式の2つのバリエーションがあり、ドラッグ&ドロップによるファイル選択、ファイル形式とサイズのバリデーション、選択状態のリセット機能などを備えている。

## インポート

```typescript
import { FileInput } from '@zenkigen-inc/component-ui';
import type { FileInputRef } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { FileInput } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <FileInput
      variant="button"
      onSelect={(file) => setSelectedFile(file)}
      onError={(errors) => {
        errors.forEach((error) => {
          console.error(`[${error.type}] ${error.message}`);
        });
      }}
    />
  );
};
```

## Props

### オプションプロパティ

| プロパティ   | 型                                    | デフォルト値 | 説明                                           |
| ------------ | ------------------------------------- | ------------ | ---------------------------------------------- |
| `variant`    | `'button' \| 'dropzone'`              | `'button'`   | コンポーネントのバリエーション                 |
| `size`       | `'small' \| 'medium' \| 'large'`      | `'medium'`   | サイズ（`button` variantのみ有効）             |
| `accept`     | `string`                              | `undefined`  | 許可するファイル形式（拡張子またはMIMEタイプ） |
| `maxSize`    | `number`                              | `undefined`  | 最大ファイルサイズ（バイト単位）               |
| `isDisabled` | `boolean`                             | `false`      | 無効化状態                                     |
| `onSelect`   | `(file: File \| null) => void`        | `undefined`  | ファイル選択時のコールバック関数               |
| `onError`    | `(errors: FileInputError[]) => void` | `undefined`  | エラー発生時のコールバック関数                 |

#### FileInputError 型

```typescript
type FileInputError = {
  type: 'SIZE_TOO_LARGE' | 'UNSUPPORTED_FORMAT';
  message: string;
};
```

複数のバリデーションエラーが同時に発生する可能性があります。例えば、ファイルサイズが超過かつ形式が不適切な場合、両方のエラーが配列で返されます。

| プロパティ | 型                                         | 説明                                                                                                     |
| ---------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `type`     | `'SIZE_TOO_LARGE' \| 'UNSUPPORTED_FORMAT'` | エラーの種類：`SIZE_TOO_LARGE`（ファイルサイズ超過）、`UNSUPPORTED_FORMAT`（対応していないファイル形式） |
| `message`  | `string`                                   | ユーザー向けのエラーメッセージ（日本語）                                                                 |

### 継承プロパティ

このコンポーネントは、内部的に`<input type="file">`要素を使用しているが、標準のHTML属性は直接継承しない。代わりに、専用のPropsを通じて制御する。

## Ref API

`FileInputRef`型を使用して、コンポーネントの機能をプログラマティックに制御できる。

| メソッド | 型           | 説明                           |
| -------- | ------------ | ------------------------------ |
| `reset`  | `() => void` | ファイル選択状態をリセットする |

```typescript
const fileInputRef = useRef<FileInputRef>(null);

// ファイル選択をリセット
fileInputRef.current?.reset();
```

## 状態とスタイル

### バリエーション

#### button（デフォルト）

- ボタン形式のファイル選択UI
- アップロードアイコン付きボタンを表示
- ファイル選択後、ボタン内にファイル名を表示
- 選択済みの場合、クリアボタン（×）が表示される
- サイズバリエーションが適用可能

#### dropzone

- ドロップゾーン形式のファイル選択UI
- ドラッグ&ドロップエリアを表示
- クリックでもファイル選択ダイアログを開ける
- 対応形式とサイズ制限の情報を表示（`accept`/`maxSize`に基づき動的表示）
- ファイル選択後、ファイル名とクリアボタンを表示
- ドラッグオーバー時に視覚的フィードバックあり

### サイズバリエーション

サイズは`button` variantのみに適用される。

#### small

- ボタンサイズ: `size="small"`（Buttonコンポーネントのサイズ）
- アイコンサイズ: `small`
- クリアボタンサイズ: `small`

#### medium（デフォルト）

- ボタンサイズ: `size="medium"`（Buttonコンポーネントのサイズ）
- アイコンサイズ: `small`
- クリアボタンサイズ: `small`

#### large

- ボタンサイズ: `size="large"`（Buttonコンポーネントのサイズ）
- アイコンサイズ: `small`
- クリアボタンサイズ: `small`

### 状態に応じたスタイル

#### 通常状態（button）

- ボタンバリエーション: `outline`
- アイコン: `upload`（アップロードアイコン）
- ボタンテキスト: 「ファイルを選択」または「ファイルを選択 [ファイル名]」

#### 通常状態（dropzone）

- ボーダー: `border-uiBorder02`、破線（`border-dashed`）
- 背景: `bg-white`
- テキスト色: `text-text01`
- ホバー時: `border-hoverInput`
- カーソル: `cursor-pointer`
- アイコン色: `icon01`

#### ドラッグオーバー状態（dropzone）

- ボーダー: `border-activeInput`
- 背景: `bg-activeInput/5`（薄い背景色）
- トランジション効果あり

#### エラー状態（バリデーション失敗時）

**button variant:**

- ボタンバリエーション: `fillDanger`（危険色の塗りつぶし）
- エラーは`onError`コールバックで通知される

**dropzone variant:**

- ボーダー: `border-supportDanger`
- 背景: `bg-white`
- エラーメッセージ表示: `onError`コールバックで返されたエラー内容を動的に表示
- エラーメッセージ背景: `bg-uiBackgroundError`
- エラーメッセージテキスト色: `text-supportDanger`

#### 無効状態（`isDisabled: true`）

**button variant:**

- ボタンの`isDisabled`プロパティが`true`
- クリアボタンが非表示

**dropzone variant:**

- ボーダー: `border-disabled01`
- 背景: `bg-disabled02`
- テキスト色: `text-textPlaceholder`
- カーソル: `cursor-not-allowed`
- アイコン色: `icon03`
- ドラッグ&ドロップ無効化

## 使用例

### 基本的な使用例（Button）

```typescript
import { useState } from 'react';
import { FileInput } from '@zenkigen-inc/component-ui';

const BasicExample = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileInput
      variant="button"
      onSelect={(selectedFile) => {
        setFile(selectedFile);
        console.log('Selected file:', selectedFile);
      }}
      onError={(errors) => {
        alert(errors.map((e) => e.message).join('\n'));
      }}
    />
  );
};
```

### Dropzoneバリエーション

```typescript
<FileInput
  variant="dropzone"
  onSelect={(file) => {
    console.log('Selected file:', file);
  }}
  onError={(errors) => {
    errors.forEach((error) => {
      console.error(`[${error.type}] ${error.message}`);
    });
  }}
/>
```

### サイズバリエーション

```typescript
// Small
<FileInput variant="button" size="small" />

// Medium（デフォルト）
<FileInput variant="button" size="medium" />

// Large
<FileInput variant="button" size="large" />
```

### ファイル制約の設定

```typescript
<FileInput
  variant="button"
  accept=".csv,.pdf"
  maxSize={50 * 1024 * 1024} // 50MB
  onSelect={(file) => {
    console.log('Valid file selected:', file);
  }}
  onError={(errors) => {
    alert(errors.map((e) => e.message).join('\n'));
  }}
/>
```

### Refを使った制御

```typescript
import { useRef } from 'react';
import { FileInput } from '@zenkigen-inc/component-ui';
import type { FileInputRef } from '@zenkigen-inc/component-ui';
import { Button } from '@zenkigen-inc/component-ui';

const RefControlExample = () => {
  const fileInputRef = useRef<FileInputRef>(null);

  const handleReset = () => {
    fileInputRef.current?.reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <FileInput
        ref={fileInputRef}
        variant="button"
        onSelect={(file) => {
          console.log('Selected file:', file);
        }}
      />
      <Button variant="text" onClick={handleReset}>
        リセット
      </Button>
    </div>
  );
};
```

### エラー状態

```typescript
<FileInput
  variant="button"
  accept=".csv,.pdf"
  maxSize={10 * 1024 * 1024}
  onError={(errors) => {
    errors.forEach((error) => {
      console.error(`[${error.type}] ${error.message}`);
    });
  }}
/>

<FileInput
  variant="dropzone"
  accept=".csv,.pdf"
  maxSize={10 * 1024 * 1024}
  onError={(errors) => {
    errors.forEach((error) => {
      console.error(`[${error.type}] ${error.message}`);
    });
  }}
/>
```

### 無効状態

```typescript
<FileInput
  variant="button"
  isDisabled={true}
  onSelect={(file) => console.log(file)}
/>

<FileInput
  variant="dropzone"
  isDisabled={true}
  onSelect={(file) => console.log(file)}
/>
```

## ファイルバリデーション

FileInputコンポーネントは、ファイル選択時に自動的にバリデーションを実行する。

### サイズチェック

`maxSize` Propが設定されている場合、選択されたファイルのサイズがこの値を超えていないかチェックする。

```typescript
<FileInput
  maxSize={10 * 1024 * 1024} // 10MB
  onError={(errors) => {
    // errors[0].type: 'SIZE_TOO_LARGE'
    // errors[0].message: "ファイルサイズが制限（10MB）を超えています"
    errors.forEach((error) => {
      console.error(`[${error.type}] ${error.message}`);
    });
  }}
/>
```

- 制限を超えた場合、`onError`コールバックが呼ばれる
- `errors` 配列に `{ type: 'SIZE_TOO_LARGE', message: "ファイルサイズが制限（{サイズ}MB）を超えています" }` が含まれる
- ファイルは選択されず、`onSelect`は呼ばれない

### 形式チェック

`accept` Propが設定されている場合、選択されたファイルの形式（拡張子またはMIMEタイプ）が許可されているかチェックする。

```typescript
<FileInput
  accept=".csv,.pdf,image/*"
  onError={(errors) => {
    // errors[0].type: 'UNSUPPORTED_FORMAT'
    // errors[0].message: "対応していないファイル形式です"
    errors.forEach((error) => {
      console.error(`[${error.type}] ${error.message}`);
    });
  }}
/>
```

- 許可されていない形式の場合、`onError`コールバックが呼ばれる
- `errors` 配列に `{ type: 'UNSUPPORTED_FORMAT', message: "対応していないファイル形式です" }` が含まれる
- ファイルは選択されず、`onSelect`は呼ばれない
- MIMEタイプの指定形式:
  - 具体的なMIMEタイプ: `image/png`, `application/pdf`
  - ワイルドカード: `image/*`, `video/*`
  - 拡張子: `.csv`, `.pdf`
  - 複合指定: `.csv,.pdf,image/*` のような複数形式の組み合わせ
  - カンマ区切りで複数指定可能

## 技術的な詳細

### 実装について

- `forwardRef`を使用してref転送をサポート（`FileInputRef`型）
- `useImperativeHandle`で`reset`メソッドを公開
- `clsx`を使用した動的クラス名の生成
- 内部で`<input type="file">`要素を使用（`hidden`クラスで非表示）
- ButtonコンポーネントとIconButtonコンポーネントを内部で使用

### ドラッグ&ドロップ

dropzone variantでのドラッグ&ドロップ機能：

- `dragover`イベント時に`isDragOver`状態を管理
- `dragleave`イベントで状態を解除
- `drop`イベントでファイルを取得
- 複数ファイルがドロップされた場合、最初のファイルのみ使用

### ファイル選択のリセット

`reset`メソッドでファイル選択状態をリセット：

- 選択済みファイルをクリア
- UI表示をファイル選択前の状態に戻す
- エラー状態もクリア
- `onSelect`コールバックに`null`を渡さない（リセット時は呼び出さない）

### 制約情報の動的表示

- `accept` Propから許可形式を抽出し、カンマ区切りで表示
- `maxSize` Propから最大サイズを計算し、人間が読める単位（KB、MB、GB）で表示
- `isDisabled`時に制約情報の色が`text-textPlaceholder`に変更

### エラーメッセージ

バリデーション失敗時に返されるエラーメッセージ：

- **SIZE_TOO_LARGE**: 「ファイルサイズが大き過ぎます。」
- **UNSUPPORTED_FORMAT**: 「ファイル形式が正しくありません。」

複数のエラーが発生した場合、すべてのエラーが`errors`配列に含まれる。

---

## アクセシビリティ

### Button Variant

- 標準のButtonコンポーネント機能を継承
- キーボード操作：Tab、Enter、Spaceキーで操作可能
- スクリーンリーダー対応：ボタンラベルが読み上げられる

### Dropzone Variant

- キーボード操作：Tab、Enter、Spaceキーでファイルダイアログを開く
- ドラッグ&ドロップ操作のみでなく、クリックでも操作可能
- エラーメッセージはスクリーンリーダーで読み上げられる

---

## 注意事項

- ファイルはバリデーション後に`onSelect`コールバックで渡される
- バリデーション失敗時は`onError`コールバックのみが呼ばれ、`onSelect`は呼ばれない
- エラー状態は内部的に管理され、外部から制御することはできない
- dropzone variantでのエラー表示は`onError`で返されたメッセージに基づく
- button variantでのエラー表示は外部のUIで実装する必要がある

---

## スタイルのカスタマイズ

本コンポーネントはTailwind CSSを使用しており、プロジェクト全体のデザインシステムに統合されている。カスタマイズが必要な場合は、Tailwind設定ファイル（`tailwind.config.ts`）で色やタイポグラフィを調整してください。

---

## 関連ドキュメント

- [FileInput 残りの作業](./file-uploader-known-issues.md) - 実装予定の改善項目

---

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-10-21 | 新規作成 | -      |
