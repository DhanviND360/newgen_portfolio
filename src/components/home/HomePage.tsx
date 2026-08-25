'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — HomePage
   Final interactive homepage — displayed after cinematic sequence.
   Central creator identity (sun) with orbital node navigation.
   ═══════════════════════════════════════════════════════════════ */

import styles from '@/styles/home.module.css';
import { creator } from '@/data/portfolio';
import NodeNavigation from './NodeNavigation';

export default function HomePage() {
  return (
    <main className={styles.homeRoot} id="home">
      {/* Central creator identity — the "sun" */}
      <div className={styles.homeIdentity}>
        <div className={styles.sunGlow} />
        <h1 className={styles.homeName}>{creator.name}</h1>
        <p className={styles.homeTagline}>{creator.tagline}</p>
      </div>

      {/* Orbital node navigation — planets revolving around the sun */}
      <NodeNavigation />
    </main>
  );
}
