'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Node Page Container
   Wraps the active planetary landing page with:
   - Fixed top bar containing node index and heading in Anton display font
   - "← BACK TO ORBIT" button and ESC key handler
   - Clean entrance animation
   ═══════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '@/styles/node-pages.module.css';

interface NodePageContainerProps {
  nodeIndex: number;
  nodeLabel: string;
  nodeDescription: string;
  onBack: () => void;
  children: React.ReactNode;
}

export default function NodePageContainer({
  nodeIndex,
  nodeLabel,
  nodeDescription,
  onBack,
  children,
}: NodePageContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: ESC to return to orbit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
    );

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }
  }, []);

  const formattedIndex = String(nodeIndex + 1).padStart(2, '0');

  return (
    <div ref={containerRef} className={styles.pageRoot} role="dialog" aria-modal="true">
      {/* ── Top Bar: Heading on Top ── */}
      <header className={styles.topBar}>
        <div className={styles.headingGroup}>
          <span className={styles.nodeIndexBadge}>{formattedIndex} // NODE</span>
          <h1 className={styles.nodePageHeading}>{nodeLabel}</h1>
        </div>

        <button
          onClick={onBack}
          className={styles.returnBtn}
          title="Return to planetary orbit (ESC)"
          aria-label="Back to orbit"
        >
          <span>← BACK TO ORBIT</span>
          <kbd className={styles.escKeyBadge}>ESC</kbd>
        </button>
      </header>

      {/* ── Page Content ── */}
      <main className={styles.contentContainer}>
        <div className={styles.pageSubtitleBanner}>
          <p className={styles.pageSubtitle}>{nodeDescription}</p>
          <span className={styles.pageTelemetry}>STATUS: TELEMETRY ACTIVE // SEC_0{nodeIndex + 1}</span>
        </div>

        <div ref={contentRef}>{children}</div>
      </main>
    </div>
  );
}
