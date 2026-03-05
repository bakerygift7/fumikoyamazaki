"use client";

import { useState } from "react";
import { Search, Loader2, FileText, ArrowRight } from "lucide-react";

type SearchResult = {
  score: number;
  filename: string;
  path: string;
  content: string;
};

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResults([]);
    setAnswer(null);
    setHasSearched(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setResults(data.results || []);
      setAnswer(data.answer || null);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
        
        <form onSubmit={handleSearch} className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="類人AIに質問する（例：イザナギとイザナミの神話について）"
            className="w-full h-14 pl-12 pr-4 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-xl"
          />
          <Search className="absolute left-4 w-5 h-5 text-zinc-500" />
          
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 h-10 px-4 bg-white text-black rounded-lg text-sm font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>ASK</span>
                <ArrowRight className="w-3 h-3" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {(hasSearched || results.length > 0) && (
        <div className="mt-8 space-y-8 animate-fade-in-up">
          
          {/* AI Answer */}
          {answer && (
            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-700 to-black flex items-center justify-center border border-white/10">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white tracking-wide">SHAKTI</span>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">Deep Reasoning Mode</span>
                </div>
              </div>
              <div className="prose prose-invert prose-sm max-w-none text-zinc-300 leading-relaxed whitespace-pre-wrap font-medium">
                {answer}
              </div>
            </div>
          )}

          {/* Source Documents (Collapsed or less prominent) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600 mb-4 px-2">
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              Reference Memories ({results.length})
            </div>

            {results.length === 0 && !isLoading && !answer ? (
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 text-center text-sm">
                関連する記憶が見つかりませんでした。
              </div>
            ) : (
              <div className="grid gap-3 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {results.slice(0, 3).map((result, index) => (
                  <div
                    key={index}
                    className="group relative p-4 rounded-lg bg-zinc-950/50 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-mono">
                        <FileText className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">{result.filename}</span>
                      </div>
                      <div className="text-zinc-700 text-[10px] font-mono">
                        {(result.score * 100).toFixed(0)}%
                      </div>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                      {result.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
