"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Loader2, ArrowRight } from 'lucide-react'
import Footer from '@/components/footer'

export default function ContactPage() {
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
    <div className="min-h-screen bg-[#fffaf5] font-gothic text-slate-800">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            
            {/* 左側：画像エリア (縦長写真をオシャレに配置) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-5/12 relative"
            >
              <div className="relative w-full max-w-sm mx-auto md:ml-auto">
                {/* 写真フレーム */}
                <div className="relative aspect-[3/4] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl border-[6px] border-white z-10">
                  <Image
                    src="/images/contact-hero.png"
                    alt="山﨑史子"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                
                {/* 装飾的な枠線 */}
                <div className="absolute top-4 -right-4 w-full h-full rounded-t-[10rem] rounded-b-[2rem] border-2 border-rose-300 z-0" />
                
                {/* 装飾的な円 */}
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-rose-200 to-amber-200 rounded-full blur-xl opacity-60 z-0" />
              </div>
            </motion.div>

            {/* 右側：テキストエリア */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full md:w-7/12 text-center md:text-left space-y-8"
            >
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-600 text-xs font-bold tracking-widest uppercase mb-4">
                  Contact
                </span>
                <h1 className="font-mincho text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
                  お問い合わせ
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-amber-400 mx-auto md:mx-0 rounded-full" />
              </div>

              <p className="text-lg text-slate-600 leading-loose font-medium">
                小冊子のご感想、講座についてのご質問、<br className="hidden md:block" />
                お仕事のご依頼など、お気軽にお問い合わせください。<br />
                <br />
                内容を確認の上、3営業日以内に<br className="md:hidden" />ご連絡させていただきます。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 font-mincho">送信完了しました</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  お問い合わせありがとうございます。<br />
                  ご入力いただいたメールアドレス宛に<br />
                  自動返信メールをお送りしました。
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="inline-flex items-center text-rose-500 font-bold hover:text-rose-600 transition-colors"
                >
                  <ArrowRight className="rotate-180 mr-2 w-4 h-4" /> お問い合わせフォームに戻る
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-500 tracking-widest mb-2">
                      お名前 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                      placeholder="例：山﨑 花子"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-500 tracking-widest mb-2">
                      メールアドレス <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-500 tracking-widest mb-2">
                      お問い合わせ内容 <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none"
                      placeholder="ご質問やご相談内容をご記入ください。"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-[0_10px_25px_-5px_rgba(244,63,94,0.4)] transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
                  <p className="text-rose-500 text-center text-sm font-bold bg-rose-50 py-4 rounded-xl animate-pulse">
                    送信に失敗しました。時間をおいて再度お試しください。
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
