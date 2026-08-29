/* ═══════════════════════════════════════════════════════════════
   DHANVI — Cinematic Controller
   Framework-agnostic state machine for the cinematic boot sequence.
   
   Phases: BOOT → INTRO → PROJECTS → ACHIEVEMENTS → CREATOR_REVEAL → HOME
   
   Features:
   - Automatic time-based progression
   - Skip to HOME
   - Restart (dev mode)
   - Event-driven: components subscribe to phase changes
   - Phase metadata (duration hints for animation systems)
   ═══════════════════════════════════════════════════════════════ */

export enum CinematicPhase {
  BOOT = 'BOOT',
  PROJECTS = 'PROJECTS',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  CREATOR_REVEAL = 'CREATOR_REVEAL',
  HOME = 'HOME',
}

/** Ordered sequence of cinematic phases */
export const PHASE_ORDER: CinematicPhase[] = [
  CinematicPhase.BOOT,
  CinematicPhase.PROJECTS,
  CinematicPhase.ACHIEVEMENTS,
  CinematicPhase.CREATOR_REVEAL,
  CinematicPhase.HOME,
];

/** Duration hints (ms) for each phase — animation systems use these to build timelines */
export const PHASE_DURATIONS: Record<CinematicPhase, number> = {
  [CinematicPhase.BOOT]: 4000,
  [CinematicPhase.PROJECTS]: 24000, // ~6s per project × 4 projects (entry + hold + exit w/ overlaps)
  [CinematicPhase.ACHIEVEMENTS]: 22000, // title (3.5s) + 4 achievements × ~4s + recession (2.5s)
  [CinematicPhase.CREATOR_REVEAL]: 9500,
  [CinematicPhase.HOME]: 0, // Terminal state — no duration
};

/** Phases that are part of the cinematic sequence (not HOME) */
export const CINEMATIC_PHASES = PHASE_ORDER.filter(
  (p) => p !== CinematicPhase.HOME
);

export type PhaseChangeCallback = (
  newPhase: CinematicPhase,
  previousPhase: CinematicPhase | null
) => void;

export interface CinematicControllerState {
  currentPhase: CinematicPhase;
  previousPhase: CinematicPhase | null;
  isComplete: boolean;
  isCinematicActive: boolean;
  phaseIndex: number;
}

export class CinematicController {
  private _currentPhase: CinematicPhase = CinematicPhase.BOOT;
  private _previousPhase: CinematicPhase | null = null;
  private _listeners: Set<PhaseChangeCallback> = new Set();
  private _phaseCompleteCallbacks: Map<CinematicPhase, () => void> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      console.log(
        '%c[DHANVI] Cinematic Controller initialized',
        'color: #3edcc4; font-weight: bold;'
      );
    }
  }

  // ── Getters ──

  get currentPhase(): CinematicPhase {
    return this._currentPhase;
  }

  get previousPhase(): CinematicPhase | null {
    return this._previousPhase;
  }

  get isComplete(): boolean {
    return this._currentPhase === CinematicPhase.HOME;
  }

  get isCinematicActive(): boolean {
    return this._currentPhase !== CinematicPhase.HOME;
  }

  get phaseIndex(): number {
    return PHASE_ORDER.indexOf(this._currentPhase);
  }

  get state(): CinematicControllerState {
    return {
      currentPhase: this._currentPhase,
      previousPhase: this._previousPhase,
      isComplete: this.isComplete,
      isCinematicActive: this.isCinematicActive,
      phaseIndex: this.phaseIndex,
    };
  }

  // ── Phase Transitions ──

  /** Advance to the next phase in sequence */
  advance(): void {
    const currentIndex = PHASE_ORDER.indexOf(this._currentPhase);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= PHASE_ORDER.length) {
      // Already at HOME — nothing to advance to
      return;
    }

    this._transitionTo(PHASE_ORDER[nextIndex]);
  }

  /** Skip directly to HOME, bypassing remaining phases */
  skip(): void {
    if (this.isComplete) return;

    if (typeof window !== 'undefined') {
      console.log(
        '%c[DHANVI] Sequence skipped → HOME',
        'color: #c43e3e; font-weight: bold;'
      );
    }

    this._transitionTo(CinematicPhase.HOME);
  }

  /** Restart from BOOT (development only) */
  restart(): void {
    if (typeof window !== 'undefined') {
      console.log(
        '%c[DHANVI] Sequence restarted → BOOT',
        'color: #c43e3e; font-weight: bold;'
      );
    }

    this._transitionTo(CinematicPhase.BOOT);
  }

  /** Transition to a specific phase */
  goTo(phase: CinematicPhase): void {
    this._transitionTo(phase);
  }

  // ── Subscriptions ──

  /** Subscribe to phase changes. Returns unsubscribe function. */
  subscribe(callback: PhaseChangeCallback): () => void {
    this._listeners.add(callback);
    return () => {
      this._listeners.delete(callback);
    };
  }

  /** Register a callback for when a specific phase completes */
  onPhaseComplete(phase: CinematicPhase, callback: () => void): void {
    this._phaseCompleteCallbacks.set(phase, callback);
  }

  /** Signal that the current phase's animation is complete */
  completeCurrentPhase(): void {
    const callback = this._phaseCompleteCallbacks.get(this._currentPhase);
    if (callback) {
      callback();
    }
    this.advance();
  }

  // ── Utilities ──

  /** Get the duration hint for a phase */
  getPhaseDuration(phase?: CinematicPhase): number {
    return PHASE_DURATIONS[phase ?? this._currentPhase];
  }

  /** Check if a phase has been reached (current or past) */
  hasReached(phase: CinematicPhase): boolean {
    return PHASE_ORDER.indexOf(this._currentPhase) >= PHASE_ORDER.indexOf(phase);
  }

  /** Destroy the controller and clean up */
  destroy(): void {
    this._listeners.clear();
    this._phaseCompleteCallbacks.clear();
  }

  // ── Internal ──

  private _transitionTo(phase: CinematicPhase): void {
    if (phase === this._currentPhase) return;

    this._previousPhase = this._currentPhase;
    this._currentPhase = phase;

    if (typeof window !== 'undefined') {
      const prev = this._previousPhase ?? 'null';
      console.log(
        `%c[DHANVI] Phase: ${prev} → ${phase}`,
        'color: #3edcc4;'
      );
    }

    // Notify all subscribers
    this._listeners.forEach((cb) => {
      try {
        cb(this._currentPhase, this._previousPhase);
      } catch (err) {
        console.error('[DHANVI] Phase change listener error:', err);
      }
    });
  }
}

/** Singleton — shared across the application */
let _instance: CinematicController | null = null;

export function getCinematicController(): CinematicController {
  if (!_instance) {
    _instance = new CinematicController();
  }
  return _instance;
}

/** Reset the singleton (for dev/testing) */
export function resetCinematicController(): CinematicController {
  if (_instance) {
    _instance.destroy();
  }
  _instance = new CinematicController();
  return _instance;
}
