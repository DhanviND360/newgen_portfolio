'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Hobby Page View
   Multidimensional pursuits beyond the code:
   Analog sound synthesis, astrophotography, hardware hacking, sci-fi worldbuilding.
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import styles from '@/styles/node-pages.module.css';
import { hobbyItems } from '@/data/portfolio';

export default function HobbyView() {
  return (
    <div className={styles.hobbyGrid}>
      {hobbyItems.map((hobby) => (
        <article
          key={hobby.id}
          className={styles.hobbyCard}
          style={
            {
              borderLeft: `3px solid ${hobby.accentColor}`,
            } as React.CSSProperties
          }
        >
          <span
            className={styles.hobbyTag}
            style={{ color: hobby.accentColor, borderColor: hobby.accentColor }}
          >
            {hobby.tag} // {hobby.category}
          </span>

          <div>
            <h2 className={styles.hobbyTitle}>{hobby.title}</h2>
            <p className={styles.hobbySubtitle} style={{ marginTop: '4px' }}>
              {hobby.subtitle}
            </p>
          </div>

          <p className={styles.hobbyDesc}>{hobby.description}</p>

          <ul className={styles.hobbyHighlights}>
            {hobby.highlights.map((highlight, idx) => (
              <li key={idx} className={styles.hobbyHighlightItem}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: hobby.accentColor,
                    marginTop: '6px',
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${hobby.accentColor}`,
                  }}
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
