'use client';

import { usePathname } from 'next/navigation';
import styles from './not-found.module.css';
import { CosmicButton } from '@/components/cosmos/cosmic-button';

export default function NotFound() {
  const path = usePathname();
  return (
    <div className={styles.err}>
      <div className={`${styles.stars} ${styles.starsL1}`} />
      <div className={styles.nebula} />

      <div className={`${styles.bracket} ${styles.bracketTl}`} />
      <div className={`${styles.bracket} ${styles.bracketTr}`} />
      <div className={`${styles.bracket} ${styles.bracketBl}`} />
      <div className={`${styles.bracket} ${styles.bracketBr}`} />

      <div className={styles.head}>
        <span className={styles.dot} />
        <b>zaruszaj.pl</b>
        <span className={styles.sep}>/</span>
        <span>system</span>
        <span className={styles.sep}>·</span>
        <span className={styles.pink}>err</span>
        <span className={styles.right}>PID 0421 · uptime 02:14:08</span>
      </div>

      <div className={styles.hero}>
        <div className={styles.tag}>
          <span className={styles.tagDot} />
          error_404
        </div>

        <div className={styles.fourOhFour}>
          <span className={styles.num} data-text='4'>
            4
          </span>
          <span className={styles.zero}>
            <span className={styles.num} data-text='0'>
              0
            </span>
            <span className={styles.ring} />
            <span className={`${styles.ring} ${styles.ringR2}`} />
          </span>
          <span className={styles.num} data-text='4'>
            4
          </span>
        </div>

        <div className={styles.msg}>
          <h1 className={styles.msgH1}>
            Sygnał <span className={styles.acc}>utracony</span> w kosmosie.
          </h1>
          <p className={styles.msgP}>
            Strona, której szukasz, opuściła orbitę — albo nigdy tu nie była.
          </p>
          <div className={styles.term}>
            <span className={styles.termP}>$</span> cat{' '}
            <span className={styles.termPath}>{path}</span>
            <br />
            <span className={styles.termC}>› </span>
            <span className={styles.termG}>resolve:</span>{' '}
            <span className={styles.termE}>ENOENT</span> · no such route
            <span className={styles.cur} />
          </div>
        </div>

        <div className={styles.actions}>
          <CosmicButton href='/' variant='primary' arrow={false}>
            Wróć na stronę główną
          </CosmicButton>
          <CosmicButton href='/oferta' arrow='↗'>
            Zobacz ofertę
          </CosmicButton>
        </div>
      </div>

      <div className={styles.diag}>
        <div className={styles.diagBar}>
          <span>{'// stack trace'}</span>
          <span className={styles.diagBarRight}>
            trace.id <span className={styles.diagId}>0xCAFE_404</span>
          </span>
        </div>
        <div className={styles.diagBody}>
          <div className={styles.diagRow}>
            <span className={styles.diagT}>[0.001]</span>
            <span className={styles.diagL}>
              router.resolve(
              <span className={styles.diagE}>&quot;{path}&quot;</span>)
            </span>
          </div>
          <div className={styles.diagRow}>
            <span className={styles.diagT}>[0.012]</span>
            <span className={styles.diagL}>
              ↳ <span className={styles.diagE}>RouteNotFound</span>: no match in{' '}
              <span className={styles.diagOk}>4</span> routes
            </span>
          </div>
          <div className={styles.diagRow}>
            <span className={styles.diagT}>[0.014]</span>
            <span className={styles.diagL}>
              ↳ fallback → <span className={styles.diagOk}>not-found.tsx</span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.foot}>
        <span className={styles.footLeft}>
          <span className={styles.footDot} />
          online · awaiting input
        </span>
        <span>KRK · 50.06°N · 19.94°E</span>
      </div>
    </div>
  );
}
