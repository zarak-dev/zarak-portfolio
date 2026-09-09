import type { Variants } from 'framer-motion';

/** Shared easing curve — an expo-out feel. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Default viewport config: animate once, a little before the element is fully in. */
export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -60px 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** A single word sliding up out of its overflow-hidden mask. */
export const wordUp: Variants = {
  hidden: { y: '115%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: EASE } },
};

/** Small chip / tag popping in. */
export const chipIn: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

/** Parent that staggers its children. */
export function stagger(children = 0.07, delay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: children, delayChildren: delay } },
  };
}
