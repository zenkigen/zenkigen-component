# zenkigen-component

## インストール

### インストールする際の準備
zenkigen-componentはプライベートレポジトリのため、そのままではインストールできません。  
インストールするディレクトリに `.npmrc` ファイルを作成して以下を記述してください。
```
//npm.pkg.github.com/:_authToken=${GITHUB_READ_PACKAGES_TOKEN}
@zenkigen:registry="https://npm.pkg.github.com"
```

`read:packages` の権限が付与された Personal access token(PTA) を発行してください。  
発行されたトークンを `GITHUB_READ_PACKAGES_TOKEN` を環境変数として登録してください。

### インストールコマンド
```
npm install @zenkigen/zenkigen-component
```
```
yarn add @zenkigen/zenkigen-component
```
