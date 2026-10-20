'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — About Page View
   Comprehensive, impactful journey, operating principles,
   selected work, engineering trajectory, and technical arsenal.
   ═══════════════════════════════════════════════════════════════ */

import React from 'react';
import styles from '@/styles/node-pages.module.css';
import { creator, aboutTimeline, skillCategories } from '@/data/portfolio';

// Core Operating Principles
const OPERATING_PRINCIPLES = [
  {
    num: '01',
    title: 'Start with the problem',
    desc: 'The tool is a decision, not the starting point. Technology serves the outcome, never the other way around.',
  },
  {
    num: '02',
    title: 'Build to learn',
    desc: 'A working prototype exposes architectural blind spots and real questions that abstract planning alone will miss.',
  },
  {
    num: '03',
    title: 'Keep the experience intentional',
    desc: 'Interfaces should clarify what is happening underneath, not distract people with decorative complexity.',
  },
  {
    num: '04',
    title: 'Be honest about constraints',
    desc: 'Latency, memory limits, compute costs, privacy, reliability, and deployment all matter from day one.',
  },
  {
    num: '05',
    title: 'Ship, then improve',
    desc: 'A useful first version creates something concrete to learn from. Real feedback beats endless speculation.',
  },
];

// Selected Work & Philosophy Highlights (SIH bro)
const SELECTED_WORK = [
  {
    id: 'sih-bro',
    title: 'SIH bro',
    tagline: 'Smart India Hackathon Copilot',
    highlight: 'Reached 100+ active student builders on live deployment',
    desc: "SIH bro grew from the conviction that students shouldn't spend days manually unpacking complex problem statements before they can start building. It helps teams deconstruct SIH problem statements, discover architectural direction, and assemble complementary teams.",
    pillars: ['Product Thinking', 'Full-Stack Execution', 'Real Student Workflow'],
    badge: 'SHIPPED & DEPLOYED',
    badgeColor: '#00f0ff',
  },
  {
    id: 'ynotme',
    title: 'YnotMe (LiveNudge)',
    tagline: 'Conversational Intelligence',
    highlight: 'Top 100 out of 31,000+ builders in HackHazards',
    desc: 'Exploring how AI can help people become more aware of how they communicate. A privacy-first conversational coaching direction built on on-device processing, low-latency speech analysis, and helpful feedback without transmitting sensitive conversations to cloud servers.',
    pillars: ['Human-Centred AI', 'Privacy-First Architecture', 'On-Device Processing'],
    badge: 'TOP 100 / 31K+ BUILDERS',
    badgeColor: '#ffd438',
  },
  {
    id: 'prism',
    title: 'PRISM',
    tagline: 'Predictive Risk Intelligence for Smart Monitoring',
    highlight: 'Explainable risk scoring across cost, schedule & delivery',
    desc: 'Surfacing project risks early before they turn into costly surprises. Built around explainable risk scores, early warning signals, and an interactive monitoring dashboard where decision-makers can inspect the exact factors behind every alert.',
    pillars: ['Applied AI', 'Risk Intelligence', 'Explainable Models'],
    badge: 'SYSTEM CONCEPT',
    badgeColor: '#a78bfa',
  },
  {
    id: 'prep-manager',
    title: 'PREP Manager',
    tagline: 'Image-Processing Workflow & ML Pipeline',
    highlight: 'Sequential batch execution optimized for memory & free-tier limits',
    desc: 'Transforms repetitive ML test pipelines into an observable web workflow. Features sequential processing, live status telemetry, and inspection of dataset counts and costs—architected directly within strict memory and free hosting limits.',
    pillars: ['Full-Stack Systems', 'Streaming Telemetry', 'ML Infrastructure'],
    badge: 'ENGINEERING PIPELINE',
    badgeColor: '#34d399',
  },
  {
    id: 'fireview',
    title: 'FireView',
    tagline: 'Forest-Fire Data Exploration',
    highlight: 'Massive multi-dimensional geospatial dataset visualization',
    desc: 'Developed as a Mining Massive Datasets project to turn vast raw environmental records into an approachable, interactive visualization platform where users can explore wildfire patterns instead of parsing static spreadsheets.',
    pillars: ['Massive Datasets', 'Geospatial Analytics', 'Data Architecture'],
    badge: 'DATA INTELLIGENCE',
    badgeColor: '#fb7185',
  },
];

export default function AboutView() {
  return (
    <div className={styles.aboutPageRoot}>
      {/* ── 1. Top Section: Hero Manifesto & Telemetry Matrix ── */}
      <section className={styles.aboutHeroGrid}>
        {/* Left: Manifesto & Personal Story */}
        <div className={styles.aboutManifesto}>
          <div className={styles.aboutBadgeRow}>
            <span className={styles.aboutPillBadge}>CREATOR PROFILE // 03</span>
            <span className={styles.aboutStatusDot}>ACTIVE BUILDER</span>
          </div>

          <h2 className={styles.manifestoHeading}>
            TURNING &ldquo;WHAT IF?&rdquo; INTO <span>SOMETHING REAL</span>.
          </h2>

          <div className={styles.quoteCallout}>
            <p className={styles.quoteText}>
              &ldquo;I care less about making technology sound impressive and more about making it useful.&rdquo;
            </p>
          </div>

          <p className={styles.manifestoText}>
            I&apos;m <strong>Dhanvi</strong>, a Computer Science and Engineering student at{' '}
            <strong>KG Reddy College of Engineering and Technology</strong> in Hyderabad. I build across
            full-stack development, applied AI, and product design—usually starting with an acute problem,
            asking how it could work better, and then engineering a version people can actually test and try.
          </p>

          <p className={styles.manifestoText}>
            I&apos;m still early in my journey, which is what makes it so energizing. I learn by shipping:
            exploring unfamiliar tools, making concrete architectural decisions, testing ideas under real-world
            constraints, and doing whatever it takes to move a project from a promising concept to a working product.
          </p>

          {/* Verified Channels Grid */}
          <div className={styles.aboutConnectBlock}>
            <span className={styles.inputLabel}>VERIFIED CHANNELS</span>
            <div className={styles.aboutSocialsGrid}>
              <a
                href="https://github.com/DhanviND360"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.aboutSocialCard} ${styles.aboutSocialGithub}`}
                title="GitHub: DhanviND360"
              >
                <div className={styles.aboutSocialHeader}>
                  <span className={styles.aboutSocialIcon}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </span>
                  <span className={styles.aboutSocialPlatform}>GitHub</span>
                  <span className={styles.aboutSocialArrow}>↗</span>
                </div>
                <div className={styles.aboutSocialHandle}>DhanviND360</div>
              </a>

              <a
                href="https://www.linkedin.com/in/narra-dhanvi-65a63b2b9"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.aboutSocialCard} ${styles.aboutSocialLinkedin}`}
                title="LinkedIn: narra-dhanvi-65a63b2b9"
              >
                <div className={styles.aboutSocialHeader}>
                  <span className={styles.aboutSocialIcon}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </span>
                  <span className={styles.aboutSocialPlatform}>LinkedIn</span>
                  <span className={styles.aboutSocialArrow}>↗</span>
                </div>
                <div className={styles.aboutSocialHandle}>narra-dhanvi-65a63b2b9</div>
              </a>

              <a
                href="https://x.com/codelox_13"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.aboutSocialCard} ${styles.aboutSocialTwitter}`}
                title="X (Twitter): @codelox_13"
              >
                <div className={styles.aboutSocialHeader}>
                  <span className={styles.aboutSocialIcon}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </span>
                  <span className={styles.aboutSocialPlatform}>X (Twitter)</span>
                  <span className={styles.aboutSocialArrow}>↗</span>
                </div>
                <div className={styles.aboutSocialHandle}>@codelox_13</div>
              </a>

              <a
                href={`mailto:${creator.email}`}
                className={`${styles.aboutSocialCard} ${styles.aboutSocialEmail}`}
                title={`Email: ${creator.email}`}
              >
                <div className={styles.aboutSocialHeader}>
                  <span className={styles.aboutSocialIcon}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                  </span>
                  <span className={styles.aboutSocialPlatform}>Direct Email</span>
                  <span className={styles.aboutSocialArrow}>↗</span>
                </div>
                <div className={styles.aboutSocialHandle}>{creator.email}</div>
              </a>
            </div>
          </div>
        </div>

        {/* Right: At A Glance HUD & Technical Arsenal */}
        <div className={styles.aboutSidebar}>
          {/* Telemetry Card */}
          <div className={styles.specConsoleCard}>
            <div className={styles.specConsoleHeader}>
              <span className={styles.specConsoleDot} />
              <span>AT A GLANCE // SYSTEM TELEMETRY</span>
            </div>

            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>LOCATION</span>
                <span className={styles.specValue}>Hyderabad, India</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>ACADEMICS</span>
                <span className={styles.specValue}>B.Tech, Computer Science &amp; Eng</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>INSTITUTION</span>
                <span className={styles.specValue}>KG Reddy College of Eng &amp; Tech</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>PRIMARY FOCUS</span>
                <span className={styles.specValue}>Full-Stack · Applied AI · Product Thinking</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>CORE STACK</span>
                <span className={styles.specValue}>React · Next.js · TypeScript · Python · FastAPI · Supabase</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>CORE CREED</span>
                <span className={styles.specValueHighlight}>Curious by default · Practical about execution</span>
              </div>
            </div>
          </div>

          {/* Skills Matrix */}
          <div className={styles.skillsMatrixCard}>
            <h3 className={styles.sectionHeaderSmall}>TECHNICAL ARSENAL</h3>
            <div className={styles.skillsGroupList}>
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
        </div>
      </section>

      {/* ── 2. The Journey Narrative Section ── */}
      <section className={styles.aboutSectionBlock}>
        <div className={styles.sectionTitleGroup}>
          <span className={styles.sectionEyebrow}>THE EVOLUTION</span>
          <h3 className={styles.sectionHeaderMain}>FROM CURIOSITY TO SHIPPING</h3>
        </div>

        <div className={styles.narrativeGrid}>
          <div className={styles.narrativeCard}>
            <div className={styles.narrativeCardHeader}>
              <span className={styles.narrativeIcon}>⚡</span>
              <h4>Experimentation Over Dogma</h4>
            </div>
            <p>
              My path has been shaped by constant experimentation. I&apos;ve moved between frontend interfaces,
              backend architectures, AI-powered agentic pipelines, and product ideas—not to collect buzzwords, but
              because different problems genuinely demand different tools and trade-offs.
            </p>
          </div>

          <div className={styles.narrativeCard}>
            <div className={styles.narrativeCardHeader}>
              <span className={styles.narrativeIcon}>🏆</span>
              <h4>The Hackathon Crucible</h4>
            </div>
            <p>
              Hackathons have been an invaluable forge. They force you to operate under tight time pressure,
              decompose ambiguous problem statements into tangible software specs, collaborate across disciplines,
              and make pragmatic engineering trade-offs instead of waiting for a nonexistent perfect solution.
            </p>
          </div>

          <div className={styles.narrativeCard}>
            <div className={styles.narrativeCardHeader}>
              <span className={styles.narrativeIcon}>🎯</span>
              <h4>Beyond the Demo</h4>
            </div>
            <p>
              Over time, my focus has evolved from simply &ldquo;making something work on localhost&rdquo; to
              thinking deeply about the holistic product: who it serves, how it behaves under failure, what happens
              when latency spikes, and whether it creates genuine, durable utility outside a stage pitch.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. How I Like to Work (Operating Principles) ── */}
      <section className={styles.aboutSectionBlock}>
        <div className={styles.sectionTitleGroup}>
          <span className={styles.sectionEyebrow}>METHODOLOGY</span>
          <h3 className={styles.sectionHeaderMain}>HOW I LIKE TO WORK</h3>
        </div>

        <div className={styles.principlesGrid}>
          {OPERATING_PRINCIPLES.map((principle) => (
            <div key={principle.num} className={styles.principleCard}>
              <span className={styles.principleNum}>{principle.num}</span>
              <h4 className={styles.principleTitle}>{principle.title}</h4>
              <p className={styles.principleDesc}>{principle.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Selected Work & Real-World Impact (SIH bro) ── */}
      <section className={styles.aboutSectionBlock}>
        <div className={styles.sectionTitleGroup}>
          <span className={styles.sectionEyebrow}>PORTFOLIO HIGHLIGHTS</span>
          <h3 className={styles.sectionHeaderMain}>SELECTED WORK &amp; IMPACT</h3>
        </div>

        <div className={styles.selectedWorkGrid}>
          {SELECTED_WORK.map((work) => (
            <div key={work.id} className={styles.selectedWorkCard}>
              <div className={styles.selectedWorkTop}>
                <span
                  className={styles.workBadge}
                  style={{ color: work.badgeColor, borderColor: `${work.badgeColor}40` }}
                >
                  {work.badge}
                </span>
                <span className={styles.workHighlight}>{work.highlight}</span>
              </div>

              <h4 className={styles.workTitle}>{work.title}</h4>
              <h5 className={styles.workTagline}>{work.tagline}</h5>

              <p className={styles.workDesc}>{work.desc}</p>

              <div className={styles.workPillRow}>
                {work.pillars.map((pillar) => (
                  <span key={pillar} className={styles.workPill}>
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Dual Column: What I'm Exploring & Beyond The Screen ── */}
      <section className={styles.aboutSectionBlock}>
        <div className={styles.dualGrid}>
          {/* What I'm Exploring */}
          <div className={styles.dualCard}>
            <div className={styles.dualCardHeader}>
              <span className={styles.dualCardBadge}>CURRENT HORIZON</span>
              <h4 className={styles.dualCardTitle}>WHAT I&apos;M EXPLORING</h4>
            </div>
            <p className={styles.dualCardText}>
              I&apos;m particularly drawn to practical AI products, full-stack reactive applications, and
              human-centred interfaces that demystify complex systems. I&apos;m fascinated by efficient on-device
              AI architectures that operate within real-world constraints—limited compute, zero recurring server
              subscriptions, and absolute privacy for user data.
            </p>
            <p className={styles.dualCardText}>
              I don&apos;t expect to have everything figured out. My priority is to consistently build things that
              force me outside my comfort zone to learn something deeply new.
            </p>
          </div>

          {/* Beyond The Screen */}
          <div className={styles.dualCard}>
            <div className={styles.dualCardHeader}>
              <span className={styles.dualCardBadge}>ANALOG PERSPECTIVE</span>
              <h4 className={styles.dualCardTitle}>BEYOND THE SCREEN</h4>
            </div>
            <p className={styles.dualCardText}>
              Not every curiosity needs to turn into software. I enjoy motorcycles, industrial design, and
              following an intriguing technical question far enough to understand how a physical machine actually
              works.
            </p>
            <p className={styles.dualCardText}>
              Working on mechanical systems provides space to step back, notice tactile nuances, and respect
              physical constraints—habits that return directly into engineering software with clearer perspective
              and cleaner focus.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Engineering Trajectory Timeline ── */}
      <section className={styles.aboutSectionBlock}>
        <div className={styles.sectionTitleGroup}>
          <span className={styles.sectionEyebrow}>CHRONOLOGY</span>
          <h3 className={styles.sectionHeaderMain}>ENGINEERING TRAJECTORY</h3>
        </div>

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
      </section>

      {/* ── 7. The Next Chapter & Final Creed Banner ── */}
      <section className={styles.nextChapterBanner}>
        <div className={styles.creedBox}>
          <span className={styles.creedTag}>THE NORTH STAR</span>
          <h3 className={styles.creedHeading}>
            BUILD WITH CURIOSITY. SHIP WITH INTENTION. KEEP LEARNING.
          </h3>
          <p className={styles.creedBody}>
            I&apos;m seeking difficult, worthwhile problems, collaborative peers who care deeply about what they
            ship, and opportunities to keep growing as an engineer and product builder.
          </p>
          <div className={styles.creedActionRow}>
            <a href="#contact" className={styles.creedPrimaryBtn}>
              GET IN TOUCH // TRANSMIT FREQUENCY ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
