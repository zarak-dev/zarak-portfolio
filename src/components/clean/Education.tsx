'use client';

import { GraduationCap } from 'lucide-react';

import SectionHeading from './SectionHeading';
import { EDUCATION } from '@/data/profile';
import { chipIn, fadeUp, stagger, VIEWPORT } from '@/lib/animations';
import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="border-b border-line bg-surface py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Education"
          title="A rigorous software engineering foundation."
          description="Formal degree training covering algorithms, data structures, distributed systems, and modern web architectures, culminating in an A+ capstone."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {EDUCATION.map((school) => (
            <motion.article
              key={school.institution}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={stagger(0.08)}
              whileHover={{ y: -4 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface-2 p-6 transition-colors hover:border-brand-line sm:p-8"
            >
              <motion.span
                aria-hidden="true"
                className="absolute right-6 top-6 text-brand-soft"
                variants={{
                  hidden: { opacity: 0, scale: 0.6, rotate: -12 },
                  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7 } },
                }}
              >
                <GraduationCap className="h-14 w-14" />
              </motion.span>

              <motion.p
                variants={fadeUp}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand"
              >
                {school.period}
              </motion.p>

              <h3 className="mt-3 max-w-[85%] font-display text-xl font-bold text-ink sm:text-2xl">
                {school.institution}
              </h3>

              <motion.p variants={fadeUp} className="mt-2 text-[15px] font-semibold text-ink-soft">
                {school.degree} · {school.field}
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-3 text-[15px] leading-relaxed text-ink-mute"
              >
                {school.summary}
              </motion.p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {school.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={chipIn}
                    whileHover={{ y: -2 }}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-mute"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
