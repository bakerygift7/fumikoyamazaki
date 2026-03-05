"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

export default function ScrollBackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll();

  // スクロール位置に応じて背景色を変化させる
  // 0 (トップ): 漆黒 (#000000)
  // 0.3 (MISSION): 深海紺 (#0a0a2e)
  // 0.6 (ARCHITECTS): 深い灰色 (#18181b)
  // 1.0 (FOOTER): 再び漆黒 (#000000)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#000000", "#0a0a2e", "#18181b", "#000000"]
  );

  return (
    <motion.div style={{ backgroundColor }} className="transition-colors duration-700">
      {children}
    </motion.div>
  );
}
