'use client'

import { useAuth } from '@payloadcms/ui'
import { useState } from 'react'

export default function LogoutButton() {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await Promise.race([
        fetch('/api/users/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `JWT ${token}` } : {}),
          },
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000)),
      ])
    } catch {
      // タイムアウト・エラーどちらでも続行
    } finally {
      // セッションクッキーを手動でも削除
      document.cookie = 'payload-token=; Max-Age=0; path=/'
      window.location.replace('/admin/login')
    }
  }

  return (
    <div style={{ padding: '8px 16px', marginTop: 'auto' }}>
      <button
        onClick={handleLogout}
        disabled={loading}
        style={{
          width: '100%',
          padding: '8px 12px',
          background: 'transparent',
          border: '1px solid var(--theme-elevation-150, #ccc)',
          borderRadius: '4px',
          color: 'var(--theme-text, inherit)',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          textAlign: 'left',
          opacity: loading ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>↩</span>
        {loading ? 'ログアウト中...' : 'ログアウト'}
      </button>
    </div>
  )
}
