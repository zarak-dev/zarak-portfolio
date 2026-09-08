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

    const recipientEmail = process.env.CONTACT_EMAIL || 'zarak.dev@gmail.com';
    const emailSubject = subject?.trim()
      ? `[Portfolio] ${name}: ${subject.trim()}`
      : `[Portfolio Inquiry] New message from ${name}`;

    // 1. Resend Integration (Recommended modern, professional email delivery)
    // Free tier: 3,000 emails/month (100 emails/day) - https://resend.com
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim() !== '') {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: 'Zarak Portfolio <onboarding@resend.dev>',
          to: recipientEmail,
          replyTo: email,
          subject: emailSubject,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0d14; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid #1e2235;">
              <div style="display: inline-block; font-family: monospace; font-size: 11px; font-weight: 700; color: #818cf8; background: rgba(99, 102, 241, 0.15); padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
                // Portfolio Message Dispatch
              </div>
              <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 22px; font-weight: 700;">
                New Message from ${name}
              </h2>
              <div style="background: #131520; border: 1px solid #232738; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #94a3b8; font-family: monospace;">SENDER:</strong> <span style="color: #ffffff; font-weight: 600;">${name}</span></p>
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #94a3b8; font-family: monospace;">EMAIL:</strong> <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></p>
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong style="color: #94a3b8; font-family: monospace;">SUBJECT:</strong> ${subject || 'Direct Contact Form Submission'}</p>
                <p style="margin: 0; font-size: 14px;"><strong style="color: #94a3b8; font-family: monospace;">TIMESTAMP:</strong> ${new Date().toUTCString()}</p>
              </div>
              <div style="background: #171926; border-left: 4px solid #6366f1; padding: 18px 20px; border-radius: 6px; font-size: 15px; line-height: 1.65; color: #f8fafc; white-space: pre-wrap; margin-bottom: 24px;">
${message}
              </div>
              <p style="font-size: 12px; color: #64748b; margin: 0; text-align: center; font-family: monospace;">
                Click "Reply" in your email client to reply directly to ${name} (${email}).
              </p>
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
