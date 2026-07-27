# TimePicker コンポーネント仕様書

## 目次

1. [概要](#概要)
2. [インポート](#インポート)
3. [基本的な使用方法](#基本的な使用方法)
4. [Props](#props)
   - [必須プロパティ](#必須プロパティ)
   - [オプションプロパティ](#オプションプロパティ)
5. [value 型（TimeValue）](#value-型timevalue)
6. [Compound Components](#compound-components)
   - [TimePicker.ErrorMessage](#timepickererrormessage)
7. [ヘルパー関数](#ヘルパー関数)
8. [状態とスタイル](#状態とスタイル)
   - [サイズバリエーション](#サイズバリエーション)
   - [状態に応じたスタイル](#状態に応じたスタイル)
9. [使用例](#使用例)
   - [基本的な使用例](#基本的な使用例)
   - [サイズ指定](#サイズ指定)
   - [分の刻み（minuteStep）](#分の刻みminutestep)
   - [エラー状態](#エラー状態)
   - [無効状態](#無効状態)
   - [時刻範囲制限](#時刻範囲制限)
   - [DatePicker との併用（日時選択）](#datepicker-との併用日時選択)
10. [アクセシビリティ](#アクセシビリティ)
11. [技術的な詳細](#技術的な詳細)
12. [注意事項](#注意事項)
13. [スタイルのカスタマイズ](#スタイルのカスタマイズ)
14. [Q&A](#qa)
15. [更新履歴](#更新履歴)

---

## 概要

TimePickerコンポーネントは、ユーザーが時刻（時・分）を選択するためのUIコンポーネントである。時と分の2つの`Select`と`:`セパレータで構成される薄いコンポジットであり、24時間表記（`00`〜`23`時 / `00`〜`59`分）に対応する。分候補は`minuteStep`で自動生成され、`minTime` / `maxTime`で選択可能な範囲を制限できる。

value型は`{ hour: number | null; minute: number | null }`の構造体であり、時・分の両方が`null`の場合は未入力を表す。時刻はタイムゾーンを持たない「壁時計値」として扱うため、日付を持つ`Date`ではなく構造体で保持する（日時を統合したい場合は利用側で日付と合成する）。

## インポート

```typescript
import { TimePicker } from '@zenkigen-inc/component-ui';
import type { TimePickerProps, TimeValue, MinuteStep } from '@zenkigen-inc/component-ui';
import { formatTime, parseTime } from '@zenkigen-inc/component-ui';
```

## 基本的な使用方法

```typescript
import { useState } from 'react';
import { TimePicker } from '@zenkigen-inc/component-ui';
import type { TimeValue } from '@zenkigen-inc/component-ui';

const MyComponent = () => {
  const [time, setTime] = useState<TimeValue>({ hour: null, minute: null });

  return <TimePicker value={time} onChange={(next) => setTime(next)} />;
};
```

## Props

### 必須プロパティ

| プロパティ | 型                                                                  | 説明                                                  |
| ---------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| `value`    | `{ hour: number \| null; minute: number \| null }`                  | 選択時刻。時・分の両方が`null`の場合は未入力を表す    |
| `onChange` | `(value: { hour: number \| null; minute: number \| null }) => void` | 各Selectの変更ごとに新しい値を返す（pure controlled） |

### オプションプロパティ

| プロパティ   | 型                                            | デフォルト値 | 説明                                                                                                |
| ------------ | --------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| `size`       | `'x-small' \| 'small' \| 'medium' \| 'large'` | `'medium'`   | コンポーネントのサイズ。内部の`Select`のsizeに1:1でマッピングされる                                 |
| `minuteStep` | `1 \| 5 \| 10 \| 15 \| 30`                    | `1`          | 分候補の刻み（すべて60の約数）。既定は全時刻を選べる`1`。予約枠など粗い刻みにしたい場合のみ明示する |
| `minTime`    | `string`（`"HH:mm"`）                         | `undefined`  | 選択可能な最小時刻（inclusive）。範囲外の候補は非表示になる                                         |
| `maxTime`    | `string`（`"HH:mm"`）                         | `undefined`  | 選択可能な最大時刻（inclusive）。範囲外の候補は非表示になる                                         |
| `isDisabled` | `boolean`                                     | `false`      | 無効状態かどうか                                                                                    |
| `isError`    | `boolean`                                     | `false`      | エラー状態かどうか。`true`の場合、両方のSelectがエラー表示になる                                    |
| `children`   | `ReactNode`                                   | `undefined`  | Compound Component（`TimePicker.ErrorMessage`）                                                     |

### 内部固定値（props では変更不可）

以下は公開 props ではなく内部で固定されている。

| 項目                     | 固定値  | 説明                                                                                                                                               |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 時・分のプレースホルダー | `'--'`  | 未選択時に時・分の両 Select に表示するテキスト                                                                                                     |
| 時 Select の`aria-label` | `'時'`  | 時 Select のトリガーボタンに付与。選択済みの場合は選択値を加えた`'時 09'`のような文字列になる                                                      |
| 分 Select の`aria-label` | `'分'`  | 分 Select のトリガーボタンに付与。選択済みの場合は選択値を加えた`'分 30'`のような文字列になる                                                      |
| 時候補の刻み             | `1`     | 時候補は`00`〜`23`の全24時（範囲制限による除外を除く）。刻みの変更ニーズが出た時点で props 公開を検討                                              |
| 各 Select の幅           | `80px`  | sizeに応じた固定幅（`large`のみ`88px`。Figma 実測値）。全体幅のカスタマイズニーズが出た時点で props 公開を検討                                     |
| 候補リストの最大高さ     | `250px` | 時・分の両 Select に常時適用。時 Select（24 候補）が大きく出過ぎるのを防ぐ。項目の途中で切れる高さにして、下にリストが続いていることを視覚的に示す |

## value 型（TimeValue）

```typescript
type TimeValue = {
  hour: number | null; // 0〜23。未選択は null
  minute: number | null; // 0〜59。未選択は null
};
```

- 時・分は独立に選択できるため「時だけ選択・分は未選択」という中間状態（partial）が発生する。TimePickerはこの状態を隠れstateではなく`value`に露出する **pure controlled** として扱う。
- 表示は`value`から純導出される（隠れstateを持たない）。各Selectの変更ごとに`onChange`へ新しい`{ hour, minute }`を返す（例: 時だけ選ぶと`{ hour: 9, minute: null }`）。
- 親がフォームリセットで`{ hour: null, minute: null }`を渡せば、中間状態を含めて確実にクリアできる。
- `00`へのフォールバックは行わない。未選択は必ず`null`で表現される。

## Compound Components

### TimePicker.ErrorMessage

エラーメッセージを表示するためのサブコンポーネントである。`isError={true}` の場合にのみレンダリングされる。

#### Props

| プロパティ  | 型       | デフォルト値  | 説明                           |
| ----------- | -------- | ------------- | ------------------------------ |
| `aria-live` | `string` | `'assertive'` | スクリーンリーダーへの通知設定 |
| `id`        | `string` | 自動生成      | 要素のID（aria-describedby用） |

その他の `HTMLAttributes<HTMLDivElement>` プロパティが使用可能である（`className` を除く）。

#### 使用例

```typescript
<TimePicker value={time} onChange={setTime} isError>
  <TimePicker.ErrorMessage>時刻を選択してください</TimePicker.ErrorMessage>
</TimePicker>
```

`TimePicker.ErrorMessage`に付与された`id`は、時・分の両方のSelectトリガーボタンの`aria-describedby`へ配線される。同時に`aria-invalid="true"`が両トリガーボタンへ付与される。

`TimePicker.ErrorMessage`は複数指定でき、直下に置く場合のほか、配列やネストしたFragment経由でも`aria-describedby`へ配線される。ただし`<div>`など**Fragment以外の要素・コンポーネントで包むと配線されない**（表示はされるが`id`が付与されない）。direct childかFragment直下に置くこと。

## ヘルパー関数

利用側での保存・日時統合を補助するため、以下のヘルパーを提供する。

| 関数         | シグネチャ                                   | 説明                                                          |
| ------------ | -------------------------------------------- | ------------------------------------------------------------- |
| `formatTime` | `(value: TimeValue) => string \| null`       | 時・分が揃っている場合のみ`"HH:mm"`を返す（片方nullならnull） |
| `parseTime`  | `(time: string) => { hour, minute } \| null` | `"HH:mm"`を`{ hour, minute }`へ変換（不正・範囲外はnull）     |

```typescript
formatTime({ hour: 9, minute: 30 }); // → '09:30'
formatTime({ hour: 9, minute: null }); // → null
parseTime('09:30'); // → { hour: 9, minute: 30 }
```

## 状態とスタイル

### サイズバリエーション

| サイズ    | Selectの高さ | セパレータのタイポグラフィ  | ErrorMessageのタイポグラフィ |
| --------- | ------------ | --------------------------- | ---------------------------- |
| `x-small` | 24px         | `typography-label12regular` | `typography-label11regular`  |
| `small`   | 24px         | `typography-label14regular` | `typography-label11regular`  |
| `medium`  | 32px         | `typography-label14regular` | `typography-label11regular`  |
| `large`   | 40px         | `typography-label16regular` | `typography-label12regular`  |

- サイズは内部の`Select`のsizeへ1:1でマッピングされる。
- `:`セパレータは`text-text02`（グレー）で表示され、タイポグラフィのみsizeに連動する。

### 状態に応じたスタイル

#### 通常状態

- 両Selectが`outline`バリアントで表示される。
- 未選択の時・分はプレースホルダー（既定`--`）を表示する。

#### エラー状態（`isError: true`）

- 両方のSelectがエラー表示（枠・プレースホルダー・アイコンが`supportError`）になる。
- `:`セパレータは**色を変えずグレー（`text-text02`）のまま**である。
- 両トリガーボタンへ`aria-invalid="true"`が付与される。
- `TimePicker.ErrorMessage`が指定されている場合、その`id`が両トリガーボタンの`aria-describedby`へ配線される。

#### 無効状態（`isDisabled: true`）

- 両Selectが無効化され、候補リストは開かない。

## 使用例

### 基本的な使用例

```typescript
const [time, setTime] = useState<TimeValue>({ hour: null, minute: null });

<TimePicker value={time} onChange={(next) => setTime(next)} />
```

### サイズ指定

```typescript
<div className="flex flex-col gap-4">
  <TimePicker value={time} onChange={setTime} size="x-small" />
  <TimePicker value={time} onChange={setTime} size="small" />
  <TimePicker value={time} onChange={setTime} size="medium" />
  <TimePicker value={time} onChange={setTime} size="large" />
</div>
```

### 分の刻み（minuteStep）

```typescript
// 30分刻み（00, 30）
<TimePicker value={time} onChange={setTime} minuteStep={30} />

// 1分刻み（00〜59の60件）。候補リストの最大高さは 250px 固定のためスクロール表示になる
<TimePicker value={time} onChange={setTime} minuteStep={1} />
```

`minuteStep`は`1 | 5 | 10 | 15 | 30`（すべて60の約数）のunion型であり、型レベルで不正な刻み（`7`や`25`など）を弾く。

### エラー状態

```typescript
<TimePicker value={time} onChange={setTime} isError>
  <TimePicker.ErrorMessage>時刻を選択してください</TimePicker.ErrorMessage>
</TimePicker>
```

### 無効状態

```typescript
<TimePicker value={time} onChange={setTime} isDisabled />
```

### 時刻範囲制限

```typescript
// 9:00〜17:30 の範囲に制限（範囲外の候補は非表示になる）
<TimePicker value={time} onChange={setTime} minTime="09:00" maxTime="17:30" />
```

### DatePicker との併用（日時選択）

TimePickerは時刻単体（`{ hour, minute }`）を返す。日時を統合したい場合は、利用側で日付と時刻を合成して`Date`を組み立てる。

```typescript
const [date, setDate] = useState<Date | null>(null);
const [time, setTime] = useState<TimeValue>({ hour: null, minute: null });

const combined =
  date != null && time.hour != null && time.minute != null
    ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hour, time.minute)
    : null;

<div className="flex items-start gap-4">
  <DatePicker value={date} onChange={setDate} />
  <TimePicker value={time} onChange={setTime} />
</div>
```

## アクセシビリティ

- 時・分のトリガーボタンはそれぞれ標準的な`<button>`要素として実装されている。
- 各トリガーボタンには`aria-label`が付与される。未選択時は「時」「分」、選択済みの場合は選択値を含む「時 09」「分 30」となり、**現在の選択値がスクリーンリーダーで読み上げられる**。
  - `aria-label`はトリガー内の可視テキストを上書きするため、値を含めない固定ラベルにすると現在値も変更結果もSRから確認できなくなる。これを避けるための仕様である。
  - アクセシブルネームには可視テキスト（ゼロ埋めした`09`・`30`）をそのまま含めており、WCAG 2.5.3（Label in Name）を満たす。
- エラー状態では両トリガーボタンへ`aria-invalid="true"`が設定される（`Select`が`isError`から内部導出する）。
- `TimePicker.ErrorMessage`は`aria-describedby`で両トリガーボタンとリンクされる。
- `TimePicker.ErrorMessage`には`aria-live="assertive"`がデフォルトで設定される。
- キーボード操作・フォーカスリング・外部クリックによる候補リストの開閉は、内部の`Select`の挙動を継承する。
- **既知の制約（文脈ラベル）**: `aria-label`は内部固定であり、「開始時刻の時」「終了時刻の分」のような文脈を親から与えることはできない。同一画面に複数のTimePickerを置く場合は、利用側で見出しやグループのラベルによって文脈を補うこと。上書き用のprops公開は要望が出た時点で加算的に検討する。
- **既知の制約（ErrorMessageのラッパー）**: `TimePicker.ErrorMessage`を`<div>`などFragment以外の要素で包むと`aria-describedby`が配線されない。direct childかFragment直下に置くこと。

## 技術的な詳細

- v1は`Select` × 2（時・分）＋`:`セパレータの薄いコンポジットである（独自の入力パネルやclock UIは持たない）。
- 表示は`value`から純導出され、隠れstateを持たない（pure controlled）。
- 時候補は`00`〜`23`の全24時を生成する（刻みは1で内部固定）。分候補は`minuteStep`（既定1）で生成する。
- 候補リストの最大高さは`250px`で内部固定し、時・分の両 Select に常時適用する（時 Select の 24 候補が大きく出過ぎるのを防ぐ）。候補 8 件分（264px）ちょうどにすると項目の切れ目と一致し下にリストが続いていることがわかりにくいため、あえて項目の途中で切れる高さにしている。`minuteStep=1`（60 候補）の場合もスクロール表示になる。
- `minTime` / `maxTime`の範囲外の候補は、生成リストから除外（非表示）する。現行の`Select`はdisabledオプションに非対応のため、無効表示ではなく非表示とする。
- 時候補は、その時に対して選択可能な分が 1 件も無い場合も除外する。これにより、`minTime`の分が`minuteStep`で到達できない場合（例: `minTime="09:45"`, `minuteStep=30`では 9 時の分候補`00`/`30`がいずれも 09:45 未満）に、選んでも分候補が空になるデッドエンドの時が候補へ現れることを防ぐ。
- **時が未選択のときの分候補**は「いずれかの選択可能な時と組み合わせれば範囲内になる分」に限定する（＝各時の分候補の和集合）。例えば`minTime="09:45"` / `maxTime="10:15"` / `minuteStep=15`では`45`（9時）と`00`・`15`（10時）のみが候補となり、どの時とも組み合わせられない`30`は現れない。これにより、分を先に選んでから時を選ぶ順序でも範囲外の時刻に到達しない。
- **時を変更したときに選択済みの分が新しい時では範囲外になる場合**、その分は未選択（`null`）へ戻す（範囲内であればそのまま維持する）。値を別の有効値へ丸めるのではなく「選べない組み合わせを未選択に戻す」だけであるため、隠れstateを持たないpure controlledの原則は保たれる。
- 時・分の`aria-label`とエラーメッセージの`aria-describedby`配線は、`Select`のトリガー`aria-label` / `aria-describedby`のpass-through経由で行う。`aria-invalid`は`Select`が`isError`から内部導出する。
- `TimePicker.ErrorMessage`の`id`収集は、Fragmentを保持したまま子を再帰的に走査して行う。Fragmentごと平坦化するとキーが重複しReactが警告を出すため、構造を保ったまま`id`のみを付与している。
- 候補リストは`z-popover`で`FloatingPortal`表示されるため、Modal内で使用しても破綻しない。

## 注意事項

1. **状態管理前提**: `Select`と同じく、ネイティブ`<select>`を使わないカスタム実装であり、`<form>`の`FormData`自動収集・ネイティブリセットには追従しない。利用側でstate管理（React Hook Form / TanStack Form等）を行うこと。
2. **未選択の表現**: 未選択は必ず`null`で表現され、`00`へフォールバックしない。完成時刻の取り出しは`formatTime(value)`（両方揃った時のみ`"HH:mm"`）で行う。
3. **partial（片方のみ選択）**: 時だけ・分だけ選択した中間状態も`value`に反映される。親のフォームリセットで`{ hour: null, minute: null }`を渡せばクリアできる。
4. **範囲制限のinclusive**: `minTime` / `maxTime`はそれぞれの時刻を含む（inclusive）。
5. **候補にない任意時刻の直接入力は不可**: v1は候補固定であり、テキストによる任意時刻の直接入力には対応しない。
6. **日時統合品は提供しない**: DateTimePickerのような統合コンポーネントは提供しない。日時が必要な場合は`DatePicker + TimePicker`を利用側で合成する。
7. **時・分は個別にクリアできる**: 選択済みの Select の候補リストには`Select`標準の「選択解除」が表示され、押すとそのフィールドだけが未選択（`null`）へ戻る（例: `{ hour: 9, minute: 30 }`で時を選択解除すると`{ hour: null, minute: 30 }`）。親が`value`に`{ hour: null, minute: null }`を渡す一括クリアも従来どおり可能である。
8. **外部から渡された範囲外・step非整合なvalueは強制補正しない**: `minTime` / `maxTime`の範囲外や`minuteStep`に整合しない`value`を親から渡した場合、その値はトリガーに表示されるが候補リストには現れない。コンポーネントは渡された`value`を別の有効値へ丸めないため、初期値の整合は利用側で担保する。
   - ただし**UI操作によって範囲外の時刻が生成されることはない**。時を変更して選択済みの分が範囲外になる場合はその分を`null`へ戻し、時が未選択のときの分候補も選択可能な組み合わせに限定している（「技術的な詳細」参照）。

## スタイルのカスタマイズ

このコンポーネントは Tailwind CSS のユーティリティクラスを使用しており、`@zenkigen-inc/component-config`で定義されたデザイントークンに依存している。状態色（hover / active / disabled / error）は内部の`Select`に委譲され、`:`セパレータは`text-text02`で表示される。スタイルのカスタマイズは`className`ではなく、`size`等のpropsで行う。

## Q&A

### Q: value はなぜ `Date` や `"HH:mm"` 文字列ではなく `{ hour, minute }` 構造体？

A: 時刻単体はタイムゾーンを持たない「壁時計値」であり、`Date`では日付部とタイムゾーンが過剰になる。`"HH:mm"`文字列では「時だけ選択済み」の中間状態を表現できず、隠れstateが必要になってpure controlledが崩れる。構造体なら未入力・中間状態・完成をすべて`value`だけで表現できる。保存時は`formatTime(value)`で`"HH:mm"`へ変換する。

### Q: `minTime` / `maxTime` はなぜ value と同じ構造体ではなく `"HH:mm"` 文字列？

A: 境界は「完全な時刻」のみが意味を持ち、未選択`null`を含む`TimeValue`とは意味が異なるため（揃えるなら`null`を許さない別の型を新設することになる）。文字列はリテラルで簡潔に書け（`minTime="09:00"`）、ネイティブ`<input type="time">`の`min` / `max`属性と同形式のため、設定値や既存実装の値をそのまま渡せる。

### Q: props 名はなぜ HTML 標準の `min` / `max` ではなく `minTime` / `maxTime`？

A: DatePickerの`minDate` / `maxDate`との対称性を優先した。エコシステムでも命名は割れており（mantineは`min` / `max`、MUI x-date-pickersは`minTime` / `maxTime`）、HTML標準との親和性は値の形式（`"HH:mm"`）で確保している。

### Q: 既定の `minuteStep` はなぜ `1`（分刻み）？

A: 既定で全時刻を選べるようにするため。予約枠・会議スロットなど粗い刻みで十分な場面では`minuteStep={15}`のように指定する。候補が 60 件になる場合もリストは`optionListMaxHeight=250px`（内部固定）でスクロール表示される。

### Q: 不正な形式の `minTime` / `maxTime`（例: `"25:00"`、`"9-30"`）を渡すとどうなる？

A: 解釈できない値はその側の制限が適用されない（無視される）。エラーはthrowしない。

### Q: 深夜をまたぐ範囲（`minTime` > `maxTime`）は指定できる？

A: できない。`minTime` > `maxTime`の場合は全候補が範囲外となり、時・分いずれの候補リストも（時が未選択の状態でも）空になる。ネイティブ`<input type="time">`は`min` > `max`を反転レンジ（例: `22:00`〜`04:00`の深夜ラップ）として解釈するが、v1では非対応。必要になった時点での拡張課題とする。

### Q: 範囲外の候補はなぜグレーアウト（無効表示）ではなく非表示？

A: 現行の`Select`がdisabledオプションに対応していないため。将来`Select`が拡張された場合、無効表示へ変更する余地がある。

### Q: 秒（`"HH:mm:ss"`）には対応している？

A: v1では非対応。ただし`TimeValue`への`second`のoptional追加、`minTime` / `maxTime`の`"HH:mm:ss"`受理（HTMLのvalid time stringの上位互換）、`secondStep`の追加により、公開APIを壊さずに拡張できる設計になっている。

### Q: 日付と時刻をまとめて選びたい（DateTimePicker）場合は？

A: 統合コンポーネントは提供しない方針。`DatePicker`と`TimePicker`を並べて利用側で合成する。

```tsx
<DatePicker value={date} onChange={setDate} />
<TimePicker value={time} onChange={setTime} />
// 保存時: date と formatTime(time) を組み合わせて日時を構成する
```

## 更新履歴

| 日付                 | 内容     | 担当者 |
| -------------------- | -------- | ------ |
| 2026-07-13 14:07 JST | 新規作成 | -      |
