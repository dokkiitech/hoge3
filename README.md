# hoge

Discord Bot powered by discord.js

## 特徴

- ✅ Botが「オンライン」として表示されます
- ✅ discord.jsを使用したGateway接続
- ✅ スラッシュコマンド対応

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env`ファイルを作成し、以下の環境変数を設定してください:

```
DISCORD_BOT_TOKEN=your_discord_bot_token_here
```
Discord Bot Token

```
DISCORD_APPLICATION_ID=your_application_id_here
```
Discord Application ID

```
BOT_BASE_URL_01=your_value_here
```
Base URL for a

**注意:** 実際の値はDiscord Developer Portalから取得してください。上記はプレースホルダーです。

### 3. ビルド

```bash
npm run build
```

### 4. 起動

```bash
npm start
```

または開発モード:

```bash
npm run dev
```

## デプロイ

このBotは常時稼働サーバーが必要です。以下のプラットフォームでデプロイできます:

- **Railway** (推奨): https://railway.app/
- **Render**: https://render.com/
- **Heroku**: https://www.heroku.com/
- **VPS/EC2**: 任意のVPSやAWS EC2

### Railway/Renderでのデプロイ

1. GitHubリポジトリをインポート
2. 環境変数を設定
3. 自動デプロイ完了

### PM2でのデプロイ (VPS/EC2)

PM2を使用して本番環境で管理する場合:

```bash
# PM2をグローバルにインストール
npm install -g pm2

# Botを起動（プロセス名: hoge）
pm2 start npm --name "hoge" -- start

# 自動起動設定（サーバー再起動時に自動起動）
pm2 startup
pm2 save

# ステータス確認
pm2 status

# ログ確認
pm2 logs hoge

# 再起動
pm2 restart hoge

# 停止
pm2 stop hoge

# プロセス削除
pm2 delete hoge
```

**PM2の便利なコマンド:**

```bash
# すべてのプロセスの状態を確認
pm2 list

# リアルタイムモニタリング
pm2 monit

# メモリ使用量などの詳細情報
pm2 show hoge
```

## スラッシュコマンド

スラッシュコマンドはBot起動時に自動的に登録されます。

## 生成元

このBotは [DiscordBot-Maker](https://github.com/yourusername/discordbot-maker) で生成されました。
