"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Search, Brain, Lightbulb, ArrowRight, Star, Heart, ShieldCheck } from 'lucide-react';
import Footer from '@/components/footer';

export default function NenpyoPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <main className="min-h-screen font-gothic text-charcoal bg-offwhite overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <motion.div 
          style={{ y: bgY, scale: 1.1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/haikei.jpg"
            alt="Background"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
          <motion.div 
            style={{ y: textY }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-2/3 space-y-8 pt-20 md:pt-0"
          >
            <p className="font-bold text-rose-500 tracking-widest uppercase">For Instructors</p>
            
            <div className="py-2">
              <h2 className="font-mincho font-bold text-slate-700 leading-tight">
                <span className="text-lg md:text-xl block mb-2">山﨑史子による</span>
                <span className="text-3xl md:text-4xl lg:text-5xl block tracking-wide border-b-[6px] border-rose-100/60 w-fit">未来書き換え自分年表作成講座</span>
              </h2>
            </div>

            <h1 className="font-mincho text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-800">
              <span className="block mb-4">自分のことを知れば、</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-600">
                運動系指導者は<br />もっと輝ける
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
              運動系指導者が自分のことを理解して自信をつけ、<br className="hidden md:block"/>
              教え方と客単価を変えるための1ヶ月
            </p>
            
            <div className="pt-8">
              <a 
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.6)] transform hover:-translate-y-1 overflow-hidden cursor-pointer"
              >
                <span className="tracking-widest relative z-10">まずは無料相談会に申し込む</span>
                <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/50 -skew-x-12 transform origin-top" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-mincho text-3xl md:text-4xl font-bold text-slate-800 leading-relaxed">
                運動系の指導者を続けているあなたへ、<br />
                <span className="relative inline-block mt-2">
                  こんなモヤモヤを抱えていませんか？
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-rose-200/50 -z-10"></span>
                </span>
              </h2>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-rose-100 mb-16">
              <ul className="space-y-6">
                {[
                  "トレーナーとして肉体労働をベースにしていつまで続けられるのだろう？",
                  "がむしゃらに働いても収入に限界がある",
                  "一生懸命になろうとすればするほど空回りする",
                  "自信がなく、いつもお客さんに迎合してしまう",
                  "どうしてもビジネスが低単価になり、お客さんの言いなりになってしまう"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-rose-500" />
                    </div>
                    <span className="text-lg text-slate-700 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="text-center space-y-8">
              <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed font-mincho">
                その悩みは、あなたのスキルや資格が足りないからではありません。<br />
                ただ、<span className="text-rose-600 text-2xl md:text-3xl">「自分のことが自分でわからない」</span><br />
                <span className="text-rose-600 text-2xl md:text-3xl">「だから自信がなくてお客さん主導になっている」</span><br />
                だけなのです。
              </p>
              <div className="bg-slate-50 p-8 rounded-2xl text-left border-l-4 border-slate-400">
                <p className="text-slate-600 leading-loose">
                  私自身、指導者を16年続けてきましたが、資格をたくさん取ったり技術を磨いたりしても、いつまで経っても自信のなさは消えませんでした。
                  常に自信がなく、お客さんに迎合し、自分のビジネスは低単価…。
                  「なんとかこの状況を打破したい」と常に思っていました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution Section */}
      <section className="py-24 bg-gradient-to-b from-rose-50/50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <p className="text-rose-500 font-bold tracking-widest uppercase mb-4">Solution</p>
            <h2 className="font-mincho text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-8">
              自信を取り戻すための唯一の方法。<br />
              それは<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-600">「自分を知る」</span>こと。
            </h2>
            <p className="text-lg text-slate-600 leading-loose">
              なぜ自分に自信がないのか？なぜ迎合してしまうのか？<br />
              その答えは、あなたの<span className="font-bold text-slate-800">「過去」</span>にあります。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-rose-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-amber-400" />
                <h3 className="text-2xl font-bold text-slate-800 mb-6 font-mincho">未来書き換え自分年表作成講座</h3>
                <p className="text-slate-600 leading-loose mb-6">
                  幼少期から22歳までの人生を振り返り、自分史年表を書くことで「あなたという人」を深く知るための自己内観ツールです。
                </p>
                <p className="text-slate-600 leading-loose">
                  この講座では、あなたの中に潜む2つのブレーキ（リミッティングビリーフ）の正体を明らかにします。
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-rose-400 shadow-sm">
                <h4 className="text-xl font-bold text-rose-600 mb-2 flex items-center gap-2">
                  <span className="text-2xl">01</span> インナーチャイルド
                </h4>
                <p className="text-slate-700 font-bold mb-1">（自己承認欲求）</p>
                <p className="text-slate-600">「もっと認められたい」「褒められたい」という思いから、自分を犠牲にしてしまう心。</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-amber-400 shadow-sm">
                <h4 className="text-xl font-bold text-amber-600 mb-2 flex items-center gap-2">
                  <span className="text-2xl">02</span> インナーペアレント
                </h4>
                <p className="text-slate-700 font-bold mb-1">（断れない癖）</p>
                <p className="text-slate-600">「こうあるべき」「断ってはいけない」という、幼少期に作られた行動パターン。</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-xl leading-relaxed text-slate-700 font-medium">
              これらは、いわばあなたを「鍋の中」に閉じ込めている<span className="text-rose-600 font-bold">「竜（自我）」</span>です。<br />
              この講座で、その竜を見つけ出し、退治（解放）することで、<br />
              あなたは本来のポテンシャルを発揮できるようになります。
            </p>
          </div>
        </div>
      </section>

      {/* 4. Benefit Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-mincho text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              自分を知ることで、<br />
              あなたの指導者としての人生はこう変わります
            </h2>
            <div className="w-16 h-1 bg-rose-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Search className="w-10 h-10 text-rose-500" />,
                step: "Step 01",
                title: "自分を知る",
                desc: "自分の弱さ、強さ、そして人から見た魅力を客観的に理解できます。「なぜ今までうまくいかなかったのか」の根本原因が腑に落ちます。"
              },
              {
                icon: <Heart className="w-10 h-10 text-rose-500" />,
                step: "Step 02",
                title: "自信になる",
                desc: "自分を縛っていた「思い込み」から解放され、自分自身を許せるようになります。根拠のない自信ではなく、自分を深く理解した上での「静かな自信」が生まれます。"
              },
              {
                icon: <ShieldCheck className="w-10 h-10 text-rose-500" />,
                step: "Step 03",
                title: "トークと結果が変わる",
                desc: "自信がつくと、お客さんへの迎合がなくなります。「あなた主導」で凛として指導できるようになり、その結果、信頼関係が深まり、高収益・高リピートの指導者へと変化します。"
              }
            ].map((item, i) => (
              <div key={i} className="bg-offwhite p-10 rounded-[2.5rem] relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-slate-100">
                <div className="absolute top-0 right-0 bg-rose-100 text-rose-600 font-bold py-2 px-6 rounded-bl-3xl text-sm tracking-widest">
                  {item.step}
                </div>
                <div className="mb-6 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 font-mincho">{item.title}</h3>
                <p className="text-slate-600 leading-loose text-sm text-justify">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process Section */}
      <section className="py-24 bg-rose-50/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-mincho text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              未来書き換え自分年表作成講座は、<br />
              このように進んでいきます
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "Step 1",
                title: "幼少期からの内観",
                desc: "未来書き換え自分年表作成講座で用意されている「質問シート6枚」に沿って、自分の人生の0歳〜22歳までを内観し埋めていきます。"
              },
              {
                step: "Step 2",
                title: "自分史年表の完成",
                desc: "質問シートが埋まると自動で「自分史年表」が出来上がるようになっていて、その自分史年表の中には、自分の特技や自分の強みが炙り出されるようになっています。"
              },
              {
                step: "Step 3",
                title: "講師による伴走サポート",
                desc: "自分の内観は少しコツがいって、未来書き換え自分年表作成講座をすでに体験している私の実際の年表を見てもらいながら、メッセージでアドバイスをしながら進めるので、そこがあなたの助けになります。"
              },
              {
                step: "Step 4",
                title: "ファシリテーション（総仕上げ）",
                desc: "1ヶ月後（ここがすごい！1ヶ月でわかる）自分自身で未来書き換え自分年表を完成させたら、ファシリテーション（オンライン）というものがあり、認定講師の私とあなたで未来書き換え自分年表の総仕上げをします。私という客観的な視点が入ることでわかることもあるし、完成したら、あなたがこれからやるべきファーストステップを決めて完了。"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 bg-white p-8 rounded-3xl shadow-sm border border-rose-100 items-start">
                <div className="shrink-0 bg-rose-500 text-white font-bold py-2 px-6 rounded-full text-sm tracking-widest">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 font-mincho">{item.title}</h3>
                  <p className="text-slate-600 leading-loose">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl md:text-2xl font-bold text-rose-600 font-mincho">
              未来書き換え自分年表を終える頃には<br className="md:hidden"/>指導者として<br />
              あなたは一皮剥けた人になっているはずです。
            </p>
          </div>
        </div>
      </section>

      {/* 6. Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl">
                <Image
                  src="/images/person_final.png"
                  alt="山﨑史子"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
              <h2 className="font-mincho text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed">
                私自身も、「リミッティングビリーフというブレーキ」でもがいていました。
              </h2>
              <div className="text-slate-600 leading-loose space-y-4 font-gothic">
                <p>
                  かつての私は、忙しいのに収入は増えない…そんな馬車馬労働指導者の状態でした。
                </p>
                <p>
                  そんな時、父と母がほぼ同時に亡くなるというショックを経験し、視野が狭くなる中、私は資格を取ったり技術を磨いたりすれば、今の状況が変わるだろうと自分をわざと追い込むような行為を取り、サークル運営や自分のレッスンをこなしていたのですが、状況は良くなるどころかどんどん追い込まれる感じになっていきます。
                </p>
                <p>
                  そんな時でした。この「未来書き換え自分年表」に出会ったのは。
                </p>
                <p>
                  なぜ私は狂ったように資格を取っているのか？なぜ私が狂ったように自分を追い詰めるのか？そしてなぜ馬車馬労働をしているのか？
                  それらの答えが私が書いた未来書き換え自分年表の中にあったんです。
                </p>
                <p className="font-bold text-slate-800">
                  それが、自分の中にあった「父への恐れ」や「母への贖罪の念」だった。
                </p>
                <p>
                  それが私を突き動かし、同時に私を縛り付けていた正体がそれであり、それがある限り、今の働き方、指導者としてのポジションは変わらない。
                  そのことを自分自身で認識した時、ショックでありましたが、でも、越えるべきものが見つかった気がしたんです。
                </p>
                <p>
                  私を押さえつけているブレーキ、これをリミッティングビリーフと言いますが、未来書き換え自分年表には、そのリミッティングビリーフの癒し方、付き合い方がわかるようにできています。
                </p>
                <p>
                  リミッティングビリーフを越えたとは言いませんが、付き合えるようになってから私の指導者としてのポジションは激変していきました。
                </p>
                <p>
                  未来書き換え自分年表作成講座は、まさに運動系指導者のための自分内観ツールだと思います。
                  私はこの講座で受けた感動と変化を一人でも多くの指導者の方にお伝えしたくて、今、認定講師をやっています。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-8 rounded-2xl text-center border border-amber-100">
            <p className="text-lg font-bold text-slate-800 mb-2">実績</p>
            <p className="text-slate-700 leading-relaxed">
              私がこれまでに講座を担当した人は、<span className="text-3xl font-bold text-amber-600 mx-2">20名以上</span>。<br />
              この講座を通じて自分自身と向き合い、指導者としての新たな一歩を踏み出しています。
            </p>
          </div>
        </div>
      </section>

      {/* 7. Offer Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border-2 border-amber-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400" />
            
            <div className="text-center mb-12">
              <p className="text-amber-600 font-bold tracking-widest uppercase mb-4">Course</p>
              <h2 className="font-mincho text-3xl md:text-4xl font-bold text-slate-800">
                山﨑史子による<br />
                未来書き換え自分年表作成講座
              </h2>
            </div>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4 border-b border-slate-100 pb-6">
                <div className="w-14 shrink-0 font-bold text-slate-500 text-sm pt-0.5">期間</div>
                <div className="text-lg font-bold text-slate-800">1ヶ月</div>
              </div>
              <div className="flex items-start gap-4 border-b border-slate-100 pb-6">
                <div className="w-14 shrink-0 font-bold text-slate-500 text-sm pt-1">内容</div>
                <div className="space-y-4 flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">専用テキストによる自分年表の作成（自宅での内観ワーク）</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">山﨑史子によるマンツーマン・ファシリテーション（オンラインセッション）</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">運動指導者としてどのように年表を生かしていったらいいかというアドバイス</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 shrink-0 font-bold text-slate-500 text-sm">価格</div>
                <div className="text-3xl md:text-4xl font-bold text-rose-600 font-mincho">70,000円<span className="text-sm text-slate-500 font-gothic ml-2 font-normal">（税抜）</span></div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-slate-600 mb-6">
                いきなり講座に申し込む必要はありません。<br />
                まずは、あなたの今の悩みや、掴みたい未来を私に話に来てください。
              </p>
              <ArrowRight className="w-6 h-6 text-slate-400 mx-auto animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section id="cta" className="py-24 bg-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-rose-500 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <h2 className="font-mincho text-3xl md:text-5xl font-bold mb-10 leading-tight">
            技術やスキルの前に、まずは、<br />
            「あなたのこと」を知ることから<br className="md:hidden" />始めませんか？
          </h2>
          
          <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] mb-12 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-amber-300">未来書き換え自分年表作成講座についての無料相談会</h3>
            <p className="text-lg mb-8">（30分・オンライン・無料）</p>
            
            <div className="text-left space-y-4 mb-8 bg-black/20 p-6 rounded-xl">
              <p className="font-bold mb-2">この相談会では、以下のことがわかります：</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>運動系指導者として、今あなたに何が足りていないのか？</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>あなたの隠れた「強み」のヒントとは何か？</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <span>なぜ、お客さんに上手く伝えられないのか？その本当の理由。</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed">
              私は良くも悪くも、あなたに寄り添える人間です。<br />
              たまに「めんどくさい」と感じられることもあるのですが（笑）、<br />
              それが私の特技であり、何を言ってもらっても受け止めることができます。<br />
              必ずあなたの力になれると信じています。
            </p>

            <a 
              href="https://s.lmes.jp/landing-qr/2006531142-KVp4k2VM?uLand=X1cXM7"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-12 py-6 font-bold text-white transition-all duration-300 bg-[#06C755] rounded-full hover:shadow-[0_10px_30px_-10px_rgba(6,199,85,0.6)] transform hover:-translate-y-1 overflow-hidden w-full md:w-auto"
            >
              <span className="text-xl tracking-widest relative z-10 flex items-center gap-3">
                LINE登録して無料相談に申し込む
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <p className="mt-6 text-sm text-gray-400">
              ※ 未来書き換え自分年表で変わった運動指導者のエピソードが書いてある<br className="md:hidden"/>電子書籍もLINE登録で同時にプレゼントしています。
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
