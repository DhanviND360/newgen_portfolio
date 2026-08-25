'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — ViewportProvider
   React context for viewport dimensions and device classification.
   Used throughout to adjust layout and effects.
   ═══════════════════════════════════════════════════════════════ */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

export interface ViewportState {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

function getViewportState(): ViewportState {
  if (typeof window === 'undefined') {
    // SSR fallback — assume desktop
    return {
      width: 1440,
      height: 900,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
    isMobile: width < MOBILE_BREAKPOINT,
    isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
    isDesktop: width >= TABLET_BREAKPOINT,
  };
}

const ViewportContext = createContext<ViewportState>(getViewportState());

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [viewport, setViewport] = useState<ViewportState>(getViewportState);

  const handleResize = useCallback(() => {
    setViewport(getViewportState());
  }, []);

  useEffect(() => {
    // Debounced resize listener
    let timeoutId: ReturnType<typeof setTimeout>;

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);

    // Set initial value on mount
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [handleResize]);

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport(): ViewportState {
  return useContext(ViewportContext);
}
