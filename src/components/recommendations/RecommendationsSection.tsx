'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles, ChevronDown, ChevronUp, Users, CheckCircle2 } from 'lucide-react';
import { RECOMMENDATIONS, Recommendation } from '@/data/recommendations';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = rec.quote.length > 280;

  return (
    <article className="flex flex-col justify-between w-[340px] sm:w-[380px] min-h-[320px] rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl p-6 shadow-lg glow-border transition-all duration-300 hover:border-accent/60 hover:shadow-accent/10 select-text">
      <div>
        {/* Quote Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
            <Quote className="w-4 h-4 rotate-180" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/60 px-2.5 py-1 rounded-full border border-border/60">
            {rec.relation}
          </span>
        </div>

        {/* Quote Body */}
        <p
          className={`font-sans text-sm text-foreground/90 leading-relaxed transition-all duration-300 ${
            !expanded && isLong ? 'line-clamp-4' : ''
          }`}
        >
          &ldquo;{rec.quote}&rdquo;
        </p>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-2.5 inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline focus:outline-hidden"
          >
            <span>{expanded ? 'Show less' : 'Read full quote'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Author Footer */}
      <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/40 flex items-center justify-center font-display font-bold text-xs text-accent shadow-xs shrink-0">
          {getInitials(rec.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-display font-bold text-foreground text-sm truncate flex items-center gap-1.5">
            {rec.name}
          </h4>
          <p className="font-mono text-[11px] text-muted-foreground truncate leading-snug">
            {rec.title}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function RecommendationsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedRecs = [...RECOMMENDATIONS, ...RECOMMENDATIONS];

  return (
    <section
      id="recommendations"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-border/70 relative z-10 overflow-hidden"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>// 08 — Endorsements & Recommendations</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight">
            What colleagues, managers & collaborators say.
          </h2>
          <p className="font-sans text-muted-foreground text-base sm:text-lg mt-4 leading-relaxed">
            {RECOMMENDATIONS.length} written recommendations from engineering leads, QA engineers, and cross-functional team members.
          </p>
        </motion.div>

        {/* Infinite Carousel Container */}
        <div
          className="relative overflow-hidden pt-4 pb-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge Blur Gradients */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-r from-background via-background/80 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-20 bg-gradient-to-l from-background via-background/80 to-transparent"
          />

          {/* Marquee Track */}
          <div
            className={`flex w-max items-stretch gap-6 marquee-track ${isPaused ? 'is-paused' : ''}`}
            aria-label="Recommendations carousel"
          >
            {duplicatedRecs.map((rec, index) => (
              <div key={`${rec.name}-${index}`} className="flex shrink-0">
                <RecommendationCard rec={rec} />
              </div>
            ))}
          </div>
        </div>

        {/* Subtle Pause Hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground/60">
          <span>Hover over any recommendation card to pause and inspect</span>
        </div>
      </div>
    </section>
  );
}
