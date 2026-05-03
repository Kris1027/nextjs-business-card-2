'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Service } from '@/lib/services/types';
import styles from './service-cards.module.css';

type ServiceCardsProps = {
  services: Service[];
  variant?: 'preview' | 'detail';
};

export function ServiceCards({
  services,
  variant = 'preview',
}: ServiceCardsProps) {
  const detail = variant === 'detail';
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={styles.grid}>
      {services.map((s, i) => (
        <div
          key={s.slug}
          className={`${styles.card}${inView ? ` ${styles.cardVisible}` : ''}`}
          data-interactive
          style={{
            animationDelay: `${i * 0.15}s`,
            minHeight: detail ? 380 : 320,
          }}
          onMouseMove={(e) => {
            const el = e.currentTarget;
            const a = Math.atan2(
              e.nativeEvent.offsetY - el.offsetHeight / 2,
              e.nativeEvent.offsetX - el.offsetWidth / 2
            );
            el.style.setProperty('--ang', `${a}rad`);
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <span className={styles.glyph}>{s.glyph}</span>
            <span className={styles.desig}>{s.designation}</span>
          </div>
          <h3>{s.title}</h3>
          <p>{detail ? s.description : s.shortDescription}</p>
          <ul className={styles.features}>
            {(detail ? s.features : s.features.slice(0, 3)).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link
            href={`/oferta/${s.slug}`}
            className={`btn-cosmic ${styles.cardCta}`}
          >
            {detail ? 'Szczegóły usługi' : 'Czytaj więcej'}{' '}
            <span className='arrow'>→</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
