# Toast コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
   - [特殊機能の詳細](#特殊機能の詳細)
   - [継承プロパティ](#継承プロパティ)
5. [状態とスタイル](#状態とスタイル)
   - [ステートごとの表現](#ステートごとの表現)
   - [アニメーション](#アニメーション)
6. [使用例](#使用例)
   - [ToastProvider を使った通知](#toastprovider-を使った通知)
   - [単体表示と幅の調整](#単体表示と幅の調整)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Toastコンポーネントは、画面左下に一定時間表示される軽量な通知メッセージを提供します。成功・警告・エラー・情報の4種類のステート、クローズアクション、任意の幅指定、アニメーション表示を組み合わせてユーザーへ即時フィードバックを伝えられます。

## インポート

```typescript
import { Toast, ToastProvider, useToast } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { Button } from '@zenkigen-inc/component-ui';
import { ToastProvider, useToast } from '@zenkigen-inc/component-ui';

const FormActions = () => {
  const { addToast } = useToast();

  const handleSave = () => {
    addToast({ message: '設定を保存しました', state: 'success' });
  };

  return <Button onClick={handleSave}>保存する</Button>;
};

const App = () => (
  <ToastProvider>
    <FormActions />
  </ToastProvider>
);
```

`ToastProvider`をアプリケーションのルート付近に配置し、`useToast`で通知を追加します。プロバイダー配下で `addToast` が呼ばれると、メッセージが5秒ごとに自動クローズするトーストとして描画されます。

## Props

### 必須プロパティ

| プロパティ      | 型         | 説明                                    |
| --------------- | ---------- | --------------------------------------- |
| `onClickClose`  | `() => void` | ユーザーまたは自動クローズ時に呼ばれるコールバック |

### オプションプロパティ

| プロパティ     | 型                        | デフォルト値     | 説明                                                                 |
| -------------- | ------------------------- | ---------------- | -------------------------------------------------------------------- |
| `state`        | `ToastState` (`'success' \| 'error' \| 'warning' \| 'information'`) | `'information'` | 表示するメッセージの性質。色・アイコン・テキスト色がステートに応じて変化します。 |
| `width`        | `CSSProperties['width']`  | `'auto'`         | トースト全体の幅。数値・文字列のどちらでも指定でき、固定幅にしたい場合に利用します。 |
| `isAutoClose`  | `boolean`                 | `false`          | `true`にすると5秒後に自動でフェードアウトし、終了時に`onClickClose`を呼び出します。 |
| `isAnimation`  | `boolean`                 | `false`          | フェードイン／アウトのアニメーションを有効化します。自動クローズと組み合わせると自然な退場になります。 |
| `children`     | `ReactNode`               | `undefined`      | 本文として表示するメッセージ。テキストを推奨しますが、インライン要素であれば同じ領域に表示できます。 |

### 特殊機能の詳細

#### ToastProvider と useToast

- `ToastProvider` は内部で `createPortal` を用いて `document.body` 直下に通知スタックを描画します。
- `useToast` が返す `addToast` 関数は `{ message: string; state: ToastState }` を受け取り、ユニークなIDでスタックに追加します。
- 追加されたトーストは `isAutoClose` と `isAnimation` が自動で `true` 設定された状態で管理され、`removeToast` が呼ばれると即座に取り除かれます。

#### 自動クローズと手動クローズ

- `isAutoClose` を `true` にすると 5,000ms 後に `handleClose` が走り、アニメーション有効時はフェードアウト完了後に `onClickClose` が発火します。
- 手動で閉じる際は `IconButton` をクリックし `onClickClose` を呼び出してください。

### 継承プロパティ

内部で `div` を返しますが追加のDOM属性は公開していません。必要な機能は上記propsで制御してください。

## 状態とスタイル

### ステートごとの表現

| ステート        | アイコン名             | 代表色クラス                        | 目的                                     |
| --------------- | ---------------------- | ----------------------------------- | ---------------------------------------- |
| `success`       | `success-filled`       | `fill-supportSuccess` / `text-text01` | 操作が完了・成功した際のお知らせ         |
| `error`         | `attention`            | `fill-supportError` / `text-supportError` | エラーや失敗時の警告                     |
| `warning`       | `warning`              | `fill-supportWarning` / `text-text01` | 注意喚起や確認が必要な状態               |
| `information`   | `information-filled`   | `fill-supportInfo` / `text-text01`  | 補足や案内などの中立的情報               |

テキスト部分には `typography-body13regular` が適用され、本文は左揃え・複数行表示に対応しています。

### アニメーション

- `isAnimation` が `true` かつ `isAutoClose` が `true` の場合、`animate-toast-in` → `animate-toast-out` クラスでフェードイン・アウトします。
- アニメーション終了イベントで `opacity: 0` になったタイミングを検知し、確実に `onClickClose` を呼び出します。

## 使用例

### ToastProvider を使った通知

```typescript
const { addToast } = useToast();

const handleError = () => {
  addToast({ message: '通信に失敗しました。再度お試しください。', state: 'error' });
};
```

連続で表示する場合でも、新しいトーストが上に積み上がるよう `flex-col-reverse` レイアウトで配置されます。

### 単体表示と幅の調整

```typescript
<Toast
  state="warning"
  width={475}
  isAnimation
  isAutoClose={false}
  onClickClose={() => console.log('closed')}
>
  最大アップロードサイズを超過しました。別のファイルを選択してください。
</Toast>
```

スタンドアロン表示では`Toast`を直接使用し、必要に応じて`width`や`isAutoClose`を制御します。

## アクセシビリティ

1. クローズボタンは `IconButton` により `button` 要素で提供されます。キーボード操作に対応し、フォーカスリングも適用されます。
2. 複数のトーストが表示されても DOM 順序は表示順と一致し、スクリーンリーダーでも新しいメッセージが最後に追加されます。
3. 自動クローズをキャンセルしたい場合は `isAutoClose={false}` を指定し、利用者が十分に内容を確認できるようにしてください。

## 技術的な詳細

- `CLOSE_TIME_MSEC` は 5,000ms 固定です。必要に応じてプロバイダー側で独自実装を作成することで調整できます。
- `useState` による `isRemoving` フラグを使って、アニメーションの途中で複数回 `onClickClose` が走らないよう保護しています。
- `ToastProvider` はクライアントレンダリング後にのみ `createPortal` を描画し、SSR 環境でも安全に利用できます。

## 注意事項

1. グローバル通知で使用するため `ToastProvider` はアプリ全体で1つにまとめ、ネストしないでください。
2. `window` API を利用しているため、Next.js の `appDir` などでサーバーコンポーネント内から直接レンダリングしないでください。
3. メッセージテキストには改行や長文を避け、1〜2文で完結させると視認性が保たれます。

## スタイルのカスタマイズ

スタイルは `shadow-floatingShadow` や `typography-body13regular` といったデザイントークンに基づきます。色やタイポグラフィを調整したい場合は `@zenkigen-inc/component-config` のトークンを更新し、コンポーネント側のクラスへ反映してください。

## 更新履歴

| 日付                 | 内容                     | 担当者 |
| -------------------- | ------------------------ | ------ |
| 2025-12-03 09:19 JST | 新規作成、初版を追加     | -      |
