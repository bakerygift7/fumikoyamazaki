"use client";

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '@/components/footer'

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-offwhite font-gothic text-charcoal">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-end justify-start overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/images/fumi-about-hero.png"
            alt="山﨑史子"
            fill
            className="object-cover object-center"
            priority
          />
          {/* 左下グラデーション（テキスト可読性） */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroTextOpacity }}
          className="relative z-10 pb-16 pl-10 md:pl-20"
        >
          <p className="text-rose-300 font-bold tracking-[0.4em] text-sm uppercase mb-3">運動指導者育成コーチ</p>
          <h1 className="font-mincho text-5xl md:text-7xl font-bold tracking-widest drop-shadow-lg mb-3 text-white">
            山﨑 史子
          </h1>
          <p className="text-lg md:text-xl font-gothic tracking-[0.3em] text-white/80">
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

          <div className="bg-white p-8 md:p-12 rounded-2xl border-l-4 border-rose-300 shadow-sm mt-16 space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 font-mincho leading-relaxed">
              私の自信を取り戻してくれたもの、<br/>
              それが<span className="text-rose-600">未来書き換え自分年表作成講座</span>という講座でした。
            </h3>
            
            <p>
              この講座は、自分の０歳から22歳までを内観して振り返り、自分史年表にすることで、自分自身ではわからなかった、自分の弱さ、強さ、人から見た魅力を自分でわかるという画期的な講座で、私はこの講座を受け、今までなぜ、指導者として自信が持てなかったのかということがはっきりと理解できました。
            </p>

            <div className="text-center py-4">
              <p className="inline-block text-xl md:text-2xl font-bold text-slate-700 border-b-2 border-rose-200 pb-1">
                ー自分のことは自分が一番わからない問題
              </p>
            </div>

            <p>
              それを自分自身の内観でわかってしまうというマジックは、私の弱さと強さは実は表裏一体なんだということを教えてくれて、変な表現ですが、弱さを認められたら、逆に自信がついたような感じになり、その時から、お客さんの対しての態度や売り上げが変わっていったように思います。
            </p>

            <div className="bg-rose-50 p-6 rounded-xl text-center">
              <p className="text-xl md:text-2xl font-bold text-rose-600 font-mincho">
                「この講座はすべての運動系指導者に受けてもらいたい！」
              </p>
            </div>

            <p>
              感動した私は受講後、すぐに認定講師になり、これまで20人以上の指導者の方にこの講座を受講していただいてますが、みんなにすごい変化をもたらしています。
            </p>

            <p className="font-bold text-slate-800">
              なので今私は、この未来書き換え自分年表作成講座と、自信をつけた後の具体的なお客さんへの指導法を合わせて教えていて、自信を持てる指導者さんの育成に努めています。
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="relative py-32 overflow-hidden bg-offwhite">
        {/* 背景画像 - 右側に大きく配置 */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none hidden md:block">
          <Image
            src="/images/fumi-history.png"
            alt=""
            fill
            className="object-cover object-left-top mask-image-gradient"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-offwhite via-transparent to-transparent" />
        </div>

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
                  <h3 className="text-xl md:text-2xl font-mincho font-bold text-charcoal bg-white/80 backdrop-blur-sm inline-block px-4 py-2 rounded-lg shadow-sm">
                    {event}
                  </h3>
                </div>
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
