'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Circular Hover Reveal System & Planetary Zoom Navigation
   
   Master Interactive Identity Component:
   1. Default: "DHANVI" horizontally centered with surrounding orbiting nodes.
   2. Hover: Letters scramble outward into an equidistant circular ring.
   3. Center: Circular creator portrait cinematically revealed with cyan bloom.
   4. Orbit: Letters and attached nodes continuously revolve around portrait.
   5. Node Click: Planetary zoom dive into the clicked node:
      - Orbit pauses immediately, locking the node.
      - Camera accelerates into the node's exact screen coordinates.
      - Edge warp streaks, radial motion blur, and a minimalist white/cyan flash.
      - Lands on individual node page with Anton heading on top.
   6. Return: "← BACK TO ORBIT" or ESC triggers reverse-zoom back to orbit.
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import styles from '@/styles/dhanvi-reveal.module.css';
import { navigationNodes, NavigationNode } from '@/data/portfolio';
import { playSpaceSynth } from '@/systems/soundEffects';

// Warp Transition & Individual Page Components
import PlanetaryWarpOverlay from './PlanetaryWarpOverlay';
import NodePageContainer from './pages/NodePageContainer';
import ProjectsView from './pages/ProjectsView';
import AchievementsView from './pages/AchievementsView';
import AboutView from './pages/AboutView';
import ContactView from './pages/ContactView';
import GalleryView from './pages/GalleryView';
import ExperienceView from './pages/ExperienceView';

const NAME_LETTERS = ['D', 'H', 'A', 'N', 'V', 'I'];
const NUM_LETTERS = 6;
const TWO_PI = Math.PI * 2;
const STEP_ANGLE = TWO_PI / NUM_LETTERS; // 60 degrees in radians

export default function DhanviNameReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomLayerRef = useRef<HTMLDivElement>(null);
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
  const nodeCardRefs = useRef<(HTMLElement | null)[]>([]);

  // Interaction State (refs eliminate React re-renders during 120fps mouse movement)
  const isHoveredRef = useRef(false);
  const activeNodeIndexRef = useRef<number | null>(null);
  const activePageNodeRef = useRef<NavigationNode | null>(null);
  const isWarpActiveRef = useRef(false);
  const lastProgressRef = useRef(-1);
  const hasPositionedLettersRef = useRef(false);

  // Planetary Zoom & Page Navigation State
  const [activePageNode, setActivePageNode] = useState<NavigationNode | null>(null);
  const [activePageIndex, setActivePageIndex] = useState<number | null>(null);
  const [isWarpActive, setIsWarpActive] = useState(false);
  const [isZoomingIn, setIsZoomingIn] = useState(true);
  const [warpOrigin, setWarpOrigin] = useState({ x: 0, y: 0 });

  // Sync state to refs for lock-free ticker access
  useEffect(() => {
    activePageNodeRef.current = activePageNode;
  }, [activePageNode]);

  useEffect(() => {
    isWarpActiveRef.current = isWarpActive;
  }, [isWarpActive]);

  // Refs for real-time 60fps frame coordination
  const isPausedForZoomRef = useRef(false);
  const currentPositionsRef = useRef<{ x: number; y: number }[]>([]);

  // Animation values stored in ref for 60/120fps ticker
  const animState = useRef({
    progress: 0, // 0 = collapsed (horizontal DHANVI), 1 = expanded (circular orbit)
    orbitAngle: -Math.PI / 2, // starting at top
    cx: 0,
    cy: 0,
    letterRadius: 240,
    nodeRadius: 390,
    letterSpacing: 90,
    idleAngles: [0.2, 1.3, 2.4, 3.4, 4.5, 5.6],
  });

  // GSAP tween for the progress transition
  const progressTween = useRef<gsap.core.Tween | null>(null);

  /* ── Responsive Measurements ── */
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.width > 0 ? rect.width / 2 : window.innerWidth / 2;
    const cy = rect.height > 0 ? rect.height / 2 : window.innerHeight / 2;
    const minDim = Math.min(rect.width || window.innerWidth, rect.height || window.innerHeight);

    // Responsive scaling with generous spacing
    const scaleFactor = Math.max(0.55, Math.min(1.0, minDim / 900));

    // Spacious radii to prevent any letter overlap & allow enlarged nodes breathing room
    const letterRadius = Math.max(160, 240 * scaleFactor);
    const nodeRadius = letterRadius + Math.max(110, 150 * scaleFactor);

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

    hasPositionedLettersRef.current = false;

    // Position letters statically at resting horizontal positions initially
    const totalWordWidth = (NUM_LETTERS - 1) * letterSpacing;
    const startX = cx - totalWordWidth / 2;
    for (let i = 0; i < NUM_LETTERS; i++) {
      const letterEl = letterRefs.current[i];
      if (letterEl) {
        letterEl.style.transform = `translate3d(${startX + i * letterSpacing}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
    }

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
      const zoneRadius = nodeRadius + 45;
      hoverZoneRef.current.style.width = `${zoneRadius * 2}px`;
      hoverZoneRef.current.style.height = `${zoneRadius * 2}px`;
    }
  }, []);

  /* ── Hover Node Selector (Direct DOM, 0 React re-renders) ── */
  const setHoveredNode = useCallback((index: number | null) => {
    if (activeNodeIndexRef.current === index) return;
    const prev = activeNodeIndexRef.current;
    activeNodeIndexRef.current = index;

    if (prev !== null) {
      lineRefs.current[prev]?.classList.remove(styles.connectionLineActive);
      nodeRefs.current[prev]?.removeAttribute('data-active');
    }
    if (index !== null) {
      lineRefs.current[index]?.classList.add(styles.connectionLineActive);
      nodeRefs.current[index]?.setAttribute('data-active', 'true');
      playSpaceSynth(index);
    }
  }, []);

  /* ── Hover Trigger Handlers (Ref-only, zero React re-renders) ── */
  const handleMouseEnter = useCallback(() => {
    if (activePageNodeRef.current || isWarpActiveRef.current || isPausedForZoomRef.current) return;
    if (!isHoveredRef.current) {
      isHoveredRef.current = true;
      orbitRingRef.current?.classList.add(styles.orbitTrackVisible);
      outerRingRef.current?.classList.add(styles.orbitTrackVisible);
    }

    if (progressTween.current) progressTween.current.kill();
    progressTween.current = gsap.to(animState.current, {
      progress: 1,
      duration: 1.15,
      ease: 'power3.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (activePageNodeRef.current || isWarpActiveRef.current || isPausedForZoomRef.current) return;
    if (isHoveredRef.current) {
      isHoveredRef.current = false;
      orbitRingRef.current?.classList.remove(styles.orbitTrackVisible);
      outerRingRef.current?.classList.remove(styles.orbitTrackVisible);
      setHoveredNode(null);
    }

    if (progressTween.current) progressTween.current.kill();
    progressTween.current = gsap.to(animState.current, {
      progress: 0,
      duration: 0.95,
      ease: 'power3.inOut',
    });
  }, [setHoveredNode]);

  /* ── Distance-Based Interaction Controller (Ref-only, throttled, 0 DOM reads) ── */
  const pointerMoveThrottleRef = useRef(0);
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Throttle to ~40fps to avoid excessive math
      const now = performance.now();
      if (now - pointerMoveThrottleRef.current < 25) return;
      pointerMoveThrottleRef.current = now;

      if (activePageNodeRef.current || isWarpActiveRef.current || isPausedForZoomRef.current) return;

      const { cx, cy, nodeRadius, progress } = animState.current;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const hitRadius = gsap.utils.interpolate(nodeRadius * 0.85, nodeRadius + 55, progress);

      if (dist <= hitRadius) {
        if (!isHoveredRef.current) handleMouseEnter();
      } else {
        if (isHoveredRef.current) handleMouseLeave();
      }
    },
    [handleMouseEnter, handleMouseLeave]
  );

  /* ── Node Click: Trigger Planetary Zoom ── */
  const handleNodeClick = useCallback(
    (e: React.MouseEvent, node: NavigationNode, index: number) => {
      e.preventDefault();
      e.stopPropagation();

      if (activePageNodeRef.current || isWarpActiveRef.current) return;

      // 1. Immediately pause the orbital revolution
      isPausedForZoomRef.current = true;
      activeNodeIndexRef.current = index;
      nodeRefs.current[index]?.classList.add(styles.nodeTargetGlow);

      // 2. Read exact coordinates of the clicked node
      const rect = nodeRefs.current[index]?.getBoundingClientRect();
      const originX = rect
        ? rect.left + rect.width / 2
        : currentPositionsRef.current[index]?.x || window.innerWidth / 2;
      const originY = rect
        ? rect.top + rect.height / 2
        : currentPositionsRef.current[index]?.y || window.innerHeight / 2;

      setWarpOrigin({ x: originX, y: originY });
      setIsZoomingIn(true);
      setIsWarpActive(true);

      // 3. Zoom the canvas container toward the node's coordinates with motion blur
      if (zoomLayerRef.current) {
        gsap.to(zoomLayerRef.current, {
          scale: 9,
          transformOrigin: `${originX}px ${originY}px`,
          duration: 0.72,
          ease: 'power3.in',
          filter: 'blur(10px)',
        });
      }
    },
    []
  );

  /* ── Minimalist Flash Peak Callback (State Swap) ── */
  const handleFlashPeak = useCallback(() => {
    if (isZoomingIn) {
      // Swapping in the target node page at the peak of the flash
      const targetIndex = activeNodeIndexRef.current !== null ? activeNodeIndexRef.current : 0;
      const targetNode = navigationNodes[targetIndex];
      setActivePageNode(targetNode);
      setActivePageIndex(targetIndex);

      if (typeof window !== 'undefined') {
        window.location.hash = targetNode.href;
      }

      // Reset zoom container cleanly under the flash
      if (zoomLayerRef.current) {
        gsap.set(zoomLayerRef.current, {
          scale: 1,
          filter: 'blur(0px)',
        });
      }
    } else {
      // Peak of reverse zoom: unmount page
      setActivePageNode(null);
      setActivePageIndex(null);

      if (typeof window !== 'undefined') {
        history.pushState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, [isZoomingIn]);

  /* ── Warp Transition Finished ── */
  const handleWarpComplete = useCallback(() => {
    setIsWarpActive(false);

    if (!isZoomingIn) {
      // Returned to orbit: unpause orbital revolution
      isPausedForZoomRef.current = false;
      nodeRefs.current.forEach((el) => el?.classList.remove(styles.nodeTargetGlow));
      setHoveredNode(null);
    }
  }, [isZoomingIn, setHoveredNode]);

  /* ── Return to Orbit (Reverse Zoom) ── */
  const handleBackToOrbit = useCallback(() => {
    if (!activePageNode || isWarpActive) return;

    const returnX = warpOrigin.x || window.innerWidth / 2;
    const returnY = warpOrigin.y || window.innerHeight / 2;

    setIsZoomingIn(false);
    setIsWarpActive(true);
    nodeRefs.current.forEach((el) => el?.classList.remove(styles.nodeTargetGlow));
    setHoveredNode(null);

    if (zoomLayerRef.current) {
      gsap.fromTo(
        zoomLayerRef.current,
        {
          scale: 6,
          transformOrigin: `${returnX}px ${returnY}px`,
          filter: 'blur(8px)',
        },
        {
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }
  }, [activePageNode, isWarpActive, warpOrigin, setHoveredNode]);

  /* ── Deep Linking / Initial Hash Listener ── */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const foundIndex = navigationNodes.findIndex((n) => n.href === hash);
      if (foundIndex !== -1 && !activePageNode) {
        const node = navigationNodes[foundIndex];
        setActivePageNode(node);
        setActivePageIndex(foundIndex);
        isPausedForZoomRef.current = true;
      }
    };

    checkHash();
    window.addEventListener('popstate', checkHash);
    return () => window.removeEventListener('popstate', checkHash);
  }, [activePageNode]);

  /* ── Cache node card sub-elements to avoid per-frame querySelector ── */
  useEffect(() => {
    navigationNodes.forEach((_, i) => {
      const nodeEl = nodeRefs.current[i];
      if (nodeEl) {
        nodeCardRefs.current[i] = nodeEl.querySelector(`.${styles.nodeCard}`) as HTMLElement | null;
      }
    });
  }, []);

  /* ── Master GSAP Animation Ticker Loop ── */
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initial entrance animation — elongated majestic letter illumination
    const tl = gsap.timeline({ delay: 0.3 });
    NAME_LETTERS.forEach((_, i) => {
      const el = letterRefs.current[i];
      const textEl = el?.querySelector<HTMLElement>(`.${styles.letterText}`);
      if (textEl) {
        tl.fromTo(
          textEl,
          { opacity: 0, scale: 0.5, y: -20, filter: 'brightness(0.25) blur(6px)' },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'brightness(1) blur(0px)',
            duration: 1.4,
            ease: 'power2.out',
          },
          i * 0.35
        );
      }
    });
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        (NAME_LETTERS.length - 1) * 0.35 + 0.8
      );
    }

    // Ticker function running at display refresh rate (60/120fps)
    const ticker = () => {
      // When inside an active node page, sleep completely (0 CPU/GPU)
      if (activePageNodeRef.current) return;

      const state = animState.current;
      const dt = gsap.ticker.deltaRatio() / 60; // Normalize to 60fps delta
      const p = state.progress;
      const isProgressChanging = Math.abs(p - lastProgressRef.current) > 0.0005;
      lastProgressRef.current = p;

      // Revolve smoothly only when not paused for planetary zoom transition
      if (!isPausedForZoomRef.current) {
        const currentSpeed = gsap.utils.interpolate(0.08, 0.22, p);
        state.orbitAngle += currentSpeed * dt;
        if (state.orbitAngle > TWO_PI) state.orbitAngle -= TWO_PI;
      }

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
        const defaultOrbitRx = Math.max(340, 440 * (letterRadius / 240));
        const defaultOrbitRy = Math.max(190, 240 * (letterRadius / 240));

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

        // Record real-time position for zoom origin
        currentPositionsRef.current[i] = { x: curNodeX, y: curNodeY };

        // 4. Update Letter Element
        if (letterEl && (p > 0 || isProgressChanging || !hasPositionedLettersRef.current)) {
          letterEl.style.transform = `translate3d(${curLetterX}px, ${curLetterY}px, 0) translate(-50%, -50%)`;
        }

        // 5. Update Node Element
        if (nodeEl) {
          nodeEl.style.transform = `translate3d(${curNodeX}px, ${curNodeY}px, 0) translate(-50%, -50%)`;
          if (isProgressChanging) {
            const cardEl = nodeCardRefs.current[i];
            if (cardEl) {
              cardEl.style.opacity = String(gsap.utils.interpolate(0.45, 1, p));
            }
          }
        }

        // 6. Update SVG Tether Line (Letter -> Node)
        if (lineEl) {
          lineEl.setAttribute('x1', String(curLetterX));
          lineEl.setAttribute('y1', String(curLetterY));
          lineEl.setAttribute('x2', String(curNodeX));
          lineEl.setAttribute('y2', String(curNodeY));
          if (isProgressChanging) {
            lineEl.style.opacity = String(gsap.utils.interpolate(0.18, 0.65, p));
          }
        }
      }

      hasPositionedLettersRef.current = true;

      // ── Update Central Profile Reveal (only when p > 0 or p is morphing) ──
      if (isProgressChanging || p > 0) {
        if (portraitWrapperRef.current) {
          if (p <= 0.005) {
            portraitWrapperRef.current.style.opacity = '0';
            portraitWrapperRef.current.style.display = 'none';
            portraitWrapperRef.current.style.filter = 'none';
          } else {
            portraitWrapperRef.current.style.display = 'flex';
            portraitWrapperRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${gsap.utils.interpolate(0.5, 1.0, p)})`;
            portraitWrapperRef.current.style.opacity = String(p);

            if (p >= 0.98) {
              portraitWrapperRef.current.style.filter = 'none';
            } else {
              const blurAmount = gsap.utils.interpolate(16, 0, p);
              portraitWrapperRef.current.style.filter = `blur(${blurAmount}px)`;
            }
          }
        }

        if (portraitGlowRef.current) {
          portraitGlowRef.current.style.opacity = String(p);
        }

        if (taglineRef.current) {
          taglineRef.current.style.opacity = String(gsap.utils.interpolate(1.0, 0.3, p));
        }
      }
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      gsap.ticker.remove(ticker);
      if (progressTween.current) progressTween.current.kill();
    };
  }, [updateDimensions]);

  // Render content of active page based on ID
  const renderActivePageContent = () => {
    if (!activePageNode) return null;
    switch (activePageNode.id) {
      case 'node-projects':
        return <ProjectsView />;
      case 'node-achievements':
        return <AchievementsView />;
      case 'node-about':
        return <AboutView />;
      case 'node-contact':
        return <ContactView />;
      case 'node-gallery':
        return <GalleryView />;
      case 'node-experience':
      case 'node-hobby':
        return <ExperienceView />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.revealRoot}
      id="home-canvas"
      onPointerMove={handlePointerMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Planetary Zoom Scaling Layer ── */}
      <div ref={zoomLayerRef} className={styles.canvasZoomLayer}>
        {/* ── SVG Connection & Orbit Canvas ── */}
        <svg ref={svgRef} className={styles.svgCanvas} aria-hidden="true">
          {/* Orbital Guide Tracks */}
          <circle ref={orbitRingRef} className={styles.orbitTrack} />
          <circle ref={outerRingRef} className={styles.orbitTrack} />

          {/* Physical Tether Lines (Letter to Node) */}
          {NAME_LETTERS.map((_, i) => (
            <line
              key={`line-${i}`}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={styles.connectionLine}
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
              src="/Dhanvi_reveal_hero_image.jpeg"
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
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            className={styles.letterItem}
            onMouseEnter={() => {
              handleMouseEnter();
              setHoveredNode(i);
            }}
            onMouseLeave={() => setHoveredNode(null)}
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
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className={styles.nodeAnchor}
            data-index={i}
            aria-label={`Navigate to ${node.label} section`}
            onClick={(e) => handleNodeClick(e, node, i)}
            onMouseEnter={() => {
              handleMouseEnter();
              setHoveredNode(i);
            }}
            onMouseLeave={() => {
              if (!isPausedForZoomRef.current) setHoveredNode(null);
            }}
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

        {/* ── Editorial Tagline with Social Links ── */}
        <div ref={taglineRef} className={styles.tagline}>
          <div className={styles.taglineSocialGroup}>
            <a
              href="https://github.com/DhanviND360"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.taglineSocialIcon} ${styles.githubIcon}`}
              aria-label="GitHub profile: DhanviND360"
              title="GitHub: DhanviND360"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className={styles.taglineSocialTooltip}>GitHub: DhanviND360</span>
            </a>

            <a
              href="https://www.linkedin.com/in/narra-dhanvi-65a63b2b9"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.taglineSocialIcon} ${styles.linkedinIcon}`}
              aria-label="LinkedIn profile: narra-dhanvi-65a63b2b9"
              title="LinkedIn: narra-dhanvi-65a63b2b9"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className={styles.taglineSocialTooltip}>LinkedIn</span>
            </a>
          </div>

          <div className={styles.taglineContent}>
            <span className={styles.taglineWord}>Builder</span>
            <span className={styles.taglineDot}>•</span>
            <span className={styles.taglineWord}>Creator</span>
            <span className={styles.taglineDot}>•</span>
            <span className={styles.taglineWord}>Engineer</span>
          </div>

          <div className={styles.taglineSocialGroup}>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=narra.dhanvi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.taglineSocialIcon} ${styles.gmailIcon}`}
              aria-label="Gmail / Email contact: narra.dhanvi@gmail.com"
              title="Open Gmail: narra.dhanvi@gmail.com"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              <span className={styles.taglineSocialTooltip}>Gmail</span>
            </a>

            <a
              href="https://x.com/codelox_13"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.taglineSocialIcon} ${styles.twitterIcon}`}
              aria-label="X (Twitter) profile: @codelox_13"
              title="X: @codelox_13"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className={styles.taglineSocialTooltip}>X: @codelox_13</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Planetary Warp & Flash FX Overlay ── */}
      {isWarpActive && (
        <PlanetaryWarpOverlay
          originX={warpOrigin.x}
          originY={warpOrigin.y}
          isZoomingIn={isZoomingIn}
          onFlashPeak={handleFlashPeak}
          onComplete={handleWarpComplete}
        />
      )}

      {/* ── Active Individual Node Landing Page ── */}
      {activePageNode && activePageIndex !== null && (
        <NodePageContainer
          nodeIndex={activePageIndex}
          nodeLabel={activePageNode.label}
          nodeDescription={activePageNode.description}
          onBack={handleBackToOrbit}
        >
          {renderActivePageContent()}
        </NodePageContainer>
      )}
    </div>
  );
}
