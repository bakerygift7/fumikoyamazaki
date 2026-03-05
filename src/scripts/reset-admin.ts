import path from 'path'
import { readFileSync } from 'fs'
import crypto from 'crypto'
import { Client } from 'pg'

function loadDotEnv(filePath: string) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx < 0) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = value
    }
  } catch { }
}

loadDotEnv(path.resolve(process.cwd(), '.env.local'))
loadDotEnv(path.resolve(process.cwd(), '.env'))

const NEW_PASSWORD = 'Admin1234!'
const TARGET_EMAIL = 'ruito@b-gift.jp'

function generateHash(password: string): Promise<{ hash: string; salt: string }> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(32).toString('hex')
    crypto.pbkdf2(password, salt, 25000, 512, 'sha256', (err, buf) => {
      if (err) return reject(err)
      resolve({ hash: buf.toString('hex'), salt })
    })
  })
}

async function main() {
  const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL
  if (!dbUrl) throw new Error('DB URLが見つかりません')

  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })
  await client.connect()

  // ロック解除
  await client.query(`UPDATE users SET login_attempts = 0, lock_until = NULL`)
  console.log('✅ ロック解除完了')

  // 新しいハッシュ生成
  const { hash, salt } = await generateHash(NEW_PASSWORD)

  // DBに直接書き込み
  const res = await client.query(
    `UPDATE users SET hash = $1, salt = $2 WHERE email = $3 RETURNING id, email`,
    [hash, salt, TARGET_EMAIL]
  )

  await client.end()

  if (res.rows.length === 0) {
    console.error(`❌ ユーザーが見つかりません: ${TARGET_EMAIL}`)
    process.exit(1)
  }

  console.log(`✅ パスワードリセット完了`)
  console.log(`📧 メールアドレス: ${TARGET_EMAIL}`)
  console.log(`🔑 新しいパスワード: ${NEW_PASSWORD}`)
  console.log('')
  console.log('⚠️  ログイン後、すぐにパスワードを変更してください。')
}

main().catch(e => { console.error(e); process.exit(1) })
