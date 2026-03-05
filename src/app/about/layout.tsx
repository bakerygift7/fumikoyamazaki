import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '私について | 山﨑史子',
  description: '運動指導者育成コーチ 山﨑史子のプロフィール。16年間の指導者としての経験から、自信をつけ自分主導の指導者になるためのお手伝いをしています。',
  openGraph: {
    type: 'website',
    url: 'https://yamazakifumiko.com/about',
    title: '私について | 山﨑史子',
    description: '運動指導者育成コーチ 山﨑史子のプロフィール。16年間の指導者としての経験から、自信をつけ自分主導の指導者になるためのお手伝いをしています。',
    images: [{ url: '/images/ogp.png', width: 1200, height: 630, alt: '山﨑史子' }],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '私について | 山﨑史子',
    description: '運動指導者育成コーチ 山﨑史子のプロフィール。',
    images: ['/images/ogp.png'],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
