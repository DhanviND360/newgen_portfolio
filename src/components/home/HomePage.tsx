'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — HomePage
   Final interactive homepage — displayed after cinematic sequence.
   Central DHANVI name with letter-attached node navigation
   and interactive portrait reveal.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import styles from '@/styles/home.module.css';
import DhanviNameReveal from './DhanviNameReveal';
import TechStream from './TechStream';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className={styles.homeRoot} id="home">
      {/* Ambient vertical tech streams on left (upward) and right (downward) */}
      <TechStream side="left" />
      <TechStream side="right" />

      {/* Interactive DHANVI name + node reveal system */}
      <DhanviNameReveal />
    </main>
  );
}
