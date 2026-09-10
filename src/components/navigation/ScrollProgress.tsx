'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="no-print fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-rose to-brand pointer-events-none dark:from-rose dark:via-white dark:to-rose dark:shadow-[0_0_10px_rgba(228,64,95,0.8)]"
    />
  );
}
