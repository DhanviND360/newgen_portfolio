'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — InitializingSequence Component
   TRON: Legacy Identity Disc Loading & System Initiation Sequence
   - Concentric dual-neon cyan tube rings
   - Outward radiating energy shockwaves / sonar wave ripples
   - Cyber pixel font typography saying "INITIALISING..."
   - Automatic 4-second cinematic progression into BOOT sequence
   ═══════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from '@/styles/initializing.module.css';

interface InitializingSequenceProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function InitializingSequence({
  isActive,
  onComplete,
}: InitializingSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const warningsRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState('');

  // Animated cycling dots for pixel font
  useEffect(() => {
    if (!isActive) return;
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 450);
    return () => clearInterval(dotInterval);
  }, [isActive]);

  // Master GSAP Timeline (~4 seconds duration)
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Set initial states
      gsap.set(containerRef.current, { opacity: 1, visibility: 'visible' });
      gsap.set(diskRef.current, { scale: 0.6, opacity: 0, rotation: -45 });
      gsap.set(textRef.current, { opacity: 0, y: 15 });
      gsap.set(auraRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(warningsRef.current, { opacity: 1, y: 0 });

      // ── Step 1: High-voltage Power Ignition (0.0s - 0.4s) ──
      tl.to(
        auraRef.current,
        {
          opacity: 0.9,
          scale: 1.1,
          duration: 0.35,
          ease: 'power4.out',
        },
        0.1
      )
        .to(
          diskRef.current,
          {
            opacity: 1,
            scale: 1.08,
            rotation: 0,
            duration: 0.45,
            ease: 'back.out(2)',
          },
          0.1
        )
        .to(
          diskRef.current,
          {
            scale: 1.0,
            duration: 0.3,
            ease: 'power2.out',
          },
          0.55
        );

      // ── Step 2: Pixel Text Appearance (0.5s) ──
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.5
      );

      // ── Step 3: Sustained High-Voltage Rotation & Vibration (0.8s - 3.6s) ──
      tl.to(
        diskRef.current,
        {
          rotation: 360,
          duration: 3.2,
          ease: 'none',
        },
        0.55
      );

      // ── Step 4: Overdrive Surge & Cinematic Discharge Exit (3.6s - 4.2s) ──
      tl.to(
        diskRef.current,
        {
          scale: 1.15,
          filter: 'brightness(1.6) drop-shadow(0 0 40px #00f0ff)',
          duration: 0.3,
          ease: 'power2.in',
        },
        3.6
      )
        .to(
          auraRef.current,
          {
            scale: 1.5,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.in',
          },
          3.6
        )
        .to(
          textRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.25,
            ease: 'power2.in',
          },
          3.75
        )
        .to(
          warningsRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.25,
            ease: 'power2.in',
          },
          3.75
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            scale: 1.25,
            filter: 'blur(12px)',
            duration: 0.4,
            ease: 'power3.inOut',
          },
          3.85
        );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className={styles.initRoot}
      id="initializing-sequence"
      role="region"
      aria-label="System Initializing"
    >
      {/* Volumetric background cyan radiance */}
      <div ref={auraRef} className={styles.ambientAura} />

      {/* TRON: Legacy Identity Disc Structure */}
      <div ref={diskRef} className={styles.diskWrapper}>
        {/* Outward Radiating Energy Shockwaves */}
        <div className={styles.pulseContainer}>
          <div className={styles.pulseWave} />
          <div className={styles.pulseWave} />
          <div className={styles.pulseWave} />
          <div className={styles.pulseWave} />
        </div>

        {/* Outer High-Voltage Neon Tube Ring */}
        <div className={styles.ringOuter} />

        {/* Mid Segmented Circuit Guide */}
        <div className={styles.ringTrack} />

        {/* Inner Brilliant Neon Core Ring */}
        <div className={styles.ringInner} />

        {/* Central Black Void */}
        <div className={styles.centerVoid} />
      </div>

      {/* Cyber Pixel Font Typography */}
      <div ref={textRef} className={styles.textWrapper}>
        <p className={styles.pixelText}>
          INITIALISING<span className={styles.pixelDots}>{dots}</span>
          <span className={styles.pixelCursor}>_</span>
        </p>
      </div>

      {/* High-Visibility Badges: SOUND ON & EPILEPSY WARNING */}
      <div ref={warningsRef} className={styles.warningCluster}>
        {/* SOUND ON Badge */}
        <div className={styles.soundBadge} role="status" aria-label="Sound enabled">
          <span className={styles.soundBadgeIcon} aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </span>
          <span>SOUND ON</span>
        </div>

        {/* EPILEPSY WARNING Badge */}
        <div className={styles.epilepsyBadge} role="alert" aria-label="Epilepsy warning: flashing lights">
          <span className={styles.epilepsyBadgeIcon} aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </span>
          <span>EPILEPSY WARNING</span>
        </div>
      </div>
    </div>
  );
}
