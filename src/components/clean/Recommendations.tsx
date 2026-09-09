'use client';

import { useState } from 'react';
import { ChevronDown, ExternalLink, Quote } from 'lucide-react';

import SectionHeading from './SectionHeading';
import { RECOMMENDATIONS, type Recommendation } from '@/data/recommendations';
import { EASE, VIEWPORT } from '@/lib/animations';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CARD_WIDTH = '24rem';
const CARD_HEIGHT = '28rem';
const QUOTE_COLLAPSED_LINES = 4;

function initials(name: string) {
  const parts = name.split(' ').filter((p) => !p.toLowerCase().startsWith('dr'));
  const source = parts.length >= 2 ? parts : name.split(' ');
  return source
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = rec.quote.length > 220;

  return (
    <motion.figure
      whileHover={{ y: -4 }}
      className={cn(
        'flex shrink-0 flex-col rounded-2xl border border-line bg-surface-2 p-6 transition-colors hover:border-brand-line sm:p-7',
      )}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.5, rotate: -14 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5 }}
      >
        <Quote className="h-6 w-6 shrink-0 text-brand-line" aria-hidden="true" />
      </motion.span>

      <div className="mt-4 flex-1 flex flex-col min-h-0">
        <motion.blockquote
          className={cn(
            'text-[15px] leading-[1.7] text-ink-soft overflow-hidden',
            !expanded && !needsToggle && 'flex-1',
          )}
          style={
            !expanded && needsToggle
              ? {
                  display: '-webkit-box',
                  WebkitLineClamp: QUOTE_COLLAPSED_LINES,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }
              : expanded
                ? { overflowY: 'auto' }
                : undefined
          }
        >
          {rec.quote}
        </motion.blockquote>

        {needsToggle ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="mt-2 inline-flex items-center gap-1 self-start text-xs font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            {expanded ? 'Show less' : 'Show more'}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.span>
          </button>
        ) : null}
      </div>

      <motion.figcaption className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
        <div className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden="true"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-sm font-bold text-brand"
          >
            {initials(rec.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-bold text-ink">{rec.name}</span>
            <span className="block truncate text-[12px] leading-snug text-ink-mute">
              {rec.title}
            </span>
            <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
              {rec.relation}
            </span>
          </span>
        </div>
        {rec.letterUrl && (
          <a
            href={rec.letterUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View official recommendation letter"
            className="inline-flex items-center gap-1 rounded-full border border-brand-line bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand transition-colors hover:bg-brand hover:text-white shrink-0 shadow-sm"
          >
            <span>Letter</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </motion.figcaption>
    </motion.figure>
  );
}

export default function Recommendations() {
  const [isPaused, setIsPaused] = useState(false);
  const looped = [...RECOMMENDATIONS, ...RECOMMENDATIONS];

  return (
    <section id="recommendations" className="border-b border-line bg-surface py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Recommendations"
          title="What engineering leaders, mentors, and QA engineers say."
          description={`${RECOMMENDATIONS.length} written endorsements from Smart Forum technical leads, university professors, and engineering colleagues.`}
        />

        <div
          className="mt-12 relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-surface to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-surface to-transparent"
          />

          <div
            className={cn(
              'flex w-max items-stretch gap-5 marquee-track motion-reduce:animate-none',
              isPaused && 'is-paused',
            )}
            aria-label="Recommendations carousel"
          >
            {looped.map((rec, index) => (
              <div key={`${rec.name}-${index}`} className="flex shrink-0">
                <RecommendationCard rec={rec} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
