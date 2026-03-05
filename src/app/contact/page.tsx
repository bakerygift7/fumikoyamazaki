"use client";

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Send, CheckCircle2, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-offwhite font-gothic text-charcoal">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gold-50 to-white">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gold-200/20 flex items-center justify-center text-gold-300">
             <span className="text-4xl font-bold opacity-30">Contact Hero Image</span>
          </div>
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroTextOpacity }}
          className="relative z-10 text-center text-white mix-blend-overlay"
        >
          <h1 className="font-mincho text-5xl md:text-7xl font-bold tracking-widest drop-shadow-lg mb-4 text-charcoal">
            お問い合わせ
          </h1>
          <p className="text-lg md:text-xl font-gothic tracking-[0.2em] opacity-90 text-charcoal">
            CONTACT
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-lg text-gray-600 mb-16 leading-loose font-mincho">
            小冊子のご感想、無料相談へのお申し込みなど、<br />
            お気軽にお問い合わせください。
          </p>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-xl relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-50 rounded-full blur-[80px] -z-0 pointer-events-none" />
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4 font-mincho">送信完了</h3>
                <p className="text-gray-500">
                  お問い合わせありがとうございます。<br />
                  内容を確認の上、3営業日以内にご連絡いたします。
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-gold-600 font-bold hover:underline"
                >
                  戻る
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-500 tracking-widest mb-2">
                    お名前 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 bg-offwhite border border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all"
                    placeholder="例：山﨑 花子"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-500 tracking-widest mb-2">
                    メールアドレス <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 bg-offwhite border border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-500 tracking-widest mb-2">
                    お問い合わせ内容 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-4 bg-offwhite border border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all resize-none"
                    placeholder="ご質問やご相談内容をご記入ください。"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-charcoal text-white font-bold text-lg rounded-full shadow-lg hover:bg-gold-600 hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" /> 送信中...
                      </>
                    ) : (
                      <>
                        送信する <Send size={20} />
                      </>
                    )}
                  </button>
                </div>
                
                {status === 'error' && (
                  <p className="text-red-500 text-center text-sm font-bold bg-red-50 py-3 rounded-lg">
                    送信に失敗しました。時間をおいて再度お試しください。
                  </p>
                )}
              </form>
            )}
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
