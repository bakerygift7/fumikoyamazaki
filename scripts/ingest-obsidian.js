const { Pinecone } = require('@pinecone-database/pinecone');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

console.log('🔄 スクリプトを初期化中... [JS版]');

// 環境変数の読み込み
const envPath = path.resolve(__dirname, '../.env.local');
console.log(`env path: ${envPath}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ .envファイルの読み込みに失敗しました:', result.error);
}

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;

if (!PINECONE_API_KEY || !PINECONE_INDEX_NAME || !GEMINI_API_KEY) {
  console.error('❌ 環境変数が設定されていません。');
  console.error(`PINECONE_API_KEY: ${!!PINECONE_API_KEY ? 'OK' : 'Missing'}`);
  console.error(`PINECONE_INDEX_NAME: ${!!PINECONE_INDEX_NAME ? 'OK' : 'Missing'}`);
  console.error(`GOOGLE_API_KEY: ${!!GEMINI_API_KEY ? 'OK' : 'Missing'}`);
  process.exit(1);
}

// クライアントの初期化
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// モデル名: models/gemini-embedding-001 (check-models.jsで存在確認済み)
const embeddingModel = genAI.getGenerativeModel({ model: "models/gemini-embedding-001" });

// ターゲットディレクトリ
const TARGET_DIR = '/Users/kurachikanako/Dropbox/dropbox/levelplus/加奈子AIクローン';

async function main() {
  console.log('🚀 全脳移植（Obsidian → Pinecone）を開始します...');
  console.log(`📂 対象ディレクトリ: ${TARGET_DIR}`);

  const index = pinecone.index(PINECONE_INDEX_NAME);

  // ファイル探索
  const files = glob.sync(`${TARGET_DIR}/**/*.md`);
  console.log(`📄 発見されたファイル数: ${files.length}`);

  if (files.length === 0) {
    console.warn('⚠️ ファイルが見つかりませんでした。');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  const BATCH_SIZE = 5;
  
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batchFiles = files.slice(i, i + BATCH_SIZE);
    const vectors = [];

    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(files.length / BATCH_SIZE)}...`);

    // 並列処理だとレート制限にかかりやすいので、直列に近い形で処理
    for (const file of batchFiles) {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        if (!content.trim()) continue;

        const filename = path.basename(file);
        const relativePath = path.relative(TARGET_DIR, file);

        // ベクトル化
        // outputDimensionality: 768 を指定して次元数を合わせる (text-embedding-004は768次元)
        const result = await embeddingModel.embedContent({
          content: { role: 'user', parts: [{ text: content.substring(0, 9000) }] },
          outputDimensionality: 768
        });
        
        const embedding = result.embedding.values;

        if (!embedding) {
            console.warn(`⚠️ No embedding for ${filename}`);
            continue;
        }

        // IDを安全にする
        const safeId = Buffer.from(relativePath).toString('base64').replace(/=/g, '');

        vectors.push({
          id: safeId,
          values: embedding,
          metadata: {
            filename: filename,
            path: relativePath,
            content: content.substring(0, 30000)
          }
        });
        
        // 短いウェイト
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
        errorCount++;
      }
    }

    if (vectors.length > 0) {
      try {
        // Pinecone v3 は配列を直接渡すのが基本だが、v2互換で { records: ... } もあるかも
        // まずは配列渡しを試す
        await index.upsert(vectors);
        successCount += vectors.length;
        console.log(`✅ Upserted ${vectors.length} vectors.`);
      } catch (err) {
        console.warn('⚠️ Upsert failed with array, trying object format...');
        try {
            await index.upsert({ records: vectors }); // v2 style or specific v3 style?
            successCount += vectors.length;
            console.log(`✅ Upserted ${vectors.length} vectors (records format).`);
        } catch (err2) {
             console.error('❌ Pinecone Upsert Error:', err.message);
             errorCount += vectors.length;
        }
      }
    }
    
    // レート制限回避
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('🎉 全脳移植完了！');
  console.log(`✅ 成功: ${successCount} ファイル`);
  console.log(`❌ 失敗: ${errorCount} ファイル`);
}

main().catch((err) => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
