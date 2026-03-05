try {
  const packageJson = require('@pinecone-database/pinecone/package.json');
  console.log('Pinecone Version:', packageJson.version);
} catch (e) {
  console.error('Could not find Pinecone version:', e.message);
}
