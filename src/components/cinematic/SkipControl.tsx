'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — SkipControl
   Pixel/terminal-style skip button in the top-right corner.
   Visible only during cinematic phases, hidden at HOME.
   ═══════════════════════════════════════════════════════════════ */

import styles from '@/styles/cinematic.module.css';

interface SkipControlProps {
  onSkip: () => void;
  visible: boolean;
}

export default function SkipControl({ onSkip, visible }: SkipControlProps) {
  if (!visible) return null;

  return (
    <button
      id="skip-control"
      className={styles.skipControl}
      onClick={onSkip}
      aria-label="Skip cinematic sequence"
      type="button"
    >
      <span className={styles.skipLabel}>Skip</span>
      <span className={styles.skipKey}>ESC</span>
    </button>
  );
}
