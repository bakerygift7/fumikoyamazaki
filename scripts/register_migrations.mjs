import pg from 'pg'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// .env.local を手動で読み込む
const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const idx = trimmed.indexOf('=')
  if (idx === -1) continue
  const key = trimmed.slice(0, idx).trim()
  const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
  process.env[key] = val
}

const { Client } = pg

const client = new Client({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
})

await client.connect()

// 初期マイグレーションを登録済みとしてマーク
const existing = await client.query(
  `SELECT name FROM payload_migrations WHERE name = '20260225_011223_initial'`
)

if (existing.rows.length === 0) {
  await client.query(
    `INSERT INTO payload_migrations (name, batch, updated_at, created_at)
     VALUES ('20260225_011223_initial', 1, NOW(), NOW())`
  )
  console.log('✅ 初期マイグレーションを登録しました')
} else {
  console.log('ℹ️  初期マイグレーションは既に登録済みです')
}

// 新しいカラムを直接追加
const result = await client.query(`
  ALTER TABLE srs_logs
    ADD COLUMN IF NOT EXISTS email varchar,
    ADD COLUMN IF NOT EXISTS answers jsonb,
    ADD COLUMN IF NOT EXISTS form_data_pain varchar,
    ADD COLUMN IF NOT EXISTS form_data_root varchar,
    ADD COLUMN IF NOT EXISTS form_data_vision varchar
`)
console.log('✅ srs_logs カラム追加完了')

// 新しいマイグレーションも登録
const existing2 = await client.query(
  `SELECT name FROM payload_migrations WHERE name = '20260225_150000_srs_answers_email'`
)
if (existing2.rows.length === 0) {
  await client.query(
    `INSERT INTO payload_migrations (name, batch, updated_at, created_at)
     VALUES ('20260225_150000_srs_answers_email', 1, NOW(), NOW())`
  )
  console.log('✅ 新マイグレーションを登録しました')
} else {
  console.log('ℹ️  新マイグレーションは既に登録済みです')
}

await client.end()
console.log('完了！')
