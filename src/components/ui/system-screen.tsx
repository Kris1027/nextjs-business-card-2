import type { ReactNode } from 'react';
import { siteCoords } from '@/lib/config';
import { layoutContent } from '@/lib/content/layout';
import styles from './system-screen.module.css';

type SystemScreenProps = {
  /** Second segment of the top bar, e.g. `boot` or `system`. */
  channel: string;
  /** Third segment, rendered in the accent colour, e.g. a version or `err`. */
  state: string;
  /** Bottom-bar left cell. The coordinates fill the right cell. */
  status: string;
  /** Blinks the top-bar dot, for screens that represent work in progress. */
  live?: boolean;
  children: ReactNode;
} & (
  | { role: 'status'; ariaLabel: string }
  | { role?: undefined; ariaLabel?: undefined }
);

/**
 * Full-height chrome for the loading and 404 screens: flat panel, status bar
 * top and bottom, content centred between them. Both bars are decorative, so
 * they are hidden from assistive tech; a caller that needs to announce the
 * screen passes `role='status'` with a label.
 */
export function SystemScreen({
  channel,
  state,
  status,
  live = false,
  role,
  ariaLabel,
  children,
}: SystemScreenProps) {
  const { brandName, brandAccent } = layoutContent.header;
  return (
    <div className={styles.screen} role={role} aria-label={ariaLabel}>
      <div aria-hidden='true' className={styles.bar}>
        <span className={`${styles.dot}${live ? ` ${styles.dotLive}` : ''}`} />
        <span className={styles.brand}>
          {brandName}
          {brandAccent}
        </span>
        <span className={styles.sep}>/</span>
        <span>{channel}</span>
        <span className={styles.sep}>·</span>
        <span className={styles.state}>{state}</span>
      </div>

      <div className={styles.body}>{children}</div>

      <div aria-hidden='true' className={`${styles.bar} ${styles.barBottom}`}>
        <span>{status}</span>
        <span className={styles.barRight}>KRK · {siteCoords}</span>
      </div>
    </div>
  );
}
