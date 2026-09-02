'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — TechStream Component
   Vertical Infinite Carousels with True-To-Life Official Brand Logos:
   - Left Stream: Core Languages, Frameworks & AI Stack (scrolling upward)
   - Right Stream: Creative Libraries, Infra & Engines (scrolling downward)
   - Authentic multi-color vector brand logos with official color palettes
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import styles from '@/styles/tech-stream.module.css';

interface TechItem {
  id: string;
  name: string;
  svg: React.ReactNode;
}

// ── True-To-Life Official Brand Logos ──

const LOGOS = {
  // 1. Next.js — Black circle with white "N" triangle letterform
  nextjs: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#000000" />
      <path d="M48 38v52h9V53l34 47c6-4 11-9.5 14-16L57 38H48z" fill="url(#nj-g)" />
      <rect x="80" y="38" width="9" height="52" fill="url(#nj-g2)" />
      <defs>
        <linearGradient id="nj-g" x1="60" y1="44" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nj-g2" x1="84" y1="38" x2="84" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 2. React — Atom with three orbital ellipses and center dot
  react: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="10" fill="#61DAFB" />
      <ellipse cx="64" cy="64" rx="55" ry="22" fill="none" stroke="#61DAFB" strokeWidth="4" />
      <ellipse cx="64" cy="64" rx="55" ry="22" fill="none" stroke="#61DAFB" strokeWidth="4" transform="rotate(60 64 64)" />
      <ellipse cx="64" cy="64" rx="55" ry="22" fill="none" stroke="#61DAFB" strokeWidth="4" transform="rotate(120 64 64)" />
    </svg>
  ),

  // 3. TypeScript — Blue rounded square with white "TS"
  typescript: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="12" fill="#3178C6" />
      <path
        d="M75 68v-9h-45v9h17v45h11V68h17zm22-9c-10 0-17 5-17 14 0 17 24 12 24 22 0 4-3 7-8 7-6 0-10-3-13-8l-8 5c4 7 11 12 21 12 11 0 19-6 19-16 0-18-24-13-24-22 0-4 3-6 7-6 5 0 8 2 10 6l8-4c-3-6-9-10-19-10z"
        fill="#fff"
      />
    </svg>
  ),

  // 4. JavaScript — Yellow square with black "JS"
  javascript: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" fill="#F7DF1E" />
      <text x="64" y="98" textAnchor="middle" fill="#000" fontSize="62" fontWeight="bold" fontFamily="sans-serif">JS</text>
    </svg>
  ),

  // 5. HTML5 — Orange shield with white "5"
  html5: (
    <svg viewBox="0 0 512 512" className={styles.iconSvg}>
      <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#EF652A" d="M256 472l149-41 35-391H256z" />
      <path fill="#EBEBEB" d="M256 208h-92l-6-78h98V52H84l19 234h153zm0 181l-79-22-5-61h-78l10 119 152 42z" />
      <path fill="#fff" d="M256 208v78h72l-7 77-65 18v80l131-36 17-217zm0-156v78h166l6-78z" />
    </svg>
  ),

  // 6. CSS3 — Blue shield with white "3"
  css3: (
    <svg viewBox="0 0 512 512" className={styles.iconSvg}>
      <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#33A9DC" d="M256 472l149-41 35-391H256z" />
      <path fill="#EBEBEB" d="M256 208h-92l-6-78h98V52H84l19 234h153zm0 181l-79-22-5-61h-78l10 119 152 42z" />
      <path fill="#fff" d="M256 208v78h72l-7 77-65 18v80l131-36 17-217zm0-156v78h166l6-78z" />
    </svg>
  ),

  // 7. Python — Two interlocking snakes, blue and yellow
  python: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        fill="#3776AB"
        d="M63.4 2C46.7 2 37.4 9.4 37.4 21.3v14h26.7v4H27C13 39.3 2 49 2 64c0 15 10 25.3 25 25.3h10V77c0-14 12-26 26-26h27c10 0 19-9 19-19V20C109 8 99 2 86 2H63.4zm-13 11c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7z"
      />
      <path
        fill="#FFD43B"
        d="M64.6 126c16.7 0 26-7.4 26-19.3V93H64v-4h35.8C116 89 126 79 126 64c0-15-10-25.3-25-25.3H91v12c0 14-12 26-26 26H38c-10 0-19 9-19 19v12c0 12 10 18.3 23 18.3h22.6zm13-11c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7z"
      />
    </svg>
  ),

  // 8. SQL / MySQL — Database cylinder in teal
  sql: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <ellipse cx="64" cy="28" rx="46" ry="18" fill="#00758F" />
      <path d="M18 28v36c0 10 20.6 18 46 18s46-8 46-18V28" fill="none" stroke="#005C70" strokeWidth="4" />
      <ellipse cx="64" cy="64" rx="46" ry="18" fill="none" stroke="#00758F" strokeWidth="4" />
      <path d="M18 64v36c0 10 20.6 18 46 18s46-8 46-18V64" fill="none" stroke="#004A5A" strokeWidth="4" />
      <ellipse cx="64" cy="100" rx="46" ry="18" fill="none" stroke="#008EA8" strokeWidth="4" />
      <text x="64" y="76" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="bold" fontFamily="sans-serif">SQL</text>
    </svg>
  ),

  // 9. C++ — Blue hexagon with "C++" text
  cpp: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M64 4L116 34v60L64 124 12 94V34z" fill="#00599C" />
      <path d="M64 14L107 39v50L64 114 21 89V39z" fill="#659AD2" />
      <path
        d="M55 44c-12 0-22 10-22 22s10 22 22 22c7 0 14-3 18-9l-10-6c-2 3-5 5-8 5-7 0-12-5-12-12s5-12 12-12c3 0 6 2 8 5l10-6c-4-6-11-9-18-9z"
        fill="#fff"
      />
      <path d="M84 56h5v4h-5v5h-4v-5h-5v-4h5v-5h4zm14 0h5v4h-5v5h-4v-5h-5v-4h5v-5h4z" fill="#fff" />
    </svg>
  ),

  // 10. C — Blue hexagon with "C" letter
  c: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M64 4L116 34v60L64 124 12 94V34z" fill="#A8B9CC" />
      <path d="M64 14L107 39v50L64 114 21 89V39z" fill="#00599C" />
      <path
        d="M64 36c-16 0-28 12-28 28s12 28 28 28c10 0 19-5 24-13l-13-8c-3 5-7 7-11 7-9 0-16-7-16-14s7-14 16-14c4 0 8 2 11 7l13-8c-5-8-14-13-24-13z"
        fill="#fff"
      />
    </svg>
  ),

  // 11. Java — Coffee cup steam shape in orange/red
  java: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M47 96s-3 2 2 3c6 0 9 0 16-2 0 0 2 1 4 2-14 6-31 0-22-3z" fill="#5382A1" />
      <path d="M45 84s-3 3 2 3c7 1 12 1 20-2l3 3c-17 5-35 0-25-4z" fill="#5382A1" />
      <path d="M62 62c5 6-1 11-1 11s13-7 7-15c-6-8-10-12 13-25 0 0-36 9-19 29z" fill="#E76F00" />
      <path d="M90 106s2 2-3 3c-9 2-37 3-45 0-3-1 3-2 5-3 2 0 3 0 3 0-3-2-22 5-10 7 34 5 62-2 50-7z" fill="#5382A1" />
      <path d="M49 70s-16 4-6 5c4 1 13 1 21 0 7-1 13-2 13-2s-2 1-4 2c-16 4-46 2-37-2 7-4 13-3 13-3z" fill="#5382A1" />
      <path d="M80 91c16-8 9-16 3-15-1 0-2 1-2 1s1-1 2-1c11-4 20 11-3 17 0 0 0-1 0-2z" fill="#E76F00" />
      <path d="M67 2s10 10-10 25c-16 12-4 19 0 27-9-8-16-16-12-23C51 21 71 12 67 2z" fill="#E76F00" />
      <path d="M50 117c15 1 39-1 40-8 0 0-1 3-13 5-14 3-31 2-41-1 0 0 2 2 14 4z" fill="#5382A1" />
    </svg>
  ),

  // 12. Flask — Flask/erlenmeyer shape, black body with green liquid
  flask: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M48 10h32v12H72v24l35 54c5 8 1 18-9 18H30c-10 0-14-10-9-18l35-54V22h-8V10z"
        fill="#000"
        stroke="#fff"
        strokeWidth="5"
      />
      <path d="M30 106h68l-18-28H48l-18 28z" fill="#009688" opacity="0.8" />
      <circle cx="56" cy="94" r="4" fill="#fff" opacity="0.6" />
      <circle cx="72" cy="88" r="3" fill="#fff" opacity="0.4" />
    </svg>
  ),

  // 13. Node.js — Green hexagon with "N" mark
  nodejs: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M64 4L116 34v60L64 124 12 94V34z" fill="#339933" />
      <path d="M48 42v44l16-9V55l14 8v22l16-9V42L64 58z" fill="#fff" />
    </svg>
  ),

  // 14. Express — Dark rounded rectangle with "ex" letterforms
  express: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="16" fill="#000" />
      <text x="64" y="78" textAnchor="middle" fill="#fff" fontSize="40" fontWeight="bold" fontFamily="sans-serif">ex</text>
    </svg>
  ),

  // 15. PostgreSQL — Blue elephant head
  postgresql: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M90 34c-6-8-16-14-26-14S44 26 38 34c-8 10-12 24-10 38 2 16 8 28 18 34l6-14c-6-4-10-12-10-20 0-14 10-26 22-26s22 12 22 26c0 8-4 16-10 20l6 14c10-6 16-18 18-34 2-14-2-28-10-38z"
        fill="#336791"
      />
      <circle cx="52" cy="58" r="5" fill="#fff" />
      <circle cx="76" cy="58" r="5" fill="#fff" />
      <path d="M52 76c4 5 8 8 12 8s8-3 12-8" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  // 16. REST APIs — Three connected nodes
  restapi: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="34" cy="64" r="16" fill="#6366F1" />
      <circle cx="94" cy="34" r="16" fill="#06B6D4" />
      <circle cx="94" cy="94" r="16" fill="#10B981" />
      <path d="M50 56l28-14M50 72l28 14" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
      <text x="34" y="69" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">R</text>
    </svg>
  ),

  // 17. Antigravity — Google-colored dashed ring with teal dot
  antigravity: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="54" fill="none" stroke="url(#ag-grad)" strokeWidth="7" strokeDasharray="16 8" />
      <circle cx="64" cy="64" r="20" fill="#3edcc4" />
      <path d="M64 18v14M64 96v14M18 64h14M96 64h14" stroke="#3edcc4" strokeWidth="5" strokeLinecap="round" />
      <defs>
        <linearGradient id="ag-grad" x1="0" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="0.33" stopColor="#34A853" />
          <stop offset="0.66" stopColor="#FBBC05" />
          <stop offset="1" stopColor="#EA4335" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 18. Google Gemini — Four-pointed sparkle star with gradient
  gemini: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M64 4C64 37.1 37.1 64 4 64c33.1 0 60 26.9 60 60 0-33.1 26.9-60 60-60-33.1 0-60-26.9-60-60z"
        fill="url(#gemini-grad)"
      />
      <defs>
        <linearGradient id="gemini-grad" x1="4" y1="4" x2="124" y2="124" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1BA1E3" />
          <stop offset="0.4" stopColor="#5B68EB" />
          <stop offset="0.75" stopColor="#9C44E8" />
          <stop offset="1" stopColor="#FA7577" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 19. ChatGPT / OpenAI — Green circle with simplified hexagonal knot
  chatgpt: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#10A37F" />
      <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M64 30v24l20 12M64 54L44 66v24l20 12 20-12V66z" />
        <path d="M44 42l20 12 20-12" />
        <path d="M84 54v24l-20 12" />
        <path d="M44 78l20-12" />
      </g>
    </svg>
  ),

  // 20. Claude — Terracotta circle with starburst
  claude: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#D97757" />
      <g fill="#FFF3ED">
        <circle cx="64" cy="40" r="5" />
        <circle cx="64" cy="88" r="5" />
        <circle cx="40" cy="50" r="5" />
        <circle cx="88" cy="78" r="5" />
        <circle cx="40" cy="78" r="5" />
        <circle cx="88" cy="50" r="5" />
        <circle cx="64" cy="64" r="7" />
      </g>
      <g stroke="#FFF3ED" strokeWidth="3">
        <line x1="64" y1="45" x2="64" y2="57" />
        <line x1="64" y1="71" x2="64" y2="83" />
        <line x1="44" y1="52" x2="57" y2="60" />
        <line x1="71" y1="68" x2="84" y2="76" />
        <line x1="44" y1="76" x2="57" y2="68" />
        <line x1="71" y1="60" x2="84" y2="52" />
      </g>
    </svg>
  ),

  // 21. Git — Red branching logo
  git: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M124 58.7L69.3 4c-3.2-3.2-8.4-3.2-11.6 0L45.4 16.3l14.6 14.6c3.4-1.2 7.4-.2 10.1 2.5 2.7 2.7 3.7 6.6 2.5 10l14 14c3.4-1.2 7.4-.2 10.1 2.5 3.8 3.8 3.8 10 0 13.8s-10 3.8-13.8 0c-2.9-2.9-3.7-7.2-2.3-10.8l-13.1-13.1v34.5c1 .5 1.9 1.2 2.7 2 3.8 3.8 3.8 10 0 13.8-3.8 3.8-10 3.8-13.8 0-3.8-3.8-3.8-10 0-13.8 1-1 2.2-1.7 3.5-2.2V50c-1.3-.5-2.5-1.2-3.5-2.2-3-3-3.7-7.3-2.2-10.9L39 22.4 4 57.1c-3.2 3.2-3.2 8.4 0 11.6l54.7 54.7c3.2 3.2 8.4 3.2 11.6 0l53.7-53.7c3.2-3.2 3.2-8.4 0-11z"
        fill="#F05032"
      />
    </svg>
  ),

  // 22. GitHub — Dark circle with octocat silhouette
  github: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#181616" />
      <path
        d="M64 16C38.5 16 18 36.5 18 62c0 20.3 13.2 37.6 31.4 43.7 2.3.4 3.1-1 3.1-2.2v-8.5c-12.8 2.8-15.5-5.5-15.5-5.5-2.1-5.3-5.1-6.7-5.1-6.7-4.2-2.9.3-2.8.3-2.8 4.6.3 7 4.7 7 4.7 4.1 7 10.7 5 13.3 3.8.4-3 1.6-5 2.9-6.1-10.2-1.2-20.9-5.1-20.9-22.7 0-5 1.8-9.1 4.7-12.3-.5-1.2-2-5.8.5-12.1 0 0 3.8-1.2 12.5 4.7 3.6-1 7.5-1.5 11.4-1.5s7.7.5 11.4 1.5c8.7-5.9 12.5-4.7 12.5-4.7 2.4 6.3.9 11 .5 12.1 2.9 3.2 4.7 7.3 4.7 12.3 0 17.6-10.7 21.5-20.9 22.6 1.6 1.4 3.1 4.2 3.1 8.5v12.6c0 1.2.8 2.7 3.2 2.2C96.8 99.6 110 82.3 110 62c0-25.5-20.5-46-46-46z"
        fill="#fff"
      />
    </svg>
  ),

  // 23. Framer Motion — Framer "F" mark in blue
  framer: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M22 6h84v40H64L22 6z" fill="#0055FF" />
      <path d="M22 46h42l42 40H22V46z" fill="#00AAFF" />
      <path d="M22 86h42v40L22 86z" fill="#0055FF" />
    </svg>
  ),

  // 24. GSAP — Dark circle with green lightning bolt
  gsap: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="60" fill="#0E100F" />
      <path d="M72 14L28 70h36l-4 44 44-58H68l4-42z" fill="#88CE02" />
    </svg>
  ),

  // 25. Lenis — Orange circle with smooth scroll "L" curve
  lenis: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="60" fill="#FF5C00" />
      <path
        d="M44 30v46c0 12 10 22 22 22h28"
        stroke="#fff"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  // 26. Shadcn UI — Black circle with white diagonal slash
  shadcn: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="60" fill="#000" />
      <line x1="28" y1="100" x2="100" y2="28" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
    </svg>
  ),

  // 27. NumPy — Dark teal circle with blue/gold layered cube
  numpy: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="16" fill="#013243" />
      <path d="M64 24L100 44v40L64 104 28 84V44z" fill="none" stroke="#4DABCF" strokeWidth="5" />
      <path d="M28 44l36 20 36-20" fill="none" stroke="#4DABCF" strokeWidth="5" />
      <path d="M64 64v40" fill="none" stroke="#4DABCF" strokeWidth="5" />
      <path d="M46 54v18l18 10 18-10V54L64 44z" fill="#4DABCF" opacity="0.5" />
      <path d="M46 54l18 10 18-10" fill="none" stroke="#E9A53F" strokeWidth="4" />
      <path d="M64 64v18" stroke="#E9A53F" strokeWidth="4" />
    </svg>
  ),

  // 28. Pandas — Dark purple square with colored bar-chart columns
  pandas: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="14" fill="#150458" />
      <rect x="26" y="20" width="18" height="36" rx="3" fill="#fff" />
      <rect x="26" y="70" width="18" height="36" rx="3" fill="#fff" />
      <rect x="55" y="14" width="18" height="56" rx="3" fill="#E70488" />
      <rect x="55" y="80" width="18" height="12" rx="3" fill="#E70488" />
      <rect x="84" y="36" width="18" height="36" rx="3" fill="#fff" />
      <rect x="84" y="86" width="18" height="20" rx="3" fill="#fff" />
    </svg>
  ),

  // 29. OpenCV — Three overlapping circles in RGB
  opencv: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="38" r="24" fill="none" stroke="#FF0000" strokeWidth="8" />
      <circle cx="40" cy="82" r="24" fill="none" stroke="#00CC00" strokeWidth="8" />
      <circle cx="88" cy="82" r="24" fill="none" stroke="#0066FF" strokeWidth="8" />
    </svg>
  ),

  // 30. MediaPipe — Blue connected nodes in diamond layout
  mediapipe: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M64 20v88M20 64h88M36 36l56 56M92 36L36 92" stroke="#fff" strokeWidth="3" strokeDasharray="5 5" opacity="0.4" />
      <circle cx="64" cy="20" r="12" fill="#4285F4" />
      <circle cx="20" cy="64" r="12" fill="#0097A7" />
      <circle cx="108" cy="64" r="12" fill="#4285F4" />
      <circle cx="64" cy="108" r="12" fill="#0097A7" />
      <circle cx="64" cy="64" r="8" fill="#fff" />
    </svg>
  ),

  // 31. WebSocket — Dark circle with angle brackets and slash
  websocket: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="60" fill="#1E293B" />
      <path d="M38 44L20 64l18 20M90 44l18 20-18 20" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M70 28L58 100" stroke="#F97316" strokeWidth="8" strokeLinecap="round" />
    </svg>
  ),

  // 32. Vercel — Black circle with white triangle
  vercel: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="60" fill="#000" />
      <path d="M64 28L104 96H24z" fill="#fff" />
    </svg>
  ),

  // 33. Supabase — Dark circle with green lightning bolt
  supabase: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="60" fill="#1C1C1C" />
      <path
        d="M67 10c1.5-2 4.8-.8 5 1.5l5 38h34c3.4 0 5 4 2.8 6.2L59 118c-1.5 2-4.8.8-5-1.5l-5-38H15c-3.4 0-5-4-2.8-6.2z"
        fill="url(#sb-g)"
      />
      <defs>
        <linearGradient id="sb-g" x1="20" y1="20" x2="108" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 34. Cloudflare — Orange cloud shape
  cloudflare: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M92 88H30c-12 0-22-10-22-22 0-11 8-20 18-22C28 30 40 20 54 20c12 0 22 8 26 18 2 0 4 0 6 1 10 2 18 11 18 22 0 0 0 0 0 0h0c8 2 14 9 14 18 0 5-2 9-5 12-3 2-7 4-11 4H92"
        fill="#F38020"
      />
      <path
        d="M88 76l-3-10c-1-2-3-4-5-4H36c-1 0-1 1-1 2l0 1 3 10c1 2 3 4 5 4h47c1 0 1-1 1-2z"
        fill="#FAAD3F"
      />
    </svg>
  ),

  // 35. Ollama — Dark rounded square with llama face
  ollama: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="24" fill="#0F172A" />
      <path
        d="M42 28v-10h12v10M74 28v-10h12v10M36 28h56c8 0 14 6 14 14v36c0 8-6 14-14 14h-4V76H40v16h-4c-8 0-14-6-14-14V42c0-8 6-14 14-14z"
        fill="#fff"
      />
      <circle cx="52" cy="52" r="5" fill="#0F172A" />
      <circle cx="76" cy="52" r="5" fill="#0F172A" />
      <path d="M52 64c4 4 8 6 12 6s8-2 12-6" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  // 36. Docker — Blue whale with containers
  docker: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M124 52c-3-2-9-3-14-1-1-6-5-10-10-14l-3-2-2 3c-3 4-4 10-3 15 0 3 1 6 3 8-5 2-10 3-18 3H4c-2 8 0 19 5 27 6 8 14 13 26 13 23 0 40-11 48-30 6 0 13 0 17-7l2-3-3-2z"
        fill="#2496ED"
      />
      <g fill="#fff">
        <rect x="30" y="40" width="10" height="9" rx="1" />
        <rect x="43" y="40" width="10" height="9" rx="1" />
        <rect x="56" y="40" width="10" height="9" rx="1" />
        <rect x="43" y="28" width="10" height="9" rx="1" />
        <rect x="56" y="28" width="10" height="9" rx="1" />
        <rect x="69" y="28" width="10" height="9" rx="1" />
        <rect x="69" y="40" width="10" height="9" rx="1" />
        <rect x="82" y="40" width="10" height="9" rx="1" />
      </g>
    </svg>
  ),
};

// ── Left Column Items (Tech Stack — Scrolling Upward) ──
const LEFT_ITEMS: TechItem[] = [
  { id: 'nextjs', name: 'Next.js', svg: LOGOS.nextjs },
  { id: 'react', name: 'React', svg: LOGOS.react },
  { id: 'typescript', name: 'TypeScript', svg: LOGOS.typescript },
  { id: 'javascript', name: 'JavaScript', svg: LOGOS.javascript },
  { id: 'html5', name: 'HTML5', svg: LOGOS.html5 },
  { id: 'css3', name: 'CSS3', svg: LOGOS.css3 },
  { id: 'python', name: 'Python', svg: LOGOS.python },
  { id: 'sql', name: 'SQL', svg: LOGOS.sql },
  { id: 'cpp', name: 'C++', svg: LOGOS.cpp },
  { id: 'c', name: 'C', svg: LOGOS.c },
  { id: 'java', name: 'Java', svg: LOGOS.java },
  { id: 'flask', name: 'Flask', svg: LOGOS.flask },
  { id: 'nodejs', name: 'Node.js', svg: LOGOS.nodejs },
  { id: 'express', name: 'Express.js', svg: LOGOS.express },
  { id: 'postgresql', name: 'PostgreSQL', svg: LOGOS.postgresql },
  { id: 'restapi', name: 'REST APIs', svg: LOGOS.restapi },
  { id: 'antigravity', name: 'Antigravity', svg: LOGOS.antigravity },
  { id: 'gemini', name: 'Google Gemini', svg: LOGOS.gemini },
  { id: 'chatgpt', name: 'ChatGPT', svg: LOGOS.chatgpt },
  { id: 'claude', name: 'Claude AI', svg: LOGOS.claude },
  { id: 'git', name: 'Git', svg: LOGOS.git },
  { id: 'github', name: 'GitHub', svg: LOGOS.github },
];

// ── Right Column Items (Libraries & Infrastructure — Scrolling Downward) ──
const RIGHT_ITEMS: TechItem[] = [
  { id: 'nextjs-lib', name: 'Next.js 16', svg: LOGOS.nextjs },
  { id: 'react-lib', name: 'React 19', svg: LOGOS.react },
  { id: 'framer', name: 'Framer Motion', svg: LOGOS.framer },
  { id: 'gsap', name: 'GSAP Animation', svg: LOGOS.gsap },
  { id: 'lenis', name: 'Lenis Smooth Scroll', svg: LOGOS.lenis },
  { id: 'shadcn', name: 'Shadcn UI', svg: LOGOS.shadcn },
  { id: 'numpy', name: 'NumPy', svg: LOGOS.numpy },
  { id: 'pandas', name: 'Pandas', svg: LOGOS.pandas },
  { id: 'opencv', name: 'OpenCV', svg: LOGOS.opencv },
  { id: 'mediapipe', name: 'MediaPipe', svg: LOGOS.mediapipe },
  { id: 'websocket', name: 'WebSockets', svg: LOGOS.websocket },
  { id: 'vercel', name: 'Vercel Edge', svg: LOGOS.vercel },
  { id: 'supabase', name: 'Supabase', svg: LOGOS.supabase },
  { id: 'cloudflare', name: 'Cloudflare', svg: LOGOS.cloudflare },
  { id: 'ollama', name: 'Ollama AI', svg: LOGOS.ollama },
  { id: 'docker', name: 'Docker', svg: LOGOS.docker },
  { id: 'flask-lib', name: 'Flask Framework', svg: LOGOS.flask },
];

interface TechStreamProps {
  side: 'left' | 'right';
}

export default function TechStream({ side }: TechStreamProps) {
  const items = side === 'left' ? LEFT_ITEMS : RIGHT_ITEMS;
  // Duplicate array for seamless 100% loop
  const displayItems = [...items, ...items];

  return (
    <aside
      className={`${styles.streamContainer} ${
        side === 'left' ? styles.streamLeft : styles.streamRight
      }`}
      aria-hidden="true"
    >
      <div
        className={`${styles.streamTrack} ${
          side === 'left' ? styles.scrollUp : styles.scrollDown
        }`}
      >
        {displayItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className={styles.iconWrapper}>
            <div className={styles.iconCard} title={item.name}>
              {item.svg}
            </div>
            <span
              className={`${styles.tooltip} ${
                side === 'left' ? styles.tooltipRight : styles.tooltipLeft
              }`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
