'use client';

import { useState, useEffect } from 'react';

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const KEY = 'dhanvi_portfolio_views_prod';

    // Avoid multiple count increments within the same browser session
    const isNewSession =
      typeof window !== 'undefined' &&
      !sessionStorage.getItem('dhanvi_session_counted');

    const endpoint = isNewSession
      ? `https://countapi.mileshilliard.com/api/v1/hit/${KEY}`
      : `https://countapi.mileshilliard.com/api/v1/get/${KEY}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data && typeof data.value !== 'undefined') {
          const val = Number(data.value);
          setViews(val);
          if (isNewSession) {
            sessionStorage.setItem('dhanvi_session_counted', '1');
          }
          localStorage.setItem('dhanvi_cached_views', String(val));
        }
      })
      .catch(() => {
        if (!isMounted) return;
        const cached = localStorage.getItem('dhanvi_cached_views');
        if (cached) {
          setViews(Number(cached));
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (views === null) return null;

  return (
    <span
      style={{
        position: 'absolute',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '9px',
        fontFamily: 'var(--font-jetbrains, monospace)',
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: '0.05em',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 10,
        textTransform: 'lowercase',
      }}
      aria-label={`Views: ${views}`}
    >
      views: {views}
    </span>
  );
}

