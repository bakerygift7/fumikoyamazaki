import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message } = await request.json();

    const fromAddress = 'Fumiko Yamazaki <noreply@yamazakifumiko.com>'; 
    
    // 受信したいメールアドレス（ふみさんのアドレス）
    const toAddress = 'fumikoara2311@gmail.com'; 

    // 1. 管理者への通知メール
    const notify = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      subject: `【HPお問い合わせ】${name}様より`,
      text: `
お問い合わせがありました。

━━━━━━━━━━━━━━━━━
お名前: ${name}
メールアドレス: ${email}
━━━━━━━━━━━━━━━━━
【お問い合わせ内容】
${message}
━━━━━━━━━━━━━━━━━
      `,
    });

    if (notify.error) {
      console.error('通知メール送信エラー:', notify.error);
      return NextResponse.json({ error: notify.error }, { status: 500 });
    }

    // 2. お問い合わせ者への自動返信メール
    const autoReply = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: `【山﨑史子】お問い合わせを受け付けました`,
      text: `
${name} 様

お問い合わせいただきありがとうございます。
運動指導者育成コーチ 山﨑史子です。

内容を確認の上、3営業日以内にご連絡いたします。
今しばらくお待ちください。

━━━━━━━━━━━━━━━━━
【お問い合わせ内容】
${message}
━━━━━━━━━━━━━━━━━

山﨑 史子
運動指導者育成コーチ
未来書き換え自分年表作成講座 認定講師

━━━━━━━━━━━━━━━━━
※このメールは自動返信です。返信はできません。
      `,
    });

    if (autoReply.error) {
      console.error('自動返信メール送信エラー:', autoReply.error);
      return NextResponse.json({ error: autoReply.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('予期せぬエラー:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
