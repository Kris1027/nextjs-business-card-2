'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { CosmosBackground } from '@/components/cosmos/background/background';
import { BootLog } from './boot-log';
import { FooterBlock } from './footer-block';
import { MenuItems } from './menu-items';
import { TypingPrompt } from './typing-prompt';
import styles from './mobile-nav.module.css';

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overlayId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Body scroll lock + Esc key while open
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Focus management: first link on open, button on close
  useEffect(() => {
    if (open) {
      // Wait for the open transition to start; focusing immediately can cause
      // the browser to scroll the link into view before the overlay paints.
      const id = window.setTimeout(() => firstLinkRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
    if (document.activeElement instanceof HTMLElement) {
      // Only return focus if the user was inside the overlay
      if (
        buttonRef.current &&
        document.activeElement !== buttonRef.current &&
        document.activeElement !== document.body
      ) {
        buttonRef.current.focus();
      }
    }
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        ref={buttonRef}
        type='button'
        className={styles.toggle}
        data-open={open}
        aria-expanded={open}
        aria-controls={overlayId}
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <div
        id={overlayId}
        role='dialog'
        aria-modal='true'
        aria-label='Menu'
        className={`${styles.overlay} ${open ? 'is-open' : ''}`}
      >
        {open && (
          <div className={styles.cosmos} aria-hidden='true'>
            <CosmosBackground />
          </div>
        )}

        <BootLog />

        <div className={styles.commandLine} aria-hidden='true'>
          <span className={styles.dollar}>$</span> nav.exec{' '}
          <span className={styles.flag}>--list</span>
          <span className={styles.flagDim}> --verbose</span>
        </div>

        <MenuItems
          pathname={pathname}
          onSelect={() => setOpen(false)}
          firstLinkRef={firstLinkRef}
        />

        <div className={styles.tail}>
          <TypingPrompt active={open} />
        </div>

        <FooterBlock pathname={pathname} onSelect={() => setOpen(false)} />
      </div>
    </div>
  );
}
