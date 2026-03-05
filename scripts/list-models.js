const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function checkModels() {
  console.log("Checking available Gemini models with Tier 1 API Key...");
  
  // List of models to test (including experimental and pro versions)
  const candidates = [
    // Stable models
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    
    // Latest/Preview models
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash-latest",
    
    // Gemini 2.0 (Flash & Pro)
    "gemini-2.0-flash",
    "gemini-2.0-flash-exp",
    "gemini-2.0-pro-exp-02-05", // 最近出た2.0 Proの実験版

    // Gemini 3? (Experimental names)
    "gemini-3-pro-preview",
    "gemini-exp-1206", // 3 Pro相当と言われた実験モデル
    "gemini-experimental"
  ];

  for (const modelName of candidates) {
    try {
      process.stdout.write(`Testing ${modelName}... `);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello");
      console.log(`✅ Available`);
    } catch (error) {
      let msg = error.message;
      if (msg.includes("404")) msg = "404 Not Found";
      else if (msg.includes("400")) msg = "400 Bad Request";
      else if (msg.includes("403")) msg = "403 Forbidden";
      console.log(`❌ Failed (${msg})`);
    }
  }
}

checkModels();
