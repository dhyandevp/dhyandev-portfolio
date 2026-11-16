import type { Variants } from 'motion/react';

/**
 * Shared Motion System Tokens
 * Strict tokens: cubic-bezier(0.22, 1, 0.36, 1), transform + opacity only.
 */
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

// Check prefers-reduced-motion safely
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if currently on mobile viewport (<640px)
export const isMobileViewport = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
};

// Section reveal variant: animate ONLY transform (y: 24 -> 0 or 16 -> 0 on mobile) and opacity (0 -> 1)
// When prefers-reduced-motion is active: instant show with 0 duration and 0 y-offset.
export const revealVariant: Variants = {
  hidden: () => {
    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();
    return {
      opacity: reduced ? 1 : 0,
      y: reduced ? 0 : mobile ? 16 : 24,
    };
  },
  visible: () => {
    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();
    return {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : mobile ? 0.4 : 0.6,
        ease: MOTION_EASE,
      },
    };
  },
};

// Stagger container: 0.08s on desktop, 0.05s on mobile
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: typeof window !== 'undefined' && window.innerWidth < 640 ? 0.05 : 0.08,
      delayChildren: 0.04,
    },
  },
};

// Hero headline word-by-word mask reveal
export const wordMaskContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: typeof window !== 'undefined' && window.innerWidth < 640 ? 0.04 : 0.06,
      delayChildren: 0.1,
    },
  },
};

export const wordMaskChild: Variants = {
  hidden: () => ({
    y: prefersReducedMotion() ? '0%' : '100%',
  }),
  visible: () => ({
    y: '0%',
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.6,
      ease: MOTION_EASE,
    },
  }),
};

// Standard viewport trigger: once: true, amount: 0.2, margin: '0px 0px -80px 0px'
export const standardViewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -80px 0px',
};

// Interactive tap scale for buttons/cards: whileTap={{ scale: 0.98 }}
export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.12, ease: MOTION_EASE },
};
