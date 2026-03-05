import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '教えている人たちに物足りなさを感じた時に読む本 | 山﨑史子',
  description: '運動系指導者さん必見！教える客層をガラリと変える画期的な方法を解説した無料電子書籍。LINEで今すぐ読む。',
  openGraph: {
    type: 'website',
    url: 'https://yamazakifumiko.com/ebook',
    title: '教えている人たちに物足りなさを感じた時に読む本 | 山﨑史子',
    description: '運動系指導者さん必見！教える客層をガラリと変える画期的な方法を解説した無料電子書籍。LINEで今すぐ読む。',
    images: [{ url: '/images/ogp.png', width: 1200, height: 630, alt: '無料小冊子' }],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '教えている人たちに物足りなさを感じた時に読む本 | 山﨑史子',
    description: '運動系指導者さん必見！教える客層をガラリと変える画期的な方法を解説した無料電子書籍。',
    images: ['/images/ogp.png'],
  },
}

export default function EbookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
