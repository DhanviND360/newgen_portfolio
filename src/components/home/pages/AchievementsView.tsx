'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Achievements Page View
   High-impact metric statements, competitive milestones & proof assets.
   ═══════════════════════════════════════════════════════════════ */

import React, { useState, useEffect } from 'react';
import styles from '@/styles/node-pages.module.css';
import { achievements } from '@/data/portfolio';

export default function AchievementsView() {
  const [activeImage, setActiveImage] = useState<{ src: string; caption?: string } | null>(null);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeImage) {
        e.stopPropagation();
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  return (
    <div className={styles.achieveGrid}>
      {achievements.map((achieve) => (
        <article key={achieve.id} className={styles.achieveCard}>
          <div className={styles.achieveCardHeader}>
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
          </div>

          {/* Interactive Image Showcase Tiles */}
          {achieve.images && achieve.images.length > 0 && (
            <div className={styles.achieveGallery}>
              {achieve.images.map((imgSrc, idx) => {
                const label = achieve.tileLabels?.[idx] || `0${idx + 1}`;
                return (
                  <div
                    key={idx}
                    className={styles.achieveTile}
                    onClick={() =>
                      setActiveImage({
                        src: imgSrc,
                        caption: `${achieve.title} — ${label}`,
                      })
                    }
                    title={`${label} — Click to expand`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveImage({
                          src: imgSrc,
                          caption: `${achieve.title} — ${label}`,
                        });
                      }
                    }}
                  >
                    <div className={styles.achieveTileImgWrapper}>
                      <img
                        src={imgSrc}
                        alt={`${achieve.title} proof asset 0${idx + 1}`}
                        className={styles.achieveTileImg}
                        style={{
                          objectPosition: achieve.imagePositions?.[idx] || 'center center',
                        }}
                      />
                      <div className={styles.achieveTileGlow} />
                      <div className={styles.achieveTileScanline} />
                    </div>

                    <div className={styles.achieveTileBadge}>
                      <span className={styles.achieveTileBadgeText}>{label}</span>
                      <span className={styles.achieveTileBadgeDot} />
                    </div>

                    <div className={styles.achieveTileCornerTL} />
                    <div className={styles.achieveTileCornerBR} />
                  </div>
                );
              })}
            </div>
          )}
        </article>
      ))}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className={styles.achieveLightboxOverlay}
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.achieveLightboxContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.achieveLightboxClose}
              onClick={() => setActiveImage(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.caption || 'Enlarged achievement proof'}
              className={styles.achieveLightboxImg}
            />
            {activeImage.caption && (
              <div className={styles.achieveLightboxCaption}>
                {activeImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
