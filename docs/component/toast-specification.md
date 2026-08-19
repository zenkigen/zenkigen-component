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
   - [レイアウト](#レイアウト)
   - [アニメーション](#アニメーション)
6. [使用例](#使用例)
   - [ToastProvider を使った通知](#toastprovider-を使った通知)
   - [説明文を添える](#説明文を添える)
   - [閉じるボタンを表示する](#閉じるボタンを表示する)
   - [単体表示と幅の調整](#単体表示と幅の調整)
7. [アクセシビリティ](#アクセシビリティ)
8. [技術的な詳細](#技術的な詳細)
9. [注意事項](#注意事項)
10. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
11. [更新履歴](#更新履歴)

---

## 概要

Toastコンポーネントは、画面左下に一定時間表示される軽量な通知メッセージを提供します。成功・警告・エラー・情報の4種類のステート、任意の説明文、クローズアクション、任意の幅指定、アニメーション表示を組み合わせてユーザーへ即時フィードバックを伝えられます。カードは枠線（`border-uiBorder01`）と角丸（`rounded`）を持ち、`shadow-floatingShadow` で浮遊感を表現します。

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

`ToastProvider`をアプリケーションのルート付近に配置し、`useToast`で通知を追加します。プロバイダー配下で `addToast` が呼ばれると、メッセージが5秒後に自動クローズするトーストとして描画されます。

## Props

### 必須プロパティ

| プロパティ     | 型           | 説明                                                                                                                                   |
| -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `onClickClose` | `() => void` | 閉じるボタン押下時**および**自動クローズ完了時に呼ばれる、トースト終了の通知コールバック。閉じるボタンの表示有無にかかわらず必須です。 |

### オプションプロパティ

| プロパティ       | 型                                                                  | デフォルト値    | 説明                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`          | `ToastState` (`'success' \| 'error' \| 'warning' \| 'information'`) | `'information'` | 表示するメッセージの性質。アイコンとタイトルの文字色がステートに応じて変化します。                                                                               |
| `width`          | `CSSProperties['width']`                                            | `'auto'`        | トースト全体の幅。数値・文字列のどちらでも指定でき、固定幅にしたい場合に利用します。                                                                             |
| `isAutoClose`    | `boolean`                                                           | `false`         | `true`にすると5秒後に自動で閉じ、`onClickClose`を呼び出します。`false`にすると自動では閉じません。`ToastProvider` 経由のトーストには既定で `true` が渡されます。 |
| `isAnimation`    | `boolean`                                                           | `false`         | フェードイン／アウトのアニメーションを有効化します。自動クローズと組み合わせると自然な退場になります。                                                           |
| `hasCloseButton` | `boolean`                                                           | `false`         | `true`にすると閉じるボタンを表示します。`isAutoClose`が`false`のときは、この指定にかかわらず必ず表示されます（後述の安全弁）。                                   |
| `description`    | `ReactNode`                                                         | `undefined`     | タイトルの下に表示する補足テキスト。省略した場合・空文字の場合は説明文の要素自体が描画されません。                                                               |
| `children`       | `ReactNode`                                                         | `undefined`     | タイトルとして表示する本文。テキストを推奨しますが、インライン要素であれば同じ領域に表示できます。                                                               |

### 特殊機能の詳細

#### ToastProvider と useToast

- `ToastProvider` は内部で `createPortal` を用いて `document.body` 直下に通知スタックを描画します。
- `ToastProvider` は `hasCloseButton?: boolean`（既定 `false`）を受け取ります。配下で追加されるすべてのトーストの、閉じるボタン表示の既定値になります。
- `useToast` が返す `addToast` 関数は次の引数を受け取り、単調増加カウンタによるユニークなIDでスタックに追加します（乱数だと衝突時に `key` の重複と `removeToast` での一括削除が起こるため）。

  | キー             | 型           | 既定値                 | 説明                               |
  | ---------------- | ------------ | ---------------------- | ---------------------------------- |
  | `message`        | `string`     | （必須）               | タイトルとして表示する本文         |
  | `state`          | `ToastState` | （必須）               | 表示ステート                       |
  | `description`    | `ReactNode`  | `undefined`            | タイトルの下に表示する補足テキスト |
  | `hasCloseButton` | `boolean`    | `ToastProvider` の設定 | 閉じるボタンを表示するかどうか     |
  | `isAutoClose`    | `boolean`    | `true`                 | 5秒後に自動で閉じるかどうか        |

- 既存の `addToast({ message, state })` はそのまま動作します（追加されたキーはすべて任意）。
- 追加されたトーストは `isAnimation` が `true`、幅 `475px` で管理され、`removeToast` が呼ばれると取り除かれます。

#### 閉じるボタン表示の優先順位

`addToast` の指定が `ToastProvider` の指定より優先されます。どちらも未指定の場合は非表示です。

```
addToast の hasCloseButton ?? ToastProvider の hasCloseButton ?? false
```

`undefined`（未指定＝上位に委譲）と `false`（明示的な非表示）は区別されるため、`<ToastProvider hasCloseButton>` の配下でも `addToast({ ..., hasCloseButton: false })` で個別に非表示にできます。

#### 自動クローズと手動クローズ

- `isAutoClose` が `true` のとき、5,000ms 後に自動クローズが走ります。素の `Toast` の既定は `false` ですが、`ToastProvider` 経由のトーストには既定で `true` が渡されます。`isAnimation` が `true` の場合はフェードアウト完了後に、`false` の場合は即座に `onClickClose` が発火します。
- 手動で閉じる場合は閉じるボタン（`IconButton`）をクリックします。こちらも同じ経路で `onClickClose` を呼び出します。
- **安全弁**: `isAutoClose` が `false` のときは、`hasCloseButton` の指定にかかわらず閉じるボタンを必ず表示します。「自動でも手動でも消せないトースト」が生まれることを防ぐためです。

### 継承プロパティ

内部で `div` を返しますが追加のDOM属性は公開していません。必要な機能は上記propsで制御してください。

## 状態とスタイル

### ステートごとの表現

| ステート      | アイコン名           | 代表色クラス                              | 目的                             |
| ------------- | -------------------- | ----------------------------------------- | -------------------------------- |
| `success`     | `success-filled`     | `fill-supportSuccess` / `text-text01`     | 操作が完了・成功した際のお知らせ |
| `error`       | `attention`          | `fill-supportError` / `text-supportError` | エラーや失敗時の警告             |
| `warning`     | `warning`            | `fill-supportWarning` / `text-text01`     | 注意喚起や確認が必要な状態       |
| `information` | `information-filled` | `fill-supportInfo` / `text-text01`        | 補足や案内などの中立的情報       |

タイトルには `typography-body13regular` が適用されます。説明文（`description`）は `typography-label12regular` / `text-text01` で、**`error` ステートでも文字色は変わりません**（赤くなるのはタイトルのみ）。どちらも `break-words` により、長いURL等でもカード内に収まります。

### レイアウト

| 部位                        | 指定                                                                                                                                                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| カード                      | `border border-solid border-uiBorder01` / `rounded`（4px） / `bg-uiBackground01` / `shadow-floatingShadow` / `p-4`（16px）                                                                                                                                                |
| カード内の配置              | `items-center`（本文ブロックと閉じるボタンを縦中央で揃える）                                                                                                                                                                                                              |
| 本文ブロック ↔ 閉じるボタン | `gap-3`（12px）                                                                                                                                                                                                                                                           |
| アイコン ↔ テキスト         | `gap-1`（4px）・アイコンは上端揃え                                                                                                                                                                                                                                        |
| タイトル ↔ 説明文           | `gap-2`（8px）                                                                                                                                                                                                                                                            |
| テキストブロックの余白      | `pt-[3px]`（上3px）。アイコン（24px）と 1 行分の高さ（約20px）の差 2px に、文字の実描画位置が行ボックスの中央より約 0.8px 上に来る分の補正 1px を足した値で、1 行目の文字とアイコンの光学的な中心を揃える。下側には余白を入れず、1 行時の高さをアイコン基準（58px）に保つ |
| トースト同士の間隔          | `gap-4`（16px、`ToastProvider` のスタック）                                                                                                                                                                                                                               |

### アニメーション

- `isAnimation` が `true` かつ自動クローズまたは閉じるボタン押下が発生した場合、`animate-toast-in` → `animate-toast-out` クラスでフェードイン・アウトします。
- アニメーション終了イベントで `opacity: 0` になったタイミングを検知し、確実に `onClickClose` を呼び出します。
- `isAnimation` が `false` の場合はアニメーションを挟まず、直接 `onClickClose` を呼び出します。

## 使用例

### ToastProvider を使った通知

```typescript
const { addToast } = useToast();

const handleError = () => {
  addToast({ message: '通信に失敗しました。再度お試しください。', state: 'error' });
};
```

連続で表示する場合でも、新しいトーストが上に積み上がるよう `flex-col-reverse` レイアウトで配置されます。

### 説明文を添える

```typescript
addToast({
  message: 'アップロードに失敗しました',
  state: 'error',
  description: 'ファイルサイズを確認して、もう一度お試しください',
});
```

### 閉じるボタンを表示する

```typescript
// このトーストだけ表示する
addToast({ message: '設定を保存しました', state: 'success', hasCloseButton: true });

// アプリ全体の既定値として表示する
const App = () => (
  <ToastProvider hasCloseButton>
    <FormActions />
  </ToastProvider>
);

// 長く読ませたい通知（自動では閉じない。閉じるボタンは自動的に表示される）
addToast({ message: 'バックアップを実行しています', state: 'information', isAutoClose: false });
```

### 単体表示と幅の調整

```typescript
<Toast
  state="warning"
  width={475}
  isAnimation
  isAutoClose={false}
  onClickClose={handleClose}
>
  最大アップロードサイズを超過しました。別のファイルを選択してください。
</Toast>
```

スタンドアロン表示では`Toast`を直接使用し、必要に応じて`width`や`isAutoClose`を制御します。

## アクセシビリティ

1. `ToastProvider` のポータルコンテナは `role="region"` / `aria-label="通知"` のランドマークです。live region はトーストごとのラッパー要素に置いており、`error` は `role="alert"`（assertive 相当）で即時に、それ以外は `role="status"`（polite 相当）で読み上げられます。`status` / `alert` は要素の挿入と同時に内容が告知されるロールのため、politeness の異なる通知を 1 つの視覚スタックに時系列のまま混在できます（主要 UI ライブラリと同じ方式）。**`Toast` を単体で使う場合は、利用側で live region を用意してください。**
2. 閉じるボタンには `aria-label="閉じる"` が付与されています。`IconButton` により `button` 要素で提供されるため、キーボード操作とフォーカスリングにも対応します。
3. 複数のトーストが表示されても DOM 順序は表示順と一致し、スクリーンリーダーでも新しいメッセージが最後に追加されます。
4. `ToastProvider` 経由のトーストで閉じるボタンを既定で非表示にしているのは、トーストが5秒で自動的に消えるため「早く消す」ためだけのボタンになるからです。手動で閉じさせたい場合のみ `hasCloseButton` を指定してください。
5. **時間制限の調整（WCAG 2.2 SC 2.2.1 Timing Adjustable）**: ユーザーに十分な閲覧時間を与えたい通知では、`isAutoClose={false}`（`ToastProvider` 経由なら `addToast({ ..., isAutoClose: false })`）を指定してください。このとき安全弁により閉じるボタンが自動的に表示されるため、「自動でも手動でも消せない」状態にはなりません。なお、同じ情報を別の経路（画面上の恒久的な表示など）で確認できる場合は、自動クローズのままで問題ありません。

## 技術的な詳細

- `CLOSE_TIME_MSEC` は 5,000ms 固定です。必要に応じてプロバイダー側で独自実装を作成することで調整できます。
- 自動クローズのタイマーは `isAutoClose` が `true` のときのみ登録され、発火時に `isAnimation` の有無で分岐します（`true` ならフェードアウト開始、`false` なら `onClickClose` を直接呼び出し）。
- タイマーからは ref に保持した最新の `onClickClose` を呼び出します。`ToastProvider` が `onClickClose` にインライン関数を渡すため、依存配列に直接入れるとレンダーのたびにタイマーがリセットされ、永久に閉じなくなるためです。
- フェードアウト開始後は `REMOVAL_FALLBACK_MSEC`（1,000ms）のフォールバックタイマーを張り、`animationend` が発火しない環境（グローバル CSS でのアニメーション無効化・非表示ツリー配下等）でも、不可視のトーストが DOM に残り続けないよう確実に `onClickClose` を呼び出します。
- トースト終了の通知（`onClickClose`）は ref のフラグで 1 トーストにつき 1 回に制限しており、`animationend` とフォールバックタイマーの両方が動いても二重に発火しません。子孫要素からバブリングした `animationend` も無視します。
- `ToastProvider` はクライアントレンダリング後にのみ `createPortal` を描画し、SSR 環境でも安全に利用できます。

## 注意事項

1. グローバル通知で使用するため `ToastProvider` はアプリ全体で1つにまとめ、ネストしないでください。
2. `window` API を利用しているため、Next.js の `appDir` などでサーバーコンポーネント内から直接レンダリングしないでください。
3. メッセージテキストには改行や長文を避け、1〜2文で完結させると視認性が保たれます。補足が必要な場合は `description` を使ってください。
4. `hasCloseButton={false}` は `isAutoClose` が `true` のときのみ効果があります（安全弁のため）。

## スタイルのカスタマイズ

スタイルは `border-uiBorder01`、`bg-uiBackground01`、`shadow-floatingShadow`、`typography-body13regular` といったデザイントークンに基づきます。色やタイポグラフィを調整したい場合は `@zenkigen-inc/component-config` のトークンを更新し、コンポーネント側のクラスへ反映してください。

## 更新履歴

| 日付                 | 内容                                                                                                                                                                                                                                                                                   | 担当者 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 2025-12-03 09:19 JST | 新規作成、初版を追加                                                                                                                                                                                                                                                                   | -      |
| 2026-07-29 14:03 JST | 閉じるボタンの表示制御（`hasCloseButton`）と説明文（`description`）を追加。`isAutoClose` の既定値を `true` に変更し、自動クローズの不具合を修正。Figma に合わせて枠線・角丸・余白を更新。live region と閉じるボタンのラベルを追加                                                      | -      |
| 2026-08-18 15:59 JST | コードレビューを受け、素の `Toast` の `isAutoClose` 既定を `false` に戻す（後方互換のための据え置き。「自動クローズ・閉じるボタンなし」の既定は `ToastProvider` の明示指定で実現）                                                                                                     | -      |
| 2026-08-18 16:16 JST | `animationend` が発火しない環境向けのフォールバックタイマーと終了通知の 1 回制限を追加。live region をトーストごとの `role="status"` / `role="alert"`（error）ラッパーに変更し、コンテナは `role="region"` に。トースト ID を単調増加カウンタに変更。空文字の `description` を非描画に | -      |
