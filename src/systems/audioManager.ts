'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Audio Manager
   
   Singleton manager for the cinematic BGM track (tron_arena_BGM_edited.mp3).
   Handles autoplay, user-gesture fallback, stop on ESC / Skip,
   and playing state subscriptions.
   ═══════════════════════════════════════════════════════════════ */

let audioInstance: HTMLAudioElement | null = null;
let isPlaying = false;
let userStopped = false;
const listeners = new Set<(playing: boolean) => void>();

function notify() {
  listeners.forEach((cb) => cb(isPlaying));
}

let removeInteractionListeners: (() => void) | null = null;
let delayTimer: ReturnType<typeof setTimeout> | null = null;

/** Start the cinematic BGM. Handles browser autoplay policies and optional startup delay. */
export function startBGM(delayMs: number = 0): void {
  if (typeof window === 'undefined') return;
  if (userStopped) return;
  if (isPlaying) return;

  if (delayTimer) {
    clearTimeout(delayTimer);
    delayTimer = null;
  }

  if (delayMs > 0) {
    delayTimer = setTimeout(() => {
      delayTimer = null;
      if (!userStopped && !isPlaying) {
        startBGM(0);
      }
    }, delayMs);
    return;
  }

  if (!audioInstance) {
    audioInstance = new Audio('/tron_arena_BGM_edited.mp3');
    audioInstance.volume = 0.85;
    audioInstance.loop = false;
    audioInstance.preload = 'auto';

    audioInstance.addEventListener('ended', () => {
      isPlaying = false;
      notify();
    });

    audioInstance.addEventListener('pause', () => {
      isPlaying = false;
      notify();
    });

    audioInstance.addEventListener('play', () => {
      isPlaying = true;
      notify();
    });
  }

  // If audio is already playing or ended, handle gracefully
  if (!audioInstance.paused) {
    isPlaying = true;
    notify();
    return;
  }

  const playPromise = audioInstance.play();
  if (playPromise) {
    playPromise
      .then(() => {
        isPlaying = true;
        userStopped = false;
        notify();
      })
      .catch(() => {
        // Autoplay policy prevented immediate playback
        // Attach user gesture listeners on ANY interaction (click, move, key, touch, scroll)
        if (userStopped) return;

        const handleUserGesture = () => {
          if (userStopped || !audioInstance) return;
          audioInstance
            .play()
            .then(() => {
              isPlaying = true;
              notify();
            })
            .catch(() => {});

          cleanupGestureListeners();
        };

        const cleanupGestureListeners = () => {
          window.removeEventListener('click', handleUserGesture);
          window.removeEventListener('keydown', handleUserGesture);
          window.removeEventListener('pointerdown', handleUserGesture);
          window.removeEventListener('pointermove', handleUserGesture);
          window.removeEventListener('mousemove', handleUserGesture);
          window.removeEventListener('touchstart', handleUserGesture);
          window.removeEventListener('wheel', handleUserGesture);
          window.removeEventListener('scroll', handleUserGesture);
          removeInteractionListeners = null;
        };

        removeInteractionListeners = cleanupGestureListeners;

        window.addEventListener('click', handleUserGesture, { passive: true, once: true });
        window.addEventListener('keydown', handleUserGesture, { passive: true, once: true });
        window.addEventListener('pointerdown', handleUserGesture, { passive: true, once: true });
        window.addEventListener('pointermove', handleUserGesture, { passive: true, once: true });
        window.addEventListener('mousemove', handleUserGesture, { passive: true, once: true });
        window.addEventListener('touchstart', handleUserGesture, { passive: true, once: true });
        window.addEventListener('wheel', handleUserGesture, { passive: true, once: true });
        window.addEventListener('scroll', handleUserGesture, { passive: true, once: true });
      });
  }
}

/** Stop the BGM immediately (e.g. on ESC or Skip). */
export function stopBGM(): void {
  userStopped = true;

  if (delayTimer) {
    clearTimeout(delayTimer);
    delayTimer = null;
  }

  if (removeInteractionListeners) {
    removeInteractionListeners();
    removeInteractionListeners = null;
  }

  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }

  isPlaying = false;
  notify();
}

/** Check if BGM is currently playing. */
export function isBGMPlaying(): boolean {
  return isPlaying;
}

/** Subscribe to BGM playing state changes. Returns unsubscribe function. */
export function subscribeBGM(callback: (playing: boolean) => void): () => void {
  listeners.add(callback);
  // Emit current state immediately to new subscriber
  callback(isPlaying);
  return () => {
    listeners.delete(callback);
  };
}
