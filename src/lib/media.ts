/**
 * PayloadのメディアURLをNext.js Image互換の形式に変換する。
 *
 * Payloadは serverURL に応じた絶対URLを生成する。
 * - localhost: SSRFブロック回避のため相対パスに変換
 * - Vercel preview URL (*.vercel.app): 同一ホストなので相対パスに変換
 * - 本番URL (kurachi.app): そのまま使用可能
 */
export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null

  // localhostの絶対URLを相対パスに変換
  if (url.startsWith('http://localhost:3000')) {
    return url.replace('http://localhost:3000', '')
  }
  if (url.startsWith('http://localhost')) {
    return url.replace(/^http:\/\/localhost(:\d+)?/, '')
  }

  // Vercel preview URL (https://xxx.vercel.app/media/...) を相対パスに変換
  // 同一ホストなのでSSRFブロック不要
  if (typeof window === 'undefined') {
    // サーバーサイドのみ: VERCEL_URL環境変数があれば、そのホストを相対パスに変換
    const vercelUrl = process.env.VERCEL_URL
    if (vercelUrl && url.startsWith(`https://${vercelUrl}`)) {
      return url.replace(`https://${vercelUrl}`, '')
    }
  }

  return url
}
