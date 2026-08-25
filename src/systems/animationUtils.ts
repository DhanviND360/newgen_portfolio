/* ═══════════════════════════════════════════════════════════════
   DHANVI — Animation Utilities
   GSAP helpers, easing presets, timeline factories,
   and reduced-motion detection.
   ═══════════════════════════════════════════════════════════════ */

import gsap from 'gsap';

// ── Easing Presets ──
// Cinematic easings matching the design language

export const EASE = {
  /** Smooth cinematic exit — primary ease for most reveals */
  cinematic: 'power3.out',
  /** Dramatic slow entrance — for major statements */
  dramatic: 'power4.inOut',
  /** Snappy exit — for quick transitions */
  snappy: 'power2.out',
  /** Elastic bounce — for interactive elements */
  elastic: 'elastic.out(1, 0.5)',
  /** Linear — for progress bars and continuous motion */
  linear: 'none',
  /** Expo out — for large-scale position moves */
  expo: 'expo.out',
} as const;

// ── Duration Presets (seconds) ──

export const DURATION = {
  instant: 0.1,
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.2,
  dramatic: 2.0,
} as const;

// ── Reduced Motion Detection ──

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns adjusted duration — 0 if user prefers reduced motion,
 * otherwise the original duration.
 */
export function safeDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Returns a safe ease — 'none' if reduced motion, otherwise the given ease.
 */
export function safeEase(ease: string): string {
  return prefersReducedMotion() ? 'none' : ease;
}

// ── Timeline Factories ──

/**
 * Create a GSAP timeline for a cinematic phase.
 * Automatically respects reduced motion.
 * Returns a paused timeline — caller controls playback.
 */
export function createPhaseTimeline(options?: gsap.TimelineVars): gsap.core.Timeline {
  return gsap.timeline({
    paused: true,
    ...options,
  });
}

/**
 * Create a text reveal animation (clip/translate up).
 * Target element should have `overflow: hidden` on parent.
 */
export function addTextReveal(
  timeline: gsap.core.Timeline,
  target: gsap.TweenTarget,
  options?: {
    duration?: number;
    delay?: number;
    y?: number;
    position?: string | number;
  }
): gsap.core.Timeline {
  const { duration = DURATION.cinematic, delay = 0, y = 60, position } = options ?? {};

  return timeline.fromTo(
    target,
    {
      y,
      opacity: 0,
      willChange: 'transform, opacity',
    },
    {
      y: 0,
      opacity: 1,
      duration: safeDuration(duration),
      ease: safeEase(EASE.cinematic),
      delay,
      clearProps: 'willChange',
    },
    position
  );
}

/**
 * Create a fade-in animation.
 */
export function addFadeIn(
  timeline: gsap.core.Timeline,
  target: gsap.TweenTarget,
  options?: {
    duration?: number;
    delay?: number;
    position?: string | number;
  }
): gsap.core.Timeline {
  const { duration = DURATION.normal, delay = 0, position } = options ?? {};

  return timeline.fromTo(
    target,
    {
      opacity: 0,
      willChange: 'opacity',
    },
    {
      opacity: 1,
      duration: safeDuration(duration),
      ease: safeEase(EASE.snappy),
      delay,
      clearProps: 'willChange',
    },
    position
  );
}

/**
 * Create a fade-out animation.
 */
export function addFadeOut(
  timeline: gsap.core.Timeline,
  target: gsap.TweenTarget,
  options?: {
    duration?: number;
    delay?: number;
    position?: string | number;
  }
): gsap.core.Timeline {
  const { duration = DURATION.fast, delay = 0, position } = options ?? {};

  return timeline.to(
    target,
    {
      opacity: 0,
      duration: safeDuration(duration),
      ease: safeEase(EASE.snappy),
      delay,
    },
    position
  );
}

/**
 * Create a scale reveal animation.
 */
export function addScaleReveal(
  timeline: gsap.core.Timeline,
  target: gsap.TweenTarget,
  options?: {
    duration?: number;
    delay?: number;
    fromScale?: number;
    position?: string | number;
  }
): gsap.core.Timeline {
  const { duration = DURATION.cinematic, delay = 0, fromScale = 0.85, position } = options ?? {};

  return timeline.fromTo(
    target,
    {
      scale: fromScale,
      opacity: 0,
      willChange: 'transform, opacity',
    },
    {
      scale: 1,
      opacity: 1,
      duration: safeDuration(duration),
      ease: safeEase(EASE.cinematic),
      delay,
      clearProps: 'willChange',
    },
    position
  );
}

/**
 * Create a horizontal line expand animation.
 */
export function addLineExpand(
  timeline: gsap.core.Timeline,
  target: gsap.TweenTarget,
  options?: {
    duration?: number;
    width?: string | number;
    position?: string | number;
  }
): gsap.core.Timeline {
  const { duration = DURATION.slow, width = '100px', position } = options ?? {};

  return timeline.to(
    target,
    {
      width,
      duration: safeDuration(duration),
      ease: safeEase(EASE.expo),
    },
    position
  );
}

/**
 * Create a staggered reveal for a list of elements.
 */
export function addStaggerReveal(
  timeline: gsap.core.Timeline,
  targets: gsap.TweenTarget,
  options?: {
    duration?: number;
    stagger?: number;
    y?: number;
    position?: string | number;
  }
): gsap.core.Timeline {
  const { duration = DURATION.normal, stagger = 0.15, y = 30, position } = options ?? {};

  return timeline.fromTo(
    targets,
    {
      y,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: safeDuration(duration),
      ease: safeEase(EASE.cinematic),
      stagger: safeDuration(stagger),
    },
    position
  );
}

// ── Cleanup Utilities ──

/**
 * Kill all GSAP animations on the given targets.
 */
export function killAnimations(...targets: gsap.TweenTarget[]): void {
  targets.forEach((target) => gsap.killTweensOf(target));
}

/**
 * Set will-change on elements for GPU acceleration.
 * Call clearWillChange after animation completes.
 */
export function setWillChange(
  elements: HTMLElement | HTMLElement[],
  properties: string = 'transform, opacity'
): void {
  const els = Array.isArray(elements) ? elements : [elements];
  els.forEach((el) => {
    el.style.willChange = properties;
  });
}

export function clearWillChange(elements: HTMLElement | HTMLElement[]): void {
  const els = Array.isArray(elements) ? elements : [elements];
  els.forEach((el) => {
    el.style.willChange = 'auto';
  });
}
