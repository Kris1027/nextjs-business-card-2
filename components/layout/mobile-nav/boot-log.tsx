import type { CSSProperties } from 'react';
import { BOOT_LOG } from './boot-data';
import styles from './boot-log.module.css';

export function BootLog() {
  const total = BOOT_LOG.length;

  return (
    <div className={styles.log} aria-hidden='true'>
      {BOOT_LOG.map((line, i) => (
        <div
          key={i}
          className={`${styles.line} ${styles[line.tone]}`}
          style={
            {
              '--idx': i,
              '--total': total,
            } as CSSProperties
          }
        >
          <span className={styles.timestamp}>[{line.t}]</span>
          <span className={styles.message}>{line.m}</span>
        </div>
      ))}
    </div>
  );
}
