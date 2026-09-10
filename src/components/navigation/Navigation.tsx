'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Menu, Search, Sparkles, X } from 'lucide-react';

import { NAV_LINKS, PROFILE } from '@/data/profile';
import { EASE } from '@/lib/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/useScrollLock';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  onOpenAimmy?: () => void;
  onOpenCommand?: () => void;
}

export default function Navigation({ onOpenAimmy, onOpenCommand }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('about');
  const scrolledRef = useRef(false);

  // Lock background scroll when mobile navigation drawer is open
  useScrollLock(open);

  // Optimized scroll handler: updates state only when boolean boundary transitions
  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 24;
      if (scrolledRef.current !== isScrolled) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for active section link detection
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn(
        'no-print fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-line bg-surface/85 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${PROFILE.name} — back to top`}
        >
          <motion.div
            whileHover={{ rotate: -8, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-black shadow-sm dark:border-white/10"
          >
            <Image
              src="/images/zk-logo.png"
              alt={`${PROFILE.name} Logo`}
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
              loading="eager"
            />
          </motion.div>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[15px] font-bold text-ink">{PROFILE.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
              {PROFILE.role}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'true' : undefined}
              className={cn(
                'relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors',
                active === link.id ? 'text-brand' : 'text-ink-mute hover:text-ink',
              )}
            >
              {active === link.id ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-brand-soft"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {onOpenCommand && (
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={onOpenCommand}
              className="hidden items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs font-medium text-ink-mute transition-colors hover:border-brand hover:text-ink md:inline-flex cursor-pointer"
              aria-label="Open command palette (CMD+K)"
            >
              <Search className="h-3 w-3" />
              <span className="text-[11px] opacity-70">⌘K</span>
            </motion.button>
          )}

          <ThemeToggle />

          {onOpenAimmy && (
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={onOpenAimmy}
              className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-xs font-semibold text-ink transition-all duration-200 hover:border-rose/60 hover:bg-surface-3 hover:shadow-[0_0_15px_rgba(228,64,95,0.15)] dark:border-white/15 dark:bg-surface-2 dark:text-white dark:hover:border-rose/80 dark:hover:bg-surface-3 dark:hover:shadow-[0_0_22px_rgba(228,64,95,0.4)] shadow-sm cursor-pointer"
              aria-label="Open Aimmyy AI assistant"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-rose transition-transform duration-200 group-hover:rotate-12" />
              <span>Aimmyy AI</span>
            </motion.button>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:bg-surface-3 lg:hidden cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                {open ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="shell grid max-h-[calc(100dvh-5rem)] gap-1 overflow-y-auto py-4"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                  }}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-[15px] font-medium transition-colors',
                    active === link.id
                      ? 'bg-brand-soft text-brand font-semibold'
                      : 'text-ink-soft hover:bg-surface-3',
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              {onOpenAimmy && (
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                  }}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenAimmy();
                  }}
                  className="flex items-center gap-2 rounded-xl bg-brand-soft px-4 py-3 text-[15px] font-semibold text-brand text-left cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Ask Aimmyy AI</span>
                </motion.button>
              )}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                }}
                href={`mailto:${PROFILE.email}`}
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-[15px] font-semibold text-white dark:bg-surface-2 dark:text-ink dark:border dark:border-line hover:dark:border-brand hover:dark:bg-brand-soft hover:dark:text-brand"
              >
                Email me
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
