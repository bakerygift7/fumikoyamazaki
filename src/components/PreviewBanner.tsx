'use client'

import { Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function PreviewBanner({ slug }: { slug: string }) {
  const router = useRouter()

  const exitPreview = async () => {
    await fetch('/api/preview', { method: 'DELETE' })
    router.push(`/logs/${slug}`)
    router.refresh()
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-amber-400 text-black text-center py-2 px-4 text-sm font-bold flex items-center justify-center gap-3">
      <Eye className="w-4 h-4" />
      プレビューモード（下書き表示中）
      <button
        onClick={exitPreview}
        className="ml-4 underline hover:no-underline text-xs bg-transparent border-none cursor-pointer font-bold"
      >
        プレビュー終了
      </button>
    </div>
  )
}
