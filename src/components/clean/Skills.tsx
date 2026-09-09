'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import SectionHeading from './SectionHeading';
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
        {items.map((item, index) => (
          <motion.li
            key={item}
            variants={chipIn}
            whileHover={{ y: -2, scale: 1.03 }}
            className={cn(
              'rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-brand-line hover:bg-brand-soft hover:text-brand',
              !expanded && index >= PREVIEW_COUNT && 'hidden',
            )}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>

      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-[13px] font-semibold text-brand transition-colors hover:text-brand-dark"
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
  const total = SKILL_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="skills" className="border-b border-line bg-surface-2 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Skills"
          title={`${total} technologies & architectural patterns on record.`}
          description="Everything from React 18 & Redux-Saga async side-effects to design systems, Ant Design, and Gemini AI APIs."
        />

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

        <motion.div
          className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.09)}
        >
          {SKILL_GROUPS.map((group) => (
            <SkillGroupCard
              key={group.title}
              title={group.title}
              blurb={group.blurb}
              items={group.items}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
