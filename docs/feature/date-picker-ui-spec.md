# DatePicker UI仕様（トリガーボタン / カレンダー）

DatePicker のUI詳細仕様をまとめる。設計全体は [設計書](./date-picker-design.md) を参照する。

## 目次

- [トリガーボタン](#トリガーボタン)
- [カレンダーUI](#カレンダーui)
- [カレンダー装飾仕様（Figma準拠）](#カレンダー装飾仕様figma準拠)

## トリガーボタン

- Button コンポーネントを使用する
- `variant="outline"` を標準とする
- `isError === true` の場合は `variant="outlineDanger"` を使用する
- `size` は Button と同じ `small` / `medium` / `large` をサポートする
- `before` props で `calendar` アイコンを表示する
- 手入力は不可（ボタンによる選択のみ）
- プレースホルダー既定文言は「日付を選択」
- 日が選択された場合は `yyyy年MM月dd日` フォーマットで表示する
- この表示フォーマットは利用者側で変更できない
- エラー状態の表示をサポート（TextInput と同様）
- エラートークンは TextInput と同一
- メッセージの配置はトリガーボタンの下で固定（TextInput と同様）

## カレンダーUI

- Popover + [`react-day-picker`](https://daypicker.dev/) で構成する
- ポップオーバー表示（クリックで開閉）
- 外側クリック/Escape で閉じる
- クリアボタン/今日ボタンは常に表示（切り替え不可）
- 月移動のUIは前/次ボタンのみ
- `react-day-picker` の `timeZone` を利用し、表示/選択の基準を指定する
- 初回表示は今月、再度開いた場合は前回選択した月を表示する
- 前月/次月の移動をサポートする
- 当月から移動している場合は「今日に戻る」で今月へ戻す
- 「クリア」で日付選択状態を解除する

## カレンダー装飾仕様（Figma準拠）

### コンテナ

- 背景: `background/uibackground01`
- 角丸: `radius=4px`
- シャドウ: `Shadow/FloatingShadow`（0 4 20 rgba(0,0,0,0.08)）
- 幅: 224px
- 余白: 上 8px

### ヘッダー（年月+移動）

- 高さ: 28px
- 年月テキスト: `Label12_Bold`、`text/text02`
- 前月/次月ボタン: `IconButton`（16px）、左右アイコン

### 曜日行

- 高さ: 28px
- 曜日テキスト: `Label12_Bold`、`text/text02`

### 日付グリッド

- セルサイズ: 28x28
- セル間隔: 2px
- 角丸: 14px（円形）
- 通常日付: `Label12_Bold`、`interactive/interactive02`
- 前月/翌月など無効日付: `interactive/interactive04`
- 選択日: 背景 `background/uibackgroundblue`、枠線 `selected/selecteduiborder`、文字 `text/text02`
- ホバー: 選択日と同じ表現
- 本日: 背景 `interactive/interactive01`、枠線 `selected/selecteduiborder`、文字 `text/textoncolor`

### フッター

- 高さ: 40px、上 border 1px `border/uiborder01`
- 背景: `background/uibackground01`
- 左: 「今日に戻る」アイコンボタン（`calendar-today`、24px）
- 右: テキストボタン「クリア」（`Label14_Regular`、`interactive/interactive02`）
