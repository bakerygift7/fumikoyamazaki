import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問い合わせ | 山﨑史子',
  description: '山﨑史子へのお問い合わせはこちら。小冊子のご感想、講座についてのご質問、お仕事のご依頼など、お気軽にどうぞ。',
  openGraph: {
    type: 'website',
    url: 'https://yamazakifumiko.com/contact',
    title: 'お問い合わせ | 山﨑史子',
    description: '山﨑史子へのお問い合わせはこちら。小冊子のご感想、講座についてのご質問、お仕事のご依頼など、お気軽にどうぞ。',
    images: [{ url: '/images/ogp.png', width: 1200, height: 630, alt: 'お問い合わせ' }],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'お問い合わせ | 山﨑史子',
    description: '山﨑史子へのお問い合わせはこちら。',
    images: ['/images/ogp.png'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
