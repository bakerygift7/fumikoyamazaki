"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function ScrollRevealSection() {
  return (
    <section className="relative py-32 bg-[#f9f4f0] overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* 背景の巨大文字「自信」（静止・極薄） */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 0.04, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <span style={{
          fontFamily: "'Zen Old Mincho', serif",
          fontSize: "clamp(15rem, 40vw, 40rem)",
          fontWeight: 900,
          color: "#d946a6",
          lineHeight: 1,
          writingMode: "vertical-rl",
          letterSpacing: "-0.1em",
        }}>
          自信
        </span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-20 md:gap-32">
          
          {/* Phase 1: 問題提起 (ドーンと表示) */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* PC: 横書き */}
            <h2 className="hidden md:block" style={{ fontFamily: "'Zen Old Mincho', serif", color: "#333333", lineHeight: 1.6, fontWeight: 700 }}>
              <span style={{ display: "block", fontSize: "clamp(1.2rem, 2.5vw, 2rem)", marginBottom: "1rem" }}>
                自分の自信のなさは、
              </span>
              <span style={{ display: "block", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#d946a6" }}>
                自分のことが自分でわからないことに<br />
                原因がある
              </span>
            </h2>

            {/* モバイル: 縦書き */}
            <div className="flex md:hidden flex-row-reverse items-center justify-center gap-4 h-[40vh]">
              <div style={{ writingMode: "vertical-rl", fontFamily: "'Zen Old Mincho', serif", fontWeight: 700, fontSize: "clamp(1rem, 5vw, 1.2rem)", color: "#333333", lineHeight: 1.6, letterSpacing: "0.1em" }}>
                自分の自信のなさは、
              </div>
              <div style={{ writingMode: "vertical-rl", fontFamily: "'Zen Old Mincho', serif", fontWeight: 700, fontSize: "clamp(1rem, 5vw, 1.2rem)", color: "#333333", lineHeight: 1.6, letterSpacing: "0.1em" }}>
                自分のことが自分でわからないことに
              </div>
              <div style={{ writingMode: "vertical-rl", fontFamily: "'Zen Old Mincho', serif", fontWeight: 700, fontSize: "clamp(1.4rem, 6vw, 1.8rem)", color: "#d946a6", lineHeight: 1.6, letterSpacing: "0.1em" }}>
                原因がある。
              </div>
            </div>
          </motion.div>

          {/* コネクター（線） */}
          <motion.div
            className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#d946a6] to-transparent"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          />

          {/* Phase 2: 解決策 (縦書き・和モダン) */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "clamp(1rem, 4vw, 4rem)",
              justifyContent: "center",
            }}>
              {/* 右グループ: 強いメッセージ */}
              <div style={{
                display: "flex",
                flexDirection: "row-reverse",
                gap: "clamp(0.5rem, 1.5vw, 1.5rem)",
                borderLeft: "1px solid #d946a6",
                paddingLeft: "clamp(1rem, 2vw, 2rem)",
              }}>
                {[
                  { text: "「自分のことは", color: "#333333" },
                  { text: "自分でわからない」", color: "#333333" },
                  { text: "問題を克服し、", color: "#333333" },
                  { text: "自分のことを", color: "#d946a6" },
                  { text: "客観的に理解する。", color: "#d946a6" },
                ].map((col, i) => (
                  <motion.div 
                    key={i} 
                    style={{
                      writingMode: "vertical-rl",
                      fontFamily: "'Zen Old Mincho', serif",
                      fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                      fontWeight: 700,
                      color: col.color,
                      lineHeight: 1.8,
                      letterSpacing: "0.1em",
                      whiteSpace: "nowrap",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 + (i * 0.1) }}
                  >
                    {col.text}
                  </motion.div>
                ))}
              </div>

              {/* 左グループ: 解説メッセージ */}
              <div style={{
                display: "flex",
                flexDirection: "row-reverse",
                gap: "clamp(0.5rem, 1.5vw, 1.5rem)",
              }}>
                {[
                  "自分のことがわかると",
                  "自然と自信になり、",
                  "そうなった自分で",
                  "自分主導のビジネスへ。",
                ].map((text, i) => (
                  <motion.div 
                    key={i} 
                    style={{
                      writingMode: "vertical-rl",
                      fontFamily: "'Zen Kaku Gothic New', sans-serif",
                      fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                      color: "#666",
                      lineHeight: 2,
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.2 + (i * 0.1) }}
                  >
                    {text}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
