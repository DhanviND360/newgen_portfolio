'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Film Grain Overlay
   Subtle noise texture over the entire viewport.
   CSS-only approach — no canvas, no heavy rendering.
   pointer-events: none — fully transparent to interaction.
   Respects prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';

export default function FilmGrain() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (grainRef.current) {
        grainRef.current.style.animationPlayState = 'paused';
      }
    }
  }, []);

  return (
    <div
      ref={grainRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        pointerEvents: 'none',
        opacity: 0.035,
        mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
        animation: 'grainShift 0.5s steps(4) infinite',
      }}
    >
      <style>{`
        @keyframes grainShift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, -2px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
