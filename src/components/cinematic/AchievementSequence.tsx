'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Achievement Sequence
   
   Cinematic typographic & visual achievement presentation.
   Dual-panel spatial layout:
   - LEFT/RIGHT: Dominant metric statement, title, event, statement
   - OPPOSITE: 3-tile vertical image showcase with Tron red glow,
     hover-expansion, and full-resolution lightbox modal.
   
   Sequence:
   1. "ACHIEVEMENTS" title — scale in, hold, recede
   2. Each achievement: result dominates → visual emerges → title → event → statement
   3. Alternating layout creates continuous visual rhythm
   4. After final achievement: everything recedes, scene zooms out,
      typography shrinks, visual field becomes sparse → CREATOR_REVEAL
   
   Time-based GSAP master timeline.
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useCallback, createRef, useState } from 'react';
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

interface AchievementRefs {
  scene: HTMLDivElement | null;
  visual: HTMLDivElement | null;
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
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Close lightbox on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeImage) {
        e.stopPropagation();
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  // Create stable refs for each achievement
  const achievementRefs = useRef(
    achievements.map(() => createRef<HTMLDivElement>())
  );
  // Store inner element refs via callback refs
  const innerRefs = useRef<AchievementRefs[]>(
    achievements.map(() => ({
      scene: null,
      visual: null,
      result: null,
      title: null,
      divider: null,
      event: null,
      year: null,
      statement: null,
    }))
  );

  // Keep refs synchronized with achievements array length
  if (innerRefs.current.length !== achievements.length) {
    innerRefs.current = achievements.map((_, i) => innerRefs.current[i] || {
      scene: null,
      visual: null,
      result: null,
      title: null,
      divider: null,
      event: null,
      year: null,
      statement: null,
    });
    achievementRefs.current = achievements.map((_, i) => achievementRefs.current[i] || createRef<HTMLDivElement>());
  }

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
        if (refs.scene) tl.set(refs.scene, { opacity: 1, pointerEvents: 'auto' });
        if (refs.visual) tl.set(refs.visual, { opacity: 1 });
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

      // Enable pointer events and elevate z-index on active achievement
      tl.set(refs.scene, {
        pointerEvents: 'auto',
        zIndex: 10,
      }, entryStart);

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

      // ── Visual frame reveals with smooth slide ──
      if (refs.visual) {
        tl.fromTo(
          refs.visual,
          {
            opacity: 0,
            scale: 0.95,
            y: 15,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: safeDuration(TIMING.resultEntry),
            ease: safeEase(EASE.cinematic),
          },
          entryStart + 0.1
        );
      }

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
        tl.set(refs.scene, {
          pointerEvents: 'none',
          zIndex: 1,
        }, cursor);

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

    // Fade out the last achievement and disable pointer events
    const lastRefs = innerRefs.current[achievements.length - 1];
    if (lastRefs?.scene) {
      tl.set(lastRefs.scene, {
        pointerEvents: 'none',
        zIndex: 1,
      }, recessionStart);
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
        const isReverse = index % 2 === 1;

        return (
          <div
            key={achievement.id}
            ref={(el) => {
              if (el) innerRefs.current[index].scene = el;
            }}
            className={styles.achievementScene}
          >
            <div
              className={`${styles.achievementContainer} ${
                isReverse ? styles.achievementContainerReverse : ''
              }`}
            >
              {/* Info Side */}
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

              {/* Visual Showcase: 3 Vertical Image Tiles */}
              <div
                ref={(el) => {
                  if (el) innerRefs.current[index].visual = el;
                }}
                className={styles.achievementVisual}
              >
                <div className={styles.visualFrame}>
                  {achievement.images && achievement.images.length > 0 ? (
                    <div className={styles.verticalTilesContainer}>
                      {achievement.images.slice(0, 3).map((imgSrc, i) => (
                        <div
                          key={i}
                          className={styles.verticalTile}
                          onClick={() => setActiveImage(imgSrc)}
                          title="Click to expand view"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setActiveImage(imgSrc);
                            }
                          }}
                        >
                          <div className={styles.tileImageWrapper}>
                            <img
                              src={imgSrc}
                              alt={`${achievement.title} proof asset 0${i + 1}`}
                              className={styles.tileImage}
                              style={{
                                objectPosition:
                                  achievement.imagePositions?.[i] || 'center center',
                              }}
                            />
                            <div className={styles.tileGlowOverlay} />
                            <div className={styles.tileScanline} />
                          </div>
                          <div className={styles.tileBadge}>
                            <span className={styles.tileBadgeText}>
                              {achievement.tileLabels?.[i] || `0${i + 1}`}
                            </span>
                            <span className={styles.tileBadgeDot} />
                          </div>
                          <div className={styles.tileCornerTL} />
                          <div className={styles.tileCornerBR} />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Lightbox Preview Modal */}
      {activeImage && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.lightboxContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.lightboxClose}
              onClick={() => setActiveImage(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <img
              src={activeImage}
              alt="Enlarged achievement view"
              className={styles.lightboxImg}
            />
          </div>
        </div>
      )}
    </div>
  );
}
