'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Modality, Type, AudioTranscriptionConfigMode } from '@google/genai';
import { Mic, MicOff, PhoneOff, MessageSquare, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { PCMRecorder, PCMPlayer } from '@/lib/audio-stream';
import { getZarakContext } from '@/lib/ai-context';

interface LiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToChat: () => void;
  onOpenXRay?: (projectId: string) => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

type ConnectionStatus = 'initializing' | 'connecting' | 'listening' | 'speaking' | 'muted' | 'error' | 'closed';

const QUICK_PROMPTS = [
  'Who are you?',
  'What are your key achievements?',
  'Tell me about Dentally Assist',
  'What is your frontend tech stack?',
];

function GeminiIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

function AimmyLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/aimmy-logo-white.png"
      alt="Aimmyy AI Logo"
      width={24}
      height={24}
      className={className}
      loading="eager"
    />
  );
}

export default function LiveVoiceModal({
  isOpen,
  onClose,
  onSwitchToChat,
  onOpenXRay,
  onOpenCaseStudy,
}: LiveVoiceModalProps) {
  const [status, setStatus] = useState<ConnectionStatus>('initializing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0);
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [aimmyTranscript, setAimmyTranscript] = useState<string>('');
  const [toolActionNotice, setToolActionNotice] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  // References to keep state across async loops & callbacks
  const sessionRef = useRef<any>(null);
  const recorderRef = useRef<PCMRecorder | null>(null);
  const playerRef = useRef<PCMPlayer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  // Mobile detection for responsive orb & volume pulse rings
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll transcript to reveal latest speech without layout shift
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [aimmyTranscript, userTranscript]);

  // Clean shutdown
  const cleanup = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current = null;
    }
    if (playerRef.current) {
      playerRef.current.close();
      playerRef.current = null;
    }
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch {}
      sessionRef.current = null;
    }
  }, []);

  const handleEndCall = useCallback(() => {
    isClosingRef.current = true;
    cleanup();
    setStatus('closed');
    onClose();
  }, [cleanup, onClose]);

  const handleReconnect = useCallback(() => {
    cleanup();
    setStatus('initializing');
    setErrorMessage(null);
    setSessionKey((k) => k + 1);
  }, [cleanup]);

  // Connect to Gemini Live
  useEffect(() => {
    if (!isOpen) {
      cleanup();
      return;
    }

    isClosingRef.current = false;
    let isCancelled = false;

    // Tool execution handler (defined early so callbacks have access)
    const handleToolCalls = (calls: any[], activeSession: any) => {
      const responses: any[] = [];
      for (const call of calls) {
        let result: Record<string, any> = { success: true };
        try {
          if (call.name === 'openProjectXRay' && onOpenXRay) {
            const pId = call.args?.projectId;
            onOpenXRay(pId);
            setToolActionNotice(`Aimmyy opened Architectural X-Ray for ${pId}`);
            result = { success: true, message: `Opened X-Ray for ${pId}` };
          } else if (call.name === 'openCaseStudy' && onOpenCaseStudy) {
            const pId = call.args?.projectId;
            onOpenCaseStudy(pId);
            setToolActionNotice(`Aimmyy opened Case Study for ${pId}`);
            result = { success: true, message: `Opened case study for ${pId}` };
          } else if (call.name === 'navigateToSection') {
            const sId = call.args?.sectionId;
            const el = document.getElementById(sId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              setToolActionNotice(`Navigated to ${sId} section`);
              result = { success: true, message: `Navigated to ${sId}` };
            }
          }
        } catch (err: any) {
          result = { success: false, error: err.message };
        }

        responses.push({
          name: call.name,
          id: call.id,
          response: { output: result },
        });
      }

      const targetSession = activeSession || sessionRef.current;
      if (targetSession && responses.length > 0) {
        try {
          targetSession.sendToolResponse({ functionResponses: responses });
        } catch (tErr) {
          console.warn('Error sending tool response:', tErr);
        }
      }
    };

    async function startSession() {
      try {
        setStatus('initializing');
        setErrorMessage(null);
        setUserTranscript('');
        setAimmyTranscript('');
        setToolActionNotice(null);

        // 1. Fetch ephemeral session token from server
        const tokenRes = await fetch('/api/ai/live-token', { method: 'POST' });
        if (!tokenRes.ok) {
          const errData = await tokenRes.json().catch(() => null);
          const errMsg = errData?.error || 'Unable to generate ephemeral token for Gemini Live';
          if (tokenRes.status === 429 || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('rate')) {
            throw new Error('Gemini API rate limit reached. Please wait a minute or switch to text chat.');
          }
          throw new Error(errMsg);
        }
        const { token, model } = await tokenRes.json();
        if (isCancelled) return;

        setStatus('connecting');

        // 2. Initialize Audio Player and Recorder
        const player = new PCMPlayer();
        playerRef.current = player;

        const recorder = new PCMRecorder();
        recorderRef.current = recorder;

        // 3. Connect to Gemini Live using @google/genai SDK with ephemeral token
        const ai = new GoogleGenAI({
          apiKey: token,
          httpOptions: { apiVersion: 'v1alpha' },
        });

        const liveModel = model || 'gemini-3.1-flash-live-preview';

        const session = await ai.live.connect({
          model: liveModel,
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: 'Aoede', // Warm, clear feminine voice
                },
              },
            },
            systemInstruction: {
              parts: [{ text: getZarakContext() }],
            },
            inputAudioTranscription: { mode: AudioTranscriptionConfigMode.SMART },
            outputAudioTranscription: {},
            tools: [
              {
                functionDeclarations: [
                  {
                    name: 'openProjectXRay',
                    description: 'Open the architectural system diagram (X-Ray) for a project so the visitor can inspect its system design.',
                    parameters: {
                      type: Type.OBJECT,
                      properties: {
                        projectId: {
                          type: Type.STRING,
                          description: 'Project ID: "dentally", "appointlo", "exynos-cooky", "moneyflow", "fyp-connect"',
                        },
                      },
                      required: ['projectId'],
                    },
                  },
                  {
                    name: 'openCaseStudy',
                    description: 'Open the comprehensive case study modal for a project.',
                    parameters: {
                      type: Type.OBJECT,
                      properties: {
                        projectId: {
                          type: Type.STRING,
                          description: 'Project ID: "dentally", "appointlo", "exynos-cooky", "moneyflow", "fyp-connect"',
                        },
                      },
                      required: ['projectId'],
                    },
                  },
                  {
                    name: 'navigateToSection',
                    description: 'Scroll smoothly to any section on Zarak\'s portfolio page.',
                    parameters: {
                      type: Type.OBJECT,
                      properties: {
                        sectionId: {
                          type: Type.STRING,
                          description: 'Section ID: "top", "about", "experience", "projects", "skills", "education", "recommendations", "contact"',
                        },
                      },
                      required: ['sectionId'],
                    },
                  },
                ],
              },
            ],
          },
          callbacks: {
            onopen: () => {
              if (isCancelled || isClosingRef.current) return;
              setStatus('listening');

              // Start recording user audio and streaming into session
              recorder
                .start((base64Pcm16) => {
                  if (sessionRef.current) {
                    try {
                      sessionRef.current.sendRealtimeInput({
                        audio: {
                          data: base64Pcm16,
                          mimeType: 'audio/pcm;rate=16000',
                        },
                      });
                    } catch (sendErr) {
                      console.warn('Live audio send error:', sendErr);
                    }
                  }
                })
                .catch((micErr) => {
                  console.error('Microphone error:', micErr);
                  setErrorMessage('Microphone access was denied or is unavailable. You can still use text chat!');
                  setStatus('error');
                });
            },
            onmessage: (msg: any) => {
              if (isCancelled || isClosingRef.current) return;

              // 1. Process Tool Calls immediately (even if accompanied by serverContent)
              if (msg.toolCall?.functionCalls) {
                handleToolCalls(msg.toolCall.functionCalls, sessionRef.current || session);
              }

              // 2. Check for server goAway frame (session expiry / rate limit notice)
              if (msg.goAway) {
                console.warn('Gemini Live session time-out warning:', msg.goAway);
              }

              const content = msg.serverContent;
              if (!content) return;

              // Handle interruption: visitor spoke while Aimmyy was speaking
              if (content.interrupted) {
                player.stopAndClear();
                setStatus('listening');
                return;
              }

              // Handle model turn audio
              if (content.modelTurn?.parts) {
                for (const part of content.modelTurn.parts) {
                  if (part.inlineData?.data) {
                    player.playChunk(part.inlineData.data);
                    setStatus('speaking');
                  }
                }
              }

              // Handle live input transcription (what user spoke)
              if (content.inputTranscription?.text) {
                setUserTranscript(content.inputTranscription.text);
              }

              // Handle live output transcription (what Aimmyy said)
              if (content.outputTranscription?.text) {
                setAimmyTranscript((prev) => prev + content.outputTranscription.text);
              }

              // When turn completes and audio finishes, return to listening
              if (content.turnComplete) {
                setTimeout(() => {
                  if (!isClosingRef.current && status !== 'error') {
                    setStatus('listening');
                  }
                }, 300);
              }
            },
            onerror: (err: any) => {
              console.error('Gemini Live WebSocket error:', err);
              if (!isClosingRef.current) {
                const isRateLimit =
                  String(err?.message || '').toLowerCase().includes('quota') ||
                  String(err?.message || '').includes('429');
                setErrorMessage(
                  isRateLimit
                    ? 'Gemini Live rate limit reached. Please wait a moment or switch to text chat.'
                    : 'Voice connection was interrupted. Tap Reconnect or switch to text chat.'
                );
                setStatus('error');
              }
            },
            onclose: (e: any) => {
              console.log('Gemini Live WebSocket closed:', e?.code, e?.reason);
              if (!isClosingRef.current && status !== 'error') {
                if (e?.code === 1008 || e?.code === 1011) {
                  setErrorMessage('Session limit reached by Gemini. Tap Reconnect to restart.');
                  setStatus('error');
                } else {
                  setStatus('closed');
                }
              }
            },
          },
        });

        sessionRef.current = session;

        // 4. Volume visualizer loop
        const updateVisualizer = () => {
          if (isClosingRef.current) return;
          let currentVol = 0;
          if (player.getIsPlaying()) {
            currentVol = player.getVolume();
            setStatus('speaking');
          } else if (recorder) {
            currentVol = recorder.getVolume();
          }
          setVolume(currentVol);
          animFrameRef.current = requestAnimationFrame(updateVisualizer);
        };
        animFrameRef.current = requestAnimationFrame(updateVisualizer);

      } catch (err: any) {
        console.error('Failed to start Live Voice session:', err);
        if (!isCancelled) {
          const isQuota =
            err?.message?.toLowerCase().includes('quota') ||
            err?.message?.includes('429') ||
            err?.message?.toLowerCase().includes('resource_exhausted');
          setErrorMessage(
            isQuota
              ? 'Gemini API free-tier quota/rate limit reached. Please wait a moment or use text chat.'
              : err.message || 'Unable to connect to Gemini Live voice service.'
          );
          setStatus('error');
        }
      }
    }

    startSession();

    return () => {
      isCancelled = true;
      cleanup();
    };
  }, [isOpen, sessionKey, cleanup, onOpenXRay, onOpenCaseStudy]);

  const toggleMute = () => {
    if (recorderRef.current) {
      const nextMuted = !isMuted;
      recorderRef.current.setMuted(nextMuted);
      setIsMuted(nextMuted);
      if (nextMuted) setStatus('muted');
      else setStatus('listening');
    }
  };

  const handleSendPrompt = (text: string) => {
    if (sessionRef.current) {
      try {
        // In Gemini Live API, text prompts must be sent via sendClientContent with turnComplete: true
        sessionRef.current.sendClientContent({
          turns: [
            {
              role: 'user',
              parts: [{ text }],
            },
          ],
          turnComplete: true,
        });
        setUserTranscript(text);
      } catch (err) {
        console.warn('Failed to send prompt:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
        {/* Fullscreen Translucent Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/35 dark:bg-black/60 backdrop-blur-xl sm:backdrop-blur-2xl"
          onClick={handleEndCall}
        />

        {/* Central iPhone iOS 26 Glassmorphic Voice Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-[calc(100vw-1.5rem)] sm:max-w-lg max-h-[92dvh] overflow-y-auto no-scrollbar flex-col items-center rounded-[2rem] sm:rounded-[2.85rem] border border-white/80 dark:border-white/20 bg-white/85 dark:bg-gradient-to-b dark:from-[#262626]/85 dark:via-[#141414]/90 dark:to-[#000000]/95 p-4 sm:p-8 shadow-[0_24px_70px_-12px_rgba(0,0,0,0.12),_inset_0_1.5px_2px_rgba(255,255,255,0.95),_0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.85),_inset_0_1px_1px_rgba(255,255,255,0.35),_0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-3xl"
        >
          {/* iOS Specular Refraction Gloss Sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 sm:-top-28 left-1/2 h-44 sm:h-52 w-72 sm:w-80 -translate-x-1/2 rounded-full bg-white/50 dark:bg-white/12 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 sm:-bottom-28 left-1/2 h-48 sm:h-56 w-64 sm:w-72 -translate-x-1/2 rounded-full bg-black/[0.02] dark:bg-white/[0.04] blur-3xl"
          />

          {/* iOS Dynamic Island Style Header Bar */}
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.08] px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.3)] backdrop-blur-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.06] dark:bg-white/10 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-medium text-zinc-800 dark:text-white/85">
                <GeminiIcon className="h-3 w-3 text-zinc-900 dark:text-white" />
                <span>Aimmyy Live</span>
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-2xl">
              <span
                className={`flex h-2 w-2 rounded-full ${
                  status === 'speaking'
                    ? 'animate-ping bg-emerald-500 dark:bg-emerald-400'
                    : status === 'listening'
                    ? 'animate-pulse bg-zinc-900 dark:bg-white'
                    : status === 'connecting' || status === 'initializing'
                    ? 'animate-spin bg-amber-500 dark:bg-amber-400'
                    : status === 'muted'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
              />
              <span className="font-mono text-[10px] sm:text-[11px] font-medium capitalize text-zinc-700 dark:text-white/80">
                {status === 'speaking'
                  ? 'Speaking'
                  : status === 'listening'
                  ? 'Listening'
                  : status === 'connecting' || status === 'initializing'
                  ? 'Connecting...'
                  : status === 'muted'
                  ? 'Muted'
                  : status === 'error'
                  ? 'Offline'
                  : 'Ready'}
              </span>
            </div>
          </div>

          {/* Tool Action Notification Badge */}
          <AnimatePresence>
            {toolActionNotice && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative z-10 mt-2 sm:mt-3 flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/25 bg-black/[0.06] dark:bg-white/15 px-3 sm:px-3.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium text-zinc-900 dark:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-xl"
              >
                <ArrowRight className="h-3 w-3 text-zinc-600 dark:text-[#CCCCCC]" />
                <span>{toolActionNotice}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centerpiece: iPhone Glass Orb with Dynamic Fluid Volume Rings */}
          <div className="relative my-4 sm:my-7 flex items-center justify-center">
            {/* Dynamic Volume Pulse Rings */}
            <motion.div
              className="pointer-events-none absolute rounded-full bg-black/[0.04] dark:bg-white/10 blur-xl"
              animate={{
                width: (isMobile ? 95 : 135) + volume * (isMobile ? 35 : 85),
                height: (isMobile ? 95 : 135) + volume * (isMobile ? 35 : 85),
                opacity: 0.25 + volume * 0.75,
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
            <motion.div
              className="pointer-events-none absolute rounded-full bg-zinc-400/15 dark:bg-[#CCCCCC]/15 blur-2xl"
              animate={{
                width: (isMobile ? 120 : 170) + volume * (isMobile ? 45 : 110),
                height: (isMobile ? 120 : 170) + volume * (isMobile ? 45 : 110),
                opacity: 0.2 + volume * 0.6,
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />

            {/* Core iOS Glass Sphere */}
            <motion.div
              className="relative flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full border border-white/90 dark:border-white/35 bg-gradient-to-br from-white via-zinc-100/90 to-zinc-200/80 dark:from-white/20 dark:via-[#262626]/85 dark:to-[#000000]/95 shadow-[inset_0_2px_4px_rgba(255,255,255,1),_0_16px_36px_-8px_rgba(0,0,0,0.12),_0_0_0_1px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),_0_20px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              whileHover={{ scale: 1.05 }}
              animate={
                status === 'speaking'
                  ? { scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] }
                  : { scale: 1 }
              }
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AimmyLogo className="h-9 sm:h-12 w-auto object-contain transition-all invert dark:invert-0 drop-shadow-[0_0_12px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_0_16px_rgba(255,255,255,0.6)]" />
            </motion.div>
          </div>

          {/* Waveform Visualizer Bars */}
          <div className="mb-4 sm:mb-6 flex h-8 sm:h-10 items-center justify-center gap-1 sm:gap-1.5 px-3">
            {Array.from({ length: 20 }).map((_, idx) => {
              const factor = Math.sin((idx / 20) * Math.PI);
              const maxMultiplier = isMobile ? 22 : 36;
              const barHeight = Math.max(3, volume * maxMultiplier * factor + Math.random() * 3);
              return (
                <motion.span
                  key={idx}
                  className={`w-0.5 sm:w-1 rounded-full transition-all duration-75 ${
                    status === 'speaking'
                      ? 'bg-gradient-to-t from-zinc-700 to-zinc-950 shadow-[0_0_6px_rgba(0,0,0,0.2)] dark:from-[#CCCCCC] dark:to-white dark:shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                      : status === 'listening'
                      ? 'bg-gradient-to-t from-zinc-400 to-zinc-600 dark:from-[#666666] dark:to-[#CCCCCC]'
                      : 'bg-black/15 dark:bg-white/20'
                  }`}
                  style={{ height: `${barHeight}px` }}
                />
              );
            })}
          </div>

          {/* Live Transcript / Caption Glass Box */}
          <div
            ref={transcriptContainerRef}
            className="relative z-10 mb-4 sm:mb-6 flex w-full max-h-24 sm:max-h-32 min-h-[60px] sm:min-h-[72px] flex-col gap-1.5 overflow-y-auto no-scrollbar rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] p-3 sm:p-4 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),_0_6px_20px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.18),_0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
          >
            {userTranscript && (
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-[#CCCCCC]">
                <span className="font-semibold text-zinc-900 dark:text-white">You:</span> “{userTranscript}”
              </p>
            )}
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-zinc-900 dark:text-white">
              {aimmyTranscript ? (
                `“${aimmyTranscript.slice(-180)}”`
              ) : status === 'speaking' ? (
                <span className="text-zinc-900 dark:text-white font-semibold">Aimmyy is answering...</span>
              ) : status === 'listening' ? (
                <span className="text-zinc-600 dark:text-[#CCCCCC]">Listening... Speak naturally, Aimmyy is all ears 👂</span>
              ) : status === 'connecting' || status === 'initializing' ? (
                <span className="flex items-center justify-center gap-2 text-zinc-600 dark:text-[#CCCCCC]">
                  <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin text-zinc-900 dark:text-white" />
                  Connecting to Gemini Live...
                </span>
              ) : status === 'muted' ? (
                <span className="text-amber-600 dark:text-amber-300">Microphone is muted. Tap Unmute to speak.</span>
              ) : (
                <span className="text-zinc-400 dark:text-[#999999]">Ready</span>
              )}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="relative z-10 mb-3 sm:mb-4 flex w-full flex-col gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 dark:bg-rose-500/15 p-3 sm:p-3.5 text-left text-xs text-rose-800 dark:text-rose-200 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.4)] backdrop-blur-xl">
              <div className="flex items-start gap-2 sm:gap-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                <div className="flex-1">
                  <p className="font-semibold">Voice connection error</p>
                  <p className="mt-0.5 opacity-90">{errorMessage}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleReconnect}
                  className="rounded-full border border-zinc-400/40 dark:border-white/30 bg-black/10 dark:bg-white/15 px-3 py-1 text-[11px] font-medium text-zinc-900 dark:text-white transition-colors hover:bg-black/20 dark:hover:bg-white/25"
                >
                  Reconnect ↻
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleEndCall();
                    onSwitchToChat();
                  }}
                  className="rounded-full border border-rose-400/40 bg-rose-500/15 dark:bg-rose-500/20 px-3 py-1 text-[11px] font-medium text-rose-900 dark:text-rose-100 transition-colors hover:bg-rose-500/25"
                >
                  Switch to Text Chat →
                </button>
              </div>
            </div>
          )}

          {/* Quick Suggestions Frosted Glass Pills */}
          <div className="relative z-10 mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendPrompt(prompt)}
                className="rounded-full border border-black/[0.08] dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.07] px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium text-zinc-700 dark:text-[#CCCCCC] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-xl transition-all duration-200 hover:border-black/25 dark:hover:border-white/35 hover:bg-black/[0.08] dark:hover:bg-white/[0.16] hover:text-zinc-950 dark:hover:text-white hover:scale-[1.03] active:scale-[0.97]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* iOS Floating Island Dock Toolbar */}
          <div className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3.5 rounded-full border border-black/[0.08] dark:border-white/20 bg-black/[0.04] dark:bg-white/[0.08] p-1.5 sm:p-2 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.95),_0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl">
            {/* Mute Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggleMute}
              className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border transition-all ${
                isMuted
                  ? 'border-amber-500/50 bg-amber-500/20 text-amber-600 dark:border-amber-400/50 dark:bg-amber-500/25 dark:text-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.3)]'
                  : 'border-black/[0.08] dark:border-white/20 bg-white/70 dark:bg-white/[0.12] text-zinc-800 dark:text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.25)] hover:bg-white/90 dark:hover:bg-white/[0.2]'
              }`}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Mic className="h-4 w-4 sm:h-5 sm:w-5" />}
            </motion.button>

            {/* Apple Style Red Call End Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleEndCall}
              className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#FF3B30] text-white shadow-[0_8px_24px_rgba(255,59,48,0.5),_inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all hover:bg-[#FF453A]"
              title="End Voice Call"
            >
              <PhoneOff className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>

            {/* Switch to Text Chat Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                handleEndCall();
                onSwitchToChat();
              }}
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/20 bg-white/70 dark:bg-white/[0.12] text-zinc-800 dark:text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.25)] transition-all hover:bg-white/90 dark:hover:bg-white/[0.2]"
              title="Switch to Text Chat"
            >
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
