'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Projects Page View
   Interactive showcase of all engineering projects.
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import styles from '@/styles/node-pages.module.css';
import { projects } from '@/data/portfolio';

export default function ProjectsView() {
  return (
    <div className={styles.projectsGrid}>
      {projects.map((project) => (
        <article key={project.id} className={styles.projectCard}>
          <div>
            <div className={styles.projectCardHeader}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <span className={styles.projectYear}>{project.year}</span>
            </div>
            <p className={styles.projectSubtitle}>{project.subtitle}</p>

            <p className={styles.projectDesc} style={{ marginTop: '12px' }}>
              {project.description}
            </p>

            <div style={{ marginTop: '16px' }}>
              <ul className={styles.projectImpactList}>
                {project.impact.map((item, idx) => (
                  <li key={idx} className={styles.projectImpactItem}>
                    <span className={styles.impactBullet} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className={styles.projectTags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.projectTag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.projectLinks}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLinkBtn}
                >
                  <span>SOURCE CODE ↗</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLinkBtn}
                >
                  <span>LIVE SYSTEM ↗</span>
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
