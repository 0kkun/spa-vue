# README

## このプロジェクトについて

シングルページアプリケーションの練習用
写真共有アプリ

参考Qiita記事
https://www.hypertextcandy.com/vue-laravel-tutorial-setting-up-spa-project/


## 構築手順

### コンテナの起動

```
cd laravel-docker-template
```

```
make build
```

```
make up
```

### Laravelのインストール

```
make create-project
```

serverディレクトリ配下のlaravelディレクトリにアプリのファイルが作成されるので、
その中身を非表示ファイルごと一階層上のディレクトリに移動させる

### MySQLとの接続を設定

- .envファイルを下記のように設定

```
DB_CONNECTION=mysql
DB_HOST=db（←コンテナ名）
DB_PORT=3306（←コンテナ側のポート番号）
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=password
```

- .envの5行目も下記のように設定

```
APP_URL=http://localhost:8000
```

- 一度
```
```

### artisanコマンドの実行場所

```
make work
```