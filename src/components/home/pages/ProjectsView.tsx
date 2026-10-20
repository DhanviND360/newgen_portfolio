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
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { projects as rawProjects, type Project } from '@/data/portfolio';
import styles from '@/styles/projects-folder.module.css';
import { playThock } from '@/systems/soundEffects';

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
      liveUrl:    p.link ?? 'https://sih-26-copilot.vercel.app/',
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
      liveUrl:    p.link ?? 'https://razorpace-ai.vercel.app/',
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
      liveUrl:    p.link ?? 'https://thal-care-daadde09.base44.app/',
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
      liveUrl:    p.link ?? 'https://github.com/DhanviND360/YnotMe_TechMonsters_HackHazards',
      githubUrl:  p.github ?? 'https://github.com/DhanviND360/YnotMe_TechMonsters_HackHazards',
    };
    case 'ballyhoo': return {
      ...p,
      index:      indexStr,
      folderName: 'BALLYHOO',
      category:   'CREATOR SAAS & AI',
      tagline:    'Trend Discovery & Reach Intelligence for Content Creators',
      problem:    'Content creators burn dozens of hours chasing elusive social media algorithms and guessing video topics without knowing what will actually trigger high reach and engagement.',
      solution:   'A creator-focused SaaS platform that analyzes trending topics across video ecosystems, scoring momentum and delivering actionable hooks to maximize viewer watch time and engagement.',
      liveUrl:    p.link ?? 'https://v0-build-ballyhoo-ai.vercel.app/',
      githubUrl:  p.github,
    };
    case 'prp-manager': return {
      ...p,
      index:      indexStr,
      folderName: 'PRP MANAGER',
      category:   'AGENTIC PIPELINE & FINTECH',
      tagline:    'Autonomous Cost Assessment Agent · CUBE Buildathon 2026',
      problem:    'Complex multi-agent data pipelines frequently generate unpredictable compute, API, and token costs without real-time financial containment or observability.',
      solution:   'Engineered as PREP Manager for the CUBE Buildathon 2026 pipeline. Features an autonomous background agent hosted on Render that continuously assesses operational costs, tracks telemetry, and exposes pipeline state.',
      liveUrl:    p.link ?? 'https://cube26-prp-0211-dhanvind360.vercel.app/',
      githubUrl:  p.github ?? 'https://github.com/DhanviND360/cube26-prp-0211-dhanvind360',
    };
    case 'hirequest': return {
      ...p,
      index:      indexStr,
      folderName: 'HIREQUEST',
      category:   'TALENT PLATFORM & HRTECH',
      tagline:    'Unified Hiring & Candidate Portal · Gradskills 2026',
      problem:    'Job seekers struggle with opaque application statuses and fragmented submission channels, while recruiters face overwhelming stacks of uncurated resumes.',
      solution:   'Official Gradskills 2026 entry delivering dual-sided portals: job seekers build verified skill portfolios and track application velocity, while HR teams leverage streamlined candidate vetting and hiring workflows.',
      liveUrl:    p.link ?? 'https://hirequest-gradskills-d.vercel.app/',
      githubUrl:  p.github ?? 'https://github.com/DhanviND360/hirequest_gradskillsD',
    };
    case 'maileage': return {
      ...p,
      index:      indexStr,
      folderName: 'M.AI.LEAGE',
      category:   'LOCAL AI HARNESS',
      tagline:    'Local LLM Harness Layer for Token & Prompt Efficiency',
      problem:    'Modern LLM workflows leak token budgets through redundant prompt context, conversational bloat, and unoptimized schema overhead.',
      solution:   'A locally-hosted LLM execution harness that intercepts prompt pipelines to eliminate context waste, optimize token mileage, and evaluate prompt efficiency with zero external cloud telemetry exposure.',
      liveUrl:    p.link ?? 'https://github.com/DhanviND360/m.AI.leage',
      githubUrl:  p.github ?? 'https://github.com/DhanviND360/m.AI.leage',
    };
    case 'prism': return {
      ...p,
      index:      indexStr,
      folderName: 'PRISM',
      category:   'PREDICTIVE INTELLIGENCE',
      tagline:    'Predictive Risk Intelligence & Smart Monitoring · SIH 2026',
      problem:    'Mission-critical projects suffer from unforeseen budget overruns and delivery bottlenecks due to lack of forward-looking early risk detection.',
      solution:   'Smart India Hackathon 2026 submission for Problem Statement SIH26103. Combines multi-parameter predictive models to score schedule, cost, and roadblock risks with transparent explainability.',
      liveUrl:    p.link ?? 'https://prism-sih-2026-rouge.vercel.app/',
      githubUrl:  p.github ?? 'https://github.com/DhanviND360/PRISM_SIH2026',
    };
    case 'rentra': return {
      ...p,
      index:      indexStr,
      folderName: 'RENTRA',
      category:   'PROPTECH & FINTECH',
      tagline:    'Rental Tracking & Property Management Ecosystem',
      problem:    'Property owners and tenants struggle with disjointed rent reminders, untracked cash receipts, maintenance delays, and undocumented lease agreements.',
      solution:   'A centralized property management and rental tracking platform providing automated payment records, lease status tracking, maintenance ticket pipelines, and owner-tenant dashboards.',
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
    gsap.set(c2Ref.current, { ...REST.c2 });
    gsap.set(c1Ref.current, { ...REST.c1 });
    gsap.set(c3Ref.current, { ...REST.c3 });

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
    playThock('deep');
    hoverTl.current?.kill();
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.44 } });
    hoverTl.current = tl;

    tl.to(assemblyRef.current, { y: -12 }, 0);
    tl.to(c2Ref.current, {
      ...HOV.c2,
      boxShadow: '0 24px 44px rgba(0,0,0,0.85), 0 0 20px rgba(62,220,196,0.22)',
    }, 0);
    tl.to(c1Ref.current, {
      ...HOV.c1,
      boxShadow: '0 18px 36px rgba(0,0,0,0.8)',
    }, 0.03);
    tl.to(c3Ref.current, {
      ...HOV.c3,
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
      boxShadow: '0 12px 28px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.2)',
    }, 0);
    tl.to(c1Ref.current, {
      ...REST.c1,
      boxShadow: '0 10px 24px rgba(0,0,0,0.7)',
    }, 0.03);
    tl.to(c3Ref.current, {
      ...REST.c3,
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
              {imgs[1] && <img src={imgs[1]} alt="" loading="lazy" decoding="async" />}
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
              {imgs[2] && <img src={imgs[2]} alt="" loading="lazy" decoding="async" />}
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
              {imgs[0] && <img src={imgs[0]} alt="" loading="lazy" decoding="async" />}
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
/* ─── DETAIL MODAL ───────────────────────────────────────────────
   Centered Viewport Dossier:
   - Rendered via React Portal directly onto document.body (true viewport center)
   - Lock body scroll while open
   - Enlarged interactive hero image showcase with counter & thumbnails
   - Symmetrical, equidistant columns: Overview & Impact (50%) + System Specs & Tech Stack (50%)
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

  /* Lock body scroll */
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  /* Smooth GSAP entrance centering in viewport */
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: 'power2.out' });
    tl.fromTo(panelRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.36, ease: 'power3.out' },
      '-=0.08');
    return () => { tl.kill(); };
  }, []);

  const close = useCallback(async () => {
    if (closing.current) return;
    closing.current = true;
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current,   { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.18, ease: 'power2.in' }, '-=0.1');
  }, [onClose]);

  /* Keyboard shortcuts: ESC to close, Left/Right for images */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowLeft') {
        setImgIdx(i => Math.max(0, i - 1));
      } else if (e.key === 'ArrowRight') {
        setImgIdx(i => Math.min(images.length - 1, i + 1));
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [close, images.length]);

  const prev = () => setImgIdx(i => Math.max(0, i - 1));
  const next = () => setImgIdx(i => Math.min(images.length - 1, i + 1));

  const isLiveGithub = project.liveUrl?.includes('github.com');

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
            ✕ <span>CLOSE</span> <kbd className={styles.mEsc}>ESC</kbd>
          </button>
        </div>

        {/* ── Hero Image Section ── */}
        {images.length > 0 && (
          <div className={styles.mImageSection}>
            {/* Main Interactive Viewport */}
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
                <div className={styles.mImgMetaOverlay}>
                  {project.tileLabels?.[imgIdx] && (
                    <span className={styles.mImgLabel}>{project.tileLabels[imgIdx]}</span>
                  )}
                  <span className={styles.mImgCounter}>
                    {imgIdx + 1} / {images.length}
                  </span>
                </div>
              </div>

              <button
                className={`${styles.mImgArrow} ${styles.mImgArrowRight}`}
                onClick={next}
                disabled={imgIdx === images.length - 1}
                aria-label="Next image"
              >›</button>
            </div>

            {/* Thumbnail Navigation Strip */}
            {images.length > 1 && (
              <div className={styles.mThumbs}>
                {images.map((src, i) => (
                  <button
                    key={i}
                    className={`${styles.mThumb} ${i === imgIdx ? styles.mThumbActive : ''}`}
                    onClick={() => setImgIdx(i)}
                    onMouseEnter={() => playThock('soft')}
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

        {/* ── Bottom: Equidistant Description & Tech Stack Panels ── */}
        <div className={styles.mBottom}>
          {/* Left Column (50%): Project Overview & Impact Highlights */}
          <div className={styles.mInfo}>
            <div className={styles.mColHeader}>
              <span className={styles.mColBadge}>PROJECT DOSSIER // 01</span>
              <span className={styles.mColTitle}>OVERVIEW & IMPACT</span>
            </div>

            <div className={styles.mHeaderGroup}>
              <span className={styles.mCategory}>{project.category}</span>
              <h2 className={styles.mTitle}>{project.title}</h2>
              <p className={styles.mSubtitle}>{project.subtitle}</p>
            </div>

            <p className={styles.mDescriptionText}>{project.description}</p>

            <div className={styles.mImpactSection}>
              <span className={styles.mSubLabel}>CORE IMPACT & METRICS</span>
              <ul className={styles.mImpactList}>
                {project.impact.map((item, i) => (
                  <li key={i} className={styles.mImpactItem}>
                    <span className={styles.mImpactDot} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live CTAs */}
            <div className={styles.mLinks}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mLinkPrimary}
                  title={`Open link in new tab: ${project.liveUrl}`}
                >
                  <span>{isLiveGithub ? 'GITHUB REPOSITORY' : 'LAUNCH LIVE APP'}</span>
                  <span className={styles.mLinkArrow}>↗</span>
                </a>
              )}
              {project.githubUrl && project.githubUrl !== project.liveUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mLinkSecondary}
                  title={`View source repository: ${project.githubUrl}`}
                >
                  <span>SOURCE CODE</span>
                  <span className={styles.mLinkArrow}>↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column (50%): Architecture Specs & Tech Stack */}
          <div className={styles.mTechPanel}>
            <div className={styles.mColHeader}>
              <span className={styles.mColBadge}>SYSTEM SPECS // 02</span>
              <span className={styles.mColTitle}>ENGINEERING & STACK</span>
            </div>

            {project.solution && (
              <div className={styles.mSpecBlock}>
                <span className={styles.mSubLabel}>SYSTEM ARCHITECTURE</span>
                <p className={styles.mSpecText}>{project.solution}</p>
              </div>
            )}

            {project.problem && (
              <div className={styles.mSpecBlock}>
                <span className={styles.mSubLabel}>THE CORE CHALLENGE</span>
                <p className={styles.mSpecText}>{project.problem}</p>
              </div>
            )}

            <div className={styles.mTechBlock}>
              <span className={styles.mSubLabel}>TECHNOLOGY STACK</span>
              <div className={styles.mTechGrid}>
                {project.tags.map(tag => (
                  <span key={tag} className={styles.mTechTag}>
                    <span className={styles.mTechDot} aria-hidden />
                    {tag}
                  </span>
                ))}
              </div>
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* ── Detail Modal Portal rendered directly to document.body ── */}
      {mounted && active && createPortal(<Modal project={active} onClose={close} />, document.body)}
    </section>
  );
}
