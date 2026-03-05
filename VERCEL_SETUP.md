# Vercel デプロイ設定手順

## 1. Vercel ダッシュボードで設定する環境変数

Vercel プロジェクトの **Settings > Environment Variables** で以下を追加。
対象環境は **Preview** と **Production** 両方にチェック。

| 変数名 | 値 | 重要度 |
|--------|----|--------|
| `POSTGRES_URL` | Neon の接続文字列 | 🔴 必須 |
| `PAYLOAD_SECRET` | ランダムな長い文字列（32文字以上） | 🔴 必須 |
| `RESEND_API_KEY` | ResendのAPIキー | 🔴 必須 |
| `PREVIEW_SECRET` | `preview-secret-2026` | 🔴 必須 |
| `NEXT_PUBLIC_LIFF_ID` | LIFFのID | 🟡 必要なページのみ |
| `CHATWORK_API_TOKEN` | ChatworkのAPIトークン | 🟡 問い合わせ通知用 |
| `CHATWORK_ROOM_ID` | ChatworkのルームID | 🟡 問い合わせ通知用 |
| `GEMINI_API_KEY` | GeminiのAPIキー | 🟡 AI機能用 |
| `PINECONE_API_KEY` | PineconeのAPIキー | 🟡 AI機能用 |
| `PINECONE_INDEX_NAME` | Pineconeのインデックス名 | 🟡 AI機能用 |

## 2. Resend ドメイン認証（メール送信に必須）

`noreply@kurachi.app` からメールを送るために、Resend 側でドメイン認証が必要。

1. [Resend ダッシュボード](https://resend.com/domains) を開く
2. `kurachi.app` ドメインを追加
3. 表示される DNS レコード（TXT, MX, DKIM）を kurachi.app のドメイン管理画面で設定
4. 認証完了を確認

**これが完了しないと：** パスワードリセットメール・問い合わせ自動返信が届かない

## 3. サブブランチのプレビューURL確認

`feature/payload-sanity-migration` ブランチを Vercel にデプロイすると、
`https://ruitokurachi-official-git-feature-xxxx.vercel.app` のような URL が発行される。

## 4. デプロイ後の確認チェックリスト

| # | 確認内容 | 方法 |
|---|----------|------|
| 1 | トップページ表示 | `/` にアクセス |
| 2 | ブログ一覧表示 | `/logs` にアクセス |
| 3 | ブログ詳細表示 | `/logs/[slug]` にアクセス |
| 4 | Payload admin ログイン | `/admin` にアクセスしてメール・パスワードでログイン |
| 5 | ブログ作成・公開 | admin からブログ新規作成して公開 |
| 6 | プレビュー機能 | admin のブログ下書きで「プレビュー」ボタン押下 |
| 7 | お問い合わせ送信 | `/contact` からフォーム送信 |
| 8 | メール受信確認 | 自動返信メールが届くか確認 |
| 9 | About/Mission/Privacy/Legal表示 | 各ページにアクセス |

## 5. 注意事項：画像アップロードの永続化

**現状の制限：** Vercel はサーバーレス環境のため、admin からアップロードした画像は
次のデプロイ時に消える。

**解決策（将来対応）：** Cloudflare R2 または Vercel Blob を使ったクラウドストレージ設定。
現状は git にコミット済みの画像（`public/media/`）は問題なく表示される。
