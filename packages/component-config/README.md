# @zenkigen-inc/component-config

コンポーネント設定パッケージ。カラートークンやその他の設定を管理します。

## 開発者向け

### カラートークンの更新

カラートークンを更新するには、以下の手順に従ってください：

1. 以下のJSONファイルを編集します：

   ```
   packages/component-config/style-dictionary/tokens.json
   ```

2. 変更を適用するために、ビルドコマンドを実行します：

   ```bash
   yarn build:tokens
   ```

   このコマンドを実行すると、差分が表示され結果を確認できます。

3. tailwindに反映させ、zenkigen-component全体で使用できるようにします：（プロジェクトのルートで実行）
   ```bash
   yarn build:all
   ```

### トークン生成フロー

```mermaid
flowchart LR
  A["tokens.json (style-dictionary)"] -->|token-transformer| B["transformed-tokens.json"]
  B -->|Style Dictionary / build.cjs| C["src/tokens/tokens.ts"]
  C -->|tsup| D["dist/index.mjs (tokens)"]
  D -->|generate-v4-css.mjs| E["dist/theme.css / utilities.css / index.css (Tailwind v4)"]
  E -->|"@import '@zenkigen-inc/component-config/styles'"| F["利用側 globals.css"]
```

- マスターデータ: `packages/component-config/style-dictionary/tokens.json`
- `yarn build:tokens` 実行時に以下が順に生成されます
  1. `token-transformer` が `style-dictionary/tokens.json` を読み取り、`style-dictionary/transformed-tokens.json` を作成
  2. `build.cjs` が Style Dictionary で `transformed-tokens.json` を読み込み、ローワーキャメルのキーで `src/tokens/tokens.ts` を生成（`export const tokens = ... as const` と `export const tokensWithMeta = ... as const` を出力）
- ビルド時に `src/generate-v4-css.mjs` が `dist/index.mjs`（tokens）と `@zenkigen-inc/component-theme` の typography を読み込み、Tailwind v4 用の CSS（`@theme` / `@utility` / `@source inline`）を `dist/{theme,utilities,index}.css` に生成します。利用側は `@import '@zenkigen-inc/component-config/styles'`（`exports` の `"./styles"`）で読み込みます。**Tailwind v4 専用**（v3 の JS preset は廃止）。

#### 主なファイルとフォーマット

| ファイル                                   | 役割                 | フォーマット/生成元                                                                                                                                                           | 備考                                                                                                                                                                |
| ------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `style-dictionary/tokens.json`             | マスタートークン     | 手書きの JSON（Style Dictionary + token-transformer 記法、`$Colors.*` 参照可）                                                                                                | カラーやタイポなどのソース。                                                                                                                                        |
| `style-dictionary/transformed-tokens.json` | 変換済みトークン     | `yarn build:tokens` 内の `token-transformer` が生成。全ての参照が解決され HEX 等の生値を保持                                                                                  | Style Dictionary の入力。                                                                                                                                           |
| `src/tokens/tokens.ts`                     | TypeScript 用定数    | `build.cjs`（Style Dictionary の `customTSFormat`）が生成。ローワーキャメルキーで `export const tokens = ... as const` と `export const tokensWithMeta = ... as const` を出力 | `tokens` は値のみで Tailwind 用互換を維持。`tokensWithMeta` で description/type を含むメタ情報を参照可能。color で `$Colors.*` を参照する場合は `rawValue` を追加。 |
| `src/generate-v4-css.mjs`                  | Tailwind v4 CSS 生成 | `dist/index.mjs`(tokens) と component-theme typography から `dist/{theme,utilities,index}.css` を生成                                                                         | Yarn ワークスペース全体で共通設定として利用。                                                                                                                       |

## ライセンス

@zenkigen-inc/component-config は MIT ライセンスに基づいています。
