# ビジュアルリグレッションテスト（Chromatic）

Storybook の全ストーリーを [Chromatic](https://www.chromatic.com/) でスナップショット撮影し、UI の意図しない見た目の変化（visual regression）を PR 単位で検出する仕組みと運用をまとめる。

> Story 作成時の規約（Chromatic 差分を最小化する Story 分割方針）は [Storybook ガイドライン](./storybook-guidelines.md) を参照。

## 目次

- [概要](#概要)
- [CI での実行タイミング](#ci-での実行タイミング)
- [TurboSnap による差分撮影](#turbosnap-による差分撮影)
  - [import グラフで検知できない変更 — externals](#import-グラフで検知できない変更--externals)
- [baseline の仕組み](#baseline-の仕組み)
- [手動トリガーによる全ストーリー撮影（baseline 再確立）](#手動トリガーによる全ストーリー撮影baseline-再確立)
  - [いつ使うか](#いつ使うか)
  - [手順](#手順)
  - [補足](#補足)

## 概要

- workflow: [`.github/workflows/chromatic.yaml`](../.github/workflows/chromatic.yaml)
- ビルド一覧: <https://www.chromatic.com/builds?appId=639bcc36e4bdc7deb6496ad2>
- テスト種別: **Visual**（スナップショット比較）と **Accessibility**（axe による a11y リグレッション検出）

## CI での実行タイミング

| トリガー                                                             | 実行内容                                                                                                       |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `pull_request`（opened / reopened / synchronize / ready_for_review） | TurboSnap による差分撮影。draft PR と `renovate` / `dependencies` ラベル付き PR はスキップ                     |
| `push`（main）                                                       | baseline ブランチのビルド。TurboSnap 有効                                                                      |
| `workflow_dispatch`                                                  | 手動起動。TurboSnap を無効化した全ストーリー撮影（[後述](#手動トリガーによる全ストーリー撮影baseline-再確立)） |

PR には「Chromatic results」コメントが自動投稿され、buildUrl・撮影数・差分数を確認できる。

## TurboSnap による差分撮影

[TurboSnap](https://www.chromatic.com/docs/turbosnap/)（`onlyChanged: true`）は、変更ファイルから JS モジュールの import グラフを辿って影響を受ける story ファイルを特定し、該当ストーリーだけを再撮影する仕組み。影響外のストーリーは直前ビルドのスナップショットがコピーされ、スナップショット消費を抑える。

### import グラフで検知できない変更 — externals

`packages/component-config` はデザイントークンからビルド時に CSS を生成する。この経路（トークン → 生成 CSS → 全コンポーネントの見た目）は import グラフに現れないため、TurboSnap では検知できない。

このため workflow で以下を宣言している（[chromaui/action の externals オプション](https://www.chromatic.com/docs/turbosnap/#specify-external-files-to-trigger-a-full-re-test-when-changed)）:

```yaml
externals: packages/component-config/**
```

この glob に合致するファイルを変更した PR では全ストーリーが再撮影される。対象の代表例:

- `style-dictionary/tokens.json` — デザイントークンの原本
- `src/tokens/tokens.ts` — 生成されたトークン定数

## baseline の仕組み

各ストーリーの差分は **baseline**（最後に accept されたスナップショット）との比較で判定される。

- 差分を accept すると、そのスナップショットが以降のビルドの baseline になる
- 変更が無い（またはコピーされた）ストーリーの baseline は古いビルドのまま引き継がれる
- マージ後の main のビルドは merge commit の両親から baseline を引き継ぐ。**PR 上で accept した baseline はマージ後の main に引き継がれる**

## 手動トリガーによる全ストーリー撮影（baseline 再確立）

### いつ使うか

- トークン変更などの見た目への影響が baseline に反映されないまま残り、無関係な後続 PR に古い差分が噴出したとき
- baseline の状態が信用できなくなり、現行コードの見た目で作り直したいとき

### 手順

```bash
gh workflow run chromatic.yaml --ref main
```

（GitHub の Actions タブ → Chromatic → Run workflow からも起動できる）

1. `workflow_dispatch` 起動時は `forceRebuild: true` が渡り、TurboSnap を無効化して全ストーリーを撮影する
2. ビルド完了後、Chromatic のビルドページで差分をレビューして accept する
3. accept された内容が新しい baseline になる

### 補足

- PR ブランチに対しても `--ref <ブランチ名>` で実行できる（そのブランチの workflow ファイルに `workflow_dispatch` トリガーが含まれていること）。merge commit 方式でマージすれば、PR 上で accept した baseline はマージ後の main に引き継がれる
- `workflow_dispatch` のビルドでは PR の「Chromatic results」コメントは更新されない（コメント投稿ステップが PR 番号を前提としているため）。必要なら手動でコメントを編集する
- PR / push の自動ビルドは従来どおり TurboSnap 有効のままで、スナップショット消費は増えない
