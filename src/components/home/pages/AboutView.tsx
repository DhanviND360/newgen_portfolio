'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — About Page View
   Manifesto, engineering philosophy, timeline, and skills matrix.
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import styles from '@/styles/node-pages.module.css';
import { creator, aboutTimeline, skillCategories } from '@/data/portfolio';

export default function AboutView() {
  return (
    <div className={styles.aboutGrid}>
      {/* Left Column: Manifesto & Career Timeline */}
      <div className={styles.aboutManifesto}>
        <h2 className={styles.manifestoHeading}>
          BUILDING AT THE INTERSECTION OF <span>ARCHITECTURE</span> & <span>MOTION</span>.
        </h2>

        <p className={styles.manifestoText}>
          I am {creator.firstName} ({creator.name}), a {creator.title.toLowerCase()} based in{' '}
          {creator.location}. My work is founded on the conviction that software should not simply
          function — it should feel alive, authoritative, and physically resonant.
        </p>

        <p className={styles.manifestoText}>
          I specialize in architecting high-throughput distributed systems, real-time reactive
          applications, and GPU-driven spatial web graphics. Whether designing zero-knowledge
          cryptographic relay networks or custom WebGPU shader pipelines, I treat code as rigorous
          architecture and animation as kinetic sculpture.
        </p>

        <div className={styles.timelineSection}>
          <h3 className={styles.sectionHeaderSmall}>ENGINEERING TRAJECTORY</h3>
          <div className={styles.timelineList}>
            {aboutTimeline.map((item, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{item.year}</span>
                <h4 className={styles.timelineRole}>{item.role}</h4>
                <p className={styles.timelineCompany}>{item.company}</p>
                <p className={styles.timelineDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Skills Matrix */}
      <div className={styles.skillsColumn}>
        <h3 className={styles.sectionHeaderSmall}>TECHNICAL ARSENAL</h3>
        {skillCategories.map((cat, idx) => (
          <div key={idx} className={styles.skillBox}>
            <h4 className={styles.skillBoxTitle}>{cat.title}</h4>
            <div className={styles.skillPills}>
              {cat.skills.map((skill) => (
                <span key={skill} className={styles.skillPill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
