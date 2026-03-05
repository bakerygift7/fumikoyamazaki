"use client";

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ScrollRevealSection from '@/components/scroll-reveal-section'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, ArrowRight, Brain, Search, Lightbulb } from 'lucide-react'

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen font-gothic text-charcoal bg-offwhite">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gold-50 via-white to-gold-100">
        {/* 背景装飾 */}
        <div className="absolute inset-0 z-0 opacity-50">
           <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gold-200 blur-[100px]" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold-300 blur-[100px]" />
        </div>

        {/* テキスト（最前面） */}
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="container mx-auto px-6 relative z-30 flex flex-col items-center justify-center text-center h-full"
        >
          <div className="space-y-8 max-w-3xl mx-auto">
            <p className="font-gothic text-sm md:text-base text-gold-600 tracking-widest font-bold mb-2">運動指導者育成コーチ 山﨑史子</p>
            <h1 className="font-mincho text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-wide text-charcoal">
              <span className="block mb-4">自分のことをわかれば</span>
              <span className="block text-gold-600">運動系指導者は<br />もっと輝ける</span>
            </h1>
            <p className="font-gothic text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto">
              いつも自信がなくてお客さんに合わせてばかりいませんか？<br />
              自分の自信のなさは、自分のことが自分でわかっていないから来てるのかもしれません。<br /><br />
              私は指導者としてのあなたを、あなた自身がわかるためのお手伝いをしています。
            </p>
            <div className="pt-8">
              <Link 
                href="#ebook" 
                className="inline-block px-10 py-4 bg-gold-500 text-white font-bold tracking-widest rounded-full shadow-lg hover:bg-gold-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                運動系指導者がポテンシャルを解放するまでの物語を読む（小冊子）
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gold-400 z-30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="font-mincho text-3xl md:text-4xl font-bold text-charcoal mb-6">
            こんな悩みはありませんか？
          </h2>
          <p className="text-gray-500 mb-12">運動指導者が抱える「肉体労働の限界」や「精神的な疲れ」</p>
          
          <div className="bg-gold-50 p-8 md:p-12 rounded-3xl shadow-sm border border-gold-100 text-left">
            <p className="font-bold text-lg mb-8 text-center">運動系の指導者を続けているあなたへ。</p>
            <ul className="space-y-6">
              {[
                "トレーナーとして肉体労働をベースにしていつまで続けられるのだろう？",
                "がむしゃらに肉体労働を増やしても収入に限界がある",
                "一生懸命になろうとすればするほど空回りする",
                "自信がなく、いつもお客さんに迎合してしまう",
                "どうしてもビジネスが低単価になり、お客さんの言いなりになってしまう"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gold-500 shrink-0 mt-1" />
                  <span className="text-lg text-charcoal font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <p className="text-xl md:text-2xl leading-relaxed font-bold text-charcoal font-mincho">
              その悩みは、あなたのスキルや資格が足りないからではありません。<br />
              ただ、<span className="text-gold-600 bg-gold-50 px-2">「自分のことが自分でわからない」</span>だけなのです。
            </p>
          </div>
        </div>
      </section>

      {/* 3. Concept Section (Scroll Reveal) */}
      <div className="py-12 bg-offwhite text-center">
        <h2 className="font-mincho text-3xl md:text-4xl font-bold text-charcoal mb-4">解決の鍵</h2>
        <p className="text-gold-600 tracking-widest font-bold">CONCEPT</p>
      </div>
      <ScrollRevealSection />

      <section className="py-24 bg-charcoal text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h3 className="font-mincho text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
            私は自分の自信をつけ<br/>
            生徒さん主導ではなく、<br/>
            あなた主導の運動指導者になってもらいたい
          </h3>
          <p className="text-gray-300 leading-loose text-lg">
            私自身、指導者を16年続けてきましたが、資格をたくさん取ったり技術を磨いたりしても、いつまで経っても自信のなさは消えませんでした。 しかし、ある時気づきました。<br/><br/>
            <span className="text-gold-400 font-bold text-xl">「自分の自信のなさは、自分のことが自分でわからないことに原因がある」</span><br/><br/>
            苦労して自分のこと、弱さ、強さ、そして人から見た魅力を理解した時、自然と自信がつき、お客さんに対しての態度と指導方法、客単価も劇的に変わっていきました。
          </p>
        </div>
      </section>

      {/* 4. Method Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-mincho text-3xl md:text-4xl font-bold text-charcoal mb-4">指導者として輝くための3ステップ</h2>
            <p className="text-gold-600 font-gothic tracking-widest">METHOD</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-offwhite p-8 rounded-2xl border border-gray-100 shadow-lg relative overflow-hidden group hover:border-gold-300 transition-colors">
              <div className="absolute top-0 right-0 bg-gold-500 text-white font-bold py-1 px-4 rounded-bl-xl text-sm">STEP 1</div>
              <div className="mb-6 w-16 h-16 bg-white rounded-full flex items-center justify-center text-gold-500 shadow-md">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-mincho">認識する</h3>
              <p className="text-gray-600 leading-relaxed">
                自信のなさ、お客さんに迎合してしまうのは、自分自身の自信のなさから来ていることを認識する。
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-offwhite p-8 rounded-2xl border border-gray-100 shadow-lg relative overflow-hidden group hover:border-gold-300 transition-colors">
              <div className="absolute top-0 right-0 bg-gold-500 text-white font-bold py-1 px-4 rounded-bl-xl text-sm">STEP 2</div>
              <div className="mb-6 w-16 h-16 bg-white rounded-full flex items-center justify-center text-gold-500 shadow-md">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-mincho">客観的に理解する</h3>
              <p className="text-gray-600 leading-relaxed">
                「自分のことは自分でわからない」問題を克服し、自分のことを客観的に理解する。
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-offwhite p-8 rounded-2xl border border-gray-100 shadow-lg relative overflow-hidden group hover:border-gold-300 transition-colors">
              <div className="absolute top-0 right-0 bg-gold-500 text-white font-bold py-1 px-4 rounded-bl-xl text-sm">STEP 3</div>
              <div className="mb-6 w-16 h-16 bg-white rounded-full flex items-center justify-center text-gold-500 shadow-md">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 font-mincho">自分主導へ</h3>
              <p className="text-gray-600 leading-relaxed">
                自分のことがわかると自然と自信になり、そうなった自分で接することで、自分主導のビジネスになる。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Service Section */}
      <section className="py-24 bg-gold-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-mincho text-3xl md:text-4xl font-bold text-charcoal mb-4">サービス一覧</h2>
            <p className="text-gray-600">指導者が自分のことがわかり自信をつけるためのメソッド</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Free */}
            <div className="bg-white p-10 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-gold-600 mb-6 font-mincho border-b-2 border-gold-100 pb-4">【無料】まずはここから</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 mt-1" />
                  <div>
                    <span className="font-bold text-charcoal block">小冊子</span>
                    <span className="text-sm text-gray-500">運動系指導者が自信をつけポテンシャルを解放するまでの物語</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 mt-1" />
                  <span className="font-bold text-charcoal">傾聴プログラム</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 mt-1" />
                  <div>
                    <span className="font-bold text-charcoal block">無料相談会</span>
                    <span className="text-sm text-gray-500">今月限定で特別に受け付けています</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Paid */}
            <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-gold-200">
              <h3 className="text-2xl font-bold text-gold-600 mb-6 font-mincho border-b-2 border-gold-100 pb-4">【有料】本格的に変わりたい方へ</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 mt-1" />
                  <div>
                    <span className="font-bold text-charcoal block text-lg">指導者育成セミナー</span>
                    <span className="text-sm text-gray-500 leading-relaxed block mt-1">
                      指導者が自分の自信をつけ、生徒さんに迎合することなく、凛とした態度で指導にあたるためのプログラム。3時間のセミナーで確実にあなたの自信を芽生えさせます。
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 mt-1" />
                  <span className="font-bold text-charcoal text-lg">パーソナルセッション（一般の方向け）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 mt-1" />
                  <div>
                    <span className="font-bold text-charcoal block text-lg">未来書き換え自分年表作成講座</span>
                    <span className="text-sm text-gray-500 leading-relaxed block mt-1">
                      0歳から22歳までの人生を振り返り、自分史年表を書くことで「あなたという人」を知る自己内観ツール。運動系指導者にとって必要な「弱み・強み・周りから見た魅力」の3点セットが炙り出されます。
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Profile Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
               <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden relative">
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
                   Profile Image
                 </div>
               </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="font-mincho text-3xl font-bold mb-2">山﨑 史子</h2>
              <p className="text-gold-600 font-gothic tracking-widest mb-8">Fumiko Yamazaki</p>
              
              <div className="space-y-6 text-gray-600 leading-relaxed font-gothic">
                <p>
                  私は体力には自信のある方ですが、それでも、「いつまで続けられるのだろう？」という不安の中にいました。
                  そんな真っ暗な不安の中で出会ったのが、「道売り（知識労働）」という働き方でした。
                </p>
                <p>
                  そろそろ「こうあるべき」「こうではなくてはいけない」という、幼少期からの思い込み（鍋の中）から出て、ご自身の経験してきたこと全てを、知識労働として売上に変える方向にシフトしていきませんか？
                </p>
                <p>
                  私は良くも悪くもあなたに寄り添える人間です。たまにめんどくさいと感じられることもあるのですが（笑）、それが私の特技であり、何を言ってもらっても受け止めることができるし、必ずあなたの力になれると信じています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section id="ebook" className="py-24 bg-gradient-to-br from-gold-500 to-gold-600 text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-mincho text-3xl md:text-4xl font-bold mb-8">
            まずは、あなたの今の悩みや<br />
            掴みたい未来を私に話に来てください。
          </h2>
          <p className="text-lg md:text-xl mb-12 text-white/90 leading-relaxed">
            不安があっても大丈夫だし、今のお仕事を辞める必要もありません。<br />
            ご自身の変化が、自分を新しい世界の行き先や、新しい未来に連れていってくれます。
          </p>
          
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <a href="#" className="block w-full py-4 bg-white text-gold-600 font-bold text-lg rounded-full shadow-lg hover:bg-gold-50 transition-all hover:-translate-y-1">
              小冊子を読む
            </a>
            <Link href="/contact" className="block w-full py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all hover:-translate-y-1">
              無料相談に申し込む
            </Link>
            <Link href="/contact" className="block w-full py-4 bg-transparent text-white font-bold text-lg hover:underline underline-offset-4">
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h2 className="font-mincho text-2xl font-bold text-charcoal">Fumiko Yamazaki</h2>
            <p className="text-xs text-gray-500 tracking-widest mt-2">運動指導者育成コーチ</p>
          </div>
          <p className="text-sm text-gray-400 font-gothic">
            &copy; {new Date().getFullYear()} Fumiko Yamazaki. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
