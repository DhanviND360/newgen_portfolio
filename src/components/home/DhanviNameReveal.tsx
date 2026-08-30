'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Circular Hover Reveal System
   
   Master Interactive Identity Component:
   1. Default: "DHANVI" horizontally centered with surrounding nodes.
   2. Hover: Letters scramble outward into an equidistant circular ring.
   3. Center: Circular creator portrait cinematically revealed with cyan bloom.
   4. Orbit: Letters and attached nodes continuously revolve around portrait.
   5. Tethers: SVG connection lines physically lock each letter to its node.
   6. Mouse-out: Seamless reverse back to centered state.
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import styles from '@/styles/dhanvi-reveal.module.css';
import { navigationNodes, creator } from '@/data/portfolio';

const NAME_LETTERS = ['D', 'H', 'A', 'N', 'V', 'I'];
const NUM_LETTERS = 6;
const TWO_PI = Math.PI * 2;
const STEP_ANGLE = TWO_PI / NUM_LETTERS; // 60 degrees in radians

export default function DhanviNameReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // DOM Refs
  const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const orbitRingRef = useRef<SVGCircleElement>(null);
  const outerRingRef = useRef<SVGCircleElement>(null);

  // Portrait & Tagline Refs
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  const portraitGlowRef = useRef<HTMLDivElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const hoverZoneRef = useRef<HTMLDivElement>(null);

  // Interaction State
  const [isHovered, setIsHovered] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);

  // Animation values stored in ref for 60/120fps ticker
  const animState = useRef({
    progress: 0, // 0 = collapsed (horizontal DHANVI), 1 = expanded (circular orbit)
    orbitAngle: -Math.PI / 2, // starting at top
    cx: 0,
    cy: 0,
    letterRadius: 240,
    nodeRadius: 345,
    letterSpacing: 90,
    idleAngles: [0.2, 1.3, 2.4, 3.4, 4.5, 5.6],
  });

  // GSAP tween for the progress transition
  const progressTween = useRef<gsap.core.Tween | null>(null);

  /* ── Responsive Measurements ── */
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const minDim = Math.min(rect.width, rect.height);

    // Responsive scaling with generous spacing
    const scaleFactor = Math.max(0.55, Math.min(1.0, minDim / 900));
    
    // Spacious radii to prevent any letter overlap
    const letterRadius = Math.max(160, 240 * scaleFactor);
    const nodeRadius = letterRadius + Math.max(70, 105 * scaleFactor);

    // Horizontal spacing in collapsed DHANVI state
    const vw = window.innerWidth;
    let letterSpacing = 90 * scaleFactor;
    if (vw < 480) letterSpacing = Math.max(42, vw * 0.11);
    else if (vw < 768) letterSpacing = Math.max(60, vw * 0.09);

    animState.current.cx = cx;
    animState.current.cy = cy;
    animState.current.letterRadius = letterRadius;
    animState.current.nodeRadius = nodeRadius;
    animState.current.letterSpacing = letterSpacing;

    // Update static SVG orbit tracks
    if (orbitRingRef.current) {
      orbitRingRef.current.setAttribute('cx', String(cx));
      orbitRingRef.current.setAttribute('cy', String(cy));
      orbitRingRef.current.setAttribute('r', String(letterRadius));
    }
    if (outerRingRef.current) {
      outerRingRef.current.setAttribute('cx', String(cx));
      outerRingRef.current.setAttribute('cy', String(cy));
      outerRingRef.current.setAttribute('r', String(nodeRadius));
    }

    // Update hover trigger zone size
    if (hoverZoneRef.current) {
      const zoneRadius = (nodeRadius + 40);
      hoverZoneRef.current.style.width = `${zoneRadius * 2}px`;
      hoverZoneRef.current.style.height = `${zoneRadius * 2}px`;
    }
  }, []);

  /* ── Hover Trigger Handlers ── */
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    if (progressTween.current) progressTween.current.kill();
    progressTween.current = gsap.to(animState.current, {
      progress: 1,
      duration: 1.15,
      ease: 'power3.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setActiveNodeIndex(null);

    if (progressTween.current) progressTween.current.kill();
    progressTween.current = gsap.to(animState.current, {
      progress: 0,
      duration: 0.95,
      ease: 'power3.inOut',
    });
  }, []);

  /* ── Distance-Based Interaction Controller ── */
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const dist = Math.hypot(mouseX - cx, mouseY - cy);

    const { nodeRadius, progress } = animState.current;
    // Dynamic hit threshold: expansive in circular orbit, comfortable when collapsed
    const hitRadius = gsap.utils.interpolate(nodeRadius * 0.85, nodeRadius + 55, progress);

    if (dist <= hitRadius) {
      if (!isHovered) handleMouseEnter();
    } else {
      if (isHovered) handleMouseLeave();
    }
  }, [isHovered, handleMouseEnter, handleMouseLeave]);

  /* ── Master GSAP Animation Ticker Loop ── */
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initial entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    NAME_LETTERS.forEach((_, i) => {
      const el = letterRefs.current[i];
      if (el) {
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.5, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          i * 0.08
        );
      }
    });
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0.5
      );
    }

    // Ticker function running at display refresh rate (60/120fps)
    const ticker = () => {
      const state = animState.current;
      const dt = gsap.ticker.deltaRatio() / 60; // Normalize to 60fps delta
      const p = state.progress;

      // Always revolve smoothly, accelerating slightly during active expansion
      const currentSpeed = gsap.utils.interpolate(0.08, 0.22, p);
      state.orbitAngle += currentSpeed * dt;
      if (state.orbitAngle > TWO_PI) state.orbitAngle -= TWO_PI;

      const { cx, cy, letterRadius, nodeRadius, letterSpacing, orbitAngle } = state;
      const totalWordWidth = (NUM_LETTERS - 1) * letterSpacing;
      const startX = cx - totalWordWidth / 2;

      // ── Position Letters & Nodes ──
      for (let i = 0; i < NUM_LETTERS; i++) {
        const letterEl = letterRefs.current[i];
        const nodeEl = nodeRefs.current[i];
        const lineEl = lineRefs.current[i];

        // 1. Collapsed Coordinates (horizontal centered "DHANVI")
        const colLetterX = startX + i * letterSpacing;
        const colLetterY = cy;

        // In collapsed state, nodes orbit around the name in an elliptical planetary track
        const defaultNodeAngle = state.idleAngles[i] + orbitAngle * 0.35;
        const defaultOrbitRx = Math.max(260, 340 * (letterRadius / 240));
        const defaultOrbitRy = Math.max(140, 180 * (letterRadius / 240));
        
        const colNodeX = cx + defaultOrbitRx * Math.cos(defaultNodeAngle);
        const colNodeY = cy + defaultOrbitRy * Math.sin(defaultNodeAngle);

        // 2. Expanded Circular Orbit Coordinates (Equidistant 60 deg ring)
        const letterAngle = orbitAngle + i * STEP_ANGLE;
        const expLetterX = cx + letterRadius * Math.cos(letterAngle);
        const expLetterY = cy + letterRadius * Math.sin(letterAngle);

        // Node is stationed radially outward from the letter along the same ray
        const expNodeX = cx + nodeRadius * Math.cos(letterAngle);
        const expNodeY = cy + nodeRadius * Math.sin(letterAngle);

        // 3. Interpolated Coordinates (Morph between Collapsed & Orbit)
        const curLetterX = gsap.utils.interpolate(colLetterX, expLetterX, p);
        const curLetterY = gsap.utils.interpolate(colLetterY, expLetterY, p);

        const curNodeX = gsap.utils.interpolate(colNodeX, expNodeX, p);
        const curNodeY = gsap.utils.interpolate(colNodeY, expNodeY, p);

        // 4. Update Letter Element
        if (letterEl) {
          letterEl.style.transform = `translate3d(${curLetterX}px, ${curLetterY}px, 0) translate(-50%, -50%)`;
        }

        // 5. Update Node Element
        if (nodeEl) {
          nodeEl.style.transform = `translate3d(${curNodeX}px, ${curNodeY}px, 0) translate(-50%, -50%)`;
          // Node card opacity fades to crisp readability when expanded, subtle when collapsed
          const cardEl = nodeEl.querySelector(`.${styles.nodeCard}`) as HTMLElement | null;
          if (cardEl) {
            cardEl.style.opacity = String(gsap.utils.interpolate(0.45, 1, p));
          }
        }

        // 6. Update SVG Tether Line (Letter -> Node)
        if (lineEl) {
          lineEl.setAttribute('x1', String(curLetterX));
          lineEl.setAttribute('y1', String(curLetterY));
          lineEl.setAttribute('x2', String(curNodeX));
          lineEl.setAttribute('y2', String(curNodeY));
          // Line opacity: faint in collapsed state, crisp cyan in expanded state
          lineEl.style.opacity = String(gsap.utils.interpolate(0.18, 0.65, p));
        }
      }

      // ── Update Central Profile Reveal ──
      if (portraitWrapperRef.current) {
        portraitWrapperRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${gsap.utils.interpolate(0.5, 1.0, p)})`;
        portraitWrapperRef.current.style.opacity = String(p);

        // Blur decreases as it reveals
        const blurAmount = gsap.utils.interpolate(16, 0, p);
        portraitWrapperRef.current.style.filter = `blur(${blurAmount}px)`;
      }

      if (portraitGlowRef.current) {
        portraitGlowRef.current.style.opacity = String(p);
      }

      // Tagline dims subtly on expansion
      if (taglineRef.current) {
        taglineRef.current.style.opacity = String(gsap.utils.interpolate(1.0, 0.3, p));
      }
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      gsap.ticker.remove(ticker);
      if (progressTween.current) progressTween.current.kill();
    };
  }, [updateDimensions]);

  return (
    <div
      ref={containerRef}
      className={styles.revealRoot}
      id="home-canvas"
      onPointerMove={handlePointerMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── SVG Connection & Orbit Canvas ── */}
      <svg ref={svgRef} className={styles.svgCanvas} aria-hidden="true">
        {/* Orbital Guide Tracks */}
        <circle
          ref={orbitRingRef}
          className={`${styles.orbitTrack} ${isHovered ? styles.orbitTrackVisible : ''}`}
        />
        <circle
          ref={outerRingRef}
          className={`${styles.orbitTrack} ${isHovered ? styles.orbitTrackVisible : ''}`}
        />

        {/* Physical Tether Lines (Letter to Node) */}
        {NAME_LETTERS.map((_, i) => (
          <line
            key={`line-${i}`}
            ref={(el) => { lineRefs.current[i] = el; }}
            className={`${styles.connectionLine} ${activeNodeIndex === i ? styles.connectionLineActive : ''}`}
          />
        ))}
      </svg>

      {/* ── Central Circular Portrait Reveal ── */}
      <div
        ref={portraitWrapperRef}
        className={styles.portraitWrapper}
        style={{ opacity: 0 }}
      >
        <div ref={portraitGlowRef} className={styles.portraitGlow} />
        <div ref={portraitFrameRef} className={styles.portraitFrame}>
          <div className={styles.portraitRing} />
          <div className={styles.portraitScanline} />
          <img
            src="/creator-portrait.png"
            alt="Dhanvi — Creator Portrait"
            className={styles.portraitImage}
            draggable={false}
          />
        </div>
      </div>

      {/* ── DHANVI Letters (Circular Orbiting Core) ── */}
      {NAME_LETTERS.map((letter, i) => (
        <div
          key={`letter-${i}`}
          ref={(el) => { letterRefs.current[i] = el; }}
          className={styles.letterItem}
          onMouseEnter={() => {
            handleMouseEnter();
            setActiveNodeIndex(i);
          }}
          onMouseLeave={() => setActiveNodeIndex(null)}
        >
          <span className={styles.letterText}>{letter}</span>
        </div>
      ))}

      {/* ── Navigation Nodes (Attached Planets) ── */}
      {navigationNodes.map((node, i) => (
        <a
          key={node.id}
          id={node.id}
          href={node.href}
          ref={(el) => { nodeRefs.current[i] = el; }}
          className={styles.nodeAnchor}
          data-index={i}
          data-active={activeNodeIndex === i ? 'true' : 'false'}
          aria-label={`Navigate to ${node.label} section`}
          onMouseEnter={() => {
            handleMouseEnter();
            setActiveNodeIndex(i);
          }}
          onMouseLeave={() => setActiveNodeIndex(null)}
        >
          <div className={styles.nodeDotWrapper}>
            <span className={styles.nodeDot} />
            <span className={styles.nodePulse} />
          </div>
          <div className={styles.nodeCard}>
            <div className={styles.nodeHeader}>
              <span className={styles.nodeIndex}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.nodeLabel}>{node.label}</span>
            </div>
            <span className={styles.nodeDesc}>{node.description}</span>
          </div>
        </a>
      ))}

      {/* ── Interactive Invisible Hover Zone ── */}
      <div
        ref={hoverZoneRef}
        className={styles.hoverZone}
        onMouseEnter={handleMouseEnter}
        aria-hidden="true"
      />

      {/* ── Editorial Tagline ── */}
      <div ref={taglineRef} className={styles.tagline}>
        <span className={styles.taglineWord}>Builder</span>
        <span className={styles.taglineDot}>•</span>
        <span className={styles.taglineWord}>Creator</span>
        <span className={styles.taglineDot}>•</span>
        <span className={styles.taglineWord}>Engineer</span>
      </div>
    </div>
  );
}
