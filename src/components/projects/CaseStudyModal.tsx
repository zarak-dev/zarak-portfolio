'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink, Github, Layers } from 'lucide-react';
import type { CaseStudy } from '@/data/projects';
import { useScrollLock } from '@/hooks/useScrollLock';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onOpenXRay?: (projectId: string) => void;
}

export default function CaseStudyModal({ study, onClose, onOpenXRay }: CaseStudyModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollLock(Boolean(study));

  useEffect(() => {
    if (!study) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [study, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {study && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={study.title}
            className="relative w-full max-w-4xl bg-card border border-border/90 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col glow-border overscroll-contain"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/70 bg-secondary/40 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent font-semibold px-2.5 py-1 rounded bg-accent/10 border border-accent/30">
                  {study.category}
                </span>
                <span className="font-mono text-xs text-muted-foreground hidden sm:inline">
                  {study.role}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary border border-border transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
              {/* Title & Subtitle */}
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-foreground">
                  {study.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-muted-foreground mt-1">
                  {study.subtitle}
                </p>
              </div>

              {/* Metrics Chips */}
              {study.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {study.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 rounded-xl bg-secondary/40 border border-border/70 font-mono text-xs"
                    >
                      <span className="text-muted-foreground block text-[10px] uppercase">
                        {m.label}
                      </span>
                      <span className="font-bold text-foreground mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Screenshot */}
              <div className="relative aspect-[16/9] sm:aspect-[16/10] w-full rounded-xl overflow-hidden border border-border/80 bg-slate-950 flex items-center justify-center p-2 shadow-inner">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-contain object-top rounded"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>

              {/* Problem & Approach */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-xl bg-secondary/30 border border-border/60">
                  <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-2 flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    The Problem &amp; Context
                  </h4>
                  <p className="font-sans text-sm text-foreground/90 leading-relaxed">
                    {study.problem}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-secondary/30 border border-border/60">
                  <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Engineering Approach
                  </h4>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {study.approach}
                  </p>
                </div>
              </div>

              {/* Frontend Architecture */}
              <div className="p-5 rounded-xl bg-secondary/30 border border-border/60">
                <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-2 font-semibold">
                  Frontend Architecture &amp; State Management
                </h4>
                <p className="font-sans text-sm text-foreground/90 leading-relaxed">
                  {study.frontendArchitecture}
                </p>
              </div>

              {/* Interface Details & Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                    Key Interface Features
                  </h4>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {study.interfaceDetails}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-wider mb-2 font-semibold">
                    Verified Outcome &amp; Impact
                  </h4>
                  <p className="font-sans text-sm text-foreground/90 leading-relaxed">
                    {study.impact}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {study.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md font-mono text-xs bg-secondary border border-border text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {onOpenXRay && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenXRay(study.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 font-mono text-xs text-foreground border border-border transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>X-Ray</span>
                    </button>
                  )}
                  {study.githubUrl && (
                    <a
                      href={study.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 font-mono text-xs text-foreground border border-border transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Repo</span>
                    </a>
                  )}
                  {study.liveUrl && (
                    <a
                      href={study.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-accent-foreground font-mono text-xs font-semibold hover:bg-accent/90 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Product</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
