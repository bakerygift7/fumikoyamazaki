import path from 'path'
import { readFileSync } from 'fs'

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

const articles = [
  {
    title: 'SRSスコアとは何か？人生を変える自己成長の指標',
    slug: 'what-is-srs-score',
    date: '2026-02-01',
    category: 'SRS理論',
    description: 'SRS（Self-Rewiring Score）とは、自分自身の神経回路を書き換える力を数値化した指標です。この記事ではその基本概念を解説します。',
    content: 'SRSスコアは、単なる自己評価ではありません。脳科学と行動心理学の知見を組み合わせ、あなたが「どれだけ自分を変えられるか」を定量化する試みです。高いSRSスコアを持つ人は、逆境においても自己変革を続け、社会に大きな影響を与え続けます。',
  },
  {
    title: '朝5時起きを3ヶ月続けて気づいたこと',
    slug: 'morning-5am-3months',
    date: '2026-02-05',
    category: '習慣・行動',
    description: '早起きを習慣化するとどんな変化が起きるのか。3ヶ月間の実験結果をリアルにレポートします。',
    content: '朝5時に起きることは、単に「時間を増やす」行為ではありません。それは自分の意志で一日をデザインするという宣言です。最初の1週間は地獄でした。しかし1ヶ月を超えたとき、思考の質が明らかに変わりました。',
  },
  {
    title: 'AIに仕事を奪われる前にやるべきたった一つのこと',
    slug: 'before-ai-takes-your-job',
    date: '2026-02-08',
    category: 'AI・テクノロジー',
    description: 'AIの波に飲み込まれるのではなく、AIを使いこなす側に回るために今すぐ始めるべきことを解説します。',
    content: 'AI時代に生き残る人間の条件は、「AIに仕事を委ねる判断力」です。実行はAIに任せ、判断と創造性は人間が担う。この役割分担を理解した人だけが、加速する変化の波に乗ることができます。',
  },
  {
    title: '「やりたいことが見つからない」人へ。問いを変えれば答えが変わる',
    slug: 'finding-what-you-want',
    date: '2026-02-12',
    category: '思考・哲学',
    description: 'やりたいことを探すのをやめ、「何に怒りを感じるか」を問うと人生は動き始めます。',
    content: '「やりたいことが見つからない」と悩む人の多くは、問いの立て方が間違っています。正しい問いは「何が楽しいか？」ではなく「何が許せないか？」です。怒りの中にこそ、本物の使命が宿っています。',
  },
  {
    title: '月収100万円を超えた人たちに共通する「思考の型」',
    slug: 'mindset-of-high-earners',
    date: '2026-02-15',
    category: 'ビジネス・収入',
    description: '高収入者には共通した思考パターンがあります。その本質を解剖します。',
    content: '月収100万円を超える人たちを200人以上観察してわかったこと。それは「自分の市場価値を常に問い続けている」という習慣です。彼らは現状に満足せず、常に「もっと価値を提供できないか」と考え続けています。',
  },
  {
    title: '読書で人生は変わらない。でも「ある読み方」をすると変わる',
    slug: 'how-to-read-books-that-change-life',
    date: '2026-02-19',
    category: '習慣・行動',
    description: '読書の量ではなく質が人生を変える。脳に刻み込む読書術を公開します。',
    content: '年間200冊読んでも人生が変わらない人がいます。一方、年間10冊でも人生が激変する人がいます。違いは「アウトプットの質」です。読んだことを即座に行動に変換する習慣が、知識を知恵に昇華させます。',
  },
  {
    title: '人間関係を断捨離したら、年収が3倍になった話',
    slug: 'human-relation-declutter',
    date: '2026-02-22',
    category: '人間関係',
    description: '「誰と付き合うか」は「何をするか」より重要です。環境を変えた実体験を語ります。',
    content: '30歳のとき、私は「エネルギーを奪う人間関係」を全て断ち切りました。当初は孤独を感じましたが、3ヶ月後には驚くべきことが起きました。本当に成長したい人たちが自然と集まってきたのです。',
  },
  {
    title: 'SRS診断を受けた1000人のデータから見えてきたこと',
    slug: 'srs-diagnosis-1000-data',
    date: '2026-02-25',
    category: 'SRS理論',
    description: '1000人以上のSRS診断データを分析して見えてきた、スコアを上げる人と上がらない人の決定的な差。',
    content: 'SRS診断を1000人以上に実施してわかったこと。スコアが高い人には「自分への問いの質が高い」という共通点があります。「なぜ自分はこう感じるのか」を徹底的に掘り下げる習慣が、神経回路の再配線を促進します。',
  },
  {
    title: '失敗を「証拠」として使う人が最速で成長する理由',
    slug: 'failure-as-evidence',
    date: '2026-03-01',
    category: '思考・哲学',
    description: '失敗を恐れるのではなく、データとして活用する思考法が成長を加速させます。',
    content: '失敗は「自分がダメだという証拠」ではなく、「この方法では上手くいかないというデータ」です。この認知の転換だけで、挑戦の回数が劇的に増えます。失敗の量が多い人ほど、成功に近い場所にいるのです。',
  },
  {
    title: '「普通の人生」を選ばなかった代償と報酬',
    slug: 'price-of-extraordinary-life',
    date: '2026-03-03',
    category: 'ライフスタイル',
    description: '会社員を辞めて独立した日から今日まで。リアルな葛藤と得たものを語ります。',
    content: '普通の人生を選ばないとはどういうことか。それは「安心」を手放すということです。しかしその代わりに得られるものがあります。それは「自分の人生の主役である感覚」です。これはお金では買えません。',
  },
]

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../../src/payload.config.js')
  const payload = await getPayload({ config })

  console.log('🚀 テスト記事を投入中...')

  for (const article of articles) {
    try {
      // 既存チェック
      const existing = await payload.find({
        collection: 'logs',
        where: { slug: { equals: article.slug } },
        overrideAccess: true,
      })
      if (existing.docs.length > 0) {
        console.log(`⏭️  スキップ（既存）: ${article.title}`)
        continue
      }

      await payload.create({
        collection: 'logs',
        data: {
          title: article.title,
          slug: article.slug,
          date: new Date(article.date).toISOString(),
          author: '倉地 類人',
          category: article.category,
          description: article.description,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: article.content, version: 1 }],
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          _status: 'published',
        } as any,
        overrideAccess: true,
      })
      console.log(`✅ 作成: ${article.title}`)
    } catch (e: any) {
      console.error(`❌ エラー: ${article.title} - ${e.message}`)
    }
  }

  console.log('🎉 完了')
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
