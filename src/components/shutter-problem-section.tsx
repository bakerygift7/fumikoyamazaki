"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ShutterProblemSection() {
  const shutterTransition = {
    duration: 1.8,
    ease: [0.16, 1, 0.3, 1],
    delay: 1.2
  };

  const contentTransition = {
    duration: 1.2,
    ease: "easeOut",
    delay: 1.6
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#faf8f5]">

      {/* ── 1. 観音開きが開いた後に現れるコンテンツ ── */}
      <motion.div
        className="w-full h-full relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={contentTransition}
      >
        <div className="grid md:grid-cols-2 min-h-[100vh]">

          {/* 左半分：トレーナー写真 ＋ 悩みリスト */}
          <div className="relative overflow-hidden min-h-[60vh] md:min-h-[100vh]">
            {/* 背景写真 */}
            <Image
              src="/images/problem-trainer.png"
              alt="悩めるトレーナー"
              fill
              className="object-cover object-center"
              priority
            />
            {/* 写真の右側グラデーション（右テキストとの境界をなじませる） */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-[#faf8f5]/60" />
            {/* 下部グラデーション（リスト読みやすさのため） */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* 悩みリスト（写真の下半分に重ねる） */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 space-y-5">
              <span className="text-rose-300 font-bold tracking-[0.3em] text-xs uppercase flex items-center gap-2">
                <span className="w-6 h-[1px] bg-rose-300"></span>
                Problem
              </span>
              <ul className="space-y-4">
                {[
                  "トレーナーとして肉体労働をベースにしていつまで続けられるのだろう？",
                  "がむしゃらに肉体労働を増やしても収入に限界がある",
                  "一生懸命になろうとすればするほど空回りする",
                  "自信がなく、いつもお客さんに迎合してしまう",
                  "どうしてもビジネスが低単価になり、お客さんの言いなりになってしまう"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.0 + i * 0.1 }}
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-300 shrink-0" />
                    <span className="text-white/90 text-sm md:text-base leading-relaxed font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* 右半分：テクスチャ ＋ メッセージ */}
          <div className="relative flex items-center justify-center p-10 md:p-16 min-h-[60vh] md:min-h-[100vh]">
            {/* 背景テクスチャ */}
            <Image
              src="/images/problem-texture.png"
              alt=""
              fill
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-[#faf8f5]/70" />

            {/* テキストコンテンツ */}
            <div className="relative z-10 space-y-12 max-w-md">
              <div className="space-y-5">
                <p className="text-xs text-rose-400 font-bold tracking-[0.4em] uppercase">The Real Cause</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl leading-snug font-bold text-slate-800 font-mincho">
                  その悩みは、あなたの<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
                    スキルや資格が<br />足りないから
                  </span><br />
                  ではありません。
                </h2>
              </div>

              <div className="border-l-2 border-rose-300 pl-6 space-y-3">
                <p className="text-slate-500 text-lg font-medium">ただ、</p>
                <p className="text-rose-600 font-bold text-2xl md:text-3xl font-mincho leading-snug">
                  「自分のことが<br/>自分でわからない」
                </p>
                <p className="text-slate-600 text-lg font-medium">だけなのです。</p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* ── 2. 左のシャッター（観音開き） ── */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-slate-900 z-30 border-r border-slate-800"
        initial={{ x: "0%" }}
        whileInView={{ x: "-100%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={shutterTransition}
      >
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-rose-500/50 to-transparent opacity-50" />
      </motion.div>

      {/* ── 3. 右のシャッター（観音開き） ── */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-slate-900 z-30 border-l border-slate-800"
        initial={{ x: "0%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={shutterTransition}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-rose-500/50 to-transparent opacity-50" />
      </motion.div>

      {/* ── 4. シャッター上のタイトル（フェードアウト） ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center pointer-events-none mix-blend-difference text-white w-full"
        initial={{ opacity: 1, scale: 1 }}
        whileInView={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeIn", delay: 0.8 }}
      >
        <p className="text-rose-400 tracking-[0.5em] font-bold mb-6 text-sm md:text-base uppercase">Problem</p>
        <h2 className="font-mincho text-4xl md:text-7xl font-bold tracking-wide leading-tight">
          こんな悩みは<br />
          ありませんか？
        </h2>
        <div className="w-[1px] h-24 bg-rose-400 mx-auto mt-12 animate-pulse" />
      </motion.div>

    </section>
  );
}
