"use client";

import { useState } from "react";
import { Loader2, ArrowRight, FileText, CheckCircle } from "lucide-react";

export default function NoteImporter() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ originalTitle: string; generatedContent: string } | null>(null);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/tools/note-import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to import note");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Import error:", error);
      alert("記事の取り込みに失敗しました。URLを確認してください。");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.generatedContent);
      alert("コピーしました！Sanityやブログ投稿画面に貼り付けてください。");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-zinc-900/50 rounded-2xl border border-white/5 backdrop-blur-md">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Note to Empire Converter</h2>
            <p className="text-xs text-zinc-500">noteの記事URLを入力すると、SRS99視点でHP用にリライトします。</p>
          </div>
        </div>

        <form onSubmit={handleImport} className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://note.com/ruitokurachi/n/..."
            className="flex-1 h-12 px-4 bg-black/40 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            required
          />
          <button
            type="submit"
            disabled={isLoading || !url}
            className="h-12 px-8 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Convert</span><ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        {result && (
          <div className="flex flex-col gap-4 animate-fade-in-up">
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg border border-white/5">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 uppercase tracking-widest">Original Title</span>
                <span className="text-sm font-bold text-white">{result.originalTitle}</span>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded hover:bg-emerald-500/20 transition-colors text-xs font-bold flex items-center gap-2"
              >
                <CheckCircle className="w-3 h-3" />
                Copy Markdown
              </button>
            </div>
            
            <div className="relative p-6 bg-black/40 rounded-xl border border-white/5 max-h-[500px] overflow-y-auto font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {result.generatedContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
