'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Creator Reveal Component
   
   4-Stage Cinematic Digitalization Engine:
   Stage 1: Clean Neon Text (Reference Image 4)
   Stage 2: Pixelated Fragmentation (Reference Image 1)
   Stage 3: Blue Voxelized / Extruded 3D Text (Reference Image 3)
   Stage 4: Extreme Forward Zoom into Tunnel of Glowing Data Particles (Reference Image 2)
   
   Smoothly transitions directly into the main homepage.
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import styles from '@/styles/creator-reveal.module.css';
import { prefersReducedMotion } from '@/systems/animationUtils';

interface CreatorRevealProps {
  isActive: boolean;
  onComplete: () => void;
}

interface VoxelPoint {
  x: number;
  y: number;
  origX: number;
  origY: number;
  relX: number;
  relY: number;
  dist: number;
  angle: number;
  driftX: number;
  driftY: number;
  size: number;
  color: string;
  glowColor: string;
  depthOffset: number;
  alpha: number;
}

interface TunnelParticle {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  speed: number;
  size: number;
  color: string;
}

export default function CreatorReveal({ isActive, onComplete }: CreatorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anamorphicStreakRef = useRef<HTMLDivElement>(null);
  const flashOverlayRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // GSAP Controlled Digitalization State
  const effectState = useRef({
    globalOpacity: 0,
    // Stage 1: Clean Neon Text
    stage1Neon: 0,
    stage1Glow: 0,
    // Stage 2: Pixelated Fragmentation
    stage2Fragmentation: 0,
    stage2Drift: 0,
    stage2Glitch: 0,
    // Stage 3: Blue 3D Voxel Extrusion
    stage3Extrusion: 0,
    // Stage 4: Extreme Forward Tunnel Zoom
    stage4Zoom: 1,
    stage4Speed: 0,
    stage4Tunnel: 0,
    // Climax Flash
    flashOpacity: 0,
  });

  const voxelsRef = useRef<VoxelPoint[]>([]);
  const tunnelParticlesRef = useRef<TunnelParticle[]>([]);

  // Sample "DHANVI" text into high-density voxel points
  const rasterizeText = useCallback((width: number, height: number) => {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return [];

    offCtx.clearRect(0, 0, width, height);

    // Font sizing tailored to match the bold aspect ratio in Reference Images
    const fontSize = Math.min(width * 0.165, 185);
    offCtx.font = `900 ${fontSize}px "Anton", "Arial Black", "Impact", sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillStyle = '#ffffff';

    const cx = width / 2;
    const cy = height / 2;
    offCtx.fillText('DHANVI', cx, cy);

    const imgData = offCtx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const points: VoxelPoint[] = [];

    // Dense grid step (4px for crisp block resolution)
    const step = width < 768 ? 4 : 5;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        const alpha = data[idx + 3];

        if (alpha > 120) {
          const relX = x - cx;
          const relY = y - cy;
          const dist = Math.sqrt(relX * relX + relY * relY);
          const angle = Math.atan2(relY, relX);

          // Authentic cyan-blue spectrum matching Reference Images
          const rand = Math.random();
          let color = '#00f0ff';
          let glowColor = 'rgba(0, 240, 255, 0.85)';

          if (rand > 0.72) {
            color = '#ffffff';
            glowColor = 'rgba(255, 255, 255, 0.95)';
          } else if (rand > 0.45) {
            color = '#62e8ff';
            glowColor = 'rgba(98, 232, 255, 0.8)';
          } else if (rand > 0.22) {
            color = '#00aaff';
            glowColor = 'rgba(0, 170, 255, 0.7)';
          } else {
            color = '#0066cc';
            glowColor = 'rgba(0, 102, 204, 0.55)';
          }

          points.push({
            x,
            y,
            origX: x,
            origY: y,
            relX,
            relY,
            dist,
            angle,
            driftX: (Math.random() - 0.5) * (160 + Math.random() * 220),
            driftY: (Math.random() - 0.5) * (45 + Math.random() * 75),
            size: step * 0.92,
            color,
            glowColor,
            depthOffset: (Math.random() - 0.5) * 35,
            alpha: alpha / 255,
          });
        }
      }
    }

    return points;
  }, []);

  // Initialize background data tunnel particles
  const initTunnelParticles = useCallback((width: number, height: number) => {
    const particles: TunnelParticle[] = [];
    const count = 800;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * Math.max(width, height) * 0.78;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.random() * 1200 + 50;

      const rand = Math.random();
      const color = rand > 0.65 ? '#ffffff' : rand > 0.3 ? '#00f0ff' : '#0066cc';

      particles.push({
        x,
        y,
        z,
        prevZ: z,
        speed: 14 + Math.random() * 24,
        size: 2.2 + Math.random() * 3.8,
        color,
      });
    }

    return particles;
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    voxelsRef.current = rasterizeText(width, height);
    tunnelParticlesRef.current = initTunnelParticles(width, height);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      voxelsRef.current = rasterizeText(width, height);
      tunnelParticlesRef.current = initTunnelParticles(width, height);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      const state = effectState.current;
      const cx = width / 2;
      const cy = height / 2;

      // Motion blur trailing in Stage 4 high speed zoom
      if (state.stage4Speed > 0.2) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      if (state.globalOpacity <= 0.01) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalAlpha = state.globalOpacity;

      // ═══════════════════════════════════════════════════════════════
      // STAGE 4: TUNNEL OF GLOWING DATA PARTICLES (Reference Image 2)
      // Extreme radial forward plunge into the center void
      // ═══════════════════════════════════════════════════════════════
      if (state.stage4Tunnel > 0.01) {
        ctx.save();
        ctx.globalAlpha = state.stage4Tunnel * state.globalOpacity;
        const fov = 360;
        const particles = tunnelParticlesRef.current;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.prevZ = p.z;
          p.z -= p.speed * (1 + state.stage4Speed * 4.2);

          if (p.z <= 20) {
            p.z = 1200;
            p.prevZ = 1200;
          }

          const k = fov / p.z;
          const prevK = fov / p.prevZ;

          const px = cx + p.x * k;
          const py = cy + p.y * k;
          const prevX = cx + p.x * prevK;
          const prevY = cy + p.y * prevK;

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const pSize = Math.max(1.2, p.size * k * 1.6);

            // Draw motion streak towards camera
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = pSize;
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 8;
            ctx.stroke();

            // Voxel tip
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px - pSize / 2, py - pSize / 2, pSize, pSize);
          }
        }
        ctx.restore();
      }

      // ═══════════════════════════════════════════════════════════════
      // STAGES 1, 2, 3 & 4 FOR "DHANVI" VOXEL ELEMENTS
      // ═══════════════════════════════════════════════════════════════
      const voxels = voxelsRef.current;
      const zoom = state.stage4Zoom;
      const frag = state.stage2Fragmentation;
      const drift = state.stage2Drift;
      const extrusion = state.stage3Extrusion;

      for (let i = 0; i < voxels.length; i++) {
        const v = voxels[i];

        // 1. Position calculation with Fragmentation drift & Forward Zoom
        let curRelX = v.relX + v.driftX * drift;
        let curRelY = v.relY + v.driftY * drift;

        // Stage 2 glitch jitter
        if (state.stage2Glitch > 0) {
          if (Math.random() < 0.14 * state.stage2Glitch) {
            curRelX += (Math.random() - 0.5) * 30;
          }
        }

        // Apply Extreme Stage 4 Forward Radial Zoom
        const vx = cx + curRelX * zoom;
        const vy = cy + curRelY * zoom;

        // Skip offscreen pixels during forward zoom
        if (vx < -250 || vx > width + 250 || vy < -250 || vy > height + 250) {
          continue;
        }

        const currentSize = Math.max(1.5, v.size * Math.min(zoom, 4.5));

        // ═══════════════════════════════════════════════════════════════
        // STAGE 3 & 4: 3D VOXEL EXTRUSION (Reference Image 3 & Image 2)
        // 3D block columns extending deeply along perspective rays
        // ═══════════════════════════════════════════════════════════════
        if (extrusion > 0.05 || state.stage4Speed > 0.05) {
          const rayDx = (vx - cx) * 0.0035;
          const rayDy = (vy - cy) * 0.0035;
          const depthLen = (extrusion * 80 + state.stage4Speed * 190 + v.depthOffset) * zoom;

          // Back extrusion coordinates
          const backX = vx - rayDx * depthLen;
          const backY = vy - rayDy * depthLen;

          // Side polygon with cobalt-cyan gradient
          ctx.beginPath();
          ctx.moveTo(backX, backY);
          ctx.lineTo(vx, vy);
          ctx.lineTo(vx + currentSize, vy);
          ctx.lineTo(backX + currentSize * 0.75, backY);
          ctx.closePath();

          const extGrad = ctx.createLinearGradient(backX, backY, vx, vy);
          extGrad.addColorStop(0, 'rgba(0, 18, 50, 0.12)');
          extGrad.addColorStop(0.5, 'rgba(0, 95, 200, 0.65)');
          extGrad.addColorStop(1, 'rgba(0, 240, 255, 0.95)');

          ctx.fillStyle = extGrad;
          ctx.fill();

          // Bottom extrusion flank
          ctx.beginPath();
          ctx.moveTo(backX, backY + currentSize * 0.75);
          ctx.lineTo(vx, vy + currentSize);
          ctx.lineTo(vx + currentSize, vy + currentSize);
          ctx.lineTo(backX + currentSize * 0.75, backY + currentSize * 0.75);
          ctx.closePath();

          ctx.fillStyle = 'rgba(0, 35, 95, 0.55)';
          ctx.fill();
        }

        // Horizontal motion blur trail for drifting voxels in Stage 2
        if (drift > 0.15 && Math.abs(v.driftX) > 40) {
          ctx.beginPath();
          ctx.moveTo(vx - v.driftX * drift * 0.45, vy);
          ctx.lineTo(vx, vy);
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
          ctx.lineWidth = currentSize * 0.6;
          ctx.stroke();
        }

        // ═══════════════════════════════════════════════════════════════
        // STAGE 1: CLEAN NEON TEXT (Reference Image 4) & Voxel Front Face
        // ═══════════════════════════════════════════════════════════════
        ctx.save();
        ctx.fillStyle = v.color;
        ctx.shadowColor = v.glowColor;
        ctx.shadowBlur = state.stage1Glow * 18 + 6;

        if (frag > 0.08) {
          // Discrete pixel block cubes (Stage 2)
          ctx.fillRect(vx - currentSize / 2, vy - currentSize / 2, currentSize, currentSize);
        } else {
          // Solid clean neon rasterization (Stage 1)
          ctx.fillRect(vx - currentSize * 0.55, vy - currentSize * 0.55, currentSize * 1.1, currentSize * 1.1);
        }

        // Brilliant white specular core center
        if (state.stage1Glow > 0.35 || state.stage3Extrusion > 0.4) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(
            vx - currentSize * 0.25,
            vy - currentSize * 0.25,
            currentSize * 0.5,
            currentSize * 0.5
          );
        }
        ctx.restore();
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isActive, rasterizeText, initTunnelParticles]);

  // Master Timeline for the 4 Stages
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Reduced motion fallback
      if (prefersReducedMotion()) {
        gsap.set(containerRef.current, { opacity: 1 });
        effectState.current.globalOpacity = 1;
        effectState.current.stage1Glow = 1;
        tl.to({}, { duration: 2.5 });
        tl.call(() => onComplete());
        return;
      }

      // Initial States
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(anamorphicStreakRef.current, { opacity: 0, scaleX: 0.1 });
      gsap.set(flashOverlayRef.current, { opacity: 0 });

      const state = effectState.current;

      // ═══════════════════════════════════════════════════════════════
      // STAGE 1: CLEAN NEON TEXT (Reference Image 4) (0.0s - 1.8s)
      // Crisp, pristine cyan-white glowing typography
      // ═══════════════════════════════════════════════════════════════
      tl.to(state, {
        globalOpacity: 1,
        stage1Neon: 1,
        stage1Glow: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.1);

      // Anamorphic horizontal flare beam flashes across "DHANVI"
      tl.fromTo(
        anamorphicStreakRef.current,
        { opacity: 0, scaleX: 0.05, scaleY: 0.5 },
        { opacity: 1, scaleX: 1.0, scaleY: 1.2, duration: 0.45, ease: 'power2.out' },
        0.2
      ).to(
        anamorphicStreakRef.current,
        { opacity: 0.35, scaleY: 0.8, duration: 0.8, ease: 'power1.out' },
        0.65
      );

      // ═══════════════════════════════════════════════════════════════
      // STAGE 2: PIXELATED FRAGMENTATION (Reference Image 1) (1.8s - 3.8s)
      // Disintegrates into discrete floating square pixel blocks with light streaks
      // ═══════════════════════════════════════════════════════════════
      tl.to(state, {
        stage2Fragmentation: 1,
        stage2Drift: 0.55,
        stage2Glitch: 1,
        stage1Glow: 1.4,
        duration: 1.8,
        ease: 'power2.inOut',
      }, 1.8);

      tl.to(anamorphicStreakRef.current, {
        opacity: 0.75,
        scaleY: 1.6,
        duration: 0.5,
        ease: 'power2.out',
      }, 2.2);

      // ═══════════════════════════════════════════════════════════════
      // STAGE 3: BLUE VOXELIZED / 3D EXTRUDED TEXT (Reference Image 3) (3.8s - 6.0s)
      // 3D block columns extending deeply along perspective rays
      // ═══════════════════════════════════════════════════════════════
      tl.to(state, {
        stage3Extrusion: 1.0,
        stage2Drift: 0.22, // consolidate back into solid 3D voxel structure
        stage2Glitch: 0.2,
        stage1Glow: 1.8,
        duration: 2.0,
        ease: 'power3.out',
      }, 3.8);

      // ═══════════════════════════════════════════════════════════════
      // STAGE 4: EXTREME FORWARD ZOOM INTO PARTICLE TUNNEL (Reference Image 2)
      // Hyper-speed radial warp dive into glowing data tunnel (6.0s - 8.2s)
      // ═══════════════════════════════════════════════════════════════
      tl.to(state, {
        stage4Tunnel: 1.0,
        stage4Speed: 1.0,
        stage4Zoom: 22.0, // Extreme forward camera plunge
        stage3Extrusion: 4.0,
        duration: 2.2,
        ease: 'power4.in',
      }, 6.0);

      // Anamorphic horizontal flare expands to full screen width
      tl.to(anamorphicStreakRef.current, {
        opacity: 1,
        scaleY: 8.0,
        duration: 0.9,
        ease: 'power3.in',
      }, 6.8);

      // ═══════════════════════════════════════════════════════════════
      // CLIMAX FLASH & SEAMLESS TRANSITION INTO MAIN HOMEPAGE (8.0s - 8.6s)
      // ═══════════════════════════════════════════════════════════════
      tl.to(flashOverlayRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      }, 7.9);

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.45,
        ease: 'power3.inOut',
      }, 8.15);
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className={styles.revealRoot}
      id="creator-reveal-sequence"
      role="region"
      aria-label="DHANVI Creator Reveal - 4-Stage Digitalization Sequence"
    >
      {/* ── CRT / Cyber Scanline Texture ── */}
      <div className={styles.scanlines} />

      {/* ── Vignette & Radial Depth Mask ── */}
      <div className={styles.vignette} />

      {/* ── Anamorphic Horizontal Flare Beam ── */}
      <div ref={anamorphicStreakRef} className={styles.anamorphicStreak} />

      {/* ── 4-STAGE DIGITALIZATION CANVAS LAYER ── */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* ── Hyperdrive Climax Flash Overlay ── */}
      <div ref={flashOverlayRef} className={styles.flashOverlay} />
    </div>
  );
}
