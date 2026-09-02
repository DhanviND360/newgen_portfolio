'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Achievements Page View
   High-impact metric statements & competitive milestones.
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import styles from '@/styles/node-pages.module.css';
import { achievements } from '@/data/portfolio';

export default function AchievementsView() {
  return (
    <div className={styles.achieveGrid}>
      {achievements.map((achieve) => (
        <article key={achieve.id} className={styles.achieveCard}>
          <div className={styles.achieveInfo}>
            <h2 className={styles.achieveTitle}>{achieve.title}</h2>
            <p className={styles.achieveEvent}>{achieve.event}</p>
            {achieve.statement && (
              <p className={styles.achieveStatement}>{achieve.statement}</p>
            )}
          </div>

          <div className={styles.achieveMetricSide}>
            <span className={styles.achieveResult}>{achieve.result}</span>
            <span className={styles.achieveYear}>{achieve.year}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
