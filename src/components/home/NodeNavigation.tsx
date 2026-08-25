'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Node Navigation (Orbital Graph System)
   
   Obsidian-like interactive graph with orbital mechanics:
   
   - DHANVI is the SUN at viewport center
   - Navigation nodes are PLANETS that orbit the sun
   - Each node has a unique orbital radius and speed
   - Nodes revolve smoothly via GSAP-driven animation
   - SVG connection lines draw from center to each node
   - Nodes are interactive:
     • Hover: glow, enlarge, show description
     • Drag: grab and throw — node breaks orbit temporarily,
       then elastically snaps back with momentum
     • Click: navigate to section
   - Orbital rings show faint dashed orbit tracks
   
   All positioning is computed in JavaScript (not CSS).
   GSAP handles the smooth revolution with requestAnimationFrame.
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import styles from '@/styles/home.module.css';
import { navigationNodes } from '@/data/portfolio';

/* ── Orbital Configuration ── */
interface OrbitalConfig {
  /** Orbit radius (px from center) — responsive */
  radius: number;
  /** Revolution speed (radians per second) */
  speed: number;
  /** Starting angle (radians) */
  startAngle: number;
  /** Orbit tilt — slight ellipse factor (1 = circle, < 1 = squished) */
  eccentricity: number;
  /** Orbit tilt angle (radians) — rotates the ellipse */
  tilt: number;
}

const ORBITAL_CONFIGS: OrbitalConfig[] = [
  { radius: 220, speed: 0.18,  startAngle: 0,                eccentricity: 0.85, tilt: 0.1 },
  { radius: 280, speed: 0.12,  startAngle: Math.PI * 0.55,   eccentricity: 0.9,  tilt: -0.15 },
  { radius: 190, speed: 0.22,  startAngle: Math.PI * 1.2,    eccentricity: 0.8,  tilt: 0.2 },
  { radius: 310, speed: 0.09,  startAngle: Math.PI * 1.7,    eccentricity: 0.88, tilt: -0.05 },
];

/** Scale orbit radii for smaller viewports */
function getResponsiveRadius(baseRadius: number): number {
  if (typeof window === 'undefined') return baseRadius;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const minDim = Math.min(vw, vh);
  // Scale down for small screens, cap at base for large
  const scale = Math.min(1, minDim / 900);
  return baseRadius * Math.max(scale, 0.45);
}

export default function NodeNavigation() {
  const containerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const ringRefs = useRef<(SVGEllipseElement | null)[]>([]);

  // Orbital state
  const anglesRef = useRef<number[]>(ORBITAL_CONFIGS.map(c => c.startAngle));
  const radiiRef = useRef<number[]>(ORBITAL_CONFIGS.map(c => c.radius));
  const revolutionRef = useRef<gsap.core.Tween | null>(null);

  // Drag state
  const draggingRef = useRef<number | null>(null);
  const dragOffsetRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const dragPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  const lastMouseRef = useRef<{ x: number; y: number; t: number }>({ x: 0, y: 0, t: 0 });

  // Hover state for connection line highlighting
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  /** Get center of the viewport */
  const getCenter = useCallback(() => {
    if (!containerRef.current) return { cx: 0, cy: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { cx: rect.width / 2, cy: rect.height / 2 };
  }, []);

  /** Calculate node position on its orbit */
  const getOrbitalPos = useCallback((index: number, angle: number) => {
    const config = ORBITAL_CONFIGS[index];
    const radius = radiiRef.current[index];
    const { cx, cy } = getCenter();

    // Elliptical orbit
    const x = radius * Math.cos(angle);
    const y = radius * config.eccentricity * Math.sin(angle);

    // Apply orbit tilt rotation
    const cosT = Math.cos(config.tilt);
    const sinT = Math.sin(config.tilt);
    const rx = x * cosT - y * sinT;
    const ry = x * sinT + y * cosT;

    return { x: cx + rx, y: cy + ry };
  }, [getCenter]);

  /** Update all node + line positions for current angles */
  const updatePositions = useCallback(() => {
    const { cx, cy } = getCenter();

    navigationNodes.forEach((_, index) => {
      const nodeEl = nodeRefs.current[index];
      const lineEl = lineRefs.current[index];
      if (!nodeEl) return;

      let posX: number, posY: number;

      if (draggingRef.current === index) {
        // Dragged node uses drag position
        posX = dragPosRef.current.x;
        posY = dragPosRef.current.y;
      } else {
        // Orbiting node
        const pos = getOrbitalPos(index, anglesRef.current[index]);
        posX = pos.x;
        posY = pos.y;
      }

      // Position the node
      nodeEl.style.left = `${posX}px`;
      nodeEl.style.top = `${posY}px`;

      // Update SVG connection line
      if (lineEl) {
        lineEl.setAttribute('x1', String(cx));
        lineEl.setAttribute('y1', String(cy));
        lineEl.setAttribute('x2', String(posX));
        lineEl.setAttribute('y2', String(posY));
      }
    });
  }, [getCenter, getOrbitalPos]);

  /** Update orbital ring ellipses */
  const updateRings = useCallback(() => {
    const { cx, cy } = getCenter();

    ORBITAL_CONFIGS.forEach((config, index) => {
      const ringEl = ringRefs.current[index];
      if (!ringEl) return;

      const radius = radiiRef.current[index];
      ringEl.setAttribute('cx', String(cx));
      ringEl.setAttribute('cy', String(cy));
      ringEl.setAttribute('rx', String(radius));
      ringEl.setAttribute('ry', String(radius * config.eccentricity));
      // Apply tilt as SVG transform
      ringEl.setAttribute(
        'transform',
        `rotate(${(config.tilt * 180) / Math.PI} ${cx} ${cy})`
      );
    });
  }, [getCenter]);

  /** Main orbital animation loop */
  useEffect(() => {
    // Compute responsive radii
    radiiRef.current = ORBITAL_CONFIGS.map(c => getResponsiveRadius(c.radius));

    // Initial ring positions
    updateRings();

    // Create GSAP ticker for smooth orbital motion
    const ticker = () => {
      const dt = gsap.ticker.deltaRatio() / 60; // normalize to 60fps

      ORBITAL_CONFIGS.forEach((config, index) => {
        // Don't orbit if being dragged
        if (draggingRef.current === index) return;
        anglesRef.current[index] += config.speed * dt;
      });

      updatePositions();
    };

    gsap.ticker.add(ticker);

    // Entrance animation: nodes fade in from center with stagger
    const { cx, cy } = getCenter();
    navigationNodes.forEach((_, index) => {
      const nodeEl = nodeRefs.current[index];
      if (!nodeEl) return;

      // Start at center
      nodeEl.style.left = `${cx}px`;
      nodeEl.style.top = `${cy}px`;
      nodeEl.style.opacity = '0';
      nodeEl.style.transform = 'translate(-50%, -50%) scale(0.3)';

      // Animate outward to orbit
      gsap.to(nodeEl, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 0.3 + index * 0.15,
        ease: 'elastic.out(1, 0.6)',
        onUpdate: () => {
          // Transform includes translate(-50%, -50%), override scale separately
          const currentScale = gsap.getProperty(nodeEl, 'scale') as number;
          nodeEl.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
        },
        onComplete: () => {
          nodeEl.style.transform = 'translate(-50%, -50%)';
        },
      });
    });

    // Handle resize
    const handleResize = () => {
      radiiRef.current = ORBITAL_CONFIGS.map(c => getResponsiveRadius(c.radius));
      updateRings();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('resize', handleResize);
    };
  }, [getCenter, getOrbitalPos, updatePositions, updateRings]);

  /* ── Drag Handlers (Obsidian-like grab and throw) ── */

  const handlePointerDown = useCallback((e: React.PointerEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    const nodeEl = nodeRefs.current[index];
    if (!nodeEl) return;

    // Capture pointer
    nodeEl.setPointerCapture(e.pointerId);

    // Mark as dragging
    draggingRef.current = index;
    nodeEl.classList.add(styles.nodeDragging);

    // Record current position
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;

    dragPosRef.current = { x: posX, y: posY };
    lastMouseRef.current = { x: posX, y: posY, t: performance.now() };
    velocityRef.current = { vx: 0, vy: 0 };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent, index: number) => {
    if (draggingRef.current !== index) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const posX = e.clientX - rect.left;
    const posY = e.clientY - rect.top;

    // Track velocity
    const now = performance.now();
    const dt = Math.max(now - lastMouseRef.current.t, 1);
    velocityRef.current = {
      vx: (posX - lastMouseRef.current.x) / dt * 16, // normalized to ~60fps frame
      vy: (posY - lastMouseRef.current.y) / dt * 16,
    };
    lastMouseRef.current = { x: posX, y: posY, t: now };

    dragPosRef.current = { x: posX, y: posY };
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent, index: number) => {
    if (draggingRef.current !== index) return;

    const nodeEl = nodeRefs.current[index];
    if (nodeEl) {
      nodeEl.releasePointerCapture(e.pointerId);
      nodeEl.classList.remove(styles.nodeDragging);
    }

    draggingRef.current = null;

    // Calculate the angle from center to the release position
    const { cx, cy } = getCenter();
    const relX = dragPosRef.current.x - cx;
    const relY = dragPosRef.current.y - cy;

    // Snap angle back to match current release position
    // (so the orbit continues from where the user dropped it)
    const config = ORBITAL_CONFIGS[index];

    // Reverse the tilt to get untilted coordinates
    const cosT = Math.cos(-config.tilt);
    const sinT = Math.sin(-config.tilt);
    const ux = relX * cosT - relY * sinT;
    const uy = relX * sinT + relY * cosT;

    // Calculate angle from ellipse equation
    const newAngle = Math.atan2(
      uy / (radiiRef.current[index] * config.eccentricity),
      ux / radiiRef.current[index]
    );

    anglesRef.current[index] = newAngle;

    // Add velocity influence to the orbital speed temporarily
    const speed = Math.sqrt(velocityRef.current.vx ** 2 + velocityRef.current.vy ** 2);
    if (speed > 0.5) {
      // Determine throw direction relative to orbit
      const tangentAngle = newAngle + Math.PI / 2;
      const throwAlignment =
        velocityRef.current.vx * Math.cos(tangentAngle) +
        velocityRef.current.vy * Math.sin(tangentAngle);

      // Temporarily boost orbital speed based on throw
      const speedMultiplier = { value: 1 + Math.sign(throwAlignment) * Math.min(speed * 0.3, 8) };

      gsap.to(speedMultiplier, {
        value: 1,
        duration: 2.5,
        ease: 'power3.out',
        onUpdate: () => {
          // Modify speed transiently during the tween
          const origSpeed = config.speed;
          ORBITAL_CONFIGS[index] = { ...config, speed: origSpeed * speedMultiplier.value };
        },
        onComplete: () => {
          ORBITAL_CONFIGS[index] = config; // restore original
        },
      });
    }
  }, [getCenter]);

  // Detect if mobile (no orbits on mobile)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    // Mobile: simple stacked layout, no orbits
    return (
      <nav className={styles.nodeContainer} aria-label="Portfolio navigation">
        {navigationNodes.map((node) => (
          <a
            key={node.id}
            id={node.id}
            href={node.href}
            className={styles.node}
            aria-label={`Navigate to ${node.label}`}
          >
            <span className={styles.nodeDot} />
            <span className={styles.nodeLabel}>{node.label}</span>
          </a>
        ))}
      </nav>
    );
  }

  return (
    <>
      {/* SVG canvas for connection lines and orbital rings */}
      <svg ref={svgRef} className={styles.orbitalCanvas}>
        {/* Orbital ring tracks (faint dashed ellipses) */}
        {ORBITAL_CONFIGS.map((_, index) => (
          <ellipse
            key={`ring-${index}`}
            ref={(el) => { ringRefs.current[index] = el; }}
            className={styles.orbitalRing}
          />
        ))}

        {/* Connection lines from center to each node */}
        {navigationNodes.map((_, index) => (
          <line
            key={`line-${index}`}
            ref={(el) => { lineRefs.current[index] = el; }}
            className={styles.orbitalLine}
            data-active={hoveredNode === index ? 'true' : 'false'}
          />
        ))}
      </svg>

      {/* Node planets */}
      <nav ref={containerRef} className={styles.nodeContainer} aria-label="Portfolio navigation">
        {navigationNodes.map((node, index) => (
          <a
            key={node.id}
            id={node.id}
            href={node.href}
            ref={(el) => { nodeRefs.current[index] = el; }}
            className={styles.node}
            aria-label={`Navigate to ${node.label}`}
            onPointerDown={(e) => handlePointerDown(e, index)}
            onPointerMove={(e) => handlePointerMove(e, index)}
            onPointerUp={(e) => handlePointerUp(e, index)}
            onPointerCancel={(e) => handlePointerUp(e, index)}
            onMouseEnter={() => setHoveredNode(index)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={(e) => {
              // Only navigate if not dragging (prevent click on drag release)
              if (velocityRef.current.vx !== 0 || velocityRef.current.vy !== 0) {
                const speed = Math.sqrt(velocityRef.current.vx ** 2 + velocityRef.current.vy ** 2);
                if (speed > 2) {
                  e.preventDefault();
                }
              }
            }}
          >
            <span className={styles.nodeDot}>
              <span className={styles.nodePulse} />
            </span>
            <span className={styles.nodeLabel}>{node.label}</span>
            <span className={styles.nodeDescription}>{node.description}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
