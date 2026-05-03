'use client';

import { useState } from 'react';
import {
  siteEmail,
  sitePhone,
  discordHandle,
  githubUrl,
  linkedinUrl,
} from '@/lib/config';
import styles from './contact-channels.module.css';

const CONTACTS = [
  {
    label: 'Email',
    value: siteEmail,
    href: `mailto:${siteEmail}`,
    glyph: '✉',
    actionLabel: 'NAPISZ',
  },
  {
    label: 'Telefon / WhatsApp',
    value: sitePhone,
    href: `tel:${sitePhone.replace(/\s/g, '')}`,
    glyph: '☎',
    actionLabel: 'ZADZWOŃ',
  },
  {
    label: 'Discord',
    value: discordHandle,
    href: null,
    glyph: '◬',
    actionLabel: null,
  },
  {
    label: 'GitHub',
    value: githubUrl.replace('https://', ''),
    href: githubUrl,
    glyph: '◯',
    actionLabel: 'OTWÓRZ',
  },
  {
    label: 'LinkedIn',
    value: linkedinUrl.replace('https://', ''),
    href: linkedinUrl,
    glyph: '◊',
    actionLabel: 'OTWÓRZ',
  },
];

export default function ContactChannels() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (k: string, v: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(v).catch(() => {});
    setCopiedKey(k);
    setTimeout(() => setCopiedKey(null), 1600);
  };

  return (
    <>
      <div className={styles.list}>
        {CONTACTS.map((it) => (
          <div key={it.label} className={styles.item}>
            <span className={styles.icon}>{it.glyph}</span>
            <span className={styles.label}>{it.label}</span>
            <span className={styles.value}>{it.value}</span>
            <div className={styles.actions}>
              {it.href && it.actionLabel && (
                <a
                  className={styles.btn}
                  href={it.href}
                  target={it.href.startsWith('http') ? '_blank' : undefined}
                  rel='noopener noreferrer'
                >
                  {it.actionLabel} →
                </a>
              )}
              <button
                className={styles.btn}
                onClick={() => copy(it.label, it.value)}
              >
                {copiedKey === it.label ? '✓ SKOPIOWANO' : 'KOPIUJ'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 56,
          padding: 32,
          border: '1px solid var(--line)',
          borderRadius: 6,
          background: 'oklch(0.06 0.05 var(--theme-hue) / 0.4)',
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: 'var(--acc)',
            letterSpacing: '0.16em',
            marginBottom: 10,
          }}
        >
          {'// LOKALIZACJA'}
        </div>
        <div style={{ fontSize: 24, color: 'var(--ink-0)', marginBottom: 4 }}>
          Kraków, Polska
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--ink-3)',
            letterSpacing: '0.04em',
          }}
        >
          50.0647° N · 19.9450° E · sektor 7
        </div>
      </div>
    </>
  );
}
