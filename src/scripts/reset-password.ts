import path from 'path'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(path.resolve(process.cwd()), true)

import { getPayload } from 'payload'
import config from '../../src/payload.config'

const NEW_PASSWORD = 'shakti2026!'
const ADMIN_EMAIL = 'ruito@b-gift.jp'

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: ADMIN_EMAIL } },
    overrideAccess: true,
    limit: 1,
  })

  if (existing.docs.length === 0) {
    console.log('ユーザーが見つからないため新規作成します...')
    await payload.create({
      collection: 'users',
      data: {
        email: ADMIN_EMAIL,
        password: NEW_PASSWORD,
        name: '管理者',
      },
      overrideAccess: true,
    })
    console.log('✅ 新規ユーザーを作成しました')
  } else {
    const userId = existing.docs[0].id
    console.log(`ユーザーID ${userId} のパスワードをリセットします...`)
    await payload.update({
      collection: 'users',
      id: userId,
      data: { password: NEW_PASSWORD },
      overrideAccess: true,
    })
    console.log('✅ パスワードをリセットしました')
  }

  console.log('\n=============================')
  console.log(`メール   : ${ADMIN_EMAIL}`)
  console.log(`パスワード: ${NEW_PASSWORD}`)
  console.log('=============================\n')

  process.exit(0)
}

main().catch((err) => {
  console.error('❌ エラー:', err)
  process.exit(1)
})
