'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Creator Reveal Component
   
   Seamless 3-Act Cinematic Finale:
   ACT 1: "Wanna meet the CREATOR?"
          Display typography fades in + authentic neon starter
          flicker, dropout, electrical sparks, and ignition strike.
   ACT 2: Letter-by-letter DHANVI Name Reveal
          Question scrolls up as unlit wireframe letters glide in.
          Sequential neon ignition (D → H → A → N → V → I) followed
          by a collective high-voltage power surge & aura bloom.
   ACT 3: ASCII Magic Digitalization Engine
          Seamless hand-off to real-time ASCII cipher matrix:
          - Stage 1: Clean Neon ASCII Matrix Typography
          - Stage 2: Cyberpunk ASCII Fragmentation & Cipher Drift
          - Stage 3: 3D Holographic ASCII Perspective Extrusion
          - Stage 4: Extreme Forward Warp Zoom into ASCII Tunnel
          Climax flash & seamless transition into Home Page.
   ═══════════════════════════════════════════════════════════════ */

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import styles from '@/styles/creator-reveal.module.css';
import {
  createPhaseTimeline,
  safeDuration,
  safeEase,
  EASE,
  prefersReducedMotion,
} from '@/systems/animationUtils';

interface CreatorRevealProps {
  isActive: boolean;
  onComplete: () => void;
}

const NAME_LETTERS = ['D', 'H', 'A', 'N', 'V', 'I'];

// ASCII Glyph Palettes
const ASCII_DENSE = ['#', '@', '%', '&', 'W', 'M', 'X', '8', '0', '$'];
const ASCII_MID = ['*', '+', '=', 'Z', 'Y', '<', '>', '/', '{', '}', '[', ']'];
const ASCII_LIGHT = [':', '-', '~', '^', '1', '!', '.', '`'];
const MATRIX_CIPHER = ['0', '1', 'X', 'F', 'A', '9', '7', '4', '3', '0x', '§', 'Δ', 'λ', '>', '<', '#', '*'];
const ASCII_TUNNEL_GLYPHS = ['0', '1', '>', '<', '//', '::', '0x', '$', '#', '*', '+', '[]', '~'];

interface AsciiChar {
  char: string;
  baseChar: string;
  origX: number;
  origY: number;
  relX: number;
  relY: number;
  driftX: number;
  driftY: number;
  fontSize: number;
  color: string;
  glowColor: string;
  depthOffset: number;
  alpha: number;
  shimmerTimer: number;
  shimmerSpeed: number;
}

interface AsciiTunnelParticle {
  char: string;
  x: number;
  y: number;
  z: number;
  prevZ: number;
  speed: number;
  fontSize: number;
  color: string;
}

export default function CreatorReveal({ isActive, onComplete }: CreatorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Act 1: Question refs
  const questionSectionRef = useRef<HTMLDivElement>(null);
  const questionLineRef = useRef<HTMLDivElement>(null);
  const questionAccentRef = useRef<HTMLDivElement>(null);
  const neonAuraRef = useRef<HTMLDivElement>(null);
  const neonTextRef = useRef<HTMLSpanElement>(null);

  // Act 2: Name refs
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const letterBaseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letterCyanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nameGlowRef = useRef<HTMLDivElement>(null);

  // Act 3: Digitalization Canvas & VFX refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anamorphicStreakRef = useRef<HTMLDivElement>(null);
  const flashOverlayRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // GSAP Controlled Digitalization State
  const effectState = useRef({
    globalOpacity: 0,
    // Stage 1: Clean Neon ASCII Matrix
    stage1Neon: 0,
    stage1Glow: 0,
    // Stage 2: ASCII Fragmentation & Shuffling
    stage2Fragmentation: 0,
    stage2Drift: 0,
    stage2Glitch: 0,
    // Stage 3: 3D Holographic ASCII Extrusion
    stage3Extrusion: 0,
    // Stage 4: Extreme Forward ASCII Warp Zoom
    stage4Zoom: 1,
    stage4Speed: 0,
    stage4Tunnel: 0,
  });

  const asciiCharsRef = useRef<AsciiChar[]>([]);
  const tunnelParticlesRef = useRef<AsciiTunnelParticle[]>([]);

  // Sample "DHANVI" text into high-performance ASCII glyphs
  const rasterizeText = useCallback((width: number, height: number) => {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return [];

    offCtx.clearRect(0, 0, width, height);

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
    const chars: AsciiChar[] = [];

    // Monospace step size: fast, light, and perfectly spaced
    const stepX = width < 768 ? 7 : 8;
    const stepY = width < 768 ? 11 : 12;
    const charFontSize = width < 768 ? 10 : 12;

    for (let y = 0; y < height; y += stepY) {
      for (let x = 0; x < width; x += stepX) {
        const idx = (y * width + x) * 4;
        const alpha = data[idx + 3];

        if (alpha > 85) {
          const relX = x - cx;
          const relY = y - cy;

          // Select ASCII glyph by pixel density
          let baseChar = '#';
          if (alpha > 220) {
            baseChar = ASCII_DENSE[Math.floor(Math.random() * ASCII_DENSE.length)];
          } else if (alpha > 150) {
            baseChar = ASCII_MID[Math.floor(Math.random() * ASCII_MID.length)];
          } else {
            baseChar = ASCII_LIGHT[Math.floor(Math.random() * ASCII_LIGHT.length)];
          }

          // Same authentic cyan-blue-white spectrum
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

          chars.push({
            char: baseChar,
            baseChar,
            origX: x,
            origY: y,
            relX,
            relY,
            driftX: (Math.random() - 0.5) * (180 + Math.random() * 240),
            driftY: (Math.random() - 0.5) * (50 + Math.random() * 80),
            fontSize: charFontSize,
            color,
            glowColor,
            depthOffset: (Math.random() - 0.5) * 40,
            alpha: alpha / 255,
            shimmerTimer: Math.random() * 30,
            shimmerSpeed: 3 + Math.floor(Math.random() * 6),
          });
        }
      }
    }

    return chars;
  }, []);

  // Initialize ASCII background data tunnel
  const initTunnelParticles = useCallback((width: number, height: number) => {
    const particles: AsciiTunnelParticle[] = [];
    const count = 450; // Optimized count for buttery 60-120fps

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * Math.max(width, height) * 0.78;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = Math.random() * 1200 + 50;

      const rand = Math.random();
      const color = rand > 0.65 ? '#ffffff' : rand > 0.3 ? '#00f0ff' : '#0066cc';
      const char = ASCII_TUNNEL_GLYPHS[Math.floor(Math.random() * ASCII_TUNNEL_GLYPHS.length)];

      particles.push({
        char,
        x,
        y,
        z,
        prevZ: z,
        speed: 15 + Math.random() * 26,
        fontSize: 11 + Math.random() * 6,
        color,
      });
    }

    return particles;
  }, []);

  // Main Canvas Render Loop (ASCII Magic Digitalization Engine)
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    asciiCharsRef.current = rasterizeText(width, height);
    tunnelParticlesRef.current = initTunnelParticles(width, height);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      asciiCharsRef.current = rasterizeText(width, height);
      tunnelParticlesRef.current = initTunnelParticles(width, height);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      const state = effectState.current;
      const cx = width / 2;
      const cy = height / 2;

      // Motion blur trailing in Stage 4 high speed zoom
      if (state.stage4Speed > 0.2) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      if (state.globalOpacity <= 0.005) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.save();
      ctx.globalAlpha = state.globalOpacity;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // ═══════════════════════════════════════════════════════════════
      // STAGE 4: TUNNEL OF GLOWING ASCII DATA STREAMS
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
            // Speed streak ray
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = Math.max(1, 1.8 * k);
            ctx.stroke();

            // Glowing ASCII glyph at particle head
            const pFontSize = Math.max(9, Math.min(p.fontSize * k * 1.5, 36));
            ctx.font = `bold ${pFontSize}px "JetBrains Mono", "Fira Code", monospace`;
            ctx.fillStyle = p.color;
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 6;
            ctx.fillText(p.char, px, py);
          }
        }
        ctx.restore();
      }

      // ═══════════════════════════════════════════════════════════════
      // ASCII MAGIC GLYPHS FOR "DHANVI" (STAGES 1, 2, 3 & 4)
      // ═══════════════════════════════════════════════════════════════
      const chars = asciiCharsRef.current;
      const zoom = state.stage4Zoom;
      const frag = state.stage2Fragmentation;
      const drift = state.stage2Drift;
      const extrusion = state.stage3Extrusion;
      const glitch = state.stage2Glitch;

      for (let i = 0; i < chars.length; i++) {
        const v = chars[i];

        // 1. Position calculation with Drift & Zoom
        let curRelX = v.relX + v.driftX * drift;
        let curRelY = v.relY + v.driftY * drift;

        // Stage 2 ASCII glitch jitter
        if (glitch > 0) {
          if (Math.random() < 0.12 * glitch) {
            curRelX += (Math.random() - 0.5) * 28;
          }
        }

        const vx = cx + curRelX * zoom;
        const vy = cy + curRelY * zoom;

        // Skip offscreen during extreme zoom
        if (vx < -150 || vx > width + 150 || vy < -150 || vy > height + 150) {
          continue;
        }

        // 2. ASCII Character Cycling / Shimmer (ASCII Magic)
        v.shimmerTimer++;
        if (frag > 0.05) {
          // In fragmentation: rapidly cycle through cipher matrix characters
          if (v.shimmerTimer % (glitch > 0.5 ? 2 : 4) === 0) {
            v.char = MATRIX_CIPHER[Math.floor(Math.random() * MATRIX_CIPHER.length)];
          }
        } else {
          // In clean neon state: subtle matrix shimmer on random glyphs
          if (v.shimmerTimer % v.shimmerSpeed === 0) {
            if (Math.random() < 0.04) {
              v.char = MATRIX_CIPHER[Math.floor(Math.random() * MATRIX_CIPHER.length)];
            } else {
              v.char = v.baseChar;
            }
          }
        }

        const scaledFontSize = Math.max(8, Math.min(v.fontSize * zoom, 110));

        // ═══════════════════════════════════════════════════════════════
        // STAGE 3 & 4: 3D HOLOGRAPHIC ASCII PERSPECTIVE EXTRUSION
        // Monospace characters receding deeply along perspective rays
        // ═══════════════════════════════════════════════════════════════
        if (extrusion > 0.05 || state.stage4Speed > 0.05) {
          const rayDx = (vx - cx) * 0.0035;
          const rayDy = (vy - cy) * 0.0035;
          const depthLen = (extrusion * 75 + state.stage4Speed * 180 + v.depthOffset) * zoom;

          // Back depth coordinates
          const backX1 = vx - rayDx * (depthLen * 0.45);
          const backY1 = vy - rayDy * (depthLen * 0.45);
          const backX2 = vx - rayDx * depthLen;
          const backY2 = vy - rayDy * depthLen;

          // Connecting holographic perspective ray
          ctx.beginPath();
          ctx.moveTo(backX2, backY2);
          ctx.lineTo(vx, vy);
          ctx.strokeStyle = 'rgba(0, 170, 255, 0.2)';
          ctx.lineWidth = Math.max(0.8, 1.2 * zoom);
          ctx.stroke();

          // Mid-depth extruded ASCII character (cobalt-cyan)
          ctx.save();
          ctx.font = `bold ${Math.max(6, scaledFontSize * 0.8)}px "JetBrains Mono", "Fira Code", monospace`;
          ctx.fillStyle = 'rgba(0, 140, 240, 0.55)';
          ctx.shadowColor = '#0066cc';
          ctx.shadowBlur = 4;
          ctx.fillText(v.char, backX1, backY1);

          // Deepest extruded ASCII character (deep cobalt echo)
          ctx.font = `bold ${Math.max(5, scaledFontSize * 0.65)}px "JetBrains Mono", "Fira Code", monospace`;
          ctx.fillStyle = 'rgba(0, 50, 160, 0.35)';
          ctx.shadowBlur = 0;
          ctx.fillText(':', backX2, backY2);
          ctx.restore();
        }

        // Horizontal phosphor trails for drifting characters in Stage 2
        if (drift > 0.15 && Math.abs(v.driftX) > 40) {
          ctx.save();
          ctx.font = `${scaledFontSize * 0.8}px "JetBrains Mono", monospace`;
          ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
          ctx.fillText('-', vx - v.driftX * drift * 0.4, vy);
          ctx.restore();
        }

        // ═══════════════════════════════════════════════════════════════
        // STAGE 1 & 2: MAIN GLOWING ASCII CHARACTER
        // ═══════════════════════════════════════════════════════════════
        ctx.save();
        ctx.font = `bold ${scaledFontSize}px "JetBrains Mono", "Fira Code", monospace`;
        ctx.fillStyle = v.color;
        ctx.shadowColor = v.glowColor;
        ctx.shadowBlur = state.stage1Glow * 14 + 5;
        ctx.fillText(v.char, vx, vy);

        // Brilliant white specular core highlight on bright characters
        if (v.color === '#ffffff' && state.stage1Glow > 0.4) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 8;
          ctx.fillText(v.char, vx, vy);
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

  // Master Timeline: Act 1 (Question) → Act 2 (Name Reveal) → Act 3 (ASCII Digitalization)
  const buildTimeline = useCallback(() => {
    if (!containerRef.current) return null;

    const tl = createPhaseTimeline({
      onComplete: () => {
        onComplete();
      },
    });

    // ── Reduced motion fallback ──
    if (prefersReducedMotion()) {
      tl.set(containerRef.current, { opacity: 1 });
      tl.set(questionSectionRef.current, { opacity: 0 });
      tl.set(nameContainerRef.current, { opacity: 1, y: 0 });
      letterCyanRefs.current.forEach((ref) => {
        if (ref) {
          tl.set(ref, {
            opacity: 1,
            color: '#e8fbf7',
            webkitTextStroke: '1.2px #3edcc4',
            textShadow:
              '0 0 2.5px #ffffff, 0 0 6px #3edcc4, 0 0 14px rgba(62, 220, 196, 0.55)',
          });
        }
      });
      tl.to({}, { duration: 2.5 });
      tl.call(() => onComplete());
      return tl;
    }

    const state = effectState.current;

    // ═══════════════════════════════════════════════════
    // INITIAL STATES
    // ═══════════════════════════════════════════════════
    tl.set(containerRef.current, { opacity: 1 });
    tl.set(anamorphicStreakRef.current, { opacity: 0, scaleX: 0.1 });
    tl.set(flashOverlayRef.current, { opacity: 0 });

    // Question: unlit / hidden
    tl.set(questionLineRef.current, { opacity: 0, y: 20 });
    tl.set(questionAccentRef.current, { opacity: 0, y: 15, scale: 0.98 });
    if (neonAuraRef.current) {
      tl.set(neonAuraRef.current, { opacity: 0, scale: 0.85 });
    }
    if (neonTextRef.current) {
      tl.set(neonTextRef.current, {
        opacity: 0,
        color: 'rgba(62, 220, 196, 0.2)',
        webkitTextStroke: '1.5px rgba(62, 220, 196, 0.25)',
        textShadow: '0 0 0px rgba(62, 220, 196, 0)',
      });
    }

    // Name container: unlit, initially positioned below center
    tl.set(nameContainerRef.current, { opacity: 0, y: 110 });
    letterCyanRefs.current.forEach((ref) => {
      if (ref) {
        tl.set(ref, {
          opacity: 0,
          color: 'rgba(62, 220, 196, 0.15)',
          webkitTextStroke: '1.2px rgba(62, 220, 196, 0.2)',
          textShadow: '0 0 0px rgba(62, 220, 196, 0)',
        });
      }
    });
    letterBaseRefs.current.forEach((ref) => {
      if (ref) {
        tl.set(ref, {
          webkitTextStrokeColor: 'rgba(62, 220, 196, 0.18)',
        });
      }
    });
    tl.set(nameGlowRef.current, { opacity: 0, scale: 0.9 });

    let cursor = 0.25;

    // ═══════════════════════════════════════════════════
    // ACT 1: "Wanna meet the CREATOR?"
    // ═══════════════════════════════════════════════════

    // "Wanna meet the" rises smoothly
    tl.to(
      questionLineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: safeDuration(0.7),
        ease: safeEase(EASE.cinematic),
      },
      cursor
    );

    cursor += 0.45;

    // "CREATOR?" container appears as dim unlit silhouette
    tl.to(
      questionAccentRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: safeDuration(0.3),
        ease: safeEase('power2.out'),
      },
      cursor
    );

    tl.to(
      neonTextRef.current,
      {
        opacity: 0.3,
        color: 'rgba(62, 220, 196, 0.2)',
        webkitTextStroke: '1.5px rgba(62, 220, 196, 0.25)',
        textShadow: '0 0 0px rgba(62, 220, 196, 0)',
        duration: safeDuration(0.3),
        ease: safeEase('power2.out'),
      },
      cursor
    );

    cursor += 0.35;

    // ── Neon Sign Electrical Ignition Sequence ──
    // Spark 1
    const s1 = cursor;
    tl.to(
      neonTextRef.current,
      {
        opacity: 0.9,
        color: '#e0fffa',
        webkitTextStroke: '1.5px #3edcc4',
        textShadow: '0 0 8px #ffffff, 0 0 20px #3edcc4, 0 0 45px rgba(62, 220, 196, 0.65)',
        duration: safeDuration(0.04),
        ease: 'none',
      },
      s1
    );
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, { opacity: 0.45, duration: safeDuration(0.04), ease: 'none' }, s1);
    }

    // Cut 1: Transformer dropout
    const c1 = s1 + 0.04;
    tl.to(
      neonTextRef.current,
      {
        opacity: 0.15,
        color: 'rgba(62, 220, 196, 0.15)',
        webkitTextStroke: '1.5px rgba(62, 220, 196, 0.2)',
        textShadow: '0 0 0px rgba(62, 220, 196, 0)',
        duration: safeDuration(0.04),
        ease: 'none',
      },
      c1
    );
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, { opacity: 0, duration: safeDuration(0.04), ease: 'none' }, c1);
    }

    // Spark 2: Second weak stutter spark
    const s2 = c1 + 0.06;
    tl.to(
      neonTextRef.current,
      {
        opacity: 0.65,
        color: '#c4f8ef',
        webkitTextStroke: '1.5px #3edcc4',
        textShadow: '0 0 6px #ffffff, 0 0 16px #3edcc4, 0 0 30px rgba(62, 220, 196, 0.4)',
        duration: safeDuration(0.04),
        ease: 'none',
      },
      s2
    );
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, { opacity: 0.3, duration: safeDuration(0.04), ease: 'none' }, s2);
    }

    // Cut 2
    const c2 = s2 + 0.04;
    tl.to(
      neonTextRef.current,
      {
        opacity: 0.1,
        color: 'rgba(62, 220, 196, 0.12)',
        webkitTextStroke: '1.5px rgba(62, 220, 196, 0.18)',
        textShadow: '0 0 0px rgba(62, 220, 196, 0)',
        duration: safeDuration(0.04),
        ease: 'none',
      },
      c2
    );
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, { opacity: 0, duration: safeDuration(0.04), ease: 'none' }, c2);
    }

    // Spark 3: Rapid double-stutter before full ionization
    const s3 = c2 + 0.05;
    tl.to(
      neonTextRef.current,
      {
        opacity: 0.95,
        color: '#f0fffd',
        webkitTextStroke: '1.8px #3edcc4',
        textShadow: '0 0 10px #ffffff, 0 0 25px #3edcc4, 0 0 50px rgba(62, 220, 196, 0.75)',
        duration: safeDuration(0.05),
        ease: 'none',
      },
      s3
    );
    if (neonAuraRef.current) {
      tl.to(neonAuraRef.current, { opacity: 0.6, duration: safeDuration(0.05), ease: 'none' }, s3);
    }

    // Micro dip
    const s3dip = s3 + 0.05;
    tl.to(
      neonTextRef.current,
      {
        opacity: 0.4,
        color: '#7de2d3',
        webkitTextStroke: '1.5px #3edcc4',
        textShadow: '0 0 6px rgba(62, 220, 196, 0.35)',
        duration: safeDuration(0.03),
        ease: 'none',
      },
      s3dip
    );

    // Strike: Full Voltage Surge Strike!
    const strike = s3dip + 0.03;
    tl.to(
      neonTextRef.current,
      {
        opacity: 1,
        color: '#ffffff',
        webkitTextStroke: '2px #3edcc4',
        textShadow:
          '0 0 6px #ffffff, 0 0 15px #3edcc4, 0 0 30px #3edcc4, 0 0 60px #3edcc4, 0 0 100px rgba(62, 220, 196, 0.9), 0 0 150px rgba(62, 220, 196, 0.6)',
        scale: 1.03,
        duration: safeDuration(0.12),
        ease: safeEase('power2.out'),
      },
      strike
    );
    if (neonAuraRef.current) {
      tl.to(
        neonAuraRef.current,
        {
          opacity: 1,
          scale: 1.1,
          duration: safeDuration(0.12),
          ease: safeEase('power2.out'),
        },
        strike
      );
    }

    // Settle into steady high-power neon state
    const settle = strike + 0.12;
    tl.to(
      neonTextRef.current,
      {
        opacity: 1,
        color: '#ffffff',
        webkitTextStroke: '1.5px #3edcc4',
        textShadow:
          '0 0 4px #ffffff, 0 0 10px #3edcc4, 0 0 20px #3edcc4, 0 0 40px #3edcc4, 0 0 80px rgba(62, 220, 196, 0.75), 0 0 120px rgba(62, 220, 196, 0.35)',
        scale: 1.0,
        duration: safeDuration(0.25),
        ease: safeEase('power2.inOut'),
      },
      settle
    );
    if (neonAuraRef.current) {
      tl.to(
        neonAuraRef.current,
        {
          opacity: 0.65,
          scale: 1.0,
          duration: safeDuration(0.25),
          ease: safeEase('power2.inOut'),
        },
        settle
      );
    }

    // Breathing hum & hold
    const hum = settle + 0.25;
    if (neonAuraRef.current) {
      tl.to(
        neonAuraRef.current,
        {
          opacity: 0.45,
          duration: safeDuration(0.35),
          ease: safeEase('sine.inOut'),
          yoyo: true,
          repeat: 2,
        },
        hum
      );
    }

    cursor = hum + 1.0;

    // ═══════════════════════════════════════════════════
    // ACT 2: SCROLL TRANSITION & LETTER-BY-LETTER REVEAL
    // ═══════════════════════════════════════════════════
    const scrollDuration = 0.95;

    // Question scrolls up and fades out
    tl.to(
      questionSectionRef.current,
      {
        y: -140,
        opacity: 0,
        duration: safeDuration(scrollDuration),
        ease: safeEase('power3.inOut'),
      },
      cursor
    );

    // DHANVI unlit glass tubes scroll up from below into center
    tl.to(
      nameContainerRef.current,
      {
        opacity: 1,
        y: 0,
        duration: safeDuration(scrollDuration),
        ease: safeEase('power3.inOut'),
      },
      cursor + 0.12
    );

    cursor += scrollDuration + 0.25;

    // ── Sequential Letter-by-Letter Neon Sign Illumination (D → H → A → N → V → I) ──
    const traceStart = cursor;
    const traceStagger = 0.28;

    NAME_LETTERS.forEach((_, idx) => {
      const cyanRef = letterCyanRefs.current[idx];
      const baseRef = letterBaseRefs.current[idx];
      if (!cyanRef) return;

      const letterStart = traceStart + idx * traceStagger;

      // Step 1: Starter spark (0.04s)
      tl.to(
        cyanRef,
        {
          opacity: 0.85,
          color: '#e0fffa',
          webkitTextStroke: '1.2px #3edcc4',
          textShadow: '0 0 5px #ffffff, 0 0 12px #3edcc4, 0 0 25px rgba(62, 220, 196, 0.5)',
          duration: safeDuration(0.04),
          ease: 'none',
        },
        letterStart
      );

      // Step 2: Transformer dropout cut (0.03s)
      tl.to(
        cyanRef,
        {
          opacity: 0.1,
          color: 'rgba(62, 220, 196, 0.15)',
          webkitTextStroke: '1.2px rgba(62, 220, 196, 0.2)',
          textShadow: '0 0 0px rgba(62, 220, 196, 0)',
          duration: safeDuration(0.03),
          ease: 'none',
        },
        letterStart + 0.04
      );

      // Step 3: Secondary stutter spark (0.04s)
      tl.to(
        cyanRef,
        {
          opacity: 0.65,
          color: '#c4f8ef',
          webkitTextStroke: '1.2px #3edcc4',
          textShadow: '0 0 4px #ffffff, 0 0 10px #3edcc4, 0 0 18px rgba(62, 220, 196, 0.35)',
          duration: safeDuration(0.04),
          ease: 'none',
        },
        letterStart + 0.07
      );

      // Step 4: Quick cutoff (0.03s)
      tl.to(
        cyanRef,
        {
          opacity: 0.08,
          color: 'rgba(62, 220, 196, 0.12)',
          webkitTextStroke: '1.2px rgba(62, 220, 196, 0.18)',
          textShadow: '0 0 0px rgba(62, 220, 196, 0)',
          duration: safeDuration(0.03),
          ease: 'none',
        },
        letterStart + 0.11
      );

      // Step 5: Full Voltage Surge Strike (0.08s)
      tl.to(
        cyanRef,
        {
          opacity: 1,
          color: '#ffffff',
          webkitTextStroke: '1.5px #3edcc4',
          textShadow:
            '0 0 5px #ffffff, 0 0 12px #3edcc4, 0 0 24px #3edcc4, 0 0 45px rgba(62, 220, 196, 0.7)',
          duration: safeDuration(0.08),
          ease: safeEase('power2.out'),
        },
        letterStart + 0.14
      );

      if (baseRef) {
        tl.to(
          baseRef,
          {
            webkitTextStrokeColor: 'rgba(62, 220, 196, 0.35)',
            duration: safeDuration(0.08),
            ease: safeEase('power2.out'),
          },
          letterStart + 0.14
        );
      }

      // Step 6: Settle into steady neon glow (0.14s)
      tl.to(
        cyanRef,
        {
          opacity: 1,
          color: '#e8fbf7',
          webkitTextStroke: '1.2px #3edcc4',
          textShadow:
            '0 0 2.5px #ffffff, 0 0 6px #3edcc4, 0 0 14px rgba(62, 220, 196, 0.55), 0 0 26px rgba(62, 220, 196, 0.28), 0 0 45px rgba(62, 220, 196, 0.12)',
          duration: safeDuration(0.14),
          ease: safeEase('power2.inOut'),
        },
        letterStart + 0.22
      );
    });

    cursor = traceStart + (NAME_LETTERS.length - 1) * traceStagger + 0.38;

    // ── Collective High-Voltage Neon Power Surge ──
    const collectiveSurgeStart = cursor;
    const activeCyanRefs = letterCyanRefs.current.filter(
      (ref): ref is HTMLSpanElement => ref !== null
    );

    if (activeCyanRefs.length > 0) {
      tl.to(
        activeCyanRefs,
        {
          opacity: 1,
          color: '#ffffff',
          webkitTextStroke: '1.8px #3edcc4',
          textShadow:
            '0 0 5px #ffffff, 0 0 14px #3edcc4, 0 0 28px #3edcc4, 0 0 55px rgba(62, 220, 196, 0.8), 0 0 85px rgba(62, 220, 196, 0.35)',
          duration: safeDuration(0.18),
          ease: safeEase('power2.out'),
        },
        collectiveSurgeStart
      );
    }

    if (nameGlowRef.current) {
      tl.to(
        nameGlowRef.current,
        {
          opacity: 0.8,
          scale: 1.06,
          duration: safeDuration(0.18),
          ease: safeEase('power2.out'),
        },
        collectiveSurgeStart
      );
    }

    // Settle collectively
    if (activeCyanRefs.length > 0) {
      tl.to(
        activeCyanRefs,
        {
          opacity: 1,
          color: '#e8fbf7',
          webkitTextStroke: '1.2px #3edcc4',
          textShadow:
            '0 0 2.5px #ffffff, 0 0 6px #3edcc4, 0 0 14px rgba(62, 220, 196, 0.55), 0 0 26px rgba(62, 220, 196, 0.28)',
          duration: safeDuration(0.3),
          ease: safeEase('power2.inOut'),
        },
        collectiveSurgeStart + 0.2
      );
    }

    if (nameGlowRef.current) {
      tl.to(
        nameGlowRef.current,
        {
          opacity: 0.35,
          scale: 1.0,
          duration: safeDuration(0.3),
          ease: safeEase('power2.inOut'),
        },
        collectiveSurgeStart + 0.2
      );
    }

    cursor = collectiveSurgeStart + 0.55;

    // ═══════════════════════════════════════════════════
    // ACT 3: ASCII MAGIC DIGITALIZATION ENGINE
    // ═══════════════════════════════════════════════════

    // Seamless hand-off from DOM text to ASCII Canvas Matrix:
    // Canvas global opacity rises while DOM text fades out over 0.25s
    tl.to(
      state,
      {
        globalOpacity: 1,
        stage1Neon: 1,
        stage1Glow: 1,
        duration: safeDuration(0.25),
        ease: 'power2.out',
      },
      cursor
    );

    tl.to(
      nameContainerRef.current,
      {
        opacity: 0,
        duration: safeDuration(0.22),
        ease: 'power2.out',
      },
      cursor + 0.05
    );

    if (nameGlowRef.current) {
      tl.to(
        nameGlowRef.current,
        {
          opacity: 0,
          duration: safeDuration(0.22),
          ease: 'power2.out',
        },
        cursor + 0.05
      );
    }

    // Anamorphic horizontal flare beam flashes across "DHANVI"
    tl.fromTo(
      anamorphicStreakRef.current,
      { opacity: 0, scaleX: 0.05, scaleY: 0.5 },
      { opacity: 1, scaleX: 1.0, scaleY: 1.2, duration: safeDuration(0.4), ease: 'power2.out' },
      cursor + 0.05
    ).to(
      anamorphicStreakRef.current,
      { opacity: 0.35, scaleY: 0.8, duration: safeDuration(0.6), ease: 'power1.out' },
      cursor + 0.45
    );

    cursor += 0.45;

    // ── STAGE 2: ASCII FRAGMENTATION & CIPHER SHUFFLE ──
    tl.to(
      state,
      {
        stage2Fragmentation: 1,
        stage2Drift: 0.55,
        stage2Glitch: 1,
        stage1Glow: 1.4,
        duration: safeDuration(1.6),
        ease: 'power2.inOut',
      },
      cursor
    );

    tl.to(
      anamorphicStreakRef.current,
      {
        opacity: 0.75,
        scaleY: 1.6,
        duration: safeDuration(0.5),
        ease: 'power2.out',
      },
      cursor + 0.4
    );

    cursor += 1.6;

    // ── STAGE 3: 3D HOLOGRAPHIC ASCII PERSPECTIVE EXTRUSION ──
    tl.to(
      state,
      {
        stage3Extrusion: 1.0,
        stage2Drift: 0.22, // consolidate back into aligned 3D perspective columns
        stage2Glitch: 0.2,
        stage1Glow: 1.8,
        duration: safeDuration(1.4),
        ease: 'power3.out',
      },
      cursor
    );

    cursor += 1.4;

    // ── STAGE 4: EXTREME FORWARD ZOOM INTO ASCII CYBER TUNNEL ──
    tl.to(
      state,
      {
        stage4Tunnel: 1.0,
        stage4Speed: 1.0,
        stage4Zoom: 22.0, // Extreme forward radial warp dive
        stage3Extrusion: 4.0,
        duration: safeDuration(1.6),
        ease: 'power4.in',
      },
      cursor
    );

    // Flare expands to full screen width
    tl.to(
      anamorphicStreakRef.current,
      {
        opacity: 1,
        scaleY: 8.0,
        duration: safeDuration(0.85),
        ease: 'power3.in',
      },
      cursor + 0.65
    );

    cursor += 1.4;

    // ── CLIMAX FLASH & TRANSITION TO HOME ──
    tl.to(
      flashOverlayRef.current,
      {
        opacity: 1,
        duration: safeDuration(0.35),
        ease: 'power2.out',
      },
      cursor
    );

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: safeDuration(0.4),
        ease: 'power3.inOut',
      },
      cursor + 0.2
    );

    cursor += 0.55;

    tl.to({}, { duration: 0.1 }, cursor);

    return tl;
  }, [onComplete]);

  // Run Master Timeline when active
  useEffect(() => {
    if (!isActive) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      return;
    }

    const initTimeout = setTimeout(() => {
      const tl = buildTimeline();
      if (tl) {
        timelineRef.current = tl;
        tl.play();
      }
    }, 60);

    return () => {
      clearTimeout(initTimeout);
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [isActive, buildTimeline]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className={styles.revealRoot}
      id="creator-reveal-sequence"
      role="region"
      aria-label="DHANVI Creator Reveal - ASCII Magic Digitalization Sequence"
    >
      {/* ── CRT / Cyber Scanline Texture ── */}
      <div className={styles.scanlines} />

      {/* ── Vignette & Radial Depth Mask ── */}
      <div className={styles.vignette} />

      {/* ── Anamorphic Horizontal Flare Beam ── */}
      <div ref={anamorphicStreakRef} className={styles.anamorphicStreak} />

      {/* ── ACT 1: "Wanna meet the CREATOR?" ── */}
      <div ref={questionSectionRef} className={styles.questionSection}>
        <div ref={questionLineRef} className={styles.questionLine}>
          Wanna meet the
        </div>
        <div ref={questionAccentRef} className={styles.questionAccent}>
          <div ref={neonAuraRef} className={styles.neonAura} />
          <span ref={neonTextRef} className={styles.neonText}>
            CREATOR?
          </span>
        </div>
      </div>

      {/* ── ACT 2: DHANVI Sequential Name Reveal (large, centred) ── */}
      <div ref={nameContainerRef} className={styles.nameContainer}>
        {NAME_LETTERS.map((letter, idx) => (
          <div key={idx} className={styles.letterGroup}>
            {/* Unlit wireframe base outline */}
            <span
              ref={(el) => {
                letterBaseRefs.current[idx] = el;
              }}
              className={styles.letterBase}
            >
              {letter}
            </span>

            {/* Cyan overlay: sequential neon ignition */}
            <span
              ref={(el) => {
                letterCyanRefs.current[idx] = el;
              }}
              className={styles.letterCyan}
            >
              {letter}
            </span>
          </div>
        ))}

        {/* Radial backdrop glow bloom */}
        <div ref={nameGlowRef} className={styles.nameGlow} />
      </div>

      {/* ── ACT 3: ASCII MAGIC DIGITALIZATION CANVAS LAYER ── */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* ── Climax Hyperdrive Flash Overlay ── */}
      <div ref={flashOverlayRef} className={styles.flashOverlay} />
    </div>
  );
}
