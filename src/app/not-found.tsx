'use client';

import { usePathname } from 'next/navigation';
import { systemContent } from '@/lib/content/system';
import { SystemScreen } from '@/components/ui/system-screen';
import { CosmicButton } from '@/components/ui/cosmic-button';
import styles from './not-found.module.css';

const { notFound } = systemContent;

export default function NotFound() {
  const path = usePathname() ?? '/';
  return (
    <SystemScreen
      channel={notFound.channel}
      state={notFound.state}
      status={notFound.status}
    >
      <div className={styles.hero}>
        <div aria-hidden='true' className={styles.tag}>
          {notFound.tag}
        </div>

        <div aria-hidden='true' className={styles.code}>
          404
        </div>

        <h1 className={styles.heading}>
          {notFound.heading.before}{' '}
          <span className={styles.acc}>{notFound.heading.em}</span>.
        </h1>
        <p className={styles.body}>{notFound.body}</p>

        {/* Decorative terminal rendering of the failed lookup. Marked as one
            image with a plain-language label so a screen reader gets the
            meaning without reading the punctuation. */}
        <div
          className={styles.term}
          role='img'
          aria-label={notFound.terminalLabel(path)}
        >
          <span aria-hidden='true'>
            <span className={styles.prompt}>$</span> cat{' '}
            <span className={styles.path}>{path}</span>
          </span>
          <span aria-hidden='true'>
            <span className={styles.prompt}>›</span> {notFound.resolveKey}{' '}
            <span className={styles.err}>{notFound.resolveErr}</span>{' '}
            {notFound.resolveNote}
          </span>
        </div>

        <nav aria-label={notFound.actions.label} className={styles.actions}>
          <CosmicButton href='/' variant='primary' arrow={false}>
            {notFound.actions.home}
          </CosmicButton>
          <CosmicButton href='/oferta' arrow='↗'>
            {notFound.actions.offer}
          </CosmicButton>
        </nav>
      </div>

      <div aria-hidden='true' className={styles.trace}>
        <div className={styles.traceBar}>
          <span>{notFound.traceLabel}</span>
          <span>
            {notFound.traceIdKey}{' '}
            <span className={styles.acc}>{notFound.traceId}</span>
          </span>
        </div>
        <div className={styles.traceBody}>
          <div className={styles.traceRow}>
            <span className={styles.time}>[0.001]</span>
            <span>
              {notFound.trace.resolve}
              <span className={styles.err}>&quot;{path}&quot;</span>)
            </span>
          </div>
          <div className={styles.traceRow}>
            <span className={styles.time}>[0.012]</span>
            <span>
              ↳ <span className={styles.err}>{notFound.trace.notFound}</span>
              {notFound.trace.notFoundNote}
            </span>
          </div>
          <div className={styles.traceRow}>
            <span className={styles.time}>[0.014]</span>
            <span>
              ↳ {notFound.trace.fallback}{' '}
              <span className={styles.ok}>{notFound.trace.fallbackTarget}</span>
            </span>
          </div>
        </div>
      </div>
    </SystemScreen>
  );
}
