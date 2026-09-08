import { NextResponse } from 'next/server';

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

    // Forward to FormSubmit for direct delivery to Zarak's primary Gmail
    const response = await fetch('https://formsubmit.co/ajax/zarak.dev@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Referer: 'https://zarak-portfolio.vercel.app',
        Origin: 'https://zarak-portfolio.vercel.app',
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        _subject: subject || `New message from ${name} — Zarak Portfolio`,
        message,
        _captcha: 'false',
        _template: 'table',
        _autoresponse: `Hi ${name}, thanks for reaching out! I'll get back to you shortly. — Zarak`,
      }),
    });

    const data = await response.json().catch(() => ({}));

    const needsActivation = data?.message && typeof data.message === 'string' && data.message.includes('Activation');

    if (needsActivation) {
      return NextResponse.json({
        success: true,
        needsActivation: true,
        message: "An activation link has been sent to zarak.dev@gmail.com. Please check your inbox and click 'Activate Form' to start receiving submissions directly!",
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
      message: 'Message dispatched successfully to zarak.dev@gmail.com',
      providerResponse: data,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
