"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { UltraCCardData } from "@/lib/markdown";

interface UltraCSectionProps {
  data: {
    srsDefinition: string;
    ultraCIntroTitle: string;
    ultraCIntroSubtitle: string;
    ultraCIntroMain: string;
    ultraCMainTitle: string;
    ultraCMainDescription: string;
    ultraCOutroTitle: string;
    ultraCOutroDescription: string;
    ultraCCards: UltraCCardData[];
  };
}

export default function UltraCSection({ data }: UltraCSectionProps) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const [debugScroll, setDebugScroll] = useState(0);
  const [phase, setPhase] = useState("待機");

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const p = Math.round(v * 100);
      setDebugScroll(p);
      if (p < 10) setPhase("背景のみ");
      else if (p < 30) setPhase("SRS出現");
      else if (p < 60) setPhase("説明文");
      else if (p < 70) setPhase("バトンタッチ");
      else if (p < 90) setPhase("横スクロール");
      else setPhase("次の章へ");
    });
  }, [scrollYProgress]);

  // 1. SRSタイトル：7%〜30% で拡大しながら表示
  const srsTitleOpacity = useTransform(scrollYProgress, [0.07, 0.1, 0.28, 0.3], [0, 1, 1, 0]);
  const srsTitleScale = useTransform(scrollYProgress, [0.07, 0.3], [1, 25]); // 0.5倍から25倍まで巨大化（ドーン！）
  
  // 拡大中は中央に固定するためのY軸補正（スクロール分を打ち消す）
  // stickyコンテナ内なので本来は固定されるはずだが、念のため明示的に固定
  const srsTitleY = useTransform(scrollYProgress, [0.07, 0.3], ["0%", "0%"]);

  // 2. 白背景と説明文：31%〜60% で表示
  // 白背景は少し早めに出現させて、文字が見える準備をする
  const whiteBgOpacity = useTransform(scrollYProgress, [0.28, 0.31, 0.6, 0.63], [0, 1, 1, 0]);
  
  // 説明文は白背景が完全に出てから表示
  const definitionTextOpacity = useTransform(scrollYProgress, [0.32, 0.35, 0.58, 0.61], [0, 1, 1, 0]);
  
  // 3. 横スクロール：70% から開始、90% で完結。
  // スマホなど画面幅が狭い場合、より多く移動する必要があるため -85% に設定
  const x = useTransform(scrollYProgress, [0.69, 0.7, 0.9], ["0%", "0%", "-85%"]);
  const scrollContentOpacity = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]);

  return (
    <section ref={targetRef} className="relative h-[1500vh] bg-transparent">
      {/* 強化デバッグ窓 - 一時的に可視化 */}
      {/* <div className="fixed top-32 left-4 z-[999] bg-black/80 text-white p-4 rounded-2xl border border-white/20 pointer-events-none font-mono shadow-2xl opacity-100 transition-opacity">
        <div className="text-2xl font-bold">SCROLL: {debugScroll}%</div>
        <div className="text-sm text-zinc-400 uppercase tracking-widest mt-1">Phase: {phase}</div>
      </div> */}

      {/* 白背景：z-20 - 30%〜65% の間だけ物理的に存在させる */}
      {debugScroll > 25 && debugScroll < 65 && (
        <motion.div 
          style={{ opacity: whiteBgOpacity }}
          className="absolute inset-0 bg-white z-20 pointer-events-none"
        />
      )}

      <div className="sticky top-0 flex h-screen items-center overflow-hidden z-20">
        
        {/* Layer 1: SRS Title (z-40) */}
        <motion.div 
          style={{ 
            opacity: srsTitleOpacity, 
            scale: srsTitleScale,
            y: srsTitleY
          }}
          className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
        >
          <h2 className="text-7xl sm:text-9xl font-black tracking-tighter text-white font-noto italic text-center">
            {data.ultraCIntroTitle}
          </h2>
        </motion.div>

        {/* Layer 2: Explanation Text (z-50) - 白背景(z-20)やタイトル(z-40)より手前に */}
        {debugScroll > 30 && debugScroll < 65 && (
          <motion.div 
            style={{ opacity: definitionTextOpacity }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 pointer-events-none"
          >
            <div className="max-w-5xl text-center flex flex-col gap-8">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-widest text-zinc-400 uppercase">
                {data.ultraCIntroSubtitle}
              </h2>
              {/* テキストの色を黒に強制指定して白背景での視認性を確保 */}
              <h3 className="text-6xl sm:text-8xl font-black tracking-tighter text-black font-noto">
                {data.ultraCIntroMain}
              </h3>
              <p className="text-xl sm:text-3xl text-zinc-600 leading-relaxed font-bold mt-4">
                {(data.srsDefinition || "").split("。").map((line, i) => (
                  <span key={i}>{line}{line && "。"}<br className="hidden sm:block" /></span>
                ))}
              </p>
              <div className="mt-12 flex flex-col items-center gap-2 animate-bounce opacity-30">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Scroll</span>
                <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}

        {/* Layer 3: Horizontal Scroll Cards (z-50) - 70% から出現、バッファを確保 */}
        {debugScroll > 68 && (
          <motion.div 
            style={{ x, opacity: scrollContentOpacity }} 
            className="flex gap-6 px-6 md:gap-12 md:px-12 items-center relative z-50"
          >
            <div className="flex h-[500px] w-[85vw] md:w-[600px] flex-col justify-center gap-6 shrink-0">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-7xl text-white font-noto leading-tight text-left">
                {data.ultraCMainTitle}
              </h2>
              <p className="text-lg text-zinc-400 mt-4 text-left">
                {data.ultraCMainDescription}
              </p>
            </div>

            {(data.ultraCCards || []).map((card) => (
              <div
                key={card.id}
                className={`group relative h-[450px] w-[80vw] md:h-[500px] md:w-[450px] overflow-hidden rounded-3xl border border-zinc-800 p-8 md:p-12 shrink-0 flex flex-col justify-between shadow-2xl ${card.color}`}
              >
                <div className="flex flex-col gap-4 md:gap-6 text-left">
                  <div className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-50">
                    {card.subtitle}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight font-noto">
                    {card.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed opacity-80">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex h-[500px] w-[80vw] md:w-[400px] flex-col justify-center gap-6 shrink-0 text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white font-noto leading-tight">
                {data.ultraCOutroTitle}
              </h2>
              <p className="text-base md:text-lg text-zinc-400">
                {data.ultraCOutroDescription}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
