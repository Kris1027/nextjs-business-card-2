'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BrandMark } from '@/components/cosmos/brand-mark';
import { navLinks } from '@/lib/nav';
import { layoutContent } from '@/lib/content/layout';
import styles from './header.module.css';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

type NavLinkProps = {
  href: string;
  code: string;
  label: string;
  active: boolean;
  showDot?: boolean;
  onClick?: () => void;
};

function NavLink({
  href,
  code,
  label,
  active,
  showDot,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${styles.navLink}${active ? ` ${styles.navLinkActive}` : ''}`}
      onClick={onClick}
    >
      <span className={styles.navCode}>{code}</span>
      <span>{label}</span>
      {active && showDot && <span className={styles.navDot} />}
    </Link>
  );
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
              {layoutContent.header.brandName}
              <span className={styles.brandAccent}>
                {layoutContent.header.brandAccent}
              </span>
            </span>
            <span className={styles.brandSub}>
              {layoutContent.header.brandSub}
            </span>
          </span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((l) => (
            <NavLink
              key={l.href}
              {...l}
              active={isActive(pathname, l.href)}
              showDot
            />
          ))}
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
            <NavLink
              key={l.href}
              {...l}
              active={isActive(pathname, l.href)}
              onClick={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </header>
  );
}
