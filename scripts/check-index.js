const { Pinecone } = require('@pinecone-database/pinecone');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

if (!PINECONE_API_KEY || !PINECONE_INDEX_NAME) {
  console.error('❌ 環境変数が設定されていません。');
  process.exit(1);
}

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });

async function main() {
  try {
    console.log(`Checking index: ${PINECONE_INDEX_NAME}`);
    const index = pinecone.index(PINECONE_INDEX_NAME);
    const stats = await index.describeIndexStats();
    console.log('Index Stats:', JSON.stringify(stats, null, 2));
    
    // Also try to get the index description to see dimension
    const description = await pinecone.describeIndex(PINECONE_INDEX_NAME);
    console.log('Index Description:', JSON.stringify(description, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
