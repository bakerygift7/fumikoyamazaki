# Neon 新DB セットアップ手順

## 1. Neon で新しいブランチを作成

1. [Neon Console](https://console.neon.tech) にログイン
2. 対象プロジェクトを選択
3. 左メニュー「**Branches**」をクリック
4. 「**Create branch**」をクリック
5. ブランチ名を入力（例: `ruitokurachi-official`）
6. 「**Create**」で作成

## 2. 接続文字列を取得

1. 作成したブランチをクリック
2. 「**Connection details**」または「**Connection string**」を表示
3. **PostgreSQL** の接続文字列をコピー（`postgresql://...` で始まる）

## 3. 環境変数を更新

`.env.local` の `POSTGRES_URL` を新しい接続文字列に差し替える：

```
POSTGRES_URL=postgresql://ユーザー:パスワード@ホスト/neondb?sslmode=require
```

## 4. マイグレーション実行

ターミナルで：

```bash
cd /Users/kurachikanako/Dropbox/dropbox/levelplus/ruitokurachi-official
echo "y" | npm run db:fresh
```

確認プロンプトが出たら `y` で進める。

## 5. サーバー起動

```bash
npm run dev
```

`http://localhost:3000/admin` で管理画面にアクセスし、初回はユーザーを作成する。
