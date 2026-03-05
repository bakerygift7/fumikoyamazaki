"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, BookOpen, ArrowRight, Download, Star } from 'lucide-react';

export default function EbookPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <main className="min-h-screen font-gothic text-charcoal bg-offwhite overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* 背景装飾 */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50 opacity-80" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-rose-100/40 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-amber-100/40 blur-[100px]" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* テキストエリア */}
            <motion.div 
              style={{ y: textY }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-3/5 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-bold text-rose-600 tracking-widest uppercase">Free E-Book</span>
              </div>
              
              <h1 className="font-mincho text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-800">
                <span className="block text-2xl md:text-3xl mb-4 text-slate-600 font-medium">運動系指導者さん必見！</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-600">
                  教えている人たちに<br />
                  物足りなさを感じた時に読む本
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium border-l-4 border-rose-300 pl-6">
                教える客層をガラリと変える画期的な方法を解説しています♪
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                {['無料', '漫画吹き出し形式', 'LINEで読む電子書籍'].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white rounded-lg shadow-sm text-slate-600 font-bold text-sm border border-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="pt-8">
                <a 
                  href="https://s.lmes.jp/landing-qr/2006531142-KVp4k2VM?uLand=X1cXM7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-[#06C755] rounded-full hover:shadow-[0_10px_30px_-10px_rgba(6,199,85,0.6)] transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="tracking-widest relative z-10 flex items-center gap-3 text-lg">
                    <Download className="w-5 h-5" />
                    今すぐLINEで読む
                  </span>
                </a>
              </div>
            </motion.div>

            {/* 本のイメージエリア */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="w-full lg:w-2/5 flex justify-center"
            >
              <div className="relative">
                <div className="relative w-[280px] md:w-[340px] rounded-r-2xl rounded-l-sm shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 hover:rotate-1">
                  <Image
                    src="/images/bookcover.png"
                    alt="教えている人たちに物足りなさを感じた時に読む本"
                    width={340}
                    height={480}
                    className="w-full h-auto"
                  />
                </div>
                {/* 影 */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-mincho text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-relaxed">
              運動系指導者さんが年齢を重ねていくと<br />
              立ち会われるこれらの悩み
            </h2>
            <div className="w-16 h-1 bg-rose-400 mx-auto"></div>
          </div>

          <div className="bg-slate-50 p-10 md:p-14 rounded-[3rem] shadow-lg border border-slate-100">
            <ul className="space-y-6">
              {[
                "いろいろと学んできたことが売り上げにつながっていない",
                "教える人のターゲットを変えたい",
                "真剣に取り組んでいる人だけを相手にしたい",
                "肉体労働の割合を少なくして知識労働に変えていきたい",
                "技術ではなく心と心でビジネスがしたいと思っていた方"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-rose-500" />
                  </div>
                  <span className="text-lg text-slate-700 font-medium leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-16 text-center space-y-8">
            <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed font-mincho">
              まさにこれらの悩みを<br />
              <span className="text-rose-600 text-3xl">一発解決するための秘訣</span><br />
              が書かれている書籍です。
            </p>
          </div>
        </div>
      </section>

      {/* 3. Solution Section */}
      <section className="py-24 bg-gradient-to-b from-rose-50/50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white p-12 md:p-16 rounded-[2.5rem] shadow-xl border-2 border-amber-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 font-mincho leading-relaxed">
              教えられる技術を増やす？<br />
              生徒さんを先生にする？
            </h3>
            
            <div className="py-8">
              <p className="text-xl text-slate-600 mb-4">いいえ、</p>
              <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 font-mincho mb-4">
                「講師の方をお客さんにする」
              </p>
              <p className="text-xl text-slate-600">これが秘訣！</p>
            </div>

            <p className="text-lg text-slate-700 leading-loose">
              その具体的な方法をぜひ知ってみてください。
            </p>
            
            <div className="mt-10">
              <a 
                href="https://s.lmes.jp/landing-qr/2006531142-KVp4k2VM?uLand=X1cXM7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-12 py-4 bg-[#06C755] text-white font-bold rounded-full shadow-lg hover:bg-[#05b34c] transition-all hover:-translate-y-1"
              >
                <span className="flex items-center gap-2 text-lg">
                  LINEで無料で読む
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Content Detail Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 font-mincho">この本には...</h3>
              </div>
              <p className="text-lg text-slate-700 leading-loose pl-4 border-l-4 border-rose-200">
                運動系指導者さんが肉体労働から知識労働にシフトするための<br />
                <span className="font-bold text-rose-600">教える人をガラリと変える具体的な方法</span>が書かれています
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 font-mincho">なぜ売り上げにつながらないのか？</h3>
              </div>
              <p className="text-lg text-slate-700 leading-loose pl-4 border-l-4 border-amber-200">
                なぜ運動系指導者さんが技術やスキルを一生懸命努力して身につけても売り上げにつながらないのか？<br />
                そのロジックをわかりやすく図説しています
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl space-y-6">
              <h4 className="font-bold text-slate-800 text-lg mb-4 text-center">こんな悩みを持つ方へ</h4>
              <ul className="space-y-4">
                {[
                  "運動系指導者を続けてきたが年齢とともに役割ばかり増えて収入が伸びない",
                  "年齢とともに肉体労働がキツくなっているが知識労働へのシフトの仕方がわからない",
                  "本気のお客さんだけを相手したいが教えている人と自分の熱量に差がありすぎる",
                  "私が教える技術ではなく本当はもっと心と心でつながるビジネスがしたい"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center p-8 border-2 border-dashed border-rose-200 rounded-3xl bg-rose-50/30">
              <p className="text-lg text-slate-700 leading-loose font-medium">
                これらのことが起こる原因、これらの悩みが立ち現れる原因は<br />
                <span className="text-rose-600 font-bold">運動系指導者を取り巻く環境</span>に原因がありました。<br />
                その原因を<span className="text-2xl font-bold text-slate-800 mx-1">「鍋」</span>に例えてわかりやすく解説しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Author Section */}
      <section className="py-24 bg-offwhite">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-lg flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/fumi-smile.png"
                  alt="山﨑史子"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <div>
                <p className="text-rose-500 font-bold tracking-widest text-xs uppercase mb-2">Author</p>
                <h3 className="text-2xl font-bold text-slate-800 font-mincho">山﨑 史子</h3>
                <p className="text-slate-400 text-sm">やまざきふみこ</p>
              </div>
              
              <div className="space-y-1 text-sm font-bold text-slate-600">
                <p>未来書き換え自分年表作成講座ファシリテーター</p>
                <p>トレーナー育成講師</p>
              </div>

              <div className="text-slate-600 text-sm leading-loose space-y-4">
                <p>
                  トレーナー、インストラクターを経て、現在は運動系指導者向けにカウンセリング、新しい働き方へのシフトを提案している運動系指導者育成講師。
                </p>
                <p>
                  現役のインストラクターをしつつ、指導者を育成することを同時に行うことで、現役の運動系指導者の悩みをわかりつつ、適切なアドバイスを行えることが強み。
                </p>
                <p>
                  一方で、未来書き換え自分年表作成講座のファシリテーターとしてジャンルを超えてカウンセリングも行う。
                  これまで運動系指導者を中心に働き方をシフトし飛躍できる方を多く輩出してきた。
                </p>
                <p className="text-xs text-slate-500 pt-2">
                  千葉県船橋在住 / 夫と子ども二人と犬で暮らす
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-24 bg-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-rose-500 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <h2 className="font-mincho text-3xl md:text-5xl font-bold mb-10 leading-tight">
            あなたの指導者としての未来を<br />
            ここから変えてみませんか？
          </h2>
          
          <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] mb-12 border border-white/20">
            <p className="text-xl mb-8 font-bold">
              価格 ０円（無料）
            </p>
            
            <a 
              href="https://s.lmes.jp/landing-qr/2006531142-KVp4k2VM?uLand=X1cXM7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-12 py-6 font-bold text-white transition-all duration-300 bg-[#06C755] rounded-full hover:shadow-[0_10px_30px_-10px_rgba(6,199,85,0.6)] transform hover:-translate-y-1 overflow-hidden w-full md:w-auto"
            >
              <span className="text-xl tracking-widest relative z-10 flex items-center gap-3">
                <Download className="w-6 h-6" />
                今すぐLINEで読む
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <p className="mt-4 text-sm text-gray-400">
              ※ LINE登録後、すぐに電子書籍をお読みいただけます。
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400 font-gothic">
            &copy; {new Date().getFullYear()} Fumiko Yamazaki. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}