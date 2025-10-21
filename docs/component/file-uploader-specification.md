# FileUploader コンポーネント仕様書

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

---

## 概要

FileUploaderコンポーネントは、ファイル選択とアップロード機能を提供するUIコンポーネントである。ボタン形式とドロップゾーン形式の2つのバリエーションがあり、ドラッグ&ドロップによるファイル選択、ファイル形式とサイズのバリデーション、選択状態のリセット機能などを備えている。

## インポート

```typescript
import { FileUploader } from '@zenkigen-inc/component-ui';
import type { FileUploaderRef } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { FileUploader } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <FileUploader
      variant="button"
      onFileSelect={(file) => setSelectedFile(file)}
      onError={(error) => console.error(error)}
    />
  );
};
```

## Props

### オプションプロパティ

| プロパティ     | 型                               | デフォルト値 | 説明                                     |
| -------------- | -------------------------------- | ------------ | ---------------------------------------- |
| `variant`      | `'button' \| 'dropzone'`         | `'button'`   | コンポーネントのバリエーション           |
| `size`         | `'small' \| 'medium' \| 'large'` | `'medium'`   | サイズ（`button` variantのみ有効）       |
| `accept`       | `string`                         | `undefined`  | 許可するファイル形式（MIMEタイプ）       |
| `maxSize`      | `number`                         | `undefined`  | 最大ファイルサイズ（バイト単位）         |
| `isDisabled`   | `boolean`                        | `false`      | 無効化状態                               |
| `isError`      | `boolean`                        | `false`      | エラー状態                               |
| `onFileSelect` | `(file: File \| null) => void`   | `undefined`  | ファイル選択時のコールバック関数         |
| `onError`      | `(error: string) => void`        | `undefined`  | エラー発生時のコールバック関数（日本語） |

### 継承プロパティ

このコンポーネントは、内部的に`<input type="file">`要素を使用しているが、標準のHTML属性は直接継承しない。代わりに、専用のPropsを通じて制御する。

## Ref API

`FileUploaderRef`型を使用して、コンポーネントの機能をプログラマティックに制御できる。

| メソッド         | 型           | 説明                                     |
| ---------------- | ------------ | ---------------------------------------- |
| `reset`          | `() => void` | ファイル選択状態をリセットする           |
| `openFileDialog` | `() => void` | ファイル選択ダイアログをプログラムで開く |

```typescript
const fileUploaderRef = useRef<FileUploaderRef>(null);

// ファイル選択をリセット
fileUploaderRef.current?.reset();

// ファイル選択ダイアログを開く
fileUploaderRef.current?.openFileDialog();
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
- 対応形式とサイズ制限の情報を表示（ハードコードされた例示）
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

#### エラー状態（`isError: true`）

**button variant:**

- ボタンバリエーション: `fillDanger`（危険色の塗りつぶし）

**dropzone variant:**

- ボーダー: `border-supportError`
- 背景: `bg-white`
- エラーメッセージ表示:
  - 「ファイルサイズが大き過ぎます。」
  - 「ファイル形式が正しくありません。」
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
import { FileUploader } from '@zenkigen-inc/component-ui';

const BasicExample = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileUploader
      variant="button"
      onFileSelect={(selectedFile) => {
        setFile(selectedFile);
        console.log('Selected file:', selectedFile);
      }}
      onError={(error) => {
        alert(error);
      }}
    />
  );
};
```

### Dropzoneバリエーション

```typescript
<FileUploader
  variant="dropzone"
  onFileSelect={(file) => {
    console.log('Selected file:', file);
  }}
  onError={(error) => {
    console.error('Error:', error);
  }}
/>
```

### サイズバリエーション

```typescript
// Small
<FileUploader variant="button" size="small" />

// Medium（デフォルト）
<FileUploader variant="button" size="medium" />

// Large
<FileUploader variant="button" size="large" />
```

### ファイル制約の設定

```typescript
<FileUploader
  variant="button"
  accept=".csv,.pdf"
  maxSize={50 * 1024 * 1024} // 50MB
  onFileSelect={(file) => {
    console.log('Valid file selected:', file);
  }}
  onError={(error) => {
    alert(error);
  }}
/>
```

### Refを使った制御

```typescript
import { useRef } from 'react';
import { FileUploader } from '@zenkigen-inc/component-ui';
import type { FileUploaderRef } from '@zenkigen-inc/component-ui';
import { Button } from '@zenkigen-inc/component-ui';

const RefControlExample = () => {
  const fileUploaderRef = useRef<FileUploaderRef>(null);

  const handleReset = () => {
    fileUploaderRef.current?.reset();
  };

  const handleOpenDialog = () => {
    fileUploaderRef.current?.openFileDialog();
  };

  return (
    <div className="flex flex-col gap-4">
      <FileUploader
        ref={fileUploaderRef}
        variant="button"
        onFileSelect={(file) => {
          console.log('Selected file:', file);
        }}
      />
      <div className="flex gap-2">
        <Button variant="text" onClick={handleOpenDialog}>
          ファイル選択ダイアログを開く
        </Button>
        <Button variant="text" onClick={handleReset}>
          リセット
        </Button>
      </div>
    </div>
  );
};
```

### エラー状態

```typescript
<FileUploader
  variant="button"
  isError={true}
  onFileSelect={(file) => console.log(file)}
/>

<FileUploader
  variant="dropzone"
  isError={true}
  onFileSelect={(file) => console.log(file)}
/>
```

### 無効状態

```typescript
<FileUploader
  variant="button"
  isDisabled={true}
  onFileSelect={(file) => console.log(file)}
/>

<FileUploader
  variant="dropzone"
  isDisabled={true}
  onFileSelect={(file) => console.log(file)}
/>
```

## ファイルバリデーション

FileUploaderコンポーネントは、ファイル選択時に自動的にバリデーションを実行する。

### サイズチェック

`maxSize` Propが設定されている場合、選択されたファイルのサイズがこの値を超えていないかチェックする。

```typescript
<FileUploader
  maxSize={10 * 1024 * 1024} // 10MB
  onError={(error) => {
    // error: "ファイルサイズが制限（10MB）を超えています"
    console.error(error);
  }}
/>
```

- 制限を超えた場合、`onError`コールバックが呼ばれる
- エラーメッセージは日本語で「ファイルサイズが制限（{サイズ}MB）を超えています」
- ファイルは選択されず、`onFileSelect`は呼ばれない

### 形式チェック

`accept` Propが設定されている場合、選択されたファイルの形式（MIMEタイプ）が許可されているかチェックする。

```typescript
<FileUploader
  accept=".csv,.pdf,image/*"
  onError={(error) => {
    // error: "対応していないファイル形式です"
    console.error(error);
  }}
/>
```

- 許可されていない形式の場合、`onError`コールバックが呼ばれる
- エラーメッセージは日本語で「対応していないファイル形式です」
- ファイルは選択されず、`onFileSelect`は呼ばれない
- MIMEタイプの指定形式:
  - 具体的なMIMEタイプ: `image/png`, `application/pdf`
  - ワイルドカード: `image/*`, `video/*`
  - 拡張子: `.csv`, `.pdf`
  - カンマ区切りで複数指定可能

## 技術的な詳細

### 実装について

- `forwardRef`を使用してref転送をサポート（`FileUploaderRef`型）
- `useImperativeHandle`で`reset`と`openFileDialog`メソッドを公開
- `clsx`を使用した動的クラス名の生成
- 内部で`<input type="file">`要素を使用（`hidden`クラスで非表示）
- ButtonコンポーネントとIconButtonコンポーネントを内部で使用
- Iconコンポーネント（`@zenkigen-inc/component-icons`）を使用

### ドラッグ&ドロップ

`dropzone` variantでは、以下のドラッグイベントをハンドリングしている：

- `onDragOver`: ドラッグオーバー時の処理（`preventDefault`を呼び出してドロップを許可）
- `onDragLeave`: ドラッグが離れた時の処理
- `onDrop`: ファイルがドロップされた時の処理

ドラッグオーバー中は視覚的フィードバック（ボーダー色と背景色の変化）を提供する。

### ファイル選択のリセット

ファイル選択状態をリセットする際は、以下の処理を実行する：

1. 内部の状態（`selectedFile`）を`null`にする
2. `<input type="file">`要素の`value`プロパティを空文字列に設定
3. `onFileSelect`コールバックに`null`を渡す

これにより、同じファイルを再度選択した際も`onChange`イベントが正しく発火する。

```typescript
const handleClear = useCallback(() => {
  setSelectedFile(null);
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
  onFileSelect?.(null);
}, [onFileSelect]);
```

詳細は [`docs/features/file-uploader/<input type="file"> のリセット実装まとめ.md`](../features/file-uploader/<input%20type="file">%20のリセット実装まとめ.md) を参照。

## アクセシビリティ

- `forwardRef`を使用してDOM要素（内部の`<input type="file">`）への参照をサポート
- 内部で使用しているButtonとIconButtonコンポーネントのアクセシビリティ機能を継承
- `isDisabled`状態では、すべてのインタラクションが無効化される
- キーボード操作対応:
  - Enterキーまたはスペースキーでファイル選択ダイアログを開く（Buttonコンポーネント経由）
  - ファイル選択ダイアログ内でのネイティブなキーボード操作をサポート
- スクリーンリーダー対応:
  - ボタンとアイコンボタンに適切なラベルが設定される
  - 選択されたファイル名が読み上げられる

## 注意事項

1. **`size` Propは`button` variantのみ有効**: `dropzone` variantでは`size` Propは無視される
2. **ファイル名の長い表示**: `button` variantでファイルが選択されると、ファイル名がボタン内に表示されるが、長いファイル名は`truncate`クラスで省略される
3. **dropzone variantの制約情報**: dropzone内に表示される「対応形式」と「サイズ」の情報はハードコードされた例示である（`csv, pdf`、`50MB以下`）。実際のバリデーションは`accept`と`maxSize` Propsで制御される
4. **エラーメッセージの表示**: dropzone variantで`isError={true}`の場合、固定のエラーメッセージが表示される。実際のバリデーションエラーは`onError`コールバックで処理する必要がある
5. **単一ファイルのみ対応**: 現在の実装では、1つのファイルのみを選択できる（`multiple`属性は未サポート）
6. **リセット機能**: ファイル選択をリセットするには、Refの`reset`メソッドを使用するか、クリアボタン（×）をクリックする
7. **同じファイルの再選択**: `<input type="file">`の`value`を適切にリセットすることで、同じファイルを連続して選択できる

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存している。カスタマイズする場合は、これらの設定を参照すること。

主要なスタイル要素：

- **ボーダー色**: `uiBorder02`, `hoverInput`, `activeInput`, `supportError`, `disabled01`
- **背景色**: `bg-white`, `bg-disabled02`, `bg-uiBackgroundError`
- **テキスト色**: `text-text01`, `text-text02`, `text-textPlaceholder`, `text-supportDanger`, `text-link01`
- **アイコン色**: `icon01`, `icon03`
- **タイポグラフィ**: `typography-body13regular`, `typography-body12regular`, `typography-label11regular`, `typography-label14regular`

## 更新履歴

| 日付       | 内容     | 担当者 |
| ---------- | -------- | ------ |
| 2025-10-21 | 新規作成 | -      |
