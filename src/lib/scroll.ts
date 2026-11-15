import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function initSmoothScroll(): (() => void) | undefined {
  if (typeof window === 'undefined') return undefined;

  // Disable smooth scroll when user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    return undefined;
  }

  if (lenisInstance) {
    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }

  // Exactly ONE Lenis instance with lerp 0.1 and smoothWheel true
  lenisInstance = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  // Exactly ONE requestAnimationFrame loop started at the root
  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Global anchor click interceptor to use lenis.scrollTo
  const handleAnchorClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (href && href.startsWith('#')) {
      if (href === '#' || href === '#top') {
        e.preventDefault();
        scrollToTop();
      } else {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          scrollToElement(el as HTMLElement);
        }
      }
    }
  };

  document.addEventListener('click', handleAnchorClick);

  return () => {
    document.removeEventListener('click', handleAnchorClick);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lenisInstance?.destroy();
    lenisInstance = null;
  };
}

export function scrollToElement(elementOrSelector: string | HTMLElement, offset = 0): void {
  if (typeof window === 'undefined') return;

  const target = typeof elementOrSelector === 'string'
    ? (document.querySelector(elementOrSelector) as HTMLElement | null)
    : elementOrSelector;

  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset });
  } else {
    target.scrollIntoView({ behavior: 'auto' });
  }
}

export function scrollToTop(): void {
  if (typeof window === 'undefined') return;

  if (lenisInstance) {
    lenisInstance.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
