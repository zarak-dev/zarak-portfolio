'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

import { MARQUEE, PROFILE, STATS, TOP_SKILLS } from '@/data/profile';
import { useCountUp } from '@/hooks/useCountUp';
import { chipIn, EASE, fadeUp, stagger } from '@/lib/animations';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function Stat({
  value,
  suffix,
  label,
  run,
}: {
  value: number;
  suffix: string;
  label: string;
  run: boolean;
}) {
  const count = useCountUp(value, 1500, run);
  return (
    <motion.div variants={fadeUp}>
      <p className="font-display text-3xl font-extrabold tabular-nums text-ink sm:text-4xl">
        {count}
        <span className="text-brand">{suffix}</span>
      </p>
      <p className="mt-1 text-xs font-medium leading-snug text-ink-mute sm:text-[13px]">{label}</p>
    </motion.div>
  );
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [runStats, setRunStats] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 56]);
  const copyY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -28]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = statsRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setRunStats(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRunStats(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-surface pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="grid-veil pointer-events-none absolute inset-0" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-brand/10 blur-3xl dark:bg-brand/15"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-mint/10 blur-3xl dark:bg-mint/12"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
      />

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
          {/* Part 1: Identity + Description */}
          <motion.div className="order-1 lg:col-span-7" style={{ y: isDesktop ? copyY : undefined }}>
            <motion.div
              className="flex flex-wrap items-center gap-2.5"
              initial="hidden"
              animate="show"
              variants={stagger(0.1)}
            >
              <motion.span
                variants={chipIn}
                className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint-soft px-3.5 py-1.5 font-mono text-[11px] font-medium text-mint"
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-mint"
                  aria-hidden="true"
                  animate={reduced ? undefined : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                Available for engineering roles & collaborations
              </motion.span>
              <motion.span
                variants={chipIn}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 font-mono text-[11px] font-medium text-ink-mute"
              >
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {PROFILE.locationShort}
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] text-ink sm:text-6xl lg:text-[4.25rem]"
            >
              {PROFILE.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="mt-4 text-lg font-semibold leading-snug text-ink-soft sm:text-xl lg:text-[1.4rem]"
            >
              Software Engineer @{' '}
              <strong className="font-bold text-brand">Smart Forum</strong> ·{' '}
              <span>FE Architecture & AI Systems</span>
            </motion.p>

            <motion.p
              className="mt-5 max-w-xl text-base leading-relaxed text-ink-mute sm:text-[17px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: EASE }}
            >
              I architect scalable, state-heavy web applications with React 18, TypeScript, and
              Redux-Saga at Smart Forum, building production platforms like Dentally Assist and
              Appointlo with bulletproof state synchronization, scoped design systems, and AI
              integrations.
            </motion.p>
          </motion.div>

          {/* Portrait — sits between description and CTAs on mobile, alongside text on desktop */}
          <div className="order-2 lg:col-span-5 lg:row-span-2">
            <motion.div
              className="relative mx-auto max-w-sm lg:max-w-md"
              style={{ y: isDesktop ? portraitY : undefined }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            >
              {/* Subtle ambient glow backing */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-brand/20 via-brand-soft to-mint/20 opacity-70 blur-xl dark:opacity-40"
              />

              {/* Main Portrait Card */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_24px_50px_-20px_rgba(15,23,42,0.18)] dark:border-white/10 dark:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)]">
                <Image
                  src={PROFILE.portrait}
                  alt={`${PROFILE.name}, Software Engineer at Smart Forum`}
                  fill
                  priority
                  className="h-full w-full object-cover object-top"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 400px"
                />
              </div>

              {/* Status Pill */}
              <motion.div
                className="mt-5 flex items-center justify-center gap-2.5 rounded-full border border-line bg-surface/95 px-4 py-2 sm:px-5 sm:py-2.5 shadow-[0_12px_30px_-15px_rgba(15,23,42,0.15)] backdrop-blur dark:bg-surface-2/95 text-center max-w-full"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint shrink-0">
                  Currently
                </span>
                <span className="text-xs sm:text-sm font-bold text-ink">
                  {PROFILE.role} @ {PROFILE.company}
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Part 2: Actions + Stats */}
          <motion.div className="order-3 lg:col-span-7 pt-4 sm:pt-0" style={{ y: isDesktop ? copyY : undefined }}>
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial="hidden"
              animate="show"
              variants={stagger(0.08, isDesktop ? 1.15 : 0.3)}
            >
              <motion.a
                variants={fadeUp}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand dark:bg-surface-2 dark:text-ink dark:border dark:border-line hover:dark:border-brand hover:dark:bg-brand hover:dark:text-black shrink-0"
              >
                View my work
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </motion.a>
              <motion.a
                variants={fadeUp}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-surface-2 shrink-0"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Get in touch
              </motion.a>

              <div className="flex items-center gap-1.5 shrink-0">
                <motion.a
                  variants={fadeUp}
                  whileHover={{ y: -3, rotate: -6 }}
                  whileTap={{ scale: 0.94 }}
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${PROFILE.name} on LinkedIn`}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink-mute transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand"
                >
                  <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                </motion.a>
                <motion.a
                  variants={fadeUp}
                  whileHover={{ y: -3, rotate: 6 }}
                  whileTap={{ scale: 0.94 }}
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${PROFILE.name} on GitHub`}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink-mute transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand"
                >
                  <Github className="h-[18px] w-[18px]" aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              ref={statsRef}
              className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={stagger(0.1)}
            >
              {STATS.map((stat) => (
                <Stat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  run={runStats}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 flex flex-wrap items-center gap-2 sm:mt-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger(0.06)}
        >
          <motion.span
            variants={chipIn}
            className="mr-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint"
          >
            Top skills
          </motion.span>
          {TOP_SKILLS.map((skill) => (
            <motion.span
              key={skill}
              variants={chipIn}
              whileHover={{ y: -2 }}
              className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink-soft"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="relative mt-10 overflow-x-auto no-scrollbar border-y border-line bg-surface-2 py-3.5 sm:mt-14 sm:py-4 select-none">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-surface-2 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-surface-2 to-transparent"
        />

        <div
          className="flex w-max items-center gap-8 px-6 sm:px-10"
          aria-label="Technologies and skills"
        >
          {MARQUEE.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-xs sm:text-sm text-ink-mute"
            >
              <span>{item}</span>
              {index < MARQUEE.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-brand-line" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
