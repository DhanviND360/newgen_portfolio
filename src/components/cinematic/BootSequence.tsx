'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Boot Sequence
   
   Cinematic text-driven opening sequence.
   Time-based GSAP master timeline — no scroll, no input required.
   
   Sequence:
   1. Character-by-character sentence reveal
   2. Hold → fade out
   3. "BUT WHY?" — bold red, abrupt
   4. Remove
   5. "SEE" → "FOR" → "YOURSELF" — deliberate intervals
   6. Transition out → advance to next phase
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import styles from '@/styles/cinematic.module.css';
import {
  createPhaseTimeline,
  safeDuration,
  safeEase,
  EASE,
  DURATION,
  prefersReducedMotion,
} from '@/systems/animationUtils';

interface BootSequenceProps {
  isActive: boolean;
  onComplete: () => void;
}

// The opening statement — split into lines for layout
const SENTENCE_LINES = [
  "IN A FEW MINUTES,",
  "YOU'RE GOING TO BE CONTACTING",
  "THE DEVELOPER OF THIS PORTFOLIO.",
];

const FULL_SENTENCE = SENTENCE_LINES.join('\n');

export default function BootSequence({ isActive, onComplete }: BootSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentenceRef = useRef<HTMLDivElement>(null);
  const butWhyRef = useRef<HTMLDivElement>(null);
  const seeRef = useRef<HTMLDivElement>(null);
  const forRef = useRef<HTMLDivElement>(null);
  const yourselfRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Build and play the master timeline
  const buildTimeline = useCallback(() => {
    if (!containerRef.current || !sentenceRef.current) return null;

    const tl = createPhaseTimeline({
      onComplete: () => {
        onComplete();
      },
    });

    const sentence = sentenceRef.current;
    const butWhy = butWhyRef.current;
    const seeEl = seeRef.current;
    const forEl = forRef.current;
    const yourselfEl = yourselfRef.current;

    if (!butWhy || !seeEl || !forEl || !yourselfEl) return null;

    // ── Reduced motion: show everything instantly, then advance
    if (prefersReducedMotion()) {
      tl.set(sentence, { opacity: 1 });
      tl.set(sentence.querySelectorAll(`.${styles.bootChar}`), { opacity: 1 });
      tl.to({}, { duration: 2 }); // brief hold
      tl.call(() => onComplete());
      return tl;
    }

    // Get all character spans inside the sentence container
    const charSpans = sentence.querySelectorAll(`.${styles.bootChar}`);

    // ═══ ACT 1: Character-by-character sentence reveal ═══
    
    // Initial state
    tl.set(sentence, { opacity: 1 });

    // Reveal each character sequentially
    const charRevealDuration = 0.03; // seconds per character
    charSpans.forEach((char, i) => {
      tl.to(
        char,
        {
          opacity: 1,
          duration: 0.01,
          ease: 'none',
        },
        0.8 + i * charRevealDuration // start after 0.8s initial darkness
      );
    });

    // Calculate when sentence is fully revealed
    const sentenceCompleteTime = 0.8 + charSpans.length * charRevealDuration;

    // ═══ HOLD: Let the sentence breathe ═══
    const holdEnd = sentenceCompleteTime + 2.0;

    // ═══ ACT 2: Remove sentence — cinematic fade with subtle blur ═══
    tl.to(
      sentence,
      {
        opacity: 0,
        filter: 'blur(6px)',
        duration: safeDuration(DURATION.slow),
        ease: safeEase(EASE.dramatic),
      },
      holdEnd
    );

    const sentenceGoneTime = holdEnd + DURATION.slow;

    // ═══ ACT 3: "BUT WHY?" — bold red, abrupt, impactful ═══
    const butWhyIn = sentenceGoneTime + 0.5;

    tl.fromTo(
      butWhy,
      {
        opacity: 0,
        scale: 0.92,
      },
      {
        opacity: 1,
        scale: 1,
        duration: safeDuration(0.15),
        ease: safeEase('power4.out'),
      },
      butWhyIn
    );

    // Hold "BUT WHY?"
    const butWhyHoldEnd = butWhyIn + 1.8;

    // Remove "BUT WHY?"
    tl.to(
      butWhy,
      {
        opacity: 0,
        duration: safeDuration(DURATION.fast),
        ease: safeEase(EASE.snappy),
      },
      butWhyHoldEnd
    );

    const butWhyGoneTime = butWhyHoldEnd + DURATION.fast;

    // ═══ ACT 4: "SEE" → "FOR" → "YOURSELF" — deliberate intervals ═══
    const wordInterval = 0.7;
    const wordDuration = 0.25;
    const wordsStartTime = butWhyGoneTime + 0.6;

    // "SEE"
    tl.fromTo(
      seeEl,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: safeDuration(wordDuration),
        ease: safeEase(EASE.cinematic),
      },
      wordsStartTime
    );

    // "FOR"
    tl.fromTo(
      forEl,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: safeDuration(wordDuration),
        ease: safeEase(EASE.cinematic),
      },
      wordsStartTime + wordInterval
    );

    // "YOURSELF"
    tl.fromTo(
      yourselfEl,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: safeDuration(wordDuration),
        ease: safeEase(EASE.cinematic),
      },
      wordsStartTime + wordInterval * 2
    );

    // Hold the three words
    const wordsHoldEnd = wordsStartTime + wordInterval * 2 + wordDuration + 1.5;

    // Fade out all three words together
    tl.to(
      [seeEl, forEl, yourselfEl],
      {
        opacity: 0,
        filter: 'blur(4px)',
        duration: safeDuration(DURATION.slow),
        ease: safeEase(EASE.dramatic),
      },
      wordsHoldEnd
    );

    // Brief darkness before advancing
    tl.to({}, { duration: 0.4 });

    return tl;
  }, [onComplete]);

  // Play when active
  useEffect(() => {
    if (!isActive) {
      // Kill timeline when not active (e.g. after skip)
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
    }, 50);

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

  // Split sentence into characters, preserving line breaks
  const renderSentenceChars = () => {
    return SENTENCE_LINES.map((line, lineIndex) => (
      <div key={lineIndex} className={styles.bootSentenceLine}>
        {line.split('').map((char, charIndex) => (
          <span
            key={`${lineIndex}-${charIndex}`}
            className={styles.bootChar}
            style={{ opacity: 0 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.phaseContainer} ${styles.bootScreen} ${
        isActive ? styles.phaseActive : ''
      }`}
      aria-hidden={!isActive}
    >
      {/* ACT 1: Opening sentence — character by character */}
      <div
        ref={sentenceRef}
        className={styles.bootSentence}
        style={{ opacity: 0 }}
      >
        {renderSentenceChars()}
      </div>

      {/* ACT 2: "BUT WHY?" — red, abrupt */}
      <div
        ref={butWhyRef}
        className={styles.bootButWhy}
        style={{ opacity: 0 }}
      >
        BUT WHY?
      </div>

      {/* ACT 3: "SEE / FOR / YOURSELF" — staggered */}
      <div className={styles.bootTripleWords}>
        <div
          ref={seeRef}
          className={styles.bootTripleWord}
          style={{ opacity: 0 }}
        >
          SEE
        </div>
        <div
          ref={forRef}
          className={styles.bootTripleWord}
          style={{ opacity: 0 }}
        >
          FOR
        </div>
        <div
          ref={yourselfRef}
          className={styles.bootTripleWord}
          style={{ opacity: 0 }}
        >
          YOURSELF
        </div>
      </div>
    </div>
  );
}
