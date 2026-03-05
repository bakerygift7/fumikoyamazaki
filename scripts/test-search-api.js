const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function testSearch() {
  const query = "イザナギとイザナミの神話について";
  
  console.log(`🔍 Testing Search API with query: "${query}"`);
  console.log('Target URL: http://localhost:3000/api/search');

  try {
    const response = await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('\n✅ Search Results:');
    
    if (data.results && data.results.length > 0) {
      data.results.forEach((result, index) => {
        console.log(`\n[${index + 1}] Score: ${result.score}`);
        console.log(`File: ${result.filename}`);
        console.log(`Path: ${result.path}`);
        console.log(`Content Preview: ${result.content.substring(0, 100).replace(/\n/g, ' ')}...`);
      });
    } else {
      console.log('No results found.');
    }

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    console.log('💡 Hint: Make sure the Next.js server is running (npm run dev)');
  }
}

testSearch();
