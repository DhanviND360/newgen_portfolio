'use client';

/* ═══════════════════════════════════════════════════════════════
   DHANVI — Contact Page View
   Transmission console, direct email, and verified social channels.
   ═══════════════════════════════════════════════════════════════ */

import React, { useState } from 'react';
import styles from '@/styles/node-pages.module.css';
import { creator } from '@/data/portfolio';

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
            <span className={styles.emailText}>{creator.email}</span>
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
              >
                <span>{social.platform}</span>
                <span style={{ opacity: 0.6, fontSize: '0.7em' }}>↗</span>
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
