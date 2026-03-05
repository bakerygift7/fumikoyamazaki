"use client";

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-offwhite font-gothic text-charcoal">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gold-50">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          {/* Placeholder for Hero Image */}
          <div className="absolute inset-0 bg-gold-100 flex items-center justify-center text-gold-300">
             <span className="text-4xl font-bold opacity-30">Hero Image Placeholder</span>
          </div>
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroTextOpacity }}
          className="relative z-10 text-center text-white mix-blend-overlay"
        >
          <h1 className="font-mincho text-5xl md:text-7xl font-bold tracking-widest drop-shadow-lg mb-4 text-charcoal">
            山﨑 史子
          </h1>
          <p className="text-lg md:text-xl font-gothic tracking-[0.2em] opacity-90 text-charcoal">
            FUMIKO YAMAZAKI
          </p>
        </motion.div>
      </section>

      {/* Profile Text Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-12 leading-loose text-lg text-gray-600 font-mincho">
          <h3 className="text-2xl font-bold text-gold-600 font-mincho text-center mb-8">
            私は自分の自信をつけ<br/>
            生徒さん主導ではなくあなた主導の<br/>
            運動指導者になってもらいたい
          </h3>

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
          
          <div className="w-full h-[1px] bg-gold-200 my-12" />
          
          <p>
            しかし、ある時、自分の自信のなさは、自分のことが自分でわからないことに原因があることに気づき、私は自分のことをとにかくわかろうわかろうという頭になりました。
          </p>
          <p>
            そして苦労して自分のこと、弱さ、強さ、そして人から見た魅力、こういったものが自分でわかった時、自然と自信がつき、お客さんに対しての態度と指導方法、客単価も変わっていきました。
          </p>
          <p>
            そんな経験から、私は昔の私と同じように、自分の自信のなさから指導者としてポテンシャルを出し切れていない人の底力を解放するためのお手伝いをさせてもらっています。
          </p>

          <div className="bg-gold-50 p-8 rounded-2xl border border-gold-100 mt-12">
            <h4 className="text-xl font-bold text-charcoal mb-6">あとがきより</h4>
            <p className="mb-4">
              私は体力には自信のある方ですが、それでも、
            </p>
            <ul className="list-disc list-inside mb-4 pl-4 space-y-2">
              <li>トレーナーとして肉体労働をベースにしていつまで続けられるのだろう？</li>
              <li>がむしゃらに肉体労働を増やしても収入に限界がある</li>
              <li>一生懸命になろうとすればするほど空回りする</li>
            </ul>
            <p>
              そんな真っ暗な不安の中で出会ったのが、「道売り（知識労働）」という働き方でした。<br/>
              そして道売りへのシフトが本当に私に大きな衝撃を与え、まさに私の未来を書き換えてくれました。
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="relative py-32 overflow-hidden bg-offwhite">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="font-mincho text-4xl font-bold text-charcoal mb-4">歩み</h2>
            <p className="text-gold-600 tracking-widest text-sm font-bold">HISTORY</p>
          </div>

          <div className="relative border-l-2 border-gold-300 ml-4 md:ml-1/2 space-y-12 pl-8 md:pl-0">
            {[
              "小さい頃から運動が得意だった",
              "テニスの能力で日本女子体育短期大学に入学",
              "OLを10年経験",
              "専業主婦に",
              "フィットネスクラブのトレーナーに",
              "資格を取りトレーナーを教える立場講師になる",
              "サークル運営を開始",
              "未来書き換え自分年表作成講座に出会う",
              "未来書き換え自分年表作成講座認定講師に"
            ].map((event, index) => (
              <div key={index} className={`relative md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute -left-[41px] md:left-1/2 md:-translate-x-1/2 top-1 w-5 h-5 rounded-full bg-gold-500 border-4 border-white shadow-md z-10" />
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
                  <h3 className="text-xl md:text-2xl font-mincho font-bold text-charcoal">
                    {event}
                  </h3>
                </div>
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 text-center bg-white relative z-10">
        <Link href="/" className="font-mincho text-xl font-bold text-charcoal hover:text-gold-600 transition-colors">
          Fumiko Yamazaki
        </Link>
        <div className="mt-4 text-sm text-gray-500 space-y-1">
          <p>運動指導者育成コーチ</p>
          <p>未来書き換え自分年表作成講座認定講師</p>
        </div>
        <p className="text-sm text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Fumiko Yamazaki. All Rights Reserved.
        </p>
      </footer>
    </div>
  )
}
