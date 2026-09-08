import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getZarakContext } from '@/lib/ai-context';
import { generateOfflineResponse } from '@/lib/ai-offline';

function createStreamResponse(text: string) {
  // Split into natural word/token chunks for smooth streaming
  const tokens = text.split(/(\s+)/);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for (const token of tokens) {
          controller.enqueue(new TextEncoder().encode(token));
          // Realistic typing cadence (15ms per token)
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const lastUserMessage =
      [...messages].reverse().find((m: any) => m.role === 'user')?.content || '';

    // 1. If GEMINI_API_KEY is configured, attempt live streaming generation
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const formattedMessages = messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }));

        const responseStream = await ai.models.generateContentStream({
          model: 'gemini-2.5-flash',
          contents: formattedMessages,
          config: {
            systemInstruction: getZarakContext(),
            temperature: 0.2,
          },
        });

        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of responseStream) {
                if (chunk.text) {
                  controller.enqueue(new TextEncoder().encode(chunk.text));
                }
              }
              controller.close();
            } catch (e) {
              controller.error(e);
            }
          },
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      } catch (apiError) {
        console.warn(
          'Gemini API error (falling back to portfolio intelligence knowledge engine):',
          apiError
        );
        // Gracefully fall through to the portfolio intelligence fallback below
      }
    }

    // 2. Offline / Resilient Knowledge Engine
    // Delivers context-grounded responses without requiring an external API key or network call
    const fallbackResponse = generateOfflineResponse(lastUserMessage);
    return createStreamResponse(fallbackResponse);
  } catch (error: any) {
    console.error('AI Route Error:', error);
    // Even on server-level errors, return a graceful response instead of an unhandled failure
    return createStreamResponse(
      "I am Zarak's AI assistant. I'm here to answer questions about his software engineering career, projects like Dentally and Exynos Cooky, and technical stack. Feel free to ask about his projects or skills!"
    );
  }
}
