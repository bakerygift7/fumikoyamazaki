import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '未来書き換え自分年表作成講座 | 山﨑史子',
  description: '運動系指導者が自分のことを理解して自信をつけ、教え方と客単価を変えるための1ヶ月。山﨑史子による未来書き換え自分年表作成講座。',
  openGraph: {
    type: 'website',
    url: 'https://yamazakifumiko.com/nenpyo',
    title: '未来書き換え自分年表作成講座 | 山﨑史子',
    description: '運動系指導者が自分のことを理解して自信をつけ、教え方と客単価を変えるための1ヶ月。山﨑史子による未来書き換え自分年表作成講座。',
    images: [{ url: '/images/ogp.png', width: 1200, height: 630, alt: '未来書き換え自分年表作成講座' }],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '未来書き換え自分年表作成講座 | 山﨑史子',
    description: '運動系指導者が自分のことを理解して自信をつけ、教え方と客単価を変えるための1ヶ月。',
    images: ['/images/ogp.png'],
  },
}

export default function NenpyoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
