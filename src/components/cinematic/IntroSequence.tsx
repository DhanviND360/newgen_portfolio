'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Intro Sequence
   Large display typography reveal: creator name + tagline.
   Structural shell — animation logic will be added later.
   Auto-advances immediately until animation is implemented.
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect } from 'react';
import styles from '@/styles/cinematic.module.css';
import typography from '@/styles/typography.module.css';
import { creator } from '@/data/portfolio';

interface IntroSequenceProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function IntroSequence({ isActive, onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-advance — no animation implemented yet
  useEffect(() => {
    if (!isActive) return;
    const timeout = setTimeout(() => onComplete(), 50);
    return () => clearTimeout(timeout);
  }, [isActive, onComplete]);

  return null;
}
