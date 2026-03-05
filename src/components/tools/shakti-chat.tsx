"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Send, Bot, User, FileText, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "article_draft";
};

export default function ShaktiChat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "こんにちは。類人です。noteの記事のURL、または書かれた記事をここに入力して始めてください。一緒に神話ライティングで書かれた記事に変えましょう！" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/tools/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages 
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply, type: data.type }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "すまない、通信が途切れたようだ。もう一度言ってくれるか？" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[85vh] flex flex-col bg-zinc-950/80 rounded-2xl border border-white/5 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/5 bg-black/40 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">神話ストーリーライティング</h2>
          <p className="text-xs text-zinc-500">インドラシステムAI (SHAKTI EMOTION)</p>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`
              h-8 w-8 rounded-full flex items-center justify-center shrink-0
              ${msg.role === "assistant" ? "bg-zinc-800 text-emerald-400 border border-white/5" : "bg-white text-black"}
            `}>
              {msg.role === "assistant" ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            
            <div className={`
              max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
              ${msg.role === "assistant" 
                ? "bg-zinc-900 border border-white/5 text-zinc-300 shadow-md" 
                : "bg-gradient-to-br from-zinc-700 to-zinc-800 text-white shadow-lg"}
              ${msg.type === "article_draft" ? "font-mono bg-black/60 border-emerald-500/30 text-emerald-100" : ""}
            `}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4 text-zinc-600" />
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 py-2">
              思考中... <Loader2 className="w-3 h-3 animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/5">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力... (noteのURLもここに)"
            className="flex-1 h-14 pl-6 pr-12 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
