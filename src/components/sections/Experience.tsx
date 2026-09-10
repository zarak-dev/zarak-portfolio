'use client';

import { Briefcase } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import { EXPERIENCE } from '@/data/profile';
import { chipIn, EASE, fadeRight, fadeUp, stagger, VIEWPORT } from '@/lib/animations';
import { motion } from 'framer-motion';

export default function Experience() {
  return (
    <section id="experience" className="border-b border-line bg-surface-2 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Experience"
          title="Engineering production software that holds up under load."
          description="From competitive PSEB Apprenticeship to Junior Software Engineer at Smart Forum, plus commercial web development at Trustech Solutions."
        />

        <div className="mt-14 space-y-14">
          {EXPERIENCE.map((job) => (
            <div key={`${job.company}-${job.employment}`} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <motion.div
                  className="flex items-start gap-3 lg:sticky lg:top-28"
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  variants={stagger(0.08)}
                >
                  <motion.span
                    variants={fadeUp}
                    whileHover={{ rotate: -8, scale: 1.05 }}
                    className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-brand"
                  >
                    <Briefcase className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                      {job.company}
                    </h3>
                    <motion.p variants={fadeUp} className="mt-1 text-[13px] text-ink-mute">
                      {job.employment} · {job.span}
                    </motion.p>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-8">
                <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
                  {job.roles.map((role) => (
                    <motion.li
                      key={`${job.company}-${role.title}`}
                      className="relative"
                      initial="hidden"
                      whileInView="show"
                      viewport={VIEWPORT}
                      variants={stagger(0.07)}
                    >
                      <motion.span
                        aria-hidden="true"
                        variants={{
                          hidden: { scale: 0, opacity: 0 },
                          show: {
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 0.45, ease: EASE },
                          },
                        }}
                        className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-brand bg-surface sm:-left-[37px]"
                      />

                      <motion.div
                        variants={fadeRight}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                      >
                        <h4 className="text-lg font-bold text-ink">{role.title}</h4>
                        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                          {role.duration}
                        </p>
                      </motion.div>

                      <motion.p
                        variants={fadeRight}
                        className="mt-1 text-sm font-medium text-brand"
                      >
                        {role.period}
                      </motion.p>
                      <motion.p variants={fadeRight} className="mt-0.5 text-[13px] text-ink-mute">
                        {role.location}
                      </motion.p>

                      <ul className="mt-4 space-y-2.5">
                        {role.points.map((point) => (
                          <motion.li
                            key={point.slice(0, 30)}
                            variants={fadeUp}
                            className="flex gap-3 text-[15px] leading-relaxed text-ink-soft"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-line"
                            />
                            {point}
                          </motion.li>
                        ))}
                      </ul>

                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {role.skills.map((skill) => (
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
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
