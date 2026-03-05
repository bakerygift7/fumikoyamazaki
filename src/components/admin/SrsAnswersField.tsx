'use client'

import { useFormFields } from '@payloadcms/ui'

const QUESTIONS = [
  '人から「売り込まれている」と感じさせずに、商品やサービスを自然に買ってもらうことができていますか？',
  'あなたの商品・サービスの「本当の価値」を、顧客に完全に理解してもらえていますか？',
  'ビジネスの成長に必要な「新規顧客の獲得」と「既存顧客の維持」のバランスがとれていますか？',
  '顧客が「また買いたい」と思うような仕組み（リピート購入の導線）ができていますか？',
  '競合他社と比べたとき、あなたのビジネスが「選ばれる明確な理由」を言語化できていますか？',
  'ターゲット顧客が「どこにいるか」を把握し、効率よくアプローチできていますか？',
  '広告やSNSなど、集客のための施策を定期的に実行できていますか？',
  '価格設定に自信があり、値下げせずに顧客を獲得できていますか？',
  '顧客からのフィードバックを収集し、商品・サービス改善に活かせていますか？',
  'セールス（営業）プロセスが仕組み化されており、誰でも再現できますか？',
  '毎月の売上目標と達成状況を、数字で把握できていますか？',
  '利益率を把握し、ビジネスが健全な収益を生み出していますか？',
  'キャッシュフロー（資金繰り）の見通しが立ち、資金不足の不安がありませんか？',
  '主要なコスト（固定費・変動費）を管理し、無駄な支出を削減できていますか？',
  '財務データを元に、経営の意思決定ができていますか？',
  'ビジネスに必要な業務が「仕組み化・マニュアル化」され、あなた以外でも回せますか？',
  '従業員やパートナーへの「権限委譲（任せること）」ができていますか？',
  '日々の業務の中で、本来の目標に集中できる時間を確保できていますか？',
  'チームや協力者とのコミュニケーションがスムーズで、認識のズレが少ないですか？',
  '新しいツールや技術（AIを含む）を積極的に取り入れ、業務効率化を進めていますか？',
  'ビジネスの「10年後のビジョン」が明確にあり、それを言語化できていますか？',
  '現在取り組んでいることが、そのビジョンの実現に直結していると確信できますか？',
  '自分の「強み」と「弱み」を客観的に把握し、戦略に活かせていますか？',
  '市場や業界のトレンドを常に把握し、変化に対応する柔軟性がありますか？',
  '失敗や挫折から素早く立ち直り、学びに変える精神的な強さがありますか？',
  '家族や大切な人との時間を十分に確保しながら、ビジネスを運営できていますか？',
  '心身の健康を維持しながら、持続可能なペースで仕事できていますか？',
  '自分の「なぜこのビジネスをするのか（WHY）」を明確に語れますか？',
  'お金のためだけでなく、このビジネスに情熱と使命感を持って取り組めていますか？',
  '今のビジネスのあり方に、全体として満足していますか？',
]

export const SrsAnswersField: React.FC = () => {
  const answersField = useFormFields(([fields]) => fields['answers'])
  const answers = answersField?.value as Record<string, string | boolean> | null | undefined

  if (!answers || typeof answers !== 'object') {
    return (
      <div style={{ padding: '12px', color: '#888', fontSize: '14px' }}>
        回答データなし
      </div>
    )
  }

  return (
    <div style={{ padding: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px', width: '40px', color: '#6b7280' }}>No.</th>
            <th style={{ textAlign: 'left', padding: '8px 12px', color: '#6b7280' }}>質問</th>
            <th style={{ textAlign: 'center', padding: '8px 12px', width: '80px', color: '#6b7280' }}>回答</th>
          </tr>
        </thead>
        <tbody>
          {QUESTIONS.map((question, index) => {
            const key = String(index + 1)
            const answer = answers[key]
            return (
              <tr key={key} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                <td style={{ padding: '8px 12px', color: '#9ca3af', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ padding: '8px 12px', lineHeight: '1.5' }}>{question}</td>
                <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                  {answer === true || answer === 'yes' ? (
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>YES</span>
                  ) : answer === false || answer === 'no' ? (
                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>NO</span>
                  ) : (
                    <span style={{ color: '#d1d5db' }}>-</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
