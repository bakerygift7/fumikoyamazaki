import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: '山﨑史子 | 運動指導者育成コーチ',
  description: '自分のことをわかれば運動系指導者はもっと輝ける。指導者としてのあなたを、あなた自身がわかるためのお手伝いをしています。',
  metadataBase: new URL('https://yamazakifumiko.com'),
  openGraph: {
    type: 'website',
    url: 'https://yamazakifumiko.com',
    title: '山﨑史子 | 運動指導者育成コーチ',
    description: '自分のことをわかれば運動系指導者はもっと輝ける。指導者としてのあなたを、あなた自身がわかるためのお手伝いをしています。',
    siteName: '山﨑史子 | 運動指導者育成コーチ',
    images: [
      {
        url: '/images/ogp.png',
        width: 1200,
        height: 630,
        alt: '山﨑史子 | 運動指導者育成コーチ',
      },
    ],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '山﨑史子 | 運動指導者育成コーチ',
    description: '自分のことをわかれば運動系指導者はもっと輝ける。指導者としてのあなたを、あなた自身がわかるためのお手伝いをしています。',
    images: ['/images/ogp.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;600;700;900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-gothic text-charcoal bg-offwhite antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
