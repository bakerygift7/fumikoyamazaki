const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
const dotenv = require("dotenv");

// 環境変数の読み込み
const envPath = path.resolve(process.cwd(), ".env");
console.log(`Loading .env from: ${envPath}`);
dotenv.config({ path: envPath });

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("❌ GOOGLE_API_KEY not found in .env");
  process.exit(1);
}

async function listModels() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  try {
    console.log("🔍 Fetching available models...");
    // listModels() はページネーションされたレスポンスを返す可能性があるが、
    // SDKの仕様によっては直接配列を返すこともある。まずはシンプルに呼ぶ。
    // 最新SDKでは genAI.getGenerativeModel... ではなく、genAIManager的なものが必要かもしれないが、
    // まずは基本的なアプローチで試す。
    
    // 実際には listModels は GoogleGenerativeAI クラスのメソッドではなく、
    // GoogleAIFileManager などの別クラスか、あるいは直接 fetch する必要がある場合が多い。
    // しかし、最新SDKには `getGenerativeModel` しかない場合もある。
    
    // ここでは、あえて「モデル名指定エラー」のメッセージからヒントを得るため、
    // 存在しないモデルを叩いてエラーメッセージ内の「利用可能なモデル一覧」を引き出すという
    // ハッカー的な手法（Error Driven Discovery）も視野に入れるが、
    // まずは正攻法でいく。
    
    // 残念ながら @google/generative-ai SDKには listModels メソッドがトップレベルに露出していないことが多い。
    // そのため、fetch で直接 REST API を叩くのが確実だ。
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
      console.log("\n✅ Available Models:");
      const embeddingModels = data.models.filter(m => m.name.includes("embedding"));
      
      console.log("\n--- Embedding Models ---");
      embeddingModels.forEach(m => {
        console.log(`- ${m.name}`);
        console.log(`  Supported methods: ${m.supportedGenerationMethods}`);
      });

      console.log("\n--- Other Models (Top 5) ---");
      data.models.filter(m => !m.name.includes("embedding")).slice(0, 5).forEach(m => {
        console.log(`- ${m.name}`);
      });
    } else {
      console.log("❌ No models found or API error:", data);
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

listModels();
