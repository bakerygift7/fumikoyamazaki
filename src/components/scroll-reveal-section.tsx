"use client";

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export default function ScrollRevealSection() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // フェーズ1: 文字がドーンと拡大表示 (5% → 30%)
  const mainTextOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.32, 0.42], [0, 1, 1, 0]);
  const mainTextScale = useTransform(scrollYProgress, [0.05, 0.42], [0.7, 20]);

  // フェーズ2: 解説テキスト (45% → 90%)
  const descOpacity = useTransform(scrollYProgress, [0.42, 0.52, 0.85, 0.95], [0, 1, 1, 0]);
  
  // 背景の巨大文字「自信」の動き (ゆっくり浮き上がる)
  const bgTextY = useTransform(scrollYProgress, [0.4, 0.9], [50, -50]);
  const bgTextOpacity = useTransform(scrollYProgress, [0.42, 0.55, 0.85, 0.95], [0, 0.08, 0.08, 0]);

  return (
    <section ref={targetRef} className="relative bg-[#f9f4f0]" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Phase 1: ドーンと拡大 */}
        <motion.div
          style={{ opacity: mainTextOpacity, scale: mainTextScale }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          {/* PC: 横書き */}
          <h2 className="hidden md:block px-6 text-center" style={{ fontFamily: "'Zen Old Mincho', serif", color: "#333333", lineHeight: 1.4, fontWeight: 700 }}>
            <span style={{ display: "block", fontSize: "clamp(1rem, 3vw, 2.5rem)", marginBottom: "0.5rem" }}>
              自分の自信のなさは、
            </span>
            <span style={{ display: "block", fontSize: "clamp(1.5rem, 5vw, 4rem)", color: "#d946a6" }}>
              自分のことが自分でわからないことに原因がある
            </span>
          </h2>

          {/* モバイル: 縦書き3列 */}
          <div className="flex md:hidden flex-row-reverse items-center justify-center gap-3">
            <div style={{ writingMode: "vertical-rl", fontFamily: "'Zen Old Mincho', serif", fontWeight: 700, fontSize: "clamp(1rem, 5vw, 1.6rem)", color: "#333333", lineHeight: 1.6, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
              自分の自信のなさは、
            </div>
            <div style={{ writingMode: "vertical-rl", fontFamily: "'Zen Old Mincho', serif", fontWeight: 700, fontSize: "clamp(1rem, 5vw, 1.6rem)", color: "#333333", lineHeight: 1.6, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
              自分のことが自分でわからないことに
            </div>
            <div style={{ writingMode: "vertical-rl", fontFamily: "'Zen Old Mincho', serif", fontWeight: 700, fontSize: "clamp(1.2rem, 6vw, 2rem)", color: "#d946a6", lineHeight: 1.6, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
              原因がある。
            </div>
          </div>
        </motion.div>

        {/* Phase 2: 解説テキスト (縦書き・和モダン) */}
        <motion.div
          style={{ opacity: descOpacity }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
           {/* 背景の巨大文字 */}
           <motion.div 
            style={{ y: bgTextY, opacity: bgTextOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span style={{
              fontFamily: "'Zen Old Mincho', serif",
              fontSize: "clamp(15rem, 40vw, 40rem)",
              fontWeight: 900,
              color: "#d946a6",
              lineHeight: 1,
              whiteSpace: "nowrap",
              writingMode: "vertical-rl",
              textOrientation: "upright",
              letterSpacing: "-0.1em"
            }}>
              自信
            </span>
          </motion.div>

          {/* メインテキスト（縦書き） */}
          <div
            className="pt-20 md:pt-0"
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "clamp(1rem, 4vw, 6rem)",
              height: "70vh",
              alignItems: "center",
              justifyContent: "center",
              writingMode: "vertical-rl",
              textOrientation: "upright",
              fontFamily: "'Zen Old Mincho', serif",
            }}>
            
            {/* 右側の強いメッセージ */}
            <div style={{ borderLeft: "1px solid #d946a6", paddingLeft: "clamp(1rem, 2vw, 2rem)" }}>
              <p style={{
                fontSize: "clamp(1.4rem, 2.5vw, 1.6rem)",
                fontWeight: 700,
                color: "#333333",
                lineHeight: 1.8,
                letterSpacing: "0.1em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}>
                「自分のことは<br/>
                自分でわからない」<br/>
                問題を克服し、<br/>
                自分のことを<br/>
                客観的に理解する。
              </p>
            </div>

            {/* 左側の解説メッセージ */}
            <div>
              <p style={{
                fontFamily: "'Zen Kaku Gothic New', sans-serif",
                fontSize: "clamp(1.1rem, 1.8vw, 1.1rem)",
                color: "#555",
                lineHeight: 2.2,
                letterSpacing: "0.05em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}>
                自分のことがわかると<br/>
                自然と自信になり、<br/>
                そうなった自分で<br/>
                お客さんに接すると<br/>
                自分主導のビジネスになる。
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
