"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Send, Bot, User, Heart, Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "article_draft";
};

export default function KanakoChat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "こんにちは。加奈子です。\nあなたが今、言葉にできなくて苦しんでいる想いは何ですか？\nnoteのURLや、書きかけの文章を教えてください。一緒に読者さんが涙する記事に変えましょう。" 
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
      const response = await fetch("/api/tools/kanako-chat", {
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
      setMessages(prev => [...prev, { role: "assistant", content: "ごめんなさい、声が届かなかったみたい。もう一度教えてくれる？" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[85vh] flex flex-col bg-white/90 rounded-2xl border border-pink-100 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-orange-50 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/20">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">シャーマンライティング</h2>
          <p className="text-xs text-gray-500">インドラシステムAI (VISHNU EMOTION)</p>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`
              h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm
              ${msg.role === "assistant" ? "bg-pink-100 text-pink-500" : "bg-gray-100 text-gray-600"}
            `}>
              {msg.role === "assistant" ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            
            <div className={`
              max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md
              ${msg.role === "assistant" 
                ? "bg-white border border-pink-50 text-gray-700" 
                : "bg-gradient-to-br from-pink-500 to-orange-400 text-white"}
              ${msg.type === "article_draft" ? "font-serif bg-orange-50 border-orange-200 text-gray-800" : ""}
            `}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-pink-50 flex items-center justify-center shrink-0 animate-pulse">
              <Heart className="w-4 h-4 text-pink-300" />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
              心に寄り添っています... <Loader2 className="w-3 h-3 animate-spin text-pink-400" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-pink-100">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力... (noteのURLもここに)"
            className="flex-1 h-14 pl-6 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
