'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function FramerBackdrop() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Gentle scroll-driven positional drift across the entire page height
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle Engineering Grid Veil */}
      <div className="grid-veil absolute inset-0 opacity-40 dark:opacity-35" />

      {/* Orb 1: Soft Electric Indigo / Brand Aura (Top-Right / Mid-Right) */}
      <motion.div
        style={reduced ? undefined : { y: y1, rotate: rotate1 }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, 30, -25, 0],
                scale: [1, 1.08, 0.95, 1],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 -right-24 h-[34rem] w-[34rem] rounded-full bg-brand/8 blur-[110px] sm:h-[44rem] sm:w-[44rem] sm:blur-[140px] dark:bg-brand/10"
      />

      {/* Orb 2: Whisper-Soft Mint / Cyan Light Source (Mid-Left / Lower) */}
      <motion.div
        style={reduced ? undefined : { y: y2, rotate: rotate2 }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, -35, 20, 0],
                scale: [1, 0.94, 1.06, 1],
              }
        }
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
        animate={
          reduced
            ? undefined
            : {
                opacity: [0.35, 0.6, 0.35],
                scale: [0.95, 1.05, 0.95],
              }
        }
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
