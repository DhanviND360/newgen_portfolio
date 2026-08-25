'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Project Sequence (Cinematic 3D Zoom-Out)
   
   THE CAMERA CONCEPT:
   
   All projects exist as physical planes in a deep 3D space,
   placed at increasing z-depths (farther away from camera).
   
   A "camera rig" wrapper translates backward along the Z-axis,
   creating the illusion of a camera physically pulling backward
   through an enormous digital exhibition space.
   
   Progression:
   1. Camera starts close to PROJECT 01 (z = 0)
   2. PROJECT 01 materializes: blurred → sharp → hold
   3. Camera begins pulling BACKWARD (translateZ goes negative)
   4. PROJECT 01 recedes, edges blur with distance
   5. PROJECT 02 (placed deeper in z-space) comes into frame
   6. Repeat: continuous backward movement through the space
   
   Depth effects:
   - CSS perspective on the viewport container
   - translateZ on the camera rig for backward movement
   - Per-project blur based on distance from camera focal plane
   - Subtle parallax on visual vs text elements
   - Lens flare and grid geometry for spatial awareness
   - Scale transitions for cinematic depth perception
   
   Driven entirely by GSAP master timeline. No scroll. No input.
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useCallback, createRef } from 'react';
import gsap from 'gsap';
import type { Project } from '@/data/portfolio';
import ProjectScene, { type ProjectSceneRefs } from './ProjectScene';
import styles from '@/styles/projects.module.css';
import {
  createPhaseTimeline,
  safeDuration,
  safeEase,
  EASE,
  DURATION,
  prefersReducedMotion,
} from '@/systems/animationUtils';

interface ProjectSequenceProps {
  isActive: boolean;
  projects: Project[];
  onComplete: () => void;
}

/* ── Spatial Constants ── */
const SPACE = {
  /** Z-distance between each project plane in the exhibition space */
  projectDepth: 600,
  /** Initial z-offset for the camera (close to first project) */
  cameraStartZ: 100,
} as const;

/* ── Timing Constants (seconds) ── */
const TIMING = {
  /** Duration of the header entrance */
  headerIn: 0.8,
  /** Pause before first project appears */
  preProjectGap: 0.3,
  /** Duration for the camera to move toward a project (approach phase) */
  cameraApproach: 1.8,
  /** Duration the project is held in sharp focus */
  sceneHold: 3.0,
  /** Duration for the camera to pull backward past a project */
  cameraPullback: 2.0,
  /** Stagger offset for text elements within a scene */
  textStagger: 0.08,
  /** Duration for the divider line to expand */
  dividerExpand: 0.5,
  /** Pause after last project exits before advancing */
  postSequenceGap: 0.6,
} as const;

/* ── Depth Particle Positions (floating in the space) ── */
const DEPTH_PARTICLES = [
  { x: '10%', y: '20%', z: -200, size: 2 },
  { x: '85%', y: '15%', z: -400, size: 1.5 },
  { x: '30%', y: '75%', z: -150, size: 2.5 },
  { x: '70%', y: '60%', z: -500, size: 1 },
  { x: '50%', y: '35%', z: -300, size: 1.5 },
  { x: '15%', y: '85%', z: -600, size: 2 },
  { x: '90%', y: '45%', z: -250, size: 1 },
  { x: '40%', y: '10%', z: -450, size: 2 },
  { x: '65%', y: '90%', z: -350, size: 1.5 },
  { x: '25%', y: '50%', z: -550, size: 1 },
];

export default function ProjectSequence({
  isActive,
  projects,
  onComplete,
}: ProjectSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRigRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const ambientGridRef = useRef<HTMLDivElement>(null);
  const lensFlareRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Create stable refs for each project scene
  const sceneRefs = useRef(
    projects.map(() => createRef<ProjectSceneRefs>())
  );

  const buildTimeline = useCallback(() => {
    if (!containerRef.current || !cameraRigRef.current) return null;

    const tl = createPhaseTimeline({
      onComplete: () => {
        onComplete();
      },
    });

    const cameraRig = cameraRigRef.current;
    const header = headerRef.current;
    const headerLine = headerLineRef.current;
    const ambientGrid = ambientGridRef.current;
    const lensFlare = lensFlareRef.current;

    // ── Reduced motion: show all projects briefly, then advance ──
    if (prefersReducedMotion()) {
      sceneRefs.current.forEach((ref) => {
        const scene = ref.current;
        if (!scene?.root) return;
        tl.set(scene.root, { opacity: 1 });
        tl.set(
          [scene.number, scene.title, scene.subtitle, scene.description, scene.tagContainer],
          { opacity: 1 }
        );
        if (scene.impactItems.length) {
          tl.set(scene.impactItems, { opacity: 1 });
        }
      });
      tl.to({}, { duration: 2 });
      return tl;
    }

    let cursor = 0; // timeline cursor in seconds

    // ═══════════════════════════════════════════════════
    // AMBIENT ENVIRONMENT: Grid + Lens Flare fade in
    // ═══════════════════════════════════════════════════

    if (ambientGrid) {
      tl.to(ambientGrid, {
        opacity: 1,
        duration: safeDuration(1.2),
        ease: safeEase(EASE.cinematic),
      }, cursor);
    }

    if (lensFlare) {
      tl.to(lensFlare, {
        opacity: 1,
        duration: safeDuration(2.0),
        ease: safeEase(EASE.cinematic),
      }, cursor + 0.3);
    }

    // ═══════════════════════════════════════════════════
    // HEADER: "SELECTED WORKS" line + label
    // ═══════════════════════════════════════════════════

    if (header && headerLine) {
      tl.to(header, {
        opacity: 1,
        duration: safeDuration(0.4),
        ease: safeEase(EASE.snappy),
      }, cursor);

      tl.to(headerLine, {
        width: '60px',
        duration: safeDuration(TIMING.headerIn),
        ease: safeEase(EASE.expo),
      }, cursor);

      cursor += TIMING.headerIn + TIMING.preProjectGap;
    }

    // ═══════════════════════════════════════════════════
    // INITIAL CAMERA POSITION — start slightly forward
    // ═══════════════════════════════════════════════════
    tl.set(cameraRig, {
      z: SPACE.cameraStartZ,
    }, 0);

    // ═══════════════════════════════════════════════════
    // PROJECT SCENES — placed at increasing z-depths
    // ═══════════════════════════════════════════════════

    sceneRefs.current.forEach((ref, index) => {
      const scene = ref.current;
      if (!scene?.root) return;

      const isLast = index === projects.length - 1;
      const projectZ = -(index * SPACE.projectDepth);

      // ── Position each project scene at its z-depth ──
      tl.set(scene.root, {
        z: projectZ,
        opacity: 0,
        filter: 'blur(12px)',
        scale: 0.7,
      }, 0);

      // ── PHASE 1: APPROACH — Camera moves toward this project ──
      const approachStart = cursor;

      // Fade in the scene as the camera approaches
      tl.to(scene.root, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: safeDuration(TIMING.cameraApproach),
        ease: safeEase(EASE.cinematic),
      }, approachStart);

      // Move camera rig to align with this project's z-position
      tl.to(cameraRig, {
        z: -projectZ,
        duration: safeDuration(TIMING.cameraApproach),
        ease: safeEase('power2.inOut'),
      }, approachStart);

      // Visual frame: parallax — slightly delayed, emphasizing depth
      if (scene.visual) {
        tl.fromTo(
          scene.visual,
          {
            x: -40,
            scale: 0.9,
            opacity: 0,
          },
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: safeDuration(TIMING.cameraApproach * 0.85),
            ease: safeEase(EASE.cinematic),
          },
          approachStart + 0.2
        );
      }

      // ── Text elements: sequential reveal during approach ──
      const textStart = approachStart + TIMING.cameraApproach * 0.4;
      let textOffset = 0;

      // Project number
      if (scene.number) {
        tl.fromTo(
          scene.number,
          { opacity: 0, y: 20, x: 15 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: safeDuration(DURATION.normal),
            ease: safeEase(EASE.cinematic),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger;
      }

      // Title — the hero element, dramatic entrance
      if (scene.title) {
        tl.fromTo(
          scene.title,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: safeDuration(DURATION.cinematic),
            ease: safeEase(EASE.cinematic),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger * 2;
      }

      // Subtitle
      if (scene.subtitle) {
        tl.fromTo(
          scene.subtitle,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: safeDuration(DURATION.normal),
            ease: safeEase(EASE.cinematic),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger;
      }

      // Divider line expand
      if (scene.divider) {
        tl.to(
          scene.divider,
          {
            width: '100%',
            duration: safeDuration(TIMING.dividerExpand),
            ease: safeEase(EASE.expo),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger * 0.8;
      }

      // Description
      if (scene.description) {
        tl.fromTo(
          scene.description,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: safeDuration(DURATION.normal),
            ease: safeEase(EASE.cinematic),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger;
      }

      // Impact points (staggered)
      if (scene.impactItems.length > 0) {
        tl.fromTo(
          scene.impactItems,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: safeDuration(DURATION.normal),
            ease: safeEase(EASE.cinematic),
            stagger: safeDuration(TIMING.textStagger),
          },
          textStart + textOffset
        );
        textOffset += TIMING.textStagger * scene.impactItems.length;
      }

      // Tech tags
      if (scene.tagContainer) {
        tl.fromTo(
          scene.tagContainer,
          { opacity: 0 },
          {
            opacity: 1,
            duration: safeDuration(DURATION.normal),
            ease: safeEase(EASE.snappy),
          },
          textStart + textOffset
        );
      }

      // ── PHASE 2: HOLD — Scene in sharp focus ──
      const holdStart = approachStart + TIMING.cameraApproach;
      cursor = holdStart + TIMING.sceneHold;

      // Subtle lens flare pulse during hold
      if (lensFlare) {
        tl.to(lensFlare, {
          opacity: 0.7 + (index * 0.1),
          x: index % 2 === 0 ? 30 : -30,
          duration: safeDuration(TIMING.sceneHold * 0.6),
          ease: safeEase('sine.inOut'),
        }, holdStart);
      }

      // ── PHASE 3: PULLBACK — Camera pulls backward, project recedes ──
      if (!isLast) {
        // The project blurs and shrinks as camera moves away
        tl.to(scene.root, {
          filter: 'blur(8px)',
          scale: 0.65,
          opacity: 0.15,
          duration: safeDuration(TIMING.cameraPullback),
          ease: safeEase(EASE.dramatic),
        }, cursor);

        // Parallax: visual frame recedes slightly faster
        if (scene.visual) {
          tl.to(scene.visual, {
            scale: 0.85,
            opacity: 0.2,
            duration: safeDuration(TIMING.cameraPullback * 0.9),
            ease: safeEase(EASE.dramatic),
          }, cursor);
        }

        // Move camera rig backward toward next project
        // (camera z will be set in the next project's approach phase)

        cursor += TIMING.cameraPullback * 0.4; // overlap: next project starts approaching before this fully recedes
      } else {
        // Last project: elegant fade out + camera keeps pulling back
        tl.to(scene.root, {
          opacity: 0,
          filter: 'blur(10px)',
          scale: 0.5,
          duration: safeDuration(TIMING.cameraPullback),
          ease: safeEase(EASE.dramatic),
        }, cursor);

        // Camera drifts further backward
        tl.to(cameraRig, {
          z: -projectZ - SPACE.projectDepth * 0.5,
          duration: safeDuration(TIMING.cameraPullback),
          ease: safeEase('power2.in'),
        }, cursor);

        cursor += TIMING.cameraPullback;
      }
    });

    // ═══════════════════════════════════════════════════
    // FADE OUT AMBIENT ENVIRONMENT
    // ═══════════════════════════════════════════════════

    if (ambientGrid) {
      tl.to(ambientGrid, {
        opacity: 0,
        duration: safeDuration(0.8),
        ease: safeEase(EASE.snappy),
      }, cursor - TIMING.cameraPullback * 0.6);
    }

    if (lensFlare) {
      tl.to(lensFlare, {
        opacity: 0,
        duration: safeDuration(0.6),
        ease: safeEase(EASE.snappy),
      }, cursor - TIMING.cameraPullback * 0.5);
    }

    // ── Fade out header alongside last project exit ──
    if (header) {
      tl.to(
        header,
        {
          opacity: 0,
          duration: safeDuration(DURATION.fast),
          ease: safeEase(EASE.snappy),
        },
        cursor - TIMING.cameraPullback * 0.5
      );
    }

    // ── Final gap before advancing to ACHIEVEMENTS ──
    tl.to({}, { duration: TIMING.postSequenceGap }, cursor);

    return tl;
  }, [onComplete, projects.length]);

  // Play when active
  useEffect(() => {
    if (!isActive) {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      return;
    }

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      const tl = buildTimeline();
      if (tl) {
        timelineRef.current = tl;
        tl.play();
      }
    }, 80);

    return () => {
      clearTimeout(initTimeout);
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [isActive, buildTimeline]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className={styles.sequenceRoot}
      aria-label="Project showcase sequence"
    >
      {/* 3D Camera Rig — translates backward through space */}
      <div ref={cameraRigRef} className={styles.cameraRig}>
        {/* Ambient cyan grid geometry (deep in background) */}
        <div ref={ambientGridRef} className={styles.ambientGrid} />

        {/* Depth particles floating in space */}
        {DEPTH_PARTICLES.map((particle, i) => (
          <div
            key={i}
            className={styles.depthParticle}
            style={{
              left: particle.x,
              top: particle.y,
              transform: `translateZ(${particle.z}px)`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}

        {/* Project scenes — positioned at increasing z-depths */}
        {projects.map((project, index) => (
          <ProjectScene
            key={project.id}
            ref={sceneRefs.current[index]}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      {/* Lens flare overlay (moves with camera) */}
      <div ref={lensFlareRef} className={styles.lensFlare} />

      {/* Section header (fixed UI layer) */}
      <div ref={headerRef} className={styles.sequenceHeader}>
        <div ref={headerLineRef} className={styles.sequenceHeaderLine} />
        <span className={styles.sequenceHeaderLabel}>Selected Works</span>
      </div>
    </div>
  );
}
