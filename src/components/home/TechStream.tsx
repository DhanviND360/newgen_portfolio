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
  // 1. Next.js
  nextjs: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#000000" />
      <path
        d="M102.6 109.8L46.8 38H35v52h8.5V50.6l50.3 64.6c2.9-1.6 5.8-3.4 8.8-5.4z"
        fill="url(#nextjs-grad)"
      />
      <path d="M84.5 38H93v52h-8.5z" fill="#ffffff" />
      <defs>
        <linearGradient id="nextjs-grad" x1="55" y1="49" x2="98" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 2. React / React Native
  react: (
    <svg viewBox="0 0 115 100" className={styles.iconSvg}>
      <ellipse cx="57.5" cy="50" rx="10.5" ry="4.5" fill="#61DAFB" />
      <ellipse cx="57.5" cy="50" rx="52" ry="20" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(30 57.5 50)" />
      <ellipse cx="57.5" cy="50" rx="52" ry="20" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(90 57.5 50)" />
      <ellipse cx="57.5" cy="50" rx="52" ry="20" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(150 57.5 50)" />
    </svg>
  ),

  // 3. TypeScript
  typescript: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path
        d="M60.6 74.5H48.4V102H35.8V74.5H23.6v-9.6h37v9.6zm33.8 11.2c0 3.2-1.2 5.8-3.6 7.8-2.4 2-5.7 3-9.9 3-4.4 0-8.2-1.1-11.4-3.3l3.6-8.2c2.6 1.8 5.3 2.7 8.1 2.7 2 0 3.5-.4 4.5-1.2 1-.8 1.5-1.9 1.5-3.3 0-1.1-.4-2-1.2-2.7-.8-.7-2.3-1.6-4.5-2.7-3.7-1.8-6.3-3.7-7.8-5.7-1.5-2-2.3-4.5-2.3-7.5 0-4.6 1.6-8.2 4.8-10.8 3.2-2.6 7.4-3.9 12.6-3.9 3.9 0 7.3.8 10.2 2.4l-3.2 8.1c-2.3-1.3-4.7-2-7.2-2-2.1 0-3.7.5-4.8 1.5-1.1 1-1.6 2.2-1.6 3.6 0 1.2.4 2.2 1.2 2.9.8.7 2.4 1.7 4.8 2.9 3.8 1.9 6.4 3.9 7.8 6 1.5 2.1 2.2 4.8 2.2 8z"
        fill="#ffffff"
      />
    </svg>
  ),

  // 4. JavaScript
  javascript: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="16" fill="#F7DF1E" />
      <path
        d="M67.3 100c0 7.3-4.2 11.4-11.4 11.4-6.3 0-10.2-3.3-12.1-7.2l8.8-5.3c1.2 2.3 2.6 4.1 4.5 4.1 2.1 0 3.6-1.1 3.6-4.4V62.2h9.6V100zm40.5-2.2c-3.1 5.9-9 9.9-16.7 9.9-11.4 0-18.7-7.5-18.7-18.3 0-10.7 7.2-18.5 18.2-18.5 10.1 0 16.3 6.6 16.3 16.8 0 1.1-.1 2.2-.3 3.1H79.6c.8 5.7 4.7 9.3 10.5 9.3 4.2 0 7.2-1.8 9.3-4.8l8.4 4.5z"
        fill="#000000"
      />
    </svg>
  ),

  // 5. HTML5
  html5: (
    <svg viewBox="0 0 512 512" className={styles.iconSvg}>
      <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#EF652A" d="M256 472l149-41 35-391H256v432z" />
      <path fill="#EBEBEB" d="M256 208H164l-7-78h99V52H83l20 234h153zm0 181l-79-21-5-62h-78l10 119 152 42z" />
      <path fill="#FFFFFF" d="M256 208v78h72l-7 77-65 18v79l130-36 18-216zm0-156v78h165l7-78z" />
    </svg>
  ),

  // 6. CSS3
  css3: (
    <svg viewBox="0 0 512 512" className={styles.iconSvg}>
      <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z" />
      <path fill="#33A9DC" d="M256 472l149-41 35-391H256v432z" />
      <path fill="#EBEBEB" d="M256 208H164l-7-78h99V52H83l20 234h153zm0 181l-79-21-5-62h-78l10 119 152 42z" />
      <path fill="#FFFFFF" d="M256 208v78h72l-7 77-65 18v79l130-36 18-216zm0-156v78h165l7-78z" />
    </svg>
  ),

  // 7. Python
  python: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        fill="#3776AB"
        d="M63.5 2.1c-16.7 0-26 7.4-26 19.3v13.6h26.7v3.4H28.4C12.1 38.4 2 47.9 2 64.2c0 16.3 9.4 25.8 23.4 25.8h8.8v-12.2c0-13.6 11.6-25.1 25.1-25.1h26.8c11.3 0 20.4-9.2 20.4-20.4V19.9c0-11.9-9.9-17.8-23-17.8zm-13.3 10.9c3.8 0 6.8 3 6.8 6.8s-3 6.8-6.8 6.8-6.8-3-6.8-6.8 3-6.8 6.8-6.8z"
      />
      <path
        fill="#FFD438"
        d="M64.5 125.9c16.7 0 26-7.4 26-19.3V93H63.8v-3.4h35.8c16.3 0 26.4-9.5 26.4-25.8 0-16.3-9.4-25.8-23.4-25.8h-8.8v12.2c0 13.6-11.6 25.1-25.1 25.1H41.9c-11.3 0-20.4 9.2-20.4 20.4v12.2c0 11.9 9.9 17.8 23 17.8zm13.3-10.9c-3.8 0-6.8-3-6.8-6.8s3-6.8 6.8-6.8 6.8 3 6.8 6.8-3 6.8-6.8 6.8z"
      />
    </svg>
  ),

  // 8. SQL
  sql: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <ellipse cx="64" cy="28" rx="46" ry="18" fill="#00758F" />
      <path d="M18 28v36c0 10 20.6 18 46 18s46-8 46-18V28" fill="#005C70" />
      <ellipse cx="64" cy="64" rx="46" ry="18" fill="#00758F" />
      <path d="M18 64v36c0 10 20.6 18 46 18s46-8 46-18V64" fill="#004A5A" />
      <ellipse cx="64" cy="100" rx="46" ry="18" fill="#008EA8" />
    </svg>
  ),

  // 9. C++
  cpp: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M64 4l52 30v60L64 124 12 94V34L64 4z" fill="#00599C" />
      <path d="M64 14l43 25v50L64 114 21 89V39L64 14z" fill="#659AD2" />
      <path
        d="M60 44c-11 0-20 9-20 20s9 20 20 20c6.6 0 12.5-3.2 16.2-8.2l-8.6-5c-2 2.8-4.7 4.2-7.6 4.2-6.1 0-11-4.9-11-11s4.9-11 11-11c2.9 0 5.6 1.4 7.6 4.2l8.6-5C72.5 47.2 66.6 44 60 44zm27 15v7h7v4h-7v7h-4v-7h-7v-4h7v-7h4zm16 0v7h7v4h-7v7h-4v-7h-7v-4h7v-7h4z"
        fill="#ffffff"
      />
    </svg>
  ),

  // 10. C
  c: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M64 4l52 30v60L64 124 12 94V34L64 4z" fill="#A8B9CC" />
      <path d="M64 14l43 25v50L64 114 21 89V39L64 14z" fill="#00599C" />
      <path
        d="M64 36c-15.5 0-28 12.5-28 28s12.5 28 28 28c10 0 18.8-5.2 23.8-13.1l-12.8-7.4c-2.8 4.2-6.6 6.5-11 6.5-8.8 0-16-7.2-16-16s7.2-16 16-16c4.4 0 8.2 2.3 11 6.5l12.8-7.4C82.8 41.2 74 36 64 36z"
        fill="#ffffff"
      />
    </svg>
  ),

  // 11. Java
  java: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M48.7 97.4c-16.8 4.4 34.6 6.3 43.1 1.7-8.3-4.2-26.3-6.1-43.1-1.7z" fill="#5382A1" />
      <path d="M37.3 110.8c-18.7 5.2 46.1 7.4 67.2 2.3-17.5-4.4-48.5-7.5-67.2-2.3z" fill="#5382A1" />
      <path d="M66.4 75.3c7.5 7.8-19.6 14.8-43.4 12.4 17.5 4.8 54.4 4.5 61.2-3.1 9.4-10.4-10.3-17.1-17.8-9.3z" fill="#E76F00" />
      <path d="M72.2 48.6c13.7 15.6-7.3 22.8-23.7 33.2 12.3-3.6 28.5-7.8 31.9-18.6 4.3-13.8-14.7-21.2-8.2-14.6z" fill="#E76F00" />
      <path d="M54.5 12.8c-8.9 9.8 1.4 16.5 11.2 25.1-4.8-10.2-13.4-16.7-11.2-25.1z" fill="#F89820" />
    </svg>
  ),

  // 12. Flask
  flask: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M48 10h32v12H72v24.6l34.8 53.6C112 108 108 118 97.6 118H30.4C20 118 16 108 21.2 100.2L56 46.6V22h-8V10z"
        fill="#000000"
        stroke="#ffffff"
        strokeWidth="6"
      />
      <path d="M30.4 106h67.2l-18-28H48.4l-18 28z" fill="#00D2B4" />
      <circle cx="56" cy="94" r="4" fill="#ffffff" />
      <circle cx="72" cy="88" r="3" fill="#ffffff" />
    </svg>
  ),

  // 13. Node.js
  nodejs: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M64 4l52 30v60L64 124 12 94V34L64 4z"
        fill="#539E43"
      />
      <path
        d="M64 18l39 22.5v45L64 108 25 85.5v-45L64 18z"
        fill="#333333"
      />
      <path
        d="M64 36c-13.2 0-24 9.8-24 22 0 16 24 14 24 24 0 3.3-3.6 6-8 6-5.5 0-9.6-3.3-10.9-7.7l-9.1 3.8C40 92.4 48 98 60 98c13.2 0 24-9.8 24-22 0-16-24-14-24-24 0-3.3 3.6-6 8-6 5.5 0 9.6 3.3 10.9 7.7l9.1-3.8C84 41.6 76 36 64 36z"
        fill="#68BD45"
      />
    </svg>
  ),

  // 14. Express.js
  express: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="20" fill="#1C1C1C" />
      <path
        d="M26 64c0-15.5 11.5-27 27-27s27 11.5 27 27-11.5 27-27 27-27-11.5-27-27zm42.5 0c0-9.5-6.5-16.5-15.5-16.5S37.5 54.5 37.5 64s6.5 16.5 15.5 16.5 15.5-7 15.5-16.5zm19.5 25.5l14-25.5-13-24h13.5l6.5 13 6.5-13H122l-13 24 14 25.5h-13.5l-7.5-14.5-7.5 14.5H88z"
        fill="#ffffff"
      />
    </svg>
  ),

  // 15. PostgreSQL
  postgresql: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M64 12c-28.7 0-52 23.3-52 52 0 19.3 10.5 36.2 26.2 45.2.8-5.3 2.1-13.8 2.6-17.7-4.8-5.4-8-12.8-8-21 0-17.1 13.9-31 31-31s31 13.9 31 31c0 8.2-3.2 15.6-8 21 .5 3.9 1.8 12.4 2.6 17.7C105.5 100.2 116 83.3 116 64c0-28.7-23.3-52-52-52z"
        fill="#336791"
      />
      <circle cx="50" cy="56" r="5" fill="#ffffff" />
      <circle cx="78" cy="56" r="5" fill="#ffffff" />
      <path d="M48 76c4.4 5.3 9.8 8 16 8s11.6-2.7 16-8" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),

  // 16. REST APIs
  restapi: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="34" cy="64" r="18" fill="#6366F1" />
      <circle cx="94" cy="34" r="18" fill="#06B6D4" />
      <circle cx="94" cy="94" r="18" fill="#10B981" />
      <path d="M49 54l30-14M49 74l30 14" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <path d="M94 52v24" stroke="#ffffff" strokeWidth="4" strokeDasharray="4 4" />
    </svg>
  ),

  // 17. Antigravity
  antigravity: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="58" fill="none" stroke="url(#ag-grad)" strokeWidth="8" strokeDasharray="18 10" />
      <circle cx="64" cy="64" r="22" fill="#3edcc4" />
      <path d="M64 16v18M64 94v18M16 64h18M94 64h18" stroke="#3edcc4" strokeWidth="6" strokeLinecap="round" />
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

  // 18. Google Gemini
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

  // 19. ChatGPT / OpenAI
  chatgpt: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#10A37F" />
      <path
        d="M98.6 57.3c-.8-6.1-5.1-11-11.2-12.7-2-.6-4.1-.8-6.2-.6-1.7-4.8-5.3-8.6-10-10.6-5.8-2.5-12.6-1.7-17.6 2.1-4-3.1-9.2-4.4-14.2-3.4-6.4 1.2-11.6 6-13.6 12.2-4.5 1.5-8.1 4.9-9.9 9.4-2.3 5.6-1.5 12.1 2.2 17-1 5.9.6 12 4.4 16.6 4.3 5.2 10.8 7.9 17.5 7.1 1.7 4.8 5.3 8.6 10 10.6 5.8 2.5 12.6 1.7 17.6-2.1 4 3.1 9.2 4.4 14.2 3.4 6.4-1.2 11.6-6 13.6-12.2 4.5-1.5 8.1-4.9 9.9-9.4 2.3-5.6 1.5-12.1-2.2-17 1-5.9-.6-12-4.5-16.4zm-22.8 39.8c-2.9 1.7-6.5 1.8-9.4.4L53.1 90c-1.3-.8-2.2-2.1-2.5-3.6s.1-3 1.1-4.2l12.4-14.7 14.8 8.6v17c0 1.8-.9 3.4-2.5 4.2zm-28.5-7.3c-1.7-2.9-1.8-6.5-.4-9.4l7.6-13.2c.8-1.3 2.1-2.2 3.6-2.5 1.5-.3 3 .1 4.2 1.1l14.7 12.4-8.6 14.8H50.8c-1.8 0-3.4-.9-4.2-2.5zm-8.8-25.1c0-3.3 1.8-6.4 4.7-8l13.2-7.6c1.3-.8 3-.8 4.4-.1s2.4 1.9 2.7 3.4l2.3 19-14.8 8.6-10-10c-1.6-1.6-2.5-3.4-2.5-5.3zm42.7-6.2L68.8 43.8c-1.3-.8-2.1-2.1-2.5-3.6s.1-3 1.1-4.2l7.6-9.1c2.9-1.7 6.5-1.8 9.4-.4 2.9 1.4 4.9 4.2 5.2 7.4v17.4l-10.8 7.2z"
        fill="#ffffff"
      />
    </svg>
  ),

  // 20. Claude
  claude: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#D97757" />
      <path
        d="M64 26l7.8 24.2 24.2 7.8-24.2 7.8L64 90l-7.8-24.2-24.2-7.8 24.2-7.8L64 26z"
        fill="#ffffff"
      />
      <circle cx="94" cy="34" r="8" fill="#FFE8DF" />
      <circle cx="34" cy="94" r="8" fill="#FFE8DF" />
    </svg>
  ),

  // 21. Git
  git: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M123.6 57.3L70.7 4.4c-4.3-4.3-11.2-4.3-15.5 0L42.8 16.8l17.6 17.6c4.1-1.4 8.9-.3 12 2.8 3.2 3.2 4.2 7.9 2.8 12l17.1 17.1c4.1-1.4 8.9-.3 12 2.8 4.6 4.6 4.6 12 0 16.6s-12 4.6-16.6 0c-3.5-3.5-4.4-8.7-2.6-12.9L58.6 56.3v34.8c1.3 1.2 2.3 2.7 2.7 4.5 2.1 7.6-2.4 15.4-10 17.5s-15.4-2.4-17.5-10c-1.7-6.2 1.2-12.7 6.8-15.5V51.7c-5.6-2.8-8.5-9.3-6.8-15.5 1.2-4.4 4.4-7.8 8.6-9.3L24.8 9.3 4.4 29.7c-4.3 4.3-4.3 11.2 0 15.5l52.9 52.9c4.3 4.3 11.2 4.3 15.5 0l50.8-50.8c4.3-4.3 4.3-11.2 0-15.5v-.5z"
        fill="#F05032"
      />
    </svg>
  ),

  // 22. GitHub
  github: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#24292E" />
      <path
        d="M64 20C39.7 20 20 39.7 20 64c0 19.4 12.6 35.9 30.1 41.7 2.2.4 2.9-1 2.9-2.2v-7.4c-12.2 2.6-14.8-5.9-14.8-5.9-2-5.1-4.9-6.5-4.9-6.5-4-2.7.3-2.6.3-2.6 4.4.3 6.7 4.5 6.7 4.5 3.9 6.7 10.3 4.7 12.8 3.6.4-2.8 1.5-4.7 2.8-5.9-9.8-1.1-20-4.9-20-21.7 0-4.8 1.7-8.7 4.5-11.8-.5-1.1-2-5.6.4-11.6 0 0 3.7-1.2 12.1 4.5 3.5-1 7.3-1.5 11-1.5 3.7 0 7.5.5 11 1.5 8.4-5.7 12.1-4.5 12.1-4.5 2.4 6 .9 10.5.4 11.6 2.8 3.1 4.5 7 4.5 11.8 0 16.8-10.2 20.6-20 21.7 1.6 1.4 3 4.1 3 8.2v12.2c0 1.2.7 2.6 3 2.2C95.4 99.9 108 83.4 108 64c0-24.3-19.7-44-44-44z"
        fill="#ffffff"
      />
    </svg>
  ),

  // 23. Framer Motion
  framer: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path d="M24 12h80v35H64z" fill="#0055FF" />
      <path d="M24 47h40l40 34H24z" fill="#0055FF" />
      <path d="M24 81h40v35z" fill="#0055FF" />
    </svg>
  ),

  // 24. GSAP
  gsap: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#0E100F" />
      <path d="M68 14L22 72h42l-6 42 48-60H62l6-40z" fill="#88CE02" />
    </svg>
  ),

  // 25. Lenis
  lenis: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#FF5C00" />
      <path
        d="M44 32v44c0 11 9 20 20 20h28"
        stroke="#ffffff"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),

  // 26. Shadcn UI
  shadcn: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#000000" />
      <line x1="24" y1="104" x2="104" y2="24" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
      <path d="M84 104h20V84M24 44V24h20" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  // 27. NumPy
  numpy: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#013243" />
      <path d="M64 24l36 21v42L64 108 28 87V45L64 24z" fill="#4DABCF" />
      <path d="M64 108V66L28 45" fill="none" stroke="#013243" strokeWidth="4" />
      <path d="M64 66l36-21" fill="none" stroke="#013243" strokeWidth="4" />
      <path d="M46 54v20l18 10 18-10V54L64 44 46 54z" fill="#E9A53F" />
    </svg>
  ),

  // 28. Pandas
  pandas: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="16" fill="#150458" />
      <rect x="24" y="24" width="22" height="38" rx="4" fill="#FFD13B" />
      <rect x="53" y="24" width="22" height="80" rx="4" fill="#E70488" />
      <rect x="82" y="66" width="22" height="38" rx="4" fill="#00C0FF" />
      <rect x="24" y="66" width="22" height="38" rx="4" fill="#E70488" opacity="0.65" />
    </svg>
  ),

  // 29. OpenCV
  opencv: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="40" r="22" fill="none" stroke="#FF0000" strokeWidth="10" />
      <circle cx="38" cy="86" r="22" fill="none" stroke="#00EE00" strokeWidth="10" />
      <circle cx="90" cy="86" r="22" fill="none" stroke="#0000FF" strokeWidth="10" />
      <circle cx="64" cy="40" r="6" fill="#FF0000" />
      <circle cx="38" cy="86" r="6" fill="#00EE00" />
      <circle cx="90" cy="86" r="6" fill="#0000FF" />
    </svg>
  ),

  // 30. MediaPipe
  mediapipe: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="24" r="14" fill="#0070FF" />
      <circle cx="24" cy="64" r="14" fill="#00D0FF" />
      <circle cx="104" cy="64" r="14" fill="#0070FF" />
      <circle cx="64" cy="104" r="14" fill="#00D0FF" />
      <path d="M64 38v52M38 64h52M34 34l60 60M94 34L34 94" stroke="#ffffff" strokeWidth="4" strokeDasharray="6 6" />
    </svg>
  ),

  // 31. WebSocket
  websocket: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#1E293B" />
      <path d="M40 44l-20 20 20 20M88 44l20 20-20 20" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M72 26L56 102" stroke="#F97316" strokeWidth="10" strokeLinecap="round" />
    </svg>
  ),

  // 32. Vercel
  vercel: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#000000" />
      <path d="M64 24L108 98H20L64 24z" fill="#ffffff" />
    </svg>
  ),

  // 33. Supabase
  supabase: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <circle cx="64" cy="64" r="64" fill="#1C1C1C" />
      <path
        d="M66.5 12.2c1.8-2.2 5.3-.9 5.8 1.8L79 50.8h37.5c3.8 0 5.6 4.3 3.1 6.8L61.5 115.8c-1.8 2.2-5.3.9-5.8-1.8L49 77.2H11.5c-3.8 0-5.6-4.3-3.1-6.8l58.1-58.2z"
        fill="url(#supabase-grad)"
      />
      <defs>
        <linearGradient id="supabase-grad" x1="20" y1="20" x2="108" y2="108" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
      </defs>
    </svg>
  ),

  // 34. Cloudflare
  cloudflare: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M99.5 56.4c-2.3-17.5-17.1-31-35-31-13.4 0-25.2 7.4-31.5 18.2C14.7 46.5 0 62 0 81.2c0 20.8 16.8 37.6 37.6 37.6h63.2c13.7 0 24.8-10.4 24.8-23.7 0-11.9-8.8-21.7-20.3-23.4-.8-5.3-4.3-10.6-5.8-15.3z"
        fill="#F38020"
      />
      <path
        d="M93.8 77.2c-.8-3.4-3.7-5.9-7.2-5.9H47.1c-1.9 0-3.6 1.1-4.4 2.8-.8 1.7-.5 3.7.8 5.1l8.5 9.3c1.2 1.3 2.9 2 4.6 2h37.2c2.1 0 4.1-.9 5.4-2.5 1.3-1.6 1.8-3.8 1.4-5.9l-6.8-4.9z"
        fill="#FAAD3F"
      />
    </svg>
  ),

  // 35. Ollama
  ollama: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <rect width="128" height="128" rx="24" fill="#0F172A" />
      <path
        d="M40 32v-12h14v12M74 32v-12h14v12M34 32h60c9 0 16 7 16 16v38c0 9-7 16-16 16h-6v-18H40v18h-6c-9 0-16-7-16-16V48c0-9 7-16 16-16z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="56" r="6" fill="#0F172A" />
      <circle cx="78" cy="56" r="6" fill="#0F172A" />
    </svg>
  ),

  // 36. Docker
  docker: (
    <svg viewBox="0 0 128 128" className={styles.iconSvg}>
      <path
        d="M69 37h10v10H69zm-16 0h10v10H53zm-16 0h10v10H37zm32-15h10v10H69zm-16 0h10v10H53zm47 40.5c-2.7-2.1-6.5-2.6-10.2-1.6-.4-.1-.7-.3-1.1-.4-1.6-4.3-5-7.9-9.3-9.5L80 50H21c-3.1 0-5.8 2.1-6.7 5.2-2.6 8-2.1 23.9 11 36 12.8 11.9 33.7 12.8 45.7 6.4 12.9-6.9 20.3-19.4 20.3-25.2 0-3.2-.8-6.3-2.3-9.3z"
        fill="#2496ED"
      />
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
