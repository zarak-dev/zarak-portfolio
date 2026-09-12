'use client';

import { Brain, Code2, ExternalLink } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import { EASE, fadeUp, stagger } from '@/lib/animations';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: Code2,
    badge: 'Architecture & Discipline',
    title: 'State Orchestration & UI Performance',
    body: 'Building deterministic client runtimes with React 19 and Redux-Saga. Specialized in asynchronous side-effect pipelines, atomic store boundaries, and eliminating state synchronization leaks.',
    tags: ['React 19', 'TypeScript', 'Redux-Saga', 'Atomic Stores'],
  },
  {
    icon: Brain,
    badge: 'Production Systems',
    title: 'Enterprise AI & SaaS Dashboards',
    body: 'Architecting production frontends at Smart Forum for Appointlo SaaS and Dentally Assist clinical telephony. Delivering live audio playback, multi-tenant RBAC auth, and modular design systems.',
    tags: ['Appointlo SaaS', 'Dentally Assist', 'Clinical Telephony', 'RBAC Auth'],
  },
];

export default function About() {
  return (
    <section id="about" className="border-b border-line bg-surface py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="About"
          title="Engineering precision with a systems architect's discipline."
          description="Specialized in modern frontend architecture, enterprise state synchronization, and resilient production web applications."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* Narrative Column */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div className="space-y-4.5 text-base leading-[1.72] text-ink-soft sm:text-[16.5px]">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
              >
                Working as a <strong className="font-semibold text-ink">Software Engineer at Smart Forum</strong>, I specialize in building state-heavy, high-performance web applications using <strong className="font-semibold text-ink">React 19</strong>, <strong className="font-semibold text-ink">TypeScript</strong>, and <strong className="font-semibold text-ink">Redux-Saga</strong>. I focus on creating predictable, accessible, and responsive user interfaces that deliver seamless operator experiences under heavy multitasking.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              >
                At Smart Forum, I engineered the production frontend for enterprise AI products centered around <a href="https://apointlo.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-rose hover:underline"><strong className="font-semibold text-rose">Appointlo</strong><ExternalLink className="h-3.5 w-3.5" /></a> (a production appointment scheduling SaaS platform live at apointlo.com) and its specialized dental telephony project, <strong className="font-semibold text-ink">Dentally Assist</strong> (an AI-powered call management dashboard for dental practices). I own state side-effect coordination, scoped design systems, and role-based access control.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
              >
                I graduated with a <strong className="font-semibold text-ink">BS in Software Engineering from Sarhad University</strong>, where my capstone Smart Sugar Management platform was awarded <strong className="font-semibold text-ink">Grade A+</strong>. I am passionate about crafting resilient frontend architectures, eliminating state synchronization leaks, and building software that feels as good as it functions.
              </motion.p>
            </div>
          </div>

          {/* 2 Focused Pillar Cards */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-6">
            <motion.div
              className="flex flex-col justify-between gap-4 h-full"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={stagger(0.12)}
            >
              {PILLARS.map((pillar) => (
                <motion.article
                  key={pillar.title}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="flex flex-1 flex-col justify-between rounded-2xl border border-line bg-surface-2 p-4.5 sm:p-5 transition-all duration-300 hover:border-line dark:hover:border-rose/35 dark:hover:shadow-[0_12px_30px_-12px_rgba(228,64,95,0.2)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <motion.span
                        whileHover={{ rotate: -8, scale: 1.06 }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-ink ring-1 ring-line dark:text-rose dark:ring-rose/25 dark:bg-rose/10"
                      >
                        <pillar.icon className="h-4.5 w-4.5" aria-hidden="true" />
                      </motion.span>
                      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="mt-3 text-[16px] font-bold text-ink sm:text-[17px]">{pillar.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-mute sm:text-[14px]">{pillar.body}</p>
                  </div>

                  <ul className="mt-3.5 flex flex-wrap gap-1.5 pt-0.5">
                    {pillar.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line bg-surface px-2 py-0.5 text-[11px] font-medium text-ink-mute"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
