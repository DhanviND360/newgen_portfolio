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

/** Start the cinematic BGM. Handles browser autoplay policies. */
export function startBGM(): void {
  if (typeof window === 'undefined') return;
  if (userStopped) return;
  if (isPlaying) return;

  if (!audioInstance) {
    audioInstance = new Audio('/tron_arena_BGM_edited.mp3');
    audioInstance.volume = 0.75;
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
        // Attach one-time user gesture listeners to start audio immediately on user interaction
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
          window.removeEventListener('touchstart', handleUserGesture);
          removeInteractionListeners = null;
        };

        removeInteractionListeners = cleanupGestureListeners;

        window.addEventListener('click', handleUserGesture, { passive: true });
        window.addEventListener('keydown', handleUserGesture, { passive: true });
        window.addEventListener('pointerdown', handleUserGesture, { passive: true });
        window.addEventListener('touchstart', handleUserGesture, { passive: true });
      });
  }
}

/** Stop the BGM immediately (e.g. on ESC or Skip). */
export function stopBGM(): void {
  userStopped = true;

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
