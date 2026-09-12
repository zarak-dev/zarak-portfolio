'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { IDENTITY } from '@/data/identity';
import { useScrollLock } from '@/hooks/useScrollLock';

export default function EasterEggModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [typedInput, setTypedInput] = useState('');

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);
  const [outputLines, setOutputLines] = useState<string[]>([
    'ZARAK.OS Kernel Diagnostics v2.4.0',
    '----------------------------------------',
    'Hardware Platform: Modern Web Browser',
    'Engine: Next.js 15 App Router + React 19',
    'Type System: Strict TypeScript (No any)',
    'Telemetry: Zero layout shifts, 60fps animations',
    '',
    '>> Developer Note:',
    '"Frontend engineering is caring about the invisible details',
    ' as much as the visible ones."',
    '',
    'Type "help" or "clear" or "hire":',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = typedInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setOutputLines([]);
    } else if (cmd === 'help') {
      setOutputLines((prev) => [
        ...prev,
        `$ ${typedInput}`,
        'Available commands: help, hire, dentally, appointlo, stack, clear, exit',
      ]);
    } else if (cmd === 'hire') {
      setOutputLines((prev) => [
        ...prev,
        `$ ${typedInput}`,
        `Direct Email: ${IDENTITY.contacts.email}`,
        `Professional Email: ${IDENTITY.contacts.workEmail}`,
        `Status: ${IDENTITY.status.availability}.`,
      ]);
    } else if (cmd === 'dentally') {
      setOutputLines((prev) => [
        ...prev,
        `$ ${typedInput}`,
        'Dentally Assist: Enterprise AI call management dashboard for dental practices (Project of Appointlo SaaS).',
        'Company: Smart Forum | Platform: Appointlo SaaS | Tech: React 18, TypeScript, Redux-Saga, Ant Design 6, JWT cookies.',
      ]);
    } else if (cmd === 'appointlo') {
      setOutputLines((prev) => [
        ...prev,
        `$ ${typedInput}`,
        'Appointlo: Production AI appointment-scheduling SaaS platform (Live: https://apointlo.com/).',
        'Company: Smart Forum | Tech: React 18, TypeScript, Redux-Saga, Ant Design 6, Styled Components, data.ts separation.',
      ]);
    } else if (cmd === 'stack') {
      setOutputLines((prev) => [
        ...prev,
        `$ ${typedInput}`,
        'Core Stack: React 18 · TypeScript · Redux-Saga · Redux Toolkit · Ant Design 6 · Styled Components',
      ]);
    } else if (cmd === 'exit') {
      onClose();
    } else {
      setOutputLines((prev) => [
        ...prev,
        `$ ${typedInput}`,
        `Command not recognized: "${cmd}". Type "help" for list.`,
      ]);
    }
    setTypedInput('');
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Developer Portfolio Terminal"
            className="relative w-full max-w-2xl bg-black border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden z-10 font-mono text-xs text-emerald-400 glow-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-emerald-500/30">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-white/60">zarak@kernel: ~ (interactive-terminal)</span>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white p-1"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Output Screen */}
            <div className="p-5 max-h-72 overflow-y-auto space-y-1 bg-black/95 select-text">
              {outputLines.map((line, i) => (
                <div key={i} className="leading-relaxed whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Input Form */}
            <form
              onSubmit={handleCommand}
              className="flex items-center gap-2 px-4 py-3 bg-slate-950/80 border-t border-emerald-500/30"
            >
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                autoFocus
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Type command (e.g. hire, dentally, stack)..."
                className="w-full bg-transparent border-none outline-none text-emerald-300 placeholder:text-emerald-800 font-mono text-xs focus:ring-0"
              />
              <button
                type="submit"
                className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] uppercase font-bold"
              >
                Enter
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
