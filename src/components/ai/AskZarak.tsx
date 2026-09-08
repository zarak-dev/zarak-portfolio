'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, Loader2, Briefcase, FolderGit2, Wrench, Github } from 'lucide-react';
import AiMessage from './AiMessage';

interface AskZarakProps {
  onOpenXRay: (projectId: string) => void;
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

export default function AskZarak({ onOpenXRay, initialContextMessage, onClearContextMessage }: AskZarakProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content:
        "Hi! I'm Aimmyyy AI, Zarak's AI engineering assistant! ✨ I can answer questions about his career, frontend architectures, projects, and technical skills. What would you like to know?",
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

  // Handle incoming context message from X-Ray
  useEffect(() => {
    if (initialContextMessage && !isOpen) {
      setIsOpen(true);
      setInput(initialContextMessage);
      if (onClearContextMessage) onClearContextMessage();
    }
  }, [initialContextMessage, isOpen, onClearContextMessage]);

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
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Aimmyyy AI is temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
    handleSubmit(undefined, text);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            data-aimmyyy-trigger
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-accent text-accent-foreground shadow-2xl hover:bg-accent/90 transition-colors border border-accent/20 glow-pill group"
            aria-label="Open Aimmyyy AI Assistant"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform text-accent-foreground" />
            <span className="font-mono text-sm font-bold tracking-tight">AIMMYYY AI</span>
          </motion.button>
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
              className="fixed bottom-0 right-0 w-full h-[85vh] md:h-[600px] md:w-[400px] md:bottom-6 md:right-6 bg-card border-t md:border border-border/80 md:rounded-2xl shadow-2xl z-[101] flex flex-col overflow-hidden glow-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/70 bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-1.5">
                      Aimmyyy AI
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </h3>
                    <p className="font-mono text-[10px] text-muted-foreground">PORTFOLIO INTELLIGENCE SYSTEM</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
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
                      AIMMYYY IS ANALYZING ZARAK'S WORK...
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
                    placeholder="Ask Aimmyyy about Zarak's engineering work..."
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
    </>
  );
}
