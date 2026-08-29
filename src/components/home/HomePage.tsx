'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — HomePage
   Final interactive homepage — displayed after cinematic sequence.
   Central DHANVI name with letter-attached node navigation
   and interactive portrait reveal.
   ═══════════════════════════════════════════════════════════════ */

import styles from '@/styles/home.module.css';
import DhanviNameReveal from './DhanviNameReveal';

export default function HomePage() {
  return (
    <main className={styles.homeRoot} id="home">
      {/* Interactive DHANVI name + node reveal system */}
      <DhanviNameReveal />
    </main>
  );
}
