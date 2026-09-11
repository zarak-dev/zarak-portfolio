'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function FramerBackdrop({ active = true }: { active?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
    const mqlMobile = window.matchMedia('(max-width: 768px)');
    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsMobileOrReduced(mqlMobile.matches || mqlReduced.matches);
    };
    update();

    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };

    mqlMobile.addEventListener('change', update);
    mqlReduced.addEventListener('change', update);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      mqlMobile.removeEventListener('change', update);
      mqlReduced.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Gentle scroll-driven positional drift across the entire page height
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // On mobile or reduced-motion after mount: render only lightweight static grid, zero heavy blur
  if (mounted && (isMobileOrReduced || reduced)) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      >
        {/* Atmospheric dark-mode top radial glow */}
        <div className="hidden dark:block pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(228,64,95,0.16),transparent_70%)]" />
        <div className="grid-veil absolute inset-0 opacity-40 dark:opacity-35" />
        <div className="absolute -top-24 -right-24 h-[26rem] w-[26rem] rounded-full bg-brand/5 dark:bg-brand/8" />
        <div className="absolute top-1/3 -left-24 h-[20rem] w-[20rem] rounded-full bg-rose/5 dark:bg-rose/8" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Atmospheric dark-mode top radial glow (inspire dev-mohamed ambient lighting) */}
      <div className="hidden dark:block pointer-events-none absolute inset-x-0 top-0 h-[48rem] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(228,64,95,0.18),transparent_75%)]" />

      {/* Subtle Engineering Grid Veil */}
      <div className="grid-veil absolute inset-0 opacity-40 dark:opacity-35" />

      {/* Orb 1: Soft Silver / Brand Aura (Top-Right / Mid-Right) */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        animate={
          active && isVisible && !reduced
            ? {
                x: [0, 24, -20, 0],
                scale: [1, 1.06, 0.96, 1],
              }
            : undefined
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -right-24 h-[34rem] w-[34rem] rounded-full bg-gradient-radial from-brand/10 via-brand/4 to-transparent blur-[70px] sm:h-[42rem] sm:w-[42rem] sm:blur-[90px] dark:from-brand/12 dark:via-brand/5"
      />

      {/* Orb 2: Ambient Rose Cyber Light Source (Mid-Left / Lower) */}
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        animate={
          active && isVisible && !reduced
            ? {
                x: [0, -28, 18, 0],
                scale: [1, 0.95, 1.05, 1],
              }
            : undefined
        }
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 -left-36 h-[30rem] w-[30rem] rounded-full bg-gradient-radial from-rose/6 via-rose/2 to-transparent blur-[65px] sm:h-[36rem] sm:w-[36rem] sm:blur-[85px] dark:from-rose/16 dark:via-rose/6"
      />

      {/* Orb 3: Ultra-Subtle Deep Ambient Center Glow */}
      <motion.div
        animate={
          active && isVisible && !reduced
            ? {
                opacity: [0.35, 0.55, 0.35],
                scale: [0.96, 1.04, 0.96],
              }
            : undefined
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-gradient-radial from-brand-soft/50 via-brand-soft/20 to-transparent blur-[75px] sm:h-[40rem] sm:w-[40rem] sm:blur-[100px] dark:from-rose/10 dark:via-brand/3"
      />
    </div>
  );
}
