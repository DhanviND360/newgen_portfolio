'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Career Experience & Internships Timeline
   Clean, minimal vertical timeline with hero meme showcase
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import Image from 'next/image';
import styles from '@/styles/experience-dna.module.css';
import { experienceNodes } from '@/data/portfolio';

export default function ExperienceView() {
  const internships = experienceNodes.filter((node) => node.type === 'internship');

  return (
    <div className={styles.experiencePageRoot}>
      {/* ── Hero Section with Meme ─────────────────────────────────── */}
      <section className={styles.experienceHero}>
        <div className={styles.heroBadgeRow}>
          <span className={styles.heroPillBadge}>EXPERIENCE // FIELD RECORD</span>
          <span className={styles.heroStatusDot}>VERIFIED INTERNSHIPS</span>
        </div>

        <h1 className={styles.heroHeading}>
          Where I&apos;ve <span>Built</span> &amp; What I&apos;ve <span>Shipped</span>
        </h1>

        <p className={styles.heroSubtext}>
          Hands-on engineering across full-stack applications, autonomous AI agent integration, production telemetry, and technical leadership.
        </p>

        {/* ── Meme Frame Showcase ──────────────────────────────────── */}
        <div className={styles.memeFrame}>
          <div className={styles.memeHeaderBar}>
            <div className={styles.memeWindowDots}>
              <span className={styles.memeDotRed} />
              <span className={styles.memeDotYellow} />
              <span className={styles.memeDotGreen} />
            </div>
            <span className={styles.memeTitle}>experience_portfolio.jpg</span>
            <span className={styles.memeTag}>PROD // MEME</span>
          </div>

          <div className={styles.memeImageWrap}>
            <Image
              src="/experience_portfolio.jpg"
              alt="Experience Portfolio Meme"
              width={561}
              height={356}
              priority
              className={styles.memeImage}
            />
          </div>

          <div className={styles.memeCaptionBar}>
            <p className={styles.memeCaptionQuote}>
              &ldquo;When they ask for 5 years of experience in technologies released last month.&rdquo;
            </p>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div className={styles.timelineScrollPrompt}>
          <span>Explore Internship Timeline</span>
          <span className={styles.scrollArrow}>&darr;</span>
        </div>
      </section>

      {/* ── Timeline Section ───────────────────────────────────────── */}
      <section className={styles.timelineSection}>
        <div className={styles.timelineSpine} />

        <div className={styles.timelineList}>
          {internships.map((node, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            const accent = node.accentColor || '#00f0ff';

            return (
              <div key={node.id} className={styles.timelineItem}>
                {/* Node Marker on Spine */}
                <div className={styles.timelineNodeMarker}>
                  <div
                    className={styles.nodeMarkerDot}
                    style={{ borderColor: accent }}
                  />
                  <span className={styles.nodeMarkerIndex}>{formattedIndex}</span>
                </div>

                {/* Content Card */}
                <div
                  className={styles.timelineCard}
                  style={{
                    borderLeftColor: accent,
                    borderLeftWidth: '2px',
                  }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardBadgeGroup}>
                      <span
                        className={styles.cardBadge}
                        style={{
                          color: accent,
                          borderColor: `${accent}40`,
                          backgroundColor: `${accent}10`,
                        }}
                      >
                        {node.badge}
                      </span>
                      <span className={styles.cardStatusPill}>
                        <span
                          className={styles.statusDot}
                          style={{ backgroundColor: accent }}
                        />
                        {node.status}
                      </span>
                    </div>
                    <span className={styles.cardPeriodBadge}>{node.period}</span>
                  </div>

                  <div className={styles.cardTitles}>
                    <h2 className={styles.cardRoleTitle}>{node.role}</h2>
                    <h3 className={styles.cardCompanySubtitle}>{node.company}</h3>
                  </div>

                  <p className={styles.cardSummaryText}>{node.summary}</p>

                  {node.highlights && node.highlights.length > 0 && (
                    <ul className={styles.highlightsList}>
                      {node.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className={styles.highlightItem}>
                          <span className={styles.highlightBullet} style={{ color: accent }}>
                            &gt;
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className={styles.cardFooter}>
                    <div className={styles.skillsRow}>
                      {node.skills.map((skill) => (
                        <span key={skill} className={styles.skillPill}>
                          {skill}
                        </span>
                      ))}
                    </div>

                    {node.metrics && (
                      <div className={styles.metricsBadge}>
                        <span className={styles.metricsLabel}>KEY IMPACT:</span>
                        <span>{node.metrics}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
