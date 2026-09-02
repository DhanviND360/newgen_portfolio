'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Planetary Warp Overlay
   Procedural warp speed graphics, motion blur streaks radiating
   from the clicked node, and minimalist white/cyan flash transition.
   ═══════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '@/styles/planetary-warp.module.css';

interface PlanetaryWarpOverlayProps {
  originX: number;
  originY: number;
  isZoomingIn: boolean;
  onFlashPeak: () => void;
  onComplete: () => void;
}

interface WarpRay {
  angle: number;
  innerDist: number;
  length: number;
  speed: number;
  width: number;
  color: string;
}

export default function PlanetaryWarpOverlay({
  originX,
  originY,
  isZoomingIn,
  onFlashPeak,
  onComplete,
}: PlanetaryWarpOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const edgeTunnelRef = useRef<HTMLDivElement>(null);
  const radialLinesRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Generate radial warp rays
    const NUM_RAYS = 120;
    const rays: WarpRay[] = [];
    const colors = [
      'rgba(255, 255, 255, 0.95)',
      'rgba(62, 220, 196, 0.9)',
      'rgba(0, 240, 255, 0.85)',
      'rgba(180, 255, 245, 0.75)',
    ];

    for (let i = 0; i < NUM_RAYS; i++) {
      const angle = (Math.PI * 2 * i) / NUM_RAYS + (Math.random() - 0.5) * 0.08;
      rays.push({
        angle,
        innerDist: 10 + Math.random() * 40,
        length: 20 + Math.random() * 80,
        speed: 8 + Math.random() * 16,
        width: 1 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Animation progress object driven by GSAP
    const fxState = {
      velocity: isZoomingIn ? 0.05 : 1.2,
      rayOpacity: isZoomingIn ? 0 : 0.8,
      blurIntensity: 0,
    };

    let animFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const v = fxState.velocity;
      const alpha = fxState.rayOpacity;

      if (alpha > 0.01) {
        ctx.save();
        ctx.lineCap = 'round';

        for (const ray of rays) {
          const cos = Math.cos(ray.angle);
          const sin = Math.sin(ray.angle);

          // Advance ray outward
          ray.innerDist += ray.speed * v;
          const currentLength = ray.length * (1 + v * 3.5);

          // If ray goes off screen, wrap back to near origin
          if (ray.innerDist > Math.max(width, height) * 1.2) {
            ray.innerDist = 10 + Math.random() * 30;
          }

          const x1 = originX + cos * ray.innerDist;
          const y1 = originY + sin * ray.innerDist;
          const x2 = originX + cos * (ray.innerDist + currentLength);
          const y2 = originY + sin * (ray.innerDist + currentLength);

          ctx.beginPath();
          ctx.strokeStyle = ray.color;
          ctx.globalAlpha = Math.min(1, alpha * (0.3 + v * 0.7));
          ctx.lineWidth = ray.width * (1 + v * 0.8);
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    // ── Master GSAP Transition Timeline ──
    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(animFrameId);
        onComplete();
      },
    });

    if (isZoomingIn) {
      // 1. Initial lock-on reticle at node coordinates
      if (reticleRef.current) {
        tl.fromTo(
          reticleRef.current,
          { opacity: 0, scale: 0.3 },
          { opacity: 0.9, scale: 1.2, duration: 0.25, ease: 'power2.out' },
          0
        );
        tl.to(
          reticleRef.current,
          { opacity: 0, scale: 3.5, duration: 0.45, ease: 'power3.in' },
          0.2
        );
      }

      // 2. Peripheral tunnel & motion line graphics accelerate
      if (edgeTunnelRef.current) {
        tl.to(edgeTunnelRef.current, { opacity: 0.85, duration: 0.45, ease: 'power2.in' }, 0.1);
      }
      if (radialLinesRef.current) {
        tl.to(radialLinesRef.current, { opacity: 0.7, duration: 0.4, ease: 'power3.in' }, 0.15);
      }

      // 3. Warp streak velocity explosion
      tl.to(
        fxState,
        {
          velocity: 4.8,
          rayOpacity: 1,
          duration: 0.65,
          ease: 'power3.in',
        },
        0.05
      );

      // 4. Minimalist Flash Burst at Apex (trigger onFlashPeak)
      tl.call(
        () => {
          onFlashPeak();
        },
        [],
        0.58
      );

      if (flashRef.current) {
        tl.fromTo(
          flashRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.16, ease: 'power4.in' },
          0.48
        );
        tl.to(
          flashRef.current,
          { opacity: 0, duration: 0.42, ease: 'power2.out' },
          0.66
        );
      }

      // 5. Fade out warp graphics as page reveals
      tl.to(
        fxState,
        {
          velocity: 0.2,
          rayOpacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.68
      );
      if (edgeTunnelRef.current) {
        tl.to(edgeTunnelRef.current, { opacity: 0, duration: 0.3 }, 0.68);
      }
      if (radialLinesRef.current) {
        tl.to(radialLinesRef.current, { opacity: 0, duration: 0.3 }, 0.68);
      }
    } else {
      // ── Reverse Zoom Out (Return to Orbit) ──
      if (flashRef.current) {
        tl.fromTo(
          flashRef.current,
          { opacity: 0 },
          { opacity: 0.85, duration: 0.15, ease: 'power3.in' },
          0
        );
        tl.call(() => onFlashPeak(), [], 0.15);
        tl.to(flashRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' }, 0.18);
      }

      tl.fromTo(
        fxState,
        { velocity: 3.0, rayOpacity: 0.8 },
        { velocity: 0, rayOpacity: 0, duration: 0.55, ease: 'power3.out' },
        0.1
      );
    }

    return () => {
      cancelAnimationFrame(animFrameId);
      tl.kill();
    };
  }, [originX, originY, isZoomingIn, onFlashPeak, onComplete]);

  return (
    <div
      className={styles.warpRoot}
      style={
        {
          '--warp-x': `${originX}px`,
          '--warp-y': `${originY}px`,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.warpCanvas} />
      <div ref={edgeTunnelRef} className={styles.edgeTunnel} />
      <div ref={radialLinesRef} className={styles.radialLinesOverlay} />
      {isZoomingIn && (
        <div
          ref={reticleRef}
          className={styles.focusReticle}
          style={{ left: `${originX}px`, top: `${originY}px` }}
        />
      )}
      <div ref={flashRef} className={styles.minimalFlash} />
    </div>
  );
}
