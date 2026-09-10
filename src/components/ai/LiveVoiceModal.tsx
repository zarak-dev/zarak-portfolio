'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Modality, Type, AudioTranscriptionConfigMode } from '@google/genai';
import { Mic, MicOff, PhoneOff, MessageSquare, Sparkles, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
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

function AimmyLogo({ className }: { className?: string }) {
  return (
    <img
      src="/images/aimmy-logo-white.png"
      alt="Aimmy AI Logo"
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

  // References to keep state across async loops & callbacks
  const sessionRef = useRef<any>(null);
  const recorderRef = useRef<PCMRecorder | null>(null);
  const playerRef = useRef<PCMPlayer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);

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

  // Connect to Gemini Live
  useEffect(() => {
    if (!isOpen) {
      cleanup();
      return;
    }

    isClosingRef.current = false;
    let isCancelled = false;

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
          throw new Error(errData?.error || 'Unable to generate ephemeral token for Gemini Live');
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
        // In v1alpha, ephemeral tokens require apiVersion: 'v1alpha'
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
                  voiceName: 'Aoede', // Sweet, bright, warm feminine voice
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

              const content = msg.serverContent;
              if (!content) {
                // Check for tool call outside serverContent
                if (msg.toolCall?.functionCalls) {
                  handleToolCalls(msg.toolCall.functionCalls, sessionRef.current);
                }
                return;
              }

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
                setErrorMessage('Voice connection was interrupted. You can try reconnecting or switch to text chat.');
                setStatus('error');
              }
            },
            onclose: () => {
              if (!isClosingRef.current && status !== 'error') {
                setStatus('closed');
              }
            },
          },
        });

        sessionRef.current = session;

        // Tool execution handler
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

          if (activeSession && responses.length > 0) {
            try {
              activeSession.sendToolResponse({ functionResponses: responses });
            } catch (tErr) {
              console.warn('Error sending tool response:', tErr);
            }
          }
        };

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
          setErrorMessage(err.message || 'Unable to connect to Gemini Live voice service.');
          setStatus('error');
        }
      }
    }

    startSession();

    return () => {
      isCancelled = true;
      cleanup();
    };
  }, [isOpen, cleanup, onOpenXRay, onOpenCaseStudy]);

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
        sessionRef.current.sendRealtimeInput({ text });
        setUserTranscript(text);
      } catch (err) {
        console.warn('Failed to send prompt:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Fullscreen Translucent Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/55 backdrop-blur-2xl"
          onClick={handleEndCall}
        />

        {/* Central iPhone iOS 26 Glassmorphic Voice Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-lg flex-col items-center overflow-hidden rounded-[2.85rem] border border-white/20 bg-gradient-to-b from-[#34495E]/80 via-[#2C3E50]/85 to-[#2C3E50]/95 p-6 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.7),_inset_0_1px_1px_rgba(255,255,255,0.35),_0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-3xl sm:p-8"
        >
          {/* iOS Specular Refraction Gloss Sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 h-52 w-80 -translate-x-1/2 rounded-full bg-white/12 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-white/[0.04] blur-3xl"
          />

          {/* iOS Dynamic Island Style Header Bar */}
          <div className="relative z-10 flex w-full items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-1.5 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.3)] backdrop-blur-2xl">
              <Sparkles className="h-3.5 w-3.5 text-[#ECF0F1]" />
              <span className="font-mono text-xs font-semibold tracking-wide text-[#ECF0F1]">Aimmyy ✨</span>
              <span className="rounded-full bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-medium text-[#ECF0F1]/75">Gemini Live</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-2xl">
              <span
                className={`flex h-2 w-2 rounded-full ${
                  status === 'speaking'
                    ? 'animate-ping bg-emerald-400'
                    : status === 'listening'
                    ? 'animate-pulse bg-[#ECF0F1]'
                    : status === 'connecting' || status === 'initializing'
                    ? 'animate-spin bg-amber-400'
                    : status === 'muted'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
              />
              <span className="font-mono text-[11px] font-medium capitalize text-[#ECF0F1]/80">
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
                className="relative z-10 mt-3 flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1 text-xs font-medium text-[#ECF0F1] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-xl"
              >
                <ArrowRight className="h-3 w-3 text-[#BDC3C7]" />
                <span>{toolActionNotice}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centerpiece: iPhone Glass Orb with Dynamic Fluid Volume Rings */}
          <div className="relative my-8 flex items-center justify-center">
            {/* Dynamic Volume Pulse Rings */}
            <motion.div
              className="absolute rounded-full bg-white/10 blur-xl"
              animate={{
                width: 140 + volume * 120,
                height: 140 + volume * 120,
                opacity: 0.25 + volume * 0.75,
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
            <motion.div
              className="absolute rounded-full bg-[#BDC3C7]/15 blur-2xl"
              animate={{
                width: 180 + volume * 150,
                height: 180 + volume * 150,
                opacity: 0.2 + volume * 0.6,
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />

            {/* Core iOS Glass Sphere */}
            <motion.div
              className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/35 bg-gradient-to-br from-white/20 via-[#34495E]/85 to-[#2C3E50]/95 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),_0_20px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
              whileHover={{ scale: 1.05 }}
              animate={
                status === 'speaking'
                  ? { scale: [1, 1.06, 1], rotate: [0, 2, -2, 0] }
                  : { scale: 1 }
              }
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AimmyLogo className="h-12 w-auto object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.6)]" />
            </motion.div>
          </div>

          {/* Waveform Visualizer Bars */}
          <div className="mb-6 flex h-10 items-center justify-center gap-1.5 px-4">
            {Array.from({ length: 20 }).map((_, idx) => {
              // Generate variable heights based on live volume and position
              const factor = Math.sin((idx / 20) * Math.PI);
              const barHeight = Math.max(4, volume * 36 * factor + Math.random() * 4);
              return (
                <motion.span
                  key={idx}
                  className={`w-1 rounded-full transition-all duration-75 ${
                    status === 'speaking'
                      ? 'bg-gradient-to-t from-[#BDC3C7] to-[#ECF0F1] shadow-[0_0_8px_rgba(236,240,241,0.5)]'
                      : status === 'listening'
                      ? 'bg-gradient-to-t from-[#7F8C8D] to-[#BDC3C7]'
                      : 'bg-white/20'
                  }`}
                  style={{ height: `${barHeight}px` }}
                />
              );
            })}
          </div>

          {/* Live Transcript / Caption Glass Box */}
          <div className="relative z-10 mb-6 flex w-full flex-col gap-2 rounded-3xl border border-white/15 bg-white/[0.05] p-4 text-center shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.18),_0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
            {userTranscript && (
              <p className="text-xs text-[#BDC3C7]">
                <span className="font-semibold text-[#ECF0F1]">You:</span> “{userTranscript}”
              </p>
            )}
            <p className="text-sm font-medium leading-relaxed text-[#ECF0F1]">
              {aimmyTranscript ? (
                `“${aimmyTranscript.slice(-180)}”`
              ) : status === 'speaking' ? (
                <span className="text-[#ECF0F1] font-semibold">Aimmyy is answering...</span>
              ) : status === 'listening' ? (
                <span className="text-[#BDC3C7]">Listening... Speak naturally, Aimmyy is all ears 👂</span>
              ) : status === 'connecting' || status === 'initializing' ? (
                <span className="flex items-center justify-center gap-2 text-[#BDC3C7]">
                  <Loader2 className="h-4 w-4 animate-spin text-[#ECF0F1]" />
                  Connecting to Gemini Live...
                </span>
              ) : status === 'muted' ? (
                <span className="text-amber-300">Microphone is muted. Tap Unmute to speak.</span>
              ) : (
                <span className="text-[#BDC3C7]/70">Ready</span>
              )}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="relative z-10 mb-4 flex w-full flex-col gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/15 p-3.5 text-left text-xs text-rose-200 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.15)] backdrop-blur-xl">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <div className="flex-1">
                  <p className="font-semibold">Voice connection error</p>
                  <p className="mt-0.5 opacity-90">{errorMessage}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleEndCall();
                  onSwitchToChat();
                }}
                className="self-end rounded-full border border-rose-400/30 bg-rose-500/20 px-3 py-1 text-[11px] font-medium text-rose-100 transition-colors hover:bg-rose-500/30"
              >
                Switch to Text Chat →
              </button>
            </div>
          )}

          {/* Quick Suggestions Frosted Glass Pills */}
          <div className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendPrompt(prompt)}
                className="rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-medium text-[#ECF0F1] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.2)] backdrop-blur-xl transition-all duration-200 hover:border-white/35 hover:bg-white/[0.16] hover:scale-[1.03] active:scale-[0.97]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* iOS Floating Island Dock Toolbar */}
          <div className="relative z-10 flex items-center justify-center gap-3.5 rounded-full border border-white/20 bg-white/[0.08] p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl">
            {/* Mute Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggleMute}
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
                isMuted
                  ? 'border-amber-400/50 bg-amber-500/25 text-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.3)]'
                  : 'border-white/20 bg-white/[0.12] text-[#ECF0F1] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.25)] hover:bg-white/[0.2]'
              }`}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </motion.button>

            {/* Apple Style Red Call End Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleEndCall}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3B30] text-white shadow-[0_8px_24px_rgba(255,59,48,0.55),_inset_0_1px_1px_rgba(255,255,255,0.35)] transition-all hover:bg-[#FF453A]"
              title="End Voice Call"
            >
              <PhoneOff className="h-6 w-6" />
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
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.12] text-[#ECF0F1] shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.25)] transition-all hover:bg-white/[0.2]"
              title="Switch to Text Chat"
            >
              <MessageSquare className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
