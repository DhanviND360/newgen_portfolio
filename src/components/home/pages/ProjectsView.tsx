'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Projects View
   Designer-Grade Dossier Folders + Balanced 2x2 Showcase Layout.

   FOLDER CARDS FANNING:
   - Left card: tilts slightly left, peeks left
   - Center card: hero preview, stands upright in center, peeking upward
   - Right card: tilts slightly right, peeks right
   - Hover: smoothly pops upward with GSAP lift & cyan glow
   ═══════════════════════════════════════════════════════════════ */

import React, {
  useState, useEffect, useRef, useCallback, useMemo,
} from 'react';
import gsap from 'gsap';
import { projects as rawProjects, type Project } from '@/data/portfolio';
import styles from '@/styles/projects-folder.module.css';

/* ─── DATA ENRICHMENT ─────────────────────────────────────────── */
interface RichProject extends Project {
  folderName: string;
  category:   string;
  index:      string;
  tagline:    string;
  problem:    string;
  solution:   string;
  liveUrl?:   string;
  githubUrl?: string;
}

function enrich(p: Project, i: number): RichProject {
  const indexStr = String(i + 1).padStart(2, '0');
  switch (p.id) {
    case 'sih-bro': return {
      ...p,
      index:      indexStr,
      folderName: 'SIH BRO',
      category:   'AI COPILOT',
      tagline:    'Deterministic Problem Statement Ranking Engine',
      problem:    'Teams competing in SIH waste hours filtering hundreds of mismatched problem statements, often picking challenges outside their domain and failing early.',
      solution:   'A deterministic ranking engine that ingests team skill-matrices and challenge complexity scores, scoring every problem statement from best-fit to worst — with session persistence so the whole team stays aligned.',
      liveUrl:    p.link ?? 'https://sih-bro.vercel.app',
      githubUrl:  p.github,
    };
    case 'razorpace-ai': return {
      ...p,
      index:      indexStr,
      folderName: 'RAZORPACE AI',
      category:   'AGENTIC COMMERCE',
      tagline:    'Autonomous Financial Rails & Merchant Growth',
      problem:    'Autonomous AI buyers in e-commerce have zero financial guardrails — risking runaway negotiations, policy violations, and un-audited payments at scale.',
      solution:   'Multi-agent LangGraph pipeline with deterministic financial rails: agents discover, negotiate, and purchase inside hard constraint envelopes, with every Razorpay transaction fully auditable.',
      liveUrl:    p.link,
      githubUrl:  p.github,
    };
    case 'hemoconnect': return {
      ...p,
      index:      indexStr,
      folderName: 'HEMOCONNECT',
      category:   'MEDTECH & WEB3',
      tagline:    'AI Thalassemia Diagnostic Care & Blood Custody',
      problem:    'Thalassemia patients juggle transfusion schedules, manual CBC report interpretation, and emergency donor sourcing across fragmented paper-based systems.',
      solution:   'Tesseract OCR + ML extracts diagnostic insights from blood reports, geolocation-driven AI matchmaker connects patients with compatible donors, Polygon blockchain tracks blood-order custody end-to-end.',
      liveUrl:    p.link,
      githubUrl:  p.github,
    };
    case 'ynotme': return {
      ...p,
      index:      indexStr,
      folderName: 'YNOTME',
      category:   'VOICE INTELLIGENCE',
      tagline:    'Real-Time Conversational AI & Knowledge Graph',
      problem:    'Communication coaching tools only offer retrospective feedback after sessions end, missing the critical window for live, in-the-moment guidance.',
      solution:   'An 8-second rolling audio pipeline feeds Sarvam AI for live transcription and reasoning while a Neo4j knowledge graph accumulates context across sessions — surfacing prompts without interrupting the speaker.',
      liveUrl:    p.link,
      githubUrl:  p.github,
    };
    default: return {
      ...p,
      index:      indexStr,
      folderName: p.title.toUpperCase(),
      category:   'SYSTEM ARCHITECTURE',
      tagline:    p.subtitle,
      problem:    p.description,
      solution:   'Advanced engineering solution.',
      liveUrl:    p.link,
      githubUrl:  p.github,
    };
  }
}

const PROJECTS: RichProject[] = rawProjects.map((p, i) => enrich(p, i));

/* ─── FOLDER COMPONENT ────────────────────────────────────────── */
interface FolderProps {
  project:    RichProject;
  mountDelay: number;
  onClick:    (p: RichProject) => void;
}

function Folder({ project, mountDelay, onClick }: FolderProps) {
  const rootRef     = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);
  const shadowRef   = useRef<HTMLDivElement>(null);
  const c1Ref       = useRef<HTMLDivElement>(null); // Left
  const c2Ref       = useRef<HTMLDivElement>(null); // Center (Hero)
  const c3Ref       = useRef<HTMLDivElement>(null); // Right
  const accentRef   = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLHeadingElement>(null);
  const exploreRef  = useRef<HTMLDivElement>(null);
  const hoverTl     = useRef<gsap.core.Timeline | null>(null);

  const imgs = useMemo(() => {
    const a = project.images ?? [];
    return [a[0] ?? '', a[1] ?? a[0] ?? '', a[2] ?? a[0] ?? ''];
  }, [project.images]);

  /* Centered, balanced resting & hover positions:
     c1 peeks Left, c2 peeks Center & Upward, c3 peeks Right */
  const REST = {
    c1: { rotate: -5, x: -24, y: 0 },
    c2: { rotate: 0,  x: 0,   y: -8 },
    c3: { rotate: 5,  x: 24,  y: 0 },
  };

  const HOV = {
    c1: { rotate: -7.5, x: -30, y: -24 },
    c2: { rotate: 0,    x: 0,   y: -36 }, // pops upward
    c3: { rotate: 7.5,  x: 30,  y: -24 },
  };

  /* Entrance animation */
  useEffect(() => {
    if (!rootRef.current) return;
    gsap.set(c2Ref.current, { ...REST.c2, filter: 'brightness(1)' });
    gsap.set(c1Ref.current, { ...REST.c1, filter: 'brightness(0.8)' });
    gsap.set(c3Ref.current, { ...REST.c3, filter: 'brightness(0.8)' });

    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 36, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: mountDelay,
        ease: 'power3.out',
        clearProps: 'scale',
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountDelay]);

  const onEnter = useCallback(() => {
    hoverTl.current?.kill();
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.44 } });
    hoverTl.current = tl;

    tl.to(assemblyRef.current, { y: -12 }, 0);
    tl.to(c2Ref.current, {
      ...HOV.c2,
      filter: 'brightness(1.08)',
      boxShadow: '0 24px 44px rgba(0,0,0,0.85), 0 0 20px rgba(62,220,196,0.22)',
    }, 0);
    tl.to(c1Ref.current, {
      ...HOV.c1,
      filter: 'brightness(0.94)',
      boxShadow: '0 18px 36px rgba(0,0,0,0.8)',
    }, 0.03);
    tl.to(c3Ref.current, {
      ...HOV.c3,
      filter: 'brightness(0.94)',
      boxShadow: '0 18px 36px rgba(0,0,0,0.8)',
    }, 0.03);

    tl.to(shadowRef.current, { scaleX: 1.12, opacity: 0.95, y: 5, duration: 0.5 }, 0);
    tl.to(accentRef.current, {
      width: 28,
      boxShadow: '0 0 12px rgba(62,220,196,1), 0 0 22px rgba(62,220,196,0.5)',
      duration: 0.35,
    }, 0);
    tl.to(nameRef.current, { color: '#ffffff', duration: 0.3 }, 0);
    tl.to(exploreRef.current, { color: '#3edcc4', x: 3, duration: 0.3 }, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLeave = useCallback(() => {
    hoverTl.current?.kill();
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut', duration: 0.46 } });
    hoverTl.current = tl;

    tl.to(assemblyRef.current, { y: 0 }, 0);
    tl.to(c2Ref.current, {
      ...REST.c2,
      filter: 'brightness(1)',
      boxShadow: '0 12px 28px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.2)',
    }, 0);
    tl.to(c1Ref.current, {
      ...REST.c1,
      filter: 'brightness(0.8)',
      boxShadow: '0 10px 24px rgba(0,0,0,0.7)',
    }, 0.03);
    tl.to(c3Ref.current, {
      ...REST.c3,
      filter: 'brightness(0.8)',
      boxShadow: '0 10px 24px rgba(0,0,0,0.7)',
    }, 0.03);

    tl.to(shadowRef.current, { scaleX: 1, opacity: 0.75, y: 0, duration: 0.5 }, 0);
    tl.to(accentRef.current, {
      width: 20,
      boxShadow: '0 0 10px rgba(62,220,196,0.7), 0 0 20px rgba(62,220,196,0.3)',
      duration: 0.35,
    }, 0);
    tl.to(nameRef.current, { color: '#e2e6f0', duration: 0.3 }, 0);
    tl.to(exploreRef.current, { color: '#7a849b', x: 0, duration: 0.3 }, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => { hoverTl.current?.kill(); }, []);

  const tileLabels = project.tileLabels ?? [];

  return (
    <div
      ref={rootRef}
      className={styles.folder}
      style={{ opacity: 0 }}
      role="button"
      tabIndex={0}
      aria-label={`Open project dossier: ${project.folderName}`}
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* Floor ambient occlusion shadow */}
      <div ref={shadowRef} className={styles.shadow} aria-hidden />

      {/* Assembly: lifted on hover */}
      <div ref={assemblyRef} className={styles.assembly}>
        {/* ── Back Plate (Dossier pocket back wall) ── */}
        <div className={styles.back} aria-hidden>
          <div className={styles.backTab}>
            <span className={styles.backTabLabel}>DOSSIER // {project.index}</span>
          </div>
          <div className={styles.backGlow} />
        </div>

        {/* ── Cards Stack (Stacked fanning: Left, Center, Right) ── */}
        <div className={styles.cards} aria-hidden>
          {/* Card 1 (peeks Left) */}
          <div ref={c1Ref} className={`${styles.card} ${styles.cLeft}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDots}>
                <span /><span /><span />
              </div>
              <span className={styles.cardLabel}>{tileLabels[1] ?? '02 // WORKFLOW'}</span>
            </div>
            <div className={styles.cardImgWrap}>
              {imgs[1] && <img src={imgs[1]} alt="" loading="lazy" />}
              <div className={styles.cardGlass} />
            </div>
          </div>

          {/* Card 3 (peeks Right) */}
          <div ref={c3Ref} className={`${styles.card} ${styles.cRight}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDots}>
                <span /><span /><span />
              </div>
              <span className={styles.cardLabel}>{tileLabels[2] ?? '03 // ARCHITECTURE'}</span>
            </div>
            <div className={styles.cardImgWrap}>
              {imgs[2] && <img src={imgs[2]} alt="" loading="lazy" />}
              <div className={styles.cardGlass} />
            </div>
          </div>

          {/* Card 2 (Hero: peeks Center & pops Upward, in front) */}
          <div ref={c2Ref} className={`${styles.card} ${styles.cCenter}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDots}>
                <span /><span /><span />
              </div>
              <span className={styles.cardLabel}>{tileLabels[0] ?? '01 // UI VIEWPORT'}</span>
            </div>
            <div className={styles.cardImgWrap}>
              {imgs[0] && <img src={imgs[0]} alt="" loading="lazy" />}
              <div className={styles.cardGlass} />
            </div>
          </div>
        </div>

        {/* ── Front Flap (Tactile pocket with metadata) ── */}
        <div className={styles.front} aria-hidden>
          <div className={styles.frontBevel} />
          <div ref={accentRef} className={styles.accent} />

          {/* Flap top row: Category pill + Year */}
          <div className={styles.flapTopRow}>
            <div className={styles.categoryBadge}>
              <span className={styles.categoryPulse} />
              <span className={styles.categoryText}>{project.category}</span>
            </div>
            <span className={styles.yearText}>[{project.year}]</span>
          </div>

          {/* Flap middle: Title + Tagline */}
          <div className={styles.flapMain}>
            <h3 ref={nameRef} className={styles.name}>{project.folderName}</h3>
            <p className={styles.tagline}>{project.tagline}</p>
          </div>

          {/* Flap footer: Quick tech badges + Action prompt */}
          <div className={styles.flapFooter}>
            <div className={styles.miniTags}>
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.miniTag}>{tag}</span>
              ))}
            </div>

            <div ref={exploreRef} className={styles.exploreAction}>
              <span>INSPECT</span>
              <span className={styles.exploreArrow}>↗</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DETAIL MODAL ───────────────────────────────────────────────
   Single clean box layout:
   - Top bar: Project badge + Title + Year + Close
   - Image section: Main interactive viewport + Thumbnails
   - Bottom left: Title, Subtitle, Key Impact points, Live/Source CTAs
   - Bottom right: Tech Stack tags
   ───────────────────────────────────────────────────────────── */
interface ModalProps {
  project: RichProject;
  onClose: () => void;
}

function Modal({ project, onClose }: ModalProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const closing    = useRef(false);
  const images     = project.images ?? [];

  /* Open */
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    tl.fromTo(panelRef.current,
      { opacity: 0, scale: 0.94, y: 24 },
      { opacity: 1, scale: 1,    y: 0,  duration: 0.42, ease: 'power3.out' },
      '-=0.1');
    return () => { tl.kill(); };
  }, []);

  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current,  { opacity: 0, scale: 0.95, y: 16, duration: 0.25, ease: 'power2.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2,  ease: 'power2.in' }, '-=0.12');
  }, [onClose]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [close]);

  const prev = () => setImgIdx(i => Math.max(0, i - 1));
  const next = () => setImgIdx(i => Math.min(images.length - 1, i + 1));

  return (
    <div ref={overlayRef} className={styles.overlay} style={{ opacity: 0 }}>
      <div className={styles.backdrop} onClick={close} aria-hidden />

      <div
        ref={panelRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={`Project dossier: ${project.title}`}
        style={{ opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Top bar ── */}
        <div className={styles.mTopBar}>
          <div className={styles.mTopLeft}>
            <span className={styles.mBadge}>DOSSIER // {project.index}</span>
            <span className={styles.mTopTitle}>{project.title}</span>
            <span className={styles.mTopYear}>[{project.year}]</span>
          </div>
          <button className={styles.mCloseBtn} onClick={close} aria-label="Close dossier (ESC)">
            × <span>CLOSE</span> <kbd className={styles.mEsc}>ESC</kbd>
          </button>
        </div>

        {/* ── Image browser ── */}
        {images.length > 0 && (
          <div className={styles.mImageSection}>
            {/* Main image */}
            <div className={styles.mImageMain}>
              <button
                className={`${styles.mImgArrow} ${styles.mImgArrowLeft}`}
                onClick={prev}
                disabled={imgIdx === 0}
                aria-label="Previous image"
              >‹</button>

              <div className={styles.mImgFrame}>
                <img
                  src={images[imgIdx]}
                  alt={`${project.title} preview ${imgIdx + 1}`}
                  className={styles.mImgEl}
                />
                {project.tileLabels?.[imgIdx] && (
                  <span className={styles.mImgLabel}>{project.tileLabels[imgIdx]}</span>
                )}
              </div>

              <button
                className={`${styles.mImgArrow} ${styles.mImgArrowRight}`}
                onClick={next}
                disabled={imgIdx === images.length - 1}
                aria-label="Next image"
              >›</button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className={styles.mThumbs}>
                {images.map((src, i) => (
                  <button
                    key={i}
                    className={`${styles.mThumb} ${i === imgIdx ? styles.mThumbActive : ''}`}
                    onClick={() => setImgIdx(i)}
                    aria-label={project.tileLabels?.[i] ?? `Screenshot ${i + 1}`}
                  >
                    <img src={src} alt="" />
                    {project.tileLabels?.[i] && (
                      <span className={styles.mThumbLabel}>{project.tileLabels[i]}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Bottom: info + tech stack ── */}
        <div className={styles.mBottom}>
          {/* Left — project info */}
          <div className={styles.mInfo}>
            <div className={styles.mHeaderGroup}>
              <span className={styles.mCategory}>{project.category}</span>
              <h2 className={styles.mTitle}>{project.title}</h2>
              <p className={styles.mSubtitle}>{project.subtitle}</p>
            </div>

            <ul className={styles.mImpactList}>
              {project.impact.map((item, i) => (
                <li key={i} className={styles.mImpactItem}>
                  <span className={styles.mImpactDot} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className={styles.mLinks}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.mLinkPrimary}>
                  LIVE SYSTEM ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.mLinkSecondary}>
                  SOURCE CODE ↗
                </a>
              )}
            </div>
          </div>

          {/* Right — tech stack */}
          <div className={styles.mTechPanel}>
            <p className={styles.mTechLabel}>BUILT WITH</p>
            <div className={styles.mTechDivider} />
            <div className={styles.mTechGrid}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.mTechTag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT COMPONENT ────────────────────────────────────────── */
export default function ProjectsView() {
  const [active, setActive] = useState<RichProject | null>(null);
  const open  = useCallback((p: RichProject) => setActive(p), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <section className={styles.root} aria-label="Projects showcase">
      {/* ── Balanced 2x2 Showcase Grid ── */}
      <div className={styles.grid}>
        {PROJECTS.map((p, i) => (
          <Folder key={p.id} project={p} mountDelay={i * 0.1} onClick={open} />
        ))}
      </div>

      {/* ── Detail Modal ── */}
      {active && <Modal project={active} onClose={close} />}
    </section>
  );
}
