'use client';

import { Fragment } from 'react';
import { stagger, wordUp } from '@/lib/animations';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: 'view' | 'mount';
}

export function AnimatedWords({
  text,
  className,
}: AnimatedWordsProps) {
  return <span className={className}>{text}</span>;
}

interface AnimatedLinesProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  trigger?: 'view' | 'mount';
}

export function AnimatedParagraph({
  children,
  className,
  delay = 0,
  trigger = 'view',
}: AnimatedLinesProps) {
  const reduced = useReducedMotion();
  const motionState =
    trigger === 'mount'
      ? { animate: { opacity: 1, y: 0 } }
      : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.05, margin: '0px 0px -40px 0px' } };

  return (
    <motion.p
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      {...(reduced ? {} : motionState)}
    >
      {children}
    </motion.p>
  );
}

export default AnimatedWords;
