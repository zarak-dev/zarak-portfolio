'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import { SKILL_GROUPS, TOP_SKILLS } from '@/data/profile';
import { chipIn, EASE, fadeUp, stagger, VIEWPORT } from '@/lib/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PREVIEW_COUNT = 10;

function SkillGroupCard({
  title,
  blurb,
  items,
}: {
  title: string;
  blurb: string;
  items: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = items.length - PREVIEW_COUNT;
  const panelId = `skills-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7"
    >
      <h3 className="font-display text-lg font-bold text-ink sm:text-xl">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-mute">{blurb}</p>

      <motion.ul
        id={panelId}
        className="mt-5 flex flex-wrap gap-1.5"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.025)}
      >
        {items.map((item, index) => {
          if (!expanded && index >= PREVIEW_COUNT) return null;
          return (
            <motion.li
              key={item}
              variants={index < PREVIEW_COUNT ? chipIn : undefined}
              initial={index >= PREVIEW_COUNT ? { opacity: 0, scale: 0.92 } : undefined}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18 }}
              className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-brand-line hover:bg-brand-soft hover:text-brand"
            >
              {item}
            </motion.li>
          );
        })}
      </motion.ul>

      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 self-start text-[13px] font-semibold text-brand transition-colors hover:text-brand-dark touch-manipulation active:scale-95 cursor-pointer"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={expanded ? 'less' : 'more'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE }}
            >
              {expanded ? 'Show fewer' : `Show all ${items.length}`}
            </motion.span>
          </AnimatePresence>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.span>
        </button>
      ) : null}
    </motion.article>
  );
}

export default function Skills() {
  const [isExpanded, setIsExpanded] = useState(false);
  const total = SKILL_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

  // Auto-expand if URL hash matches #skills
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#skills') {
      setIsExpanded(true);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#skills') {
        setIsExpanded(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      const el = document.getElementById('skills');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setIsExpanded(true);
      setTimeout(() => {
        const el = document.getElementById('skills-expanded-content');
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const previewGroups = SKILL_GROUPS.slice(0, 3);
  const remainingGroups = SKILL_GROUPS.slice(3);

  return (
    <section id="skills" className="border-b border-line bg-surface-2 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Skills"
          title={`${total} technologies & architectural patterns on record.`}
          description="Everything from React 18 & Redux-Saga async side-effects to design systems, Ant Design, and Gemini AI APIs."
        />

        {/* Core Competencies Highlight Banner */}
        <motion.div
          className="mt-10 rounded-2xl border border-brand-line bg-brand-soft/50 p-5 sm:p-6"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.07)}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand"
          >
            Core Competencies
          </motion.p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TOP_SKILLS.map((skill) => (
              <motion.li
                key={skill}
                variants={chipIn}
                whileHover={{ y: -3, scale: 1.04 }}
                className="rounded-lg bg-surface px-3.5 py-2 text-sm font-semibold text-ink shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Preview Row (Top 3 Symmetrical Categories) with Soft Gradient Veil */}
        <div className="relative mt-5">
          <motion.div
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger(0.09)}
          >
            {previewGroups.map((group) => (
              <SkillGroupCard
                key={group.title}
                title={group.title}
                blurb={group.blurb}
                items={group.items}
              />
            ))}
          </motion.div>

          {/* Bottom Gradient Veil shown when collapsed */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -bottom-2 left-0 right-0 h-28 bg-gradient-to-t from-surface-2 via-surface-2/80 to-transparent transition-opacity duration-300 z-10',
              isExpanded ? 'opacity-0' : 'opacity-100',
            )}
          />
        </div>

        {/* Expandable Remaining Categories */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id="skills-expanded-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="scroll-mt-24"
            >
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {remainingGroups.map((group) => (
                  <SkillGroupCard
                    key={group.title}
                    title={group.title}
                    blurb={group.blurb}
                    items={group.items}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Centered Action Toggle Button */}
        <div className="relative z-20 mt-8 flex justify-center px-4">
          <button
            type="button"
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls="skills-expanded-content"
            className="group inline-flex min-h-[48px] w-full max-w-sm sm:w-auto items-center justify-center gap-2.5 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.06)] transition-all duration-200 hover:border-brand-line hover:bg-brand-soft active:scale-[0.98] touch-manipulation cursor-pointer"
          >
            <span className="text-center">
              {isExpanded
                ? 'Collapse Skills Showcase'
                : `Explore All ${total} Technologies (5 Categories)`}
            </span>
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-y-0.5',
                isExpanded && 'rotate-180 group-hover:-translate-y-0.5',
              )}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
