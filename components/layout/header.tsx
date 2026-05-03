'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BrandMark } from '@/components/cosmos/brand-mark';
import { navLinks } from '@/lib/nav';
import styles from './header.module.css';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href='/' className={styles.brand}>
          <BrandMark size={52} animated />
          <span className={styles.brandText}>
            <span className={styles.brandName}>
              zaruszaj<span style={{ color: 'var(--acc)' }}>.pl</span>
            </span>
            <span className={styles.brandSub}>
              {'// pc.builds × code.deploy ── KRK'}
            </span>
          </span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.navLink}${active ? ` ${styles.navLinkActive}` : ''}`}
              >
                <span className={styles.navCode}>{l.code}</span>
                <span>{l.label}</span>
                {active && <span className={styles.navDot} />}
              </Link>
            );
          })}
        </nav>

        <button
          className={styles.navToggle}
          onClick={() => setOpen((o) => !o)}
          aria-label='menu'
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className={styles.navMobile}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.navLink}${isActive(pathname, l.href) ? ` ${styles.navLinkActive}` : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className={styles.navCode}>{l.code}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
