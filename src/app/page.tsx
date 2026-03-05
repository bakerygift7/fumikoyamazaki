"use client";

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollRevealSection from '@/components/scroll-reveal-section'
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

        {/* Layer 4: 人物 + ソファ */}
        <motion.div 
          style={{ y: personY, x: personMouseX, translateY: personMouseY }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 right-0 z-20 w-full h-[85%] md:h-[95%] pointer-events-none flex justify-end items-end"
        >
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full max-w-[1200px] mr-[-5%] md:mr-0"
          >
            <Image
              src="/images/person_final.png"
              alt="Fumiko Yamazaki"
              fill
              className="object-contain object-bottom md:object-right-bottom"
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

      {/* 2. Problem Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-mincho text-3xl md:text-5xl font-bold text-charcoal mb-6">
              こんな悩みはありませんか？
            </h2>
            <div className="w-20 h-1 bg-pink-200 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-pink-50/50 p-8 rounded-[2.5rem] border border-pink-100 shadow-sm">
                <p className="font-bold text-xl mb-8 text-pink-700">運動系の指導者を続けているあなたへ。</p>
                <ul className="space-y-6">
                  {[
                    "トレーナーとして肉体労働をベースにしていつまで続けられるのだろう？",
                    "がむしゃらに肉体労働を増やしても収入に限界がある",
                    "一生懸命になろうとすればするほど空回りする",
                    "自信がなく、いつもお客さんに迎合してしまう",
                    "どうしてもビジネスが低単価になり、お客さんの言いなりになってしまう"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                      <span className="text-lg text-charcoal font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-8">
              <p className="text-2xl md:text-3xl leading-loose font-bold text-charcoal font-mincho">
                その悩みは、あなたの<br />
                スキルや資格が足りないから<br />
                ではありません。
              </p>
              <p className="text-xl md:text-2xl leading-relaxed font-bold text-pink-600">
                ただ、<span className="relative inline-block">
                  「自分のことが自分でわからない」
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-pink-100 -z-10"></span>
                </span><br />
                だけなのです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Concept Section (Scroll Reveal) */}
      <div className="py-20 bg-offwhite text-center">
        <h2 className="font-mincho text-3xl md:text-5xl font-bold text-charcoal mb-4 tracking-widest">解決の鍵</h2>
        <p className="text-pink-600 tracking-[0.4em] font-bold text-sm">CONCEPT</p>
      </div>
      <ScrollRevealSection />

      <section className="py-32 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500 blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <h3 className="font-mincho text-3xl md:text-4xl font-bold mb-12 leading-relaxed">
            私は自分の自信をつけ、<br/>
            生徒さん主導ではなく、<br/>
            <span className="text-pink-400">あなた主導の運動指導者</span>に<br/>
            なってもらいたい
          </h3>
          <div className="space-y-8 text-gray-300 leading-loose text-lg md:text-xl">
            <p>
              私自身、指導者を16年続けてきましたが、資格をたくさん取ったり技術を磨いたりしても、いつまで経っても自信のなさは消えませんでした。 しかし、ある時気づきました。
            </p>
            <p className="text-white font-bold text-2xl md:text-3xl py-4">
              「自分の自信のなさは、自分のことが自分でわからないことに原因がある」
            </p>
            <p>
              苦労して自分のこと、弱さ、強さ、そして人から見た魅力を理解した時、自然と自信がつき、お客さんに対しての態度と指導方法、客単価も劇的に変わっていきました。
            </p>
          </div>
        </div>
      </section>

      {/* 4. Method Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-mincho text-3xl md:text-5xl font-bold text-charcoal mb-6">指導者として輝くための3ステップ</h2>
            <p className="text-pink-600 font-gothic tracking-[0.3em] font-bold">METHOD</p>
            <div className="w-16 h-1 bg-pink-500 mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="group bg-offwhite p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-xl hover:border-pink-200 transition-all duration-500">
              <div className="absolute top-0 right-0 bg-pink-500 text-white font-bold py-2 px-6 rounded-bl-3xl text-sm tracking-widest">STEP 01</div>
              <div className="mb-8 w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-pink-500 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-6 font-mincho">認識する</h3>
              <p className="text-gray-600 leading-loose text-lg">
                自信のなさ、お客さんに迎合してしまうのは、自分自身の自信のなさから来ていることを認識する。
              </p>
            </div>

            {/* Step 2 */}
            <div className="group bg-offwhite p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-xl hover:border-pink-200 transition-all duration-500 md:translate-y-8">
              <div className="absolute top-0 right-0 bg-pink-500 text-white font-bold py-2 px-6 rounded-bl-3xl text-sm tracking-widest">STEP 02</div>
              <div className="mb-8 w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-pink-500 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Brain size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-6 font-mincho">客観的に理解する</h3>
              <p className="text-gray-600 leading-loose text-lg">
                「自分のことは自分でわからない」問題を克服し、自分のことを客観的に理解する。
              </p>
            </div>

            {/* Step 3 */}
            <div className="group bg-offwhite p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-xl hover:border-pink-200 transition-all duration-500">
              <div className="absolute top-0 right-0 bg-pink-500 text-white font-bold py-2 px-6 rounded-bl-3xl text-sm tracking-widest">STEP 03</div>
              <div className="mb-8 w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-pink-500 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Lightbulb size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-6 font-mincho">自分主導へ</h3>
              <p className="text-gray-600 leading-loose text-lg">
                自分のことがわかると自然と自信になり、そうなった自分で接することで、自分主導のビジネスになる。
              </p>
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
                  <span className="font-bold text-charcoal text-xl">傾聴プログラム</span>
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
                     src="/images/person_final.png"
                     alt="山﨑史子"
                     fill
                     className="object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700"
                   />
                 </div>
               </div>
            </div>
            <div className="w-full md:w-3/5">
              <div className="space-y-2 mb-8">
                <h2 className="font-mincho text-4xl md:text-5xl font-bold text-charcoal">山﨑 史子</h2>
                <p className="text-pink-600 font-bold tracking-[0.3em] text-sm uppercase">Fumiko Yamazaki</p>
              </div>
              
              <div className="space-y-8 text-gray-600 leading-loose text-lg font-gothic">
                <p>
                  私は体力には自信のある方ですが、それでも、「いつまで続けられるのだろう？」という不安の中にいました。
                  そんな真っ暗な不安の中で出会ったのが、「道売り（知識労働）」という働き方でした。
                </p>
                <p className="border-l-4 border-pink-200 pl-6 italic">
                  そろそろ「こうあるべき」「こうではなくてはいけない」という、幼少期からの思い込み（鍋の中）から出て、ご自身の経験してきたこと全てを、知識労働として売上に変える方向にシフトしていきませんか？
                </p>
                <p>
                  私は良くも悪くもあなたに寄り添える人間です。たまにめんどくさいと感じられることもあるのですが（笑）、それが私の特技であり、何を言ってもらっても受け止めることができるし、必ずあなたの力になれると信じています。
                </p>
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
            まずは、あなたの今の悩みや<br />
            掴みたい未来を私に話に来てください。
          </h2>
          <p className="text-xl md:text-2xl mb-16 text-gray-300 leading-relaxed">
            不安があっても大丈夫だし、今のお仕事を辞める必要もありません。<br />
            ご自身の変化が、新しい未来に連れていってくれます。
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#" className="w-full md:w-auto px-12 py-5 bg-pink-500 text-white font-bold text-xl rounded-full shadow-xl hover:bg-pink-600 transition-all hover:-translate-y-1">
              小冊子を無料で読む
            </a>
            <Link href="/contact" className="w-full md:w-auto px-12 py-5 bg-white text-charcoal font-bold text-xl rounded-full shadow-xl hover:bg-gray-100 transition-all hover:-translate-y-1">
              無料相談に申し込む
            </Link>
          </div>
          
          <Link href="/contact" className="inline-block mt-12 text-pink-400 font-bold text-lg hover:text-pink-300 transition-colors underline underline-offset-8">
            その他のお問い合わせはこちら
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="font-mincho text-3xl font-bold text-charcoal">Fumiko Yamazaki</h2>
            <p className="text-pink-600 font-bold tracking-[0.4em] text-xs mt-3 uppercase">運動指導者育成コーチ</p>
          </div>
          <p className="text-sm text-gray-400 font-gothic">
            &copy; {new Date().getFullYear()} Fumiko Yamazaki. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
