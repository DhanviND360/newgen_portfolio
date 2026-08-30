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
  const neonAuraRef = useRef<HTMLDivElement>(null);
  const neonTextRef = useRef<HTMLSpanElement>(null);

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
      tl.set(questionSectionRef.current, { opacity: 1 });
      tl.set(questionLineRef.current, { opacity: 1, y: 0 });
      tl.set(questionAccentRef.current, { opacity: 1, y: 0, scale: 1 });
      if (neonTextRef.current) {
        tl.set(neonTextRef.current, {
          opacity: 1,
          color: '#ffffff',
          webkitTextStroke: '1.5px #3edcc4',
          textShadow:
            '0 0 4px #ffffff, 0 0 10px #3edcc4, 0 0 20px #3edcc4, 0 0 40px #3edcc4, 0 0 80px rgba(62, 220, 196, 0.75)',
        });
      }
      if (neonAuraRef.current) {
        tl.set(neonAuraRef.current, { opacity: 0.65 });
      }
      tl.set(nameContainerRef.current, { opacity: 1, y: 0 });
      letterCyanRefs.current.forEach((ref) => {
        if (ref) {
          tl.set(ref, {
            opacity: 1,
            color: '#e8fbf7',
            webkitTextStroke: '1.2px #3edcc4',
            textShadow:
              '0 0 2.5px #ffffff, 0 0 6px #3edcc4, 0 0 14px rgba(62, 220, 196, 0.55), 0 0 26px rgba(62, 220, 196, 0.28), 0 0 45px rgba(62, 220, 196, 0.12)',
          });
        }
      });
      if (nameGlowRef.current) {
        tl.set(nameGlowRef.current, { opacity: 0.35 });
      }
      tl.to({}, { duration: 2 });
      return tl;
    }

    // ═══════════════════════════════════════════════════
    // INITIAL STATES
    // ═══════════════════════════════════════════════════

    tl.set(containerRef.current, { opacity: 1 });

    // Question: hidden
    tl.set(questionLineRef.current, { opacity: 0, y: 20 });
    tl.set(questionAccentRef.current, { opacity: 0, y: 15, scale: 0.98 });
    if (neonAuraRef.current) {
      tl.set(neonAuraRef.current, { opacity: 0, scale: 0.85 });
    }
    if (neonTextRef.current) {
      tl.set(neonTextRef.current, {
        opacity: 0,
        color: 'rgba(62, 220, 196, 0.2)',
        webkitTextStroke: '1.5px rgba(62, 220, 196, 0.25)',
        textShadow: '0 0 0px rgba(62, 220, 196, 0)',
      });
    }

    // Name: hidden, positioned below viewport center
    tl.set(nameContainerRef.current, { opacity: 0, y: 120 });

    // All cyan letter overlays: unlit/invisible initially
    letterCyanRefs.current.forEach((ref) => {
      if (ref) {
        tl.set(ref, {
          opacity: 0,
          color: 'rgba(62, 220, 196, 0.15)',
          webkitTextStroke: '1.2px rgba(62, 220, 196, 0.2)',
          textShadow: '0 0 0px rgba(62, 220, 196, 0)',
        });
      }
    });

    // Base letters: unlit dark glass tube outline
    letterBaseRefs.current.forEach((ref) => {
      if (ref) {
        tl.set(ref, {
          webkitTextStrokeColor: 'rgba(62, 220, 196, 0.15)',
        });
      }
    });

    // Name glow: hidden
    tl.set(nameGlowRef.current, { opacity: 0, scale: 0.9 });

    let cursor = 0.4;

    // ═══════════════════════════════════════════════════
    // ACT 1: "Wanna meet the CREATOR?"
    // Typography matches the boot sequence display font.
    // "CREATOR?" lights up like an authentic neon sign:
    // Unlit tube appears -> electrical starter sparks and flickers
    // -> high voltage ignition strike -> steady brilliant neon glow.
    // ═══════════════════════════════════════════════════

    // "Wanna meet the" — fades in with upward settle
    tl.to(questionLineRef.current, {
      opacity: 1,
      y: 0,
      duration: safeDuration(0.75),
      ease: safeEase(EASE.cinematic),
    }, cursor);

    cursor += 0.5;

    // "CREATOR?" container enters as an unlit, dim glass tube silhouette
    tl.to(questionAccentRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: safeDuration(0.35),
      ease: safeEase('power2.out'),
    }, cursor);

    tl.to(neonTextRef.current, {
      opacity: 0.3,
      color: 'rgba(62, 220, 196, 0.2)',
      webkitTextStroke: '1.5px rgba(62, 220, 196, 0.25)',
      textShadow: '0 0 0px rgba(62, 220, 196, 0)',
      duration: safeDuration(0.35),
      ease: safeEase('power2.out'),
    }, cursor);

    cursor += 0.4;

    // ── NEON SIGN ELECTRICAL IGNITION / FLICKER SEQUENCE ──

    // 1. Initial starter voltage burst (Spark 1)
    const s1 = cursor;
    tl.to(neonTextRef.current, {
      opacity: 0.9,
      color: '#e0fffa',
      webkitTextStroke: '1.5px #3edcc4',
      textShadow: '0 0 8px #ffffff, 0 0 20px #3edcc4, 0 0 45px rgba(62, 220, 196, 0.65)',
      duration: safeDuration(0.04),
      ease: 'none',
    }, s1);
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, {
        opacity: 0.45,
        duration: safeDuration(0.04),
        ease: 'none',
      }, s1);
    }

    // 2. Transformer dropout (Cut 1)
    const c1 = s1 + 0.04;
    tl.to(neonTextRef.current, {
      opacity: 0.15,
      color: 'rgba(62, 220, 196, 0.15)',
      webkitTextStroke: '1.5px rgba(62, 220, 196, 0.2)',
      textShadow: '0 0 0px rgba(62, 220, 196, 0)',
      duration: safeDuration(0.04),
      ease: 'none',
    }, c1);
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, {
        opacity: 0,
        duration: safeDuration(0.04),
        ease: 'none',
      }, c1);
    }

    // 3. Second weak stutter spark (Spark 2)
    const s2 = c1 + 0.08;
    tl.to(neonTextRef.current, {
      opacity: 0.65,
      color: '#c4f8ef',
      webkitTextStroke: '1.5px #3edcc4',
      textShadow: '0 0 6px #ffffff, 0 0 16px #3edcc4, 0 0 30px rgba(62, 220, 196, 0.4)',
      duration: safeDuration(0.04),
      ease: 'none',
    }, s2);
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, {
        opacity: 0.3,
        duration: safeDuration(0.04),
        ease: 'none',
      }, s2);
    }

    // 4. Quick cutoff (Cut 2)
    const c2 = s2 + 0.04;
    tl.to(neonTextRef.current, {
      opacity: 0.1,
      color: 'rgba(62, 220, 196, 0.12)',
      webkitTextStroke: '1.5px rgba(62, 220, 196, 0.18)',
      textShadow: '0 0 0px rgba(62, 220, 196, 0)',
      duration: safeDuration(0.05),
      ease: 'none',
    }, c2);
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, {
        opacity: 0,
        duration: safeDuration(0.05),
        ease: 'none',
      }, c2);
    }

    // 5. Rapid double-stutter before full ionization (Spark 3)
    const s3 = c2 + 0.06;
    tl.to(neonTextRef.current, {
      opacity: 0.95,
      color: '#f0fffd',
      webkitTextStroke: '1.8px #3edcc4',
      textShadow: '0 0 10px #ffffff, 0 0 25px #3edcc4, 0 0 50px rgba(62, 220, 196, 0.75)',
      duration: safeDuration(0.05),
      ease: 'none',
    }, s3);
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, {
        opacity: 0.6,
        duration: safeDuration(0.05),
        ease: 'none',
      }, s3);
    }

    // 6. Micro drop
    const s3dip = s3 + 0.05;
    tl.to(neonTextRef.current, {
      opacity: 0.4,
      color: '#7de2d3',
      webkitTextStroke: '1.5px #3edcc4',
      textShadow: '0 0 6px rgba(62, 220, 196, 0.35)',
      duration: safeDuration(0.03),
      ease: 'none',
    }, s3dip);

    // 7. Full Voltage Surge Strike! (Turns on completely with power surge)
    const strike = s3dip + 0.03;
    tl.to(neonTextRef.current, {
      opacity: 1,
      color: '#ffffff',
      webkitTextStroke: '2px #3edcc4',
      textShadow:
        '0 0 6px #ffffff, 0 0 15px #3edcc4, 0 0 30px #3edcc4, 0 0 60px #3edcc4, 0 0 100px rgba(62, 220, 196, 0.9), 0 0 150px rgba(62, 220, 196, 0.6)',
      scale: 1.03,
      duration: safeDuration(0.12),
      ease: safeEase('power2.out'),
    }, strike);
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, {
        opacity: 1,
        scale: 1.1,
        duration: safeDuration(0.12),
        ease: safeEase('power2.out'),
      }, strike);
    }

    // 8. Settle into steady high-power neon state
    const settle = strike + 0.12;
    tl.to(neonTextRef.current, {
      opacity: 1,
      color: '#ffffff',
      webkitTextStroke: '1.5px #3edcc4',
      textShadow:
        '0 0 4px #ffffff, 0 0 10px #3edcc4, 0 0 20px #3edcc4, 0 0 40px #3edcc4, 0 0 80px rgba(62, 220, 196, 0.75), 0 0 120px rgba(62, 220, 196, 0.35)',
      scale: 1.0,
      duration: safeDuration(0.25),
      ease: safeEase('power2.inOut'),
    }, settle);
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, {
        opacity: 0.65,
        scale: 1.0,
        duration: safeDuration(0.25),
        ease: safeEase('power2.inOut'),
      }, settle);
    }

    // 9. Subtle neon hum / glow breathing during hold
    const hum = settle + 0.25;
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, {
        opacity: 0.45,
        duration: safeDuration(0.35),
        ease: safeEase('sine.inOut'),
        yoyo: true,
        repeat: 3,
      }, hum);
    }

    // Hold for impact
    cursor = hum + 1.4;

    // ═══════════════════════════════════════════════════
    // ACT 2: SCROLL TRANSITION
    // Question scrolls upward and fades out.
    // DHANVI unlit neon tubes scroll up from below into center.
    // ═══════════════════════════════════════════════════

    const scrollDuration = 1.2;

    // Question scrolls up and fades
    tl.to(questionSectionRef.current, {
      y: -150,
      opacity: 0,
      duration: safeDuration(scrollDuration),
      ease: safeEase('power3.inOut'),
    }, cursor);

    // DHANVI unlit glass tubes scroll up from below into center
    tl.to(nameContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: safeDuration(scrollDuration),
      ease: safeEase('power3.inOut'),
    }, cursor + 0.15);

    cursor += scrollDuration + 0.35;

    // ═══════════════════════════════════════════════════
    // ACT 3: SEQUENTIAL NEON SIGN ILLUMINATION (D → H → A → N → V → I)
    // Each letter undergoes authentic neon tube starter sparks,
    // dropout, and high-voltage ignition strike before settling
    // into a slightly dimmer, refined neon glow.
    // ═══════════════════════════════════════════════════

    const traceStart = cursor;
    const traceStagger = 0.32; // time between sequential letter ignitions

    NAME_LETTERS.forEach((_, idx) => {
      const cyanRef = letterCyanRefs.current[idx];
      const baseRef = letterBaseRefs.current[idx];
      if (!cyanRef) return;

      const letterStart = traceStart + idx * traceStagger;

      // ── Step 1: Initial starter voltage spark (0.04s) ──
      tl.to(cyanRef, {
        opacity: 0.85,
        color: '#e0fffa',
        webkitTextStroke: '1.2px #3edcc4',
        textShadow: '0 0 5px #ffffff, 0 0 12px #3edcc4, 0 0 25px rgba(62, 220, 196, 0.5)',
        duration: safeDuration(0.04),
        ease: 'none',
      }, letterStart);

      // ── Step 2: Transformer dropout cut (0.03s) ──
      tl.to(cyanRef, {
        opacity: 0.1,
        color: 'rgba(62, 220, 196, 0.15)',
        webkitTextStroke: '1.2px rgba(62, 220, 196, 0.2)',
        textShadow: '0 0 0px rgba(62, 220, 196, 0)',
        duration: safeDuration(0.03),
        ease: 'none',
      }, letterStart + 0.04);

      // ── Step 3: Secondary stutter spark (0.04s) ──
      tl.to(cyanRef, {
        opacity: 0.65,
        color: '#c4f8ef',
        webkitTextStroke: '1.2px #3edcc4',
        textShadow: '0 0 4px #ffffff, 0 0 10px #3edcc4, 0 0 18px rgba(62, 220, 196, 0.35)',
        duration: safeDuration(0.04),
        ease: 'none',
      }, letterStart + 0.07);

      // ── Step 4: Quick cutoff (0.03s) ──
      tl.to(cyanRef, {
        opacity: 0.08,
        color: 'rgba(62, 220, 196, 0.12)',
        webkitTextStroke: '1.2px rgba(62, 220, 196, 0.18)',
        textShadow: '0 0 0px rgba(62, 220, 196, 0)',
        duration: safeDuration(0.03),
        ease: 'none',
      }, letterStart + 0.11);

      // ── Step 5: Full Voltage Surge Strike (0.08s) ──
      tl.to(cyanRef, {
        opacity: 1,
        color: '#ffffff',
        webkitTextStroke: '1.5px #3edcc4',
        textShadow:
          '0 0 5px #ffffff, 0 0 12px #3edcc4, 0 0 24px #3edcc4, 0 0 45px rgba(62, 220, 196, 0.7)',
        duration: safeDuration(0.08),
        ease: safeEase('power2.out'),
      }, letterStart + 0.14);

      // Base tube brightens in tandem
      if (baseRef) {
        tl.to(baseRef, {
          webkitTextStrokeColor: 'rgba(62, 220, 196, 0.3)',
          duration: safeDuration(0.08),
          ease: safeEase('power2.out'),
        }, letterStart + 0.14);
      }

      // ── Step 6: Settle into steady (slightly dimmer than creator) neon glow (0.15s) ──
      tl.to(cyanRef, {
        opacity: 1,
        color: '#e8fbf7',
        webkitTextStroke: '1.2px #3edcc4',
        textShadow:
          '0 0 2.5px #ffffff, 0 0 6px #3edcc4, 0 0 14px rgba(62, 220, 196, 0.55), 0 0 26px rgba(62, 220, 196, 0.28), 0 0 45px rgba(62, 220, 196, 0.12)',
        duration: safeDuration(0.15),
        ease: safeEase('power2.inOut'),
      }, letterStart + 0.22);
    });

    // Move cursor past all sequential letter ignitions
    cursor = traceStart + (NAME_LETTERS.length - 1) * traceStagger + 0.42;

    // ═══════════════════════════════════════════════════
    // ACT 4: FINAL ALL-TOGETHER NEON POWER SURGE
    // After all 6 letters are individually lit, a collective
    // high-voltage pulse surges through all letters simultaneously.
    // ═══════════════════════════════════════════════════

    cursor += 0.2;
    const collectiveSurgeStart = cursor;

    // All letters surge together into high-power glow
    const activeCyanRefs = letterCyanRefs.current.filter((ref): ref is HTMLSpanElement => ref !== null);

    if (activeCyanRefs.length > 0) {
      tl.to(activeCyanRefs, {
        opacity: 1,
        color: '#ffffff',
        webkitTextStroke: '1.8px #3edcc4',
        textShadow:
          '0 0 5px #ffffff, 0 0 14px #3edcc4, 0 0 28px #3edcc4, 0 0 55px rgba(62, 220, 196, 0.8), 0 0 85px rgba(62, 220, 196, 0.35)',
        duration: safeDuration(0.2),
        ease: safeEase('power2.out'),
      }, collectiveSurgeStart);
    }

    // Radial backdrop glow bloom behind all letters
    if (nameGlowRef.current) {
      tl.to(nameGlowRef.current, {
        opacity: 0.75,
        scale: 1.06,
        duration: safeDuration(0.2),
        ease: safeEase('power2.out'),
      }, collectiveSurgeStart);
    }

    // Settle back down together to the refined, dimmer steady state
    if (activeCyanRefs.length > 0) {
      tl.to(activeCyanRefs, {
        opacity: 1,
        color: '#e8fbf7',
        webkitTextStroke: '1.2px #3edcc4',
        textShadow:
          '0 0 2.5px #ffffff, 0 0 6px #3edcc4, 0 0 14px rgba(62, 220, 196, 0.55), 0 0 26px rgba(62, 220, 196, 0.28), 0 0 45px rgba(62, 220, 196, 0.12)',
        duration: safeDuration(0.35),
        ease: safeEase('power2.inOut'),
      }, collectiveSurgeStart + 0.2);
    }

    if (nameGlowRef.current) {
      tl.to(nameGlowRef.current, {
        opacity: 0.3,
        scale: 1.0,
        duration: safeDuration(0.35),
        ease: safeEase('power2.inOut'),
      }, collectiveSurgeStart + 0.2);
    }

    // Subtle continuous neon hum pulse while holding
    const humStart = collectiveSurgeStart + 0.55;
    if (nameGlowRef.current) {
      tl.to(nameGlowRef.current, {
        opacity: 0.18,
        duration: safeDuration(0.45),
        ease: safeEase('sine.inOut'),
        yoyo: true,
        repeat: 3,
      }, humStart);
    }

    cursor = humStart + 1.4;

    // ═══════════════════════════════════════════════════
    // ACT 5: TRANSITION OUT → HOME
    // ═══════════════════════════════════════════════════

    tl.to(containerRef.current, {
      scale: 0.94,
      opacity: 0,
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
          <div ref={neonAuraRef} className={styles.neonAura} />
          <span ref={neonTextRef} className={styles.neonText}>
            CREATOR?
          </span>
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
