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
    const index = pinecone.index(PINECONE_INDEX_NAME);
    
    // Create a dummy vector of 768 dimensions
    const values = new Array(768).fill(0.1);
    
    const vector = {
      id: 'test-vector-1',
      values: values,
      metadata: {
        test: 'true'
      }
    };

    console.log('Pinecone path:', require.resolve('@pinecone-database/pinecone'));
    console.log('Vector structure:', JSON.stringify(vector).substring(0, 100) + '...');

    try {
      console.log('Attempting upsert with array...');
      await index.upsert([vector]);
      console.log('✅ Upsert successful!');
    } catch (e) {
      console.error('❌ Array upsert failed:', e.message);
      
      try {
        console.log('Attempting upsert with object { vectors: [...] }...');
        await index.upsert({ vectors: [vector] });
        console.log('✅ Object upsert successful!');
      } catch (e2) {
        console.error('❌ Object upsert failed:', e2.message);
        
        try {
           console.log('Attempting upsert with object { records: [...] }...');
           await index.upsert({ records: [vector] });
           console.log('✅ Records upsert successful!');
        } catch (e4) {
           console.error('❌ Records upsert failed:', e4.message);
        }
      }
    }

  } catch (error) {
    console.error('❌ Upsert failed:', error);
  }
}

main();
