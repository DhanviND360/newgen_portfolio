'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Cinematic Experience (Master Orchestrator)
   
   Controls the entire cinematic boot sequence.
   - Instantiates the CinematicController state machine
   - Renders the current phase component
   - Mounts SkipControl + FilmGrain overlays
   - Transitions to HomePage when sequence completes
   - Handles ESC key for skip
   - Manages body scroll lock during cinematic
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import {
  CinematicPhase,
  getCinematicController,
} from '@/systems/cinematicController';
import { projects, achievements } from '@/data/portfolio';
import styles from '@/styles/cinematic.module.css';

// Phase components
import InitializingSequence from './InitializingSequence';
import BootSequence from './BootSequence';
import ProjectSequence from './ProjectSequence';
import AchievementSequence from './AchievementSequence';
import CreatorReveal from './CreatorReveal';
import SkipControl from './SkipControl';

// Shared
import FilmGrain from '@/components/shared/FilmGrain';
import HomePage from '@/components/home/HomePage';

export default function CinematicExperience() {
  // Lazy singleton controller — stable across phase re-renders
  const controllerRef = useRef<ReturnType<typeof getCinematicController> | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = getCinematicController();
  }
  const cinematicRootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<CinematicPhase>(controllerRef.current.currentPhase);

  const controller = controllerRef.current;

  // Subscribe to phase changes
  useEffect(() => {
    const unsubscribe = controller.subscribe((newPhase) => {
      setPhase(newPhase);
      if (newPhase === CinematicPhase.HOME) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [controller]);

  // Body scroll lock during cinematic
  useEffect(() => {
    const isCinematic = phase !== CinematicPhase.HOME;

    if (isCinematic) {
      document.body.classList.add('cinematic-active');
    } else {
      document.body.classList.remove('cinematic-active');
    }

    return () => {
      document.body.classList.remove('cinematic-active');
    };
  }, [phase]);

  // ESC key handler for skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && controller.isCinematicActive) {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controller]);

  // Phase completion handler
  const handlePhaseComplete = useCallback(() => {
    controller.advance();
  }, [controller]);

  // Skip handler — kills ALL active GSAP animations to prevent artifacts
  const handleSkip = useCallback(() => {
    if (cinematicRootRef.current) {
      gsap.killTweensOf(cinematicRootRef.current.querySelectorAll('*'));
    }
    controller.skip();
  }, [controller]);

  const isCinematicActive = phase !== CinematicPhase.HOME;

  return (
    <>
      {/* Film grain — always visible */}
      <FilmGrain />

      {/* Cinematic sequence */}
      {isCinematicActive && (
        <div ref={cinematicRootRef} className={styles.cinematicRoot}>
          <InitializingSequence
            isActive={phase === CinematicPhase.INITIALIZING}
            onComplete={handlePhaseComplete}
          />
          <BootSequence
            isActive={phase === CinematicPhase.BOOT}
            onComplete={handlePhaseComplete}
          />
          <ProjectSequence
            isActive={phase === CinematicPhase.PROJECTS}
            projects={projects}
            onComplete={handlePhaseComplete}
          />
          <AchievementSequence
            isActive={phase === CinematicPhase.ACHIEVEMENTS}
            achievements={achievements}
            onComplete={handlePhaseComplete}
          />
          <CreatorReveal
            isActive={phase === CinematicPhase.CREATOR_REVEAL}
            onComplete={handlePhaseComplete}
          />

          {/* Skip control */}
          <SkipControl
            onSkip={handleSkip}
            visible={isCinematicActive}
          />
        </div>
      )}

      {/* Interactive homepage — shown after cinematic */}
      {!isCinematicActive && <HomePage />}
    </>
  );
}
