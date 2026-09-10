'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FramerBackdrop() {
  const [mounted, setMounted] = useState(false);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
    const mqlMobile = window.matchMedia('(max-width: 768px)');
    const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsMobileOrReduced(mqlMobile.matches || mqlReduced.matches);
    };
    update();

    mqlMobile.addEventListener('change', update);
    mqlReduced.addEventListener('change', update);
    return () => {
      mqlMobile.removeEventListener('change', update);
      mqlReduced.removeEventListener('change', update);
    };
  }, []);

  // Gentle scroll-driven positional drift across the entire page height
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // On mobile or reduced-motion after mount: render only a lightweight static grid, no blur orbs
  if (mounted && isMobileOrReduced) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      >
        <div className="grid-veil absolute inset-0 opacity-40 dark:opacity-35" />
        {/* Lightweight static gradient tint instead of expensive blur orbs */}
        <div className="absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-brand/6 dark:bg-brand/8" />
        <div className="absolute top-1/3 -left-24 h-[22rem] w-[22rem] rounded-full bg-mint/5 dark:bg-mint/6" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle Engineering Grid Veil */}
      <div className="grid-veil absolute inset-0 opacity-40 dark:opacity-35" />

      {/* Orb 1: Soft Silver / Brand Aura (Top-Right / Mid-Right) */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        animate={{
          x: [0, 30, -25, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -right-24 h-[34rem] w-[34rem] rounded-full bg-brand/8 blur-[110px] sm:h-[44rem] sm:w-[44rem] sm:blur-[140px] dark:bg-brand/10"
      />

      {/* Orb 2: Ambient Slate Light Source (Mid-Left / Lower) */}
      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        animate={{
          x: [0, -35, 20, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 -left-36 h-[30rem] w-[30rem] rounded-full bg-mint/7 blur-[100px] sm:h-[38rem] sm:w-[38rem] sm:blur-[130px] dark:bg-mint/8"
      />

      {/* Orb 3: Ultra-Subtle Deep Ambient Center Glow */}
      <motion.div
        animate={{
          opacity: [0.35, 0.6, 0.35],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-brand-soft/40 blur-[120px] sm:h-[42rem] sm:w-[42rem] sm:blur-[160px] dark:bg-brand/6"
      />
    </div>
  );
}

