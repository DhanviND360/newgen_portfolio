'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Arc Reactor Armor Boot Sequence Component
   Macro cinematic shot: Front-facing mechanical armor chestplate
   locking into place with industrial hydraulics, ratcheting
   copper coil perimeter ring, calibrating concentric inner rings,
   and intense cyan-white arc reactor core surge.
   
   Timing: Exactly 4.2 seconds (matches existing boot-up duration)
   ═══════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '@/styles/initializing.module.css';
import { prefersReducedMotion } from '@/systems/animationUtils';

interface InitializingSequenceProps {
  isActive: boolean;
  onComplete: () => void;
}

// 12 micro-segmented copper coil perimeter segments
const COIL_SEGMENTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: i * 30,
}));

// 4 planetary gear positions in the bezel housing
const GEAR_ANGLES = [45, 135, 225, 315];

export default function InitializingSequence({
  isActive,
  onComplete,
}: InitializingSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const macroRigRef = useRef<HTMLDivElement>(null);

  // Armor plate references
  const collarPlateRef = useRef<HTMLDivElement>(null);
  const leftPlateRef = useRef<HTMLDivElement>(null);
  const rightPlateRef = useRef<HTMLDivElement>(null);
  const lowerPlateRef = useRef<HTMLDivElement>(null);

  // Hydraulics & Steam
  const leftRodRef = useRef<HTMLDivElement>(null);
  const rightRodRef = useRef<HTMLDivElement>(null);
  const steamLeftRef = useRef<HTMLDivElement>(null);
  const steamRightRef = useRef<HTMLDivElement>(null);
  const steamTopRef = useRef<HTMLDivElement>(null);
  const steamBottomRef = useRef<HTMLDivElement>(null);

  // Arc Reactor Core references
  const copperRingRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const midRingRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const plasmaWellRef = useRef<HTMLDivElement>(null);
  const plasmaSurgeRef = useRef<HTMLDivElement>(null);
  const volumetricBeamsRef = useRef<HTMLDivElement>(null);
  const anamorphicFlareRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const ambientAuraRef = useRef<HTMLDivElement>(null);
  const gearClusterRef = useRef<HTMLDivElement>(null);

  // Left & Right Side Notices
  const epilepsyNoticeRef = useRef<HTMLDivElement>(null);
  const soundNoticeRef = useRef<HTMLDivElement>(null);
  const volumeFillRef = useRef<HTMLDivElement>(null);

  // Master GSAP Timeline (Exact 4.2 seconds duration)
  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || !container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Handle reduced motion preference gracefully
      if (prefersReducedMotion()) {
        gsap.set(container, { opacity: 1, visibility: 'visible' });
        gsap.set(
          [collarPlateRef.current, leftPlateRef.current, rightPlateRef.current, lowerPlateRef.current],
          { x: 0, y: 0, opacity: 1 }
        );
        gsap.set(plasmaSurgeRef.current, { opacity: 0.9 });
        tl.to({}, { duration: 2.0 });
        tl.call(() => onComplete());
        return;
      }

      // ── Initial States ──
      gsap.set(container, { opacity: 1, visibility: 'visible' });
      gsap.set(macroRigRef.current, { scale: 0.94, y: 0 });

      // Armor plates start displaced outward
      gsap.set(collarPlateRef.current, { y: -65, opacity: 0.8 });
      gsap.set(leftPlateRef.current, { x: -95, opacity: 0.8 });
      gsap.set(rightPlateRef.current, { x: 95, opacity: 0.8 });
      gsap.set(lowerPlateRef.current, { y: 75, opacity: 0.8 });

      // Hydraulic piston rods extended
      gsap.set([leftRodRef.current, rightRodRef.current], { scaleX: 1.5 });

      // Steam hisses hidden
      gsap.set(
        [steamLeftRef.current, steamRightRef.current, steamTopRef.current, steamBottomRef.current],
        { opacity: 0 }
      );

      // Arc reactor dormant standby
      gsap.set(copperRingRef.current, { rotation: 0, scale: 0.98 });
      gsap.set(outerRingRef.current, { rotation: -30 });
      gsap.set(midRingRef.current, { rotation: 45 });
      gsap.set(innerRingRef.current, { rotation: -15 });
      gsap.set(plasmaWellRef.current, { opacity: 0.25, scale: 0.85 });
      gsap.set(plasmaSurgeRef.current, { opacity: 0.1, scale: 0.6 });
      gsap.set(volumetricBeamsRef.current, { opacity: 0, scale: 0.7 });
      gsap.set(anamorphicFlareRef.current, { opacity: 0, scaleX: 0.1 });
      gsap.set(shockwaveRef.current, { opacity: 0, scale: 0.7 });
      gsap.set(ambientAuraRef.current, { opacity: 0.35, scale: 0.8 });

      // Side notices initial states
      gsap.set([epilepsyNoticeRef.current, soundNoticeRef.current], { opacity: 0, y: 10 });
      gsap.set(volumeFillRef.current, { width: '0%' });

      // Query spark nodes for electrical discharge
      const sparkNodes = container.querySelectorAll(`.${styles.coilSparkNode}`);

      // ── Side Notices Reveal & Smooth Volume Slider Ramp ──
      tl.to(
        [epilepsyNoticeRef.current, soundNoticeRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.2
      );

      // Smooth volume slider increase animation on the right side
      tl.fromTo(
        volumeFillRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 2.8,
          ease: 'power1.inOut',
        },
        0.3
      );

      // ═══════════════════════════════════════════════════════════════
      // ACT 1: Industrial Hydraulic Clamping & Armor Lock (0.0s - 0.65s)
      // Heavy dark-metallic mechanical plates slide upward and clamp inward
      // ═══════════════════════════════════════════════════════════════
      tl.to(
        [leftPlateRef.current, rightPlateRef.current],
        {
          x: 0,
          opacity: 1,
          duration: 0.48,
          ease: 'power3.inOut',
        },
        0.05
      )
        .to(
          collarPlateRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.46,
            ease: 'power3.inOut',
          },
          0.06
        )
        .to(
          lowerPlateRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.inOut',
          },
          0.04
        )
        .to(
          [leftRodRef.current, rightRodRef.current],
          {
            scaleX: 1.0,
            duration: 0.46,
            ease: 'power3.inOut',
          },
          0.05
        );

      // Heavy Industrial Clamp Impact & Hydraulic Rebound (0.50s - 0.65s)
      tl.to(
        macroRigRef.current,
        {
          y: -4,
          duration: 0.08,
          ease: 'power4.out',
        },
        0.51
      ).to(
        macroRigRef.current,
        {
          y: 0,
          duration: 0.12,
          ease: 'bounce.out',
        },
        0.59
      );

      // Pneumatic Steam Hiss Vents Fire as Clamps Slam Shut (0.52s - 0.95s)
      tl.fromTo(
        steamLeftRef.current,
        { opacity: 0.85, scaleX: 0.2, filter: 'blur(2px)' },
        { opacity: 0, scaleX: 1.8, filter: 'blur(10px)', duration: 0.45, ease: 'power2.out' },
        0.52
      )
        .fromTo(
          steamRightRef.current,
          { opacity: 0.85, scaleX: 0.2, filter: 'blur(2px)' },
          { opacity: 0, scaleX: 1.8, filter: 'blur(10px)', duration: 0.45, ease: 'power2.out' },
          0.52
        )
        .fromTo(
          steamTopRef.current,
          { opacity: 0.75, scaleY: 0.2, filter: 'blur(2px)' },
          { opacity: 0, scaleY: 1.5, filter: 'blur(8px)', duration: 0.4, ease: 'power2.out' },
          0.53
        )
        .fromTo(
          steamBottomRef.current,
          { opacity: 0.75, scaleY: 0.2, filter: 'blur(2px)' },
          { opacity: 0, scaleY: 1.5, filter: 'blur(8px)', duration: 0.4, ease: 'power2.out' },
          0.53
        );

      // ═══════════════════════════════════════════════════════════════
      // ACT 2: Rapidly Ratcheting Copper Coils & Ring Calibration (0.60s - 3.40s)
      // Micro-segmented copper coil perimeter ring spins rapidly, ratcheting mechanically
      // ═══════════════════════════════════════════════════════════════
      // Macro shot slowly pushes in
      tl.to(
        macroRigRef.current,
        {
          scale: 1.08,
          duration: 2.8,
          ease: 'sine.inOut',
        },
        0.6
      );

      // Copper Coil Ring Rapid Ratcheting Spin
      tl.to(
        copperRingRef.current,
        {
          rotation: 1080,
          scale: 1.0,
          duration: 2.8,
          ease: 'power2.inOut',
        },
        0.6
      );

      // Planetary Gears counter-rotate in sync
      if (gearClusterRef.current) {
        tl.to(
          gearClusterRef.current.querySelectorAll(`.${styles.planetaryGear}`),
          {
            rotation: -720,
            duration: 2.8,
            ease: 'power2.inOut',
          },
          0.6
        );
      }

      // Concentric Metallic Inner Rings Calibrate & Counter-Rotate
      tl.to(
        outerRingRef.current,
        {
          rotation: -420,
          duration: 2.7,
          ease: 'power1.inOut',
        },
        0.65
      )
        .to(
          midRingRef.current,
          {
            rotation: 580,
            duration: 2.7,
            ease: 'power1.inOut',
          },
          0.65
        )
        .to(
          innerRingRef.current,
          {
            rotation: -240,
            duration: 2.6,
            ease: 'steps(10)', // Mechanical step-ratcheting indexing!
          },
          0.7
        );

      // Electrical micro-spark discharges across copper coil nodes
      if (sparkNodes.length > 0) {
        tl.to(
          sparkNodes,
          {
            opacity: 0.9,
            stagger: 0.05,
            duration: 0.08,
            repeat: 4,
            yoyo: true,
            ease: 'none',
          },
          1.1
        );
      }

      // Plasma chamber builds pressure & ambient glow
      tl.to(
        plasmaWellRef.current,
        {
          opacity: 0.85,
          scale: 1.0,
          duration: 1.8,
          ease: 'power2.out',
        },
        0.9
      )
        .to(
          ambientAuraRef.current,
          {
            opacity: 0.75,
            scale: 1.15,
            duration: 2.0,
            ease: 'sine.inOut',
          },
          0.9
        )
        .to(
          volumetricBeamsRef.current,
          {
            opacity: 0.55,
            scale: 1.0,
            rotation: 120,
            duration: 2.4,
            ease: 'power1.out',
          },
          1.0
        );

      // ═══════════════════════════════════════════════════════════════
      // ACT 3: Intense Brilliant Cyan-White Glow Surge & Flare (3.40s - 3.85s)
      // Hyper-realistic volumetric lighting, anamorphic lens flare
      // ═══════════════════════════════════════════════════════════════
      // Intense Surge outward from central mesh core
      tl.to(
        plasmaSurgeRef.current,
        {
          opacity: 1,
          scale: 1.45,
          filter: 'brightness(2.2) drop-shadow(0 0 50px #00f0ff)',
          duration: 0.35,
          ease: 'power4.out',
        },
        3.4
      )
        .to(
          plasmaWellRef.current,
          {
            opacity: 1,
            scale: 1.12,
            filter: 'brightness(1.8) drop-shadow(0 0 35px #ffffff)',
            duration: 0.35,
            ease: 'power4.out',
          },
          3.4
        )
        .to(
          volumetricBeamsRef.current,
          {
            opacity: 0.95,
            scale: 1.4,
            rotation: 260,
            duration: 0.4,
            ease: 'power3.out',
          },
          3.4
        )
        // Anamorphic horizontal lens flare flashes across screen
        .fromTo(
          anamorphicFlareRef.current,
          { opacity: 0, scaleX: 0.05, scaleY: 0.4 },
          { opacity: 1, scaleX: 1.0, scaleY: 1.6, duration: 0.28, ease: 'power2.out' },
          3.42
        )
        // Shockwave expands outward
        .fromTo(
          shockwaveRef.current,
          { opacity: 0.95, scale: 0.8 },
          { opacity: 0, scale: 2.6, duration: 0.45, ease: 'power2.out' },
          3.45
        );

      // ═══════════════════════════════════════════════════════════════
      // ACT 4: Cinematic Discharge Transition Exit (3.85s - 4.20s)
      // Seamless hand-off into next sequence at exactly 4.2 seconds
      // ═══════════════════════════════════════════════════════════════
      tl.to(
        [epilepsyNoticeRef.current, soundNoticeRef.current],
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        3.75
      );

      tl.to(
        macroRigRef.current,
        {
          scale: 1.25,
          duration: 0.35,
          ease: 'power3.in',
        },
        3.85
      )
        .to(
          container,
          {
            opacity: 0,
            filter: 'blur(12px)',
            duration: 0.35,
            ease: 'power3.inOut',
          },
          3.85
        );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className={styles.initRoot}
      id="initializing-sequence"
      role="region"
      aria-label="System Initializing - Arc Reactor Boot Sequence"
    >
      {/* Shallow Depth of Field & Cinematic Vignette */}
      <div className={styles.depthOfFieldOverlay} />

      {/* Volumetric background cyan radiance */}
      <div ref={ambientAuraRef} className={styles.ambientAura} />

      {/* Macro Shot Center Rig */}
      <div className={styles.macroViewport}>
        <div ref={macroRigRef} className={styles.macroRig}>
          {/* Volumetric Radial God-Rays */}
          <div ref={volumetricBeamsRef} className={styles.volumetricBeams} />

          {/* Anamorphic Horizontal Lens Flare Streak */}
          <div ref={anamorphicFlareRef} className={styles.anamorphicFlare} />

          {/* Expanding Plasma Shockwave */}
          <div ref={shockwaveRef} className={styles.shockwaveRing} />

          {/* ════ ARMOR CHESTPLATE STAGE ════ */}
          <div className={styles.armorStage}>
            {/* Dark Metallic Chassis Base */}
            <div className={styles.chassisBase} />

            {/* Armor Plates Container */}
            <div className={styles.chestPlatesContainer}>
              {/* Upper Collar Armor */}
              <div ref={collarPlateRef} className={styles.collarPlate} />

              {/* Left Pectoral Armor Plate with Hydraulics */}
              <div ref={leftPlateRef} className={styles.leftPlate}>
                <div className={styles.plateGroove} style={{ top: '35%', left: 0, width: '100%', height: '2px' }} />
                <div className={styles.plateGroove} style={{ top: '65%', left: 0, width: '100%', height: '2px' }} />
                <div className={styles.hexBolt} style={{ top: '12%', left: '15%' }} />
                <div className={styles.hexBolt} style={{ bottom: '15%', left: '15%' }} />
              </div>

              {/* Right Pectoral Armor Plate with Hydraulics */}
              <div ref={rightPlateRef} className={styles.rightPlate}>
                <div className={styles.plateGroove} style={{ top: '35%', left: 0, width: '100%', height: '2px' }} />
                <div className={styles.plateGroove} style={{ top: '65%', left: 0, width: '100%', height: '2px' }} />
                <div className={styles.hexBolt} style={{ top: '12%', right: '15%' }} />
                <div className={styles.hexBolt} style={{ bottom: '15%', right: '15%' }} />
              </div>

              {/* Lower Sternum / Abdominal Armor */}
              <div ref={lowerPlateRef} className={styles.lowerPlate}>
                <div className={styles.hexBolt} style={{ top: '25%', left: '30%' }} />
                <div className={styles.hexBolt} style={{ top: '25%', right: '30%' }} />
              </div>

              {/* Industrial Hydraulics Cylinders & Chrome Rods */}
              <div className={styles.hydraulicLeft}>
                <div className={styles.hydraulicBarrel} />
                <div ref={leftRodRef} className={styles.hydraulicRod} />
              </div>
              <div className={styles.hydraulicRight}>
                <div className={styles.hydraulicBarrel} />
                <div ref={rightRodRef} className={styles.hydraulicRod} />
              </div>

              {/* Pneumatic Steam Hiss Vents */}
              <div ref={steamLeftRef} className={styles.steamJetLeft} />
              <div ref={steamRightRef} className={styles.steamJetRight} />
              <div ref={steamTopRef} className={styles.steamJetTop} />
              <div ref={steamBottomRef} className={styles.steamJetBottom} />
            </div>
          </div>

          {/* ════ CIRCULAR ARC REACTOR CORE ════ */}
          <div className={styles.reactorContainer}>
            {/* Outer Heavy Bezel & Rim Housing */}
            <div className={styles.bezelCasing}>
              {/* Hydraulic Rim Latches */}
              <div className={`${styles.latchClaw} ${styles.latchClawTop}`} />
              <div className={`${styles.latchClaw} ${styles.latchClawRight}`} />
              <div className={`${styles.latchClaw} ${styles.latchClawBottom}`} />
              <div className={`${styles.latchClaw} ${styles.latchClawLeft}`} />

              {/* Planetary Gears Rotating Inside Housing */}
              <div ref={gearClusterRef} className={styles.gearCluster}>
                {GEAR_ANGLES.map((angle, idx) => {
                  const rad = (angle * Math.PI) / 180;
                  const dist = 42; // percentage from center
                  const left = 50 + dist * Math.cos(rad);
                  const top = 50 + dist * Math.sin(rad);
                  return (
                    <div
                      key={idx}
                      className={styles.planetaryGear}
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        marginLeft: '-13px',
                        marginTop: '-13px',
                      }}
                    />
                  );
                })}
              </div>

              {/* Micro-Segmented Copper Coil Perimeter Ring */}
              <div ref={copperRingRef} className={styles.copperCoilRing}>
                {COIL_SEGMENTS.map((seg) => (
                  <div
                    key={seg.id}
                    className={styles.coilSegment}
                    style={{
                      transform: `rotate(${seg.angle}deg) translateY(-94px)`,
                    }}
                  >
                    <div className={styles.coilCoreBracket} />
                    <div className={styles.copperWireWinding} />
                    <div className={styles.coilCoreBracketBottom} />
                    <div className={styles.coilSparkNode} />
                  </div>
                ))}
              </div>

              {/* Calibrating Concentric Metallic Inner Rings */}
              <div ref={outerRingRef} className={styles.innerRingOuter} />
              <div ref={midRingRef} className={styles.innerRingMiddle} />
              <div ref={innerRingRef} className={styles.innerRingInner} />

              {/* Central Honeycomb Mesh Core & Plasma Well */}
              <div ref={plasmaWellRef} className={styles.plasmaWell}>
                <div className={styles.honeycombCore} />
              </div>

              {/* Blazing White Central Plasma Core */}
              <div ref={plasmaSurgeRef} className={styles.plasmaSurgeCore} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Left Side: EPILEPSY WARNING (Bold constant color, no flashing) ── */}
      <div
        ref={epilepsyNoticeRef}
        id="epilepsy-warning-notice"
        className={styles.epilepsyNotice}
        role="alert"
        aria-label="Epilepsy warning: flashing lights"
      >
        <span className={styles.epilepsyNoticeIcon} aria-hidden="true">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </span>
        <span className={styles.epilepsyNoticeText}>EPILEPSY WARNING</span>
      </div>

      {/* ── Right Side: Smooth volume slider animation with SOUND ON ── */}
      <div
        ref={soundNoticeRef}
        id="sound-on-notice"
        className={styles.soundNotice}
        role="status"
        aria-label="Sound enabled"
      >
        <span className={styles.soundNoticeIcon} aria-hidden="true">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </span>
        <span className={styles.soundNoticeText}>SOUND ON</span>
        <div className={styles.volumeTrack}>
          <div ref={volumeFillRef} className={styles.volumeFill} />
        </div>
      </div>
    </div>
  );
}
