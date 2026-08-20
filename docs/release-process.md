# リリース手順（npm publish）

`@zenkigen-inc/*` パッケージを npm に公開する手順をまとめる。

## 目次

- [概要](#概要)
- [公開対象パッケージ](#公開対象パッケージ)
- [バージョン同期ルール](#バージョン同期ルール)
  - [なぜ lockfile が変わらないのか](#なぜ-lockfile-が変わらないのか)
- [リリース手順](#リリース手順)
  - [lockfile に差分が出た場合](#lockfile-に差分が出た場合)
  - [具体例: 1.22.0 → 1.22.1 をリリースする](#具体例-1220--1221-をリリースする)
- [プレリリースの公開](#プレリリースの公開)
  - [具体例: 2.0.0-rc.0 を next でリリースする](#具体例-200-rc0-を-next-でリリースする)
- [npm dist-tag の判定ルール](#npm-dist-tag-の判定ルール)
- [publish 関連の設定](#publish-関連の設定)
- [よくある落とし穴](#よくある落とし穴)

## 概要

> メジャーバージョンのライフサイクル・ブランチ戦略・dist-tag 体制の全体方針は [バージョン運用方針](./versioning-policy.md) を参照。

リリースは **`v*` タグの push を起点に GitHub Actions が自動で npm publish する**フローで運用している。ローカルで `yarn publish:all` を手で叩く運用ではない（手動コマンドは緊急時のフォールバック）。

```
version bump（4 package.json のみ / yarn.lock は変化しない）
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
- 内部依存（`@zenkigen-inc/*`）は **`workspace:*`** で参照している。Yarn が publish 時にその時点の version の exact 値へ自動変換する（`"workspace:*"` → `"1.22.1"`）ため、利用者が見る公開物は exact 固定になる。
- **version bump で `yarn.lock` は変化しない。** リリースコミットに含めるのは 4 つの `package.json` だけ。

### なぜ lockfile が変わらないのか

`yarn.lock` の workspace エントリは、実バージョンではなく固定のプレースホルダで記録されている。

```
"@zenkigen-inc/component-ui@workspace:packages/component-ui":
  version: 0.0.0-use.local          ← package.json の version を参照していない
  dependencies:
    "@zenkigen-inc/component-config": "workspace:*"   ← 内部依存も範囲を持たない
```

そのため `package.json` の `version` 行をいくら書き換えても、lockfile 側に反映すべき差分が生じない。

これは `workspace:*` へ移行した `caba4c8e`（2026-06-17）以降の挙動で、**v1.21.0 が最初の該当リリース**。それ以前は内部依存を exact バージョン文字列で参照していたため、version bump のたびに lockfile の `@zenkigen-inc/*` エントリ（14 行前後）が書き換わっていた。v1.21.0 / v1.21.1 / v1.22.0 のリリースコミットはいずれも 4 つの `package.json` のみの変更になっている。

## リリース手順

> **ブランチ運用**: 機能開発・修正は PR 経由でマージするが、**リリース（version bump）コミットはリリースブランチに直接 commit & push する**（PR を通さない）。タグはその release コミット自体に打つ。
>
> | 系列            | リリースブランチ |
> | --------------- | ---------------- |
> | v1 安定版       | `main`           |
> | v2 プレリリース | `v2-main`        |
>
> **手順は共通。コミット先ブランチのみ異なる。**

1. **リリースブランチに切り替え**
   - `git checkout <リリースブランチ>` → `git pull` で最新化する。
   - **以降の編集・コマンドはすべてリリースブランチ上で行う**（別ブランチで version bump すると、誤った内容を起点に編集してしまうほか、未コミット変更が衝突して切り替えに失敗する）。

2. **version bump**
   - 4つの `packages/*/package.json` の `version` 行を新 version に更新。

3. **lockfile が変化しないことを確認**
   - `yarn install --immutable` を実行する（CI と同条件。lockfile を書き換える必要があれば失敗する）。
   - 続けて `git status --short` を確認し、**変更が 4 つの `package.json` だけ**であることを見る。
   - `yarn.lock` に差分が出たら異常。commit せず中断して調査する（[lockfile に差分が出た場合](#lockfile-に差分が出た場合)）。

4. **commit（リリースブランチに直接）**
   - リリースブランチ上で直接 commit する（PR を通さない）。
   - メッセージ形式: `release: X.Y.Z`
   - 対象: 4 package.json のみ（`git add packages/*/package.json`）

5. **push ＆ タグ作成・push**
   - `git push origin <リリースブランチ>` で release コミットを push。
   - `git tag vX.Y.Z` → `git push origin vX.Y.Z`（このタグ push が publish.yaml を発火させる）。

6. **CI publish（自動）**
   - `publish.yaml`（`on: push: tags: 'v*'`）が発火。
   - `yarn install` → `yarn build-lib:all` → `yarn publish:all --tag <dist-tag> --tolerate-republish`。
   - `publish:all` = `yarn workspaces foreach --all --exclude zenkigen-component npm publish`。`--tag` は CI がタグ名から判定（安定版 → `latest` / プレリリース → `next`）。

7. **確認**
   - `npm view @zenkigen-inc/component-ui version` で公開を確認。

### lockfile に差分が出た場合

リリース作業で `yarn.lock` が変化するのは正常ではない。**差分をそのまま commit しないこと。**

リリースコミットは PR を通さずリリースブランチへ直接 push するため、通常の PR で走る Audit・Takumi Guard・レビューをすべて経由しない。ここで第三者依存の更新を無自覚に取り込むと、検証されないまま tag push → publish まで一直線に進んでしまう。

差分を確認して原因を切り分ける。

```bash
git diff yarn.lock
```

| 差分の内容                             | 判断                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------- |
| `@zenkigen-inc/*` のエントリのみ       | v1.20.4 以前の構成が残っている可能性。内部依存が `workspace:*` になっているか確認する |
| 第三者パッケージのバージョン・checksum | **中断**。誰がいつ入れた変更か特定できるまで進めない                                  |
| 身に覚えのないパッケージの追加         | **中断**。サプライチェーン汚染を疑い、リリースを止めて調査する                        |

第三者依存を意図的に更新する必要がある場合は、リリースコミットに混ぜず**通常の PR として分離**する。PR にすれば Audit workflow と Takumi Guard が動き、更新内容がレビュー対象になる。

> 依存を更新する PR では、導入するバージョンの公開日・provenance・既知のサプライチェーン攻撃の対象かどうかを確認する。`.yarnrc.yml` の `npmMinimalAgeGate: '3d'`（公開 3 日未満をブロック）と `enableScripts: false`（install スクリプトの無効化）が一次防御として効いている。

### 具体例: 1.22.0 → 1.22.1 をリリースする

人が手を動かすのは「リリースブランチへの切り替え → 4つの `version` 行の書き換え → 確認 → commit → tag push」だけ。ビルドや publish コマンドは打たない（CI が実施する）。

#### ① リリースブランチに切り替える

**version 行を書き換える前に**リリースブランチへ切り替え、最新化する。

```bash
git checkout main                            # v1 のリリースブランチ
git pull
```

#### ② version 行を書き換える（手動編集）

4つすべての `packages/*/package.json` で `version` 行を変更する。

```diff
-  "version": "1.22.0",
+  "version": "1.22.1",
```

#### ③ 以降はコマンド

```bash
yarn install --immutable                     # lockfile が変わらないことの確認（CI と同条件）
git status --short                           # packages/*/package.json の 4 件だけであること

git add packages/*/package.json
git commit -m "release: 1.22.1"
git push origin main

git tag v1.22.1
git push origin v1.22.1                      # ← publish.yaml が発火

npm view @zenkigen-inc/component-ui version  # 1.22.1 を確認
```

## プレリリースの公開

破壊的変更を含む次期メジャーを `next` dist-tag で先行公開する手順。方針・ブランチ戦略・dist-tag 体制は [バージョン運用方針](./versioning-policy.md) を参照。

手順は[リリース手順](#リリース手順)と共通。**コミット先ブランチを `v2-main` にする**ことと、**version にハイフンを付ける**ことだけが異なる。

### 具体例: 2.0.0-rc.0 を next でリリースする

#### ① リリースブランチに切り替える

**version 行を書き換える前に**リリースブランチへ切り替え、最新化する。

```bash
git checkout v2-main                                  # v2 のリリースブランチ
git pull
```

#### ② version 行を書き換える（手動編集）

4つすべての `packages/*/package.json` で `version` 行を変更する。

```diff
-  "version": "1.x.y",
+  "version": "2.0.0-rc.0",
```

#### ③ 以降はコマンド

```bash
yarn install --immutable                              # lockfile が変わらないことの確認（CI と同条件）
git status --short                                    # packages/*/package.json の 4 件だけであること

git add packages/*/package.json
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

- **yarn.lock を巻き込んで commit する**: version bump では lockfile は変化しない（[なぜ lockfile が変わらないのか](#なぜ-lockfile-が変わらないのか)）。差分が出たら第三者依存が動いた合図なので、`git add packages/*/package.json` で対象を絞り、差分の中身を確認してから判断する（[lockfile に差分が出た場合](#lockfile-に差分が出た場合)）。v1.20.4 以前の手順書は「yarn.lock も一緒に commit」となっていたため、古い手順の記憶で作業しないこと。
- **lockfile と package.json の不整合**: 依存を変更したのに lockfile を更新していないと、CI の `yarn install`（GitHub Actions では `CI=true` により暗黙 immutable）が失敗する。手順 3 の `yarn install --immutable` はこれをローカルで先に検出するためのもの。
- **部分公開後の再実行**: `publish:all` の途中で失敗し一部パッケージだけ公開された状態で Actions を rerun すると、公開済み version が衝突して落ちる。`--tolerate-republish`（publish.yaml で付与済み）により公開済みは許容され未公開分のみ揃う。手動復旧する場合は `npm view <pkg> versions` で公開済みを確認し、未公開分だけ `yarn npm publish --tag <dist-tag>` する。
- **プレリリースのつもりがハイフンを付け忘れ**: `v2.0.0`（ハイフンなし）で tag すると `latest` 判定になり安定版利用者に配信されてしまう。検証目的なら必ず `v2.0.0-rc.0` のようにハイフン付きにする。
