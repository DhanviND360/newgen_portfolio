'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Creator Reveal Component
   
   Final cinematic sequence before HOME.
   
   ACT 1 — QUESTION
   "Wanna meet the" appears (white, display font — matching
   the boot sequence typography exactly).
   "CREATOR?" appears below in high-contrast neon cyan.
   Hold for impact.
   
   ACT 2 — SCROLL TRANSITION
   The question text scrolls upward and fades out.
   Simultaneously, "DHANVI" as a faint gray wireframe
   scrolls up from below into the center of the screen.
   
   ACT 3 — LETTER ILLUMINATION
   Each letter of DHANVI traces on left-to-right via a
   clip-path reveal of the cyan layer over the gray wireframe.
   This creates the effect of illumination traveling through
   each letter's structure. Letters activate sequentially:
   D → H → A → N → V → I.
   Each activation includes a brief glow pulse.
   
   ACT 4 — GLOW SURGE + TRANSITION OUT
   After all letters are lit, a collective glow surge.
   Hold. Then fade to black → HOME.
   
   All effects are real-time code. No video. No GIF.
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import styles from '@/styles/creator-reveal.module.css';
import {
  createPhaseTimeline,
  safeDuration,
  safeEase,
  EASE,
  DURATION,
  prefersReducedMotion,
} from '@/systems/animationUtils';

interface CreatorRevealProps {
  isActive: boolean;
  onComplete: () => void;
}

const NAME_LETTERS = ['D', 'H', 'A', 'N', 'V', 'I'];

export default function CreatorReveal({ isActive, onComplete }: CreatorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Question refs
  const questionSectionRef = useRef<HTMLDivElement>(null);
  const questionLineRef = useRef<HTMLDivElement>(null);
  const questionAccentRef = useRef<HTMLDivElement>(null);

  // Name refs
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const letterBaseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letterCyanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nameGlowRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const buildTimeline = useCallback(() => {
    if (!containerRef.current) return null;

    const tl = createPhaseTimeline({
      onComplete: () => {
        onComplete();
      },
    });

    // ── Reduced motion: show final state immediately ──
    if (prefersReducedMotion()) {
      tl.set(containerRef.current, { opacity: 1 });
      tl.set(nameContainerRef.current, { opacity: 1 });
      letterCyanRefs.current.forEach((ref) => {
        if (ref) tl.set(ref, { clipPath: 'inset(0 0% 0 0)' });
      });
      tl.to({}, { duration: 2 });
      return tl;
    }

    // ═══════════════════════════════════════════════════
    // INITIAL STATES
    // ═══════════════════════════════════════════════════

    tl.set(containerRef.current, { opacity: 1 });

    // Question: hidden
    tl.set(questionLineRef.current, { opacity: 0, y: 20 });
    tl.set(questionAccentRef.current, { opacity: 0, y: 25, scale: 0.95 });

    // Name: hidden, positioned below viewport center
    tl.set(nameContainerRef.current, { opacity: 0, y: 120 });

    // All cyan letter overlays: fully clipped (invisible)
    letterCyanRefs.current.forEach((ref) => {
      if (ref) {
        tl.set(ref, {
          clipPath: 'inset(0 100% 0 0)',
          textShadow: '0 0 0px rgba(62, 220, 196, 0)',
        });
      }
    });

    // Name glow: hidden
    tl.set(nameGlowRef.current, { opacity: 0 });

    let cursor = 0.4;

    // ═══════════════════════════════════════════════════
    // ACT 1: "Wanna meet the CREATOR?"
    // Typography matches the boot sequence display font.
    // ═══════════════════════════════════════════════════

    // "Wanna meet the" — fades in with upward settle
    tl.to(questionLineRef.current, {
      opacity: 1,
      y: 0,
      duration: safeDuration(0.8),
      ease: safeEase(EASE.cinematic),
    }, cursor);

    cursor += 0.5;

    // "CREATOR?" — fades in with scale, neon cyan glow
    tl.to(questionAccentRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: safeDuration(0.6),
      ease: safeEase(EASE.cinematic),
    }, cursor);

    cursor += 0.6;

    // Hold for impact
    cursor += 1.4;

    // ═══════════════════════════════════════════════════
    // ACT 2: SCROLL TRANSITION
    // Question scrolls upward and fades out.
    // DHANVI wireframe scrolls up from below into center.
    // ═══════════════════════════════════════════════════

    const scrollDuration = 1.2;

    // Question scrolls up and fades
    tl.to(questionSectionRef.current, {
      y: -150,
      opacity: 0,
      filter: 'blur(4px)',
      duration: safeDuration(scrollDuration),
      ease: safeEase('power3.inOut'),
    }, cursor);

    // DHANVI scrolls up from below into center
    tl.to(nameContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: safeDuration(scrollDuration),
      ease: safeEase('power3.inOut'),
    }, cursor + 0.15);

    cursor += scrollDuration + 0.3;

    // ═══════════════════════════════════════════════════
    // ACT 3: LETTER-BY-LETTER ILLUMINATION
    // Each letter's cyan layer is revealed via clip-path,
    // creating illumination that traces across the letter.
    // D → H → A → N → V → I, sequential.
    // ═══════════════════════════════════════════════════

    const traceStart = cursor;
    const traceDuration = 0.5;    // time for one letter to trace on
    const traceStagger = 0.38;    // time between letter starts

    NAME_LETTERS.forEach((_, idx) => {
      const cyanRef = letterCyanRefs.current[idx];
      const baseRef = letterBaseRefs.current[idx];
      if (!cyanRef) return;

      const letterStart = traceStart + idx * traceStagger;

      // ── TRACE: Clip-path reveals cyan from left to right ──
      // This is the core "tracing illumination" effect.
      // The clip edge IS the illumination point — it visibly
      // sweeps across the letter's wireframe structure.
      tl.to(cyanRef, {
        clipPath: 'inset(0 0% 0 0)',
        duration: safeDuration(traceDuration),
        ease: safeEase('power2.inOut'),
      }, letterStart);

      // ── GLOW SPIKE: textShadow intensifies during trace ──
      tl.to(cyanRef, {
        textShadow: '0 0 25px rgba(62, 220, 196, 0.7), 0 0 50px rgba(62, 220, 196, 0.3)',
        duration: safeDuration(traceDuration * 0.6),
        ease: safeEase('power2.out'),
      }, letterStart);

      // ── SETTLE: glow reduces to steady state after trace completes ──
      tl.to(cyanRef, {
        textShadow: '0 0 10px rgba(62, 220, 196, 0.3), 0 0 20px rgba(62, 220, 196, 0.1)',
        duration: safeDuration(0.4),
        ease: safeEase('power2.inOut'),
      }, letterStart + traceDuration);

      // ── BASE BRIGHTENS: gray wireframe subtly warms as the letter activates ──
      if (baseRef) {
        tl.to(baseRef, {
          webkitTextStrokeColor: '#2a2a2a',
          duration: safeDuration(traceDuration),
          ease: safeEase('power2.out'),
        }, letterStart);
      }
    });

    // Move cursor past all letter traces
    cursor = traceStart + (NAME_LETTERS.length - 1) * traceStagger + traceDuration;

    // ═══════════════════════════════════════════════════
    // GLOW SURGE — collective power-on pulse
    // ═══════════════════════════════════════════════════

    cursor += 0.2;

    // All letters surge — amplified glow
    letterCyanRefs.current.forEach((ref) => {
      if (ref) {
        tl.to(ref, {
          textShadow: '0 0 40px rgba(62, 220, 196, 0.8), 0 0 80px rgba(62, 220, 196, 0.35), 0 0 120px rgba(62, 220, 196, 0.1)',
          duration: safeDuration(0.45),
          ease: safeEase('power2.inOut'),
          yoyo: true,
          repeat: 1,
        }, cursor);
      }
    });

    // Radial glow bloom behind the name
    tl.to(nameGlowRef.current, {
      opacity: 1,
      duration: safeDuration(0.45),
      ease: safeEase('power2.inOut'),
      yoyo: true,
      repeat: 1,
    }, cursor);

    cursor += 0.9;

    // ═══════════════════════════════════════════════════
    // HOLD — let the viewer absorb the illuminated name
    // ═══════════════════════════════════════════════════

    cursor += 1.6;

    // ═══════════════════════════════════════════════════
    // ACT 4: TRANSITION OUT → HOME
    // ═══════════════════════════════════════════════════

    tl.to(containerRef.current, {
      scale: 0.94,
      opacity: 0,
      filter: 'blur(8px)',
      duration: safeDuration(1.2),
      ease: safeEase('power3.inOut'),
    }, cursor);

    cursor += 1.2;

    // Brief gap
    tl.to({}, { duration: 0.2 }, cursor);

    return tl;
  }, [onComplete]);

  // Play when active
  useEffect(() => {
    if (!isActive) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      return;
    }

    const initTimeout = setTimeout(() => {
      const tl = buildTimeline();
      if (tl) {
        timelineRef.current = tl;
        tl.play();
      }
    }, 80);

    return () => {
      clearTimeout(initTimeout);
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [isActive, buildTimeline]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className={styles.revealRoot}
      style={{ opacity: 0 }}
      aria-label="Creator reveal sequence"
    >
      {/* ── ACT 1: "Wanna meet the CREATOR?" ── */}
      <div ref={questionSectionRef} className={styles.questionSection}>
        <div
          ref={questionLineRef}
          className={styles.questionLine}
        >
          Wanna meet the
        </div>
        <div
          ref={questionAccentRef}
          className={styles.questionAccent}
        >
          CREATOR?
        </div>
      </div>

      {/* ── ACT 2+3: DHANVI Name (large, centred) ── */}
      <div ref={nameContainerRef} className={styles.nameContainer}>
        {NAME_LETTERS.map((letter, idx) => (
          <div key={idx} className={styles.letterGroup}>
            {/* Base: faint gray wireframe outline */}
            <span
              ref={(el) => { letterBaseRefs.current[idx] = el; }}
              className={styles.letterBase}
            >
              {letter}
            </span>

            {/* Cyan overlay: clip-path traced illumination */}
            <span
              ref={(el) => { letterCyanRefs.current[idx] = el; }}
              className={styles.letterCyan}
            >
              {letter}
            </span>
          </div>
        ))}

        {/* Radial glow bloom (behind the name) */}
        <div ref={nameGlowRef} className={styles.nameGlow} />
      </div>
    </div>
  );
}
