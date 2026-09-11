'use client';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Bot, X, Send, Sparkles, Loader2, Briefcase, FolderGit2, Wrench, Github, Download, FileDown, Mic } from 'lucide-react';
import AiMessage from './AiMessage';

// Dynamically import heavy WebAudio & Gemini Live streaming module on-demand
const LiveVoiceModal = dynamic(() => import('./LiveVoiceModal'), { ssr: false });

interface AskZarakProps {
  onOpenXRay: (projectId: string) => void;
  onOpenCaseStudy?: (projectId: string) => void;
  initialContextMessage?: string | null;
  onClearContextMessage?: () => void;
}

interface Message {
  role: 'user' | 'model';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What does Zarak specialize in?",
  "Tell me about Dentally.",
  "Which projects use Redux Toolkit?",
  "Show me his AI-related work.",
];

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

export default function AskZarak({
  onOpenXRay,
  onOpenCaseStudy,
  initialContextMessage,
  onClearContextMessage,
}: AskZarakProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isRadialOpen, setIsRadialOpen] = useState(false);
  const [radius, setRadius] = useState(135);
  const triggerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content:
        "Hey! I'm Aimmyy. ✨ Zarak spends an unreasonable amount of time building things, so I'm here to show off his work. I can walk you through his projects, frontend architectures, or open Project X-Ray. What would you like to explore?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle responsive radius for desktop vs mobile
  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 100 : 135);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Handle incoming context message from X-Ray
  useEffect(() => {
    if (initialContextMessage && !isOpen) {
      setIsOpen(true);
      setIsRadialOpen(false);
      setInput(initialContextMessage);
      if (onClearContextMessage) onClearContextMessage();
    }
  }, [initialContextMessage, isOpen, onClearContextMessage]);

  // Global listener for opening Aimmyyy AI from navigation or cards
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsRadialOpen(false);
    };
    window.addEventListener('open-aimmyyy-ai', handleOpen);
    return () => window.removeEventListener('open-aimmyyy-ai', handleOpen);
  }, []);

  // Global listener for opening Aimmyyy Live Voice
  useEffect(() => {
    const handleOpenVoice = () => {
      setIsVoiceOpen(true);
      setIsOpen(false);
      setIsRadialOpen(false);
    };
    window.addEventListener('open-aimmyyy-voice', handleOpenVoice);
    return () => window.removeEventListener('open-aimmyyy-voice', handleOpenVoice);
  }, []);

  // Close radial menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!isRadialOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsRadialOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsRadialOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRadialOpen]);

  const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();

    const messageText = overrideInput || input;
    if (!messageText.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: messageText.trim() }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to fetch response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Add a placeholder message for the streaming response
      setMessages((prev) => [...prev, { role: 'model', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [
            ...prev.slice(0, -1),
            { ...last, content: last.content + chunk },
          ];
        });
      }
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Aimmyy AI is temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
    handleSubmit(undefined, text);
  };

  const radialActions = [
    {
      id: 'chat',
      label: 'Ask Aimmyy',
      angle: 0,
      icon: Sparkles,
      onClick: () => {
        setIsRadialOpen(false);
        setIsOpen(true);
      },
      iconColor: 'text-rose',
      glowHover: 'hover:border-rose/70 hover:shadow-[0_0_24px_rgba(228,64,95,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)]',
      dotColor: 'bg-rose shadow-[0_0_6px_rgba(228,64,95,0.9)]',
      labelPos: 'right-full mr-3.5 top-1/2 -translate-y-1/2',
      labelAnim: { initial: { opacity: 0, x: 8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 8 } },
    },
    {
      id: 'cv',
      label: 'Download CV',
      angle: 45,
      icon: FileDown,
      onClick: () => {
        setIsRadialOpen(false);
        const link = document.createElement('a');
        link.href = '/Zarak_Qaisar_CV.pdf';
        link.download = 'Zarak_Qaisar_CV.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      iconColor: 'text-emerald-400',
      glowHover: 'hover:border-emerald-400/60 hover:shadow-[0_0_24px_rgba(52,211,153,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)]',
      dotColor: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]',
      labelPos: 'right-full mr-3.5 top-1/2 -translate-y-1/2',
      labelAnim: { initial: { opacity: 0, x: 8 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 8 } },
    },
    {
      id: 'voice',
      label: 'Voice Mode',
      angle: 90,
      icon: Mic,
      onClick: () => {
        setIsRadialOpen(false);
        setIsVoiceOpen(true);
      },
      iconColor: 'text-violet-400',
      glowHover: 'hover:border-violet-400/60 hover:shadow-[0_0_24px_rgba(167,139,250,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)]',
      dotColor: 'bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.9)] animate-pulse',
      labelPos: 'bottom-full mb-3 right-0',
      labelAnim: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } },
    },
  ];

  return (
    <>
      {/* Subtle Backdrop when Radial Menu is open */}
      <AnimatePresence>
        {isRadialOpen && !isOpen && !isVoiceOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsRadialOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating 3-Option Radial AI Button (Inspired by Samsung S Pen Air Command) */}
      <AnimatePresence>
        {!isOpen && !isVoiceOpen && (
          <div
            ref={triggerRef}
            data-aimmyyy-trigger
            className="fixed bottom-6 right-6 sm:bottom-7 sm:right-8 z-50 flex items-center justify-center pointer-events-auto select-none"
          >
            {/* Radial Action Buttons (0° Ask Aimmyy, 45° Download CV, 90° Voice Mode) */}
            <AnimatePresence>
              {isRadialOpen && (
                <>
                  {/* Subtle Glassmorphic Radial Arc Guide Line */}
                  <svg
                    className="absolute pointer-events-none overflow-visible -z-10"
                    style={{
                      width: radius,
                      height: radius,
                      right: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="radial-track-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#34d399" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${-14} ${-radius}`}
                      fill="none"
                      stroke="url(#radial-track-grad)"
                      strokeWidth="1.5"
                      strokeDasharray="4 5"
                    />
                  </svg>

                  {radialActions.map((action, index) => {
                    const rad = (action.angle * Math.PI) / 180;
                    // Subtle 14px inward offset for Voice Mode so it has generous margin from viewport edge
                    const xOffset = action.angle === 90 ? -14 : 0;
                    const x = -radius * Math.cos(rad) + xOffset;
                    const y = -radius * Math.sin(rad);
                    const Icon = action.icon;

                    return (
                      <motion.div
                        key={action.id}
                        initial={{
                          opacity: 0,
                          scale: 0.4,
                          x: 0,
                          y: 0,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x,
                          y,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.4,
                          x: 0,
                          y: 0,
                        }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0.2, ease: 'easeOut' }
                            : {
                                type: 'spring',
                                stiffness: 400,
                                damping: 25,
                                mass: 0.8,
                                delay: index * 0.05,
                              }
                        }
                        className="absolute flex items-center justify-center pointer-events-auto"
                      >
                        <div className="relative group/action flex items-center justify-center">
                          {/* Label positioned beside the button */}
                          <motion.div
                            initial={action.labelAnim.initial}
                            animate={action.labelAnim.animate}
                            exit={action.labelAnim.exit}
                            transition={{ duration: 0.2, delay: index * 0.05 + 0.08 }}
                            className={`absolute pointer-events-none px-3 py-1 rounded-full bg-[#080d1a]/95 dark:bg-[#050814]/95 backdrop-blur-xl border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] text-white text-xs font-semibold tracking-wide whitespace-nowrap flex items-center gap-2 group-hover/action:border-white/30 transition-colors ${action.labelPos}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${action.dotColor}`} />
                            <span>{action.label}</span>
                          </motion.div>

                          {/* Sleek Glassmorphic Circular Action Button */}
                          <button
                            type="button"
                            onClick={action.onClick}
                            aria-label={action.label}
                            className={`group/btn relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#0c1222] dark:bg-[#070b16] backdrop-blur-2xl border border-white/20 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.28)] hover:bg-[#121c32] hover:scale-115 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer overflow-hidden ${action.glowHover}`}
                          >
                            {/* Inner ambient light sheen */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] via-transparent to-transparent pointer-events-none" />
                            <Icon className={`h-5 w-5 sm:h-5.5 sm:w-5.5 ${action.iconColor} transition-transform duration-300 group-hover/btn:scale-110 relative z-10`} strokeWidth={1.8} aria-hidden="true" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </AnimatePresence>

            {/* Main Central Aimmyy Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsRadialOpen((prev) => !prev)}
              aria-label={isRadialOpen ? 'Close Aimmyy menu' : 'Open Aimmyy menu'}
              aria-expanded={isRadialOpen}
              className="relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#0c1222] dark:bg-[#070b16] backdrop-blur-2xl border-2 border-white/25 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:bg-[#121c32] hover:border-rose/85 hover:shadow-[0_0_28px_rgba(228,64,95,0.55)] group transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose z-50 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] via-transparent to-black/20 pointer-events-none" />
              <AnimatePresence mode="wait" initial={false}>
                {isRadialOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="relative z-10"
                  >
                    <X className="h-5 w-5 text-white" strokeWidth={2} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="logo"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="relative z-10 flex items-center justify-center"
                  >
                    <AimmyLogo className="h-5 sm:h-6 w-auto object-contain transition-transform duration-300 group-hover:rotate-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (Mobile only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 right-0 w-full h-[85dvh] md:h-[600px] md:w-[400px] md:bottom-6 md:right-6 bg-card border-t md:border border-border/80 md:rounded-2xl shadow-2xl z-[101] flex flex-col overflow-hidden glow-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/70 bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center p-1">
                    <AimmyLogo className="h-4 w-auto object-contain" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                      Aimmyy AI
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </h3>
                    <p className="font-mono text-[10px] text-muted-foreground">PORTFOLIO INTELLIGENCE SYSTEM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsVoiceOpen(true);
                    }}
                    className="flex items-center gap-1.5 rounded-full border border-rose/40 bg-rose/10 hover:bg-rose/20 px-2.5 py-1 text-xs font-semibold text-rose dark:text-rose-300 transition-all hover:shadow-[0_0_15px_rgba(228,64,95,0.25)] active:scale-95"
                    title="Switch to Real-Time Voice Call with Aimmyy"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Live Voice</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background/50">
                {messages.map((msg, idx) => (
                  <AiMessage key={idx} role={msg.role} content={msg.content} onOpenXRay={onOpenXRay} />
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <Loader2 className="w-4 h-4 text-accent animate-spin" />
                    </div>
                    <span className="font-mono text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                      AIMMYY IS ANALYZING ZARAK'S WORK...
                    </span>
                  </motion.div>
                )}

                {error && (
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive font-mono text-xs text-center space-y-3">
                    <p>{error}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      <a
                        href="#projects"
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-1.5 rounded-lg bg-background border border-border hover:bg-secondary transition-colors text-foreground"
                      >
                        Explore Projects
                      </a>
                      <a
                        href="#experience"
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-1.5 rounded-lg bg-background border border-border hover:bg-secondary transition-colors text-foreground"
                      >
                        View Experience
                      </a>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-secondary/20 border-t border-border/70 space-y-3">
                {/* Suggested Chips (Only show if few messages) */}
                {messages.length < 3 && !isLoading && (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuickAction(q)}
                        className="whitespace-nowrap px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-accent-foreground font-mono text-[10px] transition-colors shrink-0"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex justify-center gap-4 text-muted-foreground mb-1">
                  <button
                    onClick={() => handleQuickAction('Tell me about your career experience.')}
                    className="hover:text-accent transition-colors"
                    title="Experience"
                  >
                    <Briefcase className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleQuickAction('What projects have you built?')}
                    className="hover:text-accent transition-colors"
                    title="Projects"
                  >
                    <FolderGit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleQuickAction('What is your tech stack?')}
                    className="hover:text-accent transition-colors"
                    title="Tech Stack"
                  >
                    <Wrench className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleQuickAction('Show me your GitHub repositories.')}
                    className="hover:text-accent transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Aimmyy about Zarak's engineering work..."
                    disabled={isLoading}
                    className="w-full bg-background border border-border rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-sans disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:hover:bg-accent transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Real-time Gemini Live Voice Modal */}
      <LiveVoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onSwitchToChat={() => {
          setIsVoiceOpen(false);
          setIsOpen(true);
        }}
        onOpenXRay={onOpenXRay}
        onOpenCaseStudy={onOpenCaseStudy}
      />
    </>
  );
}
