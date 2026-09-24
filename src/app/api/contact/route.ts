import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL?.trim() || 'zarak.dev@gmail.com';
    const emailSubject = subject?.trim()
      ? `${name}: ${subject.trim()}`
      : `Message from ${name}`;

    // 1. Resend Integration (Recommended modern, professional email delivery)
    // Free tier: 3,000 emails/month (100 emails/day) - https://resend.com
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const fromAddress = process.env.RESEND_FROM_EMAIL?.trim() || 'Zarak <contact@zarak.pro>';
        const { data, error } = await resend.emails.send({
          from: fromAddress,
          to: recipientEmail,
          replyTo: email,
          subject: emailSubject,
          text: `From: ${name} <${email}>\n${subject?.trim() ? `Subject: ${subject.trim()}\n` : ''}\n${message}\n\n---\nSent via zarak.pro`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 24px auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 28px 24px; color: #111827; box-sizing: border-box;">
              
              <!-- Sender Info -->
              <div style="margin-bottom: 18px;">
                <h1 style="margin: 0 0 6px 0; font-size: 19px; font-weight: 600; color: #111827; letter-spacing: -0.2px;">
                  ${name}
                </h1>
                <div style="font-size: 14px; color: #6b7280;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                  ${subject?.trim() ? `<span style="color: #d1d5db; margin: 0 8px;">·</span><span style="color: #4b5563;">${subject.trim()}</span>` : ''}
                </div>
              </div>

              <div style="border-top: 1px solid #f3f4f6; margin-bottom: 20px;"></div>

              <!-- Message -->
              <div style="font-size: 15px; line-height: 1.6; color: #1f2937; white-space: pre-wrap; margin-bottom: 26px;">
${message}
              </div>

              <div style="border-top: 1px solid #f3f4f6; padding-top: 14px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="text-align: left; font-size: 12px; color: #9ca3af;">
                      zarak.pro
                    </td>
                    <td style="text-align: right; font-size: 12px;">
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
                        Reply to ${name} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

            </div>
          `,
        });

        if (error) {
          console.warn('Resend provider error, falling back to next provider:', error);
        } else {
          return NextResponse.json({
            success: true,
            provider: 'resend',
            message: 'Email sent successfully!',
            data,
          });
        }
      } catch (resendError) {
        console.warn('Resend dispatch failed, attempting fallback:', resendError);
      }
    }

    // 2. Web3Forms Integration (Free tier backup)
    if (process.env.WEB3FORMS_ACCESS_KEY && process.env.WEB3FORMS_ACCESS_KEY.trim() !== '') {
      try {
        const w3fRes = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name: `${name} (Portfolio)`,
            email,
            subject: emailSubject,
            message,
            from_name: `${name} — Zarak Portfolio`,
          }),
        });
        const w3fData = await w3fRes.json().catch(() => ({}));
        if (w3fRes.ok && w3fData.success) {
          return NextResponse.json({
            success: true,
            provider: 'web3forms',
            message: 'Email sent successfully!',
          });
        }
      } catch (w3fError) {
        console.warn('Web3Forms dispatch failed:', w3fError);
      }
    }

    // 3. FormSubmit fallback with enhanced branding and direct reply-to
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: `${name} via Portfolio`,
        email,
        _replyto: email,
        _subject: emailSubject,
        message,
        _captcha: 'false',
        _template: 'box',
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (data?.message && typeof data.message === 'string' && data.message.includes('Activation')) {
      return NextResponse.json({
        success: true,
        needsActivation: true,
        message: `An activation email has been sent to ${recipientEmail}. Please check your inbox and click 'Activate Form' once to begin receiving submissions.`,
      });
    }

    if (!response.ok || data?.success === 'false') {
      return NextResponse.json(
        { error: data?.message || 'Failed to dispatch email via provider' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      provider: 'formsubmit',
      message: 'Email sent successfully!',
      providerResponse: data,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
