'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Career Experience DNA (3D Alive Being Scrollytelling)
   
   Professional Creative Motion Design Experience:
   - True 3D perspective projection HTML5 Canvas DNA double-helix
   - Living organism behaviors: breathing, undulating, mouse tilt & 3D drag
   - Scrollytelling: 5 sequentially revealed milestone chapters
   - Clean, zero-clutter aesthetic: all encircled badges & filter tabs removed
   - Interactive HUD with 5-stage scrubber navigator & audio feedback
   ═══════════════════════════════════════════════════════════════ */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '@/styles/experience-dna.module.css';
import { experienceNodes, type ExperienceNode } from '@/data/portfolio';
import { playThock, playSpaceSynth } from '@/systems/soundEffects';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  angle: number;
  speed: number;
  radius: number;
  orbitRadius: number;
  color: string;
}

export default function ExperienceView() {
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // 3D Engine Refs
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const manualRotYRef = useRef(0);
  const targetManualRotYRef = useRef(0);
  const mouseTiltRef = useRef({ x: 0, y: 0 });
  const targetMouseTiltRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);
  const shockwavePulseRef = useRef({ active: false, radius: 0, opacity: 1, nodeIndex: 0 });

  // Keep activeStageRef in sync
  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  /* ── 3D Alive DNA Canvas Engine ────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Color definitions for the 5 stages
    const stageColors = [
      { primary: '#3edcc4', secondary: '#38bdf8', glow: 'rgba(62, 220, 196, 0.8)' }, // 01 Lakshya (Cyan)
      { primary: '#38bdf8', secondary: '#818cf8', glow: 'rgba(56, 189, 248, 0.8)' }, // 02 Scaler (Sky Blue)
      { primary: '#818cf8', secondary: '#c084fc', glow: 'rgba(129, 140, 248, 0.8)' }, // 03 Swecha (Indigo)
      { primary: '#f59e0b', secondary: '#ef4444', glow: 'rgba(245, 158, 11, 0.9)' },  // 04 Hackathons (Amber Gold)
      { primary: '#06b6d4', secondary: '#f43f5e', glow: 'rgba(6, 182, 212, 0.85)' }, // 05 Future (Stealth Iridescent)
    ];

    // Seed 35 ambient 3D codon particles
    const particles: Particle3D[] = Array.from({ length: 35 }, (_, i) => ({
      x: 0,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 200,
      angle: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.015,
      radius: 1.2 + Math.random() * 2,
      orbitRadius: 70 + Math.random() * 65,
      color: i % 2 === 0 ? '#3edcc4' : '#38bdf8',
    }));

    let time = 0;
    const fov = 340;

    const render = () => {
      time += 0.02;

      // Smooth lerp for 3D tilt and drag
      manualRotYRef.current += (targetManualRotYRef.current - manualRotYRef.current) * 0.08;
      mouseTiltRef.current.x += (targetMouseTiltRef.current.x - mouseTiltRef.current.x) * 0.06;
      mouseTiltRef.current.y += (targetMouseTiltRef.current.y - mouseTiltRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width * 0.22, 92);
      const activeIdx = activeStageRef.current;
      const activeTheme = stageColors[activeIdx] || stageColors[0];

      // Total rotation angle driven by time + scroll progression + interactive mouse drag
      const baseRotation = time * 0.7 + scrollProgressRef.current * Math.PI * 3.5 + manualRotYRef.current + mouseTiltRef.current.x;
      const tiltX = mouseTiltRef.current.y;

      // 3D Double Helix geometry points
      const numRungs = 28;
      const verticalSpan = height * 0.86;
      const startY = -verticalSpan / 2;
      const stepY = verticalSpan / numRungs;

      interface ProjectedRung {
        y: number;
        p1: { x: number; y: number; z: number; scale: number };
        p2: { x: number; y: number; z: number; scale: number };
        avgZ: number;
        angle: number;
      }

      const projectedRungs: ProjectedRung[] = [];

      for (let i = 0; i <= numRungs; i++) {
        const y = startY + i * stepY;

        // Living organism organic breathing perturbation
        const breathe = Math.sin(time * 2.2 + y * 0.012) * 12;
        const currentR = baseRadius + breathe;

        // Helix angle
        const angle = baseRotation + (y / verticalSpan) * Math.PI * 4;

        // 3D coordinates for Strand 1
        const rawX1 = Math.cos(angle) * currentR;
        const rawZ1 = Math.sin(angle) * currentR;

        // 3D coordinates for Strand 2 (anti-phase)
        const rawX2 = Math.cos(angle + Math.PI) * currentR;
        const rawZ2 = Math.sin(angle + Math.PI) * currentR;

        // Apply tilt X rotation
        const cosTilt = Math.cos(tiltX);
        const sinTilt = Math.sin(tiltX);

        const y1Rot = y * cosTilt - rawZ1 * sinTilt;
        const z1Rot = y * sinTilt + rawZ1 * cosTilt;

        const y2Rot = y * cosTilt - rawZ2 * sinTilt;
        const z2Rot = y * sinTilt + rawZ2 * cosTilt;

        // 3D perspective projection
        const scale1 = fov / (fov + z1Rot);
        const scale2 = fov / (fov + z2Rot);

        const proj1 = {
          x: cx + rawX1 * scale1,
          y: cy + y1Rot * scale1,
          z: z1Rot,
          scale: scale1,
        };

        const proj2 = {
          x: cx + rawX2 * scale2,
          y: cy + y2Rot * scale2,
          z: z2Rot,
          scale: scale2,
        };

        projectedRungs.push({
          y,
          p1: proj1,
          p2: proj2,
          avgZ: (z1Rot + z2Rot) / 2,
          angle,
        });
      }

      // Sort base-pair rungs by depth (Z-buffer) for true 3D spatial realism
      projectedRungs.sort((a, b) => a.avgZ - b.avgZ);

      // ── Draw Connecting Base-Pair Rungs ──
      for (const rung of projectedRungs) {
        const { p1, p2, avgZ } = rung;
        const depthAlpha = Math.max(0.12, Math.min(0.9, (avgZ + 120) / 240));

        // Connecting bond line
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(62, 220, 196, ${depthAlpha * 0.45})`;
        ctx.lineWidth = Math.max(1, 1.8 * ((p1.scale + p2.scale) / 2));
        ctx.stroke();

        // Strand 1 Nucleotide bead
        const bead1Radius = Math.max(2, 4.2 * p1.scale);
        const bead1Alpha = Math.max(0.2, Math.min(1, (p1.z + 100) / 200));

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, bead1Radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme.primary;
        ctx.globalAlpha = bead1Alpha;
        if (p1.z > 20) {
          ctx.shadowColor = activeTheme.primary;
          ctx.shadowBlur = 10 * p1.scale;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Strand 2 Nucleotide bead
        const bead2Radius = Math.max(2, 4.2 * p2.scale);
        const bead2Alpha = Math.max(0.2, Math.min(1, (p2.z + 100) / 200));

        ctx.beginPath();
        ctx.arc(p2.x, p2.y, bead2Radius, 0, Math.PI * 2);
        ctx.fillStyle = activeTheme.secondary;
        ctx.globalAlpha = bead2Alpha;
        if (p2.z > 20) {
          ctx.shadowColor = activeTheme.secondary;
          ctx.shadowBlur = 10 * p2.scale;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // ── Draw Continuous Spline Backbone Strands ──
      // Strand 1 curve
      ctx.beginPath();
      for (let i = 0; i < projectedRungs.length; i++) {
        const pt = projectedRungs[i].p1;
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = activeTheme.primary;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = activeTheme.primary;
      ctx.shadowBlur = 14;
      ctx.globalAlpha = 0.85;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Strand 2 curve
      ctx.beginPath();
      for (let i = 0; i < projectedRungs.length; i++) {
        const pt = projectedRungs[i].p2;
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = activeTheme.secondary;
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 4]);
      ctx.globalAlpha = 0.7;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // ── 5 Genomic Milestone Station Beacons along the DNA ──
      const milestonePositions = [0.12, 0.32, 0.52, 0.74, 0.92];
      for (let m = 0; m < milestonePositions.length; m++) {
        const normY = startY + milestonePositions[m] * verticalSpan;
        const mAngle = baseRotation + (normY / verticalSpan) * Math.PI * 4;
        const mRawX = Math.cos(mAngle) * (baseRadius + 10);
        const mRawZ = Math.sin(mAngle) * (baseRadius + 10);

        const mYRot = normY * Math.cos(tiltX) - mRawZ * Math.sin(tiltX);
        const mZRot = normY * Math.sin(tiltX) + mRawZ * Math.cos(tiltX);
        const mScale = fov / (fov + mZRot);

        const mProjX = cx + mRawX * mScale;
        const mProjY = cy + mYRot * mScale;

        const isCurrentActive = m === activeIdx;
        const mColor = stageColors[m].primary;

        // Concentric pulsing beacon orb
        const orbRadius = (isCurrentActive ? 9.5 : 5.5) * mScale;
        const orbAlpha = Math.max(0.3, Math.min(1, (mZRot + 120) / 240));

        ctx.beginPath();
        ctx.arc(mProjX, mProjY, orbRadius, 0, Math.PI * 2);
        ctx.fillStyle = isCurrentActive ? '#ffffff' : mColor;
        ctx.globalAlpha = orbAlpha;
        if (isCurrentActive) {
          ctx.shadowColor = mColor;
          ctx.shadowBlur = 22 * mScale;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Outer pulsing ring for active node
        if (isCurrentActive) {
          const pulseR = orbRadius + (Math.sin(time * 4) * 0.5 + 0.5) * 8 * mScale;
          ctx.beginPath();
          ctx.arc(mProjX, mProjY, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = mColor;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // ── Shockwave Pulse on Section Engagement ──
      if (shockwavePulseRef.current.active) {
        const pulse = shockwavePulseRef.current;
        pulse.radius += 4;
        pulse.opacity -= 0.025;

        if (pulse.opacity <= 0) {
          pulse.active = false;
        } else {
          ctx.beginPath();
          ctx.arc(cx, cy, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = activeTheme.primary;
          ctx.lineWidth = 2;
          ctx.globalAlpha = pulse.opacity;
          ctx.shadowColor = activeTheme.primary;
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }

      // ── Ambient Orbiting Codon Particles ──
      for (const p of particles) {
        p.angle += p.speed;
        const px = Math.cos(p.angle) * p.orbitRadius;
        const pz = Math.sin(p.angle) * p.orbitRadius;

        const pScale = fov / (fov + pz);
        const pProjX = cx + px * pScale;
        const pProjY = cy + p.y * pScale;

        const pAlpha = Math.max(0.1, (pz + 100) / 200);

        ctx.beginPath();
        ctx.arc(pProjX, pProjY, p.radius * pScale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = pAlpha * 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  /* ── Mouse Interaction Handlers for 3D Alive Feel ─────────────── */
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartRef.current.x;
      targetManualRotYRef.current += deltaX * 0.015;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    } else {
      // Subtle 3D tilt towards mouse cursor
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetMouseTiltRef.current = { x: nx * 0.35, y: -ny * 0.25 };
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  /* ── Scrollytelling Intersection Observer ──────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-stage-index'));
            if (!isNaN(index) && index !== activeStageRef.current) {
              setActiveStage(index);
              activeStageRef.current = index;

              // Fire shockwave and audio cue
              shockwavePulseRef.current = {
                active: true,
                radius: 10,
                opacity: 0.9,
                nodeIndex: index,
              };
              playThock('deep');
            }
          }
        }
      },
      {
        root: null, // observes relative to viewport
        threshold: 0.45, // triggers when 45% of the section is in view
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Scroll Progress Listener ──────────────────────────────────── */
  useEffect(() => {
    const updateScroll = () => {
      // Find the scroll container (closest .pageRoot or window)
      const scrollEl = containerRef.current?.closest('[class*="pageRoot"]') as HTMLElement | null;
      if (scrollEl) {
        const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
        if (maxScroll > 0) {
          scrollProgressRef.current = scrollEl.scrollTop / maxScroll;
        }
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
          scrollProgressRef.current = window.scrollY / maxScroll;
        }
      }
    };

    const scrollEl = containerRef.current?.closest('[class*="pageRoot"]');
    if (scrollEl) {
      scrollEl.addEventListener('scroll', updateScroll, { passive: true });
    }
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => {
      if (scrollEl) scrollEl.removeEventListener('scroll', updateScroll);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  /* ── Scrubber Navigator Click ─────────────────────────────────── */
  const scrollToStage = (index: number) => {
    const targetSection = sectionRefs.current[index];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      playSpaceSynth(index);
    }
  };

  const activeNode = experienceNodes[activeStage] || experienceNodes[0];

  return (
    <div ref={containerRef} className={styles.stageRoot}>
      {/* ── Minimalist Clean Intro (Zero Clutter) ── */}
      <header className={styles.scrollyIntro}>
        <span className={styles.scrollyTag}>CAREER SEQUENCE // 05 MILESTONES</span>
        <h1 className={styles.scrollyHeading}>
          JOURNEY THROUGH THE <span>LIVING GENOME</span>
        </h1>
        <div className={styles.scrollyPromptRow}>
          <span>SCROLL TO UNRAVEL INTERNSHIPS & MILESTONES</span>
          <span className={styles.scrollDownArrow}>↓</span>
        </div>
      </header>

      {/* ── Split Scrollytelling Stage Grid ── */}
      <div className={styles.scrollyGrid}>
        {/* Left Column: Sticky 3D Alive DNA Being ── */}
        <aside className={styles.dnaStickyPane}>
          <div
            className={styles.dnaCanvasWrapper}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={
              {
                '--hud-accent': activeNode.accentColor,
                '--node-accent': activeNode.accentColor,
              } as React.CSSProperties
            }
          >
            {/* The 3D Living DNA Organism Canvas */}
            <canvas ref={canvasRef} className={styles.dnaCanvas} />

            {/* Tactical HUD Overlay */}
            <div className={styles.dnaHudOverlay}>
              {/* HUD Top: Phase Indicator */}
              <div className={styles.hudTopRow}>
                <div className={styles.hudStageBadge}>
                  <span className={styles.hudStageDot} />
                  <span>PHASE // 0{activeStage + 1}</span>
                </div>
                <span className={styles.hudStatusTag}>{activeNode.status}</span>
              </div>

              {/* HUD Middle: Live Focused Company Readout */}
              <div className={styles.hudCenterFocus}>
                <span className={styles.hudFocusLabel}>CURRENT TRANSMISSION</span>
                <span className={styles.hudFocusCompany}>{activeNode.company}</span>
              </div>

              {/* HUD Bottom: 5-Stage Interactive Scrubber Navigator */}
              <div className={styles.hudBottomRow}>
                <div className={styles.stageScrubber} role="tablist" aria-label="Milestone scrubber">
                  {experienceNodes.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={activeStage === i}
                      className={`${styles.scrubberBtn} ${activeStage === i ? styles.scrubberBtnActive : ''}`}
                      onClick={() => scrollToStage(i)}
                      title={`Jump to Phase 0${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <span className={styles.hud3dHint}>[DRAG TO ROTATE 3D]</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: The 5 Scrollytelling Story Chapters ── */}
        <div className={styles.scrollyContent}>
          {experienceNodes.map((node, index) => {
            const isActive = activeStage === index;
            const isHackathon = node.id === 'exp-hackathons';
            const isFuture = node.id === 'exp-future';

            let cardSpecificClass = styles.milestoneCard;
            if (isHackathon) cardSpecificClass += ` ${styles.hackathonBugCard}`;
            if (isFuture) cardSpecificClass += ` ${styles.futureBeaconCard}`;
            if (isActive) cardSpecificClass += ` ${styles.milestoneCardFocused}`;

            return (
              <section
                key={node.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                data-stage-index={index}
                className={`${styles.storySection} ${
                  isActive ? styles.storySectionActive : styles.storySectionInactive
                }`}
                style={
                  {
                    '--node-accent': node.accentColor,
                    '--node-glow': `${node.accentColor}33`,
                  } as React.CSSProperties
                }
              >
                <article className={cardSpecificClass}>
                  <div className={styles.cardTopAccentGlow} />

                  {/* Card Meta: Badge + Period + Status */}
                  <div className={styles.cardMetaHeader}>
                    <span className={styles.cardGenomicBadge}>{node.badge}</span>
                    <div className={styles.cardStatusTag}>
                      <span className={styles.cardStatusDot} />
                      <span>{node.status}</span>
                    </div>
                    <span className={styles.cardPeriodPill}>[{node.period}]</span>
                  </div>

                  {/* Role Title & Organization */}
                  <div className={styles.cardTitleGroup}>
                    <h2 className={styles.cardRole}>{node.role}</h2>
                    <p className={styles.cardCompany}>// {node.company}</p>
                  </div>

                  {/* Summary */}
                  <p className={styles.cardSummary}>{node.summary}</p>

                  {/* Highlights Bullet List */}
                  <ul className={styles.highlightsList}>
                    {node.highlights.map((item, hIdx) => (
                      <li key={hIdx} className={styles.highlightItem}>
                        <span className={styles.highlightDot} aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills Grid */}
                  <div className={styles.skillsGrid}>
                    {node.skills.map((skill) => (
                      <span key={skill} className={styles.skillPill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Key Metrics Bottom Banner */}
                  {node.metrics && (
                    <div className={styles.metricsRow}>
                      <span className={styles.metricsTag}>BENCHMARK RECORD</span>
                      <span className={styles.metricsValue}>{node.metrics}</span>
                    </div>
                  )}
                </article>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
