'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Contact Page View
   Transmission console, direct email, and verified social channels.
   ═══════════════════════════════════════════════════════════════ */

import React, { useState } from 'react';
import styles from '@/styles/node-pages.module.css';
import { creator } from '@/data/portfolio';

function getSocialIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes('github')) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }
  if (p.includes('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (p.includes('twitter') || p.includes('x')) {
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  return null;
}

export default function ContactView() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(creator.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <div className={styles.contactGrid}>
      {/* Left Column: Direct info & Channels */}
      <div className={styles.contactInfoCol}>
        <h2 className={styles.contactBigCallout}>
          LET&apos;S BUILD SOMETHING <span>EXTRAORDINARY</span>.
        </h2>

        <p className={styles.contactBodyText}>
          Available for select high-impact technical architecture roles, creative technology
          collaborations, and consulting engagements worldwide.
        </p>

        <div>
          <span className={styles.inputLabel}>DIRECT FREQUENCY</span>
          <div className={styles.emailWidget}>
            <div className={styles.emailInfo}>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
                className={styles.emailIcon}
              >
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              <a
                href={`mailto:${creator.email}`}
                className={styles.emailText}
                title="Send email to narra.dhanvi@gmail.com"
              >
                {creator.email}
              </a>
            </div>
            <button
              onClick={handleCopyEmail}
              className={styles.copyBtn}
              type="button"
              aria-label="Copy email to clipboard"
            >
              {copied ? 'COPIED ✓' : 'COPY EMAIL'}
            </button>
          </div>
        </div>

        <div>
          <span className={styles.inputLabel}>RADIAL CHANNELS</span>
          <div className={styles.socialsRow}>
            {creator.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBadge}
                title={`${social.platform}: ${social.label}`}
              >
                <span className={styles.socialBadgeIcon}>{getSocialIcon(social.platform)}</span>
                <span className={styles.socialBadgePlatform}>{social.platform}</span>
                <span className={styles.socialBadgeHandle}>{social.label}</span>
                <span className={styles.socialBadgeArrow}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Transmission Form Console */}
      <div className={styles.formConsole}>
        <div className={styles.formHeader}>
          <span>TRANSMISSION CONSOLE // ENCRYPTED</span>
        </div>

        {formSent ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                color: 'var(--color-accent-cyan)',
                textTransform: 'uppercase',
              }}
            >
              TRANSMISSION RECEIVED
            </p>
            <p style={{ marginTop: '8px', color: 'var(--color-text-secondary)' }}>
              Thank you for reaching out. I will respond to your frequency shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="contact-name">
                IDENTITY // NAME
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Enter your name"
                className={styles.textInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="contact-email">
                CONTACT // EMAIL
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="name@domain.com"
                className={styles.textInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="contact-message">
                TRANSMISSION // MESSAGE
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Describe your project, timeline, and scope..."
                className={styles.textAreaInput}
              />
            </div>

            <button type="submit" className={styles.sendBtn}>
              DISPATCH TRANSMISSION →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
