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
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  return (
    <FileInput
      variant="button"
      isError={errorMessages.length > 0}
      errorMessages={errorMessages}
      onSelect={(file) => setSelectedFile(file)}
      onError={(errors) => setErrorMessages(errors.map((e) => e.message))}
    />
  );
};
```

## Props

### 必須プロパティ

| プロパティ | 型                         | 説明                           |
| ---------- | -------------------------- | ------------------------------ |
| `variant`  | `'button'` \| `'dropzone'` | コンポーネントのバリエーション |

### オプションプロパティ

| プロパティ      | 型                                   | デフォルト値 | 説明                                                                                             |
| --------------- | ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------ |
| `id`            | `string`                             | `undefined`  | input要素のID（外部のlabel要素との連携用）                                                       |
| `size`          | `'small'` \| `'medium'` \| `'large'` | `'medium'`   | サイズ（`button` variant のみ有効）                                                              |
| `accept`        | `string`                             | `undefined`  | 許可するファイル形式（拡張子またはMIMEタイプ。カンマ区切り対応）                                 |
| `maxSize`       | `number`                             | `undefined`  | 最大ファイルサイズ（バイト単位）                                                                 |
| `isDisabled`    | `boolean`                            | `false`      | 無効化状態                                                                                       |
| `isError`       | `boolean`                            | `false`      | エラー表現の有効化。true のときのみエラースタイル/`aria-invalid` が適用される                    |
| `onSelect`      | `(file: File \| null) => void`       | `undefined`  | ファイル選択時／クリア時（`null`）のコールバック                                                 |
| `onError`       | `(errors: FileInputError[]) => void` | `undefined`  | バリデーションエラー発生時のコールバック                                                         |
| `errorMessages` | `string[]`                           | `undefined`  | 表示用のエラーメッセージ。`isError=true` のときにのみUIに表示され、`aria-describedby` 連携される |

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

- ボーダー: `border-uiBorder03`、破線（`border-dashed`）
- 背景: `bg-white`
- テキスト色: `text-text01`
- ホバー時: `hover:bg-hover02`
- カーソル: `cursor-pointer`
- アイコン: `download-document`（色: `icon01`）

#### ドラッグオーバー状態（dropzone）

- ボーダー: `border-activeInput`
- 背景: `bg-activeInput/5`（薄い背景色）

#### エラー状態（バリデーション失敗時）

UIのエラー表現は `isError` によってのみ制御される。`errorMessages` は文言表示用であり、視覚表現は変化しない。

**button variant:**

- `isError=true` のとき、ボタンバリエーション: `outlineDanger`
- `isError=true` かつ `errorMessages` がある場合、メッセージ色: `text-supportError`

**dropzone variant:**

- `isError=true` のとき、ボーダー: `border-supportDanger`（背景: `bg-white`）
- `isError=true` かつ `errorMessages` がある場合、メッセージ色: `text-supportDanger`

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
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  return (
    <FileInput
      variant="button"
      isError={errorMessages.length > 0}
      errorMessages={errorMessages}
      onSelect={(selectedFile) => setFile(selectedFile)}
      onError={(errors) => setErrorMessages(errors.map((e) => e.message))}
    />
  );
};
```

### Dropzoneバリエーション

```typescript
<FileInput
  variant="dropzone"
  // onSelect={(file) => { /* 選択ファイルを状態に保持する */ }}
  // onError={(errors) => { /* errors.map(e => e.message) を状態に保持して表示 */ }}
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
  // onSelect={(file) => { /* 選択ファイルを状態に保持する */ }}
  // onError={(errors) => { /* errors.map(e => e.message) を状態に保持して表示 */ }}
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
        // onSelect={(file) => { /* 選択ファイルを状態に保持する */ }}
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
// エラー表示（見た目）を出すには isError を true にする
<FileInput
  variant="button"
  isError={true}
  errorMessages={["ファイルサイズが大き過ぎます。", "ファイル形式が正しくありません。"]}
/>

<FileInput
  variant="dropzone"
  isError={true}
  errorMessages={["ファイルサイズが大き過ぎます。", "ファイル形式が正しくありません。"]}
/>
```

### エラーメッセージのカスタマイズ例

`onError`コールバックで受け取ったエラー情報（`FileInputError[]`）に基づいて、カスタムメッセージを生成できます。エラーの`type`に応じて、異なるメッセージを表示することができます。

```typescript
import { useState } from 'react';
import { FileInput } from '@zenkigen-inc/component-ui';
import type { FileInputError } from '@zenkigen-inc/component-ui';

const CustomErrorMessageExample = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleError = (errors: FileInputError[]) => {
    const customMessages = errors.map((error) => {
      switch (error.type) {
        case 'SIZE_TOO_LARGE':
          // カスタムメッセージ例: 具体的なサイズ制限を表示
          return 'ファイルサイズが10MBを超えています。別のファイルを選択してください。';
        case 'UNSUPPORTED_FORMAT':
          // カスタムメッセージ例: 許可されている形式を表示
          return 'CSVファイルまたはPDFファイルのみアップロード可能です。';
        default:
          return error.message; // デフォルトメッセージを使用
      }
    });

    setErrorMessages(customMessages);
  };

  return (
    <FileInput
      variant="button"
      accept=".csv,.pdf"
      maxSize={10 * 1024 * 1024} // 10MB
      isError={errorMessages.length > 0}
      errorMessages={errorMessages}
      onSelect={(file) => {
        setSelectedFile(file);
        // ファイル選択成功時はエラーメッセージをクリア
        if (file != null) {
          setErrorMessages([]);
        }
      }}
      onError={handleError}
    />
  );
};
```

### 無効状態

```typescript
<FileInput
  variant="button"
  isDisabled={true}
/>

<FileInput
  variant="dropzone"
  isDisabled={true}
/>
```

### 外部label要素との連携

```typescript
// 外部のlabel要素と連携
<label htmlFor="my-file-input">
  ファイルを選択してください
</label>
<FileInput
  id="my-file-input"
  variant="button"
  onSelect={(file) => console.log('Selected:', file)}
/>

// IDを指定しない場合は自動生成
<FileInput variant="button" />
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
    // errors[0].message: 'ファイルサイズが大き過ぎます。'
    // UI表示する場合は errorMessages に渡す（例：setStateで保持）
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
- `errors` 配列に `{ type: 'UNSUPPORTED_FORMAT', message: 'ファイル形式が正しくありません。' }` が含まれる
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
- `useId`を使用して一意のIDを生成（外部`id` propが未指定の場合）
- アクセシビリティ対応（ARIA属性、キーボード操作）

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
- `onSelect(null)` が呼ばれる（クリア/リセット時）
- エラー表示は外部制御（`errorMessages`）のため、必要に応じて呼び出し側でクリアする

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
- エラー表示時（`isError=true` かつ `errorMessages` あり）：`aria-describedby`でinput要素と連携

### Dropzone Variant

- クリック操作でファイルダイアログを開く
- キーボード操作：Tab、Enter、Spaceキーで操作可能
- `role="button"`でボタンとして認識
- `aria-label`でアクセシブルな名前を提供
- `aria-disabled`で無効状態を明示
- エラー表示時（`isError=true` かつ `errorMessages` あり）：`aria-describedby`でinput要素と連携

---

## 注意事項

- ファイルはバリデーション成功後に`onSelect(file)`で渡される
- バリデーション失敗時は`onError(errors)`のみが呼ばれ、`onSelect`は呼ばれない
- エラー表現は `isError` で制御する。`errorMessages` は文言表示のみを担い、`isError=true` のときに表示される
- `reset`/クリア時は`onSelect(null)`が呼ばれる
- ユーザーがファイルダイアログでキャンセルした場合は、既存の選択状態を維持する（意図的な仕様）
- 外部`<label>`要素と連携する場合は`id` propを指定する

---

## スタイルのカスタマイズ

本コンポーネントはTailwind CSSを使用しており、プロジェクト全体のデザインシステムに統合されている。カスタマイズが必要な場合は、Tailwind設定ファイル（`tailwind.config.js`）で色やタイポグラフィを調整すること。

---

## 更新履歴

| 日付       | 内容                                    | 担当者 |
| ---------- | --------------------------------------- | ------ |
| 2025-10-29 | アクセシビリティ改善、外部label連携対応 | -      |
| 2025-10-29 | 新規作成                                | -      |
