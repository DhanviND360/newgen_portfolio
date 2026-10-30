'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Web Audio Thock Synthesizer
   
   Generates a rich, satisfying, acoustic mechanical switch "thock"
   sound entirely using the native Web Audio API (zero audio files needed).
   
   Architecture:
   - Pitch-swept triangle oscillator (low-frequency resonant body)
   - Bandpass-filtered micro-click transient (tactile bottom-out impact)
   - Dynamic lowpass filter shaping (muffled, warm, creamy acoustic profile)
   - Micro pitch jitter (±6%) to ensure natural variety on consecutive hovers
   - Cooldown rate limiter (~45ms) to prevent sound clutter on fast cursor sweeps
   - Autoplay / AudioContext suspended-state handler
   ═══════════════════════════════════════════════════════════════ */

export type ThockVariant = 'deep' | 'crisp' | 'standard' | 'soft';

interface ThockOptions {
  variant?: ThockVariant;
  volume?: number;
}

let audioCtx: AudioContext | null = null;
let clickBuffer: AudioBuffer | null = null;
let lastPlayTimestamp = 0;
let userGestureBound = false;

/** Initialize or retrieve the singleton AudioContext */
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtxClass) return null;

    try {
      audioCtx = new AudioCtxClass();
    } catch {
      return null;
    }
  }

  // Pre-generate a 15ms acoustic click transient buffer once
  if (audioCtx && !clickBuffer) {
    try {
      const bufferLength = Math.floor(audioCtx.sampleRate * 0.015);
      clickBuffer = audioCtx.createBuffer(1, bufferLength, audioCtx.sampleRate);
      const data = clickBuffer.getChannelData(0);
      for (let i = 0; i < bufferLength; i++) {
        // Fast decaying acoustic impulse
        const decay = Math.exp(-i / (audioCtx.sampleRate * 0.0025));
        data[i] = (Math.random() * 2 - 1) * decay;
      }
    } catch {
      clickBuffer = null;
    }
  }

  // Bind one-time gesture listeners to unlock AudioContext if suspended
  if (audioCtx && audioCtx.state === 'suspended' && !userGestureBound) {
    userGestureBound = true;
    const unlock = () => {
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => { });
      }
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('pointermove', unlock);
    };
    window.addEventListener('pointerdown', unlock, { passive: true, once: true });
    window.addEventListener('keydown', unlock, { passive: true, once: true });
    window.addEventListener('pointermove', unlock, { passive: true, once: true });
  }

  return audioCtx;
}

/**
 * Play a satisfying mechanical "thock" sound effect.
 *
 * Variants:
 * - 'deep': Lower resonant body, rich bass punch (best for large project cards/folders)
 * - 'crisp': Snappy tactile pop, fast decay (best for achievement image tiles & gallery photos)
 * - 'standard': Balanced creamy mechanical switch sound
 * - 'soft': Gentle muted click
 */
export function playThock(options?: ThockVariant | ThockOptions): void {
  if (typeof window === 'undefined') return;

  // Rate limiter: prevent overlapping sounds within 40ms
  const nowMs = performance.now();
  if (nowMs - lastPlayTimestamp < 40) return;
  lastPlayTimestamp = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => { });
  }

  // Parse options
  let variant: ThockVariant = 'standard';
  let customVolume: number | undefined;

  if (typeof options === 'string') {
    variant = options;
  } else if (options) {
    variant = options.variant ?? 'standard';
    customVolume = options.volume;
  }

  const now = ctx.currentTime;

  // Sound parameter tuning based on variant
  let startFreq = 185;
  let endFreq = 60;
  let decayTime = 0.06;
  let filterCutoff = 800;
  let volume = customVolume ?? 0.22;

  switch (variant) {
    case 'deep':
      startFreq = 150;
      endFreq = 48;
      decayTime = 0.075;
      filterCutoff = 650;
      volume = customVolume ?? 0.50; // +20% volume boost (from 0.26) for rich tactile project card hover
      break;

    case 'crisp':
      startFreq = 215;
      endFreq = 72;
      decayTime = 0.05;
      filterCutoff = 1050;
      volume = customVolume ?? 0.20;
      break;

    case 'soft':
      startFreq = 170;
      endFreq = 55;
      decayTime = 0.045;
      filterCutoff = 720;
      volume = customVolume ?? 0.14;
      break;

    case 'standard':
    default:
      startFreq = 185;
      endFreq = 60;
      decayTime = 0.06;
      filterCutoff = 800;
      volume = customVolume ?? 0.22;
      break;
  }

  // Micro pitch jitter (±5%) for organic non-robotic acoustic feedback
  const jitter = 1 + (Math.random() * 0.1 - 0.05);
  startFreq *= jitter;
  endFreq *= jitter;

  try {
    // ── 1. Resonant Body (Triangle wave with rapid pitch drop) ──
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(25, endFreq), now + decayTime * 0.75);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.linearRampToValueAtTime(volume, now + 0.002); // 2ms attack punch
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

    // ── 2. Impact Transient Click (High-frequency tactile contact) ──
    let noiseGain: GainNode | null = null;
    let noiseSource: AudioBufferSourceNode | null = null;

    if (clickBuffer) {
      noiseSource = ctx.createBufferSource();
      noiseSource.buffer = clickBuffer;

      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = 'bandpass';
      clickFilter.frequency.setValueAtTime(filterCutoff * 1.35, now);
      clickFilter.Q.setValueAtTime(2.6, now);

      noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(volume * 0.85, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

      noiseSource.connect(clickFilter);
      clickFilter.connect(noiseGain);
    }

    // ── 3. Master Acoustic Filter (Warm, creamy lowpass roll-off) ──
    const masterFilter = ctx.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.setValueAtTime(filterCutoff, now);
    masterFilter.frequency.linearRampToValueAtTime(filterCutoff * 0.65, now + decayTime);

    // Routing
    osc.connect(oscGain);
    oscGain.connect(masterFilter);

    if (noiseSource && noiseGain) {
      noiseGain.connect(masterFilter);
    }

    masterFilter.connect(ctx.destination);

    // Trigger playback
    osc.start(now);
    if (noiseSource) {
      noiseSource.start(now);
      noiseSource.stop(now + 0.02);
    }
    osc.stop(now + decayTime + 0.02);

    // Auto cleanup nodes after playback finishes
    setTimeout(() => {
      try {
        osc.disconnect();
        oscGain.disconnect();
        masterFilter.disconnect();
        if (noiseGain) noiseGain.disconnect();
      } catch {
        // Ignored on already disconnected nodes
      }
    }, (decayTime + 0.05) * 1000);
  } catch {
    // Graceful fallback if Web Audio is unsupported or restricted
  }
}

/** Harmonic space synth scale frequencies corresponding to the 6 orbital nodes */
const SPACE_SYNTH_FREQUENCIES = [
  523.25, // C5  - Node 0 (PROJECTS)
  587.33, // D5  - Node 1 (ACHIEVEMENTS)
  659.25, // E5  - Node 2 (ABOUT)
  783.99, // G5  - Node 3 (CONTACT)
  880.00, // A5  - Node 4 (GALLERY)
  1046.50, // C6 - Node 5 (EXPERIENCE)
];

export interface SpaceSynthOptions {
  nodeIndex?: number;
  frequency?: number;
  volume?: number;
  duration?: number;
}

let lastSpaceSynthTimestamp = 0;

/**
 * Play a short, futuristic space synth hover chirp with resonant harmonics.
 * Perfect for cosmic/orbital UI nodes and futuristic telemetry interfaces.
 */
export function playSpaceSynth(param?: number | SpaceSynthOptions): void {
  if (typeof window === 'undefined') return;

  const nowMs = performance.now();
  if (nowMs - lastSpaceSynthTimestamp < 35) return;
  lastSpaceSynthTimestamp = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => { });
  }

  let nodeIndex = 0;
  let customFreq: number | undefined;
  let volume = 0.16;
  let duration = 0.16;

  if (typeof param === 'number') {
    nodeIndex = Math.max(0, Math.min(param, SPACE_SYNTH_FREQUENCIES.length - 1));
  } else if (param) {
    if (param.nodeIndex !== undefined) {
      nodeIndex = Math.max(0, Math.min(param.nodeIndex, SPACE_SYNTH_FREQUENCIES.length - 1));
    }
    customFreq = param.frequency;
    if (param.volume !== undefined) volume = param.volume;
    if (param.duration !== undefined) duration = param.duration;
  }

  const baseFreq = customFreq ?? SPACE_SYNTH_FREQUENCIES[nodeIndex] ?? 659.25;
  const now = ctx.currentTime;

  try {
    // 1. Primary Tone (Sine with subtle micro-chirp glide)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq * 0.94, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.025);

    const osc1Gain = ctx.createGain();
    osc1Gain.gain.setValueAtTime(0.0001, now);
    osc1Gain.gain.linearRampToValueAtTime(volume, now + 0.004);
    osc1Gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // 2. Shimmer Harmonic (Octave + detuned fifth for ethereal sci-fi halo)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.5 + 2.5, now);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2 + 1.5, now + duration * 0.5);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.0001, now);
    osc2Gain.gain.linearRampToValueAtTime(volume * 0.38, now + 0.008);
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.85);

    // 3. Resonant Sci-Fi Filter Sweep (creates that futuristic laser/telemetry sweep)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(baseFreq * 1.2, now);
    filter.frequency.exponentialRampToValueAtTime(baseFreq * 3.2, now + 0.035);
    filter.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now + duration);
    filter.Q.setValueAtTime(3.8, now);

    // 4. Clean Master Output
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1.0, now);

    // Routing
    osc1.connect(osc1Gain);
    osc1Gain.connect(masterGain);

    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(masterGain);

    masterGain.connect(ctx.destination);

    // Start & schedule stop
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.02);
    osc2.stop(now + duration + 0.02);

    // Cleanup
    setTimeout(() => {
      try {
        osc1.disconnect();
        osc2.disconnect();
        osc1Gain.disconnect();
        osc2Gain.disconnect();
        filter.disconnect();
        masterGain.disconnect();
      } catch { }
    }, (duration + 0.05) * 1000);
  } catch { }
}

