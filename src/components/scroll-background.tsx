"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll();

  // 背景色の変化を「劇的」に。
  // 0 (トップ): 漆黒 (#000000)
  // 0.3 (MISSION): はっきりとわかる濃紺 (#0f172a)
  // 0.6 (ULTRA C): 視認性の高いチャコールグレー (#27272a)
  // 0.8 (ARCHITECTS): 深みのあるワインレッド/パープル系 (#2e1065)
  // 1.0 (FOOTER): 漆黒 (#000000)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.8, 1],
    ["#000000", "#0f172a", "#27272a", "#2e1065", "#000000"]
  );

  return (
    <motion.div 
      style={{ backgroundColor }} 
      className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-300"
    />
  );
}
