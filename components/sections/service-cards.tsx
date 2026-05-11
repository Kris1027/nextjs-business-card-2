'use client';

import { useEffect, useRef, useState } from 'react';
import type { Service } from '@/lib/services/types';
import { servicesContent } from '@/lib/content/services';
import { CosmicButton } from '@/components/cosmos/cosmic-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
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
  const reduced = useReducedMotion();
  const [observed, setObserved] = useState(false);
  const inView = reduced || observed;

  useEffect(() => {
    if (reduced) return;
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setObserved(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const handleGlow = reduced
    ? undefined
    : (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const a = Math.atan2(
          e.nativeEvent.offsetY - el.offsetHeight / 2,
          e.nativeEvent.offsetX - el.offsetWidth / 2
        );
        el.style.setProperty('--ang', `${a}rad`);
      };

  return (
    <div ref={gridRef} className={styles.grid}>
      {services.map((s, i) => (
        <div
          key={s.slug}
          className={`${styles.card}${inView ? ` ${styles.cardVisible}` : ''}${detail ? ` ${styles.cardDetail}` : ''}`}
          data-interactive
          style={{ animationDelay: `${i * 0.15}s` }}
          onMouseMove={handleGlow}
        >
          <div className={styles.cardHeader}>
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
          <CosmicButton href={`/oferta/${s.slug}`} className={styles.cardCta}>
            {detail
              ? servicesContent.cards.ctaDetail
              : servicesContent.cards.ctaPreview}
          </CosmicButton>
        </div>
      ))}
    </div>
  );
}
