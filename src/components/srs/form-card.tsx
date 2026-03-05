"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

type FormData = {
  pain: string;
  root: string;
  vision: string;
};

type FormCardProps = {
  onSubmit: (data: FormData) => void;
};

export default function FormCard({ onSubmit }: FormCardProps) {
  const [formData, setFormData] = useState<FormData>({
    pain: "",
    root: "",
    vision: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pain.trim()) return; // Pain is required
    
    setIsSubmitting(true);
    // Simulate a bit of "saving" feel
    setTimeout(() => {
      onSubmit(formData);
    }, 800);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-2xl shadow-zinc-200/50"
      >
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-zinc-900 mb-2">最後の思いを渡してください</h2>
          <p className="text-xs text-zinc-500 mb-4">
            より正確な診断のために、あなたの魂の思いが必要です。
          </p>
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-left">
            <p className="text-xs text-red-600 font-bold leading-relaxed">
              ※記述をしっかりしていただかないと正確な診断はできませんのでしっかりとご記入ください
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. 魂の叫び (Pain) - Required */}
          <div className="space-y-2">
            <label htmlFor="pain" className="block text-sm font-bold text-zinc-700">
              Q. 今、一番「苦しい」と感じていることは？ <span className="text-red-500">*</span>
            </label>
            <textarea
              id="pain"
              required
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm"
              placeholder="例：売上は上がったが、虚無感が消えない..."
              value={formData.pain}
              onChange={(e) => setFormData({ ...formData, pain: e.target.value })}
            />
          </div>

          {/* 2. 親との関係 (Root) - Optional */}
          <div className="space-y-2">
            <label htmlFor="root" className="block text-sm font-bold text-zinc-700">
              Q. 幼少期、ご両親との関係で「もっとこうして欲しかった」ことは？
            </label>
            <textarea
              id="root"
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm"
              placeholder="例：ただ「すごいね」と褒めて欲しかった..."
              value={formData.root}
              onChange={(e) => setFormData({ ...formData, root: e.target.value })}
            />
          </div>

          {/* 3. 理想の未来 (Vision) - Optional */}
          <div className="space-y-2">
            <label htmlFor="vision" className="block text-sm font-bold text-zinc-700">
              Q. もし何の制限もなかったら、どんな世界を作りたい？
            </label>
            <textarea
              id="vision"
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm"
              placeholder="例：誰もが自分の物語を生きられる世界..."
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.pain.trim()}
            className="w-full py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold shadow-lg shadow-zinc-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>解析中...</span>
              </>
            ) : (
              <>
                <span>診断結果を見る</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
