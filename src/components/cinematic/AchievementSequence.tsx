'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Achievement Sequence
   
   Cinematic typographic achievement presentation.
   NOT a resume list — each achievement is a full-viewport
   typographic statement.
   
   Sequence:
   1. "ACHIEVEMENTS" title — scale in, hold, recede
   2. Each achievement: result dominates → title → event → statement
   3. Achievements occupy different screen positions for movement
   4. After final achievement: everything recedes, scene zooms out,
      typography shrinks, visual field becomes sparse → CREATOR_REVEAL
   
   Time-based GSAP master timeline. No scroll. No input.
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useCallback, createRef } from 'react';
import gsap from 'gsap';
import type { Achievement } from '@/data/portfolio';
import styles from '@/styles/achievements.module.css';
import {
  createPhaseTimeline,
  safeDuration,
  safeEase,
  EASE,
  DURATION,
  prefersReducedMotion,
} from '@/systems/animationUtils';

interface AchievementSequenceProps {
  isActive: boolean;
  achievements: Achievement[];
  onComplete: () => void;
}

/* ── Timing Constants (seconds) ── */
const TIMING = {
  /** Phase title entrance duration */
  titleEntry: 1.2,
  /** Phase title hold */
  titleHold: 1.4,
  /** Phase title exit */
  titleExit: 0.8,
  /** Gap between title exit and first achievement */
  preBeat: 0.5,
  /** Achievement result (big number/metric) entrance */
  resultEntry: 0.9,
  /** Stagger delay for secondary text elements */
  textStagger: 0.12,
  /** Duration for each text element reveal */
  textReveal: 0.6,
  /** Duration for divider line expand */
  dividerExpand: 0.5,
  /** Hold each achievement in focus */
  achievementHold: 2.8,
  /** Achievement exit duration */
  achievementExit: 0.8,
  /** Overlap between consecutive achievements */
  overlap: 0.2,
  /** Final recession: everything zooms out */
  recessionDuration: 2.0,
  /** Final darkness gap before advancing */
  postGap: 0.6,
} as const;

/** Screen position classes cycled per achievement */
const POSITION_CLASSES = [
  styles.position0,  // center-left
  styles.position1,  // center-right
  styles.position2,  // center
  styles.position3,  // lower-left
];

interface AchievementRefs {
  scene: HTMLDivElement | null;
  result: HTMLDivElement | null;
  title: HTMLDivElement | null;
  divider: HTMLDivElement | null;
  event: HTMLDivElement | null;
  year: HTMLDivElement | null;
  statement: HTMLParagraphElement | null;
}

export default function AchievementSequence({
  isActive,
  achievements,
  onComplete,
}: AchievementSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phaseTitleRef = useRef<HTMLDivElement>(null);
  const phaseTitleTextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Create stable refs for each achievement
  const achievementRefs = useRef(
    achievements.map(() => createRef<HTMLDivElement>())
  );
  // Store inner element refs via callback refs
  const innerRefs = useRef<AchievementRefs[]>(
    achievements.map(() => ({
      scene: null,
      result: null,
      title: null,
      divider: null,
      event: null,
      year: null,
      statement: null,
    }))
  );

  const buildTimeline = useCallback(() => {
    if (!containerRef.current) return null;

    const tl = createPhaseTimeline({
      onComplete: () => {
        onComplete();
      },
    });

    const phaseTitle = phaseTitleRef.current;
    const phaseTitleText = phaseTitleTextRef.current;

    // ── Reduced motion: show everything instantly, then advance ──
    if (prefersReducedMotion()) {
      if (phaseTitle) tl.set(phaseTitle, { opacity: 1 });
      innerRefs.current.forEach((refs) => {
        if (refs.scene) tl.set(refs.scene, { opacity: 1 });
        if (refs.result) tl.set(refs.result, { opacity: 1 });
        if (refs.title) tl.set(refs.title, { opacity: 1 });
        if (refs.event) tl.set(refs.event, { opacity: 1 });
        if (refs.year) tl.set(refs.year, { opacity: 1 });
        if (refs.statement) tl.set(refs.statement, { opacity: 1 });
      });
      tl.to({}, { duration: 2 });
      return tl;
    }

    let cursor = 0;

    // ═══════════════════════════════════════════════════
    // ACT 1: "ACHIEVEMENTS" — cinematic title entrance
    // ═══════════════════════════════════════════════════

    if (phaseTitle && phaseTitleText) {
      // Scale in from slightly larger with crisp opacity
      tl.fromTo(
        phaseTitle,
        {
          opacity: 0,
          scale: 1.08,
          y: -10,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: safeDuration(TIMING.titleEntry),
          ease: safeEase(EASE.cinematic),
        },
        cursor
      );

      cursor += TIMING.titleEntry + TIMING.titleHold;

      // Exit: scale down and fade
      tl.to(
        phaseTitle,
        {
          opacity: 0,
          scale: 0.92,
          y: 10,
          duration: safeDuration(TIMING.titleExit),
          ease: safeEase(EASE.dramatic),
        },
        cursor
      );

      cursor += TIMING.titleExit + TIMING.preBeat;
    }

    // ═══════════════════════════════════════════════════
    // ACT 2: Individual Achievements
    // ═══════════════════════════════════════════════════

    achievements.forEach((achievement, index) => {
      const refs = innerRefs.current[index];
      if (!refs.scene) return;

      const isLast = index === achievements.length - 1;
      const entryStart = cursor;

      // ── ENTRY: Scene fades in with scale ──
      tl.fromTo(
        refs.scene,
        {
          opacity: 0,
          scale: 0.94,
        },
        {
          opacity: 1,
          scale: 1,
          duration: safeDuration(TIMING.resultEntry),
          ease: safeEase(EASE.cinematic),
        },
        entryStart
      );

      // ── Result (dominant metric) — the hero element ──
      const textStart = entryStart + TIMING.resultEntry * 0.2;
      let textOffset = 0;

      if (refs.result) {
        tl.fromTo(
          refs.result,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: safeDuration(TIMING.resultEntry),
            ease: safeEase(EASE.expo),
          },
          textStart
        );
        textOffset += TIMING.textStagger * 1.5;
      }

      // ── Title ──
      if (refs.title) {
        tl.fromTo(
          refs.title,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: safeDuration(TIMING.textReveal),
            ease: safeEase(EASE.cinematic),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger;
      }

      // ── Divider line expand ──
      if (refs.divider) {
        tl.to(
          refs.divider,
          {
            width: '80px',
            duration: safeDuration(TIMING.dividerExpand),
            ease: safeEase(EASE.expo),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger;
      }

      // ── Event / Organization ──
      if (refs.event) {
        tl.fromTo(
          refs.event,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: safeDuration(TIMING.textReveal),
            ease: safeEase(EASE.cinematic),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger;
      }

      // ── Year ──
      if (refs.year) {
        tl.fromTo(
          refs.year,
          { opacity: 0 },
          {
            opacity: 1,
            duration: safeDuration(TIMING.textReveal * 0.5),
            ease: safeEase(EASE.snappy),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger;
      }

      // ── Supporting Statement ──
      if (refs.statement) {
        tl.fromTo(
          refs.statement,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: safeDuration(TIMING.textReveal),
            ease: safeEase(EASE.cinematic),
          },
          textStart + textOffset
        );
      }

      // ── HOLD ──
      cursor = entryStart + TIMING.resultEntry + TIMING.achievementHold;

      // ── EXIT ──
      if (!isLast) {
        tl.to(
          refs.scene,
          {
            opacity: 0,
            scale: 0.92,
            duration: safeDuration(TIMING.achievementExit),
            ease: safeEase(EASE.dramatic),
          },
          cursor
        );

        cursor += TIMING.achievementExit - TIMING.overlap;
      }
      // Last achievement: held until recession
    });

    // ═══════════════════════════════════════════════════
    // ACT 3: Final Recession
    // Everything zooms backward, typography shrinks,
    // visual field becomes sparse → prepare for creator reveal
    // ═══════════════════════════════════════════════════

    const recessionStart = cursor + 0.2;

    // Fade out the last achievement
    const lastRefs = innerRefs.current[achievements.length - 1];
    if (lastRefs?.scene) {
      tl.to(
        lastRefs.scene,
        {
          opacity: 0,
          scale: 0.8,
          duration: safeDuration(TIMING.recessionDuration * 0.8),
          ease: safeEase(EASE.dramatic),
        },
        recessionStart
      );
    }

    // Zoom the container backward with smooth opacity
    tl.to(
      containerRef.current,
      {
        scale: 0.92,
        opacity: 0,
        duration: safeDuration(TIMING.recessionDuration * 0.75),
        ease: safeEase(EASE.dramatic),
      },
      recessionStart + 0.2
    );

    // Final gap — brief darkness before CREATOR_REVEAL
    cursor = recessionStart + TIMING.recessionDuration * 0.85;
    tl.to({}, { duration: TIMING.postGap }, cursor);

    return tl;
  }, [onComplete, achievements]);

  // Play when active
  useEffect(() => {
    if (!isActive) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      return;
    }

    // Small delay to ensure DOM is ready
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

  // Clean up on unmount
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
      className={styles.sequenceRoot}
      aria-label="Achievement showcase sequence"
    >
      {/* Phase Title: "ACHIEVEMENTS" */}
      <div ref={phaseTitleRef} className={styles.phaseTitle}>
        <div ref={phaseTitleTextRef} className={styles.phaseTitleText}>
          ACHIEVEMENTS
        </div>
      </div>

      {/* Individual achievement scenes */}
      {achievements.map((achievement, index) => {
        const posClass = POSITION_CLASSES[index % POSITION_CLASSES.length];

        return (
          <div
            key={achievement.id}
            ref={(el) => {
              if (el) innerRefs.current[index].scene = el;
            }}
            className={`${styles.achievementScene} ${posClass}`}
          >
            <div className={styles.achievementInner}>
              {/* Result — dominant metric */}
              <div
                ref={(el) => {
                  if (el) innerRefs.current[index].result = el;
                }}
                className={styles.achievementResult}
              >
                {achievement.result}
              </div>

              {/* Title */}
              <div
                ref={(el) => {
                  if (el) innerRefs.current[index].title = el;
                }}
                className={styles.achievementTitle}
              >
                {achievement.title}
              </div>

              {/* Divider */}
              <div
                ref={(el) => {
                  if (el) innerRefs.current[index].divider = el;
                }}
                className={styles.achievementDivider}
              />

              {/* Event / Organization */}
              <div
                ref={(el) => {
                  if (el) innerRefs.current[index].event = el;
                }}
                className={styles.achievementEvent}
              >
                {achievement.event}
              </div>

              {/* Year */}
              <div
                ref={(el) => {
                  if (el) innerRefs.current[index].year = el;
                }}
                className={styles.achievementYear}
              >
                {achievement.year}
              </div>

              {/* Supporting statement (optional) */}
              {achievement.statement && (
                <p
                  ref={(el) => {
                    if (el) innerRefs.current[index].statement = el;
                  }}
                  className={styles.achievementStatement}
                >
                  {achievement.statement}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
