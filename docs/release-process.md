# リリース手順（npm publish）

`@zenkigen-inc/*` パッケージを npm に公開する手順をまとめる。

## 目次

- [概要](#概要)
- [公開対象パッケージ](#公開対象パッケージ)
- [バージョン同期ルール](#バージョン同期ルール)
- [リリース手順](#リリース手順)
  - [具体例: 1.20.4 → 1.20.5 をリリースする](#具体例-1204--1205-をリリースする)
- [プレリリースの公開](#プレリリースの公開)
  - [具体例: 2.0.0-rc.0 を next でリリースする](#具体例-200-rc0-を-next-でリリースする)
- [npm dist-tag の判定ルール](#npm-dist-tag-の判定ルール)
- [publish 関連の設定](#publish-関連の設定)
- [よくある落とし穴](#よくある落とし穴)

## 概要

> メジャーバージョンのライフサイクル・ブランチ戦略・dist-tag 体制の全体方針は [バージョン運用方針](./versioning-policy.md) を参照。

リリースは **`v*` タグの push を起点に GitHub Actions が自動で npm publish する**フローで運用している。ローカルで `yarn publish:all` を手で叩く運用ではない（手動コマンドは緊急時のフォールバック）。

```
version bump + lockfile 更新（4 package.json + yarn.lock）
        ↓ commit（release: X.Y.Z）
vX.Y.Z タグを作成・push
        ↓ publish.yaml が発火（on: push: tags: 'v*'）
CI: yarn install → yarn build-lib:all → yarn publish:all --tag <dist-tag>
        ↓
npm に公開（タグ名で dist-tag を判定: 安定版 → latest / プレリリース → next）
```

dist-tag は**タグ名にハイフン（`-`）を含むか**で自動判定する（[npm dist-tag の判定ルール](#npm-dist-tag-の判定ルール)）。通常の安定版リリース（`v1.20.5` 等、ハイフンなし）は従来どおり `latest` に公開されるため、**安定版のリリース手順・結果はこれまでと変わらない**。

## 公開対象パッケージ

| パッケージ                       | publishConfig  |
| -------------------------------- | -------------- |
| `@zenkigen-inc/component-ui`     | access: public |
| `@zenkigen-inc/component-config` | access: public |
| `@zenkigen-inc/component-icons`  | access: public |
| `@zenkigen-inc/component-theme`  | access: public |

ルートの `zenkigen-component`（private なワークスペース）は publish 対象外（`publish:all` は `--exclude zenkigen-component`）。

## バージョン同期ルール

- **全パッケージの version を常に揃える**（部分的なバージョン更新はしない）。
- 内部依存（`@zenkigen-inc/*`）は **`workspace:*`** で参照している。Yarn が publish 時にその時点の version の exact 値へ自動変換する（`"workspace:*"` → `"1.20.5"`）ため、利用者が見る公開物は exact 固定になる。
- version を変えたら **`yarn install` で `yarn.lock` を更新**し、同じコミットに含める。

## リリース手順

> **ブランチ運用**: 機能開発・修正は PR 経由でマージするが、**リリース（version bump）コミットはリリースブランチに直接 commit & push する**（PR を通さない）。タグはその release コミット自体に打つ。
>
> | 系列            | リリースブランチ |
> | --------------- | ---------------- |
> | v1 安定版       | `main`           |
> | v2 プレリリース | `v2-main`        |
>
> **手順は共通。コミット先ブランチのみ異なる。**

1. **version bump**
   - 4つの `packages/*/package.json` の `version` 行を新 version に更新。

2. **lockfile 更新**
   - `yarn install` を実行し `yarn.lock` の resolution を更新。

3. **commit（リリースブランチに直接）**
   - リリースブランチ上で直接 commit する（PR を通さない）。
   - メッセージ形式: `release: X.Y.Z`
   - 対象: 4 package.json ＋ yarn.lock

4. **push ＆ タグ作成・push**
   - `git push origin <リリースブランチ>` で release コミットを push。
   - `git tag vX.Y.Z` → `git push origin vX.Y.Z`（このタグ push が publish.yaml を発火させる）。

5. **CI publish（自動）**
   - `publish.yaml`（`on: push: tags: 'v*'`）が発火。
   - `yarn install` → `yarn build-lib:all` → `yarn publish:all --tag <dist-tag> --tolerate-republish`。
   - `publish:all` = `yarn workspaces foreach --all --exclude zenkigen-component npm publish`。`--tag` は CI がタグ名から判定（安定版 → `latest` / プレリリース → `next`）。

6. **確認**
   - `npm view @zenkigen-inc/component-ui version` で公開を確認。

### 具体例: 1.20.4 → 1.20.5 をリリースする

人が手を動かすのは「4つの `version` 行の書き換え → `yarn install` → commit → tag push」だけ。ビルドや publish コマンドは打たない（CI が実施する）。

#### ① version 行を書き換える（手動編集）

4つすべての `packages/*/package.json` で `version` 行を変更する。

```diff
-  "version": "1.20.4",
+  "version": "1.20.5",
```

#### ② 以降はコマンド

```bash
yarn install                                 # yarn.lock を 1.20.5 に更新

git checkout main                            # v1 のリリースブランチ
git add packages/*/package.json yarn.lock
git commit -m "release: 1.20.5"
git push origin main

git tag v1.20.5
git push origin v1.20.5                      # ← publish.yaml が発火

npm view @zenkigen-inc/component-ui version  # 1.20.5 を確認
```

## プレリリースの公開

破壊的変更を含む次期メジャーを `next` dist-tag で先行公開する手順。方針・ブランチ戦略・dist-tag 体制は [バージョン運用方針](./versioning-policy.md) を参照。

手順は[リリース手順](#リリース手順)と共通。**コミット先ブランチを `v2-main` にする**ことと、**version にハイフンを付ける**ことだけが異なる。

### 具体例: 2.0.0-rc.0 を next でリリースする

#### ① version 行を書き換える（手動編集）

4つすべての `packages/*/package.json` で `version` 行を変更する。

```diff
-  "version": "1.x.y",
+  "version": "2.0.0-rc.0",
```

#### ② 以降はコマンド

```bash
yarn install                                          # yarn.lock を 2.0.0-rc.0 に更新

git checkout v2-main                                  # v2 のリリースブランチ
git add packages/*/package.json yarn.lock
git commit -m "release: 2.0.0-rc.0"
git push origin v2-main

git tag v2.0.0-rc.0
git push origin v2.0.0-rc.0                           # ← publish.yaml が発火（ハイフンあり → next）

npm dist-tag ls @zenkigen-inc/component-ui            # latest は据え置き / next=2.0.0-rc.0 を確認
```

- 反復は `2.0.0-rc.1`, `2.0.0-rc.2` … と version を上げて同様に。
- 安定版へ昇格するときは、合意後に `-rc` を外した `2.0.0`（ハイフンなし）を tag すれば `latest` に公開される。
- ⚠️ `.yarnrc.yml` の `npmMinimalAgeGate: '3d'` が効く環境では、公開直後3日間はそのバージョンの install がブロックされる（publish には無影響）。プレリリース検証時はこの待ち時間を考慮する。

## npm dist-tag の判定ルール

タグ名に**ハイフン（`-`）を含むか**で publish.yaml が自動判定する。判定ロジック・将来改修の方針は [バージョン運用方針 §publish workflow の dist-tag 判定](./versioning-policy.md#publish-workflow-の-npm-dist-tag-判定-現状と将来改修) を参照。

| タグ名の例      | ハイフン | dist-tag | 用途                                          |
| --------------- | -------- | -------- | --------------------------------------------- |
| `v1.20.5`       | なし     | `latest` | 通常の安定版リリース（`npm install` の既定）  |
| `v2.0.0`        | なし     | `latest` | メジャー安定版リリース                        |
| `v2.0.0-rc.0`   | あり     | `next`   | プレリリース（利用者は `@next` でオプトイン） |
| `v2.0.0-beta.1` | あり     | `next`   | プレリリース                                  |

## publish 関連の設定

- `.github/workflows/publish.yaml`: `v*` タグ push で発火する CI。認証は `secrets.NPM_TOKEN`（`NODE_AUTH_TOKEN`）。
- ルート `package.json` の scripts:
  - `build-lib:all`: 全パッケージのライブラリビルド。
  - `publish:all`: 全 workspace を npm publish（ルート除外）。
- `.yarnrc.yml`:
  - `npmScopes.zenkigen-inc.npmPublishRegistry: 'https://registry.npmjs.org'` … publish 先を npmjs に固定（`npmScopes` 配下の設定）。
  - `npmMinimalAgeGate: '3d'` … リリースから3日未満のバージョンは **install をブロック**（publish には影響しない）。
  - `enableScripts: false` … 依存の install スクリプトを既定で実行しない。
  - `defaultSemverRangePrefix: ''` … `yarn add` 時のバージョンを exact 固定にする（`workspace:*` の publish 時変換結果も exact になる）。
- 各 `package.json` の `publishConfig.access: public`。
- パッケージマネージャ: `yarn@4.13.0`（Yarn Berry）。publish は `yarn npm publish` 実体。
- **dist-tag**: タグ名から自動判定する（[npm dist-tag の判定ルール](#npm-dist-tag-の判定ルール)）。安定版（ハイフンなし）は `latest`、プレリリース（ハイフンあり）は `next`。`publish:all` には CI が `--tag <判定結果> --tolerate-republish` を付けて実行する。
  - `--tolerate-republish`: `publish:all` は 4 パッケージを順次公開するため、途中で失敗して再実行すると公開済み version が `EPUBLISHCONFLICT` を起こす。これを許容し、未公開分のみ公開して 4 パッケージの version を揃えられるようにする。

## よくある落とし穴

- **yarn.lock 更新漏れ**: package.json だけ更新して `yarn.lock` を更新しないと、CI の `yarn install`（GitHub Actions では `CI=true` により暗黙 immutable）が lockfile 不整合で失敗する。
- **部分公開後の再実行**: `publish:all` の途中で失敗し一部パッケージだけ公開された状態で Actions を rerun すると、公開済み version が衝突して落ちる。`--tolerate-republish`（publish.yaml で付与済み）により公開済みは許容され未公開分のみ揃う。手動復旧する場合は `npm view <pkg> versions` で公開済みを確認し、未公開分だけ `yarn npm publish --tag <dist-tag>` する。
- **プレリリースのつもりがハイフンを付け忘れ**: `v2.0.0`（ハイフンなし）で tag すると `latest` 判定になり安定版利用者に配信されてしまう。検証目的なら必ず `v2.0.0-rc.0` のようにハイフン付きにする。
