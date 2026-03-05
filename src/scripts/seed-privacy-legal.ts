import path from 'path'
import { readFileSync } from 'fs'

// .env.local を手動でパースして環境変数にセット
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
  } catch { /* ファイルが存在しない場合は無視 */ }
}

loadDotEnv(path.resolve(process.cwd(), '.env.local'))
loadDotEnv(path.resolve(process.cwd(), '.env'))

function h2(text: string) {
  return {
    type: 'heading',
    tag: 'h2',
    format: '',
    indent: 0,
    version: 1,
    children: [{ type: 'text', text, format: 0, style: '', detail: 0, mode: 'normal', version: 1 }],
  }
}

function p(text: string) {
  return {
    type: 'paragraph',
    textFormat: 0,
    indent: 0,
    version: 1,
    children: [{ type: 'text', text, format: 0, style: '', detail: 0, mode: 'normal', version: 1 }],
  }
}

function listItem(children: any[]) {
  return {
    type: 'listitem',
    value: 1,
    checked: undefined,
    indent: 0,
    version: 1,
    children,
  }
}

function bulletList(items: string[]) {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    format: '',
    indent: 0,
    version: 1,
    children: items.map(text =>
      listItem([{ type: 'text', text, format: 0, style: '', detail: 0, mode: 'normal', version: 1 }])
    ),
  }
}

function boldText(text: string) {
  return { type: 'text', text, format: 1, style: '', detail: 0, mode: 'normal', version: 1 }
}

function normalText(text: string) {
  return { type: 'text', text, format: 0, style: '', detail: 0, mode: 'normal', version: 1 }
}

function mixedListItem(parts: any[]) {
  return {
    type: 'listitem',
    value: 1,
    checked: undefined,
    indent: 0,
    version: 1,
    children: parts,
  }
}

const privacyContent = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      h2('1. 個人情報の管理'),
      p('株式会社ギフト（以下「当社」）は、ユーザーの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備等の必要な措置を講じ、個人情報の厳重な管理を行ないます。'),
      h2('2. 個人情報の利用目的'),
      p('ユーザーから預かった個人情報は、当社からのご連絡や業務のご案内、ご質問に対する回答として、電子メールや資料の送付に利用いたします。'),
      h2('3. 個人情報の第三者への開示・提供の禁止'),
      p('当社は、ユーザーより預かった個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。'),
      bulletList([
        'ユーザーの同意がある場合',
        'ユーザーが希望されるサービスを行なうために当社が業務を委託する業者に対して開示する場合',
        '法令に基づき開示することが必要である場合',
      ]),
      h2('4. ご本人の照会'),
      p('ユーザーがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。'),
      h2('5. 法令、規範の遵守と見直し'),
      p('当社は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。'),
    ],
  },
}

const legalContent = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      h2('1. 事業者の名称'),
      p('株式会社ギフト'),
      h2('2. 代表者または通信販売に関する業務の責任者の氏名'),
      p('倉地 類人'),
      h2('3. 事業者の住所'),
      p('愛知県豊橋市広小路3-54-1'),
      h2('4. 事業者の連絡先'),
      p('電話番号：請求があったら遅滞なく開示します（お問い合わせフォームよりご請求ください）'),
      p('メールアドレス：ruito@kurachi.app'),
      h2('5. 販売価格'),
      p('各プロジェクト、サービスごとに表示された価格に基づきます。'),
      h2('6. 代金の支払時期および支払方法'),
      {
        type: 'list',
        listType: 'bullet',
        start: 1,
        tag: 'ul',
        format: '',
        indent: 0,
        version: 1,
        children: [
          mixedListItem([boldText('支払方法'), normalText('：クレジットカード決済（UnivaPay等）、銀行振込')]),
          mixedListItem([boldText('支払時期'), normalText('：サービス提供前の前払い、または個別契約に基づく分割払い')]),
        ],
      },
      h2('7. 商品代金以外に必要な費用'),
      bulletList([
        '銀行振込手数料（振込の場合）',
        'サイト閲覧、コンテンツダウンロード等に必要な通信料',
      ]),
      h2('8. 返品・キャンセルに関する特約'),
      p('本サービスはデジタルコンテンツおよびコンサルティングという性質上、原則としてお支払い後の返品・キャンセルには応じられません。'),
      h2('9. 役務の提供時期'),
      p('決済完了後、即時（デジタルコンテンツの場合）、または個別契約で定めた期間内。'),
    ],
  },
}

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../../src/payload.config.js')
  const payload = await getPayload({ config })

  console.log('▶ Payloadに privacy グローバルを書き込み中...')
  await (payload.updateGlobal as any)({
    slug: 'privacy',
    data: {
      title: 'プライバシーポリシー',
      subtitle: 'Privacy Policy',
      content: privacyContent,
    },
  })
  console.log('✅ privacy 完了')

  console.log('▶ Payloadに legal グローバルを書き込み中...')
  await (payload.updateGlobal as any)({
    slug: 'legal',
    data: {
      title: '特定商取引法に基づく表記',
      subtitle: 'Legal Notice',
      content: legalContent,
    },
  })
  console.log('✅ legal 完了')

  console.log('🎉 移植完了！')
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
