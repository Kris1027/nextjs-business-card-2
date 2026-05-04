'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlowFrame } from '@/components/cosmos/glow-frame';
import { services } from '@/lib/services/data';
import styles from './carousel.module.css';

const ITEMS = services.map((s) => ({
  src: s.image,
  label: s.title,
  code: s.designation,
  slug: s.slug,
}));

export function HomeCarousel() {
  const [idx, setIdx] = useState(0);
  const [inView, setInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ITEMS.length), 4500);
    return () => clearInterval(t);
  }, []);

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cur = ITEMS[idx];

  return (
    <div ref={gridRef} className={styles.carousel}>
      <Link
        href={`/oferta/${cur.slug}`}
        className={`${styles.main}${inView ? ` ${styles.itemVisible}` : ''}`}
        style={{ animationDelay: '0s' }}
      >
        <GlowFrame
          key={cur.code}
          src={cur.src}
          alt={cur.label}
          ratio='16/10'
          designation={cur.code}
          label={cur.label}
          priority
          large
        />
      </Link>
      <div className={styles.thumbs}>
        {ITEMS.map((it, i) => (
          <Link
            key={it.code}
            href={`/oferta/${it.slug}`}
            className={`${styles.thumb}${i === idx ? ` ${styles.thumbActive}` : ''}${inView ? ` ${styles.itemVisible}` : ''}`}
            data-interactive
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            onMouseEnter={() => setIdx(i)}
          >
            <Image src={it.src} alt={it.label} fill sizes='200px' />
            <div className={styles.thumbLabel}>
              {it.code} ── {it.label}
            </div>
            {i === idx && <div key={idx} className={styles.progressBar} />}
          </Link>
        ))}
      </div>
    </div>
  );
}
