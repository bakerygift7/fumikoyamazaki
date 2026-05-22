"use client";

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ShutterProblemSection from '@/components/shutter-problem-section'
import ScrollRevealSection from '@/components/scroll-reveal-section'
import Footer from '@/components/footer'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { CheckCircle2, Search, Brain, Lightbulb } from 'lucide-react'

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  
  // スクロールパララックス
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // マウスパララックス
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // パララックス効果
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ["2%", "-2%"]);
  const bgMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ["2%", "-2%"]);

  const personY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const personMouseX = useTransform(smoothMouseX, [-0.5, 0.5], ["1%", "-1%"]);
  const personMouseY = useTransform(smoothMouseY, [-0.5, 0.5], ["1%", "-1%"]);

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen font-gothic text-charcoal bg-offwhite overflow-x-hidden">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        
        {/* Layer 1: 最背面背景 */}
        <motion.div 
          style={{ y: bgY, x: bgMouseX, translateY: bgMouseY, scale: 1.1 }}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/haikei.jpg"
            alt="Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-pink-50/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
        </motion.div>

        {/* Layer 2: Ethereal Orbs (光のオーブ) - シャンパン＆オーロラカラーに変更 */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
           {/* 1. 左上: ソフトなローズ（優しさ） */}
           <motion.div 
             className="absolute top-[5%] left-[5%] w-[700px] h-[700px] rounded-full bg-rose-200/30 blur-[100px] mix-blend-multiply"
             style={{
               x: useTransform(smoothMouseX, [-0.5, 0.5], ["-30px", "30px"]),
               y: useTransform(smoothMouseY, [-0.5, 0.5], ["-30px", "30px"]),
             }}
           />
           {/* 2. 右下: シャンパンゴールド（知性・高級感） */}
           <motion.div 
             className="absolute bottom-[-10%] right-[10%] w-[900px] h-[900px] rounded-full bg-amber-100/40 blur-[120px] mix-blend-multiply"
             style={{
               x: useTransform(smoothMouseX, [-0.5, 0.5], ["40px", "-40px"]),
               y: useTransform(smoothMouseY, [-0.5, 0.5], ["40px", "-40px"]),
             }}
           />
           
           {/* 3. 右上: 淡いラベンダー（透明感・アクセント） */}
           <motion.div 
             className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-100/40 blur-[80px] mix-blend-overlay"
             style={{
               x: useTransform(smoothMouseX, [-0.5, 0.5], ["-60px", "60px"]),
               y: useTransform(smoothMouseY, [-0.5, 0.5], ["-60px", "60px"]),
             }}
           />
        </div>

        {/* Layer 3: 光の粒子 (中層) - 数を倍増・サイズアップ */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white/70 blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.6)]"
              style={{
                width: Math.random() * 12 + 6 + 'px', // 6px 〜 18px に大型化
                height: Math.random() * 12 + 6 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                x: useTransform(smoothMouseX, [-0.5, 0.5], [`${Math.random() * 60 - 30}px`, `${Math.random() * -60 + 30}px`]),
                y: useTransform(smoothMouseY, [-0.5, 0.5], [`${Math.random() * 60 - 30}px`, `${Math.random() * -60 + 30}px`]),
              }}
              animate={{
                y: [0, -300], // 移動距離も長く
                opacity: [0, 0.9, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 15, // ゆっくり優雅に
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>

        {/* Layer 4: 人物写真 */}
        <motion.div 
          style={{ y: personY, x: personMouseX, translateY: personMouseY }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 right-0 z-20 hidden md:flex items-end justify-end h-full w-1/2 pr-12 pb-12 pointer-events-none"
        >
          {/* 背面の装飾レイヤー（さらに深い視差） */}
          <motion.div 
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]),
              x: useTransform(smoothMouseX, [-0.5, 0.5], ["3%", "-3%"]) 
            }}
            className="absolute bottom-[15%] right-[15%] w-[320px] lg:w-[380px] aspect-[1000/1096] bg-gradient-to-br from-rose-100/40 to-amber-100/40 rounded-[3rem] blur-2xl -z-10"
          />

          {/* 背面：装飾的な枠線レイヤー */}
          <motion.div 
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], ["0%", "5%"]),
              x: useTransform(smoothMouseX, [-0.5, 0.5], ["2%", "-2%"]) 
            }}
            className="absolute bottom-12 right-10 w-[340px] lg:w-[400px] aspect-[1000/1096] border-2 border-rose-200/50 rounded-[3rem] -rotate-3 -z-10"
          />

          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[420px] lg:w-[500px] aspect-[1000/1096]"
          >
            <Image
              src="/images/fumi.png"
              alt="Fumiko Yamazaki"
              fill
              className="object-contain object-center"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Layer 5: テキスト */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="container mx-auto px-6 relative z-30 flex flex-col md:flex-row items-center h-full justify-between"
        >
          <div className="flex flex-col justify-center items-start space-y-8 max-w-2xl md:pl-12 pt-24 md:pt-0">
            <div className="space-y-2">
              <p className="font-gothic text-sm md:text-base text-amber-700 tracking-[0.3em] font-bold flex items-center gap-2">
                <span className="w-8 h-[1px] bg-amber-700"></span>
                運動指導者育成コーチ 山﨑史子
              </p>
            </div>
            
            <h1 className="font-mincho text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide text-slate-800">
              <span className="block mb-2 drop-shadow-sm relative w-fit overflow-hidden">
                自分のことをわかれば
                {/* 光の線のアニメーション */}
                <motion.div
                  className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
                  initial={{ left: '-100%' }}
                  animate={{ left: '200%' }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 3,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-600 to-rose-500 pb-2">
                運動系指導者は<br />もっと輝ける
              </span>
            </h1>
            
            <p className="font-gothic text-base md:text-xl text-slate-600 leading-relaxed max-w-xl">
              いつも自信がなくてお客さんに合わせてばかりいませんか？<br />
              自分の自信のなさは、自分のことが自分でわかっていないから来てるのかもしれません。
            </p>
            
            <div className="pt-6">
              <Link 
                href="#ebook" 
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.6)] transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12 origin-left" />
                <span className="tracking-widest relative z-10">小冊子を無料で受け取る</span>
                <motion.span 
                  className="ml-3 relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2 h-full" />
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-pink-400 z-40"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* 2. Problem Section (Shutter Reveal) */}
      <ShutterProblemSection />

      {/* 3. Concept Section (Scroll Reveal) */}
      <div className="py-20 bg-offwhite text-center">
        <h2 className="font-mincho text-3xl md:text-5xl font-bold text-charcoal mb-4 tracking-widest">解決の鍵</h2>
        <p className="text-pink-600 tracking-[0.4em] font-bold text-sm">CONCEPT</p>
      </div>
      <ScrollRevealSection />

      <section className="py-32 bg-[#fffaf5] relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            
            {/* 画像エリア */}
            <div className="w-full md:w-1/2 relative order-2 md:order-1">
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                {/* 画像背面の装飾 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 to-amber-100 rounded-[3rem] transform rotate-3 scale-95 opacity-60" />
                <div className="absolute inset-0 border-2 border-rose-200 rounded-[3rem] transform -rotate-2 scale-105" />
                
                {/* 画像本体 */}
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
                   <Image
                     src="/images/fumi-profile-sticks.png"
                     alt="山﨑史子"
                     fill
                     className="object-cover object-top"
                   />
                </div>
                
                {/* 装飾的な引用符 */}
                <div className="absolute -top-8 -left-8 text-8xl text-rose-200 font-serif opacity-50 leading-none">❝</div>
                <div className="absolute -bottom-12 -right-8 text-8xl text-rose-200 font-serif opacity-50 leading-none">❞</div>
              </div>
            </div>

            {/* テキストエリア */}
            <div className="w-full md:w-1/2 space-y-10 order-1 md:order-2">
              <div className="space-y-6">
                <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase">
                  Message
                </span>
                <h3 className="font-mincho text-3xl lg:text-4xl font-bold leading-relaxed text-slate-800">
                  私は自分に自信をつけ、<br/>
                  生徒さん主導ではなく、<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-600">
                    あなた主導の運動指導者
                  </span>に<br/>
                  なってもらいたい
                </h3>
              </div>

              <div className="space-y-6 text-slate-600 leading-loose text-lg font-gothic">
                <p>
                  私自身、指導者を16年続けてきましたが、資格をたくさん取ったり技術を磨いたりしても、いつまで経っても自信のなさは消えませんでした。しかし、ある時気づきました。
                </p>
                <div className="relative mt-8 mb-4 max-w-lg mx-auto md:mx-0">
                   {/* 背景の傾いたレイヤー（左の画像とリンクさせる） */}
                   <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-amber-50 rounded-[2.5rem] transform rotate-2 translate-y-2 opacity-60" />
                   
                   {/* メインの白いカード */}
                   <div className="relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-rose-100 flex items-center justify-center">
                     <p className="text-slate-800 font-bold text-xl md:text-2xl leading-relaxed font-mincho text-center">
                       「自分の自信のなさは、<br/>
                       <span className="inline-block bg-gradient-to-r from-rose-100/0 via-rose-100 to-rose-100/0 px-4 py-1 my-1 rounded-full">自分のことが自分でわからない</span><br/>
                       ことに原因がある」
                     </p>
                   </div>
                </div>
                <p>
                  苦労して自分のこと、弱さ、強さ、そして人から見た魅力を理解した時、自然と自信がつき、お客さんに対しての態度と指導方法、客単価も劇的に変わっていきました。
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. Method Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* 背景の装飾 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-rose-50 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-50 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-mincho text-3xl md:text-5xl font-bold text-slate-800 mb-6 tracking-wide">
              指導者として輝くための<br className="md:hidden" />3ステップ
            </h2>
            <p className="text-amber-600 font-gothic tracking-[0.4em] font-bold text-sm uppercase">Method</p>
            <div className="w-12 h-[2px] bg-gradient-to-r from-rose-400 to-amber-400 mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Step 1 */}
            <div className="group relative bg-white p-10 pt-16 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(244,63,94,0.1)] transition-all duration-500 border border-slate-50 overflow-hidden">
              {/* 背景の数字 - 中央に巨大配置 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="text-[240px] font-serif leading-none text-rose-50/40 select-none transform translate-y-16 group-hover:scale-110 transition-transform duration-700 font-medium">1</span>
              </div>
              
              {/* アイコンエリア - 写真に変更 */}
              <div className="relative mb-10 mx-auto w-28 h-28">
                {/* 装飾的な円（ゆっくり回転） */}
                <div className="absolute inset-0 rounded-full border-[3px] border-rose-300 border-dashed animate-[spin_20s_linear_infinite] opacity-80" />
                <div className="absolute inset-3 rounded-full border border-amber-50 opacity-80" />
                
                {/* 中央の画像コンテナ */}
                <div className="absolute inset-2 rounded-full overflow-hidden z-10 group-hover:-translate-y-1 transition-transform duration-500">
                  <Image
                    src="/images/fumi-navy.png"
                    alt="認識する"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="relative z-10 text-center">
                <p className="text-amber-500 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4">Step 01</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 font-mincho text-slate-800">認識する</h3>
                
                <p className="text-slate-600 leading-loose text-base md:text-lg font-gothic text-justify px-4">
                  自信のなさ、お客さんに迎合してしまうのは、自分自身の自信のなさから来ていることを認識する。
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-white p-10 pt-16 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(244,63,94,0.1)] transition-all duration-500 border border-slate-50 overflow-hidden md:translate-y-12">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="text-[240px] font-serif leading-none text-rose-50/40 select-none transform translate-y-16 group-hover:scale-110 transition-transform duration-700 font-medium">2</span>
              </div>
              
              <div className="relative mb-10 mx-auto w-28 h-28">
                <div className="absolute inset-0 rounded-full border-[3px] border-rose-300 border-dashed animate-[spin_20s_linear_infinite] opacity-80" style={{ animationDirection: 'reverse' }} />
                <div className="absolute inset-3 rounded-full border border-amber-50 opacity-80" />
                
                <div className="absolute inset-2 rounded-full overflow-hidden z-10 group-hover:-translate-y-1 transition-transform duration-500">
                  <Image
                    src="/images/fumi-pointing.png"
                    alt="客観的に理解する"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="relative z-10 text-center">
                <p className="text-amber-500 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4">Step 02</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 font-mincho text-slate-800">客観的に理解する</h3>
                
                <p className="text-slate-600 leading-loose text-base md:text-lg font-gothic text-justify px-4">
                  「自分のことは自分でわからない」問題を克服し、自分のことを客観的に理解する。
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-white p-10 pt-16 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(244,63,94,0.1)] transition-all duration-500 border border-slate-50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="text-[240px] font-serif leading-none text-rose-50/40 select-none transform translate-y-16 group-hover:scale-110 transition-transform duration-700 font-medium">3</span>
              </div>
              
              <div className="relative mb-10 mx-auto w-28 h-28">
                <div className="absolute inset-0 rounded-full border-[3px] border-rose-300 border-dashed animate-[spin_20s_linear_infinite] opacity-80" />
                <div className="absolute inset-3 rounded-full border border-amber-50 opacity-80" />
                
                <div className="absolute inset-2 rounded-full overflow-hidden z-10 group-hover:-translate-y-1 transition-transform duration-500">
                  <Image
                    src="/images/fumi-smile.png"
                    alt="自分主導へ"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="relative z-10 text-center">
                <p className="text-amber-500 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4">Step 03</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 font-mincho text-slate-800">自分主導へ</h3>
                
                <p className="text-slate-600 leading-loose text-base md:text-lg font-gothic text-justify px-4">
                  自分のことがわかると自然と自信になり、そうなった自分で接することで、自分主導のビジネスになる。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Service Section */}
      <section className="py-32 bg-pink-50/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="font-mincho text-3xl md:text-5xl font-bold text-charcoal mb-6">サービス一覧</h2>
            <p className="text-gray-500 text-lg">指導者が自分のことがわかり自信をつけるためのメソッド</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Free */}
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-pink-100">
              <h3 className="text-2xl font-bold text-pink-600 mb-8 font-mincho border-b border-pink-100 pb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                【無料】まずはここから
              </h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block text-xl mb-1">小冊子</span>
                    <span className="text-gray-500">運動系指導者が自信をつけポテンシャルを解放するまでの物語</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="font-bold text-charcoal text-xl">傾聴脱出プログラム</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block text-xl mb-1">無料相談会</span>
                    <span className="text-gray-500">今月限定で特別に受け付けています</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Paid */}
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border-2 border-pink-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-pink-200/30 w-32 h-32 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-2xl font-bold text-pink-600 mb-8 font-mincho border-b border-pink-100 pb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                【有料】本格的に変わりたい方へ
              </h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block text-xl mb-2">指導者育成セミナー</span>
                    <p className="text-gray-500 leading-relaxed">
                      指導者が自分の自信をつけ、生徒さんに迎合することなく、凛とした態度で指導にあたるためのプログラム。
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-charcoal text-xl">パーソナルセッション</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block text-xl mb-2">未来書き換え自分年表作成講座</span>
                    <p className="text-gray-500 leading-relaxed">
                      0歳から22歳までの人生を振り返り、自分史年表を書くことで「あなたという人」を知る自己内観ツール。
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Profile Section */}
      <section id="about" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="w-full md:w-2/5">
               <div className="relative group">
                 <div className="absolute inset-0 bg-pink-200 rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                 <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                   <Image
                     src="/images/fumi-profile-laugh.png"
                     alt="山﨑史子"
                     fill
                     className="object-cover object-top scale-110 group-hover:scale-100 transition-transform duration-700"
                   />
                 </div>
               </div>
            </div>
            <div className="w-full md:w-3/5">
              <div className="space-y-2 mb-8">
                <h2 className="font-mincho text-4xl md:text-5xl font-bold text-charcoal">山﨑 史子</h2>
                <p className="text-pink-600 font-bold tracking-[0.3em] text-sm uppercase">Fumiko Yamazaki</p>
              </div>
              
              <div className="space-y-6 text-gray-600 leading-loose text-base md:text-lg font-gothic">
                <p>
                  私はこれまで、常に自信がなく、いつもお客さんに迎合したりする自分を責めていました。
                </p>
                <p>
                  その自信のなさは、ついついお客さんに自分を合わせてしまうため、どうしても私のビジネスは低単価、お客さんの言いなりになってしまい、なんとか、この状況を打破したいと常に思っていたんですね。
                </p>
                <p>
                  でも、なぜ自分に自信がないのか？迎合してしまうのか？自分でもよくわからなかった。
                </p>
                <p>
                  そうやって運動系の指導者を続けること16年。
                </p>
                <p>
                  その自信のなさを補おうと、資格をたくさん取ったり、技術を磨いたりしてきたのですが、いつまで経っても自信のなさは消えず、常にモヤモヤの中、お客さんと対峙していたように思います。
                </p>
                <p>
                  しかし、ある時、自分の自信のなさは、自分のことが自分でわからないことに原因があることに気づき、私は自分のことをとにかくわかろうわかろうという頭になりました。
                </p>
                <p>
                  そして苦労して自分のこと、弱さ、強さ、そして人から見た魅力、こういったものが自分でわかった時、自然と自信がつき、お客さんに対しての態度と指導方法、客単価も変わっていきました。
                </p>
                <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 mt-4">
                  <p className="font-bold text-slate-700">
                    そんな経験から、私は昔の私と同じように、自分の自信のなさから指導者としてポテンシャルを出し切れていない人の底力を解放するためのお手伝いをさせてもらっています。
                  </p>
                </div>

                <div className="pt-4">
                  <Link href="/about" className="text-pink-600 font-bold hover:gap-4 transition-all flex items-center gap-2 group">
                    詳しいプロフィールを読む
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section id="ebook" className="py-32 relative overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/haikei.jpg"
            alt="CTA Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-charcoal/90 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center text-white">
          <h2 className="font-mincho text-3xl md:text-5xl font-bold mb-10 leading-tight">
            運動系指導者の方を<br className="md:hidden" />応援しています
          </h2>
          <p className="text-xl md:text-2xl mb-16 text-gray-300 leading-relaxed">
            自信を取り戻し、凛とした指導者となり<br className="hidden md:block" />
            生徒さんを主導しながら教えることができる人を応援しています。<br />
            こちらから。
          </p>
          
          <div className="flex justify-center">
            <Link href="/ebook" className="w-full md:w-auto px-12 py-5 bg-pink-500 text-white font-bold text-xl rounded-full shadow-xl hover:bg-pink-600 transition-all hover:-translate-y-1">
              小冊子を無料で読む
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
