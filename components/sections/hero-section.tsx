'use client';

import Link from 'next/link';
import { siteVersion } from '@/lib/config';
import { useInView } from '@/hooks/use-in-view';
import styles from './hero-section.module.css';

export function HeroSection() {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.hero}${inView ? ` ${styles.heroInView}` : ''}`}
    >
      <div className={styles.meta}>
        <span className={styles.metaDot} />
        <span>SYSTEM ONLINE — KRK / 50.06°N 19.94°E</span>
        <span className={styles.metaLine} />
        <span>{siteVersion}</span>
      </div>
      <h1>
        <span className='reveal'>Składam</span>{' '}
        <span className='reveal accent'>komputery</span>
        <br />
        <span className='reveal'>i&nbsp;tworzę</span>{' '}
        <span className='reveal accent'>strony</span>
        <span className='reveal'>.</span>
      </h1>
      <p className={styles.tag}>
        Z Krakowa, dla Ciebie. Dobieram komponenty, składam zestawy, konfiguruję
        systemy i piszę nowoczesne strony — od pierwszego pomysłu po działający
        produkt.
      </p>
      <div className={styles.cta}>
        <Link href='/oferta' className='btn-cosmic primary'>
          Zobacz ofertę <span className='arrow'>→</span>
        </Link>
        <Link href='/kontakt' className='btn-cosmic'>
          Skontaktuj się <span className='arrow'>↗</span>
        </Link>
      </div>
    </section>
  );
}
