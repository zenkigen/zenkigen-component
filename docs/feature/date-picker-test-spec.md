# DatePicker テスト項目書

DatePicker のテスト観点と項目を整理する。設計の詳細は [設計書](./date-picker-design.md) を参照する。

## 1. 対象範囲

- `DatePicker` 本体
- `DatePicker.ErrorMessage`

## 2. 前提

- `timeZone` は `UTC` / `Asia/Tokyo` のみをサポートする
- `min` / `max` は日付単位で inclusive（`min <= value <= max`）判定
- 日付選択後、または「クリア」実行後に Popover を閉じる
- 「今日に戻る」は月表示のみを戻し、日付選択は行わない

## 3. 単体テスト項目（Vitest）

### 3.1 表示・状態

| ID | 観点 | 操作/条件 | 期待結果 |
| --- | --- | --- | --- |
| UT-01 | 初期表示 | `value=null` で表示 | プレースホルダー「日付を選択」を表示 |
| UT-02 | 選択表示 | `value` を指定して表示 | `yyyy年MM月dd日` 形式で表示 |
| UT-03 | サイズ | `size` を切替 | Button の size が反映される |
| UT-04 | disabled | `isDisabled=true` | トリガーが無効、Popover が開かない |
| UT-05 | error | `isError=true` | Button が `outlineDanger`、`aria-invalid=true` |

### 3.2 Popover / Calendar

| ID | 観点 | 操作/条件 | 期待結果 |
| --- | --- | --- | --- |
| UT-06 | 開閉 | トリガークリック | Popover が開閉する |
| UT-07 | 外側クリック | Popover 外をクリック | Popover が閉じる |
| UT-08 | Escape | Escape キー | Popover が閉じる |
| UT-09 | 日付選択 | 日付セルをクリック | `onChange` が選択日で呼ばれ、Popover が閉じる |
| UT-10 | クリア | フッター「クリア」クリック | `onChange(null)` が呼ばれ、Popover が閉じる |
| UT-11 | 今日に戻る | フッター「今日に戻る」クリック | 月表示が当月に戻る（選択は変更しない） |

### 3.3 カレンダー表示パターン

| ID | 観点 | 操作/条件 | 期待結果 |
| --- | --- | --- | --- |
| UT-21 | 曜日表示 | Popover を開く | 曜日が `ja` 表記、日曜始まりで表示される |
| UT-22 | 月切替 | 前月/次月ボタンをクリック | 表示月が切り替わる |
| UT-23 | 前後月の日付 | 当月外の日付が表示される場合 | 無効表示で選択不可 |
| UT-24 | 本日表示 | Popover を開く | ローカルタイム基準の本日セルが規定スタイルで表示される |
| UT-25 | 選択日表示 | 日付を選択 | 選択日セルが規定スタイルで表示される |
| UT-26 | 無効日表示 | `min`/`max` で範囲外 | 範囲外日付が無効表示で選択不可 |

### 3.4 日付制約

| ID | 観点 | 操作/条件 | 期待結果 |
| --- | --- | --- | --- |
| UT-12 | min | `min` より前の日付 | 無効表示で選択不可 |
| UT-13 | max | `max` より後の日付 | 無効表示で選択不可 |
| UT-14 | inclusive | `min` / `max` と同日 | 選択可能 |

### 3.5 timeZone

| ID | 観点 | 操作/条件 | 期待結果 |
| --- | --- | --- | --- |
| UT-15 | UTC 表示 | `timeZone='UTC'` | 選択日が UTC 基準で `yyyy年MM月dd日` 表示 |
| UT-16 | JST 表示 | `timeZone='Asia/Tokyo'` | 選択日が JST 基準で `yyyy年MM月dd日` 表示 |
| UT-17 | 変換 | `timeZone` 切替 | `onChange` が当該タイムゾーンの 00:00 を表す `Date` を返す |

### 3.6 アクセシビリティ

| ID | 観点 | 操作/条件 | 期待結果 |
| --- | --- | --- | --- |
| UT-18 | aria-describedby | `DatePicker.ErrorMessage` を渡す | `aria-describedby` が自動で付与される |
| UT-19 | フォーカス | Popover を開く | 選択日（未選択ならローカルタイム基準の今日）にフォーカス |
| UT-20 | フォーカス復帰 | Popover を閉じる | トリガーボタンにフォーカスが戻る |

## 4. Storybook 表示確認項目

- default
- open（Popover 開）
- selected
- disabled
- error
- timeZone=Asia/Tokyo
- min/max
- sizeVariants
- calendar-display-weekday-ja
- calendar-display-today
- calendar-display-selected
- calendar-display-disabled
