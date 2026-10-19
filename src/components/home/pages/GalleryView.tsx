'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Visual Memory Gallery
   Clean, beautiful photographic showcase of meetups, hackathons,
   and build sessions. Photos are the visual heroes.
   Modal opens immediately in front of the user via React Portal.
   ═══════════════════════════════════════════════════════════════ */

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/node-pages.module.css';
import { galleryItems, GalleryItem } from '@/data/portfolio';
import { playThock } from '@/systems/soundEffects';

const CATEGORIES = [
  'ALL',
  'TECH MEETS',
  'BUILD SESSIONS',
  'HACKATHONS',
  'AWARDS',
] as const;

type Category = (typeof CATEGORIES)[number];

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter items
  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'TECH MEETS') return item.category === 'Tech Meets';
    if (activeCategory === 'BUILD SESSIONS') return item.category === 'Build Sessions';
    if (activeCategory === 'HACKATHONS') return item.category === 'Hackathons';
    if (activeCategory === 'AWARDS') return item.category === 'Awards';
    return true;
  });

  // Lightbox carousel navigation
  const currentIndex = selectedItem
    ? filteredItems.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex <= 0) {
      setSelectedItem(filteredItems[filteredItems.length - 1]);
    } else {
      setSelectedItem(filteredItems[currentIndex - 1]);
    }
  }, [currentIndex, filteredItems]);

  const handleNext = useCallback(() => {
    if (currentIndex >= filteredItems.length - 1) {
      setSelectedItem(filteredItems[0]);
    } else {
      setSelectedItem(filteredItems[currentIndex + 1]);
    }
  }, [currentIndex, filteredItems]);

  // Keyboard navigation & lock background scroll
  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, handlePrev, handleNext]);

  return (
    <div className={styles.galleryArchiveRoot}>
      {/* ── Category Filter Bar ── */}
      <div className={styles.galleryFilterPills} role="tablist" aria-label="Gallery Categories">
        {CATEGORIES.map((cat) => {
          const count =
            cat === 'ALL'
              ? galleryItems.length
              : galleryItems.filter((item) => {
                  if (cat === 'TECH MEETS') return item.category === 'Tech Meets';
                  if (cat === 'BUILD SESSIONS') return item.category === 'Build Sessions';
                  if (cat === 'HACKATHONS') return item.category === 'Hackathons';
                  if (cat === 'AWARDS') return item.category === 'Awards';
                  return false;
                }).length;

          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat)}
              onMouseEnter={() => playThock('soft')}
              className={`${styles.galleryFilterBtn} ${
                isActive ? styles.galleryFilterBtnActive : ''
              }`}
            >
              <span>{cat}</span>
              <span className={styles.galleryFilterBadge}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── Clean Photo Grid ── */}
      <div className={styles.galleryGrid}>
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className={styles.galleryCard}
            onMouseEnter={() => playThock('crisp')}
            onClick={() => setSelectedItem(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedItem(item);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View photo: ${item.title}`}
          >
            <div className={styles.galleryImageWrapper}>
              <img
                src={item.image}
                alt={item.title}
                className={styles.galleryImage}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={styles.galleryCardInfo}>
              <h3 className={styles.galleryCardTitle}>{item.title}</h3>
              {item.note && (
                <p className={styles.galleryCardCaption}>{item.note}</p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* ── Lightbox Modal Rendered in Portal Directly on document.body ── */}
      {mounted &&
        selectedItem &&
        createPortal(
          <div
            className={styles.lightboxBackdrop}
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
          >
            <div
              className={styles.lightboxModal}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className={styles.lightboxCloseBtn}
                onClick={() => setSelectedItem(null)}
                aria-label="Close photo"
                title="Close (ESC)"
              >
                ✕
              </button>

              {/* Prev / Next Chevrons */}
              <button
                type="button"
                className={`${styles.lightboxNavBtn} ${styles.lightboxNavPrev}`}
                onClick={handlePrev}
                aria-label="Previous photo"
                title="Previous photo (Left arrow)"
              >
                ‹
              </button>

              <button
                type="button"
                className={`${styles.lightboxNavBtn} ${styles.lightboxNavNext}`}
                onClick={handleNext}
                aria-label="Next photo"
                title="Next photo (Right arrow)"
              >
                ›
              </button>

              {/* Main Photo Viewport */}
              <div className={styles.lightboxMainView}>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className={styles.lightboxLargeImage}
                />
              </div>

              {/* Clean Caption Bar */}
              <div className={styles.lightboxCaptionBar}>
                <div className={styles.lightboxCaptionText}>
                  <h2 className={styles.lightboxTitle}>{selectedItem.title}</h2>
                  {selectedItem.note && (
                    <p className={styles.lightboxNote}>{selectedItem.note}</p>
                  )}
                </div>
                <div className={styles.lightboxCounter}>
                  {currentIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
