import { NextResponse } from 'next/server';
import { GoogleGenAI, Modality } from '@google/genai';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured on the server. Please add your key to .env.local to enable real-time voice with Aimmyy.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const now = Date.now();
    const expireTime = new Date(now + 30 * 60 * 1000).toISOString();
    const newSessionExpireTime = new Date(now + 3 * 60 * 1000).toISOString();

    // Mint an ephemeral token for Gemini Live.
    // Note: Do NOT specify empty liveConnectConstraints without systemInstruction/speechConfig,
    // as the Gemini Live server treats present bidiGenerateContentSetup as authoritative and drops client setup.
    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime,
        newSessionExpireTime,
      },
    });

    if (!token || !token.name) {
      throw new Error('No token returned from Gemini AuthTokens service');
    }

    return NextResponse.json({
      token: token.name,
      model: 'gemini-3.1-flash-live-preview',
    });
  } catch (error: any) {
    console.error('Error generating ephemeral token for Aimmyy Live:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to mint ephemeral session token for Gemini Live' },
      { status: 500 }
    );
  }
}
