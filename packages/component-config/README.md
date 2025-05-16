# @zenkigen-inc/component-config

コンポーネント設定パッケージ。カラートークンやその他の設定を管理します。

## 開発ガイド

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

### 変更の確認

変更が反映されていない場合は、VSCodeを再起動するか、ブラウザのキャッシュをクリアしてみてください。

## ライセンス

@zenkigen-inc/component-config は MIT ライセンスに基づいています。
