"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type EmailCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  srsData: string | null; // Base64 encoded data
};

export default function EmailCaptureModal({ isOpen, onClose, srsData }: EmailCaptureModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      // 1. Send to API (Capture Lead)
      const response = await fetch("/api/srs/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, srsData }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // 2. Redirect to Detail Page
      // URLエンコードを確実に行う (Base64内の + や / が壊れないように)
      const encodedData = encodeURIComponent(srsData || "");
      router.push(`/srs/result/detail?data=${encodedData}`);
      
    } catch (err) {
      console.error(err);
      setError("エラーが発生しました。もう一度お試しください。");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto z-50 w-full max-w-md h-fit p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors z-10"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>

              {/* Header Image/Gradient */}
              <div className="h-32 bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-md border border-amber-500/50">
                  <Lock className="w-8 h-8 text-amber-400" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">
                    詳細結果を受け取る
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-bold">
                    詳細レポートは、あなたの魂の深層に触れることになる、もしかするとあなたでも気づいていない情報がそこにあるかもしれません。<br/>
                    今すぐメールアドレスを入力して詳細レポートをお受け取りください。
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">
                      メールアドレス
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 font-bold text-center bg-red-50 py-2 rounded-lg">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-lg shadow-lg shadow-zinc-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>送信中...</span>
                      </>
                    ) : (
                      <>
                        <span>送信して今すぐ見る</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-zinc-400 mt-4">
                    ※ボタンを押すとすぐにブラウザ上で詳細結果が見れますが、入力されたアドレスにも診断結果が送信されます。<br/>
                    ※いつでも解除可能です。
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
