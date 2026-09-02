'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Gallery Page View
   Visual archive of generative art, spatial experiments & interfaces.
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import styles from '@/styles/node-pages.module.css';
import { galleryItems } from '@/data/portfolio';

export default function GalleryView() {
  return (
    <div className={styles.galleryGrid}>
      {galleryItems.map((item) => (
        <article key={item.id} className={styles.galleryCard}>
          {/* Visual gradient backdrop simulating rendering canvas */}
          <div
            className={styles.galleryPreview}
            style={{ background: item.gradient }}
          >
            {/* Holographic grid lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                opacity: 0.5,
              }}
            />

            {item.metrics && (
              <span className={styles.galleryPreviewMeta}>{item.metrics}</span>
            )}
          </div>

          <div className={styles.galleryBody}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-accent-cyan)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {item.category} // {item.year}
            </span>

            <h2 className={styles.galleryTitle}>{item.title}</h2>
            <p className={styles.galleryDesc}>{item.description}</p>

            <div className={styles.projectTags} style={{ marginTop: '8px' }}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.projectTag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
