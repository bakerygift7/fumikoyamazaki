import pkg from '@pinecone-database/pinecone';
const { Pinecone } = pkg;
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config({ path: '.env.local' });

const PINECONE_API_KEY = process.env.PINECONE_API_KEY!;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

if (!PINECONE_API_KEY || !PINECONE_INDEX_NAME || !GEMINI_API_KEY) {
  console.error('❌ 環境変数が設定されていません。.env.local を確認してください。');
  process.exit(1);
}

// クライアントの初期化
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: 'models/gemini-embedding-001' });

// ターゲットディレクトリ
const TARGET_DIR = '/Users/kurachikanako/Dropbox/dropbox/levelplus/加奈子AIクローン/加奈子チャット用シックデータ';

async function main() {
  console.log('🚀 加奈子チャット用シックデータ → Pinecone 移植を開始します...');
  console.log(`📂 対象ディレクトリ: ${TARGET_DIR}`);

  const index = pinecone.index(PINECONE_INDEX_NAME);

  // 既存データを全削除（空でも無視）
  console.log('🗑️  既存データを全削除中...');
  try {
    await index.deleteAll();
    console.log('✅ 既存データ削除完了');
  } catch (e: any) {
    console.log(`⚠️  削除スキップ（おそらく空のインデックス）: ${e.message}`);
  }

  // ファイルの探索
  const files = glob.sync(`${TARGET_DIR}/**/*.md`);
  console.log(`📄 発見されたファイル数: ${files.length}`);

  let successCount = 0;
  let errorCount = 0;
  const BATCH_SIZE = 5;

  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batchFiles = files.slice(i, i + BATCH_SIZE);
    const vectors: any[] = [];

    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(files.length / BATCH_SIZE)}...`);

    for (const file of batchFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        if (!content.trim()) continue;

        const filename = path.basename(file);
        const relativePath = path.relative(TARGET_DIR, file);

        const result = await embeddingModel.embedContent({
          content: { role: 'user', parts: [{ text: content.substring(0, 9000) }] },
          outputDimensionality: 768,
        });
        const embedding = result.embedding?.values;

        if (!embedding || embedding.length === 0) {
          console.error(`  ⚠️ embedding 取得失敗: ${filename}`, JSON.stringify(result).substring(0, 200));
          errorCount++;
          continue;
        }

        const idHash = crypto.createHash('sha256').update(relativePath).digest('hex').substring(0, 16);
        vectors.push({
          id: `kanako-${idHash}`,
          values: embedding,
          metadata: {
            filename,
            path: relativePath,
            content: content.substring(0, 8000),
          },
        });
        console.log(`  ✅ ${filename}`);
      } catch (err: any) {
        console.error(`  ❌ ${path.basename(file)}: ${err.message}`);
        errorCount++;
      }
    }

    if (vectors.length > 0) {
      try {
        await index.upsert({ records: vectors });
        successCount += vectors.length;
        console.log(`  📌 Pinecone に ${vectors.length} 件登録完了`);
      } catch (err: any) {
        console.error('❌ Pinecone Upsert Error:', err.message);
        errorCount += vectors.length;
      }
    }

    // レート制限回避
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log('\n🎉 完了！');
  console.log(`✅ 成功: ${successCount} ファイル`);
  console.log(`❌ 失敗: ${errorCount} ファイル`);
}

main().catch(console.error);
