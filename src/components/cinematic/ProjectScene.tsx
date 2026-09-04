'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Project Scene
   
   Reusable cinematic project card driven by data.
   Layout: LEFT (visual) + RIGHT (info)
   
   All animation is controlled externally via forwarded refs.
   This component is purely structural — it provides DOM targets
   for the ProjectSequence timeline to animate.
   ═══════════════════════════════════════════════════════════════ */

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import type { Project } from '@/data/portfolio';
import styles from '@/styles/projects.module.css';
import typography from '@/styles/typography.module.css';

export interface ProjectSceneRefs {
  root: HTMLDivElement | null;
  visual: HTMLDivElement | null;
  number: HTMLDivElement | null;
  title: HTMLDivElement | null;
  subtitle: HTMLDivElement | null;
  description: HTMLParagraphElement | null;
  impactItems: HTMLLIElement[];
  tagContainer: HTMLDivElement | null;
  divider: HTMLDivElement | null;
}

interface ProjectSceneProps {
  project: Project;
  index: number;
  total: number;
}

const ProjectScene = forwardRef<ProjectSceneRefs, ProjectSceneProps>(
  function ProjectScene({ project, index, total }, ref) {
    const rootRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const impactRefs = useRef<HTMLLIElement[]>([]);
    const tagContainerRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      root: rootRef.current,
      visual: visualRef.current,
      number: numberRef.current,
      title: titleRef.current,
      subtitle: subtitleRef.current,
      description: descriptionRef.current,
      impactItems: impactRefs.current,
      tagContainer: tagContainerRef.current,
      divider: dividerRef.current,
    }));

    // Format project number: 01, 02, 03...
    const projectNumber = String(index + 1).padStart(2, '0');

    return (
      <div
        ref={rootRef}
        className={styles.sceneRoot}
        aria-label={`Project ${projectNumber}: ${project.title}`}
      >
        {/* LEFT — Project Visual */}
        <div ref={visualRef} className={styles.sceneVisual}>
          <div className={styles.visualFrame}>
            {/* Visual showcase: 3 vertical image tiles if provided, otherwise geometric grid */}
            <div className={styles.visualInner}>
              {project.images && project.images.length > 0 ? (
                <div className={styles.verticalTilesContainer}>
                  {project.images.slice(0, 3).map((imgSrc, i) => (
                    <div
                      key={i}
                      className={styles.verticalTile}
                      onClick={() => setActiveImage(imgSrc)}
                      title="Click to expand view"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveImage(imgSrc);
                        }
                      }}
                    >
                      <div className={styles.tileImageWrapper}>
                        <img
                          src={imgSrc}
                          alt={`${project.title} screenshot 0${i + 1}`}
                          className={styles.tileImage}
                          style={{
                            objectPosition:
                              i === 0 ? 'left center' : i === 1 ? 'center 15%' : 'left top',
                          }}
                        />
                        <div className={styles.tileGlowOverlay} />
                        <div className={styles.tileScanline} />
                      </div>
                      <div className={styles.tileBadge}>
                        <span className={styles.tileBadgeText}>
                          {project.tileLabels?.[i] || `0${i + 1}`}
                        </span>
                        <span className={styles.tileBadgeDot} />
                      </div>
                      <div className={styles.tileCornerTL} />
                      <div className={styles.tileCornerBR} />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className={styles.visualGrid}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={styles.visualCell}
                        style={{
                          opacity: 0.04 + (i * 0.03),
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className={styles.visualLabel}>
                    <span className={typography.mono}>{projectNumber}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Lightbox Preview Modal */}
        {activeImage && (
          <div
            className={styles.lightboxOverlay}
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className={styles.lightboxContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.lightboxClose}
                onClick={() => setActiveImage(null)}
                aria-label="Close preview"
              >
                ✕
              </button>
              <img
                src={activeImage}
                alt="Expanded project screenshot"
                className={styles.lightboxImg}
              />
            </div>
          </div>
        )}

        {/* RIGHT — Project Information */}
        <div className={styles.sceneInfo}>
          {/* Project number */}
          <div ref={numberRef} className={styles.sceneNumber}>
            <span className={typography.mono}>{projectNumber}</span>
            <span className={styles.sceneNumberSeparator}>/</span>
            <span className={typography.mono}>
              {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h2 ref={titleRef} className={styles.sceneTitle}>
            {project.title}
          </h2>

          {/* Subtitle */}
          <div ref={subtitleRef} className={styles.sceneSubtitle}>
            {project.subtitle}
          </div>

          {/* Divider */}
          <div ref={dividerRef} className={styles.sceneDivider} />

          {/* Description */}
          <p ref={descriptionRef} className={styles.sceneDescription}>
            {project.description}
          </p>

          {/* Impact points */}
          <ul className={styles.sceneImpact}>
            {project.impact.map((point, i) => (
              <li
                key={i}
                ref={(el) => {
                  if (el) impactRefs.current[i] = el;
                }}
                className={styles.sceneImpactItem}
              >
                <span className={styles.sceneImpactMarker} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div ref={tagContainerRef} className={styles.sceneTags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.sceneTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ProjectScene;
