import path from 'path'
import { readFileSync } from 'fs'
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

async function main() {
  const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL
  if (!dbUrl) throw new Error('POSTGRES_URL / DATABASE_URL が見つかりません')

  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })
  await client.connect()

  const res = await client.query(
    `UPDATE users SET login_attempts = 0, lock_until = NULL RETURNING id, email`
  )

  for (const row of res.rows) {
    console.log(`✅ ロック解除: ${row.email} (id: ${row.id})`)
  }

  await client.end()
  console.log('🎉 完了')
}

main().catch(e => { console.error(e); process.exit(1) })
