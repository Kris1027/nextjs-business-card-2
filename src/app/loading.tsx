'use client';

import { useState, useEffect } from 'react';
import styles from './loading.module.css';
import { siteVersion } from '@/lib/config';

const twinkles = Array.from({ length: 14 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 2.4,
}));

export default function Loading() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const dur = 5000;
    const ease = (t: number) => t * (3 - 2 * t);
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = ((now - start) % dur) / dur;
      setPct(Math.min(100, Math.round(ease(t) * 100)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.cosmos}>
      <div className={`${styles.stars} ${styles.starsL1}`} />
      <div className={`${styles.stars} ${styles.starsL2}`} />
      <div className={styles.nebula} />
      {twinkles.map((t, i) => (
        <span
          key={i}
          className={styles.twinkle}
          style={{
            top: `${t.top}%`,
            left: `${t.left}%`,
            animationDelay: `${t.delay}s`,
          }}
        />
      ))}
      <div className={`${styles.shooting} ${styles.shootingS1}`} />
      <div className={`${styles.shooting} ${styles.shootingS2}`} />

      <div className={`${styles.bracket} ${styles.bracketTl}`} />
      <div className={`${styles.bracket} ${styles.bracketTr}`} />
      <div className={`${styles.bracket} ${styles.bracketBl}`} />
      <div className={`${styles.bracket} ${styles.bracketBr}`} />

      <div className={styles.head}>
        <span className={styles.dot} />
        <b>zaruszaj.pl</b>
        <span className={styles.sep}>/</span>
        <span>boot</span>
        <span className={styles.sep}>·</span>
        <span className={styles.pink}>{siteVersion}</span>
      </div>
      <div className={styles.coords}>
        <b>50.06°N · 19.94°E</b>
        <br />
        KRK · ground station
      </div>

      <div className={styles.content}>
        <div className={styles.system}>
          <div className={styles.orbit}>
            <div className={`${styles.ring} ${styles.ringR3}`} />
            <div className={`${styles.ring} ${styles.ringR1}`} />
            <div className={`${styles.ring} ${styles.ringR2}`} />
            <div className={`${styles.sat} ${styles.satS3}`} />
            <div className={styles.sat} />
            <div className={`${styles.sat} ${styles.satS2}`} />
            <div className={styles.core}>
              <div className={styles.meridian} />
              <div className={styles.scanline} />
              <svg
                viewBox='0 0 26 20'
                fill='none'
                width={44}
                height={34}
                aria-hidden='true'
              >
                <path
                  d='M9 2L2 10l7 8'
                  stroke='var(--acc)'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M17 2l7 8-7 8'
                  stroke='var(--acc)'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M14.5 1l-3 18'
                  stroke='var(--acc)'
                  strokeWidth='1.8'
                  strokeLinecap='round'
                  opacity='0.6'
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.titleBlock}>
          <div className={styles.lbl}>/ booting</div>
          <h1 className={styles.h1}>
            zaruszaj<span className={styles.acc}>.pl</span>
          </h1>
          <div className={styles.sub}>
            <span className={styles.p}>$</span> init.cosmos
            <span className={styles.warp}> --warp</span>
          </div>
        </div>

        <div className={styles.progress}>
          <div className={styles.row}>
            <span>{'// loading system'}</span>
            <span className={styles.pct}>{String(pct).padStart(3, '0')}%</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className={styles.log}>
          <div className={styles.line}>
            <span className={styles.t}>[0.012]</span>
            <span className={styles.ok}>✓</span> mounting /pages
          </div>
          <div className={styles.line}>
            <span className={styles.t}>[0.241]</span>
            <span className={styles.ok}>✓</span> linking nebula ·{' '}
            <b>4 routes</b>
          </div>
          <div className={styles.line}>
            <span className={styles.t}>[0.812]</span>
            <span className={styles.ok}>✓</span> compositor online
          </div>
          <div className={styles.line}>
            <span className={styles.t}>[1.503]</span>
            <span className={styles.ok}>✓</span> calibrating telemetry
          </div>
          <div className={styles.line}>
            <span className={styles.t}>[2.140]</span>
            <span className={styles.pk}>»</span> warp drive engaged
          </div>
          <div className={styles.line}>
            <span className={styles.t}>[2.998]</span>
            <span className={styles.ok}>✓</span> ready — entering orbit
          </div>
        </div>
      </div>
    </div>
  );
}
