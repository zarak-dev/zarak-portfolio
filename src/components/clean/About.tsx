'use client';

import { Brain, Code2, ExternalLink, GraduationCap, Sparkles } from 'lucide-react';

import SectionHeading from './SectionHeading';
import { PROFILE } from '@/data/profile';
import { EASE, fadeUp, stagger, VIEWPORT } from '@/lib/animations';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: Code2,
    title: 'Frontend Architecture',
    body: 'React 18, TypeScript, Redux Toolkit and Redux-Saga — building predictable, scalable frontend architectures that hold up under heavy multitasking.',
  },
  {
    icon: Brain,
    title: 'Production AI Dashboards',
    body: 'Enterprise AI operator interfaces like Dentally Assist and Appointlo — live telephony logs, inline audio players, and responsive multi-tenant SaaS portals.',
  },
  {
    icon: Sparkles,
    title: 'State & UI Performance',
    body: 'Eliminating race conditions and synchronization leaks with lazy-loaded saga injectors, atomic stores, and optimized DOM re-rendering pipelines.',
  },
  {
    icon: GraduationCap,
    title: 'Academic Excellence',
    body: 'BS Software Engineering from Sarhad University. Capstone Smart Sugar Management platform awarded Grade A+ for Gemini AI intelligence.',
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

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Narrative Column */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div className="space-y-5 text-base leading-[1.75] text-ink-soft sm:text-[17px]">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
              >
                Working as a <strong className="font-semibold text-ink">Software Engineer at Smart Forum</strong>, I specialize in building state-heavy, high-performance web applications using <strong className="font-semibold text-ink">React 18</strong>, <strong className="font-semibold text-ink">TypeScript</strong>, and <strong className="font-semibold text-ink">Redux-Saga</strong>. I focus on creating predictable, accessible, and responsive user interfaces that deliver seamless operator experiences under heavy multitasking.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
              >
                At Smart Forum, I engineered the production frontend for enterprise AI products including <strong className="font-semibold text-ink">Dentally Assist</strong> (an AI-powered call management dashboard for dental practices) and <a href="https://apointlo.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"><strong className="font-semibold text-brand">Appointlo</strong><ExternalLink className="h-3.5 w-3.5" /></a> (a production appointment scheduling SaaS platform live at apointlo.com). I own state side-effect coordination, scoped design systems, and role-based access control.
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

            {/* Open To Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
              className="mt-8 rounded-2xl border border-brand-line bg-brand-soft/60 p-5"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand font-semibold">
                  Open to
                </p>
              </div>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-ink-soft">
                Full-stack frontend engineering roles, enterprise React/Redux architectures, and high-impact AI product teams. Based in {PROFILE.locationShort}.
              </p>
            </motion.div>
          </div>

          {/* 4 Pillars Column */}
          <div className="lg:col-span-6">
            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              variants={stagger(0.1)}
            >
              {PILLARS.map((pillar) => (
                <motion.article
                  key={pillar.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface-2 p-5 transition-colors hover:border-brand-line hover:bg-brand-soft/40 sm:p-6"
                >
                  <div>
                    <motion.span
                      whileHover={{ rotate: -8, scale: 1.06 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-brand ring-1 ring-line"
                    >
                      <pillar.icon className="h-5 w-5" aria-hidden="true" />
                    </motion.span>
                    <h3 className="mt-4 text-base font-bold text-ink">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-mute">{pillar.body}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
