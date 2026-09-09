'use client';

import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

import { NAV_LINKS, PROFILE } from '@/data/profile';
import { chipIn, fadeUp, stagger, VIEWPORT } from '@/lib/animations';
import { motion } from 'framer-motion';

const SOCIALS = [
  { Icon: Linkedin, label: 'LinkedIn', href: PROFILE.linkedin },
  { Icon: Github, label: 'GitHub', href: PROFILE.github },
  { Icon: Mail, label: 'Email', href: `mailto:${PROFILE.email}` },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <motion.div
        className="shell py-12 sm:py-16"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.08)}
      >
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <motion.a variants={fadeUp} href="#top" className="flex items-center gap-2.5">
              <motion.span
                whileHover={{ rotate: -8, scale: 1.06 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-white dark:bg-surface-2 dark:text-ink dark:border dark:border-line"
              >
                ZK
              </motion.span>
              <span className="font-display text-lg font-bold text-ink">{PROFILE.name}</span>
            </motion.a>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-mute"
            >
              Software Engineer at {PROFILE.company} in {PROFILE.locationShort}, building state-heavy
              React architectures and production AI systems.
            </motion.p>

            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  variants={chipIn}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.94 }}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-mute transition-colors hover:border-brand hover:bg-brand-soft hover:text-brand"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <motion.h2
              variants={fadeUp}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint"
            >
              Explore
            </motion.h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {NAV_LINKS.map((link) => (
                <motion.li key={link.id} variants={chipIn}>
                  <motion.a
                    whileHover={{ x: 3 }}
                    href={`#${link.id}`}
                    className="inline-block text-[14px] text-ink-soft transition-colors hover:text-brand"
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <motion.h2
              variants={fadeUp}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint"
            >
              Get in touch
            </motion.h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <motion.li variants={chipIn}>
                <a
                  href={`mailto:${PROFILE.workEmail}`}
                  className="break-all text-ink-soft transition-colors hover:text-brand"
                >
                  {PROFILE.workEmail}
                </a>
              </motion.li>
              <motion.li variants={chipIn}>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="break-all text-ink-soft transition-colors hover:text-brand"
                >
                  {PROFILE.email}
                </a>
              </motion.li>
              <motion.li variants={chipIn}>
                <a
                  href={PROFILE.phoneHref}
                  className="text-ink-soft transition-colors hover:text-brand"
                >
                  {PROFILE.phone}
                </a>
              </motion.li>
              <motion.li variants={chipIn} className="text-ink-mute">
                {PROFILE.location}
              </motion.li>
            </ul>
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center"
        >
          <p className="text-[13px] text-ink-faint">
            © {year} {PROFILE.name}. All rights reserved.
          </p>
          <motion.a
            whileHover={{ y: -2 }}
            href="#top"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-mute transition-colors hover:text-brand"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </motion.div>
    </footer>
  );
}
