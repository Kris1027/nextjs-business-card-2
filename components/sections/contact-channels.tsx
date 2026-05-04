'use client';

import { useState } from 'react';
import { siteEmail, sitePhone } from '@/lib/config';
import { kontaktContent } from '@/lib/content/kontakt';
import { SiteLocation } from '@/components/cosmos/site-location';
import styles from './contact-channels.module.css';

function LocationIcon() {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='currentColor'
      width='1em'
      height='1em'
      aria-hidden='true'
    >
      <path d='M8 0C5.24 0 3 2.24 3 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 7.5C6.62 7.5 5.5 6.38 5.5 5S6.62 2.5 8 2.5 10.5 3.62 10.5 5 9.38 7.5 8 7.5z' />
    </svg>
  );
}

const CONTACTS = [
  {
    label: kontaktContent.channels.email.label,
    value: siteEmail,
    href: `mailto:${siteEmail}`,
    glyph: '✉',
    actionLabel: kontaktContent.channels.email.actionLabel,
  },
  {
    label: kontaktContent.channels.phone.label,
    value: sitePhone,
    href: `tel:${sitePhone.replace(/\s/g, '')}`,
    glyph: '☎',
    actionLabel: kontaktContent.channels.phone.actionLabel,
  },
];

export function ContactChannels() {
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
                {copiedKey === it.label
                  ? kontaktContent.channels.copied
                  : kontaktContent.channels.copy}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.location}>
        <LocationIcon />
        <div className={styles.locationCode}>
          {kontaktContent.channels.location.code}
        </div>
        <div className={styles.locationCity}>
          {kontaktContent.channels.location.city}
        </div>
        <SiteLocation className={styles.locationCoords} />
      </div>
    </>
  );
}
